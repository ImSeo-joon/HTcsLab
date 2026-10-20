/* 日语版一致性检查：数据范围、文案覆盖、主题样式。
   用法：node tools/verify-ja.mjs */

import { readFileSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');

const store = new Map();
const noop = () => {};
const fakeEl = () => ({
  setAttribute: noop, getAttribute: () => null, appendChild: noop, removeAttribute: noop,
  addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  style: {}, dataset: {}, textContent: '', innerHTML: ''
});

const sandbox = {
  console,
  document: {
    readyState: 'complete',
    documentElement: Object.assign(fakeEl(), { lang: '' }),
    body: fakeEl(),
    head: fakeEl(),
    addEventListener: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: fakeEl,
    createTextNode: () => ({})
  },
  navigator: { language: 'en', languages: ['en'] },
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k)
  },
  matchMedia: () => ({ matches: false, addEventListener: noop, addListener: noop }),
  setTimeout, clearTimeout, setInterval, clearInterval,
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  location: { hash: '', pathname: '/', search: '' }
};
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.globalThis = sandbox;

function run(rel) {
  vm.runInNewContext(read(rel), sandbox, { filename: rel });
}

run('data/contests.js');
run('data/collabs.js');
run('data/collabs-ja.js');
run('assets/js/i18n.js');

const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok });
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? ' — ' + detail : ''));
};

/* ---------- 竞赛 ---------- */
const contests = sandbox.LHT_CONTESTS || [];
const jaContest = sandbox.LHT_CONTEST_JA || { allow: [] };
const contestIds = new Set(contests.map((c) => c.id));
const missingContest = jaContest.allow.filter((id) => !contestIds.has(id));
const jaContestList = contests.filter((c) => jaContest.allow.includes(c.id));

check('JA 竞赛白名单 23 项', jaContestList.length === 23, String(jaContestList.length));
check('JA 竞赛白名单无失效 id', missingContest.length === 0, missingContest.join(','));
check('JA 含日本赛事（PAST / SECCON / AHC）',
  ['PAST', 'SECCON', 'AHC'].every((abbr) => jaContestList.some((c) => c.abbr === abbr)),
  jaContestList.map((c) => c.abbr).join(','));
check('JA 含日本本土新增赛事（ISUCON / UTPC / Cpaw）',
  ['ISUCON', 'UTPC', 'Cpaw'].every((abbr) => jaContestList.some((c) => c.abbr === abbr)),
  jaContestList.length + ' 项');
check('JA 日本赛事数量不少于 17', jaContestList.filter((c) => [
  'icpc-japan', 'jag', 'past', 'ahc', 'seccon', 'ai-cup', 'signate', 'nishika',
  'utpc', 'kupc', 'yukicoder', 'isucon', 'seccon-beginners', 'cpaw-ctf', 'mbsd-challenge',
  'jss-data', 'robocup-jp'
].includes(c.id)).length >= 17, '');
check('JA 不含蓝桥杯 / 天池 / 华为软挑',
  !jaContestList.some((c) => ['lanqiao', 'tianchi', 'huawei-software'].includes(c.id)),
  '');
check('JA 路线 7 条且节点均可见',
  jaContest.allow.length > 0 && jaContest.paths.length === 7 &&
  jaContest.paths.every((p) => p.steps.every((id) => jaContest.allow.includes(id))),
  String(jaContest.paths.length));
check('JA 四年规划 4 条且赛事均可见',
  jaContest.years.length === 4 &&
  jaContest.years.every((y) => y.contests.every((id) => jaContest.allow.includes(id))),
  String(jaContest.years.length));

/* ---------- 合作 ---------- */
const collabs = sandbox.LHT_COLLABS || [];
const jaIds = sandbox.LHT_COLLAB_JA_IDS || [];
const collabIds = new Set(collabs.map((c) => c.id));
const missingCollab = jaIds.filter((id) => !collabIds.has(id));
const jaCollabs = collabs.filter((c) => jaIds.includes(c.id));
const regionJa = jaCollabs.filter((c) => c.region === 'jp').length;

check('JA 合作条目 28 项', jaCollabs.length === 28, String(jaCollabs.length));
check('JA 合作白名单无失效 id', missingCollab.length === 0, missingCollab.join(','));
check('JA 日本条目为最大单一地区', regionJa >= 7 && regionJa >= Math.max(
  ...['us', 'uk', 'cn', 'hk', 'tw', 'asia'].map((r) => jaCollabs.filter((c) => c.region === r).length)), String(regionJa));
