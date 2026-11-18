#!/usr/bin/env python3
"""Read-only public HTTP audit. Does not run JavaScript or query Google."""
import argparse
import hashlib
import json
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.title = ""
        self.description = []
        self.canonicals = []
        self.robots = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonicals.append(attrs.get("href", ""))
        if tag == "meta" and attrs.get("name", "").lower() == "description":
            self.description.append(attrs.get("content", ""))
        if tag == "meta" and attrs.get("name", "").lower() == "robots":
            self.robots.append(attrs.get("content", ""))
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data

def inspect(url):
    result = {"url": url}
    try:
        try:
            response = urlopen(Request(url, headers={"User-Agent": "PodLookup-Technical-Audit/1.0"}), timeout=20)
        except HTTPError as error:
            response = error
        with response:
            body = response.read(2_000_001)
            result.update(status=response.status, final_url=response.url,
                          content_type=response.headers.get("Content-Type", ""),
                          x_robots_tag=response.headers.get("X-Robots-Tag"),
                          bytes=len(body), sha256=hashlib.sha256(body).hexdigest())
        if len(body) > 2_000_000:
            result["error"] = "Response exceeds audit size limit"
            return result
        if "text/html" in result["content_type"].lower():
            head = Head()
            head.feed(body.decode("utf-8", errors="replace"))
            result.update(title=head.title, description=head.description, canonicals=head.canonicals, robots=head.robots)
        if urlparse(url).path.endswith("/sitemap.xml"):
            try:
                root = ET.fromstring(body)
                locations = [node.text for node in root.iter() if node.tag.split("}")[-1] == "loc"]
                result.update(sitemap_entries=len(locations), unique_sitemap_entries=len(set(locations)))
            except ET.ParseError as error:
                result["sitemap_error"] = str(error)
    except (URLError, TimeoutError, OSError) as error:
        result["error"] = str(error)
    return result

def check_responses(paths, rows, catalogue):
    origin = "https://podlookup.co.uk/"
    types = {"robots.txt": "text/plain", "llms.txt": "text/plain", "sitemap.xml": "application/xml"}
    errors = []
    for path, row in zip(paths, rows):
        def require(ok, field):
            if not ok:
                errors.append(f"{path or '/'}: {field}")
        if "error" in row:
            errors.append(f"{path}: {row['error']}")
            continue
        if path in types:
            require(row["status"] == 200, "expected HTTP 200")
            require(row["content_type"].split(";")[0].strip() == types[path], "unexpected media type")
            if path == "sitemap.xml":
                count = len(catalogue["pages"]) + 1
                require(row.get("sitemap_entries") == row.get("unique_sitemap_entries") == count,
                        "sitemap size or uniqueness differs from the catalogue")
        elif not path:
            require(row["status"] == 200 and row.get("canonicals") == [origin], "homepage status/canonical")
            require("noindex" not in " ".join(row.get("robots", [])).lower(), "home is noindex")
        else:
            key = path.removeprefix("?p=")
            target = catalogue["aliases"].get(key, key)
            if target in catalogue["pages"]:
                meta = catalogue["pages"][target]
                require(row["status"] == 200, "expected HTTP 200")
                require(row.get("canonicals") == [origin + "?p=" + target], "incorrect canonical")
                require(row.get("title") == meta["title"], "incorrect title")
                require(row.get("description") == [meta["description"]], "incorrect description")
                require("noindex" not in " ".join(row.get("robots", [])).lower(), "valid route is noindex")
            else:
                require(row["status"] == 404, "expected HTTP 404")
                require("noindex" in " ".join(row.get("robots", [])).lower(), "missing noindex")
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="https://podlookup.co.uk/")
    parser.add_argument("--verify", action="store_true", help="Fail on route, metadata or discovery-file regressions")
    parser.add_argument("--all-routes", action="store_true", help="Verify every published route and supported alias")
    args = parser.parse_args()
    if urlparse(args.base_url).scheme not in ("https", "http"):
        parser.error("--base-url must use HTTP or HTTPS")
    base = args.base_url.rstrip("/") + "/"
    paths = ["", "?p=about", "?p=methodology", "robots.txt", "sitemap.xml",
             "llms.txt", "technical-audit-missing-page-20261114", "?p=technical-audit-missing-route-20261114"]
    catalogue = None
    if args.verify or args.all_routes:
        catalogue = json.loads((Path(__file__).resolve().parents[1] / "data" / "route-pages.json").read_text())
    if args.all_routes:
        paths = list(dict.fromkeys(paths + ["?p=" + key for key in (*catalogue["pages"], *catalogue["aliases"])]))
    with ThreadPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(inspect, [urljoin(base, path) for path in paths]))
    groups = {}
    for row in rows:
        if "text/html" in row.get("content_type", "") and "sha256" in row:
            groups.setdefault(row["sha256"], []).append(row["url"])
    errors = check_responses(paths, rows, catalogue) if catalogue is not None else []
    print(json.dumps({
        "checked_at_utc": datetime.now(timezone.utc).isoformat(),
        "scope": "Initial HTTP responses only; no rendered DOM or Search Console access.",
        "responses": rows,
        **({"verification_errors": errors} if catalogue is not None else {}),
        "identical_html_groups": [urls for urls in groups.values() if len(urls) > 1],
    }, indent=2))
    return int(bool(errors) or any("error" in row for row in rows))

if __name__ == "__main__":
    raise SystemExit(main())
