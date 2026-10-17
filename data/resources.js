/* ============================================================
   resources.js — 算法与 AI 资料索引
   type: course 课程 | book 书 | paper 论文 | article 文章 / 文档
         practice 练习场 | tool 工具 | video 视频 | list 合集
   level: 1 入门 | 2 进阶 | 3 深入
   lang:  zh 中文 | en 英文 | both 双语
   ============================================================ */

window.LHT_RES_CATEGORIES = [
  { id: 'fundamentals', label: { zh: '算法与数据结构', en: 'Algorithms & data structures' } },
  { id: 'advanced',     label: { zh: '进阶与竞赛',     en: 'Advanced & competitive' } },
  { id: 'practice',     label: { zh: '在线练习场',     en: 'Practice arenas' } },
  { id: 'visual',       label: { zh: '可视化与直觉',   en: 'Visualisation & intuition' } },
  { id: 'math',         label: { zh: '数学基础',       en: 'Mathematics' } },
  { id: 'ml',           label: { zh: '机器学习',       en: 'Machine learning' } },
  { id: 'dl',           label: { zh: '深度学习',       en: 'Deep learning' } },
  { id: 'llm',          label: { zh: 'NLP 与大模型',   en: 'NLP & large models' } },
  { id: 'rl',           label: { zh: '强化学习',       en: 'Reinforcement learning' } },
  { id: 'tools',        label: { zh: '工程与工具',     en: 'Engineering & tools' } },
  { id: 'papers',       label: { zh: '经典论文',       en: 'Landmark papers' } }
];

window.LHT_RES_TYPES = {
  course:   { zh: '课程',   en: 'Course' },
  book:     { zh: '书',     en: 'Book' },
  paper:    { zh: '论文',   en: 'Paper' },
  article:  { zh: '文章',   en: 'Article' },
  practice: { zh: '练习场', en: 'Arena' },
  tool:     { zh: '工具',   en: 'Tool' },
  video:    { zh: '视频',   en: 'Video' },
  list:     { zh: '合集',   en: 'Collection' }
};

