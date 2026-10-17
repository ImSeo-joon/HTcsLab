"""校验题库里所有 Python 参考解能否通过各自的测试用例。

用法（在项目根目录）：
    py tools/verify-python.py
脚本会先调用 node tools/dump-problems.mjs 把题库转成 JSON，再逐题运行。
"""
import json
import os
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

tmp_json = os.path.join(tempfile.gettempdir(), "lht-problems.json")
dump = subprocess.run(
    ["node", os.path.join(HERE, "dump-problems.mjs"), tmp_json],
    cwd=ROOT, capture_output=True, text=True,
)
if dump.returncode != 0:
    print("导出题库失败，确认已安装 Node.js：")
    print(dump.stderr.strip())
    sys.exit(1)

with open(tmp_json, encoding="utf-8") as handle:
    problems = json.load(handle)

failures = 0
checked = 0
env = dict(os.environ, PYTHONIOENCODING="utf-8")

for problem in problems:
    code = (problem.get("solutions") or {}).get("py")
    if not code:
        print(f"SKIP  {problem['id']}  （没有 Python 参考解）")
        continue
    for test in problem["tests"]:
        checked += 1
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False,
                                         encoding="utf-8") as handle:
            handle.write(code)
            tmp = handle.name
        try:
            proc = subprocess.run(
                [sys.executable, tmp],
                input=test["input"].encode("utf-8"),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=30,
                env=env,
            )
            got = proc.stdout.decode("utf-8", "replace")
            # Windows 上的 Python 会输出 \r\n；站点侧同样只做行尾归一化
            got = got.replace("\r\n", "\n").replace("\r", "\n")
            if proc.returncode != 0:
                failures += 1
                print(f"FAIL  {problem['id']} / {test['name']}  退出码 {proc.returncode}")
                tail = proc.stderr.decode("utf-8", "replace").strip().splitlines()
                if tail:
                    print("      " + tail[-1])
                continue
            if got.strip() != test["output"].strip():
                failures += 1
                print(f"FAIL  {problem['id']} / {test['name']}")
                print(f"      期望: {test['output'].strip()!r}")
                print(f"      实际: {got.strip()!r}")
        finally:
            os.unlink(tmp)

print(f"\nPython 参考解：共 {checked} 个用例，失败 {failures} 个")
sys.exit(1 if failures else 0)
