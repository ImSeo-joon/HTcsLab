// 校验题库里所有 JavaScript 参考解能否通过各自的测试用例。
// 用法: node tools/verify-solutions.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);

const box = { window: {} };
vm.createContext(box);
for (const file of ['data/problems.js', 'data/c-track.js', 'data/hard-track.js', 'data/math-track.js', 'data/py-track.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), box, { filename: file });
}

const problems = box.window.LHT_PROBLEMS;

function stringify(v) {
  if (typeof v === 'string') return v;
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  try { return JSON.stringify(v); } catch (e) { return String(v); }
}

function runJs(code, stdin) {
  const logs = [];
  let cursor = 0;
  const lines = stdin.split(/\r?\n/);
  const ctx = {
    readAll: () => stdin,
    readline: () => (cursor < lines.length ? lines[cursor++] : null),
    print: (...a) => logs.push(a.map(stringify).join(' ')),
    debug: () => {},
    console: {
      log: (...a) => logs.push(a.map(stringify).join(' ')),
      info: (...a) => logs.push(a.map(stringify).join(' ')),
      warn: (...a) => logs.push(a.map(stringify).join(' ')),
      error: (...a) => logs.push(a.map(stringify).join(' '))
    },
    Math, JSON, Array, Object, String, Number, Map, Set, Infinity, NaN,
    Promise, RegExp, Date, Boolean, Error, parseInt, parseFloat, isNaN
  };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: 'solution.js', timeout: 15000 });
  return logs.join('\n');
}

let failures = 0;
let checked = 0;

for (const p of problems) {
  const code = p.solutions && p.solutions.js;
  if (!code) {
    console.log(`SKIP  ${p.id}  （没有 JS 参考解）`);
    continue;
  }
  for (const t of p.tests) {
    checked++;
    let got;
    try {
      got = runJs(code, t.input);
    } catch (err) {
      failures++;
      console.log(`FAIL  ${p.id} / ${t.name}  抛出异常: ${err.message}`);
      continue;
    }
    if (got.trim() !== t.output.trim()) {
      failures++;
      console.log(`FAIL  ${p.id} / ${t.name}`);
      console.log(`      期望: ${JSON.stringify(t.output.trim())}`);
      console.log(`      实际: ${JSON.stringify(got.trim())}`);
    }
  }
}

console.log(`\nJS 参考解：共 ${checked} 个用例，失败 ${failures} 个`);
process.exit(failures ? 1 : 0);
