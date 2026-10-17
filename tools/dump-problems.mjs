// 把题库导出成 JSON，供 verify-python.py 等脚本复用。
// 用法: node tools/dump-problems.mjs [输出路径]
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
const out = process.argv[2];

if (out) {
  fs.writeFileSync(out, JSON.stringify(problems, null, 2), 'utf8');
  console.log(`导出 ${problems.length} 道题目 -> ${out}`);
} else {
  process.stdout.write(JSON.stringify(problems));
}
