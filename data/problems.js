/* ============================================================
   problems.js — 题库数据
   每道题是一个对象；新增题目只需往数组里追加一项。
   tests[].output 与程序实际输出会做「去掉首尾空白」后的比对。
   ============================================================ */

/* 标签表：键用于筛选与统计，值用于显示 */
window.LHT_TAGS = {
  basics:       { zh: '基础', en: 'Basics' },
  io:           { zh: '输入输出', en: 'Input / Output' },
  array:        { zh: '数组', en: 'Array' },
  string:       { zh: '字符串', en: 'String' },
  hash:         { zh: '哈希表', en: 'Hash table' },
  stack:        { zh: '栈', en: 'Stack' },
  search:       { zh: '查找', en: 'Searching' },
  sort:         { zh: '排序', en: 'Sorting' },
  dp:           { zh: '动态规划', en: 'Dynamic programming' },
  graph:        { zh: '图论', en: 'Graphs' },
  heap:         { zh: '堆', en: 'Heap' },
  backtracking: { zh: '回溯', en: 'Backtracking' },
  recursion:    { zh: '递归', en: 'Recursion' },
  math:         { zh: '数学', en: 'Mathematics' },
  hashmap:      { zh: '映射', en: 'Mapping' },

  /* 机器学习专题（按《机器学习》教材章节顺序组织） */
  ml:           { zh: '机器学习', en: 'Machine learning' },
  modeleval:    { zh: '模型评估', en: 'Model evaluation' },
  linmodel:     { zh: '线性模型', en: 'Linear models' },
  tree:         { zh: '决策树', en: 'Decision trees' },
  neural:       { zh: '神经网络', en: 'Neural networks' },
  bayes:        { zh: '贝叶斯', en: 'Bayesian methods' },
  cluster:      { zh: '聚类', en: 'Clustering' },
  dimreduce:    { zh: '降维', en: 'Dimensionality reduction' },
  rl:           { zh: '强化学习', en: 'Reinforcement learning' },
  ensemble:     { zh: '集成学习', en: 'Ensemble methods' }
  ,c:           { zh: 'C 语言', en: 'C language' }
  ,linalg:      { zh: '线性代数', en: 'Linear algebra' }
  ,calculus:    { zh: '微积分', en: 'Calculus' }
  ,python:      { zh: 'Python', en: 'Python' }
};

/* 其他语言的通用输入输出模板（题目未单独提供模板时使用） */
window.LHT_GENERIC_TEMPLATES = {
  c: [
    '#include <stdio.h>',
    '',
    'int main(void) {',
    '    /* 按题目要求读取标准输入，把答案写到标准输出 */',
    '    int n;',
    '    if (scanf("%d", &n) != 1) return 0;',
    '    /* TODO: 实现你的解法 */',
    '    printf("%d\\n", n);',
    '    return 0;',
    '}'
  ].join('\n'),

  cpp: [
    '// bits/stdc++.h 是 GCC 扩展头，站点已把远程 C++ 编译器固定为 GCC',
    '#include <bits/stdc++.h>',
    'using namespace std;',
    '',
    'int main() {',
    '    ios::sync_with_stdio(false);',
    '    cin.tie(nullptr);',
    '    int n;',
    '    if (!(cin >> n)) return 0;',
    '    // TODO: 实现你的解法',
    '    cout << n << "\\n";',
    '    return 0;',
    '}'
  ].join('\n'),

  java: [
    'import java.io.*;',
    'import java.util.*;',
    '',
    '// 注意：远程编译器保存的文件名固定为 prog.java，所以类不能声明成 public',
    'class Main {',
    '    public static void main(String[] args) throws IOException {',
    '        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));',
    '        StringBuilder out = new StringBuilder();',
    '        String first = in.readLine();',
    '        if (first == null) return;',
    '        int n = Integer.parseInt(first.trim());',
    '        // TODO: 实现你的解法',
    '        out.append(n).append("\\n");',
    '        System.out.print(out);',
    '    }',
    '}'
  ].join('\n'),

  csharp: [
    'using System;',
    'using System.Collections.Generic;',
    'using System.Linq;',
    '',
    'public class Program {',
    '    public static void Main() {',
    '        string first = Console.ReadLine();',
    '        if (first == null) return;',
    '        int n = int.Parse(first.Trim());',
    '        // TODO: 实现你的解法',
    '        Console.WriteLine(n);',
    '    }',
    '}'
  ].join('\n'),

  go: [
    'package main',
    '',
    'import (',
    '\t"bufio"',
    '\t"fmt"',
    '\t"os"',
    ')',
    '',
    'func main() {',
    '\tin := bufio.NewReader(os.Stdin)',
    '\tout := bufio.NewWriter(os.Stdout)',
    '\tdefer out.Flush()',
    '',
    '\tvar n int',
    '\tif _, err := fmt.Fscan(in, &n); err != nil {',
    '\t\treturn',
    '\t}',
    '\t// TODO: 实现你的解法',
    '\tfmt.Fprintln(out, n)',
    '}'
  ].join('\n'),

  rust: [
    'use std::io::{self, Read, Write};',
    '',
    'fn main() {',
    '    let mut input = String::new();',
    '    io::stdin().read_to_string(&mut input).unwrap();',
    '    let mut it = input.split_whitespace();',
    '    let n: i64 = it.next().unwrap().parse().unwrap();',
    '    // TODO: 实现你的解法',
    '    let stdout = io::stdout();',
    '    let mut out = io::BufWriter::new(stdout.lock());',
    '    writeln!(out, "{}", n).unwrap();',
    '}'
  ].join('\n'),

  php: [
    '<?php',
    '$lines = explode("\\n", trim(stream_get_contents(STDIN)));',
    '$n = (int) trim($lines[0]);',
    '// TODO: 实现你的解法',
    'echo $n . "\\n";'
  ].join('\n'),

  ruby: [
    'data = $stdin.read.split("\\n")',
    'n = data[0].to_i',
    '# TODO: 实现你的解法',
    'puts n'
  ].join('\n'),

  typescript: [
    '// @ts-nocheck —— 远程编译器没有装 Node 类型声明，关掉类型检查才能直接用 require',
    'const fs = require("fs");',
    'const input: string = fs.readFileSync(0, "utf8");',
    'const n = Number(input.trim().split(/\\s+/)[0]);',
    '',
    '// TODO: 实现你的解法',
    'console.log(n);'
  ].join('\n'),

  // 想加新语言：在 assets/js/sandbox.js 的 LHT.LANGUAGES 里加一条
  // （remote 类型要填 Wandbox 的语言名，见 https://wandbox.org/api/list.json），
  // 再在这里补一份同语言的通用输入输出模板即可。
};