window.LHT_RESOURCES = [
  /* ---------- 算法与数据结构 ---------- */
  {
    id: 'hello-algo',
    title: { zh: 'Hello 算法', en: 'Hello Algo' },
    author: '靳宇栋（krahets）',
    cat: 'fundamentals', type: 'book', level: 1, lang: 'both', free: true,
    url: 'https://www.hello-algo.com/',
    note: {
      zh: '带动画和可运行代码的入门书，从数据结构讲到动态规划，代码覆盖十多种语言，中英双语，适合当作第一本系统材料。',
      en: 'An introductory book with animations and runnable code, from data structures through dynamic programming, in a dozen languages and both Chinese and English. A good first systematic read.'
    },
    tags: ['入门', '双语', '动画']
  },
  {
    id: 'oi-wiki',
    title: { zh: 'OI Wiki', en: 'OI Wiki' },
    author: '开源社区',
    cat: 'fundamentals', type: 'list', level: 2, lang: 'zh', free: true,
    url: 'https://oi-wiki.org/',
    note: {
      zh: '竞赛向百科，从复杂度分析到网络流、计算几何都有，推导与模板齐全。不太适合零基础，最好先有一点编程经验再看。',
      en: 'A competition-oriented encyclopedia spanning complexity analysis, network flow and computational geometry, with full derivations and templates. Not a first text for absolute beginners.'
    },
    tags: ['竞赛', '模板', '百科']
  },
  {
    id: 'cp-algorithms',
    title: { zh: 'cp-algorithms（原 e-maxx）', en: 'cp-algorithms (formerly e-maxx)' },
    author: 'CP Algorithms 社区',
    cat: 'fundamentals', type: 'article', level: 2, lang: 'en', free: true,
    url: 'https://cp-algorithms.com/',
    note: {
      zh: '英文算法百科，每个专题都有推导和可直接用的 C++ 实现。查算法细节时比翻书快，但需要自己判断适用边界。',
      en: 'The English counterpart: every topic comes with a derivation and ready-to-use C++ code. Faster than a textbook when you need one algorithm pinned down.'
    },
    tags: ['竞赛', 'C++', '参考']
  },
  {
    id: 'carl-guide',
    title: { zh: '代码随想录', en: 'Programmercarl' },
    author: '卡尔',
    cat: 'fundamentals', type: 'book', level: 1, lang: 'zh', free: true,
    url: 'https://programmercarl.com/',
    note: {
      zh: '按题型组织的题解体系，数组、链表、二叉树、回溯、贪心、动规各有路线图，适合配合刷题当目录使用。',
      en: 'A solution system organised by pattern — arrays, linked lists, trees, backtracking, greedy, DP — each with its own roadmap. Useful as a syllabus alongside an arena.'
    },
    tags: ['题解', '面试']
  },
  {
    id: 'labuladong',
    title: { zh: 'labuladong 的算法笔记', en: 'labuladong\u2019s algorithm notes' },
    author: 'labuladong',
    cat: 'fundamentals', type: 'book', level: 2, lang: 'zh', free: true,
    url: 'https://labuladong.online/',
    note: {
      zh: '强调模板思维：把二分、滑动窗口、回溯框架抽象成固定套路，对建立解题反射很有帮助。',
      en: 'Built on template thinking: binary search, sliding windows and backtracking reduced to reusable skeletons. Good for building reflexes.'
    },
    tags: ['模板', '刷题']
  },
  {
    id: 'algs4',
    title: { zh: '算法（第 4 版）配套站', en: 'Algorithms, 4th edition' },
    author: 'Sedgewick & Wayne',
    cat: 'fundamentals', type: 'book', level: 2, lang: 'en', free: true,
    url: 'https://algs4.cs.princeton.edu/',
    note: {
      zh: '普林斯顿教材的配套页面，书里每个算法都有可运行示例和测试数据，图示质量很高。',
      en: 'The companion site for the Princeton textbook: runnable examples and test data for every algorithm, with unusually good figures.'
    },
    tags: ['教材', 'Java']
  },
  {
    id: 'mit6006',
    title: { zh: 'MIT 6.006 算法导论', en: 'MIT 6.006 Introduction to Algorithms' },
    author: 'MIT OpenCourseWare',
    cat: 'fundamentals', type: 'course', level: 2, lang: 'en', free: true,
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    note: {
      zh: '完整的本科算法课，含板书、作业与考试。适合想补一遍「为什么这样设计」而不只是背模板的人。',
      en: 'A complete undergraduate course with notes, assignments and exams — for when you want the reasoning behind a design rather than a template.'
    },
    tags: ['公开课', '理论']
  },
  {
    id: 'cs50',
    title: { zh: 'CS50 计算机科学导论', en: 'CS50: Introduction to Computer Science' },
    author: 'Harvard University',
    cat: 'fundamentals', type: 'course', level: 1, lang: 'both', free: true,
    url: 'https://cs50.harvard.edu/x/',
    note: {
      zh: '从 C 讲到 Python、SQL 和 JavaScript 的入门课，作业质量高但量也大。',
      en: 'An introduction running from C through Python, SQL and JavaScript; the problem sets are excellent and demanding.'
    },
    tags: ['入门', '公开课']
  },
  {
    id: 'bigocheatsheet',
    title: { zh: '复杂度速查表', en: 'Big-O Cheat Sheet' },
    author: 'Eric Rowell',
    cat: 'fundamentals', type: 'article', level: 1, lang: 'en', free: true,
    url: 'https://www.bigocheatsheet.com/',
    note: {
      zh: '一页看完常见数据结构和排序算法的时间与空间复杂度，以及各语言的数组操作代价。适合贴在显示器边上。',
      en: 'One page covering the time and space cost of common structures and sorts, plus per-language array operations. Wall-poster material.'
    },
    tags: ['速查', '复杂度']
  },
  {
    id: 'coding-interview-university',
    title: { zh: 'Coding Interview University', en: 'Coding Interview University' },
    author: 'John Washam',
    cat: 'fundamentals', type: 'list', level: 2, lang: 'en', free: true,
    url: 'https://github.com/jwasham/coding-interview-university',
    note: {
      zh: '一份自学计算机基础的完整路线清单，按周排期，含每阶段的读物和作业，适合当作长期计划表。',
      en: 'A multi-month self-study plan for computer science fundamentals, week by week, with readings and exercises per stage.'
    },
    tags: ['路线图', '开源']
  },

  /* ---------- 进阶与竞赛 ---------- */
  {
    id: 'cses',
    title: { zh: 'CSES 问题集', en: 'CSES Problem Set' },
    author: 'CSES',
    cat: 'advanced', type: 'practice', level: 2, lang: 'en', free: true,
    url: 'https://cses.fi/problemset/',
    note: {
      zh: '只有三百来题，但每道都精心设计，从入门到高阶分区明确。刷完整个集合是很多人公认的里程碑。',
      en: 'Only about three hundred problems, all carefully designed and grouped by difficulty. Finishing the set is a widely recognised milestone.'
    },
    tags: ['竞赛', '系统训练']
  },
  {
    id: 'usaco-guide',
    title: { zh: 'USACO Guide', en: 'USACO Guide' },
    author: 'USACO Guide 团队',
    cat: 'advanced', type: 'course', level: 2, lang: 'en', free: true,
    url: 'https://usaco.guide/',
    note: {
      zh: '把竞赛知识点按难度分成青铜到白金四档，每个知识点都给出先修、例题和练习，是目前结构最好的竞赛路线。',
      en: 'Splits competition topics into four tiers from Bronze to Platinum, each with prerequisites, worked examples and practice. The clearest competitive roadmap available.'
    },
    tags: ['竞赛', '路线图']
  },
  {
    id: 'cpbook',
    title: { zh: 'Competitive Programming（CP4）', en: 'Competitive Programming (CP4)' },
    author: 'Halim & Halim',
    cat: 'advanced', type: 'book', level: 3, lang: 'en', free: true,
    url: 'https://cpbook.net/',
    note: {
      zh: '竞赛手册，把常用算法压缩成可背诵的骨架，配大量题目索引。当作字典查比当教材读更合适。',
      en: 'A competition handbook compressing common algorithms into memorisable skeletons with problem indices. Better as a dictionary than a course.'
    },
    tags: ['竞赛', '手册']
  },
  {
    id: 'aoc',
    title: { zh: 'Advent of Code', en: 'Advent of Code' },
    author: 'Eric Wastl',
    cat: 'advanced', type: 'practice', level: 2, lang: 'en', free: true,
    url: 'https://adventofcode.com/',
    note: {
      zh: '每年十二月一天一题，题目有故事包装但要处理真实解析与边界，允许任何语言。非常适合配合本站在多种语言之间切换练习。',
      en: 'One puzzle a day each December: story-wrapped but demanding real parsing and edge cases, in any language. Ideal for switching languages in this site\u2019s practice table.'
    },
    tags: ['竞赛', '多语言', '年度']
  },
  {
    id: 'codeforces-edu',
    title: { zh: 'Codeforces EDU 课程', en: 'Codeforces EDU' },
    author: 'Codeforces',
    cat: 'advanced', type: 'course', level: 2, lang: 'en', free: true,
    url: 'https://codeforces.com/edu/courses',
    note: {
      zh: '官方课程模块，每个专题（后缀数组、线段树、数论等）都是短片加配套题，学完立刻能做。',
      en: 'Official course modules: short lessons plus attached problems for each topic, from suffix arrays to segment trees and number theory.'
    },
    tags: ['竞赛', '专题']
  },
  {
    id: 'project-euler',
    title: { zh: 'Project Euler', en: 'Project Euler' },
    author: 'Project Euler',
    cat: 'advanced', type: 'practice', level: 3, lang: 'en', free: true,
    url: 'https://projecteuler.net/',
    note: {
      zh: '数学味很重的题目集，暴力解通常跑不完，逼你想出数论或组合上的技巧，适合同时练数学和编码。',
      en: 'A mathematical problem set where brute force rarely finishes, pushing you toward number-theoretic or combinatorial insight.'
    },
    tags: ['数学', '思维']
  },

  /* ---------- 在线练习场 ---------- */
  {
    id: 'leetcode',
    title: { zh: 'LeetCode', en: 'LeetCode' },
    author: 'LeetCode',
    cat: 'practice', type: 'practice', level: 1, lang: 'both', free: false,
    url: 'https://leetcode.com/',
    alt: [{ label: '中国站', url: 'https://leetcode.cn/' }],
    note: {
      zh: '最主流的刷题平台，按标签和公司分类清楚。免费题足够打基础，竞赛题和部分题解需要会员。',
      en: 'The most common arena, with clear tag and company groupings. The free set covers fundamentals; contests and some editorials need a subscription.'
    },
    tags: ['面试', '题库']
  },
  {
    id: 'codeforces',
    title: { zh: 'Codeforces', en: 'Codeforces' },
    author: 'Codeforces',
    cat: 'practice', type: 'practice', level: 2, lang: 'en', free: true,
    url: 'https://codeforces.com/',
    note: {
      zh: '竞赛主战场，题库庞大、赛制成熟。想练在压力下写代码，这里是效率最高的地方。',
      en: 'The main competitive arena with a mature contest format. The most efficient place to practise coding under pressure.'
    },
    tags: ['竞赛', '比赛']
  },
  {
    id: 'atcoder',
    title: { zh: 'AtCoder', en: 'AtCoder' },
    author: 'AtCoder',
    cat: 'practice', type: 'practice', level: 2, lang: 'both', free: true,
    url: 'https://atcoder.jp/',
    note: {
      zh: '题目质量高、难度曲线平滑，每周的 Beginner Contest 很适合当常规训练。题面有英文，部分有中文翻译。',
      en: 'High-quality problems on a smooth difficulty curve; the weekly Beginner Contest makes a good routine. Statements are in English with some Chinese translations.'
    },
    tags: ['竞赛', '常规训练']
  },
  {
    id: 'luogu',
    title: { zh: '洛谷', en: 'Luogu' },
    author: '洛谷',
    cat: 'practice', type: 'practice', level: 1, lang: 'zh', free: true,
    url: 'https://www.luogu.com.cn/',
    note: {
      zh: '中文社区氛围最好，题解区讨论详细，还带语法入门题单，国内访问速度稳定。',
      en: 'The friendliest Chinese-language community: detailed discussions in the solution section, plus beginner problem lists. Fast from mainland China.'
    },
    tags: ['中文', '题解']
  },
  {
    id: 'exercism',
    title: { zh: 'Exercism', en: 'Exercism' },
    author: 'Exercism',
    cat: 'practice', type: 'practice', level: 1, lang: 'en', free: true,
    url: 'https://exercism.org/',
    note: {
      zh: '覆盖七十多种语言的练习册，每道题都配人工导师点评。想横向对比同一道题在不同语言里的写法，这里最方便。',
      en: 'Practice tracks for over seventy languages with human mentoring. The easiest way to compare how one task looks across languages.'
    },
    tags: ['多语言', '导师']
  },
  {
    id: 'kaggle',
    title: { zh: 'Kaggle', en: 'Kaggle' },
    author: 'Kaggle',
    cat: 'practice', type: 'practice', level: 2, lang: 'en', free: true,
    url: 'https://www.kaggle.com/',
    note: {
      zh: '数据集、免费 GPU 笔记本和竞赛三合一入口，也是读别人 notebook 学套路最快的地方。',
      en: 'Datasets, free GPU notebooks and competitions in one place — also the fastest way to learn patterns by reading other people\u2019s notebooks.'
    },
    tags: ['数据', 'GPU', '竞赛']
  },
  {
    id: 'hackerrank',
    title: { zh: 'HackerRank', en: 'HackerRank' },
    author: 'HackerRank',
    cat: 'practice', type: 'practice', level: 1, lang: 'en', free: true,
    url: 'https://www.hackerrank.com/',
    note: {
      zh: '按语言和技能分区的题目，难度平缓，适合刚学完一门语言时用来熟悉标准库。',
      en: 'Problems grouped by language and skill on a gentle curve — handy right after learning a language and its standard library.'
    },
    tags: ['入门', '多语言']
  },
  {
    id: 'codewars',
    title: { zh: 'Codewars', en: 'Codewars' },
    author: 'Codewars',
    cat: 'practice', type: 'practice', level: 1, lang: 'en', free: true,
    url: 'https://www.codewars.com/',
    note: {
      zh: '以短小题目为主，提交后能看到大量别人的解法，是学习「同一件事的十种写法」的好地方。',
      en: 'Short kata whose value lies in the solution section: after submitting you can read dozens of alternative approaches to the same task.'
    },
    tags: ['小题', '多解法']
  },

  /* ---------- 可视化与直觉 ---------- */
  {
    id: 'visualgo',
    title: { zh: 'VisuAlgo', en: 'VisuAlgo' },
    author: 'Steven Halim 等',
    cat: 'visual', type: 'tool', level: 1, lang: 'both', free: true,
    url: 'https://visualgo.net/',
    note: {
      zh: '把排序、树、图、字符串匹配都做成了可单步的动画，也支持上传自己的数据。本站演示室的思路基本沿用它的方式。',
      en: 'Step-through animations for sorting, trees, graphs and string matching, with your own data uploadable. The demo hall here follows the same idea.'
    },
    tags: ['动画', '单步']
  },
  {
    id: 'algorithm-visualizer',
    title: { zh: 'Algorithm Visualizer', en: 'Algorithm Visualizer' },
    author: '开源社区',
    cat: 'visual', type: 'tool', level: 2, lang: 'en', free: true,
    url: 'https://algorithm-visualizer.org/',
    note: {
      zh: '把算法拆成命令流，运行时逐条高亮执行位置并同步显示数据结构状态，适合理解回溯和搜索类算法的展开过程。',
      en: 'Breaks an algorithm into a command stream, highlighting each executed command against the live data structure — good for watching backtracking unfold.'
    },
    tags: ['动画', '源码']
  },
  {
    id: 'tensorflow-playground',
    title: { zh: 'TensorFlow Playground', en: 'TensorFlow Playground' },
    author: 'Google',
    cat: 'visual', type: 'tool', level: 1, lang: 'en', free: true,
    url: 'https://playground.tensorflow.org/',
    note: {
      zh: '拖几下就能看清层数、激活函数、学习率如何影响决策边界。本站的神经网络演示是它的简化复刻。',
      en: 'A few drags show how depth, activation and learning rate shape the decision boundary. Our neural network demo is a simplified take on it.'
    },
    tags: ['神经网络', '交互']
  },
  {
    id: 'cnn-explainer',
    title: { zh: 'CNN Explainer', en: 'CNN Explainer' },
    author: 'Georgia Tech Polo Club',
    cat: 'visual', type: 'tool', level: 2, lang: 'en', free: true,
    url: 'https://poloclub.github.io/cnn-explainer/',
    note: {
      zh: '把一张图在卷积网络里逐层展开，能看到每个卷积核在找什么，比读公式直观得多。',
      en: 'Unfolds one image layer by layer through a convolutional network so you can see what each kernel responds to.'
    },
    tags: ['CNN', '交互']
  },
  {
    id: 'transformer-explainer',
    title: { zh: 'Transformer Explainer', en: 'Transformer Explainer' },
    author: 'Georgia Tech Polo Club',
    cat: 'visual', type: 'tool', level: 3, lang: 'en', free: true,
    url: 'https://poloclub.github.io/transformer-explainer/',
    note: {
      zh: '在浏览器里跑一个真实的小型 GPT，实时看注意力权重和概率分布随输入变化，是理解自回归生成最好的工具之一。',
      en: 'Runs a real small GPT in the browser, showing attention weights and the output distribution change as you type. One of the best ways to grasp autoregressive generation.'
    },
    tags: ['Transformer', '注意力']
  },
  {
    id: 'distill',
    title: { zh: 'Distill.pub', en: 'Distill.pub' },
    author: 'Distill 编辑部',
    cat: 'visual', type: 'article', level: 3, lang: 'en', free: true,
    url: 'https://distill.pub/',
    note: {
      zh: '已停更，但留下的解释性文章质量极高，把特征可视化、动量、注意力讲得比论文清楚，存量内容值得反复读。',
      en: 'No longer publishing, but the archive is exceptional: feature visualisation, momentum and attention explained more clearly than in the papers.'
    },
    tags: ['解释性', '存档']
  },
  {
    id: 'nndl',
    title: { zh: '神经网络与深度学习（在线书）', en: 'Neural Networks and Deep Learning' },
    author: 'Michael Nielsen',
    cat: 'visual', type: 'book', level: 2, lang: 'en', free: true,
    url: 'http://neuralnetworksanddeeplearning.com/',
    note: {
      zh: '从手写数字识别一步步推导反向传播，代码短、解释细。虽然不覆盖最新架构，基础部分仍然最好读。',
      en: 'Derives backpropagation step by step from digit recognition, with short code and careful explanation. Dated on architectures, still the most readable on fundamentals.'
    },
    tags: ['反向传播', '教材']
  },

  /* ---------- 数学基础 ---------- */
  {
    id: 'mml-book',
    title: { zh: 'Mathematics for Machine Learning', en: 'Mathematics for Machine Learning' },
    author: 'Deisenroth, Faisal, Ong',
    cat: 'math', type: 'book', level: 2, lang: 'en', free: true,
    url: 'https://mml-book.github.io/',
    note: {
      zh: '专为机器学习写的数学书：线性代数、解析几何、概率、优化，每章都直接对应后面会用到的模型，PDF 免费。',
      en: 'Mathematics written specifically for machine learning — linear algebra, geometry, probability, optimisation — each chapter tied to the models that use it. Free PDF.'
    },
    tags: ['线性代数', '概率', '免费 PDF']
  },
  {
    id: '3b1b-linear-algebra',
    title: { zh: '线性代数的本质', en: 'Essence of Linear Algebra' },
    author: '3Blue1Brown',
    cat: 'math', type: 'video', level: 1, lang: 'both', free: true,
    url: 'https://www.bilibili.com/video/BV1ys411472E',
    alt: [{ label: 'YouTube 原版', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' }],
    note: {
      zh: '把矩阵乘法讲成空间的伸缩与旋转，看完再回去读教材会顺畅很多。国内视频站有带字幕的搬运版本。',
      en: 'Matrix multiplication becomes stretching and rotating space; reading a textbook afterwards is far easier. Subtitled copies circulate on Chinese video sites.'
    },
    tags: ['视频', '几何直觉']
  },
  {
    id: 'strang-1806',
    title: { zh: 'MIT 18.06 线性代数', en: 'MIT 18.06 Linear Algebra' },
    author: 'Gilbert Strang / MIT OCW',
    cat: 'math', type: 'course', level: 2, lang: 'en', free: true,
    url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
    note: {
      zh: 'Strang 的课堂录像配板书，把四个基本子空间讲得非常透，是机器学习数学里最值得完整看一遍的课。',
      en: 'Strang\u2019s lectures with blackboard notes make the four fundamental subspaces click. Worth watching in full before the ML mathematics.'
    },
    tags: ['公开课', '线性代数']
  },
  {
    id: 'statistical-learning',
    title: { zh: '统计学习方法', en: 'Statistical Learning Methods' },
    author: '李航',
    cat: 'math', type: 'book', level: 3, lang: 'zh', free: false,
    url: 'https://book.douban.com/subject/33437381/',
    note: {
      zh: '国内机器学习教材里推导最完整的一本，从感知机到 EM、CRF 逐步推进，配南瓜书一起看效果最好。',
      en: 'The most complete derivation-based machine learning text in Chinese, from the perceptron through EM to CRF. Pairs well with the community formula notes.'
    },
    tags: ['教材', '推导']
  },
  {
    id: 'pumpkin-book',
    title: { zh: '南瓜书', en: 'Pumpkin Book' },
    author: 'Datawhale',
    cat: 'math', type: 'list', level: 3, lang: 'zh', free: true,
    url: 'https://github.com/datawhalechina/pumpkin-book',
    note: {
      zh: '《机器学习》（西瓜书）的公式推导补全，把书上跳过的中间步骤一条条补回来，卡在推导时最有用。',
      en: 'Fills in the derivation steps skipped in the Watermelon Book. Exactly what you need when stuck mid-formula.'
    },
    tags: ['推导', '开源']
  },

  /* ---------- 机器学习 ---------- */
  {
    id: 'cs229',
    title: { zh: '斯坦福 CS229 机器学习', en: 'Stanford CS229 Machine Learning' },
    author: 'Andrew Ng / Stanford',
    cat: 'ml', type: 'course', level: 2, lang: 'en', free: true,
    url: 'https://cs229.stanford.edu/',
    note: {
      zh: '偏理论的机器学习课，讲义推导扎实，从线性回归覆盖到强化学习。想真正搞懂数学背景优先选它。',
      en: 'The theory-heavy course: solid notes from linear regression to reinforcement learning. Choose it when you want the mathematics.'
    },
    tags: ['公开课', '理论']
  },
  {
    id: 'scikit-learn',
    title: { zh: 'scikit-learn 用户指南', en: 'scikit-learn User Guide' },
    author: 'scikit-learn 社区',
    cat: 'ml', type: 'article', level: 1, lang: 'en', free: true,
    url: 'https://scikit-learn.org/stable/user_guide.html',
    note: {
      zh: '不只是 API 文档：算法选择流程图和「常见陷阱」章节本身就是很好的教材。',
      en: 'More than API docs: the algorithm-selection flowchart and the common pitfalls chapter read like a short textbook.'
    },
    tags: ['工具', '实践']
  },
  {
    id: 'islr',
    title: { zh: '统计学习导论（ISLR / ESL）', en: 'An Introduction to Statistical Learning' },
    author: 'James, Witten, Hastie, Tibshirani',
    cat: 'ml', type: 'book', level: 2, lang: 'en', free: true,
    url: 'https://www.statlearning.com/',
    note: {
      zh: 'ISLR 偏应用、ESL 偏理论，两本 PDF 都免费。回归、分类、树、集成、无监督各一章，配 R 与 Python 实验。',
      en: 'ISLR is applied, ESL is theoretical, and both PDFs are free. Regression, classification, trees, ensembles and unsupervised learning, with R and Python labs.'
    },
    tags: ['教材', '免费 PDF']
  },
  {
    id: 'zhou-ml',
    title: { zh: '机器学习（周志华）', en: 'Machine Learning (Zhou Zhihua)' },
    author: '周志华 / 清华大学出版社',
    cat: 'ml', type: 'book', level: 2, lang: 'zh', free: false,
    url: 'https://book.douban.com/subject/26708119/',
    note: {
      zh: '中文机器学习教材里体系最完整的一本，从模型评估、线性模型一路讲到强化学习。本站的机器学习专题按它的章节顺序组织：评估 → 线性模型 → 决策树 → 神经网络 → 贝叶斯 → 聚类 → 降维 → 强化学习。',
      en: 'The most complete Chinese-language machine learning textbook, running from model evaluation and linear models all the way to reinforcement learning. The machine learning set on this site follows that chapter order.'
    },
    tags: ['教材', '中文', '专题依据']
  },
  {
    id: 'hylee-ml',
    title: { zh: '李宏毅机器学习', en: 'Hung-yi Lee: Machine Learning' },
    author: '李宏毅 / 台大',
    cat: 'ml', type: 'course', level: 1, lang: 'zh', free: true,
    url: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2023-spring.php',
    note: {
      zh: '中文世界里最适合入门的机器学习课，讲得轻松但要求不低，作业全部使用真实数据，每年更新。',
      en: 'The best Chinese-language entry point: relaxed delivery, serious demands, and homework on real data. Updated yearly.'
    },
    tags: ['中文', '公开课']
  },

  /* ---------- 深度学习 ---------- */
  {
    id: 'd2l',
    title: { zh: '动手学深度学习', en: 'Dive into Deep Learning' },
    author: '李沐等',
    cat: 'dl', type: 'book', level: 2, lang: 'both', free: true,
    url: 'https://zh.d2l.ai/',
    alt: [{ label: 'English', url: 'https://d2l.ai/' }],
    note: {
      zh: '理论和代码交错推进，每个概念都有可运行的 notebook，支持 PyTorch / JAX / TensorFlow 三个版本，是最常用的中文深度学习教材。',
      en: 'Theory and code interleaved, every concept backed by a runnable notebook in PyTorch, JAX or TensorFlow. The default Chinese-language deep learning text.'
    },
    tags: ['教材', 'notebook']
  },
  {
    id: 'cs231n',
    title: { zh: '斯坦福 CS231n 视觉识别', en: 'Stanford CS231n: Deep Learning for Computer Vision' },
    author: 'Stanford',
    cat: 'dl', type: 'course', level: 3, lang: 'en', free: true,
    url: 'https://cs231n.stanford.edu/',
    note: {
      zh: '视觉方向最经典的课，反向传播、卷积、检测分割讲得很清楚，作业要手写实现，含金量高。',
      en: 'The classic vision course: backprop, convolutions, detection and segmentation explained carefully, with from-scratch assignments.'
    },
    tags: ['公开课', '视觉']
  },
  {
    id: 'fastai',
    title: { zh: 'fast.ai 实用深度学习', en: 'fast.ai Practical Deep Learning' },
    author: 'Jeremy Howard',
    cat: 'dl', type: 'course', level: 1, lang: 'en', free: true,
    url: 'https://course.fast.ai/',
    note: {
      zh: '自顶向下：第一课就训练出能用的模型，再逐步往下补原理。想尽快做出东西的人会很受用。',
      en: 'Top-down: you train a working model in the first lesson and descend into the internals later. Great when you want results early.'
    },
    tags: ['公开课', '实践']
  },
  {
    id: 'deeplearningbook',
    title: { zh: '深度学习（花书）', en: 'Deep Learning (the "flower book")' },
    author: 'Goodfellow, Bengio, Courville',
    cat: 'dl', type: 'book', level: 3, lang: 'en', free: true,
    url: 'https://www.deeplearningbook.org/',
    note: {
      zh: '在线全文免费。第一部分数学基础写得尤其好，后面的模型章节已有些年代，当作词典查比通读更合适。',
      en: 'Free online. The mathematical background chapters are excellent; the model chapters show their age, so treat it as a reference.'
    },
    tags: ['教材', '免费']
  },
  {
    id: 'karpathy-zero-to-hero',
    title: { zh: '神经网络：从零到精通', en: 'Neural Networks: Zero to Hero' },
    author: 'Andrej Karpathy',
    cat: 'dl', type: 'video', level: 2, lang: 'en', free: true,
    url: 'https://karpathy.ai/zero-to-hero.html',
    note: {
      zh: '从手写反向传播开始，一路做到一个能训练的小型 GPT。边看边敲，是把「框架黑盒」拆开最有效的路径。',
      en: 'Starts with hand-written backprop and ends with a trainable small GPT. Typing along is the most effective way to open the framework black box.'
    },
    tags: ['视频', '从零实现']
  },
  {
    id: 'pytorch-tutorials',
    title: { zh: 'PyTorch 官方教程', en: 'PyTorch Tutorials' },
    author: 'PyTorch',
    cat: 'dl', type: 'article', level: 1, lang: 'en', free: true,
    url: 'https://pytorch.org/tutorials/',
    note: {
      zh: '从 60 分钟入门到分布式训练都有，示例可直接在 Colab 跑，遇到具体实现问题时的第一站。',
      en: 'From a sixty-minute blitz to distributed training, with Colab-ready examples. The first stop for implementation questions.'
    },
    tags: ['框架', '文档']
  },

  /* ---------- NLP 与大模型 ---------- */
  {
    id: 'cs336',
    title: { zh: '斯坦福 CS336 从零构建语言模型', en: 'Stanford CS336: Language Modeling from Scratch' },
    author: 'Stanford',
    cat: 'llm', type: 'course', level: 3, lang: 'en', free: true,
    url: 'https://stanford-cs336.github.io/',
    note: {
      zh: '从分词器、注意力一直写到数据清洗、并行训练和推理优化，作业要真跑 GPU，是理解大模型全链路最好的课之一。',
      en: 'Runs from tokenisers and attention through data cleaning, parallel training and inference optimisation, with GPU-heavy assignments.'
    },
    tags: ['公开课', '大模型', '从零']
  },
  {
    id: 'hf-llm-course',
    title: { zh: 'Hugging Face 大模型课程', en: 'Hugging Face LLM Course' },
    author: 'Hugging Face',
    cat: 'llm', type: 'course', level: 2, lang: 'en', free: true,
    url: 'https://huggingface.co/learn/llm-course',
    note: {
      zh: '讲清 Transformer 之后立刻上手跑微调和对齐，全程使用 Transformers、Datasets、Accelerate 这些真实工具。',
      en: 'Explains transformers then immediately moves to fine-tuning and alignment with the real toolchain: Transformers, Datasets, Accelerate.'
    },
    tags: ['实践', '微调']
  },
  {
    id: 'slp3',
    title: { zh: '语音与语言处理（第三版）', en: 'Speech and Language Processing (3rd ed.)' },
    author: 'Jurafsky & Martin',
    cat: 'llm', type: 'book', level: 3, lang: 'en', free: true,
    url: 'https://web.stanford.edu/~jurafsky/slp3/',
    note: {
      zh: 'NLP 的标准教材，在线草稿免费。词向量、句法、语义到大模型各章都写得克制而完整。',
      en: 'The standard NLP text, free as an online draft. Restrained and complete across embeddings, syntax, semantics and large models.'
    },
    tags: ['教材', 'NLP']
  },
  {
    id: 'annotated-transformer',
    title: { zh: '图解 Transformer（注释版实现）', en: 'The Annotated Transformer' },
    author: 'Harvard NLP',
    cat: 'llm', type: 'article', level: 3, lang: 'en', free: true,
    url: 'https://nlp.seas.harvard.edu/annotated-transformer/',
    note: {
      zh: '把《Attention is All You Need》逐段翻译成可运行代码，左右对照。看完论文卡壳时来这对照最快。',
      en: 'Translates Attention Is All You Need into runnable code section by section. The fastest way to unstick yourself after reading the paper.'
    },
    tags: ['论文解读', '代码']
  },
  {
    id: 'llm-course-mlabonne',
    title: { zh: 'LLM Course（工程向合集）', en: 'LLM Course (engineering-oriented)' },
    author: 'Maxime Labonne',
    cat: 'llm', type: 'list', level: 2, lang: 'en', free: true,
    url: 'https://github.com/mlabonne/llm-course',
    note: {
      zh: '把大模型相关技能拆成路线图加 Colab 笔记本：量化、微调、RAG、评估。偏工程落地，不绕理论。',
      en: 'Roadmaps plus Colab notebooks for the applied side: quantisation, fine-tuning, RAG and evaluation. Engineering-first, theory-light.'
    },
    tags: ['开源', '工程']
  },
  {
    id: 'llms-from-scratch',
    title: { zh: '从零构建大模型（配套代码）', en: 'Build a Large Language Model (From Scratch)' },
    author: 'Sebastian Raschka',
    cat: 'llm', type: 'book', level: 3, lang: 'en', free: true,
    url: 'https://github.com/rasbt/LLMs-from-scratch',
    note: {
      zh: '配套代码仓库免费，按章节逐步搭出注意力、训练循环、微调与指令对齐，想彻底弄明白就一步步跟着写。',
      en: 'The companion repository is free: chapter by chapter it builds attention, a training loop, fine-tuning and instruction alignment.'
    },
    tags: ['从零', '开源']
  },

  /* ---------- 强化学习 ---------- */
  {
    id: 'sutton-barto',
    title: { zh: '强化学习导论', en: 'Reinforcement Learning: An Introduction' },
    author: 'Sutton & Barto',
    cat: 'rl', type: 'book', level: 3, lang: 'en', free: true,
    url: 'http://incompleteideas.net/book/the-book-2nd.html',
    note: {
      zh: '这个领域的奠基教材，第二版 PDF 免费。前半本关于价值函数与探索的内容至今没有被更好的替代。',
      en: 'The founding text; the second-edition PDF is free. The first half on value functions and exploration has yet to be replaced.'
    },
    tags: ['教材', '免费 PDF']
  },
  {
    id: 'spinning-up',
    title: { zh: 'Spinning Up in Deep RL', en: 'Spinning Up in Deep RL' },
    author: 'OpenAI',
    cat: 'rl', type: 'course', level: 3, lang: 'en', free: true,
    url: 'https://spinningup.openai.com/',
    note: {
      zh: '把策略梯度、Q 学习、Actor-Critic 的核心公式梳理成可执行清单，配有干净的单文件实现。',
      en: 'Distils policy gradients, Q-learning and actor-critic into an executable checklist with clean single-file implementations.'
    },
    tags: ['实践', '算法清单']
  },
  {
    id: 'gymnasium',
    title: { zh: 'Gymnasium 环境库', en: 'Gymnasium' },
    author: 'Farama Foundation',
    cat: 'rl', type: 'tool', level: 2, lang: 'en', free: true,
    url: 'https://gymnasium.farama.org/',
    note: {
      zh: '标准环境接口（原 OpenAI Gym 的维护版），从 CartPole 到 Atari 都能直接跑。做实验前先把接口约定看清。',
      en: 'The maintained successor to OpenAI Gym: standard environment interfaces from CartPole to Atari. Read the interface contract before experimenting.'
    },
    tags: ['工具', '环境']
  },

  /* ---------- 工程与工具 ---------- */
  {
    id: 'paperswithcode',
    title: { zh: 'Papers with Code', en: 'Papers with Code' },
    author: 'Meta AI 等',
    cat: 'tools', type: 'tool', level: 2, lang: 'en', free: true,
    url: 'https://paperswithcode.com/',
    note: {
      zh: '把论文和它的开源实现、基准排行榜绑在一起。想知道某个方法有没有能跑的代码，先来这里搜。',
      en: 'Binds each paper to its implementations and leaderboards. The first place to look for runnable code behind a method.'
    },
    tags: ['论文', '代码']
  },
  {
    id: 'arxiv',
    title: { zh: 'arXiv 预印本', en: 'arXiv' },
    author: 'Cornell University',
    cat: 'tools', type: 'tool', level: 2, lang: 'en', free: true,
    url: 'https://arxiv.org/list/cs.LG/recent',
    note: {
      zh: '最新预印本的源头。建议按分类订阅而不是逐篇刷，配合 Papers with Code 看代码比只看摘要有效得多。',
      en: 'The source of new preprints. Subscribe by category rather than browsing daily, and pair abstracts with code from Papers with Code.'
    },
    tags: ['论文', '前沿']
  },
  {
    id: 'huggingface',
    title: { zh: 'Hugging Face 模型与数据集中心', en: 'Hugging Face Hub' },
    author: 'Hugging Face',
    cat: 'tools', type: 'tool', level: 1, lang: 'en', free: true,
    url: 'https://huggingface.co/models',
    note: {
      zh: '模型、数据集、演示空间三合一。多数模型页都带一段可直接复制的推理代码，是最低成本的实验起点。',
      en: 'Models, datasets and demo Spaces in one place. Most model cards include copy-paste inference code — the cheapest way to start experimenting.'
    },
    tags: ['模型', '数据集']
  },
  {
    id: 'ollama',
    title: { zh: 'Ollama 本地模型运行器', en: 'Ollama' },
    author: 'Ollama',
    cat: 'tools', type: 'tool', level: 1, lang: 'en', free: true,
    url: 'https://ollama.com/',
    note: {
      zh: '一条命令把开源模型拉到本机跑，适合离线实验和隐私敏感的场景。显存不够时优先选量化版本。',
      en: 'Pulls open models onto your machine with one command; good for offline work and privacy-sensitive tasks. Choose quantised builds when VRAM is tight.'
    },
    tags: ['本地', '推理']
  },
  {
    id: 'vllm',
    title: { zh: 'vLLM 推理引擎', en: 'vLLM' },
    author: 'vLLM 社区',
    cat: 'tools', type: 'tool', level: 3, lang: 'en', free: true,
    url: 'https://docs.vllm.ai/',
    note: {
      zh: '把注意力缓存管理做成页式分配，吞吐比朴素实现高一个量级，是要把模型真正部署出去时的默认选择。',
      en: 'Paged attention caching lifts throughput an order of magnitude over naive serving. The default choice when you actually deploy a model.'
    },
    tags: ['部署', '性能']
  },
  {
    id: 'colab',
    title: { zh: 'Google Colab', en: 'Google Colab' },
    author: 'Google',
    cat: 'tools', type: 'tool', level: 1, lang: 'en', free: true,
    url: 'https://colab.research.google.com/',
    note: {
      zh: '免费额度的在线笔记本，带 GPU。适合验证小实验，但会话会断、显存有限，别指望跑长任务。',
      en: 'Free-tier notebooks with GPU access. Fine for small experiments, but sessions drop and VRAM is limited — not for long jobs.'
    },
    tags: ['GPU', '笔记本']
  },
  {
    id: 'wandb',
    title: { zh: 'Weights & Biases', en: 'Weights & Biases' },
    author: 'W&B',
    cat: 'tools', type: 'tool', level: 2, lang: 'en', free: false,
    url: 'https://wandb.ai/',
    note: {
      zh: '实验追踪与超参搜索，个人项目的免费额度够用。训练一旦超过十次迭代，有没有记录工具差别立刻显现。',
      en: 'Experiment tracking and sweeps; the free tier covers personal projects. Past ten training runs, tracking stops being optional.'
    },
    tags: ['实验管理', '可视化']
  },

  /* ---------- 经典论文 ---------- */
  {
    id: 'paper-attention',
    title: { zh: 'Attention Is All You Need', en: 'Attention Is All You Need' },
    author: 'Vaswani et al., 2017',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/1706.03762',
    note: {
      zh: 'Transformer 的起点。现在几乎所有主流模型都建立在这篇的架构上，值得逐段精读并对照一份实现。',
      en: 'The origin of the transformer and the architecture nearly every mainstream model builds on. Worth reading paragraph by paragraph against an implementation.'
    },
    tags: ['Transformer', '必读']
  },
  {
    id: 'paper-bert',
    title: { zh: 'BERT：深度双向 Transformer 预训练', en: 'BERT: Pre-training of Deep Bidirectional Transformers' },
    author: 'Devlin et al., 2018',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/1810.04805',
    note: {
      zh: '确立「预训练 + 微调」范式的论文，是理解掩码语言模型和下游适配的经典入口。',
      en: 'Established the pretrain-then-fine-tune paradigm, and the classic entry to masked language modelling and downstream adaptation.'
    },
    tags: ['预训练', 'NLP']
  },
  {
    id: 'paper-gpt3',
    title: { zh: 'GPT-3：语言模型是少样本学习者', en: 'Language Models are Few-Shot Learners' },
    author: 'Brown et al., 2020',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/2005.14165',
    note: {
      zh: '让「大模型的涌现能力」成为共识的论文，也是提示工程这一整套实践的起点。',
      en: 'The paper that made emergent ability common currency, and the origin of prompt engineering as a practice.'
    },
    tags: ['大模型', '涌现']
  },
  {
    id: 'paper-instructgpt',
    title: { zh: 'InstructGPT（RLHF 对齐）', en: 'Training Language Models to Follow Instructions with Human Feedback' },
    author: 'Ouyang et al., 2022',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/2203.02155',
    note: {
      zh: '把人类反馈强化学习写进大模型训练流程的论文，今天所有对话模型的训练范式都能追溯到它。',
      en: 'Brought RLHF into the large-model training pipeline; today\u2019s chat-model recipe traces back here.'
    },
    tags: ['RLHF', '对齐']
  },
  {
    id: 'paper-lora',
    title: { zh: 'LoRA：低秩适配', en: 'LoRA: Low-Rank Adaptation of Large Language Models' },
    author: 'Hu et al., 2021',
    cat: 'papers', type: 'paper', level: 2, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/2106.09685',
    note: {
      zh: '用极少量可训练参数完成微调，是让大模型微调能在个人显卡上跑起来的关键技术。',
      en: 'Fine-tunes with a tiny number of trainable parameters — the technique that made large-model fine-tuning feasible on a single consumer GPU.'
    },
    tags: ['微调', '高效训练']
  },
  {
    id: 'paper-flashattention',
    title: { zh: 'FlashAttention', en: 'FlashAttention: Fast and Memory-Efficient Exact Attention' },
    author: 'Dao et al., 2022',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/2205.14135',
    note: {
      zh: '通过分块与重计算把注意力从显存瓶颈里解放出来，算法不变但快好几倍，理解 GPU 上的性能优化必读。',
      en: 'Tiling and recomputation free attention from its memory bottleneck with no algorithmic change. Essential reading on GPU performance.'
    },
    tags: ['性能', '注意力']
  },
  {
    id: 'paper-resnet',
    title: { zh: 'ResNet：深度残差学习', en: 'Deep Residual Learning for Image Recognition' },
    author: 'He et al., 2015',
    cat: 'papers', type: 'paper', level: 2, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/1512.03385',
    note: {
      zh: '残差连接让网络可以真正加深，今天几乎所有深层模型都还在用它。',
      en: 'Residual connections made genuinely deep networks trainable, and essentially every deep model still relies on them.'
    },
    tags: ['视觉', '残差']
  },
  {
    id: 'paper-batchnorm',
    title: { zh: 'Batch Normalization', en: 'Batch Normalization' },
    author: 'Ioffe & Szegedy, 2015',
    cat: 'papers', type: 'paper', level: 2, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/1502.03167',
    note: {
      zh: '训练深层网络的标准组件。读它最有价值的一点，是看到「为什么调参变容易了」的解释有多经验性。',
      en: 'A standard component of deep training, and a good lesson in how empirical the "why tuning got easier" explanations remain.'
    },
    tags: ['训练技巧']
  },
  {
    id: 'paper-diffusion',
    title: { zh: '去噪扩散概率模型（DDPM）', en: 'Denoising Diffusion Probabilistic Models' },
    author: 'Ho et al., 2020',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/2006.11239',
    note: {
      zh: '图像生成主流路线的奠基论文。想理解今天扩散模型的采样与训练，从这里开始。',
      en: 'The foundation of the mainstream image-generation line. Start here to understand modern diffusion training and sampling.'
    },
    tags: ['生成模型', '扩散']
  },
  {
    id: 'paper-alphago',
    title: { zh: 'AlphaGo：深度网络与树搜索', en: 'Mastering the Game of Go with Deep Neural Networks and Tree Search' },
    author: 'Silver et al., 2016',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://www.nature.com/articles/nature16961',
    note: {
      zh: '把策略网络、价值网络和蒙特卡洛树搜索组合起来击败人类顶尖棋手，是搜索与学习结合的范例。',
      en: 'Combines a policy network, a value network and Monte Carlo tree search to beat the best human players — the model example of search plus learning.'
    },
    tags: ['强化学习', '搜索']
  },
  {
    id: 'paper-scaling-laws',
    title: { zh: '神经语言模型的缩放定律', en: 'Scaling Laws for Neural Language Models' },
    author: 'Kaplan et al., 2020',
    cat: 'papers', type: 'paper', level: 3, lang: 'en', free: true,
    url: 'https://arxiv.org/abs/2001.08361',
    note: {
      zh: '损失与参数量、数据量、计算量之间的幂律关系，是大模型训练预算分配的理论来源，建议与 Chinchilla 一起读。',
      en: 'Power-law relations between loss and model size, data and compute — the basis for training budgets. Read alongside Chinchilla.'
    },
    tags: ['缩放', '预算']
  }
];
