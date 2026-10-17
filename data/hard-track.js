/* ============================================================
   hard-track.js — 思维性更强的原创题

   单调栈 / 分治计数 / 动态规划 / 贪心加二分 / 并查集 / 快速幂。
   每道题都把目标复杂度写进题面，参考解给出的必须是「想清楚之后」的写法，
   而不是小数据下能过、大数据下会超时的朴素解。

   最后按难度把整个题库从易到难重排（sort 稳定，同难度内保持原编排顺序）。
   ============================================================ */

window.LHT_PROBLEMS = window.LHT_PROBLEMS.concat([
  {
    id: 'h-next-greater',
    title: { zh: '下一个更高温度', en: 'Next warmer day' },
    difficulty: 'medium',
    tags: ['stack', 'array', 'c'],
    complexity: { time: 'O(n)', space: 'O(n)' },
    statement: {
      zh: '给定每天的温度，求出每一天「还要等几天才会更暖」，等不到就输出 0。要求 O(n)：用单调栈把还没找到答案的日子压着，遇到更暖的一天就一次性结算栈里所有比它冷的日子。',
      en: 'For each day, print how many days until a warmer day, or 0 if none comes. This needs O(n): keep a monotonic stack of days still waiting, and settle all colder days at once when a warmer one shows up.'
    },
    input: { zh: '第一行 n；第二行 n 个整数温度。', en: 'First line n; second line n temperatures.' },
    output: { zh: '一行 n 个整数，空格分隔。', en: 'One line of n integers, space separated.' },
    samples: [
      { input: '5\n73 74 75 71 69', output: '1 1 0 0 0' }
    ],
    tests: [
      { name: '样例', input: '5\n73 74 75 71 69', output: '1 1 0 0 0' },
      { name: '一直变暖', input: '4\n30 40 50 60', output: '1 1 1 0' },
      { name: '一直变冷', input: '4\n60 50 40 30', output: '0 0 0 0' },
      { name: '有起伏', input: '6\n55 38 53 81 60 70', output: '3 1 1 0 1 0' },
      { name: '只有一天', input: '1\n42', output: '0' }
    ],
    hints: [
      { zh: '栈里存的是下标，而且对应的温度从栈底到栈顶递减。', en: 'The stack holds indices whose temperatures decrease from bottom to top.' },
      { zh: '每个下标只入栈、出栈各一次，所以总代价是 O(n)。', en: 'Each index is pushed and popped once, so the total cost is O(n).' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static int a[MAXN], st[MAXN], res[MAXN];',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);',
        '    int top = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        /* TODO: 结算栈里所有比 a[i] 小的日子，再把 i 入栈 */',
        '    }',
        '    for (int i = 0; i < n; i++) {',
        '        if (i) putchar(\' \');',
        '        printf("%d", res[i]);',
        '    }',
        '    putchar(\'\\n\');',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    a = list(map(int, data[1:1 + n]))',
        '    res = [0] * n',
        '    stack = []',
        '    # TODO: 单调栈，遇到更暖的一天就结算栈顶那些日子',
        '    print(" ".join(map(str, res)))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static int a[MAXN], st[MAXN], res[MAXN];',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);',
        '',
        '    int top = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        while (top > 0 && a[st[top - 1]] < a[i]) {',
        '            int j = st[--top];',
        '            res[j] = i - j;',
        '        }',
        '        st[top++] = i;',
        '    }',
        '    for (int i = 0; i < n; i++) {',
        '        if (i) putchar(\' \');',
        '        printf("%d", res[i]);',
        '    }',
        '    putchar(\'\\n\');',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    a = list(map(int, data[1:1 + n]))',
        '    res = [0] * n',
        '    stack = []',
        '    for i, t in enumerate(a):',
        '        while stack and a[stack[-1]] < t:',
        '            j = stack.pop()',
        '            res[j] = i - j',
        '        stack.append(i)',
        '    print(" ".join(map(str, res)))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'h-inversions',
    title: { zh: '逆序对计数', en: 'Counting inversions' },
    difficulty: 'hard',
    tags: ['sort', 'recursion', 'c'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '统计满足 i < j 且 a[i] > a[j] 的数对个数。两重循环是 O(n²)，这里要求 O(n log n)：在归并排序合并两个有序段时，右段每取出一个元素，就说明它比左段剩下的所有元素都小，可以一次性把这批逆序对加上去。',
      en: 'Count pairs with i < j and a[i] > a[j]. Two nested loops are O(n²); the target is O(n log n): while merging two sorted runs, each element taken from the right run is smaller than everything left in the left run, so that whole batch of inversions can be added at once.'
    },
    input: { zh: '第一行 n；第二行 n 个整数。', en: 'First line n; second line n integers.' },
    output: { zh: '一个整数：逆序对个数。', en: 'One integer: the number of inversions.' },
    samples: [
      { input: '5\n3 1 4 1 5', output: '3' }
    ],
    tests: [
      { name: '样例', input: '5\n3 1 4 1 5', output: '3' },
      { name: '完全逆序', input: '4\n4 3 2 1', output: '6' },
      { name: '已经有序', input: '4\n1 2 3 4', output: '0' },
      { name: '单个元素', input: '1\n7', output: '0' },
      { name: '混合', input: '6\n2 4 1 3 5 0', output: '8' }
    ],
    hints: [
      { zh: '相等不算逆序对，所以合并时的判断要用 <=。', en: 'Equal values are not inversions, so the merge comparison must use <=.' },
      { zh: '逆序对最多有 n(n-1)/2 个，int 会溢出，计数用 long long。', en: 'Up to n(n-1)/2 inversions overflow an int; count in a long long.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static long long a[MAXN], tmp[MAXN];',
        'static long long inv;',
        '',
        'static void msort(int lo, int hi) {',
        '    /* TODO: 分治排序，合并时统计跨段的逆序对 */',
        '}',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);',
        '    inv = 0;',
        '    msort(0, n);',
        '    printf("%lld\\n", inv);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def sort_count(a):',
        '    # TODO: 归并排序顺便统计逆序对，返回 (有序数组, 逆序对数)',
        '    return sorted(a), 0',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    a = list(map(int, data[1:1 + n]))',
        '    print(sort_count(a)[1])',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static long long a[MAXN], tmp[MAXN];',
        'static long long inv;',
        '',
        'static void msort(int lo, int hi) {',
        '    if (hi - lo < 2) return;',
        '    int mid = lo + (hi - lo) / 2;',
        '    msort(lo, mid);',
        '    msort(mid, hi);',
        '    int i = lo, j = mid, k = lo;',
        '    while (i < mid && j < hi) {',
        '        if (a[i] <= a[j]) {',
        '            tmp[k++] = a[i++];',
        '        } else {',
        '            inv += mid - i;   /* 左段剩下的都比 a[j] 大 */',
        '            tmp[k++] = a[j++];',
        '        }',
        '    }',
        '    while (i < mid) tmp[k++] = a[i++];',
        '    while (j < hi) tmp[k++] = a[j++];',
        '    for (int x = lo; x < hi; x++) a[x] = tmp[x];',
        '}',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);',
        '    inv = 0;',
        '    msort(0, n);',
        '    printf("%lld\\n", inv);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def sort_count(a):',
        '    if len(a) < 2:',
        '        return a, 0',
        '    mid = len(a) // 2',
        '    left, cl = sort_count(a[:mid])',
        '    right, cr = sort_count(a[mid:])',
        '    merged = []',
        '    i = j = 0',
        '    inv = cl + cr',
        '    while i < len(left) and j < len(right):',
        '        if left[i] <= right[j]:',
        '            merged.append(left[i]); i += 1',
        '        else:',
        '            inv += len(left) - i',
        '            merged.append(right[j]); j += 1',
        '    merged.extend(left[i:])',
        '    merged.extend(right[j:])',
        '    return merged, inv',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    a = list(map(int, data[1:1 + n]))',
        '    print(sort_count(a)[1])',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'h-knapsack',
    title: { zh: '0-1 背包', en: '0-1 knapsack' },
    difficulty: 'medium',
    tags: ['dp', 'array', 'c'],
    complexity: { time: 'O(nW)', space: 'O(W)' },
    statement: {
      zh: '有 n 件物品，每件有重量与价值，背包承重 W。每件最多取一次，求能装下的最大总价值。一维滚动数组即可，但容量必须从大到小枚举 —— 否则同一件物品会被重复计入。',
      en: 'There are n items with weights and values and a knapsack of capacity W. Each item may be taken at most once; maximise the total value. A single rolling array suffices, but the capacity loop must run downwards, or the same item gets counted twice.'
    },
    input: { zh: '第一行 n、W；随后 n 行每行两个整数：重量、价值。', en: 'First line n, W; each of the next n lines holds a weight and a value.' },
    output: { zh: '一个整数：最大总价值。', en: 'One integer: the maximum total value.' },
    samples: [
      { input: '3 5\n2 3\n3 4\n4 5', output: '7' }
    ],
    tests: [
      { name: '样例', input: '3 5\n2 3\n3 4\n4 5', output: '7' },
      { name: '单件放得下', input: '1 10\n4 9', output: '9' },
      { name: '只有一件放得下', input: '3 3\n4 10\n5 20\n2 3', output: '3' },
      { name: '容量为零', input: '4 0\n1 5\n2 6\n3 7\n4 8', output: '0' },
      { name: '需要取舍', input: '3 8\n3 5\n4 6\n5 7', output: '12' }
    ],
    hints: [
      { zh: 'dp[j] 表示容量 j 下的最大价值；对每件物品，j 从 W 递减到它的重量。', en: 'dp[j] is the best value at capacity j; for each item iterate j from W down to its weight.' },
      { zh: '容量从小到大枚举，就悄悄变成「每件可取无限次」的完全背包了。', en: 'Iterating the capacity upwards silently turns this into unbounded knapsack.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXW 200005',
        'static long long dp[MAXW];',
        '',
        'int main(void) {',
        '    int n, W;',
        '    if (scanf("%d %d", &n, &W) != 2) return 0;',
        '    for (int i = 0; i < n; i++) {',
        '        int w; long long v;',
        '        scanf("%d %lld", &w, &v);',
        '        /* TODO: 容量从大到小更新 */',
        '    }',
        '    printf("%lld\\n", dp[W]);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0]); W = int(data[1])',
        '    idx = 2',
        '    dp = [0] * (W + 1)',
        '    for _ in range(n):',
        '        w = int(data[idx]); v = int(data[idx + 1]); idx += 2',
        '        # TODO: 容量从大到小更新',
        '        pass',
        '    print(dp[W])',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXW 200005',
        'static long long dp[MAXW];',
        '',
        'int main(void) {',
        '    int n, W;',
        '    if (scanf("%d %d", &n, &W) != 2) return 0;',
        '    for (int i = 0; i < n; i++) {',
        '        int w; long long v;',
        '        scanf("%d %lld", &w, &v);',
        '        for (int j = W; j >= w; j--) {',
        '            if (dp[j - w] + v > dp[j]) dp[j] = dp[j - w] + v;',
        '        }',
        '    }',
        '    printf("%lld\\n", dp[W]);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0]); W = int(data[1])',
        '    idx = 2',
        '    dp = [0] * (W + 1)',
        '    for _ in range(n):',
        '        w = int(data[idx]); v = int(data[idx + 1]); idx += 2',
        '        for j in range(W, w - 1, -1):',
        '            if dp[j - w] + v > dp[j]:',
        '                dp[j] = dp[j - w] + v',
        '    print(dp[W])',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'h-lis',
    title: { zh: '最长递增子序列（O(n log n)）', en: 'Longest increasing subsequence' },
    difficulty: 'hard',
    tags: ['search', 'greedy', 'c'],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    statement: {
      zh: '求最长严格递增子序列的长度。O(n²) 的动规能过小数据，这里要求 O(n log n)：维护数组 tails，tails[k] 表示长度为 k+1 的递增子序列能取到的最小结尾值，每读入一个数就二分替换或追加。',
      en: 'Find the length of the longest strictly increasing subsequence. An O(n²) DP passes small inputs; the target is O(n log n): keep tails where tails[k] is the smallest tail of any increasing subsequence of length k+1, and binary-search to replace or append each value.'
    },
    input: { zh: '第一行 n；第二行 n 个整数。', en: 'First line n; second line n integers.' },
    output: { zh: '一个整数：最长严格递增子序列的长度。', en: 'One integer: the length of the longest strictly increasing subsequence.' },
    samples: [
      { input: '8\n10 9 2 5 3 7 101 18', output: '4' }
    ],
    tests: [
      { name: '样例', input: '8\n10 9 2 5 3 7 101 18', output: '4' },
      { name: '单调递增', input: '5\n1 2 3 4 5', output: '5' },
      { name: '单调递减', input: '5\n5 4 3 2 1', output: '1' },
      { name: '全部相同', input: '6\n2 2 2 2 2 2', output: '1' },
      { name: '交错', input: '6\n0 1 0 3 2 3', output: '4' },
      { name: '单个元素', input: '1\n9', output: '1' }
    ],
    hints: [
      { zh: '要求严格递增，所以二分找的是第一个 ≥ 当前值的位置。', en: 'Strictly increasing means the binary search targets the first entry that is >= the current value.' },
      { zh: 'tails 本身不是一条合法的子序列，它只是每个长度下的最优结尾，所以只能取它的长度。', en: 'tails is not itself a valid subsequence — it stores the best tail per length, so only its length is meaningful.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static long long tails[MAXN];',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    int len = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        long long v;',
        '        scanf("%lld", &v);',
        '        /* TODO: 二分找第一个 >= v 的位置并替换，找不到就追加 */',
        '    }',
        '    printf("%d\\n", len);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys, bisect',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    a = list(map(int, data[1:1 + n]))',
        '    tails = []',
        '    # TODO: 对每个数二分插入到 tails 的合适位置',
        '    print(len(tails))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static long long tails[MAXN];',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    int len = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        long long v;',
        '        scanf("%lld", &v);',
        '        int lo = 0, hi = len;',
        '        while (lo < hi) {',
        '            int mid = (lo + hi) / 2;',
        '            if (tails[mid] < v) lo = mid + 1; else hi = mid;',
        '        }',
        '        tails[lo] = v;',
        '        if (lo == len) len++;',
        '    }',
        '    printf("%d\\n", len);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys, bisect',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0])',
        '    a = list(map(int, data[1:1 + n]))',
        '    tails = []',
        '    for v in a:',
        '        pos = bisect.bisect_left(tails, v)',
        '        if pos == len(tails):',
        '            tails.append(v)',
        '        else:',
        '            tails[pos] = v',
        '    print(len(tails))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'h-dsu-components',
    title: { zh: '并查集：连通块数量', en: 'Union-find: connected components' },
    difficulty: 'medium',
    tags: ['graph', 'array', 'c'],
    complexity: { time: 'O((n+m)·α(n))', space: 'O(n)' },
    statement: {
      zh: '给定 n 个点（编号 0 到 n-1）与 m 条无向边，求连通块个数。初始时每个点自成一类，连通块数为 n；每合并两个不同的集合，这个数就减一。路径压缩让后续查询接近常数时间。',
      en: 'Given n vertices (0 to n-1) and m undirected edges, count the connected components. Each vertex starts as its own set, so the count starts at n, and every merge of two distinct sets decrements it. Path compression makes later queries near constant.'
    },
    input: { zh: '第一行 n、m；随后 m 行每行两个整数 u、v。', en: 'First line n, m; each of the next m lines holds u and v.' },
    output: { zh: '一个整数：连通块个数。', en: 'One integer: the number of connected components.' },
    samples: [
      { input: '5 3\n0 1\n1 2\n3 4', output: '2' }
    ],
    tests: [
      { name: '样例', input: '5 3\n0 1\n1 2\n3 4', output: '2' },
      { name: '没有边', input: '4 0', output: '4' },
      { name: '三角形', input: '3 3\n0 1\n1 2\n0 2', output: '1' },
      { name: '重复边不重复计数', input: '6 2\n0 5\n5 0', output: '5' },
      { name: '两个点一条边', input: '2 1\n0 1', output: '1' }
    ],
    hints: [
      { zh: '只有两个端点的根不同时才合并并让计数减一，重复的边自然被忽略。', en: 'Merge and decrement only when the two roots differ; duplicate edges then take care of themselves.' },
      { zh: '按大小（或秩）合并能让树更扁，配合路径压缩几乎是常数时间。', en: 'Union by size or rank keeps the trees flat; with path compression the cost is near constant.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static int parent[MAXN], sz[MAXN];',
        '',
        'static int find(int x) {',
        '    /* TODO: 路径压缩 */',
        '    return x;',
        '}',
        '',
        'int main(void) {',
        '    int n, m;',
        '    if (scanf("%d %d", &n, &m) != 2) return 0;',
        '    for (int i = 0; i < n; i++) { parent[i] = i; sz[i] = 1; }',
        '    int blocks = n;',
        '    for (int i = 0; i < m; i++) {',
        '        int u, v;',
        '        scanf("%d %d", &u, &v);',
        '        /* TODO: 根不同则合并，并把 blocks 减一 */',
        '    }',
        '    printf("%d\\n", blocks);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0]); m = int(data[1])',
        '    parent = list(range(n))',
        '    def find(x):',
        '        # TODO: 路径压缩',
        '        return x',
        '    blocks = n',
        '    idx = 2',
        '    for _ in range(m):',
        '        u = int(data[idx]); v = int(data[idx + 1]); idx += 2',
        '        # TODO: 合并',
        '        pass',
        '    print(blocks)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        '#define MAXN 200005',
        'static int parent[MAXN], sz[MAXN];',
        '',
        'static int find(int x) {',
        '    while (parent[x] != x) {',
        '        parent[x] = parent[parent[x]];   /* 顺手指向祖父，边走边压扁 */',
        '        x = parent[x];',
        '    }',
        '    return x;',
        '}',
        '',
        'int main(void) {',
        '    int n, m;',
        '    if (scanf("%d %d", &n, &m) != 2) return 0;',
        '    for (int i = 0; i < n; i++) { parent[i] = i; sz[i] = 1; }',
        '    int blocks = n;',
        '    for (int i = 0; i < m; i++) {',
        '        int u, v;',
        '        scanf("%d %d", &u, &v);',
        '        int ru = find(u), rv = find(v);',
        '        if (ru == rv) continue;',
        '        if (sz[ru] < sz[rv]) { int t = ru; ru = rv; rv = t; }',
        '        parent[rv] = ru;',
        '        sz[ru] += sz[rv];',
        '        blocks--;',
        '    }',
        '    printf("%d\\n", blocks);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    data = sys.stdin.read().split()',
        '    n = int(data[0]); m = int(data[1])',
        '    parent = list(range(n))',
        '    size = [1] * n',
        '',
        '    def find(x):',
        '        while parent[x] != x:',
        '            parent[x] = parent[parent[x]]',
        '            x = parent[x]',
        '        return x',
        '',
        '    blocks = n',
        '    idx = 2',
        '    for _ in range(m):',
        '        u = int(data[idx]); v = int(data[idx + 1]); idx += 2',
        '        ru, rv = find(u), find(v)',
        '        if ru == rv:',
        '            continue',
        '        if size[ru] < size[rv]:',
        '            ru, rv = rv, ru',
        '        parent[rv] = ru',
        '        size[ru] += size[rv]',
        '        blocks -= 1',
        '    print(blocks)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'h-fast-pow',
    title: { zh: '快速幂取模', en: 'Modular exponentiation' },
    difficulty: 'hard',
    tags: ['math', 'recursion', 'c'],
    complexity: { time: 'O(log b)', space: 'O(1)' },
    statement: {
      zh: '计算 a^b mod m，指数 b 可以大到 10^18，逐次相乘不可能。做法是把指数写成二进制：每一步把底数平方，遇到为 1 的位就乘进答案，共 O(log b) 次乘法；每一步都取模，中间结果就不会溢出。',
      en: 'Compute a^b mod m where b can reach 10^18, so repeated multiplication is out of the question. Read the exponent in binary: square the base each step and multiply into the answer whenever the bit is set, giving O(log b) multiplications, with a modulus taken every step so nothing overflows.'
    },
    input: { zh: '一行三个整数 a、b、m（0 ≤ a < 2^31，0 ≤ b ≤ 10^18，1 ≤ m < 2^31）。', en: 'One line with a, b, m (0 ≤ a < 2^31, 0 ≤ b ≤ 10^18, 1 ≤ m < 2^31).' },
    output: { zh: '一个整数：a^b mod m。', en: 'One integer: a^b mod m.' },
    samples: [
      { input: '2 10 1000', output: '24' }
    ],
    tests: [
      { name: '样例', input: '2 10 1000', output: '24' },
      { name: '指数为零', input: '3 0 7', output: '1' },
      { name: '底数为零', input: '0 5 13', output: '0' },
      { name: '模数为一', input: '10 0 1', output: '0' },
      { name: '普通情况', input: '5 13 1000', output: '125' },
      { name: '费马小定理可用', input: '7 100 13', output: '9' }
    ],
    hints: [
      { zh: '初始值是 1 mod m，不是 1：m=1 时一切结果为 0。', en: 'Start from 1 mod m, not from 1: with m = 1 every result is 0.' },
      { zh: 'a*a 在 a < 2^31 时仍能放进 64 位整数。', en: 'With a < 2^31 the square still fits in a 64-bit integer.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        'static long long modpow(long long a, long long b, long long m) {',
        '    /* TODO: 二进制快速幂，每步取模 */',
        '    return 0;',
        '}',
        '',
        'int main(void) {',
        '    long long a, b, m;',
        '    if (scanf("%lld %lld %lld", &a, &b, &m) != 3) return 0;',
        '    printf("%lld\\n", modpow(a, b, m));',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    a, b, m = map(int, sys.stdin.read().split())',
        '    # TODO: 快速幂取模（可以先用内置的 pow(a, b, m) 对照答案）',
        '    print(0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        'static long long modpow(long long a, long long b, long long m) {',
        '    long long result = 1 % m;',
        '    a %= m;',
        '    while (b > 0) {',
        '        if (b & 1LL) result = result * a % m;',
        '        a = a * a % m;',
        '        b >>= 1;',
        '    }',
        '    return result;',
        '}',
        '',
        'int main(void) {',
        '    long long a, b, m;',
        '    if (scanf("%lld %lld %lld", &a, &b, &m) != 3) return 0;',
        '    printf("%lld\\n", modpow(a, b, m));',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    a, b, m = map(int, sys.stdin.read().split())',
        '    print(pow(a, b, m))',
        '',
        'main()'
      ].join('\n')
    }
  }
]);

/* ------------------------------------------------------------
   题目顺序：按难度从易到难。
   sort 在现代浏览器里是稳定排序，同一难度内保持原有编排顺序，
   所以每一条「学习路径」内部的先后不会被前面的排序打乱。
   ------------------------------------------------------------ */
(function () {
  var rank = { easy: 0, medium: 1, hard: 2 };
  window.LHT_PROBLEMS.sort(function (a, b) {
    return (rank[a.difficulty] || 0) - (rank[b.difficulty] || 0);
  });
})();