window.LHT_PROBLEMS = [
  {
    id: 'a-plus-b',
    title: { zh: '两数求和', en: 'Sum of Two Numbers' },
    difficulty: 'easy',
    tags: ['basics', 'io'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '热身题：练习读入与输出。给出 n 组整数，每组两个，请依次计算它们的和。这道题的目的是让你确认运行环境、输入输出格式都通了。',
      en: 'A warm-up on reading input and writing output. Given n pairs of integers, print the sum of each pair. The point is to confirm that the runtime and the I/O format both work.'
    },
    input: {
      zh: '第一行一个整数 n。接下来的 n 行，每行两个整数 a、b。',
      en: 'The first line holds an integer n. Each of the next n lines holds two integers a and b.'
    },
    output: {
      zh: '共 n 行，每行一个整数，表示 a + b。',
      en: 'n lines, each holding a single integer: a + b.'
    },
    samples: [
      { input: '3\n1 2\n-5 5\n1000000 23', output: '3\n0\n1000023' }
    ],
    tests: [
      { name: '样例 1', input: '3\n1 2\n-5 5\n1000000 23', output: '3\n0\n1000023' },
      { name: '单组', input: '1\n0 0', output: '0' },
      { name: '负数', input: '2\n-1000000000 -1000000000\n-7 3', output: '-2000000000\n-4' },
      { name: '大数', input: '1\n123456789 987654321', output: '1111111110' }
    ],
    hints: [
      { zh: '注意整数可能很大，JavaScript 里 64 位整数用 Number 在 2^53 内是安全的。', en: 'Values can be large; Number is safe in JavaScript up to 2^53.' }
    ],
    templates: {
      js: [
        '// 站点提供的辅助函数：',
        '//   readAll()  返回全部标准输入文本',
        '//   readline() 逐行读取，读完返回 null',
        '//   debug(v, 标签) 把中间变量输出到「调试预览」面板',
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const out = [];',
        '',
        'for (let i = 0; i < n; i++) {',
        '  const [a, b] = lines[1 + i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 计算 a + b',
        '  out.push(0);',
        '}',
        '',
        'console.log(out.join("\\n"));'
      ].join('\n'),
      py: [
        '# 站点提供的辅助函数：',
        '#   debug(值, 标签) 把中间变量输出到「调试预览」面板',
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    idx = 1',
        '    out = []',
        '    for _ in range(n):',
        '        a = int(data[idx]); b = int(data[idx + 1]); idx += 2',
        '        # TODO: 计算 a + b',
        '        out.append(0)',
        '    sys.stdout.write("\\n".join(map(str, out)) + "\\n")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const out = [];',
        'for (let i = 0; i < n; i++) {',
        '  const [a, b] = lines[1 + i].trim().split(/\\s+/).map(Number);',
        '  out.push(a + b);',
        '}',
        'console.log(out.join("\\n"));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    idx = 1',
        '    out = []',
        '    for _ in range(n):',
        '        a = int(data[idx]); b = int(data[idx + 1]); idx += 2',
        '        out.append(a + b)',
        '    sys.stdout.write("\\n".join(map(str, out)) + "\\n")',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'reverse-string',
    title: { zh: '反转字符串', en: 'Reverse a String' },
    difficulty: 'easy',
    tags: ['string', 'basics'],
    complexity: { time: 'O(n)', space: 'O(n)' },
    statement: {
      zh: '读入一行文本，把它整行反转后输出。注意里面可能包含空格与中文，中文按字符处理而不是按字节。',
      en: 'Read one line of text and print it reversed. It may contain spaces and non-ASCII characters; treat it as a sequence of characters, not bytes.'
    },
    input: { zh: '一行文本 s（可能含空格）。', en: 'A single line of text s, possibly containing spaces.' },
    output: { zh: '一行，s 的反转结果。', en: 'One line: s reversed.' },
    samples: [{ input: 'hello world', output: 'dlrow olleh' }],
    tests: [
      { name: '样例', input: 'hello world', output: 'dlrow olleh' },
      { name: '单字符', input: 'a', output: 'a' },
      { name: '回文', input: 'abcdefedcba', output: 'abcdefedcba' },
      { name: '中文', input: '高桌实验室', output: '室验实桌高' },
      { name: '符号', input: '!@# 123', output: '321 #@!' }
    ],
    hints: [
      { zh: 'JavaScript 要先把字符串拆成字符数组再反转，直接反转字符串对中文会有问题。', en: 'In JavaScript, split into characters first; reversing a raw string breaks multi-byte characters.' }
    ],
    templates: {
      js: [
        'const s = readAll().replace(/\\r?\\n$/, "");',
        '',
        '// TODO: 输出 s 的反转',
        'console.log(s);'
      ].join('\n'),
      py: [
        'import sys',
        's = sys.stdin.read().rstrip("\\n")',
        '',
        '# TODO: 输出 s 的反转',
        'print(s)'
      ].join('\n')
    },
    solutions: {
      js: [
        'const s = readAll().replace(/\\r?\\n$/, "");',
        'console.log([...s].reverse().join(""));'
      ].join('\n'),
      py: [
        'import sys',
        's = sys.stdin.read().rstrip("\\n")',
        'print(s[::-1])'
      ].join('\n')
    }
  },

  {
    id: 'palindrome',
    title: { zh: '回文判断', en: 'Valid Palindrome' },
    difficulty: 'easy',
    tags: ['string', 'basics', 'search'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '给定一行文本，判断忽略大小写、忽略所有非字母数字字符之后，它是否是回文。是输出 true，否则输出 false。',
      en: 'Given one line of text, decide whether it reads the same forwards and backwards after lowercasing and discarding every non-alphanumeric character. Print true or false.'
    },
    input: { zh: '一行文本 s。', en: 'One line of text s.' },
    output: { zh: 'true 或 false（小写）。', en: 'true or false, lowercase.' },
    samples: [
      { input: 'A man, a plan, a canal: Panama', output: 'true' },
      { input: 'race a car', output: 'false' }
    ],
    tests: [
      { name: '经典样例', input: 'A man, a plan, a canal: Panama', output: 'true' },
      { name: '反例', input: 'race a car', output: 'false' },
      { name: '空串', input: '', output: 'true' },
      { name: '只有符号', input: '***', output: 'true' },
      { name: '大小写混合', input: 'Aa', output: 'true' },
      { name: '中文（过滤后为空串）', input: '上海自来水来自海上', output: 'true' }
    ],
    hints: [
      { zh: '中文不属于 ASCII 字母数字，会被过滤掉，所以那组样例过滤后是空串，而空串按定义是回文。如果想让中文也参与判断，把过滤规则换成 \\p{L} 这类的 Unicode 字母。', en: 'Chinese characters are not ASCII alphanumeric, so that sample reduces to the empty string, which is a palindrome by definition. To include them, filter with a Unicode class such as \\p{L}.' },
      { zh: '可以用左右双指针从两端向中间靠拢，省掉额外空间。', en: 'Two pointers from both ends give O(1) extra space.' }
    ],
    templates: {
      js: [
        'const raw = readAll().replace(/\\r?\\n$/, "");',
        'const s = raw.toLowerCase().replace(/[^a-z0-9]/g, "");',
        '',
        '// TODO: 判断 s 是否为回文',
        'console.log(false);'
      ].join('\n'),
      py: [
        'import sys, re',
        'raw = sys.stdin.read().rstrip("\\n")',
        's = re.sub(r"[^a-z0-9]", "", raw.lower())',
        '',
        '# TODO: 判断 s 是否为回文',
        'print("false")'
      ].join('\n')
    },
    solutions: {
      js: [
        'const raw = readAll().replace(/\\r?\\n$/, "");',
        'const s = raw.toLowerCase().replace(/[^a-z0-9]/g, "");',
        'let i = 0, j = s.length - 1, ok = true;',
        'while (i < j) {',
        '  if (s[i] !== s[j]) { ok = false; break; }',
        '  i++; j--;',
        '}',
        'console.log(ok);'
      ].join('\n'),
      py: [
        'import sys, re',
        'raw = sys.stdin.read().rstrip("\\n")',
        's = re.sub(r"[^a-z0-9]", "", raw.lower())',
        'i, j = 0, len(s) - 1',
        'ok = True',
        'while i < j:',
        '    if s[i] != s[j]:',
        '        ok = False',
        '        break',
        '    i += 1; j -= 1',
        'print("true" if ok else "false")'
      ].join('\n')
    }
  },

  {
    id: 'fizzbuzz',
    title: { zh: 'FizzBuzz', en: 'FizzBuzz' },
    difficulty: 'easy',
    tags: ['basics', 'io', 'math'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '输出 1 到 n。遇到 3 的倍数输出 Fizz，5 的倍数输出 Buzz，同时是 3 和 5 的倍数输出 FizzBuzz，其余输出数字本身。',
      en: 'Print the numbers 1 to n. Multiples of 3 print Fizz, multiples of 5 print Buzz, multiples of both print FizzBuzz, everything else prints the number.'
    },
    input: { zh: '一个整数 n。', en: 'A single integer n.' },
    output: { zh: '共 n 行。', en: 'n lines.' },
    samples: [{ input: '5', output: '1\n2\nFizz\n4\nBuzz' }],
    tests: [
      { name: '样例', input: '5', output: '1\n2\nFizz\n4\nBuzz' },
      { name: '15', input: '15', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
      { name: '1', input: '1', output: '1' },
      { name: '含 0', input: '0', output: '' }
    ],
    hints: [
      { zh: '先判断能否被 15 整除，再分别判断 3 和 5，可以少写一层嵌套。', en: 'Test divisibility by 15 first to avoid nested conditions.' }
    ],
    templates: {
      js: [
        'const n = Number(readAll().trim());',
        'const out = [];',
        'for (let i = 1; i <= n; i++) {',
        '  // TODO: 按规则推入 Fizz / Buzz / FizzBuzz / 数字',
        '  out.push(String(i));',
        '}',
        'if (out.length) console.log(out.join("\\n"));'
      ].join('\n'),
      py: [
        'import sys',
        'n = int(sys.stdin.read().strip() or 0)',
        'out = []',
        'for i in range(1, n + 1):',
        '    # TODO: 按规则追加 Fizz / Buzz / FizzBuzz / 数字',
        '    out.append(str(i))',
        'if out:',
        '    print("\\n".join(out))'
      ].join('\n')
    },
    solutions: {
      js: [
        'const n = Number(readAll().trim());',
        'const out = [];',
        'for (let i = 1; i <= n; i++) {',
        '  if (i % 15 === 0) out.push("FizzBuzz");',
        '  else if (i % 3 === 0) out.push("Fizz");',
        '  else if (i % 5 === 0) out.push("Buzz");',
        '  else out.push(String(i));',
        '}',
        'if (out.length) console.log(out.join("\\n"));'
      ].join('\n'),
      py: [
        'import sys',
        'n = int(sys.stdin.read().strip() or 0)',
        'out = []',
        'for i in range(1, n + 1):',
        '    if i % 15 == 0:',
        '        out.append("FizzBuzz")',
        '    elif i % 3 == 0:',
        '        out.append("Fizz")',
        '    elif i % 5 == 0:',
        '        out.append("Buzz")',
        '    else:',
        '        out.append(str(i))',
        'if out:',
        '    print("\\n".join(out))'
      ].join('\n')
    }
  },

  {
    id: 'binary-search',
    title: { zh: '二分查找', en: 'Binary Search' },
    difficulty: 'easy',
    tags: ['array', 'search'],
    demoId: 'sorting',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    statement: {
      zh: '在一个严格递增的整数数组中查找目标值，返回它的下标（从 0 开始）。若不存在，输出 -1。要求达到 O(log n)，线性扫描虽然结果正确但不算通过标准做法。',
      en: 'Search a strictly increasing integer array for a target and return its 0-based index, or -1 if absent. Aim for O(log n); a linear scan gets the right answer but misses the point.'
    },
    input: {
      zh: '第一行两个整数 n 和 target。第二行 n 个严格递增的整数。',
      en: 'The first line holds n and target. The second line holds n strictly increasing integers.'
    },
    output: { zh: '一个整数，表示下标或 -1。', en: 'One integer: the index, or -1.' },
    samples: [{ input: '6 5\n1 3 5 7 9 11', output: '2' }],
    tests: [
      { name: '样例 · 命中', input: '6 5\n1 3 5 7 9 11', output: '2' },
      { name: '缺失', input: '6 4\n1 3 5 7 9 11', output: '-1' },
      { name: '左端点', input: '5 1\n1 2 3 4 5', output: '0' },
      { name: '右端点', input: '5 5\n1 2 3 4 5', output: '4' },
      { name: '单元素命中', input: '1 42\n42', output: '0' },
      { name: '负数数组', input: '7 -3\n-9 -7 -5 -3 -1 4 8', output: '3' }
    ],
    hints: [
      { zh: '循环条件写成 left <= right，每次用 mid = left + ((right - left) >> 1) 可以避开溢出。', en: 'Use left <= right and mid = left + ((right - left) >> 1) to avoid overflow.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [n, target] = lines[0].trim().split(/\\s+/).map(Number);',
        'const arr = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        'let left = 0, right = n - 1, answer = -1;',
        'while (left <= right) {',
        '  // TODO: 取中点并比较',
        '  break;',
        '}',
        'console.log(answer);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().strip().split("\\n")',
        'n, target = map(int, lines[0].split())',
        'arr = list(map(int, lines[1].split()))',
        '',
        'left, right, answer = 0, n - 1, -1',
        'while left <= right:',
        '    # TODO: 取中点并比较',
        '    break',
        'print(answer)'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [n, target] = lines[0].trim().split(/\\s+/).map(Number);',
        'const arr = lines[1].trim().split(/\\s+/).map(Number);',
        'let left = 0, right = n - 1, answer = -1;',
        'while (left <= right) {',
        '  const mid = left + ((right - left) >> 1);',
        '  if (arr[mid] === target) { answer = mid; break; }',
        '  if (arr[mid] < target) left = mid + 1;',
        '  else right = mid - 1;',
        '}',
        'console.log(answer);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().strip().split("\\n")',
        'n, target = map(int, lines[0].split())',
        'arr = list(map(int, lines[1].split()))',
        'left, right, answer = 0, n - 1, -1',
        'while left <= right:',
        '    mid = (left + right) // 2',
        '    if arr[mid] == target:',
        '        answer = mid',
        '        break',
        '    if arr[mid] < target:',
        '        left = mid + 1',
        '    else:',
        '        right = mid - 1',
        'print(answer)'
      ].join('\n')
    }
  },

  {
    id: 'two-sum',
    title: { zh: '两数之和', en: 'Two Sum' },
    difficulty: 'medium',
    tags: ['array', 'hashmap'],
    complexity: { time: 'O(n)', space: 'O(n)' },
    statement: {
      zh: '给定 n 个整数和目标值 target，找出两个下标 i < j，使得 a[i] + a[j] === target。每道测试保证恰好存在一组答案，输出这对下标（升序，从 0 开始）。',
      en: 'Given n integers and a target, find indices i < j with a[i] + a[j] === target. Each test has exactly one valid pair; print the two indices in ascending order, 0-based.'
    },
    input: { zh: '第一行 n 和 target，第二行 n 个整数。', en: 'The first line holds n and target; the second line holds n integers.' },
    output: { zh: '两个用空格分隔的下标。', en: 'Two indices separated by a space.' },
    samples: [{ input: '4 9\n2 7 11 15', output: '0 1' }],
    tests: [
      { name: '样例', input: '4 9\n2 7 11 15', output: '0 1' },
      { name: '含负数', input: '4 -3\n-5 1 2 -2', output: '0 2' },
      { name: '相邻两数', input: '6 100\n1 2 3 48 52 7', output: '3 4' },
      { name: '重复元素', input: '5 6\n3 3 4 5 6', output: '0 1' },
      { name: '末尾组合', input: '5 26\n1 2 3 11 15', output: '3 4' }
    ],
    hints: [
      { zh: '每读到一个数，先看 target 与它的差是否已经在表里，再把自己记进去。这样能保证 i < j 且不会用到自己。', en: 'For each value, first check whether target minus it is already in the map, then insert. That guarantees i < j and avoids reusing the same element.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [n, target] = lines[0].trim().split(/\\s+/).map(Number);',
        'const arr = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        'const seen = new Map(); // 值 -> 下标',
        'let answer = null;',
        'for (let i = 0; i < n; i++) {',
        '  // TODO: 先查表，再记录当前值',
        '}',
        'console.log(answer || "none");'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().strip().split("\\n")',
        'n, target = map(int, lines[0].split())',
        'arr = list(map(int, lines[1].split()))',
        '',
        'seen = {}  # 值 -> 下标',
        'answer = None',
        'for i, v in enumerate(arr):',
        '    # TODO: 先查表，再记录当前值',
        '    pass',
        'print("none" if answer is None else "%d %d" % answer)'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [n, target] = lines[0].trim().split(/\\s+/).map(Number);',
        'const arr = lines[1].trim().split(/\\s+/).map(Number);',
        'const seen = new Map();',
        'let answer = null;',
        'for (let i = 0; i < n; i++) {',
        '  const need = target - arr[i];',
        '  if (seen.has(need)) { answer = [seen.get(need), i]; break; }',
        '  if (!seen.has(arr[i])) seen.set(arr[i], i);',
        '}',
        'console.log(answer ? answer.join(" ") : "none");'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().strip().split("\\n")',
        'n, target = map(int, lines[0].split())',
        'arr = list(map(int, lines[1].split()))',
        'seen = {}',
        'answer = None',
        'for i, v in enumerate(arr):',
        '    need = target - v',
        '    if need in seen:',
        '        answer = (seen[need], i)',
        '        break',
        '    if v not in seen:',
        '        seen[v] = i',
        'print("none" if answer is None else "%d %d" % answer)'
      ].join('\n')
    }
  },

  {
    id: 'max-subarray',
    title: { zh: '最大子数组和', en: 'Maximum Subarray Sum' },
    difficulty: 'medium',
    tags: ['array', 'dp'],
    demoId: 'dp',
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '给定一个整数数组，找出一个连续子数组，使它的元素和最大，输出这个最大和。子数组至少要包含一个元素。',
      en: 'Given an integer array, find the contiguous subarray with the largest sum and print that sum. The subarray must contain at least one element.'
    },
    input: { zh: '第一行 n，第二行 n 个整数。', en: 'The first line holds n; the second line holds n integers.' },
    output: { zh: '一个整数，最大子数组和。', en: 'One integer: the maximum subarray sum.' },
    samples: [{ input: '9\n-2 1 -3 4 -1 2 1 -5 4', output: '6' }],
    tests: [
      { name: '经典样例', input: '9\n-2 1 -3 4 -1 2 1 -5 4', output: '6' },
      { name: '全负数', input: '5\n-8 -3 -6 -2 -5', output: '-2' },
      { name: '单元素', input: '1\n-1', output: '-1' },
      { name: '全正数', input: '4\n1 2 3 4', output: '10' },
      { name: '零穿插', input: '6\n0 -1 0 -2 0 0', output: '0' }
    ],
    hints: [
      { zh: '设 dp[i] 表示「以 i 结尾的最大子数组和」，dp[i] = max(a[i], dp[i-1] + a[i])，只需要保存上一项。', en: 'Let dp[i] be the best sum ending at i: dp[i] = max(a[i], dp[i-1] + a[i]). Only the previous value is needed.' },
      { zh: '全负数时答案是最大的那个负数，所以初始值不要设成 0。', en: 'With all negatives the answer is the largest negative, so do not initialise to 0.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const a = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        'let best = a[0], current = a[0];',
        'for (let i = 1; i < n; i++) {',
        '  // TODO: 更新 current 与 best',
        '}',
        'console.log(best);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().strip().split("\\n")',
        'n = int(lines[0])',
        'a = list(map(int, lines[1].split()))',
        '',
        'best = current = a[0]',
        'for i in range(1, n):',
        '    # TODO: 更新 current 与 best',
        '    pass',
        'print(best)'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const a = lines[1].trim().split(/\\s+/).map(Number);',
        'let best = a[0], current = a[0];',
        'for (let i = 1; i < n; i++) {',
        '  current = Math.max(a[i], current + a[i]);',
        '  best = Math.max(best, current);',
        '}',
        'console.log(best);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().strip().split("\\n")',
        'n = int(lines[0])',
        'a = list(map(int, lines[1].split()))',
        'best = current = a[0]',
        'for i in range(1, n):',
        '    current = max(a[i], current + a[i])',
        '    best = max(best, current)',
        'print(best)'
      ].join('\n')
    }
  },

  {
    id: 'valid-parentheses',
    title: { zh: '有效括号', en: 'Valid Parentheses' },
    difficulty: 'medium',
    tags: ['stack', 'string'],
    complexity: { time: 'O(n)', space: 'O(n)' },
    statement: {
      zh: '给定只包含 ()[]{} 的字符串，判断括号是否合法配对：左右类型匹配、顺序正确、没有多余或缺失。合法输出 true，否则 false。',
      en: 'Given a string containing only ()[]{}, decide whether the brackets are balanced: types match, order is correct, nothing spurious or missing. Print true or false.'
    },
    input: { zh: '一行括号字符串。', en: 'One line of bracket characters.' },
    output: { zh: 'true 或 false。', en: 'true or false.' },
    samples: [
      { input: '()[]{}', output: 'true' },
      { input: '(]', output: 'false' }
    ],
    tests: [
      { name: '并列', input: '()[]{}', output: 'true' },
      { name: '类型不匹配', input: '(]', output: 'false' },
      { name: '嵌套', input: '{[()()]}', output: 'true' },
      { name: '多余右括号', input: '([)]', output: 'false' },
      { name: '只有左括号', input: '((((', output: 'false' },
      { name: '空串', input: '', output: 'true' },
      { name: '深层嵌套', input: '(((((())))))', output: 'true' }
    ],
    hints: [
      { zh: '遇到左括号入栈，遇到右括号就检查栈顶是不是对应的左括号；最后栈必须为空。', en: 'Push openers, match against the top for each closer, and require an empty stack at the end.' }
    ],
    templates: {
      js: [
        'const s = readAll().replace(/\\r?\\n$/, "");',
        'const pairs = { ")": "(", "]": "[", "}": "{" };',
        'const stack = [];',
        'let ok = true;',
        '',
        'for (const ch of s) {',
        '  // TODO: 维护栈',
        '}',
        'console.log(ok);'
      ].join('\n'),
      py: [
        'import sys',
        's = sys.stdin.read().replace("\\n", "")',
        'pairs = {")": "(", "]": "[", "}": "{"}',
        'stack = []',
        'ok = True',
        '',
        'for ch in s:',
        '    # TODO: 维护栈',
        '    pass',
        'print("true" if ok else "false")'
      ].join('\n')
    },
    solutions: {
      js: [
        'const s = readAll().replace(/\\r?\\n$/, "");',
        'const pairs = { ")": "(", "]": "[", "}": "{" };',
        'const stack = [];',
        'let ok = true;',
        'for (const ch of s) {',
        '  if (ch === "(" || ch === "[" || ch === "{") { stack.push(ch); continue; }',
        '  if (stack.pop() !== pairs[ch]) { ok = false; break; }',
        '}',
        'if (stack.length) ok = false;',
        'console.log(ok);'
      ].join('\n'),
      py: [
        'import sys',
        's = sys.stdin.read().replace("\\n", "")',
        'pairs = {")": "(", "]": "[", "}": "{"}',
        'stack = []',
        'ok = True',
        'for ch in s:',
        '    if ch in "([{":',
        '        stack.append(ch)',
        '        continue',
        '    if not stack or stack.pop() != pairs.get(ch):',
        '        ok = False',
        '        break',
        'if stack:',
        '    ok = False',
        'print("true" if ok else "false")'
      ].join('\n')
    }
  },

  {
    id: 'lcs',
    title: { zh: '最长公共子序列', en: 'Longest Common Subsequence' },
    difficulty: 'medium',
    tags: ['dp', 'string'],
    demoId: 'dp',
    complexity: { time: 'O(n·m)', space: 'O(min(n,m))' },
    statement: {
      zh: '给定两个字符串，求它们的最长公共子序列长度。子序列不必连续，但必须保持原有的相对顺序。',
      en: 'Given two strings, compute the length of their longest common subsequence. The subsequence need not be contiguous, but the relative order must be preserved.'
    },
    input: { zh: '两行，每行一个字符串。', en: 'Two lines, one string each.' },
    output: { zh: '一个整数，最长公共子序列的长度。', en: 'One integer: the LCS length.' },
    samples: [{ input: 'abcde\nace', output: '3' }],
    tests: [
      { name: '样例', input: 'abcde\nace', output: '3' },
      { name: '完全相同', input: 'hello\nhello', output: '5' },
      { name: '完全不同', input: 'abc\nxyz', output: '0' },
      { name: '有重复字符', input: 'aab\naba', output: '2' },
      { name: '空串', input: '\nabc', output: '0' },
      { name: '长一些', input: 'AGGTAB\nGXTXAYB', output: '4' }
    ],
    hints: [
      { zh: 'dp[i][j] 表示前 i 个字符与前 j 个字符的答案；字符相同就取左上角加一，否则取上方与左方的较大者。', en: 'dp[i][j] covers the first i and j characters: equal characters take the diagonal plus one, otherwise the better of the top and left cells.' },
      { zh: '因为每次只依赖上一行，可以用一维数组滚动，注意从右往左更新。', en: 'Only the previous row is needed, so one rolling array suffices — update right to left.' }
    ],
    templates: {
      js: [
        'const lines = readAll().replace(/\\r?\\n$/, "").split(/\\r?\\n/);',
        'const a = lines[0] || "", b = lines[1] || "";',
        '',
        '// dp[i][j] = a 前 i 个字符与 b 前 j 个字符的最长公共子序列长度',
        'const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));',
        '',
        'for (let i = 1; i <= a.length; i++) {',
        '  for (let j = 1; j <= b.length; j++) {',
        '    // TODO: 填表',
        '  }',
        '}',
        'console.log(dp[a.length][b.length]);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().rstrip("\\n").split("\\n")',
        'a = lines[0] if lines else ""',
        'b = lines[1] if len(lines) > 1 else ""',
        '',
        'dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]',
        'for i in range(1, len(a) + 1):',
        '    for j in range(1, len(b) + 1):',
        '        pass  # TODO: 填表',
        'print(dp[len(a)][len(b)])'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().replace(/\\r?\\n$/, "").split(/\\r?\\n/);',
        'const a = lines[0] || "", b = lines[1] || "";',
        'let prev = new Array(b.length + 1).fill(0);',
        'for (let i = 1; i <= a.length; i++) {',
        '  const cur = new Array(b.length + 1).fill(0);',
        '  for (let j = 1; j <= b.length; j++) {',
        '    cur[j] = a[i - 1] === b[j - 1]',
        '      ? prev[j - 1] + 1',
        '      : Math.max(prev[j], cur[j - 1]);',
        '  }',
        '  prev = cur;',
        '}',
        'console.log(prev[b.length]);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().rstrip("\\n").split("\\n")',
        'a = lines[0] if lines else ""',
        'b = lines[1] if len(lines) > 1 else ""',
        'prev = [0] * (len(b) + 1)',
        'for i in range(1, len(a) + 1):',
        '    cur = [0] * (len(b) + 1)',
        '    for j in range(1, len(b) + 1):',
        '        if a[i - 1] == b[j - 1]:',
        '            cur[j] = prev[j - 1] + 1',
        '        else:',
        '            cur[j] = max(prev[j], cur[j - 1])',
        '    prev = cur',
        'print(prev[len(b)])'
      ].join('\n')
    }
  },

  {
    id: 'edit-distance',
    title: { zh: '编辑距离', en: 'Edit Distance' },
    difficulty: 'hard',
    tags: ['dp', 'string'],
    demoId: 'dp',
    complexity: { time: 'O(n·m)', space: 'O(n·m)' },
    statement: {
      zh: '给定两个字符串，允许插入、删除、替换单个字符，求把第一个串变成第二个串所需的最少操作次数。',
      en: 'Given two strings, compute the minimum number of single-character insertions, deletions or replacements needed to turn the first into the second.'
    },
    input: { zh: '两行字符串。', en: 'Two lines of text.' },
    output: { zh: '一个整数，最少操作次数。', en: 'One integer: the minimum number of operations.' },
    samples: [{ input: 'horse\nros', output: '3' }],
    tests: [
      { name: '经典样例', input: 'horse\nros', output: '3' },
      { name: '完全相同', input: 'intention\nintention', output: '0' },
      { name: '经典样例 2', input: 'intention\nexecution', output: '5' },
      { name: '插入', input: 'abc\nabcd', output: '1' },
      { name: '清空', input: 'abc\n', output: '3' },
      { name: '中文', input: '高桌实验室\n高桌实验室啊', output: '1' }
    ],
    hints: [
      { zh: 'dp[i][j] 表示 a 的前 i 个字符变成 b 的前 j 个字符的花费。边界 dp[i][0] = i，dp[0][j] = j。', en: 'dp[i][j] is the cost of turning the first i characters of a into the first j of b, with borders dp[i][0] = i and dp[0][j] = j.' },
      { zh: '字符相等时直接继承左上角，不等时取左、上、左上三者最小值加一。', en: 'Equal characters inherit the diagonal; otherwise take the minimum of left, top and diagonal, plus one.' }
    ],
    templates: {
      js: [
        'const lines = readAll().replace(/\\r?\\n$/, "").split(/\\r?\\n/);',
        'const a = lines[0] || "", b = lines[1] || "";',
        '',
        'const dp = Array.from({ length: a.length + 1 }, (_, i) =>',
        '  Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));',
        '',
        'for (let i = 1; i <= a.length; i++) {',
        '  for (let j = 1; j <= b.length; j++) {',
        '    // TODO: 填表',
        '  }',
        '}',
        'console.log(dp[a.length][b.length]);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().rstrip("\\n").split("\\n")',
        'a = lines[0] if lines else ""',
        'b = lines[1] if len(lines) > 1 else ""',
        '',
        'dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]',
        'for i in range(len(a) + 1):',
        '    dp[i][0] = i',
        'for j in range(len(b) + 1):',
        '    dp[0][j] = j',
        '',
        'for i in range(1, len(a) + 1):',
        '    for j in range(1, len(b) + 1):',
        '        pass  # TODO: 填表',
        'print(dp[len(a)][len(b)])'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().replace(/\\r?\\n$/, "").split(/\\r?\\n/);',
        'const a = lines[0] || "", b = lines[1] || "";',
        'const dp = Array.from({ length: a.length + 1 }, (_, i) =>',
        '  Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));',
        'for (let i = 1; i <= a.length; i++) {',
        '  for (let j = 1; j <= b.length; j++) {',
        '    if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];',
        '    else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);',
        '  }',
        '}',
        'console.log(dp[a.length][b.length]);'
      ].join('\n'),
      py: [
        'import sys',
        'lines = sys.stdin.read().rstrip("\\n").split("\\n")',
        'a = lines[0] if lines else ""',
        'b = lines[1] if len(lines) > 1 else ""',
        'dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]',
        'for i in range(len(a) + 1):',
        '    dp[i][0] = i',
        'for j in range(len(b) + 1):',
        '    dp[0][j] = j',
        'for i in range(1, len(a) + 1):',
        '    for j in range(1, len(b) + 1):',
        '        if a[i - 1] == b[j - 1]:',
        '            dp[i][j] = dp[i - 1][j - 1]',
        '        else:',
        '            dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])',
        'print(dp[len(a)][len(b)])'
      ].join('\n')
    }
  },

  {
    id: 'dijkstra',
    title: { zh: '单源最短路', en: 'Single-Source Shortest Path' },
    difficulty: 'hard',
    tags: ['graph', 'heap'],
    complexity: { time: 'O(m log n)', space: 'O(n + m)' },
    statement: {
      zh: '给定一个无向带权图（边权为正整数）和起点 s，求 s 到每个点的最短距离。不可达的点输出 -1。输出的数字之间用空格分隔。',
      en: 'Given an undirected weighted graph with positive integer weights and a source s, print the shortest distance from s to every vertex, using -1 for unreachable ones, separated by spaces.'
    },
    input: {
      zh: '第一行三个整数 n、m、s（点为 0 到 n-1）。接下来 m 行，每行三个整数 u、v、w，表示一条无向边。',
      en: 'The first line holds n, m and s (vertices are 0..n-1). Each of the next m lines holds u, v and w for an undirected edge.'
    },
    output: { zh: '一行 n 个整数。', en: 'One line with n integers.' },
    samples: [
      { input: '5 6 0\n0 1 4\n0 2 1\n2 1 2\n1 3 5\n2 3 8\n3 4 3', output: '0 3 1 8 11' }
    ],
    tests: [
      { name: '样例', input: '5 6 0\n0 1 4\n0 2 1\n2 1 2\n1 3 5\n2 3 8\n3 4 3', output: '0 3 1 8 11' },
      { name: '孤立点', input: '3 1 0\n0 1 7', output: '0 7 -1' },
      { name: '单点', input: '1 0 0', output: '0' },
      { name: '需要绕路', input: '4 4 0\n0 1 10\n0 2 1\n2 1 1\n1 3 1', output: '0 2 1 3' },
      { name: '平行边', input: '3 3 0\n0 1 5\n0 1 2\n1 2 1', output: '0 2 3' }
    ],
    hints: [
      { zh: '朴素 O(n²) 也能过小数据，但要处理 m 较大时应该用小根堆每次弹出当前最近的点。', en: 'A plain O(n²) scan passes small inputs, but a min-heap that pops the closest pending vertex scales to larger m.' },
      { zh: '弹出时如果发现距离已经不是最新的就跳过，这是常用的「懒惰删除」写法。', en: 'Skip stale heap entries whose distance no longer matches the current best — the usual lazy-deletion pattern.' }
    ],
    templates: {
      js: [
        'const toks = readAll().trim().split(/\\s+/).map(Number);',
        'let p = 0;',
        'const n = toks[p++], m = toks[p++], s = toks[p++];',
        'const adj = Array.from({ length: n }, () => []);',
        'for (let i = 0; i < m; i++) {',
        '  const u = toks[p++], v = toks[p++], w = toks[p++];',
        '  adj[u].push([v, w]);',
        '  adj[v].push([u, w]);',
        '}',
        '',
        'const INF = Infinity;',
        'const dist = new Array(n).fill(INF);',
        'dist[s] = 0;',
        '',
        '// TODO: 用优先队列（小根堆）松弛每条边',
        '// 提示：也可以先用 O(n^2) 的朴素做法把样例跑通',
        '',
        'console.log(dist.map(d => (d === INF ? -1 : d)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, heapq',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    p = 0',
        '    n = int(data[p]); m = int(data[p + 1]); s = int(data[p + 2]); p += 3',
        '    adj = [[] for _ in range(n)]',
        '    for _ in range(m):',
        '        u = int(data[p]); v = int(data[p + 1]); w = int(data[p + 2]); p += 3',
        '        adj[u].append((v, w))',
        '        adj[v].append((u, w))',
        '',
        '    INF = float("inf")',
        '    dist = [INF] * n',
        '    dist[s] = 0',
        '    heap = [(0, s)]',
        '    # TODO: 松弛每条边',
        '    while heap:',
        '        break',
        '',
        '    print(" ".join("-1" if d == INF else str(d) for d in dist))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const toks = readAll().trim().split(/\\s+/).map(Number);',
        'let p = 0;',
        'const n = toks[p++], m = toks[p++], s = toks[p++];',
        'const adj = Array.from({ length: n }, () => []);',
        'for (let i = 0; i < m; i++) {',
        '  const u = toks[p++], v = toks[p++], w = toks[p++];',
        '  adj[u].push([v, w]);',
        '  adj[v].push([u, w]);',
        '}',
        '',
        '// 手写小根堆',
        'const heap = [];',
        'function push(item) {',
        '  heap.push(item);',
        '  let i = heap.length - 1;',
        '  while (i > 0) {',
        '    const parent = (i - 1) >> 1;',
        '    if (heap[parent][0] <= heap[i][0]) break;',
        '    [heap[parent], heap[i]] = [heap[i], heap[parent]];',
        '    i = parent;',
        '  }',
        '}',
        'function pop() {',
        '  const top = heap[0];',
        '  const last = heap.pop();',
        '  if (heap.length) {',
        '    heap[0] = last;',
        '    let i = 0;',
        '    for (;;) {',
        '      const l = 2 * i + 1, r = l + 1;',
        '      let smallest = i;',
        '      if (l < heap.length && heap[l][0] < heap[smallest][0]) smallest = l;',
        '      if (r < heap.length && heap[r][0] < heap[smallest][0]) smallest = r;',
        '      if (smallest === i) break;',
        '      [heap[smallest], heap[i]] = [heap[i], heap[smallest]];',
        '      i = smallest;',
        '    }',
        '  }',
        '  return top;',
        '}',
        '',
        'const INF = Infinity;',
        'const dist = new Array(n).fill(INF);',
        'dist[s] = 0;',
        'push([0, s]);',
        'while (heap.length) {',
        '  const [d, u] = pop();',
        '  if (d > dist[u]) continue;',
        '  for (const [v, w] of adj[u]) {',
        '    if (d + w < dist[v]) { dist[v] = d + w; push([dist[v], v]); }',
        '  }',
        '}',
        'console.log(dist.map(d => (d === INF ? -1 : d)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, heapq',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    p = 0',
        '    n = int(data[p]); m = int(data[p + 1]); s = int(data[p + 2]); p += 3',
        '    adj = [[] for _ in range(n)]',
        '    for _ in range(m):',
        '        u = int(data[p]); v = int(data[p + 1]); w = int(data[p + 2]); p += 3',
        '        adj[u].append((v, w))',
        '        adj[v].append((u, w))',
        '',
        '    INF = float("inf")',
        '    dist = [INF] * n',
        '    dist[s] = 0',
        '    heap = [(0, s)]',
        '    while heap:',
        '        d, u = heapq.heappop(heap)',
        '        if d > dist[u]:',
        '            continue',
        '        for v, w in adj[u]:',
        '            nd = d + w',
        '            if nd < dist[v]:',
        '                dist[v] = nd',
        '                heapq.heappush(heap, (nd, v))',
        '',
        '    print(" ".join("-1" if d == INF else str(d) for d in dist))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'n-queens',
    title: { zh: 'N 皇后计数', en: 'N-Queens Count' },
    difficulty: 'hard',
    tags: ['backtracking', 'recursion'],
    demoId: 'bst',
    complexity: { time: 'O(n!)', space: 'O(n)' },
    statement: {
      zh: '在 n×n 的棋盘上放置 n 个皇后，使它们互不攻击（不同行、不同列、不同对角线），输出方案总数。只需要计数，不需要输出具体摆法。',
      en: 'Place n queens on an n×n board so that none attack each other (no shared row, column or diagonal) and print the number of solutions. Only the count is needed.'
    },
    input: { zh: '一个整数 n（1 ≤ n ≤ 12）。', en: 'A single integer n with 1 ≤ n ≤ 12.' },
    output: { zh: '一个整数，方案数。', en: 'One integer: the number of solutions.' },
    samples: [{ input: '4', output: '2' }],
    tests: [
      { name: 'n = 4', input: '4', output: '2' },
      { name: 'n = 1', input: '1', output: '1' },
      { name: 'n = 2', input: '2', output: '0' },
      { name: 'n = 6', input: '6', output: '4' },
      { name: 'n = 8', input: '8', output: '92' },
      { name: 'n = 10', input: '10', output: '724' }
    ],
    hints: [
      { zh: '一行一行地放，只需要记录「列」「主对角线」「副对角线」是否被占用。', en: 'Place queens row by row, tracking which columns and which two diagonal families are occupied.' },
      { zh: '用三个整数做位掩码，判断条件就是 (cols | diag1 | diag2) 哪些位为 0，速度会快很多。', en: 'Three bitmask integers are enough: free positions are the zero bits of cols | diag1 | diag2.' }
    ],
    templates: {
      js: [
        'const n = Number(readAll().trim());',
        '',
        'let count = 0;',
        '',
        'function place(cols, diag1, diag2) {',
        '  // TODO: 用位掩码回溯，统计方案数',
        '}',
        '',
        'place(0, 0, 0);',
        'console.log(count);'
      ].join('\n'),
      py: [
        'import sys',
        'n = int(sys.stdin.read().strip())',
        '',
        'count = 0',
        '',
        'def place(cols, diag1, diag2):',
        '    global count',
        '    # TODO: 用位掩码回溯，统计方案数',
        '    pass',
        '',
        'place(0, 0, 0)',
        'print(count)'
      ].join('\n')
    },
    solutions: {
      js: [
        'const n = Number(readAll().trim());',
        'const full = (1 << n) - 1;',
        'let count = 0;',
        '',
        'function place(cols, diag1, diag2) {',
        '  if (cols === full) { count++; return; }',
        '  let free = full & ~(cols | diag1 | diag2);',
        '  while (free) {',
        '    const bit = free & -free;',
        '    free ^= bit;',
        '    place(cols | bit, ((diag1 | bit) << 1) & full, (diag2 | bit) >> 1);',
        '  }',
        '}',
        '',
        'place(0, 0, 0);',
        'console.log(count);'
      ].join('\n'),
      py: [
        'import sys',
        'n = int(sys.stdin.read().strip())',
        'full = (1 << n) - 1',
        'count = 0',
        '',
        'def place(cols, diag1, diag2):',
        '    global count',
        '    if cols == full:',
        '        count += 1',
        '        return',
        '    free = full & ~(cols | diag1 | diag2)',
        '    while free:',
        '        bit = free & -free',
        '        free ^= bit',
        '        place(cols | bit, ((diag1 | bit) << 1) & full, (diag2 | bit) >> 1)',
        '',
        'place(0, 0, 0)',
        'print(count)'
      ].join('\n')
    }
  },

  {
    id: 'topo-sort',
    title: { zh: '拓扑排序', en: 'Topological Sort' },
    difficulty: 'medium',
    tags: ['graph', 'array'],
    complexity: { time: 'O(n + m)', space: 'O(n + m)' },
    statement: {
      zh: '给定一个有向无环图，输出它的一个拓扑序。若同时有多个点入度为 0，优先输出编号最小的那个（这样结果唯一）。若图中有环，输出 cycle。',
      en: 'Given a directed acyclic graph, output a topological order. When several vertices have in-degree zero, take the smallest index first so the answer is unique. If the graph has a cycle, print cycle.'
    },
    input: {
      zh: '第一行 n、m。接下来 m 行每行两个整数 u v，表示一条 u → v 的有向边。',
      en: 'The first line holds n and m. Each of the next m lines holds u v for the directed edge u → v.'
    },
    output: { zh: '一行 n 个整数表示拓扑序；有环时输出 cycle。', en: 'One line with the n vertices in topological order, or cycle.' },
    samples: [
      { input: '6 6\n5 2\n5 0\n4 0\n4 1\n2 3\n3 1', output: '4 5 0 2 3 1' }
    ],
    tests: [
      { name: '样例', input: '6 6\n5 2\n5 0\n4 0\n4 1\n2 3\n3 1', output: '4 5 0 2 3 1' },
      { name: '链', input: '4 3\n0 1\n1 2\n2 3', output: '0 1 2 3' },
      { name: '有环', input: '3 3\n0 1\n1 2\n2 0', output: 'cycle' },
      { name: '无边', input: '3 0', output: '0 1 2' },
      { name: '自环', input: '2 2\n0 0\n0 1', output: 'cycle' }
    ],
    hints: [
      { zh: '每次取当前入度为 0 的最小编号点，可以用小根堆或直接扫描，数据量不大时扫描更简单。', en: 'Always take the smallest zero in-degree vertex: a heap works, and for small inputs a plain scan is simpler.' }
    ],
    templates: {
      js: [
        'const toks = readAll().trim().split(/\\s+/).map(Number);',
        'const n = toks[0], m = toks[1];',
        'const adj = Array.from({ length: n }, () => []);',
        'const indeg = new Array(n).fill(0);',
        'let p = 2;',
        'for (let i = 0; i < m; i++) {',
        '  const u = toks[p++], v = toks[p++];',
        '  adj[u].push(v);',
        '  indeg[v]++;',
        '}',
        '',
        'const order = [];',
        'const used = new Array(n).fill(false);',
        'for (let step = 0; step < n; step++) {',
        '  // TODO: 找到入度为 0 且未使用的最小编号点，加入 order 并更新它指向点的入度',
        '  break;',
        '}',
        '',
        'console.log(order.length === n ? order.join(" ") : "cycle");'
      ].join('\n'),
      py: [
        'import sys',
        'data = sys.stdin.read().split()',
        'n = int(data[0]); m = int(data[1])',
        'adj = [[] for _ in range(n)]',
        'indeg = [0] * n',
        'p = 2',
        'for _ in range(m):',
        '    u = int(data[p]); v = int(data[p + 1]); p += 2',
        '    adj[u].append(v)',
        '    indeg[v] += 1',
        '',
        'order = []',
        'used = [False] * n',
        'for _ in range(n):',
        '    pass  # TODO: 找到入度为 0 的最小编号点',
        'print(" ".join(map(str, order)) if len(order) == n else "cycle")'
      ].join('\n')
    },
    solutions: {
      js: [
        'const toks = readAll().trim().split(/\\s+/).map(Number);',
        'const n = toks[0], m = toks[1];',
        'const adj = Array.from({ length: n }, () => []);',
        'const indeg = new Array(n).fill(0);',
        'let p = 2;',
        'for (let i = 0; i < m; i++) {',
        '  const u = toks[p++], v = toks[p++];',
        '  adj[u].push(v);',
        '  indeg[v]++;',
        '}',
        'const order = [];',
        'const used = new Array(n).fill(false);',
        'for (let step = 0; step < n; step++) {',
        '  let pick = -1;',
        '  for (let i = 0; i < n; i++) {',
        '    if (!used[i] && indeg[i] === 0) { pick = i; break; }',
        '  }',
        '  if (pick < 0) break;',
        '  used[pick] = true;',
        '  order.push(pick);',
        '  for (const v of adj[pick]) indeg[v]--;',
        '}',
        'console.log(order.length === n ? order.join(" ") : "cycle");'
      ].join('\n'),
      py: [
        'import sys',
        'data = sys.stdin.read().split()',
        'n = int(data[0]); m = int(data[1])',
        'adj = [[] for _ in range(n)]',
        'indeg = [0] * n',
        'p = 2',
        'for _ in range(m):',
        '    u = int(data[p]); v = int(data[p + 1]); p += 2',
        '    adj[u].append(v)',
        '    indeg[v] += 1',
        '',
        'order = []',
        'used = [False] * n',
        'for _ in range(n):',
        '    pick = -1',
        '    for i in range(n):',
        '        if not used[i] and indeg[i] == 0:',
        '            pick = i',
        '            break',
        '    if pick < 0:',
        '        break',
        '    used[pick] = True',
        '    order.append(pick)',
        '    for v in adj[pick]:',
        '        indeg[v] -= 1',
        'print(" ".join(map(str, order)) if len(order) == n else "cycle")'
      ].join('\n')
    }
  },

  /* ============================================================
     机器学习专题
     章节顺序参照《机器学习》教材：模型评估 → 线性模型 → 决策树 →
     神经网络 → 贝叶斯 → 聚类 → 降维 → 强化学习。
     题目与数据均为本站原创，只沿用公开的标准定义。
     ============================================================ */

  {
    id: 'ml-metrics',
    title: { zh: '分类性能度量', en: 'Classification metrics' },
    difficulty: 'easy',
    tags: ['ml', 'modeleval', 'basics'],
    complexity: { time: 'O(m)', space: 'O(1)' },
    statement: {
      zh: '给定真实标签与预测标签（正类为 1），先统计混淆矩阵的 TP、FP、FN、TN，再输出查准率 P、查全率 R、F1 与精度 Acc。分母为 0 时该指标记 0。',
      en: 'Given true and predicted labels with 1 as the positive class, build the confusion matrix (TP, FP, FN, TN) and report precision P, recall R, F1 and accuracy. Any metric with a zero denominator counts as 0.'
    },
    input: { zh: '第一行 m；随后 m 行，每行两个整数 y_true、y_pred。', en: 'First line m; each of the next m lines holds y_true and y_pred.' },
    output: { zh: '一行四个数 P、R、F1、Acc，各保留 4 位小数，空格分隔。', en: 'One line with P, R, F1 and Acc, four decimals each.' },
    samples: [
      { input: '4\n1 1\n0 1\n1 0\n0 0', output: '0.5000 0.5000 0.5000 0.5000' }
    ],
    tests: [
      { name: '样例 · 对错各半', input: '4\n1 1\n0 1\n1 0\n0 0', output: '0.5000 0.5000 0.5000 0.5000' },
      { name: '全对', input: '3\n1 1\n1 1\n0 0', output: '1.0000 1.0000 1.0000 1.0000' },
      { name: '没有正类', input: '2\n0 0\n0 0', output: '0.0000 0.0000 0.0000 1.0000' },
      { name: '查准高查全低', input: '6\n1 1\n1 0\n1 0\n0 0\n0 1\n0 0', output: '0.5000 0.3333 0.4000 0.5000' },
      { name: '只漏报不误报', input: '4\n1 0\n1 0\n0 0\n1 1', output: '1.0000 0.3333 0.5000 0.5000' }
    ],
    hints: [
      { zh: 'P = TP/(TP+FP)，R = TP/(TP+FN)，F1 = 2PR/(P+R)，Acc = (TP+TN)/m。', en: 'P = TP/(TP+FP), R = TP/(TP+FN), F1 = 2PR/(P+R), Acc = (TP+TN)/m.' },
      { zh: '每个分母为 0 的分支都要单独处理，否则会得到 NaN。', en: 'Handle every zero denominator explicitly, or you get NaN.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const m = Number(lines[0].trim());',
        'let tp = 0, fp = 0, fn = 0, tn = 0;',
        '',
        'for (let i = 1; i <= m; i++) {',
        '  const [truth, pred] = lines[i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 累加混淆矩阵的四个格子',
        '}',
        '',
        '// TODO: 算出 P、R、F1、Acc（分母为 0 时记 0）',
        'console.log([0, 0, 0, 0].map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0])',
        '    tp = fp = fn = tn = 0',
        '    idx = 1',
        '    for _ in range(m):',
        '        truth, pred = int(data[idx]), int(data[idx + 1])',
        '        idx += 2',
        '        pass  # TODO: 累加混淆矩阵的四个格子',
        '    # TODO: 算出 P、R、F1、Acc（分母为 0 时记 0）',
        '    print(" ".join("%.4f" % v for v in (0, 0, 0, 0)))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const m = Number(lines[0].trim());',
        'let tp = 0, fp = 0, fn = 0, tn = 0;',
        'for (let i = 1; i <= m; i++) {',
        '  const parts = lines[i].trim().split(/\\s+/);',
        '  const truth = Number(parts[0]);',
        '  const pred = Number(parts[1]);',
        '  if (truth === 1 && pred === 1) tp++;',
        '  else if (truth === 0 && pred === 1) fp++;',
        '  else if (truth === 1 && pred === 0) fn++;',
        '  else tn++;',
        '}',
        'const precision = tp + fp > 0 ? tp / (tp + fp) : 0;',
        'const recall = tp + fn > 0 ? tp / (tp + fn) : 0;',
        'const f1 = precision + recall > 0 ? 2 * precision * recall / (precision + recall) : 0;',
        'const acc = m > 0 ? (tp + tn) / m : 0;',
        'console.log([precision, recall, f1, acc].map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0])',
        '    tp = fp = fn = tn = 0',
        '    idx = 1',
        '    for _ in range(m):',
        '        truth, pred = int(data[idx]), int(data[idx + 1])',
        '        idx += 2',
        '        if truth == 1 and pred == 1:',
        '            tp += 1',
        '        elif truth == 0 and pred == 1:',
        '            fp += 1',
        '        elif truth == 1 and pred == 0:',
        '            fn += 1',
        '        else:',
        '            tn += 1',
        '    precision = tp / (tp + fp) if tp + fp > 0 else 0.0',
        '    recall = tp / (tp + fn) if tp + fn > 0 else 0.0',
        '    f1 = 2 * precision * recall / (precision + recall) if precision + recall > 0 else 0.0',
        '    acc = (tp + tn) / m if m > 0 else 0.0',
        '    print(" ".join("%.4f" % v for v in (precision, recall, f1, acc)))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-linreg-gd',
    title: { zh: '线性回归的一步梯度下降', en: 'One gradient step for linear regression' },
    difficulty: 'medium',
    tags: ['ml', 'linmodel', 'math'],
    complexity: { time: 'O(m)', space: 'O(1)' },
    statement: {
      zh: '一元线性回归 f(x) = w x + b，损失取均方误差的一半：E = 1/(2m) Σ (f(x_i) - y_i)²。给定学习率 α 与初始 w、b，求沿负梯度走一步之后的参数。',
      en: 'For one-variable linear regression f(x) = w x + b with E = 1/(2m) Σ (f(x_i) - y_i)², take a single gradient-descent step from the given w, b and learning rate α.'
    },
    input: { zh: '第一行 m、α、w、b；随后 m 行每行 x、y。', en: 'First line: m, α, w, b. Then m lines of x and y.' },
    output: { zh: '一行两个数：更新后的 w、b，各 4 位小数。', en: 'One line with the updated w and b, four decimals each.' },
    samples: [
      { input: '3 0.1 0 0\n1 2\n2 4\n3 6', output: '0.9333 0.4000' }
    ],
    tests: [
      { name: '样例', input: '3 0.1 0 0\n1 2\n2 4\n3 6', output: '0.9333 0.4000' },
      { name: '单样本', input: '1 1 1 1\n2 5', output: '5.0000 3.0000' },
      { name: '已完美拟合', input: '2 0.5 2 1\n0 1\n1 3', output: '2.0000 1.0000' },
      { name: '小学习率', input: '4 0.01 -1 0.5\n1 0\n2 1\n3 2\n4 3', output: '-0.8875 0.5350' },
      { name: '非整数样本', input: '3 0.2 1.5 -0.5\n0.5 1\n1.5 2.5\n2.5 2', output: '1.3917 -0.4833' },
      { name: '零初始参数（负相关数据）', input: '3 0.1 0 0\n1 3\n2 2\n3 1', output: '0.3333 0.2000' }
    ],
    hints: [
      { zh: '∂E/∂w = (1/m) Σ (f(x_i) - y_i)·x_i，∂E/∂b = (1/m) Σ (f(x_i) - y_i)。', en: '∂E/∂w = (1/m) Σ (f(x_i) - y_i)·x_i and ∂E/∂b = (1/m) Σ (f(x_i) - y_i).' },
      { zh: '先把所有残差算完再统一更新，避免边算边改导致后半个样本用上新参数。', en: 'Compute every residual before updating, so later samples do not see half-updated parameters.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [m, alpha, w0, b0] = lines[0].trim().split(/\\s+/).map(Number);',
        'let gw = 0, gb = 0;',
        '',
        'for (let i = 1; i <= m; i++) {',
        '  const [x, y] = lines[i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 累加两个梯度',
        '}',
        '',
        '// TODO: 沿负梯度更新参数',
        'console.log(w0.toFixed(4) + " " + b0.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0]); alpha = float(data[1]); w = float(data[2]); b = float(data[3])',
        '    idx = 4',
        '    gw = gb = 0.0',
        '    for _ in range(m):',
        '        x = float(data[idx]); y = float(data[idx + 1]); idx += 2',
        '        pass  # TODO: 累加两个梯度',
        '    # TODO: 沿负梯度更新参数',
        '    print("%.4f %.4f" % (w, b))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [m, alpha, w0, b0] = lines[0].trim().split(/\\s+/).map(Number);',
        'let gw = 0, gb = 0;',
        'for (let i = 1; i <= m; i++) {',
        '  const [x, y] = lines[i].trim().split(/\\s+/).map(Number);',
        '  const residual = w0 * x + b0 - y;',
        '  gw += residual * x;',
        '  gb += residual;',
        '}',
        'const w = w0 - alpha * (gw / m);',
        'const b = b0 - alpha * (gb / m);',
        'console.log(w.toFixed(4) + " " + b.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0])',
        '    alpha = float(data[1])',
        '    w = float(data[2])',
        '    b = float(data[3])',
        '    idx = 4',
        '    gw = gb = 0.0',
        '    for _ in range(m):',
        '        x = float(data[idx]); y = float(data[idx + 1]); idx += 2',
        '        residual = w * x + b - y',
        '        gw += residual * x',
        '        gb += residual',
        '    w = w - alpha * (gw / m)',
        '    b = b - alpha * (gb / m)',
        '    print("%.4f %.4f" % (w, b))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-logistic',
    title: { zh: '对数几率回归：损失与一步梯度', en: 'Logistic regression: loss and one step' },
    difficulty: 'medium',
    tags: ['ml', 'linmodel', 'math'],
    complexity: { time: 'O(m)', space: 'O(1)' },
    statement: {
      zh: '二分类对数几率回归：p = σ(w1 x1 + w2 x2 + b)，σ(z) = 1/(1 + e^(-z))。输出平均交叉熵损失 L = -(1/m) Σ [y ln p + (1-y) ln(1-p)]，以及沿负梯度更新一步后的三个参数，其中 ∂L/∂w_j = (1/m) Σ (p_i - y_i) x_ij，∂L/∂b = (1/m) Σ (p_i - y_i)。',
      en: 'Binary logistic regression with p = σ(w1 x1 + w2 x2 + b). Report the mean cross-entropy L = -(1/m) Σ [y ln p + (1-y) ln(1-p)] and the parameters after one gradient step, where ∂L/∂w_j = (1/m) Σ (p_i - y_i) x_ij and ∂L/∂b = (1/m) Σ (p_i - y_i).'
    },
    input: { zh: '第一行 m、α、w1、w2、b；随后 m 行每行 x1、x2、y（y 为 0 或 1）。', en: 'First line: m, α, w1, w2, b. Then m lines of x1, x2, y with y in {0,1}.' },
    output: { zh: '一行四个数：L、w1、w2、b，各 4 位小数。', en: 'One line with L, w1, w2 and b, four decimals each.' },
    samples: [
      { input: '2 0.5 0 0 0\n1 0 1\n0 1 0', output: '0.6931 0.1250 -0.1250 0.0000' }
    ],
    tests: [
      { name: '样例 · 参数全零', input: '2 0.5 0 0 0\n1 0 1\n0 1 0', output: '0.6931 0.1250 -0.1250 0.0000' },
      { name: '初始参数已偏向正确', input: '3 0.1 3 0 0\n1 0 1\n-1 0 0\n2 0 1', output: '0.0332 3.0033 0.0000 0.0001' },
      { name: '同类样本', input: '2 0.1 0 0 0\n1 1 1\n2 2 1', output: '0.6931 0.0750 0.0750 0.0500' },
      { name: '含负类样本', input: '3 0.2 1 -1 0\n1 -1 1\n1 -1 1\n-1 1 0', output: '0.1269 1.0238 -1.0238 0.0079' }
    ],
    hints: [
      { zh: '先把所有 p_i 算完再求平均，梯度用的必须是同一批 p_i。', en: 'Compute every p_i first; the gradients must use that same batch.' },
      { zh: 'y=0 的样本贡献 ln(1-p)，别忘了它也在求和里。', en: 'A sample with y=0 contributes ln(1-p); do not leave it out of the sum.' }
    ],
    templates: {
      js: [
        'function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }',
        '',
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [m, alpha, w1, w2, b] = lines[0].trim().split(/\\s+/).map(Number);',
        '',
        'for (let i = 1; i <= m; i++) {',
        '  const [x1, x2, y] = lines[i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 算 p = sigmoid(w1*x1 + w2*x2 + b)，并累积损失与三个梯度',
        '}',
        '',
        '// TODO: 更新一步参数',
        'console.log([0, w1, w2, b].map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def sigmoid(z):',
        '    return 1.0 / (1.0 + math.exp(-z))',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0]); alpha = float(data[1])',
        '    w1 = float(data[2]); w2 = float(data[3]); b = float(data[4])',
        '    idx = 5',
        '    for _ in range(m):',
        '        x1 = float(data[idx]); x2 = float(data[idx + 1]); y = int(data[idx + 2])',
        '        idx += 3',
        '        pass  # TODO: 算 p，并累积损失与三个梯度',
        '    # TODO: 更新一步参数',
        '    print("%.4f %.4f %.4f %.4f" % (0.0, w1, w2, b))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }',
        '',
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [m, alpha, w1, w2, b] = lines[0].trim().split(/\\s+/).map(Number);',
        'let loss = 0, g1 = 0, g2 = 0, gb = 0;',
        'for (let i = 1; i <= m; i++) {',
        '  const parts = lines[i].trim().split(/\\s+/).map(Number);',
        '  const x1 = parts[0], x2 = parts[1], y = parts[2];',
        '  const p = sigmoid(w1 * x1 + w2 * x2 + b);',
        '  const eps = 1e-12;',
        '  loss += -(y * Math.log(p + eps) + (1 - y) * Math.log(1 - p + eps));',
        '  const d = p - y;',
        '  g1 += d * x1;',
        '  g2 += d * x2;',
        '  gb += d;',
        '}',
        'loss /= m;',
        'const nw1 = w1 - alpha * (g1 / m);',
        'const nw2 = w2 - alpha * (g2 / m);',
        'const nb = b - alpha * (gb / m);',
        'console.log([loss, nw1, nw2, nb].map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def sigmoid(z):',
        '    return 1.0 / (1.0 + math.exp(-z))',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0]); alpha = float(data[1])',
        '    w1 = float(data[2]); w2 = float(data[3]); b = float(data[4])',
        '    idx = 5',
        '    loss = 0.0',
        '    g1 = g2 = gb = 0.0',
        '    for _ in range(m):',
        '        x1 = float(data[idx]); x2 = float(data[idx + 1]); y = int(data[idx + 2])',
        '        idx += 3',
        '        p = sigmoid(w1 * x1 + w2 * x2 + b)',
        '        eps = 1e-12',
        '        loss += -(y * math.log(p + eps) + (1 - y) * math.log(1 - p + eps))',
        '        d = p - y',
        '        g1 += d * x1',
        '        g2 += d * x2',
        '        gb += d',
        '    loss /= m',
        '    w1 = w1 - alpha * (g1 / m)',
        '    w2 = w2 - alpha * (g2 / m)',
        '    b = b - alpha * (gb / m)',
        '    print("%.4f %.4f %.4f %.4f" % (loss, w1, w2, b))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-softmax',
    title: { zh: 'softmax 与交叉熵', en: 'Softmax and cross-entropy' },
    difficulty: 'easy',
    tags: ['ml', 'neural', 'linmodel'],
    complexity: { time: 'O(K)', space: 'O(K)' },
    statement: {
      zh: '给定 K 个 logit 与真实类别下标（从 0 开始），输出 softmax 概率分布与交叉熵损失 -ln p_k。要求数值稳定：先减去最大值再取指数。',
      en: 'Given K logits and the 0-based true class index, output the softmax distribution and the cross-entropy loss -ln p_k. Be numerically stable: subtract the maximum before exponentiating.'
    },
    input: { zh: '第一行 K；第二行 K 个实数 logit；第三行真实类别下标。', en: 'First line K; second line K logits; third line the true class index.' },
    output: { zh: '第一行 K 个概率（4 位小数，空格分隔）；第二行损失（4 位小数）。', en: 'First line: K probabilities to four decimals. Second line: the loss to four decimals.' },
    samples: [
      { input: '3\n1 2 3\n2', output: '0.0900 0.2447 0.6652\n0.4076' }
    ],
    tests: [
      { name: '样例', input: '3\n1 2 3\n2', output: '0.0900 0.2447 0.6652\n0.4076' },
      { name: '单类别', input: '1\n5\n0', output: '1.0000\n0.0000' },
      { name: '均匀 logit', input: '4\n0 0 0 0\n1', output: '0.2500 0.2500 0.2500 0.2500\n1.3863' },
      { name: '需要数值稳定', input: '2\n1000 1001\n0', output: '0.2689 0.7311\n1.3133' },
      { name: '整体平移不变性', input: '3\n-2 -1 0\n2', output: '0.0900 0.2447 0.6652\n0.4076' }
    ],
    hints: [
      { zh: 'exp(z - max) / Σ exp(z_j - max) 与直接算完全等价，但不会溢出。', en: 'exp(z - max) / Σ exp(z_j - max) is equivalent yet never overflows.' },
      { zh: 'logit 达到 1000 量级时，不减最大值会算出 inf/inf = NaN。', en: 'With logits around 1000, skipping the max subtraction yields inf/inf.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const k = Number(lines[0]);',
        'const z = lines[1].trim().split(/\\s+/).map(Number);',
        'const label = Number(lines[2]);',
        '',
        '// TODO: 数值稳定地算 softmax，再算交叉熵',
        'console.log(new Array(k).fill(1 / k).map(v => v.toFixed(4)).join(" "));',
        'console.log((0).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    k = int(lines[0])',
        '    z = list(map(float, lines[1].split()))',
        '    label = int(lines[2])',
        '    # TODO: 数值稳定地算 softmax，再算交叉熵',
        '    print(" ".join("%.4f" % (1.0 / k) for _ in range(k)))',
        '    print("%.4f" % 0.0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const k = Number(lines[0]);',
        'const z = lines[1].trim().split(/\\s+/).map(Number);',
        'const label = Number(lines[2]);',
        'let top = -Infinity;',
        'for (const v of z) if (v > top) top = v;',
        'const exps = z.map(v => Math.exp(v - top));',
        'let sum = 0;',
        'for (const v of exps) sum += v;',
        'const probs = exps.map(v => v / sum);',
        'console.log(probs.map(v => v.toFixed(4)).join(" "));',
        'const loss = -Math.log(probs[label]) + 0;   // +0 避免打出 -0.0000',
        'console.log(loss.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    k = int(lines[0])',
        '    z = list(map(float, lines[1].split()))',
        '    label = int(lines[2])',
        '    top = max(z)',
        '    exps = [math.exp(v - top) for v in z]',
        '    total = sum(exps)',
        '    probs = [v / total for v in exps]',
        '    print(" ".join("%.4f" % v for v in probs))',
        '    loss = -math.log(probs[label]) + 0.0   # +0.0 避免打出 -0.0000',
        '    print("%.4f" % loss)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-entropy',
    title: { zh: '信息熵', en: 'Information entropy' },
    difficulty: 'easy',
    tags: ['ml', 'tree', 'math'],
    complexity: { time: 'O(n)', space: 'O(k)' },
    statement: {
      zh: '给定一批类别标签，计算信息熵 Ent(D) = -Σ_k p_k log2(p_k)。全同类时为 0，类别越杂乱越大。',
      en: 'Given a batch of class labels, compute the information entropy Ent(D) = -Σ_k p_k log2(p_k). It is 0 when all labels agree and grows with how mixed the batch is.'
    },
    input: { zh: '第一行 n；第二行 n 个整数类别标签。', en: 'First line n; second line n integer class labels.' },
    output: { zh: '一个数：熵（以 2 为底），4 位小数。', en: 'One number: the entropy in bits, four decimals.' },
    samples: [
      { input: '4\n0 0 0 1', output: '0.8113' }
    ],
    tests: [
      { name: '样例 · 3:1', input: '4\n0 0 0 1', output: '0.8113' },
      { name: '全部同类', input: '5\n7 7 7 7 7', output: '0.0000' },
      { name: '两类各半', input: '4\n0 0 1 1', output: '1.0000' },
      { name: '三类均分', input: '6\n0 0 1 1 2 2', output: '1.5850' },
      { name: '7:3', input: '10\n0 0 0 0 0 0 0 1 1 1', output: '0.8813' },
      { name: '标签可以是任意整数', input: '4\n-1 -1 5 5', output: '1.0000' }
    ],
    hints: [
      { zh: '只需要每类的计数，原始顺序不影响结果。', en: 'Only class counts matter; the order is irrelevant.' },
      { zh: 'log2(x) = ln(x)/ln(2)。', en: 'log2(x) = ln(x)/ln(2).' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const labels = lines[1].trim().split(/\\s+/).map(Number);',
        'const count = new Map();',
        '',
        'for (const v of labels) {',
        '  // TODO: 统计每个类别的出现次数',
        '}',
        '',
        '// TODO: 算信息熵（以 2 为底）',
        'console.log((0).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    labels = list(map(int, data[1:1 + n]))',
        '    counts = {}',
        '    for v in labels:',
        '        pass  # TODO: 统计每个类别的出现次数',
        '    # TODO: 算信息熵（以 2 为底）',
        '    print("%.4f" % 0.0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const labels = lines[1].trim().split(/\\s+/).map(Number);',
        'const count = new Map();',
        'for (const v of labels) count.set(v, (count.get(v) || 0) + 1);',
        'let entropy = 0;',
        'for (const c of count.values()) {',
        '  const p = c / n;',
        '  if (p > 0) entropy -= p * (Math.log(p) / Math.LN2);',
        '}',
        'console.log(entropy.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    labels = list(map(int, data[1:1 + n]))',
        '    counts = {}',
        '    for v in labels:',
        '        counts[v] = counts.get(v, 0) + 1',
        '    entropy = 0.0',
        '    for c in counts.values():',
        '        p = c / n',
        '        if p > 0:',
        '            entropy -= p * math.log2(p)',
        '    print("%.4f" % entropy)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-info-gain',
    title: { zh: '信息增益', en: 'Information gain' },
    difficulty: 'medium',
    tags: ['ml', 'tree', 'math'],
    complexity: { time: 'O(n)', space: 'O(k)' },
    statement: {
      zh: '给定一个离散特征与类别标签，计算用它划分样本集的信息增益：Gain(D, a) = Ent(D) - Σ_v (|D^v|/|D|)·Ent(D^v)。这正是决策树选择划分属性的依据。',
      en: 'Given a discrete feature and class labels, compute the information gain of splitting on it: Gain(D, a) = Ent(D) - Σ_v (|D^v|/|D|)·Ent(D^v). This is how a decision tree picks a split.'
    },
    input: { zh: '第一行 n；随后 n 行每行一个特征取值与一个类别标签（都是整数）。', en: 'First line n; each of the next n lines holds a feature value and a class label, both integers.' },
    output: { zh: '一个数：信息增益（以 2 为底），4 位小数。', en: 'One number: the information gain in bits, four decimals.' },
    samples: [
      { input: '4\n0 1\n0 1\n1 0\n1 0', output: '1.0000' }
    ],
    tests: [
      { name: '完美划分', input: '4\n0 1\n0 1\n1 0\n1 0', output: '1.0000' },
      { name: '特征无区分度', input: '4\n0 1\n0 1\n0 0\n0 0', output: '0.0000' },
      { name: '部分改善', input: '6\n0 1\n0 0\n1 1\n1 0\n1 0\n1 0', output: '0.0441' },
      { name: '单样本', input: '1\n3 1', output: '0.0000' },
      { name: '三个取值有中间组', input: '6\n0 1\n0 1\n1 1\n1 0\n2 0\n2 0', output: '0.6667' }
    ],
    hints: [
      { zh: '先算整体熵，再对每个取值分组各算一次，最后按样本占比加权。', en: 'Compute the overall entropy, then per feature value, then weight by group size.' },
      { zh: '某个取值下的样本若全同类，该子集熵为 0。', en: 'A group whose labels all agree contributes zero entropy.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        '',
        'function entropy(labels) {',
        '  // TODO: 计算一组标签的熵',
        '  return 0;',
        '}',
        '',
        '// TODO: 按特征取值分组，算加权平均熵，用整体熵相减',
        'console.log((0).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def entropy(labels):',
        '    # TODO: 计算一组标签的熵',
        '    return 0.0',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    # TODO: 按特征取值分组，算加权平均熵，用整体熵相减',
        '    print("%.4f" % 0.0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        '',
        'function entropy(labels) {',
        '  if (!labels.length) return 0;',
        '  const count = new Map();',
        '  for (const v of labels) count.set(v, (count.get(v) || 0) + 1);',
        '  let h = 0;',
        '  for (const c of count.values()) {',
        '    const p = c / labels.length;',
        '    h -= p * (Math.log(p) / Math.LN2);',
        '  }',
        '  return h;',
        '}',
        '',
        'const all = [];',
        'const groups = new Map();',
        'for (let i = 1; i <= n; i++) {',
        '  const parts = lines[i].trim().split(/\\s+/).map(Number);',
        '  const feature = parts[0], label = parts[1];',
        '  all.push(label);',
        '  if (!groups.has(feature)) groups.set(feature, []);',
        '  groups.get(feature).push(label);',
        '}',
        'let weighted = 0;',
        'for (const labels of groups.values()) weighted += (labels.length / n) * entropy(labels);',
        'console.log((entropy(all) - weighted).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def entropy(labels):',
        '    if not labels:',
        '        return 0.0',
        '    counts = {}',
        '    for v in labels:',
        '        counts[v] = counts.get(v, 0) + 1',
        '    h = 0.0',
        '    for c in counts.values():',
        '        p = c / len(labels)',
        '        h -= p * math.log2(p)',
        '    return h',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    idx = 1',
        '    all_labels = []',
        '    groups = {}',
        '    for _ in range(n):',
        '        feature = int(data[idx]); label = int(data[idx + 1]); idx += 2',
        '        all_labels.append(label)',
        '        groups.setdefault(feature, []).append(label)',
        '    weighted = 0.0',
        '    for labels in groups.values():',
        '        weighted += (len(labels) / n) * entropy(labels)',
        '    print("%.4f" % (entropy(all_labels) - weighted))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-perceptron',
    title: { zh: '感知机更新', en: 'Perceptron updates' },
    difficulty: 'medium',
    tags: ['ml', 'neural', 'linmodel'],
    complexity: { time: 'O(m)', space: 'O(1)' },
    statement: {
      zh: '感知机 w·x + b 用于二分类，标签 y ∈ {-1, +1}。按给出的顺序遍历样本：若某个样本被错分（即 y(w·x + b) ≤ 0），就执行 w ← w + α y x、b ← b + α y。输出遍历一轮后的参数与更新次数。',
      en: 'A perceptron w·x + b classifies with labels y ∈ {-1, +1}. Walk the samples in order: whenever one is misclassified (y(w·x + b) ≤ 0), apply w ← w + α y x and b ← b + α y. Report the parameters after one pass and how many updates happened.'
    },
    input: { zh: '第一行 m、α、w1、w2、b；随后 m 行每行 x1、x2、y（y 为 -1 或 1）。', en: 'First line: m, α, w1, w2, b. Then m lines of x1, x2, y with y in {-1, 1}.' },
    output: { zh: '一行四个量：w1、w2、b（4 位小数）与更新次数（整数）。', en: 'One line: w1, w2, b (four decimals each) and the number of updates.' },
    samples: [
      { input: '3 1 0 0 0\n1 1 1\n-1 -1 -1\n1 1 1', output: '1.0000 1.0000 1.0000 1' }
    ],
    tests: [
      { name: '样例', input: '3 1 0 0 0\n1 1 1\n-1 -1 -1\n1 1 1', output: '1.0000 1.0000 1.0000 1' },
      { name: '一次更新后全对', input: '2 0.5 -1 0 0\n1 0 1\n2 0 -1', output: '-0.5000 0.0000 0.5000 1' },
      { name: '零向量样本', input: '3 0.1 0 0 0\n0 0 1\n1 1 1\n2 2 1', output: '0.0000 0.0000 0.1000 1' },
      { name: '来回震荡的样本', input: '4 1 0 0 0\n1 1 -1\n-1 -1 -1\n1 -1 1\n-1 1 1', output: '0.0000 0.0000 0.0000 4' }
    ],
    hints: [
      { zh: '判断条件写成 y*(w·x+b) <= 0，等价于「预测符号与标签相反」。', en: 'Test y*(w·x+b) <= 0, meaning the predicted sign disagrees with the label.' },
      { zh: '后面的样本必须用更新后的参数预测，所以不能先把所有判断算完。', en: 'Later samples must be scored with updated parameters, so you cannot batch all decisions first.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const m = head[0], alpha = head[1];',
        'let w1 = head[2], w2 = head[3], b = head[4];',
        'let count = 0;',
        '',
        'for (let i = 1; i <= m; i++) {',
        '  const [x1, x2, y] = lines[i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 判断是否错分，错分则更新 w1、w2、b 并累加 count',
        '}',
        '',
        'console.log([w1, w2, b].map(v => v.toFixed(4)).join(" ") + " " + count);'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0]); alpha = float(data[1])',
        '    w1 = float(data[2]); w2 = float(data[3]); b = float(data[4])',
        '    idx = 5',
        '    count = 0',
        '    for _ in range(m):',
        '        x1 = float(data[idx]); x2 = float(data[idx + 1]); y = int(data[idx + 2])',
        '        idx += 3',
        '        pass  # TODO: 判断是否错分，错分则更新并累加 count',
        '    print("%.4f %.4f %.4f %d" % (w1, w2, b, count))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const m = head[0], alpha = head[1];',
        'let w1 = head[2], w2 = head[3], b = head[4];',
        'let count = 0;',
        'for (let i = 1; i <= m; i++) {',
        '  const parts = lines[i].trim().split(/\\s+/).map(Number);',
        '  const x1 = parts[0], x2 = parts[1], y = parts[2];',
        '  if (y * (w1 * x1 + w2 * x2 + b) <= 0) {',
        '    w1 += alpha * y * x1;',
        '    w2 += alpha * y * x2;',
        '    b += alpha * y;',
        '    count++;',
        '  }',
        '}',
        'console.log([w1, w2, b].map(v => v.toFixed(4)).join(" ") + " " + count);'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    m = int(data[0]); alpha = float(data[1])',
        '    w1 = float(data[2]); w2 = float(data[3]); b = float(data[4])',
        '    idx = 5',
        '    count = 0',
        '    for _ in range(m):',
        '        x1 = float(data[idx]); x2 = float(data[idx + 1]); y = int(data[idx + 2])',
        '        idx += 3',
        '        if y * (w1 * x1 + w2 * x2 + b) <= 0:',
        '            w1 += alpha * y * x1',
        '            w2 += alpha * y * x2',
        '            b += alpha * y',
        '            count += 1',
        '    print("%.4f %.4f %.4f %d" % (w1, w2, b, count))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-naive-bayes',
    title: { zh: '朴素贝叶斯（拉普拉斯平滑）', en: 'Naive Bayes with Laplace smoothing' },
    difficulty: 'medium',
    tags: ['ml', 'bayes', 'math'],
    complexity: { time: 'O(n)', space: 'O(k)' },
    statement: {
      zh: '两个离散特征、二分类的朴素贝叶斯。类先验 P(c) = (N_c + 1)/(N + 2)；条件概率 P(f_j = v | c) = (N_{c,j,v} + 1)/(N_c + V_j)，其中 V_j 是特征 j 在训练集中出现过的不同取值个数。输出预测类别与两个类的对数后验 ln P(c) + Σ_j ln P(f_j = q_j | c)；取较大者，相等时取较小的类。',
      en: 'Naive Bayes with two discrete features and two classes. Class prior P(c) = (N_c + 1)/(N + 2); conditional P(f_j = v | c) = (N_{c,j,v} + 1)/(N_c + V_j) where V_j is the number of distinct values feature j takes in training. Output the predicted class and both log posteriors ln P(c) + Σ_j ln P(f_j = q_j | c); take the larger, with ties going to the smaller class.'
    },
    input: { zh: '第一行 n；随后 n 行每行 f1、f2、y；最后一行是待预测的 q1、q2。', en: 'First line n; each of the next n lines holds f1, f2 and the label y; the last line holds the query q1, q2.' },
    output: { zh: '一行三个量：预测类别、ln P(0)、ln P(1)，后两者保留 4 位小数。', en: 'One line: the predicted class, then ln P(0) and ln P(1) to four decimals.' },
    samples: [
      { input: '4\n0 0 0\n0 1 0\n1 0 1\n1 1 1\n0 0', output: '0 -1.6740 -2.7726' }
    ],
    tests: [
      { name: '样例', input: '4\n0 0 0\n0 1 0\n1 0 1\n1 1 1\n0 0', output: '0 -1.6740 -2.7726' },
      { name: '对称查询', input: '4\n0 0 0\n0 1 0\n1 0 1\n1 1 1\n1 1', output: '1 -2.7726 -1.6740' },
      { name: '没见过的取值靠平滑', input: '4\n0 0 0\n0 1 0\n1 0 1\n1 1 1\n2 2', output: '0 -3.4657 -3.4657' },
      { name: '多一点数据', input: '6\n0 0 0\n0 0 0\n0 1 0\n1 1 1\n1 1 1\n1 0 1\n1 1', output: '1 -3.2189 -1.4271' }
    ],
    hints: [
      { zh: '连乘很容易下溢，全部改成对数相加。', en: 'Multiplying many small numbers underflows; work in log space.' },
      { zh: 'V_j 统计的是训练集中该特征出现过的不同取值个数。', en: 'V_j counts the distinct values that feature actually took in training.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const rows = [];',
        'for (let i = 1; i <= n; i++) rows.push(lines[i].trim().split(/\\s+/).map(Number));',
        'const query = lines[n + 1].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 统计类计数、各特征取值集合与条件计数',
        '// TODO: 算两个类的对数后验，取较大者',
        'console.log("0 0.0000 0.0000");'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    rows = [list(map(int, lines[i + 1].split())) for i in range(n)]',
        '    query = list(map(int, lines[n + 1].split()))',
        '    # TODO: 统计类计数、各特征取值集合与条件计数',
        '    # TODO: 算两个类的对数后验，取较大者',
        '    print("0 0.0000 0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const rows = [];',
        'for (let i = 1; i <= n; i++) rows.push(lines[i].trim().split(/\\s+/).map(Number));',
        'const query = lines[n + 1].trim().split(/\\s+/).map(Number);',
        '',
        'const classCount = { 0: 0, 1: 0 };',
        'const domain = [new Set(), new Set()];',
        'const hits = { 0: [new Map(), new Map()], 1: [new Map(), new Map()] };',
        'for (const row of rows) {',
        '  const label = row[2];',
        '  classCount[label]++;',
        '  for (let j = 0; j < 2; j++) {',
        '    const value = row[j];',
        '    domain[j].add(value);',
        '    const map = hits[label][j];',
        '    map.set(value, (map.get(value) || 0) + 1);',
        '  }',
        '}',
        '',
        'const posterior = {};',
        'for (const c of [0, 1]) {',
        '  let lp = Math.log((classCount[c] + 1) / (n + 2));',
        '  for (let j = 0; j < 2; j++) {',
        '    const distinct = domain[j].size;',
        '    const count = hits[c][j].get(query[j]) || 0;',
        '    lp += Math.log((count + 1) / (classCount[c] + distinct));',
        '  }',
        '  posterior[c] = lp;',
        '}',
        'const predicted = posterior[1] > posterior[0] ? 1 : 0;',
        'console.log(predicted + " " + posterior[0].toFixed(4) + " " + posterior[1].toFixed(4));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    rows = [list(map(int, lines[i + 1].split())) for i in range(n)]',
        '    query = list(map(int, lines[n + 1].split()))',
        '',
        '    class_count = {0: 0, 1: 0}',
        '    domain = [set(), set()]',
        '    hits = {0: [{}, {}], 1: [{}, {}]}',
        '    for row in rows:',
        '        label = row[2]',
        '        class_count[label] += 1',
        '        for j in range(2):',
        '            value = row[j]',
        '            domain[j].add(value)',
        '            hits[label][j][value] = hits[label][j].get(value, 0) + 1',
        '',
        '    posterior = {}',
        '    for c in (0, 1):',
        '        lp = math.log((class_count[c] + 1) / (n + 2))',
        '        for j in range(2):',
        '            distinct = len(domain[j])',
        '            count = hits[c][j].get(query[j], 0)',
        '            lp += math.log((count + 1) / (class_count[c] + distinct))',
        '        posterior[c] = lp',
        '    predicted = 1 if posterior[1] > posterior[0] else 0',
        '    print("%d %.4f %.4f" % (predicted, posterior[0], posterior[1]))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-kmeans',
    title: { zh: 'K 均值一次迭代', en: 'One K-means iteration' },
    difficulty: 'medium',
    tags: ['ml', 'cluster', 'math'],
    complexity: { time: 'O(nk)', space: 'O(n)' },
    statement: {
      zh: '给定数据点与 k 个初始质心，做一轮 K 均值迭代：先把每个点分配给欧氏距离最近的质心（距离相同取编号较小的），再把每个质心更新为其所属点的均值；若某簇为空，质心保持原位。',
      en: 'Given data points and k initial centroids, run one K-means iteration: assign each point to the nearest centroid by Euclidean distance (ties to the lower index), then move each centroid to the mean of its points. An empty cluster keeps its centroid.'
    },
    input: { zh: '第一行 n、k；随后 n 行每行 x、y；再随后 k 行每行质心 cx、cy。', en: 'First line n, k; then n lines of x, y; then k lines of centroid cx, cy.' },
    output: { zh: '第一行 2k 个数：更新后的质心（按编号顺序）；第二行 n 个分配索引。实数保留 4 位小数。', en: 'First line: updated centroids in order (2k numbers). Second line: the n assignments. Real numbers use four decimals.' },
    samples: [
      { input: '4 2\n0 0\n1 0\n10 0\n11 0\n0 0\n10 0', output: '0.5000 0.0000 10.5000 0.0000\n0 0 1 1' }
    ],
    tests: [
      { name: '样例 · 两团分离', input: '4 2\n0 0\n1 0\n10 0\n11 0\n0 0\n10 0', output: '0.5000 0.0000 10.5000 0.0000\n0 0 1 1' },
      { name: '出现空簇', input: '3 2\n0 0\n1 1\n2 2\n0 0\n10 10', output: '1.0000 1.0000 10.0000 10.0000\n0 0 0' },
      { name: '质心落在点上', input: '2 2\n0 0\n2 0\n0 0\n2 0', output: '0.0000 0.0000 2.0000 0.0000\n0 1' },
      { name: '距离相同时取小编号', input: '2 2\n1 0\n3 0\n0 0\n2 0', output: '1.0000 0.0000 3.0000 0.0000\n0 1' }
    ],
    hints: [
      { zh: '比较距离时用平方距离即可，是否开方不影响谁更近。', en: 'Squared distances are enough; the square root never changes who is nearer.' },
      { zh: '求均值前先判断簇是否为空，否则会除零。', en: 'Check for empty clusters before averaging, or you divide by zero.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const [n, k] = lines[0].trim().split(/\\s+/).map(Number);',
        'const points = [];',
        'for (let i = 1; i <= n; i++) points.push(lines[i].trim().split(/\\s+/).map(Number));',
        'const centroids = [];',
        'for (let i = 0; i < k; i++) centroids.push(lines[1 + n + i].trim().split(/\\s+/).map(Number));',
        '',
        '// TODO: 把每个点分配给最近的质心',
        '// TODO: 用每簇均值更新质心（空簇保持不动）',
        'console.log(centroids.map(c => c.map(v => v.toFixed(4)).join(" ")).join(" "));',
        'console.log(new Array(n).fill(0).join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n, k = map(int, lines[0].split())',
        '    points = [list(map(float, lines[i + 1].split())) for i in range(n)]',
        '    centroids = [list(map(float, lines[1 + n + i].split())) for i in range(k)]',
        '    # TODO: 把每个点分配给最近的质心',
        '    # TODO: 用每簇均值更新质心（空簇保持不动）',
        '    print(" ".join("%.4f %.4f" % (c[0], c[1]) for c in centroids))',
        '    print(" ".join("0" for _ in range(n)))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], k = head[1];',
        'const points = [];',
        'for (let i = 1; i <= n; i++) points.push(lines[i].trim().split(/\\s+/).map(Number));',
        'const centroids = [];',
        'for (let i = 0; i < k; i++) centroids.push(lines[1 + n + i].trim().split(/\\s+/).map(Number));',
        '',
        'const assign = [];',
        'for (const p of points) {',
        '  let best = 0, bestDist = Infinity;',
        '  for (let c = 0; c < k; c++) {',
        '    const dx = p[0] - centroids[c][0];',
        '    const dy = p[1] - centroids[c][1];',
        '    const dist = dx * dx + dy * dy;',
        '    if (dist < bestDist) { bestDist = dist; best = c; }',
        '  }',
        '  assign.push(best);',
        '}',
        '',
        'const sums = [];',
        'for (let c = 0; c < k; c++) sums.push([0, 0, 0]);',
        'for (let i = 0; i < n; i++) {',
        '  const c = assign[i];',
        '  sums[c][0] += points[i][0];',
        '  sums[c][1] += points[i][1];',
        '  sums[c][2] += 1;',
        '}',
        'const next = [];',
        'for (let c = 0; c < k; c++) {',
        '  if (sums[c][2] === 0) next.push(centroids[c].slice());',
        '  else next.push([sums[c][0] / sums[c][2], sums[c][1] / sums[c][2]]);',
        '}',
        'console.log(next.map(c => c.map(v => v.toFixed(4)).join(" ")).join(" "));',
        'console.log(assign.join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n, k = map(int, lines[0].split())',
        '    points = [list(map(float, lines[i + 1].split())) for i in range(n)]',
        '    centroids = [list(map(float, lines[1 + n + i].split())) for i in range(k)]',
        '',
        '    assign = []',
        '    for p in points:',
        '        best = 0',
        '        best_dist = float("inf")',
        '        for c in range(k):',
        '            dx = p[0] - centroids[c][0]',
        '            dy = p[1] - centroids[c][1]',
        '            dist = dx * dx + dy * dy',
        '            if dist < best_dist:',
        '                best_dist = dist',
        '                best = c',
        '        assign.append(best)',
        '',
        '    sums = [[0.0, 0.0, 0] for _ in range(k)]',
        '    for i, p in enumerate(points):',
        '        c = assign[i]',
        '        sums[c][0] += p[0]',
        '        sums[c][1] += p[1]',
        '        sums[c][2] += 1',
        '    nxt = []',
        '    for c in range(k):',
        '        if sums[c][2] == 0:',
        '            nxt.append(centroids[c][:])',
        '        else:',
        '            nxt.append([sums[c][0] / sums[c][2], sums[c][1] / sums[c][2]])',
        '    print(" ".join("%.4f %.4f" % (c[0], c[1]) for c in nxt))',
        '    print(" ".join(str(a) for a in assign))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-knn',
    title: { zh: 'k 近邻分类', en: 'k-nearest neighbours' },
    difficulty: 'easy',
    tags: ['ml', 'dimreduce', 'search'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '给定训练点与一个查询点，按欧氏距离找出最近的 k 个训练点（距离相同则输入顺序靠前的优先），用多数投票决定类别；票数相同时取较小的类别。输出预测类别与这 k 个距离。',
      en: 'Given training points and one query point, take the k nearest by Euclidean distance (ties break toward earlier input order) and predict by majority vote, with ties going to the smaller class. Output the prediction and those k distances.'
    },
    input: { zh: '第一行 n、k；随后 n 行每行 x1、x2、y；最后一行查询点 qx、qy。', en: 'First line n, k; then n lines of x1, x2, y; the last line holds the query qx, qy.' },
    output: { zh: '一行：预测类别，随后 k 个距离（4 位小数）。', en: 'One line: the predicted class followed by the k distances, four decimals each.' },
    samples: [
      { input: '4 3\n0 0 0\n1 0 0\n0 1 1\n5 5 1\n1 1', output: '0 1.0000 1.0000 1.4142' }
    ],
    tests: [
      { name: '样例 · k=3', input: '4 3\n0 0 0\n1 0 0\n0 1 1\n5 5 1\n1 1', output: '0 1.0000 1.0000 1.4142' },
      { name: 'k=1 退化成最近邻', input: '4 1\n0 0 0\n1 0 0\n0 1 1\n5 5 1\n1 1', output: '0 1.0000' },
      { name: 'k 等于样本数', input: '4 4\n0 0 0\n1 0 0\n0 1 1\n5 5 1\n1 1', output: '0 1.0000 1.0000 1.4142 5.6569' },
      { name: '票数相同取较小类别', input: '4 2\n1 0 1\n-1 0 0\n5 0 1\n6 0 0\n0 0', output: '0 1.0000 1.0000' }
    ],
    hints: [
      { zh: '排序时带上原始下标，才能实现「距离相同看输入顺序」。', en: 'Carry the original index into the sort so equal distances fall back to input order.' },
      { zh: '比较时可以用平方距离，但输出的是开方后的真实距离。', en: 'Compare squared distances if you like, but print the real ones.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], k = head[1];',
        'const data = [];',
        'for (let i = 1; i <= n; i++) data.push(lines[i].trim().split(/\\s+/).map(Number));',
        'const query = lines[n + 1].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 算距离、按下标稳定的排序取前 k 个、多数投票',
        'console.log("0 " + new Array(k).fill("0.0000").join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n, k = map(int, lines[0].split())',
        '    data = [list(map(float, lines[i + 1].split())) for i in range(n)]',
        '    query = list(map(float, lines[n + 1].split()))',
        '    # TODO: 算距离、按 (距离, 下标) 排序取前 k 个、多数投票',
        '    print("0 " + " ".join(["0.0000"] * k))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], k = head[1];',
        'const data = [];',
        'for (let i = 1; i <= n; i++) data.push(lines[i].trim().split(/\\s+/).map(Number));',
        'const query = lines[n + 1].trim().split(/\\s+/).map(Number);',
        '',
        'const list = [];',
        'for (let index = 0; index < n; index++) {',
        '  const dx = data[index][0] - query[0];',
        '  const dy = data[index][1] - query[1];',
        '  list.push({ index: index, dist: Math.sqrt(dx * dx + dy * dy), label: data[index][2] });',
        '}',
        'list.sort(function (a, b) { return a.dist - b.dist || a.index - b.index; });',
        'const near = list.slice(0, k);',
        '',
        'const votes = new Map();',
        'for (const item of near) votes.set(item.label, (votes.get(item.label) || 0) + 1);',
        'const labels = Array.from(votes.keys()).sort(function (a, b) { return a - b; });',
        'let predicted = labels[0], bestCount = -1;',
        'for (const label of labels) {',
        '  if (votes.get(label) > bestCount) { bestCount = votes.get(label); predicted = label; }',
        '}',
        'console.log(predicted + " " + near.map(function (item) { return item.dist.toFixed(4); }).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n, k = map(int, lines[0].split())',
        '    data = [list(map(float, lines[i + 1].split())) for i in range(n)]',
        '    query = list(map(float, lines[n + 1].split()))',
        '',
        '    items = []',
        '    for index, row in enumerate(data):',
        '        dx = row[0] - query[0]',
        '        dy = row[1] - query[1]',
        '        items.append((math.sqrt(dx * dx + dy * dy), index, int(row[2])))',
        '    items.sort(key=lambda t: (t[0], t[1]))',
        '    near = items[:k]',
        '',
        '    votes = {}',
        '    for _, _, label in near:',
        '        votes[label] = votes.get(label, 0) + 1',
        '    predicted = min(votes, key=lambda c: (-votes[c], c))',
        '    print("%d %s" % (predicted, " ".join("%.4f" % d for d, _, _ in near)))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-pca',
    title: { zh: 'PCA 第一主成分', en: 'First principal component' },
    difficulty: 'hard',
    tags: ['ml', 'dimreduce', 'math'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '把二维数据中心化后求协方差矩阵（用 1/n 的总体形式）。输出第一主成分方向的角度 θ = 0.5·atan2(2S_xy, S_xx - S_yy)（弧度，落在 (-π/2, π/2]）、两个特征值 λ1 ≥ λ2，以及主成分解释的方差比例 λ1/(λ1+λ2)。',
      en: 'Center the 2-D data and form the covariance with the 1/n population form. Output the angle of the first principal direction θ = 0.5·atan2(2S_xy, S_xx - S_yy) in radians within (-π/2, π/2], the eigenvalues λ1 ≥ λ2, and the variance ratio λ1/(λ1+λ2).'
    },
    input: { zh: '第一行 n；随后 n 行每行 x、y。', en: 'First line n; then n lines of x and y.' },
    output: { zh: '一行四个数：θ、λ1、λ2、比例，各 4 位小数。', en: 'One line with θ, λ1, λ2 and the ratio, four decimals each.' },
    samples: [
      { input: '3\n0 0\n1 1\n2 2', output: '0.7854 1.3333 0.0000 1.0000' }
    ],
    tests: [
      { name: '样例 · 沿 45 度', input: '3\n0 0\n1 1\n2 2', output: '0.7854 1.3333 0.0000 1.0000' },
      { name: '水平方向', input: '3\n0 0\n1 0\n2 0', output: '0.0000 0.6667 0.0000 1.0000' },
      { name: '负相关方向', input: '3\n0 2\n1 1\n2 0', output: '-0.7854 1.3333 0.0000 1.0000' },
      { name: '各向同性', input: '4\n0 0\n1 0\n0 1\n1 1', output: '0.0000 0.2500 0.2500 0.5000' },
      { name: '非整数比例', input: '3\n0 0\n2 1\n4 2', output: '0.4636 3.3333 0.0000 1.0000' }
    ],
    hints: [
      { zh: '2×2 对称矩阵特征值有闭式解：(S_xx+S_yy)/2 ± sqrt(((S_xx-S_yy)/2)² + S_xy²)。', en: 'A 2×2 symmetric matrix has a closed form: (S_xx+S_yy)/2 ± sqrt(((S_xx-S_yy)/2)² + S_xy²).' },
      { zh: '用角度表示方向可以绕开特征向量的正负号歧义。', en: 'An angle representation avoids the eigenvector sign ambiguity.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const xs = [], ys = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const p = lines[i].trim().split(/\\s+/).map(Number);',
        '  xs.push(p[0]); ys.push(p[1]);',
        '}',
        '',
        '// TODO: 中心化并算 S_xx、S_yy、S_xy',
        '// TODO: 用闭式解算 theta、lambda1、lambda2 与比例',
        'console.log("0.0000 0.0000 0.0000 0.0000");'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    pts = [list(map(float, lines[i + 1].split())) for i in range(n)]',
        '    # TODO: 中心化并算 S_xx、S_yy、S_xy',
        '    # TODO: 用闭式解算 theta、lambda1、lambda2 与比例',
        '    print("0.0000 0.0000 0.0000 0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const xs = [], ys = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const p = lines[i].trim().split(/\\s+/).map(Number);',
        '  xs.push(p[0]); ys.push(p[1]);',
        '}',
        'let mx = 0, my = 0;',
        'for (let i = 0; i < n; i++) { mx += xs[i]; my += ys[i]; }',
        'mx /= n; my /= n;',
        'let sxx = 0, syy = 0, sxy = 0;',
        'for (let i = 0; i < n; i++) {',
        '  const dx = xs[i] - mx;',
        '  const dy = ys[i] - my;',
        '  sxx += dx * dx; syy += dy * dy; sxy += dx * dy;',
        '}',
        'sxx /= n; syy /= n; sxy /= n;',
        'const base = (sxx + syy) / 2;',
        'const rad = Math.sqrt(((sxx - syy) / 2) * ((sxx - syy) / 2) + sxy * sxy);',
        'function clean(v) { return Math.abs(v) < 1e-12 ? 0 : v; }',
        'const theta = clean(0.5 * Math.atan2(2 * sxy, sxx - syy));',
        'const l1 = clean(base + rad);',
        'const l2 = clean(base - rad);',
        'const ratio = l1 + l2 > 0 ? l1 / (l1 + l2) : 0;',
        'console.log([theta, l1, l2, ratio].map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def clean(v):',
        '    return 0.0 if abs(v) < 1e-12 else v',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    pts = [list(map(float, lines[i + 1].split())) for i in range(n)]',
        '    mx = sum(p[0] for p in pts) / n',
        '    my = sum(p[1] for p in pts) / n',
        '    sxx = sum((p[0] - mx) ** 2 for p in pts) / n',
        '    syy = sum((p[1] - my) ** 2 for p in pts) / n',
        '    sxy = sum((p[0] - mx) * (p[1] - my) for p in pts) / n',
        '    base = (sxx + syy) / 2',
        '    rad = math.sqrt(((sxx - syy) / 2) ** 2 + sxy * sxy)',
        '    theta = clean(0.5 * math.atan2(2 * sxy, sxx - syy))',
        '    l1 = clean(base + rad)',
        '    l2 = clean(base - rad)',
        '    ratio = l1 / (l1 + l2) if l1 + l2 > 0 else 0.0',
        '    print("%.4f %.4f %.4f %.4f" % (theta, l1, l2, ratio))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-q-learning',
    title: { zh: 'Q 学习的一步更新', en: 'One Q-learning update' },
    difficulty: 'easy',
    tags: ['ml', 'rl', 'math'],
    complexity: { time: 'O(A)', space: 'O(1)' },
    statement: {
      zh: 'Q 学习的一步更新：Q(s, a) ← Q(s, a) + α [r + γ·max Q(s\', ·) - Q(s, a)]。给定 Q 表、折扣因子 γ、学习率 α 与一次转移 (s, a, r, s\')，输出更新后的 Q(s, a) 与 TD 目标 r + γ·max Q(s\', ·)。',
      en: 'One Q-learning update: Q(s, a) ← Q(s, a) + α [r + γ·max Q(s\', ·) - Q(s, a)]. Given the Q table, discount γ, learning rate α and a transition (s, a, r, s\'), output the new Q(s, a) and the TD target.'
    },
    input: { zh: '第一行 γ、α；第二行状态数 S、动作数 A；随后 S 行每行 A 个 Q 值；最后一行 s、a、r、s\'。', en: 'First line γ, α; second line S, A; then S lines of A Q-values; the last line holds s, a, r, s\'.' },
    output: { zh: '一行两个数：新的 Q(s, a) 与 TD 目标，各 4 位小数。', en: 'One line: the new Q(s, a) and the TD target, four decimals each.' },
    samples: [
      { input: '0.9 0.5\n2 2\n0 0\n1 2\n0 1 1 1', output: '1.4000 2.8000' }
    ],
    tests: [
      { name: '样例', input: '0.9 0.5\n2 2\n0 0\n1 2\n0 1 1 1', output: '1.4000 2.8000' },
      { name: '负奖励', input: '0.5 0.1\n1 3\n0.5 0.5 0.5\n0 0 -1 0', output: '0.3750 -0.7500' },
      { name: 'γ=α=1 直接替换', input: '1 1\n2 2\n0 0\n0 0\n0 0 5 1', output: '5.0000 5.0000' },
      { name: '三个状态', input: '0.8 0.2\n3 2\n1 2\n3 4\n5 6\n2 1 3 0', output: '5.7200 4.6000' }
    ],
    hints: [
      { zh: 'max 取的是「下一个状态」那一行，不是当前状态。', en: 'The max is over the next state\'s row, not the current one.' },
      { zh: 'γ 为 0 时退化成 Q ← Q + α(r - Q)，只关心即时奖励。', en: 'With γ = 0 it collapses to Q ← Q + α(r - Q), purely immediate reward.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const gamma = head[0], alpha = head[1];',
        'const size = lines[1].trim().split(/\\s+/).map(Number);',
        'const S = size[0];',
        'const q = [];',
        'for (let i = 0; i < S; i++) q.push(lines[2 + i].trim().split(/\\s+/).map(Number));',
        'const t = lines[2 + S].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 算 TD 目标并更新 Q[s][a]',
        'console.log("0.0000 0.0000");'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    gamma, alpha = map(float, lines[0].split())',
        '    S, A = map(int, lines[1].split())',
        '    q = [list(map(float, lines[2 + i].split())) for i in range(S)]',
        '    s, a, r, s2 = map(int, lines[2 + S].split())',
        '    # TODO: 算 TD 目标并更新 Q[s][a]',
        '    print("0.0000 0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const gamma = head[0], alpha = head[1];',
        'const size = lines[1].trim().split(/\\s+/).map(Number);',
        'const S = size[0];',
        'const q = [];',
        'for (let i = 0; i < S; i++) q.push(lines[2 + i].trim().split(/\\s+/).map(Number));',
        'const t = lines[2 + S].trim().split(/\\s+/).map(Number);',
        'const s = t[0], a = t[1], r = t[2], s2 = t[3];',
        'let best = -Infinity;',
        'for (const v of q[s2]) if (v > best) best = v;',
        'const target = r + gamma * best;',
        'const updated = q[s][a] + alpha * (target - q[s][a]);',
        'console.log(updated.toFixed(4) + " " + target.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    gamma, alpha = map(float, lines[0].split())',
        '    S, A = map(int, lines[1].split())',
        '    q = [list(map(float, lines[2 + i].split())) for i in range(S)]',
        '    s, a, r, s2 = map(int, lines[2 + S].split())',
        '    target = r + gamma * max(q[s2])',
        '    updated = q[s][a] + alpha * (target - q[s][a])',
        '    print("%.4f %.4f" % (updated, target))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-pr-curve',
    title: { zh: 'P-R 曲线与平衡点', en: 'Precision-recall curve and BEP' },
    difficulty: 'medium',
    tags: ['ml', 'modeleval', 'sort'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '把样本按预测分数从高到低排序，依次把前 k 个判为正类（k = 1..n），得到 n 组查准率与查全率。输出每一组的 P、R（各 4 位小数），最后输出平衡点 BEP —— 定义为所有 k 中 min(P, R) 的最大值。',
      en: 'Sort samples by predicted score descending and treat the top k as positive for k = 1..n, giving n precision/recall pairs. Print each pair to four decimals, then the break-even point BEP defined as the maximum of min(P, R) over all k.'
    },
    input: { zh: '第一行 n；随后 n 行每行一个分数与真实标签（0 或 1）。分数互不相同。', en: 'First line n; each of the next n lines holds a score and the true label (0 or 1). All scores are distinct.' },
    output: { zh: '共 n+1 行：每行 "P R"，最后一行是 BEP。', en: 'n+1 lines: each holding "P R", then the BEP on the final line.' },
    samples: [
      { input: '4\n0.9 1\n0.8 1\n0.7 0\n0.6 0', output: '1.0000 0.5000\n1.0000 1.0000\n0.6667 1.0000\n0.5000 1.0000\n1.0000' }
    ],
    tests: [
      { name: '样例 · 排序完好', input: '4\n0.9 1\n0.8 1\n0.7 0\n0.6 0', output: '1.0000 0.5000\n1.0000 1.0000\n0.6667 1.0000\n0.5000 1.0000\n1.0000' },
      { name: '排序完全颠倒', input: '4\n0.9 0\n0.8 1\n0.7 0\n0.6 1', output: '0.0000 0.0000\n0.5000 0.5000\n0.3333 0.5000\n0.5000 1.0000\n0.5000' },
      { name: '单个正类排在最后', input: '3\n0.9 0\n0.5 0\n0.1 1', output: '0.0000 0.0000\n0.0000 0.0000\n0.3333 1.0000\n0.3333' },
      { name: '全部为正类', input: '3\n0.9 1\n0.5 1\n0.1 1', output: '1.0000 0.3333\n1.0000 0.6667\n1.0000 1.0000\n1.0000' }
    ],
    hints: [
      { zh: '每加入一个样本就更新 TP 与 FP 计数即可，不用每次都重新数一遍。', en: 'Update TP and FP incrementally as each sample joins the positive set.' },
      { zh: '正类样本的分数靠后时，查准率会掉得比查全率慢，两者的曲线交点就是 BEP 想表达的位置。', en: 'When positives rank low, precision degrades more slowly than recall; the BEP approximates where the two curves cross.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const items = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const p = lines[i].trim().split(/\\s+/).map(Number);',
        '  items.push({ score: p[0], label: p[1] });',
        '}',
        'items.sort((a, b) => b.score - a.score);',
        'const positives = items.filter(it => it.label === 1).length;',
        '',
        '// TODO: 依次把前 k 个判为正类，算 P 与 R 并记录 min(P,R) 的最大值',
        'for (let k = 1; k <= n; k++) console.log("0.0000 0.0000");',
        'console.log((0).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    items = []',
        '    for i in range(n):',
        '        score, label = lines[i + 1].split()',
        '        items.append((float(score), int(label)))',
        '    items.sort(key=lambda t: -t[0])',
        '    positives = sum(1 for _, label in items if label == 1)',
        '    # TODO: 依次把前 k 个判为正类，算 P 与 R 并记录 min(P,R) 的最大值',
        '    for _ in range(n):',
        '        print("0.0000 0.0000")',
        '    print("%.4f" % 0.0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const items = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const p = lines[i].trim().split(/\\s+/).map(Number);',
        '  items.push({ score: p[0], label: p[1] });',
        '}',
        'items.sort(function (a, b) { return b.score - a.score; });',
        'let positives = 0;',
        'for (const it of items) if (it.label === 1) positives++;',
        '',
        'let tp = 0, fp = 0, best = 0;',
        'for (let k = 1; k <= n; k++) {',
        '  if (items[k - 1].label === 1) tp++; else fp++;',
        '  const p = tp + fp > 0 ? tp / (tp + fp) : 0;',
        '  const r = positives > 0 ? tp / positives : 0;',
        '  if (Math.min(p, r) > best) best = Math.min(p, r);',
        '  console.log(p.toFixed(4) + " " + r.toFixed(4));',
        '}',
        'console.log(best.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    items = []',
        '    for i in range(n):',
        '        score, label = lines[i + 1].split()',
        '        items.append((float(score), int(label)))',
        '    items.sort(key=lambda t: -t[0])',
        '    positives = sum(1 for _, label in items if label == 1)',
        '',
        '    tp = fp = 0',
        '    best = 0.0',
        '    for k in range(1, n + 1):',
        '        if items[k - 1][1] == 1:',
        '            tp += 1',
        '        else:',
        '            fp += 1',
        '        precision = tp / (tp + fp) if tp + fp > 0 else 0.0',
        '        recall = tp / positives if positives > 0 else 0.0',
        '        best = max(best, min(precision, recall))',
        '        print("%.4f %.4f" % (precision, recall))',
        '    print("%.4f" % best)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-roc-auc',
    title: { zh: 'ROC 曲线与 AUC', en: 'ROC curve and AUC' },
    difficulty: 'medium',
    tags: ['ml', 'modeleval', 'math'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '把样本按分数从高到低排列，从「全部判为负类」出发逐个把样本划为正类，得到一系列 (FPR, TPR) 点。输出这些点（含起点 (0,0) 与终点 (1,1)），再用梯形法给出曲线下面积 AUC。',
      en: 'Sort samples by score descending and move them one by one into the positive set, starting from "everything negative", producing (FPR, TPR) points. Print those points (including (0,0) and (1,1)), then the area under the curve by the trapezoid rule.'
    },
    input: { zh: '第一行 n；随后 n 行每行一个分数与标签（0 或 1）。分数互不相同。', en: 'First line n; each of the next n lines holds a score and a label (0 or 1). All scores are distinct.' },
    output: { zh: '前 n+1 行每行 "FPR TPR"（4 位小数），最后一行是 AUC。', en: 'The first n+1 lines hold "FPR TPR" to four decimals; the final line is the AUC.' },
    samples: [
      { input: '4\n4 1\n3 1\n2 0\n1 0', output: '0.0000 0.0000\n0.0000 0.5000\n0.0000 1.0000\n0.5000 1.0000\n1.0000 1.0000\n1.0000' }
    ],
    tests: [
      { name: '样例 · 完美排序', input: '4\n4 1\n3 1\n2 0\n1 0', output: '0.0000 0.0000\n0.0000 0.5000\n0.0000 1.0000\n0.5000 1.0000\n1.0000 1.0000\n1.0000' },
      { name: '完全颠倒', input: '4\n4 0\n3 0\n2 1\n1 1', output: '0.0000 0.0000\n0.5000 0.0000\n1.0000 0.0000\n1.0000 0.5000\n1.0000 1.0000\n0.0000' },
      { name: '交替排列', input: '4\n4 1\n3 0\n2 1\n1 0', output: '0.0000 0.0000\n0.0000 0.5000\n0.5000 0.5000\n0.5000 1.0000\n1.0000 1.0000\n0.7500' },
      { name: '三类各半', input: '6\n6 1\n5 1\n4 1\n3 0\n2 0\n1 0', output: '0.0000 0.0000\n0.0000 0.3333\n0.0000 0.6667\n0.0000 1.0000\n0.3333 1.0000\n0.6667 1.0000\n1.0000 1.0000\n1.0000' }
    ],
    hints: [
      { zh: '每遇到一个负类样本，曲线向右走 1/N，此时可以用「当前 TPR × 1/N」累加面积。', en: 'Each negative sample moves the curve right by 1/N; add current TPR × 1/N to the area right there.' },
      { zh: 'AUC 的另一个等价说法是：随机取一正一负，正类分数更高的概率。', en: 'Equivalently, AUC is the probability that a random positive is scored above a random negative.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const items = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const p = lines[i].trim().split(/\\s+/).map(Number);',
        '  items.push({ score: p[0], label: p[1] });',
        '}',
        'items.sort((a, b) => b.score - a.score);',
        'let P = 0, N = 0;',
        'for (const it of items) { if (it.label === 1) P++; else N++; }',
        '',
        '// TODO: 逐步推进，输出 (FPR, TPR) 并用梯形法累加 AUC',
        'console.log("0.0000 0.0000");',
        'console.log((0).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    items = []',
        '    for i in range(n):',
        '        score, label = lines[i + 1].split()',
        '        items.append((float(score), int(label)))',
        '    items.sort(key=lambda t: -t[0])',
        '    P = sum(1 for _, label in items if label == 1)',
        '    N = n - P',
        '    # TODO: 逐步推进，输出 (FPR, TPR) 并用梯形法累加 AUC',
        '    print("0.0000 0.0000")',
        '    print("%.4f" % 0.0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        'const items = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const p = lines[i].trim().split(/\\s+/).map(Number);',
        '  items.push({ score: p[0], label: p[1] });',
        '}',
        'items.sort(function (a, b) { return b.score - a.score; });',
        'let P = 0;',
        'for (const it of items) if (it.label === 1) P++;',
        'const N = n - P;',
        '',
        'let tp = 0, fp = 0, area = 0;',
        'console.log("0.0000 0.0000");',
        'for (let k = 0; k < n; k++) {',
        '  if (items[k].label === 1) tp++; else fp++;',
        '  if (items[k].label === 0) area += (P > 0 ? tp / P : 0) * (1 / N);',
        '  const fpr = fp / N;',
        '  const tpr = P > 0 ? tp / P : 0;',
        '  console.log(fpr.toFixed(4) + " " + tpr.toFixed(4));',
        '}',
        'console.log(area.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n = int(lines[0])',
        '    items = []',
        '    for i in range(n):',
        '        score, label = lines[i + 1].split()',
        '        items.append((float(score), int(label)))',
        '    items.sort(key=lambda t: -t[0])',
        '    P = sum(1 for _, label in items if label == 1)',
        '    N = n - P',
        '',
        '    tp = fp = 0',
        '    area = 0.0',
        '    print("0.0000 0.0000")',
        '    for k in range(n):',
        '        if items[k][1] == 1:',
        '            tp += 1',
        '        else:',
        '            fp += 1',
        '            area += (tp / P if P > 0 else 0.0) * (1 / N)',
        '        fpr = fp / N',
        '        tpr = tp / P if P > 0 else 0.0',
        '        print("%.4f %.4f" % (fpr, tpr))',
        '    print("%.4f" % area)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-kfold',
    title: { zh: '分层 k 折划分', en: 'Stratified k-fold split' },
    difficulty: 'medium',
    tags: ['ml', 'modeleval', 'sort'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '做分层 k 折划分：先按下标顺序把所有样本按类别分组（类别小的在前），把各组的样本按「类别内下标顺序」首尾相接成一个序列，再按 i mod k 依次分配到第 i 折。输出每个样本所属的折号，以及每折中正类的个数。',
      en: 'Stratified k-fold: group samples by class in index order (smaller class first), concatenate those groups in index order, then assign round-robin with i mod k. Output the fold of every sample and the number of positives per fold.'
    },
    input: { zh: '第一行 n、k；第二行 n 个标签（0 或 1）。', en: 'First line n, k; second line the n labels (0 or 1).' },
    output: { zh: '第一行 n 个折号；第二行 k 个整数，表示每折的正类个数。', en: 'First line: n fold indices. Second line: k integers, the positives per fold.' },
    samples: [
      { input: '6 2\n1 0 1 0 1 0', output: '1 0 0 1 1 0\n1 2' }
    ],
    tests: [
      { name: '样例 · 完全交替', input: '6 2\n1 0 1 0 1 0', output: '1 0 0 1 1 0\n1 2' },
      { name: '两类各半分三折', input: '6 3\n1 1 1 0 0 0', output: '0 1 2 0 1 2\n1 1 1' },
      { name: '只有一类', input: '4 2\n1 1 1 1', output: '0 1 0 1\n2 2' },
      { name: '不平衡数据', input: '8 2\n1 0 0 0 1 0 0 0', output: '0 0 1 0 1 1 0 1\n1 1' }
    ],
    hints: [
      { zh: '先分层再轮流分配，是为了让每一折的类别比例与整体一致 —— 不平衡数据上尤其重要。', en: 'Stratifying before the round-robin keeps each fold\'s class mix aligned with the whole set, which matters most on imbalanced data.' },
      { zh: '注意输出的是「每个样本的折号」，要按原始下标顺序打印。', en: 'The output is the fold of each sample, printed in the original index order.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], k = head[1];',
        'const labels = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 按 (类别, 下标) 排序成一个序列，再按 i % k 分配折号',
        'const fold = new Array(n).fill(0);',
        'const positives = new Array(k).fill(0);',
        'console.log(fold.join(" "));',
        'console.log(positives.join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n, k = map(int, lines[0].split())',
        '    labels = list(map(int, lines[1].split()))',
        '    # TODO: 按 (类别, 下标) 排序成一个序列，再按 i % k 分配折号',
        '    fold = [0] * n',
        '    positives = [0] * k',
        '    print(" ".join(map(str, fold)))',
        '    print(" ".join(map(str, positives)))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], k = head[1];',
        'const labels = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        'const order = [];',
        'for (let i = 0; i < n; i++) order.push(i);',
        'order.sort(function (a, b) {',
        '  if (labels[a] !== labels[b]) return labels[a] - labels[b];',
        '  return a - b;',
        '});',
        '',
        'const fold = new Array(n).fill(0);',
        'const positives = new Array(k).fill(0);',
        'for (let pos = 0; pos < order.length; pos++) {',
        '  const index = order[pos];',
        '  const f = pos % k;',
        '  fold[index] = f;',
        '  if (labels[index] === 1) positives[f]++;',
        '}',
        'console.log(fold.join(" "));',
        'console.log(positives.join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    n, k = map(int, lines[0].split())',
        '    labels = list(map(int, lines[1].split()))',
        '',
        '    order = sorted(range(n), key=lambda i: (labels[i], i))',
        '    fold = [0] * n',
        '    positives = [0] * k',
        '    for pos, index in enumerate(order):',
        '        f = pos % k',
        '        fold[index] = f',
        '        if labels[index] == 1:',
        '            positives[f] += 1',
        '    print(" ".join(str(f) for f in fold))',
        '    print(" ".join(str(c) for c in positives))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-bias-variance',
    title: { zh: '偏差-方差分解', en: 'Bias-variance decomposition' },
    difficulty: 'easy',
    tags: ['ml', 'modeleval', 'math'],
    complexity: { time: 'O(T)', space: 'O(1)' },
    statement: {
      zh: '同一个测试点上，T 次独立训练得到的模型给出 T 个预测值。设真实值为 y，输出偏差平方 bias² = (预测均值 - y)²、方差 var = Σ(预测 - 均值)² / T，以及期望泛化误差 bias² + var（假定噪声为 0）。',
      en: 'On one test point, T independently trained models give T predictions. With true value y, output bias² = (mean prediction - y)², variance = Σ(prediction - mean)² / T, and the expected error bias² + var, assuming zero noise.'
    },
    input: { zh: '第一行 T 与真实值 y；第二行 T 个预测值。', en: 'First line T and the true value y; second line the T predictions.' },
    output: { zh: '一行三个数：bias²、var、总误差，各 4 位小数。', en: 'One line: bias², variance and total error, four decimals each.' },
    samples: [
      { input: '4 10\n9 11 9 11', output: '0.0000 1.0000 1.0000' }
    ],
    tests: [
      { name: '样例 · 无偏但方差大', input: '4 10\n9 11 9 11', output: '0.0000 1.0000 1.0000' },
      { name: '样例 · 方差为零但有偏', input: '3 5\n4 4 4', output: '1.0000 0.0000 1.0000' },
      { name: '两种误差各占一半', input: '4 6\n5 7 6 6', output: '0.0000 0.5000 0.5000' },
      { name: '偏差为主', input: '3 0\n1 2 3', output: '4.0000 0.6667 4.6667' }
    ],
    hints: [
      { zh: '先算预测均值，再分别算它与真实值的差距、以及各预测围绕均值的波动。', en: 'Take the mean prediction first, then compare it with y and measure the spread around it.' },
      { zh: '偏差大说明模型太简单（欠拟合），方差大说明太敏感（过拟合）。', en: 'Large bias means too simple (underfitting); large variance means too sensitive (overfitting).' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const T = head[0], y = head[1];',
        'const preds = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 算预测均值、bias²、var 与总和',
        'console.log("0.0000 0.0000 0.0000");'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    T, y = map(float, lines[0].split())',
        '    preds = list(map(float, lines[1].split()))',
        '    # TODO: 算预测均值、bias²、var 与总和',
        '    print("0.0000 0.0000 0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const T = head[0], y = head[1];',
        'const preds = lines[1].trim().split(/\\s+/).map(Number);',
        '',
        'let mean = 0;',
        'for (const v of preds) mean += v;',
        'mean /= T;',
        'let variance = 0;',
        'for (const v of preds) variance += (v - mean) * (v - mean);',
        'variance /= T;',
        'const bias2 = (mean - y) * (mean - y);',
        'console.log([bias2, variance, bias2 + variance].map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    T, y = map(float, lines[0].split())',
        '    preds = list(map(float, lines[1].split()))',
        '    mean = sum(preds) / T',
        '    variance = sum((v - mean) ** 2 for v in preds) / T',
        '    bias2 = (mean - y) ** 2',
        '    print("%.4f %.4f %.4f" % (bias2, variance, bias2 + variance))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-cost-sensitive',
    title: { zh: '代价敏感决策', en: 'Cost-sensitive decision' },
    difficulty: 'easy',
    tags: ['ml', 'modeleval', 'math'],
    complexity: { time: 'O(1)', space: 'O(1)' },
    statement: {
      zh: '给定后验概率 p0、p1 与 2×2 的代价矩阵（c_ij 表示真实为 i 却预测为 j 的代价），选择期望代价更小的类别。输出预测类别与两个类别的期望代价。',
      en: 'Given posteriors p0, p1 and a 2×2 cost matrix (c_ij is the cost of predicting j when the truth is i), pick the class with the smaller expected cost. Output the predicted class and both expected costs.'
    },
    input: { zh: '第一行 p0、p1；第二行 c00、c01；第三行 c10、c11。', en: 'First line p0, p1; second line c00, c01; third line c10, c11.' },
    output: { zh: '一行三个量：类别、判 0 的期望代价、判 1 的期望代价，后两个 4 位小数。', en: 'One line: the class, the expected cost of predicting 0, and of predicting 1; the last two to four decimals.' },
    samples: [
      { input: '0.4 0.6\n0 1\n5 0', output: '0 0.6000 2.0000' }
    ],
    tests: [
      { name: '样例 · 漏报的代价更高', input: '0.4 0.6\n0 1\n5 0', output: '0 0.6000 2.0000' },
      { name: '两边代价对称', input: '0.6 0.4\n0 1\n1 0', output: '0 0.4000 0.6000' },
      { name: '概率明显偏向一类', input: '0.2 0.8\n0 1\n1 0', output: '1 0.8000 0.2000' },
      { name: '误报代价更高', input: '0.45 0.55\n0 4\n1 0', output: '1 2.2000 0.4500' }
    ],
    hints: [
      { zh: '期望代价 = p0 × c00 + p1 × c01（判为 0）；判为 1 时换成第二行的两个代价。', en: 'Expected cost when predicting 0 is p0·c00 + p1·c01; use the second row of the matrix for predicting 1.' },
      { zh: '当两类代价不同时，最优决策不再是简单地取概率大的那一类。', en: 'With asymmetric costs the best decision is no longer simply the larger probability.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const probs = lines[0].trim().split(/\\s+/).map(Number);',
        'const row0 = lines[1].trim().split(/\\s+/).map(Number);',
        'const row1 = lines[2].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 分别算判 0 与判 1 的期望代价，取更小者',
        'console.log("0 0.0000 0.0000");'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    p0, p1 = map(float, lines[0].split())',
        '    c00, c01 = map(float, lines[1].split())',
        '    c10, c11 = map(float, lines[2].split())',
        '    # TODO: 分别算判 0 与判 1 的期望代价，取更小者',
        '    print("0 0.0000 0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const probs = lines[0].trim().split(/\\s+/).map(Number);',
        'const row0 = lines[1].trim().split(/\\s+/).map(Number);',
        'const row1 = lines[2].trim().split(/\\s+/).map(Number);',
        'const p0 = probs[0], p1 = probs[1];',
        'const e0 = p0 * row0[0] + p1 * row0[1];',
        'const e1 = p0 * row1[0] + p1 * row1[1];',
        'const predicted = e1 < e0 ? 1 : 0;',
        'console.log(predicted + " " + e0.toFixed(4) + " " + e1.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    p0, p1 = map(float, lines[0].split())',
        '    c00, c01 = map(float, lines[1].split())',
        '    c10, c11 = map(float, lines[2].split())',
        '    e0 = p0 * c00 + p1 * c01',
        '    e1 = p0 * c10 + p1 * c11',
        '    predicted = 1 if e1 < e0 else 0',
        '    print("%d %.4f %.4f" % (predicted, e0, e1))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-gini',
    title: { zh: '基尼指数', en: 'Gini index' },
    difficulty: 'easy',
    tags: ['ml', 'tree', 'math'],
    complexity: { time: 'O(n)', space: 'O(k)' },
    statement: {
      zh: '基尼值 Gini(D) = 1 - Σ_k p_k²，它衡量从 D 中随机抽两个样本类别不一致的概率。用特征 a 划分后的基尼指数为 Gini_index(D, a) = Σ_v (|D^v|/|D|)·Gini(D^v)。输出这个值。',
      en: 'The Gini value Gini(D) = 1 - Σ_k p_k² is the probability that two randomly drawn samples disagree. Splitting on feature a gives Gini_index(D, a) = Σ_v (|D^v|/|D|)·Gini(D^v). Output that value.'
    },
    input: { zh: '第一行 n；随后 n 行每行一个特征取值与一个类别标签。', en: 'First line n; each of the next n lines holds a feature value and a class label.' },
    output: { zh: '一个数：划分后的基尼指数，4 位小数。', en: 'One number: the Gini index of the split, four decimals.' },
    samples: [
      { input: '4\n0 1\n0 1\n1 0\n1 0', output: '0.0000' }
    ],
    tests: [
      { name: '样例 · 两个纯子集', input: '4\n0 1\n0 1\n1 0\n1 0', output: '0.0000' },
      { name: '两个同样杂的子集', input: '4\n0 1\n0 0\n1 1\n1 0', output: '0.5000' },
      { name: '单一特征取值', input: '4\n0 1\n0 1\n0 0\n0 0', output: '0.5000' },
      { name: '一大一小两个子集', input: '6\n0 1\n0 1\n1 1\n1 0\n1 0\n1 0', output: '0.2500' }
    ],
    hints: [
      { zh: '基尼值最小为 0（纯），两类各半时最大为 0.5。', en: 'The Gini value is 0 for a pure set and peaks at 0.5 with two balanced classes.' },
      { zh: '决策树用基尼指数代替信息增益时，选的是让该值最小的特征；这里只需算出一个特征的划分效果。', en: 'When a tree uses the Gini index instead of information gain it picks the smallest value; here you just evaluate one feature.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        '',
        'function gini(labels) {',
        '  // TODO: 1 - Σ p_k²',
        '  return 0;',
        '}',
        '',
        '// TODO: 按特征取值分组，按样本占比加权',
        'console.log((0).toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def gini(labels):',
        '    # TODO: 1 - Σ p_k²',
        '    return 0.0',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    # TODO: 按特征取值分组，按样本占比加权',
        '    print("%.4f" % 0.0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const n = Number(lines[0]);',
        '',
        'function gini(labels) {',
        '  if (!labels.length) return 0;',
        '  const count = new Map();',
        '  for (const v of labels) count.set(v, (count.get(v) || 0) + 1);',
        '  let value = 1;',
        '  for (const c of count.values()) {',
        '    const p = c / labels.length;',
        '    value -= p * p;',
        '  }',
        '  return value;',
        '}',
        '',
        'const groups = new Map();',
        'for (let i = 1; i <= n; i++) {',
        '  const parts = lines[i].trim().split(/\\s+/).map(Number);',
        '  if (!groups.has(parts[0])) groups.set(parts[0], []);',
        '  groups.get(parts[0]).push(parts[1]);',
        '}',
        'let total = 0;',
        'for (const labels of groups.values()) total += (labels.length / n) * gini(labels);',
        'console.log(total.toFixed(4));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def gini(labels):',
        '    if not labels:',
        '        return 0.0',
        '    counts = {}',
        '    for v in labels:',
        '        counts[v] = counts.get(v, 0) + 1',
        '    value = 1.0',
        '    for c in counts.values():',
        '        p = c / len(labels)',
        '        value -= p * p',
        '    return value',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    idx = 1',
        '    groups = {}',
        '    for _ in range(n):',
        '        feature = int(data[idx]); label = int(data[idx + 1]); idx += 2',
        '        groups.setdefault(feature, []).append(label)',
        '    total = 0.0',
        '    for labels in groups.values():',
        '        total += (len(labels) / n) * gini(labels)',
        '    print("%.4f" % total)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-adaboost',
    title: { zh: 'AdaBoost 一轮更新', en: 'One AdaBoost round' },
    difficulty: 'hard',
    tags: ['ml', 'ensemble', 'math'],
    complexity: { time: 'O(m)', space: 'O(m)' },
    statement: {
      zh: '样本初始权重相等（各 1/m），标签 y ∈ {-1, +1}。给定弱分类器的预测，先算加权错误率 ε = Σ_i w_i·[ŷ_i ≠ y_i]，再算分类器权重 α = 0.5·ln((1-ε)/ε)，最后把样本权重更新为 w_i ← w_i·exp(-α·y_i·ŷ_i) 并归一化。输出 ε、α 与更新后的 m 个权重。测试用例中保证 0 < ε < 1。',
      en: 'Samples start with equal weights 1/m and labels y ∈ {-1, +1}. Given the weak classifier\'s predictions, compute the weighted error ε = Σ_i w_i·[ŷ_i ≠ y_i], the classifier weight α = 0.5·ln((1-ε)/ε), and the updated sample weights w_i ← w_i·exp(-α·y_i·ŷ_i), normalised. Print ε, α and the m new weights. Test cases guarantee 0 < ε < 1.'
    },
    input: { zh: '第一行 m；第二行 m 个标签（-1 或 1）；第三行 m 个预测（-1 或 1）。', en: 'First line m; second line the m labels (-1 or 1); third line the m predictions (-1 or 1).' },
    output: { zh: '一行 m+2 个数：ε、α，随后 m 个权重，各 4 位小数。', en: 'One line with m+2 numbers: ε, α, then the m weights, four decimals each.' },
    samples: [
      { input: '4\n1 1 -1 -1\n1 -1 -1 -1', output: '0.2500 0.5493 0.1667 0.5000 0.1667 0.1667' }
    ],
    tests: [
      { name: '样例 · 错一个', input: '4\n1 1 -1 -1\n1 -1 -1 -1', output: '0.2500 0.5493 0.1667 0.5000 0.1667 0.1667' },
      { name: '三个样本错一个', input: '3\n1 1 1\n1 1 -1', output: '0.3333 0.3466 0.2500 0.2500 0.5000' },
      { name: '五个样本错一个', input: '5\n1 1 1 1 -1\n1 1 1 -1 -1', output: '0.2000 0.6931 0.1250 0.1250 0.1250 0.5000 0.1250' },
      { name: '错两个', input: '4\n1 1 -1 -1\n-1 1 -1 1', output: '0.5000 0.0000 0.2500 0.2500 0.2500 0.2500' }
    ],
    hints: [
      { zh: 'ε=0.5 时 α=0，因为这样的弱分类器等于随机猜，没有任何发言权。', en: 'With ε=0.5 the weight α collapses to 0: such a classifier is no better than a coin flip.' },
      { zh: '更新后错分样本的权重会上升，正确样本的权重会下降 —— 这正是 AdaBoost 让后续分类器关注难样本的方式。', en: 'Misclassified samples gain weight and correct ones lose it, which is exactly how AdaBoost forces later classifiers to focus on hard samples.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const m = Number(lines[0]);',
        'const y = lines[1].trim().split(/\\s+/).map(Number);',
        'const pred = lines[2].trim().split(/\\s+/).map(Number);',
        '',
        '// TODO: 算加权错误率 eps、分类器权重 alpha，再更新并归一化样本权重',
        'const out = [0, 0];',
        'for (let i = 0; i < m; i++) out.push(1 / m);',
        'console.log(out.map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    m = int(lines[0])',
        '    y = list(map(int, lines[1].split()))',
        '    pred = list(map(int, lines[2].split()))',
        '    # TODO: 算加权错误率 eps、alpha，再更新并归一化权重',
        '    out = [0.0, 0.0] + [1.0 / m] * m',
        '    print(" ".join("%.4f" % v for v in out))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const m = Number(lines[0]);',
        'const y = lines[1].trim().split(/\\s+/).map(Number);',
        'const pred = lines[2].trim().split(/\\s+/).map(Number);',
        '',
        'const weights = new Array(m).fill(1 / m);',
        'let eps = 0;',
        'for (let i = 0; i < m; i++) if (pred[i] !== y[i]) eps += weights[i];',
        'const alpha = 0.5 * Math.log((1 - eps) / eps);',
        'const next = [];',
        'let sum = 0;',
        'for (let i = 0; i < m; i++) {',
        '  const v = weights[i] * Math.exp(-alpha * y[i] * pred[i]);',
        '  next.push(v);',
        '  sum += v;',
        '}',
        'const out = [eps, alpha];',
        'for (const v of next) out.push(v / sum);',
        'console.log(out.map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    m = int(lines[0])',
        '    y = list(map(int, lines[1].split()))',
        '    pred = list(map(int, lines[2].split()))',
        '',
        '    weights = [1.0 / m] * m',
        '    eps = sum(weights[i] for i in range(m) if pred[i] != y[i])',
        '    alpha = 0.5 * math.log((1 - eps) / eps)',
        '    nxt = [weights[i] * math.exp(-alpha * y[i] * pred[i]) for i in range(m)]',
        '    total = sum(nxt)',
        '    out = [eps, alpha] + [v / total for v in nxt]',
        '    print(" ".join("%.4f" % v for v in out))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-svm-margin',
    title: { zh: '间隔与支持向量', en: 'Margin and support vectors' },
    difficulty: 'medium',
    tags: ['ml', 'math', 'linmodel'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '给定超平面 w·x + b = 0 与标注 y ∈ {-1, +1} 的样本。函数间隔为 y_i(w·x_i + b)，几何间隔再除以 |w|。输出每个样本的函数间隔，然后输出最小几何间隔与「支持向量」的个数（约定：函数间隔 ≤ 1 的样本算支持向量）。',
      en: 'Given the hyperplane w·x + b = 0 and samples labelled y ∈ {-1, +1}: the functional margin is y_i(w·x_i + b) and the geometric margin divides it by |w|. Print the functional margin of every sample, then the smallest geometric margin and how many samples count as support vectors (functional margin ≤ 1).'
    },
    input: { zh: '第一行 n、w1、w2、b；随后 n 行每行 x1、x2、y。', en: 'First line n, w1, w2, b; then n lines of x1, x2, y.' },
    output: { zh: '第一行 n 个函数间隔；第二行最小几何间隔与支持向量个数（前者 4 位小数）。', en: 'First line: the n functional margins. Second line: the smallest geometric margin (four decimals) and the number of support vectors.' },
    samples: [
      { input: '4 1 0 -3\n4 0 1\n2 0 -1\n5 0 1\n0 0 -1', output: '1.0000 1.0000 2.0000 3.0000\n1.0000 2' }
    ],
    tests: [
      { name: '样例 · |w| = 1', input: '4 1 0 -3\n4 0 1\n2 0 -1\n5 0 1\n0 0 -1', output: '1.0000 1.0000 2.0000 3.0000\n1.0000 2' },
      { name: '竖直分界', input: '4 0 1 -1\n0 2 1\n0 0 -1\n0 3 1\n0 -1 -1', output: '1.0000 1.0000 2.0000 2.0000\n1.0000 2' },
      { name: '|w| 不为 1', input: '4 2 0 -2\n3 0 1\n1 0 -1\n1 0 1\n0 0 -1', output: '4.0000 0.0000 0.0000 2.0000\n0.0000 2' },
      { name: '全部远离分界', input: '3 1 1 0\n2 2 1\n-2 -2 -1\n1 1 1', output: '4.0000 4.0000 2.0000\n1.4142 0' }
    ],
    hints: [
      { zh: '函数间隔会随 w 与 b 同比例缩放，所以判断「谁离得近」要看几何间隔。', en: 'The functional margin scales with w and b, so distance comparisons need the geometric margin.' },
      { zh: '恰好在 |w·x + b| = 1 上的点决定了最大间隔，它们就是支持向量。', en: 'The points sitting exactly on |w·x + b| = 1 pin down the maximal margin — those are the support vectors.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], w1 = head[1], w2 = head[2], b = head[3];',
        '',
        'const margins = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const [x1, x2, y] = lines[i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 算函数间隔 y*(w·x+b)',
        '}',
        '',
        '// TODO: 最小几何间隔与支持向量个数',
        'console.log(new Array(n).fill("0.0000").join(" "));',
        'console.log("0.0000 0");'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0]); w1 = float(data[1]); w2 = float(data[2]); b = float(data[3])',
        '    idx = 4',
        '    margins = []',
        '    for _ in range(n):',
        '        x1 = float(data[idx]); x2 = float(data[idx + 1]); y = int(data[idx + 2]); idx += 3',
        '        pass  # TODO: 算函数间隔',
        '    # TODO: 最小几何间隔与支持向量个数',
        '    print(" ".join(["0.0000"] * n))',
        '    print("0.0000 0")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const head = lines[0].trim().split(/\\s+/).map(Number);',
        'const n = head[0], w1 = head[1], w2 = head[2], b = head[3];',
        'const norm = Math.sqrt(w1 * w1 + w2 * w2);',
        '',
        'const margins = [];',
        'for (let i = 1; i <= n; i++) {',
        '  const parts = lines[i].trim().split(/\\s+/).map(Number);',
        '  const f = w1 * parts[0] + w2 * parts[1] + b;',
        '  margins.push(parts[2] * f);',
        '}',
        'const clean = v => (Math.abs(v) < 1e-12 ? 0 : v);   // 避免 -0.0000',
        'let best = Infinity, support = 0;',
        'for (const mg of margins) {',
        '  const geo = norm > 0 ? mg / norm : 0;',
        '  if (geo < best) best = geo;',
        '  if (mg <= 1 + 1e-9) support++;',
        '}',
        'console.log(margins.map(v => clean(v).toFixed(4)).join(" "));',
        'console.log(clean(best).toFixed(4) + " " + support);'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0]); w1 = float(data[1]); w2 = float(data[2]); b = float(data[3])',
        '    idx = 4',
        '    norm = math.hypot(w1, w2)',
        '    margins = []',
        '    for _ in range(n):',
        '        x1 = float(data[idx]); x2 = float(data[idx + 1]); y = int(data[idx + 2])',
        '        idx += 3',
        '        margins.append(y * (w1 * x1 + w2 * x2 + b))',
        '    def clean(v):',
        '        return 0.0 if abs(v) < 1e-12 else v',
        '    best = min((mg / norm if norm > 0 else 0.0) for mg in margins)',
        '    support = sum(1 for mg in margins if mg <= 1 + 1e-9)',
        '    print(" ".join("%.4f" % clean(v) for v in margins))',
        '    print("%.4f %d" % (clean(best), support))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-backprop',
    title: { zh: '反向传播一层梯度', en: 'Backpropagation gradients' },
    difficulty: 'hard',
    tags: ['ml', 'neural', 'math'],
    complexity: { time: 'O(1)', space: 'O(1)' },
    statement: {
      zh: '一个 2 输入、2 个 tanh 隐藏单元、1 个线性输出的网络。前向：z_j = w_{j1}x1 + w_{j2}x2 + b1_j，a_j = tanh(z_j)，o = v1a1 + v2a2 + b3，损失 L = 0.5(o - y)²。输出 L 以及关于 (v1, v2, b3, w11, w12, w21, w22, b1_1, b1_2) 的梯度。',
      en: 'A network with 2 inputs, 2 tanh hidden units and a linear output. Forward pass: z_j = w_{j1}x1 + w_{j2}x2 + b1_j, a_j = tanh(z_j), o = v1a1 + v2a2 + b3, loss L = 0.5(o - y)². Output L and the gradients with respect to (v1, v2, b3, w11, w12, w21, w22, b1_1, b1_2).'
    },
    input: { zh: '第一行 x1、x2、y；第二行 w11、w12、w21、w22、b1_1、b1_2；第三行 v1、v2、b3。', en: 'First line x1, x2, y; second line w11, w12, w21, w22, b1_1, b1_2; third line v1, v2, b3.' },
    output: { zh: '一行 10 个数：L，随后 9 个梯度，各 4 位小数。', en: 'One line of 10 numbers: L followed by the 9 gradients, four decimals each.' },
    samples: [
      { input: '1 0 0\n0.5 0 0 0.5 0 0\n1 1 0', output: '0.1068 0.2136 0.0000 0.4621 0.3634 0.0000 0.4621 0.0000 0.3634 0.4621' }
    ],
    tests: [
      { name: '样例 · 只激活第一个隐藏单元', input: '1 0 0\n0.5 0 0 0.5 0 0\n1 1 0', output: '0.1068 0.2136 0.0000 0.4621 0.3634 0.0000 0.4621 0.0000 0.3634 0.4621' },
      { name: '两个隐藏单元都参与', input: '1 1 0\n0.2 0.4 0.6 0.8 0.1 -0.1\n1 -1 0.2', output: '0.0016 -0.0347 -0.0494 -0.0574 -0.0364 -0.0364 0.0148 0.0148 -0.0364 0.0148' },
      { name: '目标值高于输出', input: '0 1 1\n0.5 0 0 0.5 0 0\n1 1 0', output: '0.1447 0.0000 -0.2486 -0.5379 0.0000 -0.5379 0.0000 -0.4230 -0.5379 -0.4230' }
    ],
    hints: [
      { zh: '记 do = o - y，则 ∂L/∂v_j = do·a_j，∂L/∂b3 = do。', en: 'With do = o - y, ∂L/∂v_j = do·a_j and ∂L/∂b3 = do.' },
      { zh: '继续往回传要乘 tanh 的导数：∂L/∂z_j = do·v_j·(1 - a_j²)。', en: 'The chain continues through tanh: ∂L/∂z_j = do·v_j·(1 - a_j²).' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const x = lines[0].trim().split(/\\s+/).map(Number);',
        'const w = lines[1].trim().split(/\\s+/).map(Number);',
        'const v = lines[2].trim().split(/\\s+/).map(Number);',
        'const x1 = x[0], x2 = x[1], y = x[2];',
        '',
        '// TODO: 前向算出 a1、a2、o，再反向传播求 9 个梯度',
        'const z1 = w[0] * x1 + w[1] * x2 + w[4];',
        'const a1 = Math.tanh(z1);',
        'console.log([0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(t => t.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    x = list(map(float, lines[0].split()))',
        '    w = list(map(float, lines[1].split()))',
        '    v = list(map(float, lines[2].split()))',
        '    x1, x2, y = x[0], x[1], x[2]',
        '    # TODO: 前向算出 a1、a2、o，再反向传播求 9 个梯度',
        '    print(" ".join(["0.0000"] * 10))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const x = lines[0].trim().split(/\\s+/).map(Number);',
        'const w = lines[1].trim().split(/\\s+/).map(Number);',
        'const v = lines[2].trim().split(/\\s+/).map(Number);',
        'const x1 = x[0], x2 = x[1], y = x[2];',
        '',
        'const z1 = w[0] * x1 + w[1] * x2 + w[4];',
        'const z2 = w[2] * x1 + w[3] * x2 + w[5];',
        'const a1 = Math.tanh(z1);',
        'const a2 = Math.tanh(z2);',
        'const o = v[0] * a1 + v[1] * a2 + v[2];',
        'const L = 0.5 * (o - y) * (o - y);',
        '',
        'const dOut = o - y;',
        'const dv1 = dOut * a1;',
        'const dv2 = dOut * a2;',
        'const db3 = dOut;',
        'const dz1 = dOut * v[0] * (1 - a1 * a1);',
        'const dz2 = dOut * v[1] * (1 - a2 * a2);',
        'const dw11 = dz1 * x1, dw12 = dz1 * x2;',
        'const dw21 = dz2 * x1, dw22 = dz2 * x2;',
        '',
        'const out = [L, dv1, dv2, db3, dw11, dw12, dw21, dw22, dz1, dz2];',
        'const clean = v => (Math.abs(v) < 1e-12 ? 0 : v);   // 避免 -0.0000',
        'console.log(out.map(t => clean(t).toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    x = list(map(float, lines[0].split()))',
        '    w = list(map(float, lines[1].split()))',
        '    v = list(map(float, lines[2].split()))',
        '    x1, x2, y = x[0], x[1], x[2]',
        '',
        '    z1 = w[0] * x1 + w[1] * x2 + w[4]',
        '    z2 = w[2] * x1 + w[3] * x2 + w[5]',
        '    a1 = math.tanh(z1)',
        '    a2 = math.tanh(z2)',
        '    o = v[0] * a1 + v[1] * a2 + v[2]',
        '    L = 0.5 * (o - y) ** 2',
        '',
        '    d_out = o - y',
        '    dv1 = d_out * a1',
        '    dv2 = d_out * a2',
        '    db3 = d_out',
        '    dz1 = d_out * v[0] * (1 - a1 * a1)',
        '    dz2 = d_out * v[1] * (1 - a2 * a2)',
        '    out = [L, dv1, dv2, db3, dz1 * x1, dz1 * x2, dz2 * x1, dz2 * x2, dz1, dz2]',
        '    clean = lambda v: 0.0 if abs(v) < 1e-12 else v',
        '    print(" ".join("%.4f" % clean(t) for t in out))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'ml-policy-eval',
    title: { zh: '策略评估一步', en: 'One step of policy evaluation' },
    difficulty: 'medium',
    tags: ['ml', 'rl', 'math'],
    complexity: { time: 'O(S²A)', space: 'O(S)' },
    statement: {
      zh: '用贝尔曼期望方程做一步策略评估：V(s) ← Σ_a π(a|s)[ R(s,a) + γ Σ_{s\'} P(s\'|s,a)·V(s\') ]。输入当前 V 与各 (s,a) 的策略概率、转移概率与期望即时奖励，输出更新后的 V。',
      en: 'One sweep of policy evaluation with the Bellman expectation equation: V(s) ← Σ_a π(a|s)[ R(s,a) + γ Σ_{s\'} P(s\'|s,a)·V(s\') ]. Given the current V plus, for each (s,a), the policy probability, transition probabilities and expected immediate reward, print the updated V.'
    },
    input: { zh: '第一行 γ；第二行 S、A；第三行 S 个初始 V；随后 S×A 行，每行 "s a π P1..PS R"。', en: 'First line γ; second line S, A; third line the S current values; then S×A lines of "s a π P1..PS R".' },
    output: { zh: '一行 S 个数：更新后的 V，各 4 位小数。', en: 'One line: the updated V, four decimals each.' },
    samples: [
      { input: '0.9\n2 1\n2 5\n0 0 1 0.5 0.5 1\n1 0 1 0 1 0', output: '4.1500 4.5000' }
    ],
    tests: [
      { name: '样例 · 单动作', input: '0.9\n2 1\n2 5\n0 0 1 0.5 0.5 1\n1 0 1 0 1 0', output: '4.1500 4.5000' },
      { name: '两个动作取加权', input: '0.5\n2 2\n4 2\n0 0 0.3 1 0 1\n0 1 0.7 0 1 2\n1 0 0.5 1 0 0\n1 1 0.5 0 1 0', output: '3.0000 1.5000' },
      { name: 'γ=1 且初始值为零', input: '1\n2 1\n0 0\n0 0 1 0 1 3\n1 0 1 1 0 -1', output: '3.0000 -1.0000' }
    ],
    hints: [
      { zh: '注意 Σ_{s\'} P(s\'|s,a)·V(s\') 用的是「当前」的价值函数，整轮评估要一起更新。', en: 'The Σ P·V term uses the current value function; update every state from the same snapshot.' },
      { zh: 'γ=0 时这一轮就退化成对即时奖励按策略求期望。', en: 'With γ = 0 the sweep collapses to the policy-weighted average of immediate rewards.' }
    ],
    templates: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const gamma = Number(lines[0]);',
        'const size = lines[1].trim().split(/\\s+/).map(Number);',
        'const S = size[0], A = size[1];',
        'const value = lines[2].trim().split(/\\s+/).map(Number);',
        '',
        'const next = new Array(S).fill(0);',
        'for (let i = 3; i < 3 + S * A; i++) {',
        '  const row = lines[i].trim().split(/\\s+/).map(Number);',
        '  // TODO: 累加 π * (R + γ Σ P·V)',
        '}',
        'console.log(next.map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    gamma = float(lines[0])',
        '    S, A = map(int, lines[1].split())',
        '    value = list(map(float, lines[2].split()))',
        '    nxt = [0.0] * S',
        '    for i in range(3, 3 + S * A):',
        '        row = list(map(float, lines[i].split()))',
        '        pass  # TODO: 累加 π * (R + γ Σ P·V)',
        '    print(" ".join("%.4f" % v for v in nxt))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      js: [
        'const lines = readAll().trim().split(/\\r?\\n/);',
        'const gamma = Number(lines[0]);',
        'const size = lines[1].trim().split(/\\s+/).map(Number);',
        'const S = size[0], A = size[1];',
        'const value = lines[2].trim().split(/\\s+/).map(Number);',
        '',
        'const next = new Array(S).fill(0);',
        'for (let i = 3; i < 3 + S * A; i++) {',
        '  const row = lines[i].trim().split(/\\s+/).map(Number);',
        '  const s = row[0];',
        '  const pi = row[2];',
        '  const reward = row[3 + S];',
        '  let expected = 0;',
        '  for (let s2 = 0; s2 < S; s2++) expected += row[3 + s2] * value[s2];',
        '  next[s] += pi * (reward + gamma * expected);',
        '}',
        'console.log(next.map(v => v.toFixed(4)).join(" "));'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    lines = sys.stdin.read().strip().split("\\n")',
        '    gamma = float(lines[0])',
        '    S, A = map(int, lines[1].split())',
        '    value = list(map(float, lines[2].split()))',
        '',
        '    nxt = [0.0] * S',
        '    for i in range(3, 3 + S * A):',
        '        row = list(map(float, lines[i].split()))',
        '        s = int(row[0])',
        '        pi = row[2]',
        '        reward = row[3 + S]',
        '        expected = sum(row[3 + k] * value[k] for k in range(S))',
        '        nxt[s] += pi * (reward + gamma * expected)',
        '    print(" ".join("%.4f" % v for v in nxt))',
        '',
        'main()'
      ].join('\n')
    }
  }
];
