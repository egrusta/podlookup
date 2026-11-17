const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
function extract(name) {
  const start = source.indexOf('  function ' + name + '(');
  assert.ok(start >= 0);
  const end = source.indexOf('\n  }', start);
  return source.slice(start, end + 4);
}
function route(search) {
  const context = vm.createContext({ location: { search }, result: '',
    parseGeoPath: value => value === 'about' ? { type: 'about' } : null,
    renderGeo: value => { context.result = value.type; },
    closeGeo: () => { context.result = 'home'; }
  });
  vm.runInContext(extract('parseQuery') + '\n' + extract('applyGeoFromLocation') + '\napplyGeoFromLocation();', context);
  return context.result;
}
test('malformed route values reach the not-found view instead of the homepage', () => {
  for (const value of ['%', '%ZZ', '%E0%A4%A', 'about%'])
    assert.equal(route('?p=' + value), 'notfound', value);
});
test('valid, empty and unrelated query parameters retain their routes', () => {
  for (const query of ['', '?p=', '?utm_source=test', '?broken=%&p=about', '?p=%61bout'])
    assert.equal(route(query), query.includes('about') || query.includes('%61bout') ? 'about' : 'home', query);
});