check('JA 已排除普通大陆院校',
  !jaCollabs.some((c) => ['bupt-cs', 'xidian-ipiu', 'hdu-cs', 'szu-vcc', 'suda-cs', 'jnu-cs'].includes(c.id)), '');
check('JA 保留顶尖大陆院校与机构',
  ['tsinghua-iiis', 'pku-ai', 'nju-lamda', 'cas-ict'].every((id) => jaIds.includes(id)), '');
check('每条 JA 条目字段完整',
  jaCollabs.every((c) => c.mentor && c.mentor.name && c.project && c.project.title &&
    c.apply && c.apply.url && c.source && c.source.url && c.updated && c.region), '');

/* ---------- 文案覆盖 ---------- */
sandbox.LHT.setLang('en');
const enT = {};
const jaT = {};

const htmlKeys = [];
for (const page of ['contests.html', 'collabs.html']) {
  const html = read(page);
  for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) htmlKeys.push(m[1]);
  for (const m of html.matchAll(/data-i18n-[\w-]+="([^"]+)"/g)) htmlKeys.push(m[1]);
}

const codeKeys = [];
for (const file of ['assets/js/contests.js', 'assets/js/collabs.js']) {
  const code = read(file);
  for (const m of code.matchAll(/LHT\.t\('([^']+)'/g)) codeKeys.push(m[1]);
  for (const m of code.matchAll(/LHT\.t\(([^)]*)\)/g)) {
    for (const q of m[1].matchAll(/'([a-zA-Z]+\.[a-zA-Z0-9]+)'/g)) codeKeys.push(q[1]);
  }
}

const keys = [...new Set([...htmlKeys, ...codeKeys])]
  .filter((k) => !k.includes('+') && !k.endsWith('.') && !k.endsWith('level') && !k.startsWith('collab.kind'));
for (const k of keys) { sandbox.LHT.lang = 'en'; enT[k] = sandbox.LHT.t(k); }
sandbox.LHT.lang = 'ja';
for (const k of keys) jaT[k] = sandbox.LHT.t(k);

const untranslated = keys.filter((k) => enT[k] === jaT[k] && !['con.fr', 'con.h1fr', 'collab.h1fr'].includes(k));
check('Competition / Collab 文案全部日语化', untranslated.length === 0, untranslated.join(','));
check('键名未泄漏到页面', keys.every((k) => !/^(con|collab)\./.test(jaT[k])), '');

/* ---------- 整站界面文案 ---------- */
const allPages = ['index.html', 'practice.html', 'resources.html', 'demos.html', 'notes.html', 'battle.html', '404.html'];
const missingJa = [];
sandbox.LHT.lang = 'en';
for (const page of allPages) {
  const html = read(page);
  const pageKeys = new Set([...html.matchAll(/data-i18n(?:-[\w-]+)?="([^"]+)"/g)].map((m) => m[1]));
  for (const k of pageKeys) {
    sandbox.LHT.lang = 'en';
    const en = sandbox.LHT.t(k);
    sandbox.LHT.lang = 'ja';
    const ja = sandbox.LHT.t(k);
    if (en === ja && !['con.fr', 'con.h1fr', 'collab.h1fr'].includes(k)) missingJa.push(page + ':' + k);
  }
}
sandbox.LHT.lang = 'ja';
check('整站界面文案均有日语', missingJa.length === 0, missingJa.slice(0, 8).join(','));
check('首页日语主文案 + 英文小字', read('index.html').includes('hero-lede-ja') &&
  read('assets/css/modules.css').includes('html[data-lang="ja"] .hero-lede-ja'), '');

/* ---------- 主题 ---------- */
const css = read('assets/css/modules.css');
const heroPath = path.join(ROOT, 'assets/img/hero-jp.jpg');
check('日语主题仅作用于 html[data-lang="ja"]', /html\[data-lang="ja"\] body[\s\S]{0,400}hero-jp\.jpg/.test(css), '');
check('hero-jp.jpg 存在且大小合理', existsSync(heroPath) && statSync(heroPath).size > 50000,
  existsSync(heroPath) ? statSync(heroPath).size + ' bytes' : 'missing');
check('日语字体栈包含 Noto Sans JP', /Noto Sans JP/.test(css), '');

const sw = read('sw.js');
check('Service Worker 缓存含新资源',
  sw.includes('./data/collabs-ja.js') && sw.includes('./assets/img/hero-jp.jpg') && /'v\d+'/.test(sw), '');
check('合作页已加载日语数据文件', read('collabs.html').includes('data/collabs-ja.js'), '');

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
