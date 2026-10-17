// 校验所有 C 参考解：用 gcc 编译后逐用例运行比对。
// 用法: node tools/verify-c.mjs      （需要 PATH 里有 gcc，或设置 CC 环境变量）
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const cc = process.env.CC || 'gcc';

// 载入题库与 C 专题（题库在后，需要 window 环境）
const box = { window: {} };
vm.createContext(box);
for (const file of ['data/problems.js', 'data/c-track.js', 'data/hard-track.js', 'data/math-track.js', 'data/py-track.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), box, { filename: file });
}
const problems = box.window.LHT_PROBLEMS;
const track = box.window.LHT_C_TRACK || {};

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lht-c-'));
let checked = 0;
let failures = 0;
let compiled = 0;

function solutionFor(problem) {
  if (problem.solutions && problem.solutions.c) return problem.solutions.c;
  if (track[problem.id] && track[problem.id].solution) return track[problem.id].solution;
  return null;
}

for (const problem of problems) {
  const code = solutionFor(problem);
  if (!code) {
    console.log(`SKIP  ${problem.id}  （没有 C 参考解）`);
    continue;
  }
  const src = path.join(tmp, `${problem.id}.c`);
  const bin = path.join(tmp, `${problem.id}.exe`);
  fs.writeFileSync(src, code, 'utf8');

  const build = spawnSync(cc, ['-std=c17', '-O2', '-Wall', '-o', bin, src], { encoding: 'utf8' });
  if (build.status !== 0) {
    failures++;
    console.log(`FAIL  ${problem.id}  编译失败`);
    console.log('      ' + (build.stderr || '').split('\n').slice(0, 4).join('\n      '));
    continue;
  }
  compiled++;

  for (const test of problem.tests) {
    checked++;
    const run = spawnSync(bin, [], { input: test.input, encoding: 'utf8', timeout: 10000 });
    const got = (run.stdout || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (run.status !== 0) {
      failures++;
      console.log(`FAIL  ${problem.id} / ${test.name}  退出码 ${run.status}`);
      continue;
    }
    if (got.trim() !== test.output.trim()) {
      failures++;
      console.log(`FAIL  ${problem.id} / ${test.name}`);
      console.log(`      期望: ${JSON.stringify(test.output.trim())}`);
      console.log(`      实际: ${JSON.stringify(got.trim())}`);
    }
  }
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\nC 参考解：编译 ${compiled} 个程序，共 ${checked} 个用例，失败 ${failures} 个`);
process.exit(failures ? 1 : 0);
