import catalogue from '../data/route-pages.json';

const origin = 'https://podlookup.co.uk/';
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  // Match the browser router, including its last-value rule for duplicate p keys.
  const raw = url.searchParams.getAll('p').pop();
  if (!raw || !['GET', 'HEAD'].includes(request.method)) return next();
  const path = raw.split('/').filter(Boolean).join('/');
  const key = Object.hasOwn(catalogue.aliases, path) ? catalogue.aliases[path] : path;
  const found = Object.hasOwn(catalogue.pages, key);
  const page = found ? catalogue.pages[key] : catalogue.missing;
  const canonical = found ? origin + '?p=' + key : '';

  // Always read the complete shared document. Its ETag and byte ranges describe
  // a different representation from the HTML returned for this particular URL.
  const asset = await env.ASSETS.fetch(new URL('/', url).href);
  if (!asset.ok || !asset.headers.get('content-type')?.includes('text/html')) return asset;
  const headers = new Headers(asset.headers);
  for (const header of ['etag', 'last-modified', 'content-length', 'accept-ranges', 'content-range']) headers.delete(header);
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  if (!found) headers.set('X-Robots-Tag', 'noindex, follow');
  const init = { status: found ? 200 : 404, headers };
  if (request.method === 'HEAD') return new Response(null, init);

  const extraHead = [
    '<meta property="og:title" content="' + escapeHtml(page.title) + '">',
    '<meta property="og:description" content="' + escapeHtml(page.description) + '">',
    found ? '<meta property="og:type" content="website"><meta property="og:url" content="' + canonical + '">' :
      '<meta name="robots" content="noindex, follow">'
  ].join('');
  const introduction = '<section class="section geo"><div class="wrap"><h1>' + escapeHtml(page.heading) +
    '</h1><p>' + escapeHtml(page.intro) + '</p><a data-geo-back href="/">PodLookup home</a></div></section>';
  return new HTMLRewriter()
    .on('head > title', { element(el) { el.setInnerContent(page.title); } })
    .on('head > meta[name="description"]', { element(el) { el.setAttribute('content', page.description); } })
    .on('head > link[rel="canonical"]', { element(el) { if (found) el.setAttribute('href', canonical); else el.remove(); } })
    .on('head', { element(el) { el.append(extraHead, { html: true }); } })
    .on('#homeView', { element(el) { el.setAttribute('hidden', ''); } })
    .on('#geoView', { element(el) { el.removeAttribute('hidden'); el.setInnerContent(introduction, { html: true }); } })
    .transform(new Response(asset.body, init));
}
