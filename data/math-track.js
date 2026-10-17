/* ============================================================
   math-track.js — 数学专项（线性代数 + 微积分）

   主题结构参照常见的线代与微积分课程顺序：行列式、矩阵乘法、
   向量几何、消元、求导、数值积分。题目与数据均为原创，
   公式用公开的标准定义，没有复制任何教材正文或习题。
   ============================================================ */

window.LHT_PROBLEMS = window.LHT_PROBLEMS.concat([
  {
    id: 'm-determinant',
    title: { zh: '三阶行列式', en: '3×3 determinant' },
    difficulty: 'easy',
    tags: ['math', 'linalg', 'array'],
    complexity: { time: 'O(1)', space: 'O(1)' },
    statement: {
      zh: '给定 3×3 矩阵的九个元素（按行读入），计算它的行列式。行列式的绝对值等于这个变换把单位立方体的体积放大或缩小的倍数，符号表示是否翻转了方向。按第一行展开即可。',
      en: 'Read the nine entries of a 3×3 matrix row by row and compute its determinant. Its absolute value is how much the transformation scales volume, and its sign tells you whether orientation is flipped. Expanding along the first row is enough.'
    },
    input: { zh: '三行，每行三个整数。', en: 'Three lines of three integers each.' },
    output: { zh: '一个整数：行列式。', en: 'One integer: the determinant.' },
    samples: [
      { input: '1 2 3\n4 5 6\n7 8 10', output: '-3' }
    ],
    tests: [
      { name: '样例', input: '1 2 3\n4 5 6\n7 8 10', output: '-3' },
      { name: '单位矩阵', input: '1 0 0\n0 1 0\n0 0 1', output: '1' },
      { name: '一行成比例即奇异', input: '1 2 3\n2 4 6\n0 1 1', output: '0' },
      { name: '对角矩阵', input: '2 0 0\n0 3 0\n0 0 4', output: '24' },
      { name: '含负数', input: '0 -1 2\n3 1 0\n-2 1 1', output: '13' }
    ],
    hints: [
      { zh: '按第一行展开：a11·M11 − a12·M12 + a13·M13，正负号交替。', en: 'Expand along the first row: a11·M11 − a12·M12 + a13·M13, with alternating signs.' },
      { zh: '如果两行成比例，行列式一定是 0 —— 可以用它自查。', en: 'If two rows are proportional the determinant is 0 — a useful sanity check.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    long long m[3][3];',
        '    for (int i = 0; i < 3; i++)',
        '        for (int j = 0; j < 3; j++) scanf("%lld", &m[i][j]);',
        '    /* TODO: 按第一行展开计算行列式 */',
        '    printf("0\\n");',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    v = list(map(int, sys.stdin.read().split()))',
        '    m = [v[0:3], v[3:6], v[6:9]]',
        '    # TODO: 按第一行展开',
        '    print(0)',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    long long m[3][3];',
        '    for (int i = 0; i < 3; i++)',
        '        for (int j = 0; j < 3; j++) scanf("%lld", &m[i][j]);',
        '    long long det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])',
        '                  - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])',
        '                  + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);',
        '    printf("%lld\\n", det);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    v = list(map(int, sys.stdin.read().split()))',
        '    a, b, c, d, e, f, g, h, i = v',
        '    det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)',
        '    print(det)',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'm-matrix-mul',
    title: { zh: '矩阵乘法', en: 'Matrix multiplication' },
    difficulty: 'medium',
    tags: ['math', 'linalg', 'array'],
    complexity: { time: 'O(n³)', space: 'O(n²)' },
    statement: {
      zh: '给定两个 n×n 矩阵 A、B，输出它们的乘积 C = A·B，其中 C[i][j] = Σ_k A[i][k]·B[k][j]。注意乘法不满足交换律：A·B 与 B·A 通常不一样，这也是它「复合变换」含义的来源。',
      en: 'Given two n×n matrices A and B, output C = A·B with C[i][j] = Σ_k A[i][k]·B[k][j]. Multiplication is not commutative — A·B and B·A usually differ — which is exactly what makes it a composition of transformations.'
    },
    input: { zh: '第一行 n；随后 n 行 A；再随后 n 行 B。', en: 'First line n; then n rows of A; then n rows of B.' },
    output: { zh: 'n 行，每行 n 个整数。', en: 'n lines of n integers.' },
    samples: [
      { input: '2\n1 2\n3 4\n5 6\n7 8', output: '19 22\n43 50' }
    ],
    tests: [
      { name: '样例', input: '2\n1 2\n3 4\n5 6\n7 8', output: '19 22\n43 50' },
      { name: '与单位矩阵相乘', input: '2\n1 2\n3 4\n1 0\n0 1', output: '1 2\n3 4' },
      { name: '1×1 退化情况', input: '1\n5\n7', output: '35' },
      { name: '含负数', input: '2\n1 -2\n3 0\n-1 4\n2 5', output: '-5 -6\n-3 12' }
    ],
    hints: [
      { zh: '三层循环：外层定行 i，中层定列 j，内层累加 k。', en: 'Three loops: i over rows, j over columns, k accumulating the dot product.' },
      { zh: '结果矩阵的元素可能比输入大得多，用 long long 存比较稳妥。', en: 'Entries can grow quickly; long long is the safer choice.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    long long a[64][64], b[64][64];',
        '    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) scanf("%lld", &a[i][j]);',
        '    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) scanf("%lld", &b[i][j]);',
        '    for (int i = 0; i < n; i++) {',
        '        for (int j = 0; j < n; j++) {',
        '            /* TODO: 累加 Σ_k a[i][k] * b[k][j] */',
        '            if (j) putchar(\' \');',
        '            printf("0");',
        '        }',
        '        putchar(\'\\n\');',
        '    }',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    v = list(map(int, sys.stdin.read().split()))',
        '    n = v[0]',
        '    p = 1',
        '    a = [v[p + i * n:p + (i + 1) * n] for i in range(n)]; p += n * n',
        '    b = [v[p + i * n:p + (i + 1) * n] for i in range(n)]',
        '    # TODO: 计算 A·B 并逐行输出',
        '    for i in range(n):',
        '        print(" ".join(["0"] * n))',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    long long a[64][64], b[64][64];',
        '    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) scanf("%lld", &a[i][j]);',
        '    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) scanf("%lld", &b[i][j]);',
        '    for (int i = 0; i < n; i++) {',
        '        for (int j = 0; j < n; j++) {',
        '            long long sum = 0;',
        '            for (int k = 0; k < n; k++) sum += a[i][k] * b[k][j];',
        '            if (j) putchar(\' \');',
        '            printf("%lld", sum);',
        '        }',
        '        putchar(\'\\n\');',
        '    }',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    v = list(map(int, sys.stdin.read().split()))',
        '    n = v[0]',
        '    p = 1',
        '    a = [v[p + i * n:p + (i + 1) * n] for i in range(n)]; p += n * n',
        '    b = [v[p + i * n:p + (i + 1) * n] for i in range(n)]',
        '    for i in range(n):',
        '        row = [sum(a[i][k] * b[k][j] for k in range(n)) for j in range(n)]',
        '        print(" ".join(map(str, row)))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'm-dot-angle',
    title: { zh: '点积与夹角', en: 'Dot product and angle' },
    difficulty: 'easy',
    tags: ['math', 'linalg'],
    complexity: { time: 'O(1)', space: 'O(1)' },
    statement: {
      zh: '给定两个三维向量，输出点积、两个向量的长度、以及它们的夹角（弧度，取 [0, π]）。关系式是 a·b = |a||b|cosθ；夹角用反余弦求出。零向量没有方向，约定夹角为 0。',
      en: 'Given two 3-D vectors, print their dot product, both lengths, and the angle between them in radians within [0, π]. Use a·b = |a||b|cosθ. A zero vector has no direction, so the angle is defined as 0.'
    },
    input: { zh: '两行，每行三个实数（向量 a 与 b）。', en: 'Two lines of three reals (vectors a and b).' },
    output: { zh: '一行四个数：点积、|a|、|b|、夹角，各 4 位小数。', en: 'One line with the dot product, |a|, |b| and the angle, four decimals each.' },
    samples: [
      { input: '1 0 0\n0 1 0', output: '0.0000 1.0000 1.0000 1.5708' }
    ],
    tests: [
      { name: '样例 · 正交', input: '1 0 0\n0 1 0', output: '0.0000 1.0000 1.0000 1.5708' },
      { name: '同向', input: '1 2 2\n2 4 4', output: '18.0000 3.0000 6.0000 0.0000' },
      { name: '反向', input: '1 0 0\n-1 0 0', output: '-1.0000 1.0000 1.0000 3.1416' },
      { name: '含零向量', input: '0 0 0\n1 2 3', output: '0.0000 0.0000 3.7417 0.0000' }
    ],
    hints: [
      { zh: '先算 |a| 与 |b|，再用 dot / (|a||b|) 得到 cosθ，最后 acos。', en: 'Compute both lengths, form dot/(|a||b|), then take acos.' },
      { zh: '浮点误差可能让 cosθ 略大于 1 或小于 -1，直接 acos 会得到 NaN，要先夹到区间内。', en: 'Rounding can push cosθ slightly outside [-1,1] and acos then returns NaN, so clamp it first.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '#include <math.h>',
        '',
        'int main(void) {',
        '    double a[3], b[3];',
        '    for (int i = 0; i < 3; i++) scanf("%lf", &a[i]);',
        '    for (int i = 0; i < 3; i++) scanf("%lf", &b[i]);',
        '    /* TODO: 点积、两个长度、夹角（记得把 cos 值夹到 [-1,1]） */',
        '    printf("0.0000 1.0000 1.0000 0.0000\\n");',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    v = list(map(float, sys.stdin.read().split()))',
        '    a, b = v[0:3], v[3:6]',
        '    # TODO: 点积、长度、夹角',
        '    print("0.0000 1.0000 1.0000 0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '#include <math.h>',
        '',
        'int main(void) {',
        '    double a[3], b[3];',
        '    for (int i = 0; i < 3; i++) scanf("%lf", &a[i]);',
        '    for (int i = 0; i < 3; i++) scanf("%lf", &b[i]);',
        '    double dot = 0, la = 0, lb = 0;',
        '    for (int i = 0; i < 3; i++) {',
        '        dot += a[i] * b[i];',
        '        la += a[i] * a[i];',
        '        lb += b[i] * b[i];',
        '    }',
        '    la = sqrt(la);',
        '    lb = sqrt(lb);',
        '    double angle = 0;',
        '    if (la > 0 && lb > 0) {',
        '        double c = dot / (la * lb);',
        '        if (c > 1) c = 1;',
        '        if (c < -1) c = -1;',
        '        angle = acos(c);',
        '    }',
        '    printf("%.4f %.4f %.4f %.4f\\n", dot, la, lb, angle);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    v = list(map(float, sys.stdin.read().split()))',
        '    a, b = v[0:3], v[3:6]',
        '    dot = sum(x * y for x, y in zip(a, b))',
        '    la = math.sqrt(sum(x * x for x in a))',
        '    lb = math.sqrt(sum(x * x for x in b))',
        '    angle = 0.0',
        '    if la > 0 and lb > 0:',
        '        c = max(-1.0, min(1.0, dot / (la * lb)))',
        '        angle = math.acos(c)',
        '    print("%.4f %.4f %.4f %.4f" % (dot, la, lb, angle))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'm-gauss',
    title: { zh: '高斯消元求解', en: 'Gaussian elimination' },
    difficulty: 'medium',
    tags: ['math', 'linalg', 'array'],
    complexity: { time: 'O(n³)', space: 'O(n²)' },
    statement: {
      zh: '给定一个 n 元线性方程组的增广矩阵，用高斯消元法求解。若系数矩阵奇异（无法得到唯一解），输出 none。测试用例保证非奇异时解是唯一的。',
      en: 'Given the augmented matrix of an n-variable linear system, solve it by Gaussian elimination. If the coefficient matrix is singular (no unique solution), print none. Tests guarantee a unique solution when the matrix is nonsingular.'
    },
    input: { zh: '第一行 n；随后 n 行，每行 n+1 个数（前 n 个是系数，最后一个是右端项）。', en: 'First line n; then n lines of n+1 numbers (n coefficients followed by the right-hand side).' },
    output: { zh: '一行 n 个数：解，各 4 位小数；奇异时输出 none。', en: 'One line with the n solutions to four decimals, or none if singular.' },
    samples: [
      { input: '2\n1 1 3\n2 -1 0', output: '1.0000 2.0000' }
    ],
    tests: [
      { name: '样例', input: '2\n1 1 3\n2 -1 0', output: '1.0000 2.0000' },
      { name: '对角方程组', input: '3\n2 0 0 4\n0 5 0 10\n0 0 4 8', output: '2.0000 2.0000 2.0000' },
      { name: '需要换行', input: '2\n0 1 2\n1 0 3', output: '3.0000 2.0000' },
      { name: '奇异矩阵', input: '2\n1 2 3\n2 4 6', output: 'none' },
      { name: '非整数解', input: '2\n2 1 5\n1 3 10', output: '1.0000 3.0000' }
    ],
    hints: [
      { zh: '选主元时挑当前列绝对值最大的行，可以减少舍入误差；本题数据温和，任选非零行也可以。', en: 'Picking the row with the largest absolute pivot reduces rounding error; the data here is gentle enough that any nonzero pivot works.' },
      { zh: '回代从最后一行开始，把已知的解代回上一行。', en: 'Back-substitute from the last row upwards.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '#include <math.h>',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    double m[64][65];',
        '    for (int i = 0; i < n; i++)',
        '        for (int j = 0; j <= n; j++) scanf("%lf", &m[i][j]);',
        '    /* TODO: 前向消元 + 回代；主元为 0 时说明奇异 */',
        '    printf("none\\n");',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    v = list(map(float, sys.stdin.read().split()))',
        '    n = int(v[0])',
        '    p = 1',
        '    m = [v[p + i * (n + 1):p + (i + 1) * (n + 1)] for i in range(n)]',
        '    # TODO: 前向消元 + 回代',
        '    print("none")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '#include <math.h>',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    double m[64][65];',
        '    for (int i = 0; i < n; i++)',
        '        for (int j = 0; j <= n; j++) scanf("%lf", &m[i][j]);',
        '',
        '    for (int col = 0; col < n; col++) {',
        '        int pivot = col;',
        '        for (int r = col + 1; r < n; r++)',
        '            if (fabs(m[r][col]) > fabs(m[pivot][col])) pivot = r;',
        '        if (fabs(m[pivot][col]) < 1e-12) { puts("none"); return 0; }',
        '        if (pivot != col) {',
        '            for (int j = col; j <= n; j++) {',
        '                double t = m[col][j]; m[col][j] = m[pivot][j]; m[pivot][j] = t;',
        '            }',
        '        }',
        '        for (int r = col + 1; r < n; r++) {',
        '            double f = m[r][col] / m[col][col];',
        '            for (int j = col; j <= n; j++) m[r][j] -= f * m[col][j];',
        '        }',
        '    }',
        '    double x[64];',
        '    for (int i = n - 1; i >= 0; i--) {',
        '        double s = m[i][n];',
        '        for (int j = i + 1; j < n; j++) s -= m[i][j] * x[j];',
        '        x[i] = s / m[i][i];',
        '    }',
        '    for (int i = 0; i < n; i++) {',
        '        if (i) putchar(\' \');',
        '        printf("%.4f", x[i]);',
        '    }',
        '    putchar(\'\\n\');',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys, math',
        '',
        'def main():',
        '    v = list(map(float, sys.stdin.read().split()))',
        '    n = int(v[0])',
        '    p = 1',
        '    m = [v[p + i * (n + 1):p + (i + 1) * (n + 1)] for i in range(n)]',
        '',
        '    for col in range(n):',
        '        pivot = max(range(col, n), key=lambda r: abs(m[r][col]))',
        '        if abs(m[pivot][col]) < 1e-12:',
        '            print("none")',
        '            return',
        '        if pivot != col:',
        '            m[col], m[pivot] = m[pivot], m[col]',
        '        for r in range(col + 1, n):',
        '            f = m[r][col] / m[col][col]',
        '            for j in range(col, n + 1):',
        '                m[r][j] -= f * m[col][j]',
        '',
        '    x = [0.0] * n',
        '    for i in range(n - 1, -1, -1):',
        '        s = m[i][n] - sum(m[i][j] * x[j] for j in range(i + 1, n))',
        '        x[i] = s / m[i][i]',
        '    print(" ".join("%.4f" % t for t in x))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'm-derivative',
    title: { zh: '多项式求导', en: 'Polynomial derivative' },
    difficulty: 'easy',
    tags: ['math', 'calculus', 'array'],
    complexity: { time: 'O(n)', space: 'O(n)' },
    statement: {
      zh: '给定一个 n 次多项式（按从高次到低次的顺序给出 n+1 个系数），输出它的导数多项式的系数。规则只有一条：x^k 的导数是 k·x^(k−1)，常数项求导为 0。',
      en: 'Given a degree-n polynomial (n+1 coefficients from the highest power down), print the coefficients of its derivative. The only rule needed: the derivative of x^k is k·x^(k−1), and constants differentiate to 0.'
    },
    input: { zh: '第一行 n；第二行 n+1 个实数系数（高次在前）。', en: 'First line n; second line n+1 real coefficients, highest power first.' },
    output: { zh: '一行 n 个数：导数系数（高次在前），各 4 位小数。', en: 'One line of n numbers: derivative coefficients (highest power first), four decimals each.' },
    samples: [
      { input: '3\n2 0 -3 1', output: '6.0000 0.0000 -3.0000' }
    ],
    tests: [
      { name: '样例 · 三次多项式', input: '3\n2 0 -3 1', output: '6.0000 0.0000 -3.0000' },
      { name: '一次函数', input: '1\n5 7', output: '5.0000' },
      { name: '常数', input: '0\n42', output: '' },
      { name: '负系数', input: '2\n-1 4 -2', output: '-2.0000 4.0000' },
      { name: '四次多项式', input: '4\n1 -2 0 3 -4', output: '4.0000 -6.0000 0.0000 3.0000' }
    ],
    hints: [
      { zh: '系数个数是 n+1，求导后是 n 个；最高次项 x^n 的导数系数是 n·a_n。', en: 'There are n+1 coefficients and n after differentiating; the leading term x^n contributes n·a_n.' },
      { zh: '常数项的导数是空行（没有输出），别硬凑一个 0。', en: 'A constant differentiates to an empty line — do not print a stray 0.' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    double c[128];',
        '    for (int i = 0; i <= n; i++) scanf("%lf", &c[i]);',
        '    /* TODO: 第 i 个系数（对应 x^(n-i)）乘上它的指数 */',
        '    putchar(\'\\n\');',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    v = list(map(float, sys.stdin.read().split()))',
        '    n = int(v[0])',
        '    c = v[1:1 + n + 1]',
        '    # TODO: 求导并按要求格式输出',
        '    print("")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    int n;',
        '    if (scanf("%d", &n) != 1) return 0;',
        '    double c[128];',
        '    for (int i = 0; i <= n; i++) scanf("%lf", &c[i]);',
        '    for (int i = 0; i < n; i++) {',
        '        if (i) putchar(\' \');',
        '        printf("%.4f", c[i] * (double)(n - i));',
        '    }',
        '    putchar(\'\\n\');',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    v = list(map(float, sys.stdin.read().split()))',
        '    n = int(v[0])',
        '    c = v[1:1 + n + 1]',
        '    out = [c[i] * (n - i) for i in range(n)]',
        '    print(" ".join("%.4f" % x for x in out))',
        '',
        'main()'
      ].join('\n')
    }
  },

  {
    id: 'm-trapezoid',
    title: { zh: '梯形法数值积分', en: 'Trapezoidal integration' },
    difficulty: 'medium',
    tags: ['math', 'calculus', 'array'],
    complexity: { time: 'O(n)', space: 'O(1)' },
    statement: {
      zh: '用梯形法计算 f(x) = x² 在区间 [a, b] 上的定积分：把区间等分成 n 份，每份用梯形近似，累加得到近似值。n 越大结果越接近精确值 (b³−a³)/3。',
      en: 'Approximate the integral of f(x) = x² over [a, b] with the trapezoidal rule: split the interval into n equal parts and sum the trapezoids. As n grows the result approaches the exact value (b³−a³)/3.'
    },
    input: { zh: '一行三个数：a、b、n（n 为正整数）。', en: 'One line with a, b and n (n a positive integer).' },
    output: { zh: '一个数：近似积分值，4 位小数。', en: 'One number: the approximate integral, four decimals.' },
    samples: [
      { input: '0 1 2', output: '0.3750' }
    ],
    tests: [
      { name: '样例 · 两段', input: '0 1 2', output: '0.3750' },
      { name: '更细的划分', input: '0 1 4', output: '0.3438' },
      { name: '负区间边界', input: '1 3 2', output: '9.0000' },
      { name: '跨过零点', input: '-1 1 4', output: '0.7500' }
    ],
    hints: [
      { zh: 'h = (b−a)/n，梯形面积 = h·(f(x_i)+f(x_{i+1}))/2。', en: 'With h = (b−a)/n a single trapezoid is h·(f(x_i)+f(x_{i+1}))/2.' },
      { zh: '首尾两个端点各出现一次，中间的点被左右两个梯形各用一次，可以合并成 h·(f(a)/2 + Σf(x_i) + f(b)/2)。', en: 'The endpoints appear once and interior points twice, giving h·(f(a)/2 + Σf(x_i) + f(b)/2).' }
    ],
    templates: {
      c: [
        '#include <stdio.h>',
        '',
        'int main(void) {',
        '    double a, b;',
        '    int n;',
        '    if (scanf("%lf %lf %d", &a, &b, &n) != 3) return 0;',
        '    /* TODO: h = (b-a)/n，累加每个梯形 */',
        '    printf("0.0000\\n");',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    a, b, n = map(float, sys.stdin.read().split())',
        '    n = int(n)',
        '    # TODO: 梯形法累加',
        '    print("0.0000")',
        '',
        'main()'
      ].join('\n')
    },
    solutions: {
      c: [
        '#include <stdio.h>',
        '',
        'static double f(double x) { return x * x; }',
        '',
        'int main(void) {',
        '    double a, b;',
        '    int n;',
        '    if (scanf("%lf %lf %d", &a, &b, &n) != 3) return 0;',
        '    double h = (b - a) / n;',
        '    double sum = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        double x0 = a + i * h;',
        '        double x1 = x0 + h;',
        '        sum += (f(x0) + f(x1)) * h / 2.0;',
        '    }',
        '    printf("%.4f\\n", sum);',
        '    return 0;',
        '}'
      ].join('\n'),
      py: [
        'import sys',
        '',
        'def main():',
        '    a, b, n = map(float, sys.stdin.read().split())',
        '    n = int(n)',
        '    h = (b - a) / n',
        '    total = 0.0',
        '    for i in range(n):',
        '        x0 = a + i * h',
        '        x1 = x0 + h',
        '        total += (x0 * x0 + x1 * x1) * h / 2',
        '    print("%.4f" % total)',
        '',
        'main()'
      ].join('\n')
    }
  }
]);

/* 新增的数学题同样按易到难归位（sort 稳定，同难度内保持原顺序） */
(function () {
  var rank = { easy: 0, medium: 1, hard: 2 };
  window.LHT_PROBLEMS.sort(function (a, b) {
    return (rank[a.difficulty] || 0) - (rank[b.difficulty] || 0);
  });
})();
