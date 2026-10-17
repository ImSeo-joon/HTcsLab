/* ============================================================
   py-track.js — Python 课程向原创题

   主题对照常见的 Python 学习顺序：容器与统计 → 生成器 → 装饰器 →
   类与特殊方法。题目与数据均为原创，只用标准库的公开接口。
   ============================================================ */

window.LHT_PROBLEMS = window.LHT_PROBLEMS.concat([
  {
    id: 'py-word-count',
    title: { zh: '词频统计与排序', en: 'Word frequency and ordering' },
    difficulty: 'easy',
    tags: ['python', 'string', 'hash'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '读入一行用空格分隔的单词，统计每个词出现的次数。按次数从多到少输出；次数相同时按单词的字典序从小到大。这题练 dict 计数与「多关键字排序」。',
      en: 'Read a line of space-separated words and count each one. Print them by descending count, breaking ties by ascending lexicographic order. The exercise is dict counting plus multi-key sorting.'
    },
    input: { zh: '一行文本。', en: 'A single line of text.' },
    output: { zh: '每行 "单词 次数"。', en: 'One line per word: "word count".' },
    samples: [
      { input: 'the cat the dog the', output: 'the 3\ncat 1\ndog 1' }
    ],
    tests: [
      { name: '样例', input: 'the cat the dog the', output: 'the 3\ncat 1\ndog 1' },
      { name: '只有一个词', input: 'hello', output: 'hello 1' },
      { name: '全部不同', input: 'b a c', output: 'a 1\nb 1\nc 1' },
      { name: '同频多词的字典序', input: 'bb aa cc aa bb cc', output: 'aa 2\nbb 2\ncc 2' }
    ],
    hints: [
      { zh: 'sorted(items, key=lambda kv: (-kv[1], kv[0])) 一条就能表达「次数降序、单词升序」。', en: 'sorted(items, key=lambda kv: (-kv[1], kv[0])) expresses "count descending, word ascending" in one call.' },
      { zh: 'collections.Counter 也行，但要注意 most_common 对同频词的顺序不保证字典序。', en: 'collections.Counter works too, but most_common does not guarantee lexicographic order among equal counts.' }
    ],
    templates: {
      py: [
        'import sys',
        '',
        'def main():',
        '    words = sys.stdin.read().split()',
        '    count = {}',
        '    # TODO: 统计词频，再按「次数降序、单词升序」输出',
        '    pass',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      py: [
        'import sys',
        '',
        'def main():',
        '    words = sys.stdin.read().split()',
        '    count = {}',
        '    for w in words:',
        '        count[w] = count.get(w, 0) + 1',
        '    for word, n in sorted(count.items(), key=lambda kv: (-kv[1], kv[0])):',
        '        print(word, n)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'py-fib-gen',
    title: { zh: '生成器：斐波那契', en: 'Generators: Fibonacci' },
    difficulty: 'easy',
    tags: ['python', 'recursion'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '用生成器（yield）逐个产出斐波那契数，输出前 n 个，从 0、1 开始。要求只保留最近两个值，空间 O(1) —— 这正是生成器比「先造一个列表」省内存的地方。',
      en: 'Produce Fibonacci numbers with a generator (yield) and print the first n, starting 0, 1. Keep only the last two values, O(1) space — exactly where a generator beats building a list first.'
    },
    input: { zh: '一个整数 n（0 ≤ n ≤ 40）。', en: 'One integer n (0 ≤ n ≤ 40).' },
    output: { zh: '一行 n 个数，空格分隔；n=0 时输出空行。', en: 'One line of n numbers separated by spaces; an empty line when n = 0.' },
    samples: [
      { input: '6', output: '0 1 1 2 3 5' }
    ],
    tests: [
      { name: '样例', input: '6', output: '0 1 1 2 3 5' },
      { name: 'n = 0', input: '0', output: '' },
      { name: 'n = 1', input: '1', output: '0' },
      { name: 'n = 2', input: '2', output: '0 1' },
      { name: 'n = 10', input: '10', output: '0 1 1 2 3 5 8 13 21 34' }
    ],
    hints: [
      { zh: '生成器里用 a, b = b, a + b 一次完成两个变量的轮换。', en: 'Inside the generator, a, b = b, a + b rotates both values in one statement.' },
      { zh: '取值时用 itertools.islice 或者 for + break，避免无限生成器停不下来。', en: 'Pull values with itertools.islice or a for loop with break, so an infinite generator stops.' }
    ],
    templates: {
      py: [
        'import sys',
        '',
        'def fib():',
        '    a, b = 0, 1',
        '    while True:',
        '        pass  # TODO: 先 yield 当前值，再推进到下一对',
        '',
        'def main():',
        '    n = int(sys.stdin.read().strip() or 0)',
        '    # TODO: 取前 n 项输出',
        '    print("")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      py: [
        'import sys',
        '',
        'def fib():',
        '    a, b = 0, 1',
        '    while True:',
        '        yield a',
        '        a, b = b, a + b',
        '',
        'def main():',
        '    n = int(sys.stdin.read().strip() or 0)',
        '    gen = fib()',
        '    print(" ".join(str(next(gen)) for _ in range(n)))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'py-memo-decorator',
    title: { zh: '装饰器：记忆化递归', en: 'Decorators: memoised recursion' },
    difficulty: 'medium',
    tags: ['python', 'recursion', 'dp'],
    complexity: { time: 'O(n)', space: 'O(n)' },
    statement: {
      zh: '写一个记忆化装饰器，让朴素递归的斐波那契从指数级降到线性。输出 fib(n) 以及「真正参与计算的子问题个数」——即缓存未命中的次数。注意 n=1 时不会递归到 fib(0)，所以只有 1 次；n ≥ 2 时才是 n+1。',
      en: 'Write a memoising decorator so naive recursive Fibonacci drops from exponential to linear. Print fib(n) and how many subproblems were actually computed (cache misses). Note that n = 1 never recurses into fib(0), so it costs 1; only n ≥ 2 gives n+1.'
    },
    input: { zh: '一个整数 n（0 ≤ n ≤ 30）。', en: 'One integer n (0 ≤ n ≤ 30).' },
    output: { zh: '一行："fib(n) 未命中次数"。', en: 'One line: "fib(n) misses".' },
    samples: [
      { input: '10', output: '55 11' }
    ],
    tests: [
      { name: '样例', input: '10', output: '55 11' },
      { name: 'n = 0', input: '0', output: '0 1' },
      { name: 'n = 1', input: '1', output: '1 1' },
      { name: 'n = 20', input: '20', output: '6765 21' },
      { name: 'n = 30', input: '30', output: '832040 31' }
    ],
    hints: [
      { zh: '装饰器要返回一个闭包，闭包里用 dict 当缓存，并用 functools.wraps 保留原函数信息。', en: 'The decorator returns a closure holding a dict cache; use functools.wraps to keep the wrapped function\'s metadata.' },
      { zh: '计数放在闭包里递增，别用全局变量——那样第二次调用会串味。', en: 'Increment the counter inside the closure rather than in a global, which would leak between calls.' }
    ],
    templates: {
      py: [
        'import sys',
        'from functools import wraps',
        '',
        'misses = 0',
        '',
        'def memo(func):',
        '    cache = {}',
        '    @wraps(func)',
        '    def wrapper(n):',
        '        # TODO: 命中缓存直接返回，未命中则计数并计算',
        '        return 0',
        '    return wrapper',
        '',
        '@memo',
        'def fib(n):',
        '    return n if n < 2 else fib(n - 1) + fib(n - 2)',
        '',
        'def main():',
        '    n = int(sys.stdin.read().strip())',
        '    print(fib(n), misses)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      py: [
        'import sys',
        'from functools import wraps',
        '',
        'misses = 0',
        '',
        'def memo(func):',
        '    cache = {}',
        '    @wraps(func)',
        '    def wrapper(n):',
        '        global misses',
        '        if n in cache:',
        '            return cache[n]',
        '        misses += 1',
        '        cache[n] = func(n)',
        '        return cache[n]',
        '    return wrapper',
        '',
        '@memo',
        'def fib(n):',
        '    return n if n < 2 else fib(n - 1) + fib(n - 2)',
        '',
        'def main():',
        '    n = int(sys.stdin.read().strip())',
        '    print(fib(n), misses)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'py-fraction-class',
    title: { zh: '类与特殊方法：分数相加', en: 'Classes and dunders: adding fractions' },
    difficulty: 'medium',
    tags: ['python', 'math'],
    complexity: { time: 'O(log n)', space: 'O(1)' },
    statement: {
      zh: '实现一个分数类，支持加法并自动约分（用 __add__ 与 __str__ 之类的特殊方法），输出两个分数之和的最简形式。分母的负号统一移到分子上，分母恒为正。',
      en: 'Implement a fraction class with addition and automatic reduction using special methods such as __add__, then print the reduced sum of two fractions. Any sign on the denominator moves to the numerator, so the denominator stays positive.'
    },
    input: { zh: '一行四个整数：a b c d，表示 a/b 与 c/d（分母不为 0）。', en: 'One line of four integers a b c d standing for a/b and c/d (denominators nonzero).' },
    output: { zh: '一行两个整数：和的分子与分母（最简、分母为正）。', en: 'One line with the numerator and denominator of the reduced sum (positive denominator).' },
    samples: [
      { input: '1 2 1 3', output: '5 6' }
    ],
    tests: [
      { name: '样例', input: '1 2 1 3', output: '5 6' },
      { name: '和为整数', input: '1 2 1 2', output: '1 1' },
      { name: '需要约分', input: '2 4 1 4', output: '3 4' },
      { name: '符号规范化', input: '1 -2 1 2', output: '0 1' },
      { name: '负分母', input: '1 2 1 -3', output: '1 6' }
    ],
    hints: [
      { zh: 'a/b + c/d 的分子是 a·d + c·b，分母是 b·d；再用 math.gcd 约分。', en: 'The sum has numerator a·d + c·b and denominator b·d; reduce with math.gcd.' },
      { zh: '约分前先把分母的符号翻到分子上，否则最简形式不唯一。', en: 'Normalise the denominator sign before reducing, otherwise the reduced form is not unique.' }
    ],
    templates: {
      py: [
        'import sys',
        'from math import gcd',
        '',
        'class Fraction:',
        '    def __init__(self, num, den):',
        '        # TODO: 规范化符号并约分',
        '        self.num, self.den = num, den',
        '',
        '    def __add__(self, other):',
        '        # TODO: 返回一个新的 Fraction',
        '        return Fraction(0, 1)',
        '',
        '    def __str__(self):',
        '        return "%d %d" % (self.num, self.den)',
        '',
        'def main():',
        '    a, b, c, d = map(int, sys.stdin.read().split())',
        '    print(Fraction(a, b) + Fraction(c, d))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      py: [
        'import sys',
        'from math import gcd',
        '',
        'class Fraction:',
        '    def __init__(self, num, den):',
        '        if den < 0:',
        '            num, den = -num, -den',
        '        g = gcd(abs(num), den) or 1',
        '        self.num, self.den = num // g, den // g',
        '',
        '    def __add__(self, other):',
        '        return Fraction(self.num * other.den + other.num * self.den, self.den * other.den)',
        '',
        '    def __str__(self):',
        '        return "%d %d" % (self.num, self.den)',
        '',
        'def main():',
        '    a, b, c, d = map(int, sys.stdin.read().split())',
        '    print(Fraction(a, b) + Fraction(c, d))',
        '',
        'main()'
      ].join('\n')
    }
  }
]);

/* 新题按易到难归位 */
(function () {
  var rank = { easy: 0, medium: 1, hard: 2 };
  window.LHT_PROBLEMS.sort(function (a, b) {
    return (rank[a.difficulty] || 0) - (rank[b.difficulty] || 0);
  });
})();
