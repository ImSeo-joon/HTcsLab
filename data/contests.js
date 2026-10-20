/* ============================================================
   contests.js — 大学生竞赛索引

   audience 已统一为大学生视角；stage 表示建议年级：
     lower    大一 / 大二
     upper    大三 / 大四
     postgrad 研究生
     open     各年级均可

   level: 1 入门 | 2 进阶 | 3 高阶
   months: 赛历高亮月份（1–12）

   所有介绍、备赛阶梯、经验与规划均为本站原创整理；
   链接只指向赛事官网或权威聚合站，本站不转载赛题与原文。
   ============================================================ */

window.LHT_CONTEST_CATS = [
  { id: 'algorithm', label: { zh: '算法竞赛', en: 'Algorithms', fr: 'Algorithmique', ja: 'アルゴリズム' } },
  { id: 'ai',        label: { zh: 'AI 与模型', en: 'AI & models', fr: 'IA & modèles', ja: 'AI・モデル' } },
  { id: 'math',      label: { zh: '数学与建模', en: 'Mathematics', fr: 'Mathématiques', ja: '数学・モデリング' } },
  { id: 'security',  label: { zh: '网络安全', en: 'Security', fr: 'Sécurité', ja: 'セキュリティ' } },
  { id: 'data',      label: { zh: '数据科学', en: 'Data science', fr: 'Science des données', ja: 'データサイエンス' } },
  { id: 'design',    label: { zh: '综合与设计', en: 'General & design', fr: 'Général & design', ja: '総合・デザイン' } }
];

/* 年级阶段：筛选项文案在 i18n.js 的 con.* 里。 */
window.LHT_CONTEST_STAGES = ['lower', 'upper', 'postgrad', 'open'];
window.LHT_CONTEST_LEVELS = [1, 2, 3];

window.LHT_CONTESTS = [
  {
    id: 'icpc',
    name: { zh: 'ICPC 国际大学生程序设计竞赛', en: 'ICPC International Collegiate Programming Contest' },
    abbr: 'ICPC',
    jpKeep: true,
    cat: 'algorithm', stage: 'upper', level: 3,
    months: [9, 10, 11, 12],
    season: { zh: '每年 9–12 月区域赛，次年春季总决赛', en: 'Regionals Sep–Dec, world finals in spring' },
    summary: {
      zh: 'ICPC 是历史最久、认可度最高的团队程序设计赛事之一。它真正考察的不是单点算法，而是三个人在五小时内怎样读题、分工、验证与止损。',
      en: 'ICPC is the oldest and most widely recognised team programming contest. What it really tests is how three people read, divide, verify and cut losses within five hours.'
    },
    format: {
      zh: '三人一队、一台电脑、五小时，十到十三道题。按题数与罚时排名，罚时等于通过时间加上每次错误提交的 20 分钟。',
      en: 'Three students, one computer, five hours, 10–13 problems. Ranked by solved count then penalty: minutes to acceptance plus 20 per wrong submission.'
    },
    prepWeeks: { zh: '12–16 周', en: '12–16 weeks' },
    weekly: { zh: '每周 8–12 小时', en: '8–12 h / week' },
    prereq: {
      zh: 'C++ 语法与 STL 熟练；掌握图论、DP、数据结构的基本模型；能在 20 分钟内读完一道英文题并写出暴力解。',
      en: 'Fluent C++ and STL; working models for graphs, DP and data structures; able to read an English problem and write a brute force within 20 minutes.'
    },
    roles: [
      { zh: '读题', en: 'Reader' },
      { zh: '主码', en: 'Coder' },
      { zh: '验证', en: 'Verifier' }
    ],
    skills: [
      { zh: '图论', en: 'Graphs' },
      { zh: '动态规划', en: 'DP' },
      { zh: '计算几何', en: 'Geometry' },
      { zh: '字符串', en: 'Strings' },
      { zh: '构造', en: 'Construction' }
    ],
    prep: [
      { zh: '先把图论、DP、数据结构与计算几何的常用模板写成自己的代码库，并在随机题上盲写验证。', en: 'Build your own template library for graphs, DP, data structures and geometry, then re-type it blind on random problems.' },
      { zh: '每周打一场虚拟赛，赛后按「不会 / 会但慢 / 会但写错」三类归档，分别安排训练。', en: 'Run one virtual contest a week and sort every problem into three bins: unknown, known but slow, known but buggy.' },
      { zh: '固定角色：读题手、主码手、验证手；每 30 分钟强制同步一次剩余题目的难度判断。', en: 'Fix roles — reader, coder, verifier — and force a 30-minute sync on how the remaining problems actually rank.' }
    ],
    tips: [
      { zh: '先按难度梯度扫题，别在第三题上耗掉两小时——开局十分钟的分工和读题速度往往决定名次。', en: 'Scan for difficulty early. Ten minutes of reading and role assignment usually decides more than one hard problem.' },
      { zh: '罚时是隐形的失分项：不确定的题先写对拍，能过的题别反复交。', en: 'Penalty is invisible damage: verify with brute-force comparison before submitting, and never resubmit blindly.' }
    ],
    experience: {
      zh: 'ICPC 的回报不只是一块奖牌：你会被迫在信息不完整时做取舍，学会把「可能对」变成「可验证」。赛后把每场的失误写成清单，比多打一场更重要。',
      en: 'ICPC gives more than a medal: you learn to decide with incomplete information and to turn “probably right” into “verified”. A written list of each contest’s mistakes is worth more than one extra round.'
    },
    links: [
      { label: 'ICPC Global', url: 'https://icpc.global/' },
      { label: 'Kattis', url: 'https://open.kattis.com/' }
    ]
  },
  {
    id: 'ccpc',
    name: { zh: 'CCPC 中国大学生程序设计竞赛', en: 'China Collegiate Programming Contest' },
    abbr: 'CCPC',
    jpKeep: true,
    cat: 'algorithm', stage: 'upper', level: 3,
    months: [8, 9, 10, 11],
    season: { zh: '每年 8–11 月分站赛，年底总决赛', en: 'Stations Aug–Nov, finals at year end' },
    summary: {
      zh: 'CCPC 采用与 ICPC 相同的赛制，分站赛覆盖国内主要城市。它既是独立的国家级赛事，也是队伍进入 ICPC 区域赛之前最密集的实战机会。',
      en: 'CCPC uses the same format as ICPC and runs stations across major Chinese cities. It is both a national contest in its own right and the densest warm-up before ICPC regionals.'
    },
    format: {
      zh: '三人一机五小时，题型与 ICPC 接近。网络赛通常在暑期，分站赛在秋季，年底进行总决赛。',
      en: 'Three people, one machine, five hours, with a problem mix close to ICPC. Online preliminaries in summer, stations in autumn, finals at year end.'
    },
    prepWeeks: { zh: '10–14 周', en: '10–14 weeks' },
    weekly: { zh: '每周 8–10 小时', en: '8–10 h / week' },
    prereq: {
      zh: '与 ICPC 相同；另外要熟悉目标分站赛的题风、罚时策略与队伍模板。',
      en: 'The ICPC baseline, plus familiarity with the target station’s style, penalty strategy and your team template.'
    },
    roles: [
      { zh: '读题', en: 'Reader' },
      { zh: '主码', en: 'Coder' },
      { zh: '验证', en: 'Verifier' }
    ],
    skills: [
      { zh: '图论', en: 'Graphs' },
      { zh: '动态规划', en: 'DP' },
      { zh: '数学', en: 'Maths' },
      { zh: '数据结构', en: 'Data structures' }
    ],
    prep: [
      { zh: '翻近两届目标分站赛的题解，先补齐该站偏爱的题型，再谈全面复习。', en: 'Read the last two editions of your target station and patch its favourite topics before broad revision.' },
      { zh: '把队伍模板统一到同一份仓库，赛前只允许增量修改，避免三个人写出三套风格。', en: 'Keep one shared template repository; only additive changes after the final freeze.' },
      { zh: '网络赛前完成报名、账号与设备检查，别把参赛资格丢在流程上。', en: 'Finish registration, accounts and hardware checks before the online round.' }
    ],
    tips: [
      { zh: '分站赛题目风格差异明显，赛前翻近两届该站的题解能少踩很多坑。', en: 'Each station has its own style; read recent editorials before travelling.' },
      { zh: '网络赛是入场券，通常在暑期，注意报名与组队规则。', en: 'The summer online preliminary is the entry ticket — watch the registration rules.' }
    ],
    experience: {
      zh: 'CCPC 分站赛是检验队伍默契的最好场合。真正拉开差距的往往不是难题，而是三个人能否在压力下保持同一套提交纪律。',
      en: 'CCPC stations are the best test of team chemistry. The gap usually comes not from hard problems but from whether three people keep the same submission discipline under pressure.'
    },
    links: [{ label: 'CCPC', url: 'https://ccpc.io/' }]
  },
  {
    id: 'codeforces',
    name: { zh: 'Codeforces 线上赛', en: 'Codeforces Rounds' },
    abbr: 'CF',
    jpKeep: true,
    cat: 'algorithm', stage: 'open', level: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年，每周 1–2 场 Rated 比赛', en: 'All year, one or two rated rounds a week' },
    summary: {
      zh: 'Codeforces 是全球最活跃的线上算法竞赛平台，每周多场 Rated 比赛。Div.1–Div.4 按 rating 分层，赛后题解与 hack 机制让复盘很方便。',
      en: 'Codeforces is the busiest online contest platform, with several rated rounds a week. Div.1–Div.4 split by rating, and post-round editorials plus hacking make review easy.'
    },
    format: {
      zh: '个人线上赛，Div.1–Div.4 按 rating 分组，通常两小时六到八题，赛后两小时可看题解与 hack。',
      en: 'Individual online rounds split into Div.1–4 by rating; usually two hours and 6–8 problems, with editorials and hacking afterwards.'
    },
    prepWeeks: { zh: '长期，至少 8 周形成节奏', en: 'Long term, at least 8 weeks to build a rhythm' },
    weekly: { zh: '每周 4–6 小时（含补题）', en: '4–6 h / week, including upsolving' },
    prereq: {
      zh: '一门熟练语言；能独立完成 Div.3 前四题；会写暴力对拍与边界测试。',
      en: 'One fluent language; able to finish the first four Div.3 problems; comfortable with brute-force comparison and edge tests.'
    },
    roles: [{ zh: '个人赛', en: 'Individual' }],
    skills: [
      { zh: '实现', en: 'Implementation' },
      { zh: '贪心', en: 'Greedy' },
      { zh: '动态规划', en: 'DP' },
      { zh: '图论', en: 'Graphs' },
      { zh: '数学', en: 'Maths' }
    ],
    prep: [
      { zh: '先稳定通过 Div.3 的前四题，再逐步挑战 Div.2 的后两题。', en: 'Get the first four Div.3 problems stable, then move to the last two of Div.2.' },
      { zh: '每场赛后 24 小时内补题，把错因写成一句话而不是抄题解。', en: 'Upsolve within 24 hours and write the cause of each failure in one sentence.' },
      { zh: '建立个人 rating 曲线，按季度看趋势，不被单场波动牵着走。', en: 'Track rating quarterly instead of reacting to a single round.' }
    ],
    tips: [
      { zh: 'rating 是长期指标，别为单场掉分焦虑；把每次的错题归档比刷题量重要。', en: 'Rating is a long-run metric. Archiving every mistake matters more than raw problem count.' },
      { zh: '赛后立刻补题，超过 48 小时再补效率会掉一半。', en: 'Upsolve immediately after the contest; waiting 48 hours halves the benefit.' }
    ],
    experience: {
      zh: 'rating 只是滞后指标。把每场错题按「读错、想错、写错」分类，三个月后你会看到完全不同的曲线；这比盯着分数更有效。',
      en: 'Rating is a lagging indicator. Sort every miss into misread, mis-thought or mis-written, and after three months the curve looks different; that beats watching the score.'
    },
    links: [
      { label: 'Codeforces', url: 'https://codeforces.com/' },
      { label: 'Problemset', url: 'https://codeforces.com/problemset' }
    ]
  },
  {
    id: 'atcoder',
    name: { zh: 'AtCoder 常规赛', en: 'AtCoder Regular Contests', ja: 'AtCoder レギュラーコンテスト' },
    abbr: 'AC',
    jp: true,
    cat: 'algorithm', stage: 'open', level: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年，ABC 每周、ARC 每月', en: 'Weekly ABC, monthly ARC' },
    summary: {
      zh: 'AtCoder 的题面干净、难度曲线平滑：ABC 适合打基础，ARC 适合练思维。英文题面与高质量题解让它成为长期训练的主场。',
      en: 'AtCoder statements are clean and its difficulty curve is smooth: ABC builds fundamentals, ARC trains thinking. English statements and strong editorials make it a long-term home.'
    },
    format: {
      zh: 'Beginner Contest（ABC）八题约 100 分钟，Regular Contest（ARC）四题两小时，难度曲线平滑，题面有英文。',
      en: 'ABC has eight problems in about 100 minutes; ARC has four in two hours. The curve is smooth and statements are in English.'
    },
    prepWeeks: { zh: '长期，8–12 周', en: 'Long term, 8–12 weeks' },
    weekly: { zh: '每周 4–6 小时', en: '4–6 h / week' },
    prereq: {
      zh: '基础实现与数学直觉；能稳定完成 ABC 的 A–D；习惯读英文题面。',
      en: 'Basic implementation and mathematical intuition; stable on ABC A–D; comfortable reading English statements.'
    },
    roles: [{ zh: '个人赛', en: 'Individual' }],
    skills: [
      { zh: '实现', en: 'Implementation' },
      { zh: '数学', en: 'Maths' },
      { zh: '动态规划', en: 'DP' },
      { zh: '图论', en: 'Graphs' },
      { zh: '构造', en: 'Construction' }
    ],
    prep: [
      { zh: '把 ABC 的 A–D 练到稳定且快速，再集中攻 E、F。', en: 'Make ABC A–D fast and reliable before concentrating on E and F.' },
      { zh: '每道错题写三行：关键观察、卡住的点、下次的检查清单。', en: 'For every miss, write the key observation, the sticking point, and a next-time checklist.' },
      { zh: 'ARC 只做自己能在 40 分钟内想出方向的题，剩下的留到补题。', en: 'In ARC, attempt only problems you can find a direction for within 40 minutes.' }
    ],
    tips: [
      { zh: 'ABC 的 E、F 题是提高 rating 的关键，D 题之前要练到「不假思索」。', en: 'Late ABC problems decide your rating; get the first four to reflex speed.' },
      { zh: 'AtCoder 的题解写得很清楚，赛后可逐题对照。', en: 'AtCoder editorials are unusually clear — read them problem by problem.' }
    ],
    experience: {
      zh: 'AtCoder 的题解质量很高，但不要直接抄。先写下自己的卡点，再对照题解找「差在哪一步」，这样补题才会留下东西。',
      en: 'AtCoder editorials are excellent, but do not copy them. Write down where you were stuck first, then compare step by step; that is what makes upsolving stick.'
    },
    links: [{ label: 'AtCoder', url: 'https://atcoder.jp/' }]
  },
  {
    id: 'leetcode-contest',
    name: { zh: 'LeetCode 周赛与双周赛', en: 'LeetCode Weekly & Biweekly' },
    abbr: 'LC',
    cat: 'algorithm', stage: 'lower', level: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '每周日周赛、隔周双周赛', en: 'Weekly on Sundays, biweekly on alternate weeks' },
    summary: {
      zh: 'LeetCode 周赛与双周赛节奏轻、反馈快，题目偏面试风格。它很适合用来维持代码手感、训练边界处理与 90 分钟内的取舍。',
      en: 'LeetCode weekly and biweekly rounds are light, fast and interview-flavoured. They are ideal for keeping code fluency, edge-case discipline and 90-minute trade-offs sharp.'
    },
    format: {
      zh: '个人线上，四题 90 分钟，按通过题数与罚时排名。题目偏面试风格，中文站有中文题面。',
      en: 'Four problems in 90 minutes, ranked by solved count and penalty. Interview-flavoured, with Chinese statements on the CN site.'
    },
    prepWeeks: { zh: '4–6 周', en: '4–6 weeks' },
    weekly: { zh: '每周 3–5 小时', en: '3–5 h / week' },
    prereq: {
      zh: '一门语言的基础语法；数组、哈希、字符串的常见操作；能看懂时间与空间复杂度。',
      en: 'Basic syntax in one language; common array, hash and string operations; able to read time and space complexity.'
    },
    roles: [{ zh: '个人赛', en: 'Individual' }],
    skills: [
      { zh: '数组', en: 'Arrays' },
      { zh: '哈希', en: 'Hashing' },
      { zh: '双指针', en: 'Two pointers' },
      { zh: '动态规划', en: 'DP' },
      { zh: '树', en: 'Trees' }
    ],
    prep: [
      { zh: '先把前三题的正确率稳定在 90% 以上，再碰第四题。', en: 'Hold above 90% on the first three problems before chasing the fourth.' },
      { zh: '用计时器模拟 90 分钟，训练读题与切换速度。', en: 'Simulate the full 90 minutes with a timer to train reading and switching speed.' },
      { zh: '把错题按数据结构归类，一周后重新手写一遍。', en: 'Group misses by data structure and rewrite them from scratch a week later.' }
    ],
    tips: [
      { zh: '前三题是基本盘，第四题常是中等偏难的 DP 或图论，先把简单题做干净。', en: 'The first three are the base; the fourth is usually a harder DP or graph problem.' },
      { zh: '周赛排名波动大，用它练手速和边界处理，别当唯一指标。', en: 'Rankings swing a lot here — treat it as speed and edge-case practice.' }
    ],
    experience: {
      zh: '周赛最适合练「90 分钟内的取舍」。先把前三题做稳，再决定第四题值不值得投入；这个判断力在面试和正式比赛里同样有用。',
      en: 'Weekly rounds are the best place to practise 90-minute trade-offs. Bank the first three, then decide whether the fourth deserves the remaining time; the same judgement helps in interviews and onsite contests.'
    },
    links: [
      { label: 'LeetCode CN', url: 'https://leetcode.cn/contest/' },
      { label: 'LeetCode', url: 'https://leetcode.com/contest/' }
    ]
  },
  {
    id: 'lanqiao',
    name: { zh: '蓝桥杯全国软件和信息技术专业人才大赛', en: 'Lanqiao Cup' },
    abbr: '蓝桥',
    cat: 'algorithm', stage: 'lower', level: 1,
    months: [3, 4, 5, 6],
    season: { zh: '每年 3–4 月省赛、5–6 月国赛', en: 'Provincial round Mar–Apr, national round May–Jun' },
    summary: {
      zh: '蓝桥杯面向高校学生，按语言分组，题型包含填空与编程。难度低于 ICPC，但更强调完整度与边界，适合作为第一次正式比赛。',
      en: 'Lanqiao is aimed at university students, grouped by language, with fill-in and programming tasks. Easier than ICPC but stricter on completeness and edges — a good first formal contest.'
    },
    format: {
      zh: '个人赛，分 C/C++、Java、Python、Web 等组别，填空题 + 编程题，省内评奖后进国赛。',
      en: 'Individual, grouped by language (C/C++, Java, Python, Web). Fill-in-the-blank plus programming tasks; provincial winners advance.'
    },
    prepWeeks: { zh: '6–8 周', en: '6–8 weeks' },
    weekly: { zh: '每周 4–6 小时', en: '4–6 h / week' },
    prereq: {
      zh: 'C/C++ 或 Python 基础；能独立写完整程序并处理输入输出；了解常见排序与枚举。',
      en: 'C/C++ or Python basics; able to write a complete program with I/O; familiar with sorting and enumeration.'
    },
    roles: [{ zh: '个人赛', en: 'Individual' }],
    skills: [
      { zh: 'C/C++', en: 'C/C++' },
      { zh: 'Python', en: 'Python' },
      { zh: '模拟', en: 'Simulation' },
      { zh: '枚举', en: 'Enumeration' },
      { zh: '基础算法', en: 'Fundamentals' }
    ],
    prep: [
      { zh: '填空题允许手算与本地暴力，先确保不空题。', en: 'Fill-in questions can be solved by hand or brute force locally — never leave one blank.' },
      { zh: '把历年题型按语言分组刷一遍，熟悉省赛与国赛的难度差。', en: 'Work through past papers by language group and feel the provincial-national gap.' },
      { zh: '练习在无 IDE 提示的环境下写完整程序，注意头文件与边界。', en: 'Write complete programs without IDE hints, watching headers and edge cases.' }
    ],
    tips: [
      { zh: '填空题没有部分分，但可以手算或写程序暴力验证，别空着。', en: 'Fill-in questions give no partial credit but can be brute-forced locally — never leave them blank.' },
      { zh: '题目难度低于 ICPC，但更看重代码规范与边界，适合作为第一次正式比赛。', en: 'Easier than ICPC but strict on edge cases — a good first formal contest.' }
    ],
    experience: {
      zh: '蓝桥杯的题目不一定难，但很考验完整度。把每一道填空题都当成可以验证的小实验，别凭感觉填；这份习惯会一直用到后面的工程题。',
      en: 'Lanqiao problems are not always hard, but they test completeness. Treat every fill-in as a small experiment you can verify instead of a guess; that habit carries into engineering work.'
    },
    links: [{ label: '蓝桥杯', url: 'https://dasai.lanqiao.cn/' }]
  },
  {
    id: 'gplt',
    name: { zh: '团体程序设计天梯赛', en: 'Group Programming Ladder Tournament' },
    abbr: 'GPLT',
    cat: 'algorithm', stage: 'lower', level: 1,
    months: [4],
    season: { zh: '每年 4 月左右', en: 'Around April each year' },
    summary: {
      zh: '天梯赛以学校为单位组队，题目分基础、进阶、登顶三级，团队总分与个人分数同时计算。它最适合练习「在团队里稳定拿分」。',
      en: 'The Ladder Tournament enters teams by school, with basic, advanced and summit tiers scored both per team and per individual. It is the best place to learn steady point-banking inside a team.'
    },
    format: {
      zh: '以学校为单位组队，题目分基础、进阶、登顶三级，团队总分排名，个人也有分数。',
      en: 'Teams enter for their school; problems are tiered basic / advanced / summit, scored both per team and per individual.'
    },
    prepWeeks: { zh: '6–8 周', en: '6–8 weeks' },
    weekly: { zh: '每周 4–6 小时', en: '4–6 h / week' },
    prereq: {
      zh: '基础语法与模拟题；熟悉 PTA 的提交环境；能在团队里承担稳定的基础分。',
      en: 'Basic syntax and simulation; familiarity with PTA; able to bank reliable basic points inside a team.'
    },
    roles: [
      { zh: '基础分', en: 'Basics' },
      { zh: '进阶', en: 'Advanced' },
      { zh: '登顶', en: 'Summit' }
    ],
    skills: [
      { zh: '基础语法', en: 'Syntax' },
      { zh: '模拟', en: 'Simulation' },
      { zh: '字符串', en: 'Strings' },
      { zh: '数据结构', en: 'Data structures' }
    ],
    prep: [
      { zh: '明确队内分工：有人专攻基础分，有人冲进阶，避免全员挤在登顶题。', en: 'Assign someone to bank basic points and someone to push advanced tasks; do not crowd the summit.' },
      { zh: '提前熟悉 PTA 的提交格式、编译选项与判题反馈。', en: 'Learn PTA submission format, compiler flags and judge feedback beforehand.' },
      { zh: '用团队总分模拟器排一次策略，算清每类题的机会成本。', en: 'Run a team-score simulation once and price the opportunity cost of each tier.' }
    ],
    tips: [
      { zh: '基础题占比高，队伍里要有人专门「稳拿分」，别全员去啃登顶题。', en: 'Basic problems carry a lot of weight — assign someone to bank them rather than everyone chasing the summit.' },
      { zh: 'PTA 平台的操作细节（编译选项、提交格式）要先熟悉一遍。', en: 'Learn the PTA platform quirks (compiler flags, submission format) beforehand.' }
    ],
    experience: {
      zh: '天梯赛教的是团队里的「稳定输出」。愿意做基础题的人，往往比只想冲难题的人对团队更有价值；这也是很多队伍真正缺的角色。',
      en: 'The Ladder Tournament teaches steady output inside a team. Someone willing to bank basic problems is often more valuable than someone who only wants the summit; many teams lack exactly that role.'
    },
    links: [{ label: 'PTA', url: 'https://pintia.cn/' }]
  },
  {
    id: 'kaggle',
    name: { zh: 'Kaggle 数据科学竞赛', en: 'Kaggle Competitions' },
    abbr: 'Kaggle',
    jpKeep: true,
    cat: 'data', stage: 'open', level: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年滚动', en: 'Rolling all year' },
    summary: {
      zh: 'Kaggle 把数据科学竞赛做成了可持续的练习场：公开数据、公开 notebook、公开排行榜。它适合完整走一遍从基线到特征工程再到验证的流程。',
      en: 'Kaggle turns data-science contests into a sustainable practice ground: open data, open notebooks, public leaderboards. It is ideal for one full pass from baseline to feature work to validation.'
    },
    format: {
      zh: '线上提交预测结果，按排行榜评分。分 Featured、Playground、社区赛三类，后两类适合入门。',
      en: 'Submit predictions to a leaderboard. Featured, Playground and community competitions — the latter two are beginner-friendly.'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week' },
    prereq: {
      zh: 'Python、pandas 与基础机器学习；会做交叉验证；能读懂排行榜指标。',
      en: 'Python, pandas and basic machine learning; comfortable with cross-validation; able to read a leaderboard metric.'
    },
    roles: [
      { zh: '数据', en: 'Data' },
      { zh: '建模', en: 'Modelling' },
      { zh: '验证', en: 'Validation' }
    ],
    skills: [
      { zh: '特征工程', en: 'Features' },
      { zh: '交叉验证', en: 'Validation' },
      { zh: '树模型', en: 'Tree models' },
      { zh: '深度学习', en: 'Deep learning' },
      { zh: '可视化', en: 'Visualisation' }
    ],
    prep: [
      { zh: '先复现一个高票 notebook 的 baseline，记录每一步的本地得分。', en: 'Reproduce a top-voted notebook baseline and log the local score after each step.' },
      { zh: '严格按时间或分组切分验证集，避免随机 K 折在时序数据上虚高。', en: 'Split by time or group; random K-fold badly overestimates on temporal data.' },
      { zh: '每次提交只改一个变量，把实验记录写成表。', en: 'Change one variable per submission and keep an experiment table.' }
    ],
    tips: [
      { zh: '先复现公开 notebook 的 baseline，再谈改进；前 10% 往往靠特征工程而非模型。', en: 'Reproduce a public baseline first; the top decile usually comes from feature work, not exotic models.' },
      { zh: '严格按时间切分验证集，用随机 K 折在时序数据上会严重高估。', en: 'Validate with a time-based split; random K-fold badly overestimates on temporal data.' }
    ],
    experience: {
      zh: 'Kaggle 的第一次目标不是拿牌，而是完整走通「读数据—基线—验证—提交—复盘」。一个可复现的 baseline，比十个未经验证的想法更有价值。',
      en: 'The first Kaggle goal is not a medal but one complete loop: read data, baseline, validate, submit, review. A reproducible baseline is worth more than ten unvalidated ideas.'
    },
    links: [
      { label: 'Competitions', url: 'https://www.kaggle.com/competitions' },
      { label: 'Notebooks', url: 'https://www.kaggle.com/code' }
    ]
  },
  {
    id: 'cumcm',
    name: { zh: '全国大学生数学建模竞赛', en: 'China Undergraduate Mathematical Contest in Modeling' },
    abbr: 'CUMCM',
    cat: 'math', stage: 'upper', level: 2,
    months: [9],
    season: { zh: '每年 9 月中旬，连续三天', en: 'Mid-September, three consecutive days' },
    summary: {
      zh: '全国大学生数学建模竞赛在 72 小时内完成建模、求解与论文写作，论文是唯一提交物。它考察的是把开放问题收敛成可辩护模型的能力。',
      en: 'CUMCM gives teams 72 hours to model, solve and write; the paper is the only submission. It tests the ability to turn an open problem into a defensible model.'
    },
    format: {
      zh: '三人一队，72 小时内从若干题中选一题，完成建模、求解与论文写作。论文是唯一提交物。',
      en: 'Teams of three pick one problem and spend 72 hours on modelling, solving and writing. The paper is the only submission.'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks' },
    weekly: { zh: '赛前每周 6–8 小时，比赛 72 小时', en: '6–8 h / week before, 72 hours during' },
    prereq: {
      zh: '微积分、线性代数、概率统计；一门编程语言；能读英文文献并写清假设。',
      en: 'Calculus, linear algebra and probability; one programming language; able to read English papers and state assumptions clearly.'
    },
    roles: [
      { zh: '建模', en: 'Modelling' },
      { zh: '编程', en: 'Coding' },
      { zh: '写作', en: 'Writing' }
    ],
    skills: [
      { zh: '建模', en: 'Modelling' },
      { zh: '数据分析', en: 'Data analysis' },
      { zh: '优化', en: 'Optimisation' },
      { zh: '论文写作', en: 'Writing' },
      { zh: '编程', en: 'Programming' }
    ],
    prep: [
      { zh: '赛前固定三人角色：建模、编程、写作，但每个人都要能读完整篇论文。', en: 'Fix three roles — modelling, coding, writing — but everyone must be able to read the whole paper.' },
      { zh: '准备摘要、假设、灵敏度分析与优缺点段的写作模板。', en: 'Prepare templates for the abstract, assumptions, sensitivity analysis and limitations.' },
      { zh: '做三次 72 小时全真模拟，训练选题投票与中途止损。', en: 'Run three full 72-hour simulations to practise problem selection and mid-course cuts.' }
    ],
    tips: [
      { zh: '选题前先各自读 20 分钟再投票，避免全队被一道「看起来简单」的题拖死。', en: 'Read separately for 20 minutes before voting — one deceptively easy-looking problem can sink the team.' },
      { zh: '论文结构比花哨算法更重要：摘要、假设、模型、灵敏度分析、优缺点必须齐全。', en: 'Structure beats sophistication: abstract, assumptions, model, sensitivity analysis and limitations must all be there.' }
    ],
    experience: {
      zh: '建模奖看的是论文，不是代码量。摘要写不好，评委可能不会翻到第二页；假设写不清，后面所有模型都站不住。',
      en: 'Modelling awards judge the paper, not the line count. A weak abstract may stop the reader at page one; unclear assumptions undermine every model that follows.'
    },
    links: [{ label: 'CUMCM', url: 'https://www.mcm.edu.cn/' }]
  },
  {
    id: 'mcm-icm',
    name: { zh: '美国大学生数学建模竞赛 MCM/ICM', en: 'MCM / ICM' },
    abbr: 'MCM',
    cat: 'math', stage: 'upper', level: 2,
    months: [2],
    season: { zh: '每年 2 月，四天', en: 'February, four days' },
    summary: {
      zh: 'MCM/ICM 要求三人队在 96 小时内完成一篇英文论文。题目开放度极高，评奖看重假设的清晰度与论证的完整性，而不是唯一答案。',
      en: 'MCM/ICM asks teams of three to produce an English paper in 96 hours. Problems are wide open; awards reward clear assumptions and complete argument rather than a single answer.'
    },
    format: {
      zh: '三人一队，96 小时完成英文论文，MCM 偏数学建模、ICM 偏交叉学科，评奖分 O/F/M/H 等级。',
      en: 'Teams of three write an English paper in 96 hours; MCM is mathematical, ICM interdisciplinary. Awards run O/F/M/H.'
    },
    prepWeeks: { zh: '10–12 周', en: '10–12 weeks' },
    weekly: { zh: '赛前每周 6–8 小时，比赛 96 小时', en: '6–8 h / week before, 96 hours during' },
    prereq: {
      zh: '英文写作；建模与数据分析；至少熟悉一种绘图工具；能独立查文献。',
      en: 'English writing; modelling and data analysis; at least one plotting tool; able to search the literature independently.'
    },
    roles: [
      { zh: '建模', en: 'Modelling' },
      { zh: '写作', en: 'Writing' },
      { zh: '可视化', en: 'Visualisation' }
    ],
    skills: [
      { zh: '英文写作', en: 'English writing' },
      { zh: '建模', en: 'Modelling' },
      { zh: '数据', en: 'Data' },
      { zh: '可视化', en: 'Visualisation' },
      { zh: '论证', en: 'Argumentation' }
    ],
    prep: [
      { zh: '把摘要写到能独立成文：问题、方法、结果、意义四段齐全。', en: 'Make the abstract stand alone: problem, method, result and significance.' },
      { zh: '准备常用句式与图表规范，减少比赛中的语言损耗。', en: 'Prepare stock phrasing and figure conventions to cut language friction during the contest.' },
      { zh: '至少做一次 96 小时全真模拟，按小时切分里程碑。', en: 'Run at least one full 96-hour simulation with hourly milestones.' }
    ],
    tips: [
      { zh: '英文写作是主要失分点，赛前准备好摘要与常见句式的模板。', en: 'English writing is where teams lose most marks — prepare abstract and phrasing templates.' },
      { zh: '题目开放度极高，明确假设比追求「正确」更重要。', en: 'Problems are wide open; explicit assumptions matter more than finding a right answer.' }
    ],
    experience: {
      zh: 'MCM 的开放题没有标准答案，评委看的是你如何定义问题、如何说明假设、如何承认局限。把「我们不知道」写清楚，比硬编一个结论更加分。',
      en: 'Open MCM problems have no single answer. Judges look at how you define the problem, justify assumptions and admit limits. Saying clearly what you do not know scores better than forcing a conclusion.'
    },
    links: [{ label: 'COMAP', url: 'https://www.comap.com/contests/mcm-icm' }]
  },
  {
    id: 'cmc',
    name: { zh: '全国大学生数学竞赛', en: 'Chinese Mathematics Competitions' },
    abbr: 'CMC',
    cat: 'math', stage: 'lower', level: 2,
    months: [10, 11],
    season: { zh: '初赛多在 11 月，决赛在次年春季', en: 'Preliminary in November, final in spring' },
    summary: {
      zh: '全国大学生数学竞赛是个人笔试赛，覆盖数学分析、高等代数等核心课程。它不靠代码，考的是定义的准确、推导的完整与计算的稳定。',
      en: 'CMC is an individual written contest covering analysis, algebra and other core courses. No code: it rewards precise definitions, complete proofs and reliable computation.'
    },
    format: {
      zh: '个人闭卷笔试，按专业组与非专业组分开命题，通常包含计算题与证明题。',
      en: 'Individual closed-book written exam, split into major and non-major tracks, usually mixing computations and proofs.'
    },
    prepWeeks: { zh: '8–10 周', en: '8–10 weeks' },
    weekly: { zh: '每周 5–8 小时', en: '5–8 h / week' },
    prereq: {
      zh: '数学分析、高等代数；能独立完成证明题；对极限、连续、线性空间等概念有清晰图像。',
      en: 'Analysis and algebra; able to write proofs independently; clear pictures of limits, continuity and linear spaces.'
    },
    roles: [{ zh: '个人赛', en: 'Individual' }],
    skills: [
      { zh: '数学分析', en: 'Analysis' },
      { zh: '高等代数', en: 'Algebra' },
      { zh: '证明', en: 'Proof' },
      { zh: '计算', en: 'Computation' }
    ],
    prep: [
      { zh: '按课程章节整理定义、定理与反例，形成一页纸索引。', en: 'Build a one-page index of definitions, theorems and counterexamples by chapter.' },
      { zh: '限时做整套真题，重点练证明题的书写结构。', en: 'Do full past papers under time, focusing on the structure of written proofs.' },
      { zh: '把错题按概念型、计算型、技巧型分类，分别补。', en: 'Sort mistakes into conceptual, computational and trick types, then patch each separately.' }
    ],
    tips: [
      { zh: '证明题先写清已知与目标，再选工具；跳步是最常见的失分原因。', en: 'State what is given and what must be shown before choosing a tool; skipped steps lose most marks.' },
      { zh: '计算题留出检查时间，量纲、符号与边界条件各查一遍。', en: 'Reserve checking time for units, signs and boundary conditions.' }
    ],
    experience: {
      zh: '数学竞赛的收益是长期的：它训练你把一个模糊的想法写成可检查的推导。即使不拿奖，这门能力也会回到你的算法、建模与论文里。',
      en: 'The return on a maths contest is long term: it trains you to turn a vague idea into a checkable derivation. Even without an award, the skill returns in algorithms, modelling and papers.'
    },
    links: [
      { label: 'CMC', url: 'https://www.cmathc.cn/' },
      { label: '中国数学会', url: 'https://www.cms.org.cn/' }
    ]
  },
  {
    id: 'ctf',
    name: { zh: 'CTF 网络安全竞赛', en: 'Capture The Flag' },
    abbr: 'CTF',
    cat: 'security', stage: 'open', level: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年，国内外赛事密集', en: 'Year-round, with dense international calendars' },
    summary: {
      zh: 'CTF 把安全知识拆成可解的题目：Web、Pwn、Reverse、Crypto、Misc 各有独立的知识栈。解题赛与攻防赛是两种完全不同的节奏。',
      en: 'CTF turns security into solvable tasks: Web, Pwn, Reverse, Crypto and Misc each have their own stack. Jeopardy and attack-defence are two very different rhythms.'
    },
    format: {
      zh: '分解题赛（Jeopardy）与攻防赛（AWD）。解题赛按方向分为 Web、Pwn、Reverse、Crypto、Misc。',
      en: 'Jeopardy-style and attack-defence (AWD). Jeopardy tracks: Web, Pwn, Reverse, Crypto, Misc.'
    },
    prepWeeks: { zh: '12 周以上，按方向计', en: '12+ weeks per track' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week' },
    prereq: {
      zh: 'Linux 与网络基础；Python 脚本；选定一个方向的基础工具链。',
      en: 'Linux and networking basics; Python scripting; a basic toolchain in one chosen track.'
    },
    roles: [
      { zh: 'Web', en: 'Web' },
      { zh: 'Pwn', en: 'Pwn' },
      { zh: 'Reverse', en: 'Reverse' },
      { zh: 'Crypto', en: 'Crypto' }
    ],
    skills: [
      { zh: 'Web', en: 'Web' },
      { zh: '逆向', en: 'Reverse' },
      { zh: '密码学', en: 'Crypto' },
      { zh: '二进制', en: 'Binary' },
      { zh: '取证', en: 'Forensics' }
    ],
    prep: [
      { zh: '先选一个方向深挖三个月，再横向了解其他方向的基础工具。', en: 'Go deep in one track for three months, then learn the basic tooling of the others.' },
      { zh: '每道题写 writeup：环境、思路、脚本、失败路径。', en: 'Write a proper write-up per challenge: environment, idea, script, dead ends.' },
      { zh: '用 picoCTF 或靶场做入门，再上 CTFtime 找同难度赛事。', en: 'Start on picoCTF or a practice range, then use CTFtime to find comparable events.' }
    ],
    tips: [
      { zh: '先选定一个方向深挖，全栈新手的通病是五个方向都学一点、比赛时都不够用。', en: 'Pick one track and go deep; spreading across five tracks leaves you short in all of them.' },
      { zh: '写清楚 writeup，比赛之外它才是你真正的成长记录。', en: 'Write proper write-ups — outside the contest they are the real record of progress.' }
    ],
    experience: {
      zh: 'CTF 最容易犯的错是「五个方向都学一点」。先在一个方向做出十道题的 writeup，再横向扩展；招聘方也更看重深度与能否讲清原理。',
      en: 'The classic CTF mistake is learning a little of all five tracks. Produce ten write-ups in one track before expanding; employers value depth and the ability to explain the mechanism.'
    },
    links: [
      { label: 'CTFtime', url: 'https://ctftime.org/' },
      { label: 'picoCTF', url: 'https://picoctf.org/' }
    ]
  },
  {
    id: 'tianchi',
    name: { zh: '天池大赛', en: 'Tianchi Competitions' },
    abbr: '天池',
    cat: 'ai', stage: 'open', level: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年多场，常见于暑期', en: 'Several per year, often in summer' },
    summary: {
      zh: '天池是阿里云主办的数据与 AI 竞赛平台，赛题多来自真实业务场景，通常提供算力与中文赛题文档。它适合从公开数据集过渡到工业问题。',
      en: 'Tianchi is Alibaba Cloud’s data and AI competition platform, with problems drawn from real business settings and compute plus Chinese documentation provided. It bridges open datasets and industrial problems.'
    },
    format: {
      zh: '阿里云主办的数据与 AI 竞赛，中文界面、提供算力，赛题多来自真实业务场景。',
      en: 'Alibaba Cloud’s data and AI competitions: Chinese UI, compute provided, problems drawn from real business settings.'
    },
    prepWeeks: { zh: '6–10 周', en: '6–10 weeks' },
    weekly: { zh: '每周 6–8 小时', en: '6–8 h / week' },
    prereq: {
      zh: 'Python 数据处理；机器学习基础；能读懂业务指标与提交格式。',
      en: 'Python data handling; machine-learning basics; able to read a business metric and a submission format.'
    },
    roles: [
      { zh: '数据', en: 'Data' },
      { zh: '模型', en: 'Model' },
      { zh: '工程', en: 'Engineering' }
    ],
    skills: [
      { zh: '数据处理', en: 'Data pipelines' },
      { zh: '机器学习', en: 'Machine learning' },
      { zh: '推荐系统', en: 'Recommenders' },
      { zh: 'NLP', en: 'NLP' },
      { zh: '工程化', en: 'Engineering' }
    ],
    prep: [
      { zh: '先把数据读取与特征管道写成可复用脚本，别在 notebook 里重复粘贴。', en: 'Build a reusable loading and feature pipeline instead of pasting cells in a notebook.' },
      { zh: '逐字读指标定义与提交格式，很多失分来自理解偏差。', en: 'Read the metric definition and submission format word by word; most losses come from misreading them.' },
      { zh: '用线上反馈做小步实验，控制每次提交的变量数量。', en: 'Run small experiments against the leaderboard and limit variables per submission.' }
    ],
    tips: [
      { zh: '平台给的数据量通常较大，先把读取与特征管道写成可复用的脚本。', en: 'Datasets are large; build a reusable loading and feature pipeline first.' },
      { zh: '赛题常有业务背景文档，读懂指标定义比调参更重要。', en: 'Read the metric definition carefully — it usually beats hyper-parameter tuning.' }
    ],
    experience: {
      zh: '天池的赛题常有真实业务背景。先搞清楚指标的业务含义，再谈模型；很多高分方案赢在对数据的理解，而不是更复杂的网络。',
      en: 'Tianchi problems often come from real business settings. Understand what the metric means before choosing a model; many top solutions win on data understanding, not a bigger network.'
    },
    links: [{ label: 'Tianchi', url: 'https://tianchi.aliyun.com/competition' }]
  },
  {
    id: 'neurips-comp',
    name: { zh: 'NeurIPS 竞赛轨道', en: 'NeurIPS Competitions Track' },
    abbr: 'NeurIPS',
    cat: 'ai', stage: 'postgrad', level: 3,
    months: [5, 6, 7, 8, 9, 10],
    season: { zh: '春夏发布任务，秋季截止，12 月会议报告', en: 'Tasks launch spring–summer, close in autumn, reported in December' },
    summary: {
      zh: 'NeurIPS 的竞赛轨道把前沿研究问题包装成可评测的任务，参赛者通常在公开排行榜上迭代方法，最终在会议上报告结果。它更接近一次短周期的研究项目。',
      en: 'The NeurIPS competitions track packages frontier research questions as evaluable tasks. Teams iterate on public leaderboards and report results at the conference — closer to a short research project.'
    },
    format: {
      zh: '线上任务与排行榜为主，部分赛题要求提交技术报告或代码；任务由不同研究团队主办，托管平台不统一。',
      en: 'Mostly online tasks and leaderboards, sometimes with a technical report or code submission. Hosting platforms vary by organiser.'
    },
    prepWeeks: { zh: '12–20 周', en: '12–20 weeks' },
    weekly: { zh: '每周 10–15 小时', en: '10–15 h / week' },
    prereq: {
      zh: '深度学习与实验设计；能复现论文；有可用算力；能写英文技术报告。',
      en: 'Deep learning and experiment design; able to reproduce papers; available compute; able to write an English technical report.'
    },
    roles: [
      { zh: '复现', en: 'Reproduction' },
      { zh: '训练', en: 'Training' },
      { zh: '报告', en: 'Report' }
    ],
    skills: [
      { zh: '深度学习', en: 'Deep learning' },
      { zh: '实验设计', en: 'Experiment design' },
      { zh: '论文复现', en: 'Reproduction' },
      { zh: '工程实现', en: 'Engineering' }
    ],
    prep: [
      { zh: '先读任务定义与评价指标，确认数据切分和提交约束。', en: 'Read the task definition and metric first, and confirm splits and submission constraints.' },
      { zh: '复现一个强 baseline，再决定是改模型、改数据还是改训练策略。', en: 'Reproduce a strong baseline before deciding whether to change the model, the data or the training recipe.' },
      { zh: '把实验写成可复现的配置，记录随机种子与硬件环境。', en: 'Keep experiments as reproducible configs with seeds and hardware recorded.' }
    ],
    tips: [
      { zh: '排行榜分数不是全部，主办方常看技术报告的方法清晰度与可复现性。', en: 'Leaderboard score is not everything; organisers often weigh clarity and reproducibility of the report.' },
      { zh: '先确认算力预算，再选模型规模；很多方案败在训练不完。', en: 'Set the compute budget before choosing model size; many plans fail simply by not finishing training.' }
    ],
    experience: {
      zh: 'NeurIPS 竞赛更像一次短周期研究：问题定义、baseline、消融、报告缺一不可。提前确认算力与截止时间，比临场换模型更重要。',
      en: 'A NeurIPS competition is a short research project: problem definition, baseline, ablations and report all matter. Confirm compute and deadlines early; that beats switching models at the last minute.'
    },
    links: [
      { label: 'NeurIPS', url: 'https://neurips.cc/' },
      { label: 'AIcrowd', url: 'https://www.aicrowd.com/' }
    ]
  },
  {
    id: '4c',
    name: { zh: '中国大学生计算机设计大赛', en: 'Chinese Collegiate Computing Competition' },
    abbr: '4C',
    cat: 'design', stage: 'lower', level: 1,
    months: [3, 4, 5, 6, 7],
    season: { zh: '校赛 3–4 月，省赛 5 月，国赛 7 月', en: 'Campus Mar–Apr, provincial May, national July' },
    summary: {
      zh: '中国大学生计算机设计大赛覆盖软件、AI、物联网、数字媒体等多个赛道，通常以三人以内团队提交作品与文档。它强调的是完整度、可展示性与真实使用场景。',
      en: 'The 4C contest spans software, AI, IoT and digital media tracks, with small teams submitting a working piece plus documentation. Completeness, demonstrability and a real use case matter most.'
    },
    format: {
      zh: '团队报名，按赛道提交作品、设计文档与演示材料；通常经过校赛、省赛、国赛三级选拔。',
      en: 'Team entry with a project, design document and demo materials, selected through campus, provincial and national rounds.'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks' },
    weekly: { zh: '每周 5–8 小时', en: '5–8 h / week' },
    prereq: {
      zh: '一门开发技术；基本的界面与交互设计能力；能写清需求、设计与测试文档。',
      en: 'One development stack; basic interface and interaction design; able to write requirements, design and test documents.'
    },
    roles: [
      { zh: '设计', en: 'Design' },
      { zh: '开发', en: 'Development' },
      { zh: '文档', en: 'Documentation' }
    ],
    skills: [
      { zh: '作品设计', en: 'Product design' },
      { zh: '工程实现', en: 'Engineering' },
      { zh: '文档', en: 'Documentation' },
      { zh: '演示', en: 'Demo' },
      { zh: '团队协作', en: 'Teamwork' }
    ],
    prep: [
      { zh: '先确定赛道与评审口径，再决定技术栈，别反过来。', en: 'Choose the track and judging criteria before the stack, not after.' },
      { zh: '把作品做成可演示的最小闭环，文档与演示视频同步推进。', en: 'Build a demonstrable minimum loop and develop the document and demo video alongside it.' },
      { zh: '至少找一位非队友做盲测，记录他们卡住的地方。', en: 'Run a blind test with someone outside the team and record where they get stuck.' }
    ],
    tips: [
      { zh: '评委看不到你的代码结构，先用三分钟演示讲清「谁在什么场景下用它」。', en: 'Judges will not read your architecture first — open with three minutes on who uses it and when.' },
      { zh: '文档里的截图、流程图与测试记录，往往比多写一个功能更能拉开差距。', en: 'Screenshots, diagrams and test records in the document often separate teams more than one extra feature.' }
    ],
    experience: {
      zh: '4C 的评委先看作品能不能演示，再看文档能不能复现。把三分钟演示打磨好，比多加一个没人会用的功能更有效。',
      en: '4C judges first ask whether the work can be demonstrated, then whether the document lets them reproduce it. A polished three-minute demo beats one more unused feature.'
    },
    links: [{ label: '4C', url: 'https://jsjds.blcu.edu.cn/' }]
  },
  {
    id: 'huawei-software',
    name: { zh: '华为软件精英挑战赛', en: 'Huawei Software Elite Challenge' },
    abbr: '华为软挑',
    cat: 'algorithm', stage: 'upper', level: 3,
    months: [3, 4, 5],
    season: { zh: '每年 3–5 月，线上初赛、区域赛与总决赛', en: 'March–May: online, regional and final rounds' },
    summary: {
      zh: '华为软件精英挑战赛把算法题放进真实工程约束里：不仅要算得对，还要在时限、内存与工程结构上站得住。它更像一次被压缩到几周的工业项目。',
      en: 'The Huawei Software Elite Challenge puts algorithmic problems inside real engineering constraints: correctness is only the start, with time limits, memory and structure also under test. It feels like an industrial project compressed into weeks.'
    },
    format: {
      zh: '三人一队，线上初赛、区域赛与总决赛；通常提交可运行代码、方案说明与性能结果，题目偏优化、调度与工程实现。',
      en: 'Teams of three through online, regional and final rounds; submissions usually include runnable code, a design note and performance results, with optimisation, scheduling and engineering at the core.'
    },
    prepWeeks: { zh: '10–12 周', en: '10–12 weeks' },
    weekly: { zh: '每周 8–12 小时', en: '8–12 h / week' },
    prereq: {
      zh: '扎实的算法与数据结构；C++/Java/Python 工程能力；会做性能分析与压测。',
      en: 'Solid algorithms and data structures; C++/Java/Python engineering; performance profiling and load testing.'
    },
    roles: [
      { zh: '算法', en: 'Algorithms' },
      { zh: '工程', en: 'Engineering' },
      { zh: '文档', en: 'Documentation' }
    ],
    skills: [
      { zh: '算法设计', en: 'Algorithm design' },
      { zh: '性能优化', en: 'Performance' },
      { zh: '工程实现', en: 'Engineering' },
      { zh: '调度', en: 'Scheduling' },
      { zh: '团队协作', en: 'Teamwork' }
    ],
    prep: [
      { zh: '先读清评分口径：正确性、性能与工程完整度各占多少，再决定优化顺序。', en: 'Read the scoring rules first: how much weight correctness, performance and engineering completeness carry, then order your work.' },
      { zh: '准备一套可复现的压测脚本，记录每次改动的正确率、耗时与内存。', en: 'Build a reproducible benchmark script and record correctness, runtime and memory after every change.' },
      { zh: '把方案文档当成交付物写：问题拆解、假设、实验对比、失败路径都要有。', en: 'Treat the design note as a deliverable: decomposition, assumptions, comparisons and dead ends.' }
    ],
    tips: [
      { zh: '先做稳定跑通的 baseline，再逐项优化；不要一开始就追最优解。', en: 'Get a stable baseline running before optimising item by item; do not chase the optimum first.' },
      { zh: '工程题最怕「本地能跑、评测崩溃」：边界、空输入、超大输入提前测。', en: 'The classic failure is “runs locally, crashes on the judge”: test empty, edge and oversized inputs early.' }
    ],
    experience: {
      zh: '软挑的评分往往同时看正确性、性能与工程完整度。比赛结束后，你的压测脚本、优化记录与方案文档，比名次更适合放进作品集。',
      en: 'The challenge scores correctness, performance and engineering completeness together. Afterwards, your benchmark scripts, optimisation log and design note are better portfolio material than the rank alone.'
    },
    links: [{ label: '华为云竞赛', url: 'https://competition.huaweicloud.com/' }]
  },
  {
    id: 'ciscn',
    name: { zh: '全国大学生信息安全竞赛', en: 'China Undergraduate Information Security Competition' },
    abbr: 'CISCN',
    cat: 'security', stage: 'upper', level: 2,
    months: [4, 5, 6, 7],
    season: { zh: '每年 4–7 月，初赛与决赛', en: 'April–July: preliminary and final rounds' },
    summary: {
      zh: '全国大学生信息安全竞赛是国内高校安全方向最有代表性的赛事之一，既有 CTF 解题，也有创新实践作品赛。它把「会做题」与「能做出东西」放在同一条评价线上。',
      en: 'CISCN is one of the most representative security contests for Chinese universities, combining CTF challenges with an innovation project track. It evaluates both solving and building.'
    },
    format: {
      zh: '三人一队，CTF 解题赛 + 作品赛；解题覆盖 Web、Pwn、Reverse、Crypto、Misc，作品赛需要提交完整的安全作品与文档。',
      en: 'Teams of three, with a CTF track and a project track. Challenges cover Web, Pwn, Reverse, Crypto and Misc; the project track requires a complete security artefact plus documentation.'
    },
    prepWeeks: { zh: '12–16 周', en: '12–16 weeks' },
    weekly: { zh: '每周 8–12 小时', en: '8–12 h / week' },
    prereq: {
      zh: 'Linux 与网络基础；至少一个安全方向的工具链；能写 writeup 与作品文档。',
      en: 'Linux and networking basics; a toolchain in at least one security track; able to write a write-up and project documentation.'
    },
    roles: [
      { zh: 'Web', en: 'Web' },
      { zh: 'Pwn', en: 'Pwn' },
      { zh: 'Reverse', en: 'Reverse' },
      { zh: '文档', en: 'Documentation' }
    ],
    skills: [
      { zh: 'Web', en: 'Web' },
      { zh: '二进制', en: 'Binary' },
      { zh: '逆向', en: 'Reverse' },
      { zh: '密码学', en: 'Crypto' },
      { zh: '安全开发', en: 'Secure development' }
    ],
    prep: [
      { zh: '先选定一个主方向，把常见漏洞、工具链与利用脚本练熟。', en: 'Pick one main track and get its common vulnerabilities, tools and exploit scripts fluent.' },
      { zh: '每周做一套真题并写 writeup，记录环境、思路、脚本与失败路径。', en: 'Do one past paper a week and write it up: environment, idea, script and dead ends.' },
      { zh: '如果参加作品赛，提前找真实场景，把安全价值与演示路径写清楚。', en: 'For the project track, find a real setting early and make the security value and demo path explicit.' }
    ],
    tips: [
      { zh: '解题赛与作品赛是两种能力：前者练深度，后者练完整度。', en: 'The CTF and project tracks test different abilities: depth versus completeness.' },
      { zh: '别在比赛现场第一次用新工具；把常用命令与脚本整理成一页速查。', en: 'Never use a new tool for the first time during a contest; keep common commands and scripts on one page.' }
    ],
    experience: {
      zh: 'CTF 的 writeup 与 CISCN 的作品文档，都是可以长期复用的资产。招聘方更关心你能否讲清一个漏洞的成因与修复，而不只是拿到 flag。',
      en: 'CTF write-ups and CISCN project documents are reusable assets. Employers care more about whether you can explain a vulnerability’s cause and fix than whether you captured a flag.'
    },
    links: [
      { label: 'CISCN', url: 'http://www.ciscn.cn/' },
      { label: 'CTFtime', url: 'https://ctftime.org/' }
    ]
  },
  {
    id: 'icpc-japan',
    name: { zh: 'ICPC 日本国内预选 / 亚洲区域赛', en: 'ICPC Japan Domestic / Asia Regional', ja: 'ICPC 日本国内予選 / アジア地区大会' },
    abbr: 'ICPC JP',
    jp: true,
    cat: 'algorithm', stage: 'upper', level: 3,
    months: [6, 7, 8, 9, 10, 11],
    season: { zh: '国内预选 6–7 月，亚洲区域赛 9–11 月', en: 'Domestic preliminary Jun–Jul, Asia regional Sep–Nov' },
    summary: {
      zh: 'ICPC 日本国内预选是日本队伍进入亚洲区域赛的主要通道，赛制与 ICPC 一致：三人一机五小时，按题数与罚时排名。',
      en: 'The ICPC Japan domestic preliminary is the main route into the Asia regionals, using the standard three-person, one-machine, five-hour format ranked by solves and penalty.'
    },
    format: {
      zh: '三人一队、一台电脑、五小时；国内预选胜出后参加亚洲区域赛，题型覆盖图论、DP、几何与构造。',
      en: 'Three students, one computer, five hours; successful teams advance to the Asia regional. Problems span graphs, DP, geometry and construction.'
    },
    prepWeeks: { zh: '12–16 周', en: '12–16 weeks' },
    weekly: { zh: '每周 8–12 小时', en: '8–12 h / week' },
    prereq: {
      zh: 'C++ 与 STL 熟练；掌握图论、DP、数据结构与几何基础；能读英文题面并做对拍。',
      en: 'Fluent C++ and STL; graphs, DP, data structures and basic geometry; English statements and stress testing.'
    },
    roles: [
      { zh: '读题', en: 'Reader' },
      { zh: '主码', en: 'Coder' },
      { zh: '验证', en: 'Verifier' }
    ],
    skills: [
      { zh: '图论', en: 'Graphs' },
      { zh: '动态规划', en: 'DP' },
      { zh: '计算几何', en: 'Geometry' },
      { zh: '构造', en: 'Construction' }
    ],
    prep: [
      { zh: '按 ICPC 区域赛题单做虚拟赛，固定三人分工与罚时纪律。', en: 'Run virtual contests from regional problem sets with fixed roles and penalty discipline.' },
      { zh: '把日本预选近年的题解逐题复盘，记录读题和实现上的失误。', en: 'Review recent Japan preliminary editorials problem by problem and log reading/implementation errors.' },
      { zh: '赛前统一模板仓库，只允许增量修改。', en: 'Freeze one shared template repository before the contest.' }
    ],
    tips: [
      { zh: '日本预选题目阅读量不大，但英文/日文题面细节多，先确认输入输出再动手。', en: 'Statements are not long, but details matter — confirm I/O before coding.' },
      { zh: '罚时决定排名，能过的题不要反复提交。', en: 'Penalty decides ranking; do not resubmit problems you can already pass.' }
    ],
    experience: {
      zh: '日本预选是检验队伍基本功的场合：真正的差距往往在读题速度、模板稳定性和提交纪律，而不是某道神题。',
      en: 'The Japan preliminary tests fundamentals: reading speed, template stability and submission discipline matter more than one exotic problem.'
    },
    links: [{ label: 'ICPC Japan', url: 'https://icpc.iisf.or.jp/' }]
  },
  {
    id: 'jag',
    name: { zh: 'JAG 程序设计竞赛', en: 'JAG Programming Contest', ja: 'JAG プログラミングコンテスト' },
    abbr: 'JAG',
    jp: true,
    cat: 'algorithm', stage: 'open', level: 2,
    months: [9, 10, 11, 12],
    season: { zh: '每年秋季多场，具体以官网为准', en: 'Several autumn contests; check the official calendar' },
    summary: {
      zh: 'JAG 由日本 ICPC OB 组织，题目风格接近 ICPC，难度跨度大，适合日本国内队伍在区域赛前后练兵。',
      en: 'JAG is organised by Japanese ICPC alumni. Problems are close to ICPC style with a wide difficulty range, making it useful practice around the regional season.'
    },
    format: {
      zh: '团队赛，通常三人一机、数小时，题目从入门到高阶混合，赛后常公开题解。',
      en: 'Team contest, usually three people on one machine for several hours, mixing introductory and advanced problems with public editorials afterwards.'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week' },
    prereq: {
      zh: '熟悉 ICPC 赛制；至少两人能稳定实现图论/DP；能读英文或日文题面。',
      en: 'ICPC format familiarity; at least two members fluent in graph/DP implementation; English or Japanese statements.'
    },
    roles: [
      { zh: '读题', en: 'Reader' },
      { zh: '主码', en: 'Coder' },
      { zh: '验证', en: 'Verifier' }
    ],
    skills: [
      { zh: '图论', en: 'Graphs' },
      { zh: 'DP', en: 'DP' },
      { zh: '数学', en: 'Maths' },
      { zh: '实现', en: 'Implementation' }
    ],
    prep: [
      { zh: '按 JAG 历年题单做 2–3 场虚拟赛，适应日本题目的表达方式。', en: 'Run two or three virtual contests from JAG archives to get used to Japanese phrasing.' },
      { zh: '把队伍的读题与提交流程固定下来，减少无谓罚时。', en: 'Fix the team’s reading and submission routine to cut needless penalty.' },
      { zh: '赛后按题解补题，重点记录卡住的观察点。', en: 'Upsolve with editorials and record the observation that was missing.' }
    ],
    tips: [
      { zh: 'JAG 题目难度跳跃明显，先快速扫一遍再决定主攻方向。', en: 'Difficulty jumps sharply; scan first, then choose the main direction.' },
      { zh: '日本题面常把关键条件写在段落里，别只看样例。', en: 'Key conditions often sit inside paragraphs; do not rely on samples alone.' }
    ],
    experience: {
      zh: 'JAG 很适合练习“快速判断题目值不值得做”。比赛里最贵的不是难题，而是把时间投在错误的方向上。',
      en: 'JAG is good practice for judging whether a problem is worth attempting. The expensive mistake is spending time in the wrong direction.'
    },
    links: [{ label: 'JAG', url: 'https://jag-icpc.org/' }]
  },
  {
    id: 'past',
    name: { zh: 'AtCoder PAST 编程能力测试', en: 'AtCoder PAST', ja: 'AtCoder PAST プログラミング能力検定' },
    abbr: 'PAST',
    jp: true,
    cat: 'algorithm', stage: 'lower', level: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年多场，具体以 AtCoder 公告为准', en: 'Several sessions a year; check AtCoder announcements' },
    summary: {
      zh: 'PAST 是 AtCoder 主办的编程能力测试，题目从基础语法到进阶算法分级排列，适合作为日语环境下的算法入门与自测。',
      en: 'PAST is AtCoder’s programming ability test, graded from basic syntax to advanced algorithms. It is a good entry point and self-check in a Japanese environment.'
    },
    format: {
      zh: '个人赛，约 90 分钟、12 题，难度逐级上升；可用 C/C++、Python、Java 等语言。',
      en: 'Individual, about 90 minutes and 12 problems of rising difficulty; C/C++, Python, Java and other languages are allowed.'
    },
    prepWeeks: { zh: '4–6 周', en: '4–6 weeks' },
    weekly: { zh: '每周 3–5 小时', en: '3–5 h / week' },
    prereq: {
      zh: '一门语言的基础语法；数组、字符串、循环与函数；能读懂日文或英文题面。',
      en: 'Basic syntax in one language; arrays, strings, loops and functions; Japanese or English statements.'
    },
    roles: [{ zh: '个人赛', en: 'Individual' }],
    skills: [
      { zh: '基础语法', en: 'Syntax' },
      { zh: '模拟', en: 'Simulation' },
      { zh: '排序', en: 'Sorting' },
      { zh: '基础 DP', en: 'Basic DP' }
    ],
    prep: [
      { zh: '先做 PAST 的入门级题目，确保每题都能独立写完整程序。', en: 'Start with entry-level PAST problems and write each program end to end.' },
      { zh: '按题号记录错误类型：读题、边界、实现、复杂度。', en: 'Log error types by problem: reading, edges, implementation, complexity.' },
      { zh: '用计时器模拟 90 分钟，练习先拿稳简单分。', en: 'Simulate 90 minutes and bank the easy points first.' }
    ],
    tips: [
      { zh: 'PAST 的题号就是难度梯度，前面卡住时先跳过，别影响整体得分。', en: 'Problem order is a difficulty ladder; skip a blocker and protect the total score.' },
      { zh: '边界条件比算法技巧更常丢分，写完先测空输入和最小值。', en: 'Edge cases lose more points than advanced tricks; test empty and minimum inputs.' }
    ],
    experience: {
      zh: 'PAST 适合建立“完整写完一题”的信心。它不追求神题，而是检查你的基础是否真的能落地。',
      en: 'PAST builds confidence in finishing a problem completely. It checks whether your fundamentals actually work, not whether you know an exotic trick.'
    },
    links: [{ label: 'PAST', url: 'https://past.atcoder.jp/' }]
  },
  {
    id: 'ahc',
    name: { zh: 'AtCoder Heuristic Contest', en: 'AtCoder Heuristic Contest', ja: 'AtCoder Heuristic Contest' },
    abbr: 'AHC',
    jp: true,
    cat: 'algorithm', stage: 'open', level: 3,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年多场，通常数小时到数天', en: 'Several per year, from hours to days' },
    summary: {
      zh: 'AHC 是启发式优化赛：没有唯一正确答案，选手提交程序在时限内产生尽可能好的解，评分器给出相对分数。',
      en: 'AHC is a heuristic optimisation contest: there is no single correct answer; programs produce the best solution they can within the time limit and a scorer ranks them.'
    },
    format: {
      zh: '个人或团队线上赛，给定问题与评分器，提交可执行程序；通常按相对得分排名，赛后可交流解法。',
      en: 'Individual or team online contest with a problem and scorer; submit an executable program, ranked by relative score, with solution discussion afterwards.'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week' },
    prereq: {
      zh: '熟练一门语言；理解复杂度与随机化；会做局部搜索、模拟退火或贪心构造。',
      en: 'One fluent language; complexity and randomness; local search, simulated annealing or greedy construction.'
    },
    roles: [{ zh: '个人/小队', en: 'Individual / small team' }],
    skills: [
      { zh: '启发式搜索', en: 'Heuristics' },
      { zh: '模拟退火', en: 'Annealing' },
      { zh: '优化', en: 'Optimisation' },
      { zh: '工程实现', en: 'Engineering' }
    ],
    prep: [
      { zh: '先写一个稳定可行的贪心解，再逐步加局部搜索。', en: 'Write a stable greedy solution first, then add local search.' },
      { zh: '建立本地评分器与多组随机种子，避免只看单次结果。', en: 'Build a local scorer and multiple seeds; never judge from one run.' },
      { zh: '记录每次改动的分数分布，控制实验变量。', en: 'Log score distributions per change and control variables.' }
    ],
    tips: [
      { zh: 'AHC 的分数是相对的，先保证程序稳定运行，再追求高分。', en: 'Scores are relative; keep the program stable before chasing a high score.' },
      { zh: '时间预算和随机种子要写进提交策略，别把时间浪费在无效搜索上。', en: 'Put time budgets and seeds into the strategy; avoid wasted search.' }
    ],
    experience: {
      zh: 'AHC 和传统算法题是两种能力：它更像工程优化，要求你在不确定的搜索空间里做实验、评估和取舍。',
      en: 'AHC tests a different skill from standard algorithm problems: engineering optimisation, experimentation and trade-offs in an uncertain search space.'
    },
    links: [{ label: 'AtCoder', url: 'https://atcoder.jp/' }]
  },
  {
    id: 'seccon',
    name: { zh: 'SECCON CTF', en: 'SECCON CTF', ja: 'SECCON CTF' },
    abbr: 'SECCON',
    jp: true,
    cat: 'security', stage: 'open', level: 3,
    months: [6, 7, 8, 9, 10, 11, 12],
    season: { zh: '每年预选与决赛，具体以官网为准', en: 'Annual qualifiers and finals; check the official site' },
    summary: {
      zh: 'SECCON 是日本最具代表性的安全竞赛之一，题目覆盖 Web、Pwn、Reverse、Crypto、Misc，质量高、风格偏实战。',
      en: 'SECCON is one of Japan’s most representative security contests, covering Web, Pwn, Reverse, Crypto and Misc with high-quality, practical challenges.'
    },
    format: {
      zh: '团队 CTF，预选通常为线上解题赛，决赛为线下/攻防形式；题目公开后社区会写大量 writeup。',
      en: 'Team CTF: online Jeopardy qualifiers and an onsite/attack-defence final. The community publishes many write-ups afterwards.'
    },
    prepWeeks: { zh: '12 周以上，按方向计', en: '12+ weeks per track' },
    weekly: { zh: '每周 8–12 小时', en: '8–12 h / week' },
    prereq: {
      zh: 'Linux 与网络基础；至少一个方向（Web/Pwn/Reverse/Crypto）的工具链；能写 writeup。',
      en: 'Linux and networking; a toolchain in at least one track (Web/Pwn/Reverse/Crypto); ability to write write-ups.'
    },
    roles: [
      { zh: 'Web', en: 'Web' },
      { zh: 'Pwn', en: 'Pwn' },
      { zh: 'Reverse', en: 'Reverse' },
      { zh: 'Crypto', en: 'Crypto' }
    ],
    skills: [
      { zh: 'Web', en: 'Web' },
      { zh: '二进制', en: 'Binary' },
      { zh: '逆向', en: 'Reverse' },
      { zh: '密码学', en: 'Crypto' },
      { zh: '取证', en: 'Forensics' }
    ],
    prep: [
      { zh: '先在一个方向做出 10 道题的 writeup，再横向扩展。', en: 'Produce ten write-ups in one track before expanding.' },
      { zh: '每周做一套 SECCON 历年题，按方向归档。', en: 'Do one SECCON past set a week and archive by track.' },
      { zh: '赛前整理常用脚本与命令，避免现场第一次用工具。', en: 'Prepare scripts and commands beforehand; never use a tool for the first time live.' }
    ],
    tips: [
      { zh: 'SECCON 题目常把多个小知识点串起来，先拆解再动手。', en: 'SECCON problems chain small ideas; decompose before exploiting.' },
      { zh: 'writeup 是长期资产，比赛结束不等于学习结束。', en: 'A write-up is a long-term asset; the contest is not the end of the learning.' }
    ],
    experience: {
      zh: 'SECCON 的价值在于题目设计：它逼你理解漏洞成因与利用链，而不是只记工具命令。',
      en: 'SECCON’s value is in its problem design: it forces you to understand causes and exploit chains, not just tool commands.'
    },
    links: [
      { label: 'SECCON', url: 'https://www.seccon.jp/' },
      { label: 'CTFtime', url: 'https://ctftime.org/' }
    ]
  },
  {
    id: 'ai-cup',
    name: { zh: 'AI CUP 日本 AI 竞赛', en: 'AI CUP Japan', ja: 'AI CUP' },
    abbr: 'AI CUP',
    jp: true,
    cat: 'ai', stage: 'open', level: 2,
    months: [5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年多场，常见于夏季', en: 'Several per year, often in summer' },
    summary: {
      zh: 'AI CUP 是日本的 AI/数据竞赛平台，赛题多来自企业与研究机构的真实问题，适合练习从数据理解到模型提交的完整流程。',
      en: 'AI CUP is a Japanese AI/data competition platform with problems from companies and research institutes, ideal for a full pipeline from data understanding to submission.'
    },
    format: {
      zh: '线上提交预测结果或模型，按排行榜评分；部分赛题要求最终答辩或代码审查。',
      en: 'Submit predictions or models online and rank on a leaderboard; some tracks require a final presentation or code review.'
    },
    prepWeeks: { zh: '6–10 周', en: '6–10 weeks' },
    weekly: { zh: '每周 6–8 小时', en: '6–8 h / week' },
    prereq: {
      zh: 'Python 数据处理；机器学习基础；能读日文/英文赛题与指标定义。',
      en: 'Python data handling; machine-learning basics; Japanese/English statements and metric definitions.'
    },
    roles: [
      { zh: '数据', en: 'Data' },
      { zh: '建模', en: 'Modelling' },
      { zh: '验证', en: 'Validation' }
    ],
    skills: [
      { zh: '数据处理', en: 'Data pipelines' },
      { zh: '机器学习', en: 'Machine learning' },
      { zh: '特征工程', en: 'Features' },
      { zh: '可视化', en: 'Visualisation' }
    ],
    prep: [
      { zh: '先复现官方 baseline，再改一个变量做对比。', en: 'Reproduce the official baseline, then change one variable at a time.' },
      { zh: '逐字读指标定义和提交格式，避免格式扣分。', en: 'Read the metric and submission format word by word.' },
      { zh: '把数据读取与特征管道写成可复用脚本。', en: 'Build reusable loading and feature scripts.' }
    ],
    tips: [
      { zh: '日本赛题常给业务背景文档，先理解场景再建模。', en: 'Japanese tracks often include business context; understand it before modelling.' },
      { zh: '排行榜之外，最终答辩也看方法解释与可复现性。', en: 'Beyond the leaderboard, final presentations judge explanation and reproducibility.' }
    ],
    experience: {
      zh: 'AI CUP 适合练习“把模型讲清楚”：数据、指标、验证和业务价值缺一不可。',
      en: 'AI CUP trains you to explain a model: data, metric, validation and business value all matter.'
    },
    links: [{ label: 'AI CUP', url: 'https://www.ai-cup.jp/' }]
  },
  {
    id: 'signate',
    name: { zh: 'SIGNATE 数据科学竞赛', en: 'SIGNATE', ja: 'SIGNATE' },
    abbr: 'SIGNATE',
    jp: true,
    cat: 'data', stage: 'open', level: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年滚动', en: 'Rolling all year' },
    summary: {
      zh: 'SIGNATE 是日本的数据科学竞赛平台，既有入门练习也有企业赛题，适合从表格数据与基础模型开始。',
      en: 'SIGNATE is a Japanese data-science competition platform with beginner exercises and company tracks, a good start with tabular data and basic models.'
    },
    format: {
      zh: '线上提交预测文件，按排行榜评分；题目通常提供训练数据、评价指标与提交样例。',
      en: 'Submit prediction files online and rank on a leaderboard; tasks usually provide training data, a metric and a sample submission.'
    },
    prepWeeks: { zh: '4–8 周', en: '4–8 weeks' },
    weekly: { zh: '每周 4–6 小时', en: '4–6 h / week' },
    prereq: {
      zh: 'Python/pandas 基础；理解训练/验证切分；会用一个 baseline 模型。',
      en: 'Python/pandas basics; train/validation splits; one baseline model.'
    },
    roles: [{ zh: '个人/小队', en: 'Individual / small team' }],
    skills: [
      { zh: '表格数据', en: 'Tabular data' },
      { zh: '特征工程', en: 'Features' },
      { zh: '交叉验证', en: 'Validation' },
      { zh: '可视化', en: 'Visualisation' }
    ],
    prep: [
      { zh: '从入门赛开始，完整走一遍读取、切分、训练、提交。', en: 'Start with a beginner track and complete loading, splitting, training and submission.' },
      { zh: '固定验证集，记录每次特征改动的分数。', en: 'Fix a validation set and log scores after each feature change.' },
      { zh: '读讨论区的公开解法，但先自己写 baseline。', en: 'Read public solutions, but write your own baseline first.' }
    ],
    tips: [
      { zh: 'SIGNATE 的入门题很适合练 pandas 和验证流程，不要一开始追复杂模型。', en: 'Beginner tracks are ideal for pandas and validation; do not chase complex models first.' },
      { zh: '提交前检查行数、列名和缺失值，格式错误会直接失败。', en: 'Check row count, columns and missing values before submitting.' }
    ],
    experience: {
      zh: 'SIGNATE 的回报是流程感：你会逐渐知道一个数据项目从读取到提交需要哪些检查点。',
      en: 'SIGNATE builds process intuition: you learn the checkpoints a data project needs from loading to submission.'
    },
    links: [{ label: 'SIGNATE', url: 'https://signate.jp/' }]
  },
  {
    id: 'nishika',
    name: { zh: 'Nishika 数据竞赛', en: 'Nishika', ja: 'Nishika' },
    abbr: 'Nishika',
    jp: true,
    cat: 'data', stage: 'open', level: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年滚动', en: 'Rolling all year' },
    summary: {
      zh: 'Nishika 是日本的数据竞赛平台，题目偏入门与实战，社区会分享公开 notebook 和解法，适合第一次参加数据竞赛。',
      en: 'Nishika is a Japanese data-competition platform with beginner-friendly and practical tasks; public notebooks and solutions make it a good first data contest.'
    },
    format: {
      zh: '线上提交预测结果，按排行榜评分；题目通常附数据说明与评价指标。',
      en: 'Submit predictions online and rank on a leaderboard; tasks include data notes and a metric.'
    },
    prepWeeks: { zh: '4–6 周', en: '4–6 weeks' },
    weekly: { zh: '每周 3–5 小时', en: '3–5 h / week' },
    prereq: {
      zh: 'Python/pandas 基础；能读日文或英文数据说明；理解基本回归/分类。',
      en: 'Python/pandas basics; Japanese or English data notes; basic regression/classification.'
    },
    roles: [{ zh: '个人/小队', en: 'Individual / small team' }],
    skills: [
      { zh: '数据清洗', en: 'Cleaning' },
      { zh: '可视化', en: 'Visualisation' },
      { zh: '基础模型', en: 'Baseline models' },
      { zh: '验证', en: 'Validation' }
    ],
    prep: [
      { zh: '先复现一个公开 notebook，再独立重写一遍。', en: 'Reproduce a public notebook, then rewrite it independently.' },
      { zh: '用简单模型建立 baseline，记录本地分数。', en: 'Build a simple baseline and record the local score.' },
      { zh: '把提交格式检查写成脚本，减少低级错误。', en: 'Script the submission checks to avoid avoidable errors.' }
    ],
    tips: [
      { zh: 'Nishika 的社区分享很多，先学流程再学技巧。', en: 'The community shares a lot; learn the process before the tricks.' },
      { zh: '入门阶段不要堆模型，先把数据泄漏和验证切分搞清楚。', en: 'Do not stack models early; understand leakage and validation first.' }
    ],
    experience: {
      zh: 'Nishika 适合建立数据竞赛的第一套习惯：读数据、做 baseline、检查提交、复盘误差。',
      en: 'Nishika builds the first habits of data competitions: read data, baseline, check submission, review errors.'
    },
    links: [{ label: 'Nishika', url: 'https://www.nishika.com/' }]
  },
  {
    id: 'utpc',
    name: { zh: '东京大学程序设计竞赛', en: 'University of Tokyo Programming Contest', ja: '東京大学プログラミングコンテスト' },
    abbr: 'UTPC',
    cat: 'algorithm', stage: 'open', level: 3,
    months: [10, 11, 12],
    season: { zh: '多在秋冬，按年度公告', en: 'Usually autumn to winter; check the yearly announcement', ja: '例年は秋から冬。年度ごとの告知を確認' },
    summary: {
      zh: '东京大学主办、对校外队伍开放的组队赛，难度接近区域赛，题目偏重构造与实现精度。',
      en: 'A team contest hosted by the University of Tokyo and open to outside teams; difficulty sits near regional level, with emphasis on construction and implementation precision.',
      ja: '東京大学が主催し、学外チームも参加できるチーム戦。難易度はアジア地区予選に近く、構築寄りの考察と実装の精度が問われます。'
    },
    format: {
      zh: '三人一队、共用一台机器，线上进行；题面通常为英文或日文。',
      en: 'Three-person teams on one machine, online; statements are usually in English or Japanese.',
      ja: '3 人 1 チーム・1 台の計算機でオンライン参加。問題文は英語または日本語で出題されます。'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks', ja: '8〜12 週間' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week', ja: '週 6〜10 時間' },
    prereq: {
      zh: '图论、动态规划与基础几何；能读英文题面。',
      en: 'Graphs, dynamic programming and basic geometry; able to read English statements.',
      ja: 'グラフ、動的計画法、基礎的な幾何。英語の問題文を読めること。'
    },
    roles: [
      { zh: '读题', en: 'Reader', ja: '読解' },
      { zh: '主码', en: 'Coder', ja: '実装' },
      { zh: '验证', en: 'Verifier', ja: '検証' }
    ],
    skills: [
      { zh: '图论', en: 'Graphs', ja: 'グラフ' },
      { zh: '动态规划', en: 'DP', ja: '動的計画法' },
      { zh: '构造', en: 'Construction', ja: '構築' },
      { zh: '团队协作', en: 'Teamwork', ja: 'チーム連携' }
    ],
    prep: [
      { zh: '先把区域赛常考的十类模型各做五题，整理成自己的模板。', en: 'Work five problems per common regional model and turn them into your own templates.', ja: '地区予選で頻出の十種類の型をそれぞれ五問ずつ解き、自分のテンプレートにします。' },
      { zh: '每周一次三人虚拟赛，固定读题—主码—验证的轮转。', en: 'Run one three-person virtual contest a week with a fixed reader–coder–verifier rotation.', ja: '週 1 回は 3 人での仮想コンテストを実施し、読解・実装・検証の担当を固定します。' },
      { zh: '赛后统计每题耗时与错因，找出最贵的坏习惯。', en: 'After each round, log time per problem and the cause of each miss to find the most expensive habit.', ja: '終了後に各問の所要時間と誤りの原因を記録し、最も高くつく癖を特定します。' }
    ],
    tips: [
      { zh: '先扫一遍题面再做，别把第一题做到完美才开始第二题。', en: 'Read every statement before committing; do not perfect problem one before opening problem two.', ja: '全問に目を通してから着手する。1 問目を完璧にしてから次へ、は危険です。' },
      { zh: '构造题先写暴力对拍，再优化，能省下大量调试时间。', en: 'On construction tasks, write a brute-force checker first and optimise after; it saves hours of debugging.', ja: '構築問題はまず全探索のチェッカーを書き、そのあと高速化するとデバッグ時間を大きく削れます。' }
    ],
    experience: {
      zh: 'UTPC 的价值在于暴露团队的真实分工问题：谁在读题、谁在写、谁在验证，比名次更能说明队伍状态。',
      en: 'UTPC exposes how a team actually splits work: who reads, who codes, who verifies. That says more about the team than the ranking.',
      ja: 'UTPC はチームの分業の実態を映します。誰が読み、誰が書き、誰が検証するかは、順位以上にチームの状態を語ります。'
    },
    links: [{ label: 'AtCoder コンテスト一覧', url: 'https://atcoder.jp/contests/' }]
  },
  {
    id: 'kupc',
    name: { zh: '京都大学程序设计竞赛', en: 'Kyoto University Programming Contest', ja: '京都大学プログラミングコンテスト' },
    abbr: 'KUPC',
    cat: 'algorithm', stage: 'open', level: 3,
    months: [11, 12],
    season: { zh: '多在冬季，按年度公告', en: 'Usually winter; check the yearly announcement', ja: '例年は冬。年度ごとの告知を確認' },
    summary: {
      zh: '京都大学学生社团主办的开放组队赛，题目风格偏数学与观察，常有需要先猜结论再证明的设计。',
      en: 'An open team contest run by Kyoto University students; tasks lean mathematical and observational, often requiring a guessed conclusion that must then be proved.',
      ja: '京都大学の学生団体が主催するオープンなチーム戦。数学寄り・観察寄りの出題が多く、結論を先に予想してから証明するタイプの問題が並びます。'
    },
    format: {
      zh: '三人一队，线上进行，难度从入门到区域赛上限分布较宽。',
      en: 'Three-person teams, online, with a wide spread from entry level to regional ceiling.',
      ja: '3 人 1 チームのオンライン開催。入門から地区予選上限まで難易度の幅が広いのが特徴です。'
    },
    prepWeeks: { zh: '8–12 周', en: '8–12 weeks', ja: '8〜12 週間' },
    weekly: { zh: '每周 6–8 小时', en: '6–8 h / week', ja: '週 6〜8 時間' },
    prereq: {
      zh: '组合数学、数论与基础博弈；习惯先写小规模暴力验证猜想。',
      en: 'Combinatorics, number theory and basic game theory; used to checking guesses with small brute force.',
      ja: '組合せ数学、整数論、基礎的なゲーム理論。小規模な全探索で予想を確かめる習慣。'
    },
    roles: [
      { zh: '读题', en: 'Reader', ja: '読解' },
      { zh: '主码', en: 'Coder', ja: '実装' },
      { zh: '验证', en: 'Verifier', ja: '検証' }
    ],
    skills: [
      { zh: '组合计数', en: 'Counting', ja: '数え上げ' },
      { zh: '数论', en: 'Number theory', ja: '整数論' },
      { zh: '构造', en: 'Construction', ja: '構築' },
      { zh: '证明', en: 'Proof', ja: '証明' }
    ],
    prep: [
      { zh: '建立“猜想—暴力—证明”的三步习惯，避免直接硬推。', en: 'Build a guess–brute-force–prove loop instead of pushing a derivation straight away.', ja: '「予想・全探索・証明」の三段階を習慣にし、いきなり式変形に走らないようにします。' },
      { zh: '把常见计数模型（容斥、生成函数、矩阵快速幂）写成可复用代码。', en: 'Turn common counting models — inclusion–exclusion, generating functions, matrix exponentiation — into reusable code.', ja: '包除原理、母関数、行列累乗など、よく使う数え上げの型を再利用できるコードにします。' },
      { zh: '练习把口头思路写成三行以内的说明，队内沟通会快很多。', en: 'Practise writing an idea in three lines or fewer; in-team communication speeds up a lot.', ja: '口頭のアイデアを三行以内のメモに落とす練習を。チーム内の伝達が格段に速くなります。' }
    ],
    tips: [
      { zh: '数学题先在小数据上打表，规律往往比推导更快出现。', en: 'On maths tasks, tabulate small cases first; the pattern usually appears faster than the derivation.', ja: '数学の問題はまず小さいケースで表を作る。規則性は式変形より早く見えることが多いです。' },
      { zh: '证明写不出来时先提交已验证的构造，把时间留给下一题。', en: 'If the proof stalls, submit the verified construction and move on.', ja: '証明が詰まったら、検証済みの構築を提出して次の問題へ移ります。' }
    ],
    experience: {
      zh: 'KUPC 训练的是“先观察再证明”的思维顺序，这种顺序在数学建模与研究里同样成立。',
      en: 'KUPC trains the order of observe first, prove second — an order that also holds in modelling and research.',
      ja: 'KUPC が鍛えるのは「まず観察し、次に証明する」順序。これは数理モデリングや研究でもそのまま通用します。'
    },
    links: [{ label: 'AtCoder コンテスト一覧', url: 'https://atcoder.jp/contests/' }]
  },
  {
    id: 'yukicoder',
    name: { zh: 'yukicoder 常规赛', en: 'yukicoder Contests', ja: 'yukicoder コンテスト' },
    abbr: 'yuki',
    cat: 'algorithm', stage: 'open', level: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年，几乎每周都有', en: 'Year-round, almost weekly', ja: '通年。ほぼ毎週開催' },
    summary: {
      zh: '日本本土的小规模评测平台，题目短、周期密，适合作为日常训练的固定节奏。',
      en: 'A Japanese judging platform with short tasks and a dense schedule; good for a fixed daily-training rhythm.',
      ja: '日本国内の小規模ジャッジ。問題文が短く開催頻度が高いので、日常練習のリズムづくりに向いています。'
    },
    format: {
      zh: '个人赛为主，线上进行；部分场次有企业赞助与主题题组。',
      en: 'Mostly individual, online; some rounds are sponsored with themed problem sets.',
      ja: '個人戦が中心のオンライン開催。企業協賛の回やテーマ別の問題セットもあります。'
    },
    prepWeeks: { zh: '4–8 周', en: '4–8 weeks', ja: '4〜8 週間' },
    weekly: { zh: '每周 3–6 小时', en: '3–6 h / week', ja: '週 3〜6 時間' },
    prereq: {
      zh: '一门语言的基础语法与常见数据结构。',
      en: 'Basic syntax in one language and common data structures.',
      ja: 'いずれかの言語の基本文法と、よく使うデータ構造。'
    },
    roles: [
      { zh: '个人', en: 'Individual', ja: '個人' }
    ],
    skills: [
      { zh: '实现速度', en: 'Implementation speed', ja: '実装速度' },
      { zh: '边界处理', en: 'Edge cases', ja: '境界処理' },
      { zh: '读题', en: 'Reading', ja: '読解' }
    ],
    prep: [
      { zh: '每周固定两场，赛后当天补题，不超过 24 小时。', en: 'Fix two rounds a week and upsolve the same day, within 24 hours.', ja: '週 2 回を固定し、解けなかった問題は当日中（24 時間以内）に解き直します。' },
      { zh: '把每道题的错因归到“读题、思路、实现”三类之一。', en: 'Classify every miss as reading, idea or implementation.', ja: '誤りは「読解・方針・実装」の三種類のどれかに分類します。' },
      { zh: '积累一份自己的小模板：输入解析、常用容器、调试输出。', en: 'Keep a small personal template: input parsing, containers, debug output.', ja: '入力処理、よく使うコンテナ、デバッグ出力だけの小さなテンプレートを用意します。' }
    ],
    tips: [
      { zh: '题短不代表简单，先看清数据范围再选算法。', en: 'Short statements are not easy statements; check the constraints before choosing an algorithm.', ja: '問題文が短い＝簡単ではありません。制約を確認してから手法を選びます。' },
      { zh: '把它当跑步机，而不是考试：稳定比爆发更有用。', en: 'Treat it as a treadmill rather than an exam: consistency beats bursts.', ja: '試験ではなくルーティンとして使う。爆発力より継続のほうが効きます。' }
    ],
    experience: {
      zh: 'yukicoder 最适合建立“每周都有比赛”的习惯，长期下来读题与实现速度会明显提升。',
      en: 'yukicoder is the easiest way to build a weekly contest habit; reading and implementation speed improve steadily.',
      ja: 'yukicoder は「毎週試合がある」状態をつくるのに最適です。続けるうちに読解と実装の速度が上がります。'
    },
    links: [{ label: 'yukicoder', url: 'https://yukicoder.me/' }]
  },
  {
    id: 'isucon',
    name: { zh: 'ISUCON 性能调优赛', en: 'ISUCON Performance Contest', ja: 'ISUCON' },
    abbr: 'ISUCON',
    cat: 'design', stage: 'open', level: 3,
    months: [8, 9, 10],
    season: { zh: '多在夏末至秋季，含预选与决赛', en: 'Late summer to autumn, with qualifiers and a final', ja: '夏の終わりから秋。予選と本選があります' },
    summary: {
      zh: '给一套能跑但很慢的 Web 应用，限定时间内把基准测试分数做上去；比拼的是剖析、索引、缓存与取舍。',
      en: 'You get a working but slow web application and a time limit to raise its benchmark score; the contest is about profiling, indexes, caching and trade-offs.',
      ja: '動くけれど遅い Web アプリを渡され、制限時間内にベンチマークスコアをどこまで上げるかを競います。プロファイリング、索引、キャッシュ、取捨選択の勝負です。'
    },
    format: {
      zh: '三人一队，线上或线下；同一套代码与环境，按最终得分排名。',
      en: 'Three-person teams, online or onsite; identical code and environment, ranked by final score.',
      ja: '3 人 1 チーム。オンラインまたは現地開催で、同一のコードと環境を使い最終スコアで順位を決めます。'
    },
    prepWeeks: { zh: '10–16 周', en: '10–16 weeks', ja: '10〜16 週間' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week', ja: '週 6〜10 時間' },
    prereq: {
      zh: 'Linux、SQL 与一门后端语言；会用 profiler 与压测工具。',
      en: 'Linux, SQL and one backend language; comfortable with profilers and load-testing tools.',
      ja: 'Linux、SQL、いずれかのバックエンド言語。プロファイラと負荷試験ツールを使えること。'
    },
    roles: [
      { zh: '剖析', en: 'Profiling', ja: '計測' },
      { zh: '应用改造', en: 'App changes', ja: 'アプリ改修' },
      { zh: '数据库', en: 'Database', ja: 'データベース' }
    ],
    skills: [
      { zh: '性能剖析', en: 'Profiling', ja: 'プロファイリング' },
      { zh: 'SQL 优化', en: 'SQL tuning', ja: 'SQL チューニング' },
      { zh: '缓存', en: 'Caching', ja: 'キャッシュ' },
      { zh: '运维', en: 'Operations', ja: '運用' }
    ],
    prep: [
      { zh: '先在自己的机器上复现一套基准环境，跑通压测与可视化。', en: 'Reproduce a benchmark environment locally and get load testing plus dashboards working.', ja: 'まず自分の環境でベンチマーク環境を再現し、負荷試験と可視化を通します。' },
      { zh: '每次只改一个变量，记录分数变化，避免“玄学优化”。', en: 'Change one variable at a time and record the score; avoid folklore optimisation.', ja: '一度に一つの変更だけを行い、スコアの変化を記録します。勘に頼る最適化は避けます。' },
      { zh: '准备回滚脚本：改坏了要能在两分钟内恢复。', en: 'Prepare rollback scripts; a broken change must be recoverable in two minutes.', ja: 'ロールバック用のスクリプトを用意し、失敗しても 2 分で戻せる状態にします。' }
    ],
    tips: [
      { zh: '先看慢查询与锁等待，再考虑换语言或重写架构。', en: 'Look at slow queries and lock waits before rewriting the stack.', ja: 'まずスロークエリとロック待ちを見る。言語の変更や再設計は最後の手段です。' },
      { zh: '分数曲线会饱和，剩下时间用来做稳定性与回滚。', en: 'The score curve saturates; spend the remaining time on stability and rollback.', ja: 'スコアは頭打ちになります。残り時間は安定性と復旧手順に使います。' }
    ],
    experience: {
      zh: 'ISUCON 最像真实工作：需求不变，只有性能预算；学会用数据说服队友，而不是凭感觉改代码。',
      en: 'ISUCON resembles real work: the requirements stay fixed and only the performance budget moves. You learn to convince teammates with data rather than instinct.',
      ja: 'ISUCON は実務に最も近い大会です。要件は変わらず、動くのは性能の予算だけ。感覚ではなく計測値でチームを説得する力を鍛えます。'
    },
    links: [{ label: 'ISUCON', url: 'https://isucon.net/' }]
  },
  {
    id: 'seccon-beginners',
    name: { zh: 'SECCON 入门赛', en: 'SECCON Beginners CTF', ja: 'SECCON Beginners CTF' },
    abbr: 'SecB',
    cat: 'security', stage: 'open', level: 1,
    months: [5, 6],
    season: { zh: '多在初夏，按年度公告', en: 'Usually early summer; check the yearly announcement', ja: '例年は初夏。年度ごとの告知を確認' },
    summary: {
      zh: 'SECCON 面向初学者的解题赛，覆盖 Web、Crypto、Reversing、Pwn 与 Misc，题面有日英双语。',
      en: 'SECCON’s beginner-oriented jeopardy event covering Web, Crypto, Reversing, Pwn and Misc, with bilingual statements.',
      ja: 'SECCON の初心者向け Jeopardy 形式。Web、Crypto、Reversing、Pwn、Misc が出題され、問題文は日英で用意されます。'
    },
    format: {
      zh: '个人或小队在线解题，按题目分值累计排名。',
      en: 'Solve online as an individual or small team, ranked by accumulated challenge points.',
      ja: '個人または小規模チームでオンライン解答。獲得した問題点数の合計で順位が決まります。'
    },
    prepWeeks: { zh: '6–10 周', en: '6–10 weeks', ja: '6〜10 週間' },
    weekly: { zh: '每周 4–8 小时', en: '4–8 h / week', ja: '週 4〜8 時間' },
    prereq: {
      zh: 'Linux 命令行、HTTP 基础与 Python 脚本。',
      en: 'Linux command line, HTTP basics and Python scripting.',
      ja: 'Linux のコマンドライン、HTTP の基礎、Python スクリプト。'
    },
    roles: [
      { zh: 'Web', en: 'Web', ja: 'Web' },
      { zh: 'Crypto', en: 'Crypto', ja: 'Crypto' },
      { zh: 'Reversing', en: 'Reversing', ja: 'Reversing' }
    ],
    skills: [
      { zh: 'HTTP 与浏览器工具', en: 'HTTP and browser tools', ja: 'HTTP とブラウザツール' },
      { zh: '基础密码学', en: 'Basic cryptography', ja: '基礎暗号' },
      { zh: '逆向入门', en: 'Reverse engineering basics', ja: 'リバースエンジニアリング入門' }
    ],
    prep: [
      { zh: '先把 picoCTF 或 CpawCTF 的入门题做完一轮，再来看赛题。', en: 'Finish a round of picoCTF or CpawCTF beginner tasks before the event.', ja: 'picoCTF か CpawCTF の入門問題を一通り終えてから本番に臨みます。' },
      { zh: '每道做过的题写三行 writeup：入口、手法、卡点。', en: 'Write a three-line write-up per solved challenge: entry point, method, blocker.', ja: '解いた問題は「入口・手法・詰まった点」の三行で writeup を残します。' },
      { zh: '准备一份常用命令清单，比赛时不必现场回忆。', en: 'Keep a cheat sheet of common commands so you are not recalling them mid-contest.', ja: 'よく使うコマンドの一覧を用意し、本番中に思い出す作業を減らします。' }
    ],
    tips: [
      { zh: '先扫一眼全部题目，分值低的题往往五分钟能拿。', en: 'Skim every challenge first; low-value tasks often take five minutes.', ja: 'まず全問に目を通す。配点の低い問題は 5 分で解けることが多いです。' },
      { zh: '卡住超过 20 分钟就换题，别让一道题吞掉整场。', en: 'Switch after 20 minutes stuck; do not let one challenge eat the round.', ja: '20 分詰まったら別の問題へ。1 問に大会全体を飲み込ませないこと。' }
    ],
    experience: {
      zh: '这是进入日本安全竞赛圈最平缓的入口，之后可以顺着 SECCON 本战与 CTFtime 继续。',
      en: 'The gentlest entry into the Japanese security contest scene; from here move to SECCON proper and CTFtime.',
      ja: '日本のセキュリティ競技に入る最も緩やかな入口です。ここから SECCON 本戦や CTFtime へ進めます。'
    },
    links: [
      { label: 'SECCON Beginners', url: 'https://beginners.seccon.jp/' },
      { label: 'SECCON', url: 'https://www.seccon.jp/' }
    ]
  },
  {
    id: 'cpaw-ctf',
    name: { zh: 'CpawCTF 常设练习', en: 'CpawCTF Practice', ja: 'CpawCTF' },
    abbr: 'Cpaw',
    cat: 'security', stage: 'open', level: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: { zh: '全年开放，随时可做', en: 'Open year-round', ja: '通年。いつでも挑戦可能' },
    summary: {
      zh: '日本团队维护的常设入门 CTF，题目按难度递进并附解说，适合作为第一套安全知识地图。',
      en: 'A permanently open beginner CTF maintained by a Japanese team, with graded tasks and explanations — a good first map of security knowledge.',
      ja: '日本のチームが運営する常設の入門 CTF。難易度順に並び、解説も付くので、最初のセキュリティ地図として使えます。'
    },
    format: {
      zh: '随时在线解题，无固定赛程；按累计得分解锁后续题目。',
      en: 'Solve online at any time; no fixed schedule, later tasks unlock as you score.',
      ja: '決まった日程はなく、いつでもオンラインで解答。得点に応じて次の問題が解放されます。'
    },
    prepWeeks: { zh: '4–8 周', en: '4–8 weeks', ja: '4〜8 週間' },
    weekly: { zh: '每周 3–5 小时', en: '3–5 h / week', ja: '週 3〜5 時間' },
    prereq: {
      zh: '会用终端，能读懂简单的 Python 与 HTML。',
      en: 'Comfortable with a terminal and simple Python and HTML.',
      ja: 'ターミナルが使え、簡単な Python と HTML が読めること。'
    },
    roles: [
      { zh: '个人', en: 'Individual', ja: '個人' },
      { zh: '入门小组', en: 'Study group', ja: '勉強会' }
    ],
    skills: [
      { zh: '命令行', en: 'Command line', ja: 'コマンドライン' },
      { zh: '编码与解码', en: 'Encoding', ja: 'エンコード' },
      { zh: '基础取证', en: 'Basic forensics', ja: '基礎フォレンジック' }
    ],
    prep: [
      { zh: '按难度从低到高推进，每题写一句“我原来不知道什么”。', en: 'Work up the difficulty ladder and write one line per task: what you did not know before.', ja: '易しい順に進め、1 問ごとに「何を知らなかったか」を一行で書きます。' },
      { zh: '把用过的命令整理成自己的速查表。', en: 'Turn the commands you used into your own cheat sheet.', ja: '使ったコマンドを自分のチートシートにまとめます。' },
      { zh: '做完一个方向后，再去 SECCON Beginners 验证水平。', en: 'After finishing one track, test yourself at SECCON Beginners.', ja: '一つの分野を終えたら、SECCON Beginners で実力を確かめます。' }
    ],
    tips: [
      { zh: '不要只看答案，先写出自己的尝试路径。', en: 'Do not jump to the answer; write down your own attempt path first.', ja: '答えを先に見ない。まず自分の試行錯誤を書き出します。' },
      { zh: '常设题最适合填补零碎时间，通勤二十分钟也能做一题。', en: 'Standing tasks fit spare moments; twenty minutes on a train is enough for one.', ja: '常設問題はすき間時間に向きます。移動中の 20 分でも 1 問進められます。' }
    ],
    experience: {
      zh: 'CpawCTF 不会给你名次，但会给出一条清晰的入门路径；完成后再参加正式 CTF 会从容很多。',
      en: 'CpawCTF gives no ranking, only a clear entry path; after finishing it, a real CTF feels far less intimidating.',
      ja: 'CpawCTF に順位はありませんが、明確な入門ルートがあります。終えたあとの本番 CTF は格段に落ち着いて臨めます。'
    },
    links: [{ label: 'CpawCTF', url: 'https://ctf.cpaw.site/' }]
  },
  {
    id: 'mbsd-challenge',
    name: { zh: 'MBSD 网络安全挑战赛', en: 'MBSD Cybersecurity Challenges', ja: 'MBSD Cybersecurity Challenges' },
    abbr: 'MBSD',
    cat: 'security', stage: 'upper', level: 3,
    months: [7, 8, 9],
    season: { zh: '多在夏秋，按年度公告', en: 'Usually summer to autumn; check the yearly announcement', ja: '例年は夏から秋。年度ごとの告知を確認' },
    summary: {
      zh: '由日本安全企业主办的实战型竞赛，题目取自真实业务场景，覆盖 Web、云、取证与应急响应。',
      en: 'A practical contest run by a Japanese security company; tasks come from real business scenarios and cover web, cloud, forensics and incident response.',
      ja: '日本のセキュリティ企業が主催する実践型の大会。実際の業務場面を題材に、Web、クラウド、フォレンジック、インシデント対応が出題されます。'
    },
    format: {
      zh: '线上解题与报告结合，部分年份要求提交处置思路与复现步骤。',
      en: 'Online solving combined with reporting; some years require remediation reasoning and reproduction steps.',
      ja: 'オンライン解答に加えて報告が求められ、年によっては対応方針や再現手順の提出があります。'
    },
    prepWeeks: { zh: '12 周以上', en: '12+ weeks', ja: '12 週間以上' },
    weekly: { zh: '每周 6–10 小时', en: '6–10 h / week', ja: '週 6〜10 時間' },
    prereq: {
      zh: '至少一个安全方向的实战经验；能写清楚复现步骤。',
      en: 'Hands-on experience in at least one security track; able to write clear reproduction steps.',
      ja: '少なくとも一つの分野で実践経験があり、再現手順を明確に書けること。'
    },
    roles: [
      { zh: 'Web / 云', en: 'Web / cloud', ja: 'Web・クラウド' },
      { zh: '取证', en: 'Forensics', ja: 'フォレンジック' },
      { zh: '报告撰写', en: 'Reporting', ja: '報告書作成' }
    ],
    skills: [
      { zh: '漏洞分析', en: 'Vulnerability analysis', ja: '脆弱性分析' },
      { zh: '日志取证', en: 'Log forensics', ja: 'ログ解析' },
      { zh: '事件响应', en: 'Incident response', ja: 'インシデント対応' },
      { zh: '技术写作', en: 'Technical writing', ja: '技術文書' }
    ],
    prep: [
      { zh: '以“能否让同事按你的步骤复现”为标准写每一份报告。', en: 'Write every report to the standard that a colleague can reproduce it from your steps.', ja: '「同僚がその手順だけで再現できるか」を基準に報告を書きます。' },
      { zh: '练一套日志分析流程：时间线、异常点、影响面。', en: 'Practise a log-analysis routine: timeline, anomalies, blast radius.', ja: 'ログ分析の型を練習します。時系列、異常点、影響範囲の三つです。' },
      { zh: '组队时明确谁负责取证、谁负责写报告。', en: 'In a team, assign forensics and report writing explicitly.', ja: 'チームでは、解析担当と報告担当を明確に分けます。' }
    ],
    tips: [
      { zh: '先写清结论与影响，再补技术细节，评审读得更快。', en: 'Lead with conclusion and impact, then technical detail; reviewers read faster.', ja: '結論と影響を先に書き、技術的詳細は後段へ。読み手の負担が減ります。' },
      { zh: '证据链比“炫技”重要，截图与命令都要可追溯。', en: 'Chain of evidence beats showing off; screenshots and commands must be traceable.', ja: '派手さより証拠の連続性。スクリーンショットとコマンドは追跡可能に。' }
    ],
    experience: {
      zh: '这类企业赛最接近安全岗位的真实工作：发现问题只是开始，写清楚、讲明白才算完成。',
      en: 'Company-run contests resemble security work most closely: finding the issue is only the start, explaining it is the job.',
      ja: '企業主催の大会はセキュリティ職の実務に最も近いものです。見つけることは始まりにすぎず、説明できて初めて仕事になります。'
    },
    links: [{ label: 'MBSD', url: 'https://www.mbsd.jp/' }]
  },
  {
    id: 'jss-data',
    name: { zh: '统计学会联合 数据分析竞赛', en: 'JSS Data Analysis Competition', ja: '統計関連学会連合 データ解析コンペティション' },
    abbr: 'JSS',
    cat: 'data', stage: 'open', level: 2,
    months: [7, 8, 9, 10],
    season: { zh: '夏季开题，秋季答辩', en: 'Kick-off in summer, presentations in autumn', ja: '夏に開始し、秋に発表' },
    summary: {
      zh: '由日本统计相关学会联合主办，给定真实数据，提交分析报告并在秋季会上展示；重视建模理由与解释。',
      en: 'Run by the federation of Japanese statistical societies: real data, an analysis report, and a presentation at the autumn meeting; reasoning and interpretation matter most.',
      ja: '日本の統計関連学会連合が主催し、実データを配布して分析レポートと秋季大会での発表を求めます。モデルの根拠と解釈が重視されます。'
    },
    format: {
      zh: '团队报名，数月周期，最终提交报告并现场或线上答辩。',
      en: 'Team entry over several months, ending in a written report and an onsite or online presentation.',
      ja: 'チームで参加し、数か月かけて分析。最終的にレポートを提出し、現地またはオンラインで発表します。'
    },
    prepWeeks: { zh: '12–16 周', en: '12–16 weeks', ja: '12〜16 週間' },
    weekly: { zh: '每周 5–8 小时', en: '5–8 h / week', ja: '週 5〜8 時間' },
    prereq: {
      zh: '回归、假设检验与基础因果推断；会用 R 或 Python 做数据清洗。',
      en: 'Regression, hypothesis testing and basic causal inference; data cleaning in R or Python.',
      ja: '回帰、仮説検定、基礎的な因果推論。R か Python でデータ整形ができること。'
    },
    roles: [
      { zh: '数据清洗', en: 'Data cleaning', ja: 'データ整形' },
      { zh: '建模', en: 'Modelling', ja: 'モデリング' },
      { zh: '报告与展示', en: 'Report and talk', ja: '報告と発表' }
    ],
    skills: [
      { zh: '统计建模', en: 'Statistical modelling', ja: '統計モデリング' },
      { zh: '可解释性', en: 'Interpretability', ja: '解釈性' },
      { zh: '学术写作', en: 'Academic writing', ja: '学術文章' }
    ],
    prep: [
      { zh: '先写清研究问题与假设，再决定用什么模型。', en: 'State the research question and hypotheses before choosing a model.', ja: 'モデルを選ぶ前に、研究課題と仮説を明確にします。' },
      { zh: '保留完整的清洗脚本与版本记录，答辩时会被追问。', en: 'Keep complete cleaning scripts and version history; presentations invite follow-up questions.', ja: '整形スクリプトと版管理を残すこと。発表では必ず質問が来ます。' },
      { zh: '练习用三分钟讲清“数据—方法—结论—局限”。', en: 'Practise explaining data, method, conclusion and limitations in three minutes.', ja: '「データ・手法・結論・限界」を 3 分で説明する練習をします。' }
    ],
    tips: [
      { zh: '不要堆模型，评委更在意你是否解释了为什么。', en: 'Do not stack models; judges care whether you explained why.', ja: 'モデルを積み上げるより、なぜその手法なのかを説明できるかが見られます。' },
      { zh: '把局限写进报告，比藏起来更容易得分。', en: 'Put limitations in the report; hiding them costs more than admitting them.', ja: '限界は隠さず書く。隠すより減点は小さく済みます。' }
    ],
    experience: {
      zh: '这类竞赛的产出接近一篇小型论文，对之后做毕设、写研究计划书都有直接帮助。',
      en: 'The output is close to a small paper, which feeds directly into a thesis or a research statement.',
      ja: '成果は小さな論文に近く、卒業研究や研究計画書の作成にそのまま活きます。'
    },
    links: [{ label: '日本統計学会', url: 'https://www.jss.gr.jp/' }]
  },
  {
    id: 'robocup-jp',
    name: { zh: 'RoboCup 日本公开赛', en: 'RoboCup Japan Open', ja: 'ロボカップ日本大会' },
    abbr: 'RCJ',
    cat: 'ai', stage: 'open', level: 3,
    months: [4, 5],
    season: { zh: '多在春季，按年度公告', en: 'Usually spring; check the yearly announcement', ja: '例年は春。年度ごとの告知を確認' },
    summary: {
      zh: '机器人领域的综合赛事，分仿真与实体联赛；团队要同时处理感知、控制、策略与系统集成。',
      en: 'A broad robotics competition with simulation and physical leagues; teams handle perception, control, strategy and system integration together.',
      ja: 'ロボティクスの総合大会。シミュレーションリーグと実機リーグがあり、知覚・制御・戦略・システム統合を同時に扱います。'
    },
    format: {
      zh: '团队项目制，赛前长期开发，比赛现场调试与对抗。',
      en: 'Team project format: long development cycles before the event, debugging and matches onsite.',
      ja: 'チーム単位のプロジェクト形式。事前に長期開発を行い、当日は調整と試合に臨みます。'
    },
    prepWeeks: { zh: '一学期以上', en: 'One semester or more', ja: '半年以上' },
    weekly: { zh: '每周 8–15 小时', en: '8–15 h / week', ja: '週 8〜15 時間' },
    prereq: {
      zh: 'C++ 或 Python、基础控制与视觉；能读硬件手册。',
      en: 'C++ or Python, basic control and vision; able to read hardware manuals.',
      ja: 'C++ または Python、基礎的な制御と視覚処理。ハードウェアのマニュアルを読めること。'
    },
    roles: [
      { zh: '感知', en: 'Perception', ja: '知覚' },
      { zh: '控制', en: 'Control', ja: '制御' },
      { zh: '系统集成', en: 'Integration', ja: '統合' }
    ],
    skills: [
      { zh: '计算机视觉', en: 'Computer vision', ja: 'コンピュータビジョン' },
      { zh: '运动控制', en: 'Motion control', ja: '運動制御' },
      { zh: '嵌入式', en: 'Embedded', ja: '組み込み' },
      { zh: '项目管理', en: 'Project management', ja: 'プロジェクト管理' }
    ],
    prep: [
      { zh: '先让最简单的一版机器人稳定跑完全流程，再加功能。', en: 'Get the simplest robot through the whole flow reliably before adding features.', ja: 'まず最小構成のロボットで全体の流れを安定して通し、そのあと機能を足します。' },
      { zh: '建立硬件与代码的版本对应表，否则现场无法复现。', en: 'Track which code version matches which hardware build, or you cannot reproduce anything onsite.', ja: 'ハードとコードの版を対応表で管理する。それがなければ当日は再現できません。' },
      { zh: '每次测试记录失败模式，比记录成功次数更有用。', en: 'Log failure modes per test; that is more useful than counting successes.', ja: 'テストでは成功回数より失敗の型を記録します。' }
    ],
    tips: [
      { zh: '现场调试时间有限，先在仿真里把参数收敛。', en: 'Onsite debugging time is short; converge parameters in simulation first.', ja: '当日の調整時間は限られます。パラメータはシミュレーションで先に収束させます。' },
      { zh: '留一套“降级方案”，主方案失效时还能完赛。', en: 'Keep a degraded mode so the robot can still finish when the main pipeline fails.', ja: '縮退運転のモードを用意し、本命の処理が落ちても完走できるようにします。' }
    ],
    experience: {
      zh: 'RoboCup 的训练周期长、协作面广，是少数能把算法、硬件与项目管理同时练到的赛事。',
      en: 'RoboCup has a long cycle and broad collaboration; few contests train algorithms, hardware and project management at once.',
      ja: 'ロボカップは開発期間が長く、協働の範囲も広い大会です。アルゴリズム、ハードウェア、プロジェクト管理を同時に鍛えられる稀な場です。'
    },
    links: [{ label: 'RoboCup 日本委員会', url: 'https://www.robocup.or.jp/' }]
  }
];

/* 选赛路线：从入门到专项，点击任意节点会跳到对应赛事卡片并展开详情。 */
window.LHT_CONTEST_PATHS = [
  {
    id: 'first',
    title: { zh: '第一次参赛', en: 'A first contest' },
    note: {
      zh: '从反馈快、门槛低的个人赛开始，先建立完整的比赛节奏，再考虑组队。',
      en: 'Start with fast, low-barrier individual rounds to build a complete contest rhythm before joining a team.'
    },
    steps: ['leetcode-contest', 'lanqiao', 'gplt']
  },
  {
    id: 'team',
    title: { zh: '校队与区域赛', en: 'Team and regionals' },
    note: {
      zh: '从线上 rating 走到三人一机的线下赛，重点是分工、模板统一与罚时管理。',
      en: 'From online rating to a three-person, one-machine onsite contest: roles, shared templates and penalty management.'
    },
    steps: ['codeforces', 'ccpc', 'icpc']
  },
  {
    id: 'ai',
    title: { zh: 'AI 与数据', en: 'AI and data' },
    note: {
      zh: '先在小数据集上跑通完整流程，再进入真实业务与前沿研究任务。',
      en: 'Get a full pipeline working on a small dataset, then move to real business and frontier research tasks.'
    },
    steps: ['kaggle', 'tianchi', 'neurips-comp']
  },
  {
    id: 'math',
    title: { zh: '数学与建模', en: 'Mathematics and modelling' },
    note: {
      zh: '个人笔试练推导，团队建模练收敛与写作；两条线可以同时准备。',
      en: 'Individual written exams train proof; team modelling trains convergence and writing. Prepare both in parallel.'
    },
    steps: ['cmc', 'cumcm', 'mcm-icm']
  },
  {
    id: 'security',
    title: { zh: '安全方向', en: 'Security track' },
    note: {
      zh: '先用 CTF 建立方向深度，再用 CISCN 把解题能力沉淀成作品与文档。',
      en: 'Build depth through CTF, then turn it into a project and documentation with CISCN.'
    },
    steps: ['ctf', 'ciscn']
  }
];

/* 大学四年规划：给每个阶段一个主线、三项动作与一个可交付成果。 */
window.LHT_CONTEST_YEARS = [
  {
    id: 'y1',
    label: { zh: '大一', en: 'Year 1', fr: '1re année' },
    focus: { zh: '打基础，建立比赛节奏', en: 'Fundamentals and contest rhythm', fr: 'Fondamentaux et rythme' },
    contests: ['leetcode-contest', 'lanqiao', 'gplt'],
    actions: [
      { zh: '先把一门语言（C 或 Python）练到能独立写完整程序，再谈算法。', en: 'Get one language, C or Python, to the point where you can write a complete program before talking about algorithms.' },
      { zh: '每周固定一场 LeetCode 或 AtCoder，赛后补题并记录错因。', en: 'Run one LeetCode or AtCoder round a week, then upsolve and record the cause of each miss.' },
      { zh: '加入校队或社团，先从读题、验题、整理模板做起。', en: 'Join a team or society and start with reading, verifying and maintaining templates.' }
    ],
    output: { zh: '一次正式比赛经历 + 一份可持续的错题本。', en: 'One formal contest and a mistake log you will actually keep using.' }
  },
  {
    id: 'y2',
    label: { zh: '大二', en: 'Year 2', fr: '2e année' },
    focus: { zh: '专项突破，开始组队', en: 'Specialise and form a team', fr: 'Spécialisation et équipe' },
    contests: ['codeforces', 'ccpc', 'cumcm', '4c'],
    actions: [
      { zh: '选定一个主方向（算法 / 数据 / 安全 / 设计），做 8–12 周专项训练。', en: 'Pick one main track — algorithms, data, security or design — and train it for 8–12 weeks.' },
      { zh: '组固定三人队，统一模板与提交纪律，每月一场虚拟赛。', en: 'Form a stable team of three, share templates and submission discipline, and run one virtual contest a month.' },
      { zh: '尝试一次建模或作品赛，学会写摘要、假设与局限。', en: 'Try a modelling or project contest and learn to write an abstract, assumptions and limitations.' }
    ],
    output: { zh: '一项省级以上奖项，或一个能演示的完整作品。', en: 'A provincial-level award or a complete, demonstrable project.' }
  },
  {
    id: 'y3',
    label: { zh: '大三', en: 'Year 3', fr: '3e année' },
    focus: { zh: '高阶赛事与方向深耕', en: 'Advanced contests and depth', fr: 'Concours avancés et profondeur' },
    contests: ['icpc', 'huawei-software', 'ciscn', 'kaggle', 'mcm-icm'],
    actions: [
      { zh: '把目标赛事拆成 12 周计划：基础、专项、模拟、复盘各占一段。', en: 'Break the target contest into a 12-week plan: fundamentals, specialisation, simulation and review.' },
      { zh: '开始积累可展示的成果：题解仓库、writeup、作品集、实验报告。', en: 'Start accumulating visible output: solution repositories, write-ups, a portfolio and experiment reports.' },
      { zh: '用比赛反向补课程：图论、概率、优化、系统课按需回炉。', en: 'Use contests to drive coursework: revisit graphs, probability, optimisation and systems as needed.' }
    ],
    output: { zh: '一段能写进简历的完整项目或赛事经历。', en: 'A complete project or contest story that belongs on a CV.' }
  },
  {
    id: 'y4',
    label: { zh: '大四 / 研究生', en: 'Year 4 / postgraduate', fr: '4e année / master' },
    focus: { zh: '收敛、输出与传承', en: 'Focus, output and handover', fr: 'Converger, produire, transmettre' },
    contests: ['neurips-comp', 'tianchi', 'icpc'],
    actions: [
      { zh: '只保留 1–2 个与毕业方向一致的赛事，避免分散。', en: 'Keep only one or two contests aligned with your thesis direction; avoid spreading thin.' },
      { zh: '把比赛成果整理成论文、开源项目或技术报告。', en: 'Turn contest work into a paper, an open-source project or a technical report.' },
      { zh: '带一支低年级队伍，把模板、复盘流程与经验传下去。', en: 'Mentor a younger team and pass on templates, review routines and experience.' }
    ],
    output: { zh: '作品集 / 论文 / 推荐信素材，以及可复用的团队资产。', en: 'A portfolio, paper or recommendation material, plus reusable team assets.' }
  }
];

/* 经验与能力：跨赛事的通用方法，放在页面底部作为长期参考。 */
window.LHT_CONTEST_GUIDES = [
  {
    id: 'template',
    title: { zh: '模板库', en: 'Template library', ja: 'テンプレート集' },
    body: {
      zh: '把常用算法写成自己的模板，但要在随机题上盲写验证。比赛时只允许增量修改，否则模板会变成你不理解的负担。',
      en: 'Write your own templates for common algorithms, then re-type them blind on random problems. During a contest only add to them; otherwise the library becomes code you do not understand.',
      ja: 'よく使うアルゴリズムは自分でテンプレート化し、そのあと何も見ずに書き直して検証します。本番では追記だけに留めること。理解していないコードを貼るだけでは、荷物になります。'
    }
  },
  {
    id: 'review',
    title: { zh: '赛后复盘', en: 'Post-contest review', ja: '終了後の振り返り' },
    body: {
      zh: '每场只问三个问题：哪里读错、哪里想错、哪里写错。24 小时内补题，并把错因写成一句话，而不是抄一份题解。',
      en: 'Ask only three questions after each round: what did I misread, mis-think and mis-write? Upsolve within 24 hours and record the cause in one sentence, not a copied editorial.',
      ja: '終わったら問いは三つだけ。読み違えた点、考え違えた点、書き違えた点です。24 時間以内に解き直し、原因を一文で残します。解説の写しでは身につきません。'
    }
  },
  {
    id: 'team',
    title: { zh: '团队分工', en: 'Team roles', ja: 'チームの役割' },
    body: {
      zh: '固定读题、主码、验证三个角色，每 30 分钟同步一次剩余题目。罚时是团队纪律的体现，不是某一个人的手速问题。',
      en: 'Fix reader, coder and verifier roles, and sync every 30 minutes on the remaining problems. Penalty reflects team discipline, not one person’s typing speed.',
      ja: '読解・実装・検証の三役を固定し、30 分ごとに残り問題を共有します。ペナルティはチームの規律の結果であり、誰かのタイピング速度のせいではありません。'
    }
  },
  {
    id: 'portfolio',
    title: { zh: '作品与简历', en: 'Portfolio and CV', ja: '作品と履歴書' },
    body: {
      zh: '比赛结果只是入口。题解仓库、writeup、作品演示与实验报告，才是能长期复用、也能在面试里讲清楚的东西。',
      en: 'A result is only the entry point. Solution repositories, write-ups, demos and experiment reports are what you can reuse and explain in an interview.',
      ja: '順位は入口にすぎません。解答リポジトリ、writeup、デモ、実験レポートこそ、長く使い回せて面接でも説明できる材料になります。'
    }
  },
  {
    id: 'rhythm',
    title: { zh: '时间与节奏', en: 'Time and rhythm', ja: '時間とリズム' },
    body: {
      zh: '赛前 8 周开始加密，赛前一周减量。长期稳定训练比临场冲刺可靠；把训练排进课表，而不是等有空再说。',
      en: 'Increase intensity eight weeks out and taper in the final week. Steady training beats last-minute sprints; put it in your timetable instead of waiting for free time.',
      ja: '本番 8 週前から密度を上げ、直前の 1 週間は量を落とします。直前の詰め込みより、継続した練習のほうが確実です。時間が空くのを待たず、時間割に組み込んでください。'
    }
  },
  {
    id: 'english',
    title: { zh: '英文表达', en: 'English communication', ja: '英語での説明' },
    body: {
      zh: '建模与 AI 赛事最终要交英文摘要或报告。提前准备问题、方法、结果、局限四段句式，比赛时才能把精力留给模型。',
      en: 'Modelling and AI contests end in an English abstract or report. Prepare phrasing for problem, method, result and limitations so the contest energy goes into the model.',
      ja: 'モデリングや AI の大会は、最後に英語の要旨や報告書を求められます。問題・手法・結果・限界の四段落を前もって用意しておけば、本番の力をモデルに注げます。'
    }
  }
];

/* ------------------------------------------------------------
   日语版：日本国内赛事为主，保留少量国际赛事与中国赛事作对照。
   allow 为白名单；paths / years 为日语专属路线与四年规划。
   ------------------------------------------------------------ */
window.LHT_CONTEST_JA = {
  allow: [
    'icpc-japan', 'jag', 'past', 'ahc', 'seccon', 'ai-cup', 'signate', 'nishika',
    'utpc', 'kupc', 'yukicoder', 'isucon', 'seccon-beginners', 'cpaw-ctf',
    'mbsd-challenge', 'jss-data', 'robocup-jp',
    'atcoder', 'icpc', 'ccpc', 'codeforces', 'kaggle', 'ctf'
  ],
  paths: [
    {
      id: 'first',
      title: { ja: 'はじめての一戦', en: 'A first contest' },
      note: {
        ja: '採点が速く、一人で完結する大会から始めます。まずは「読む・書く・提出する」を一度通し、そのあとでチーム戦に進むと迷いません。',
        en: 'Start with fast, individual rounds. Complete the read-write-submit loop once before moving on to team contests.'
      },
      steps: ['past', 'atcoder', 'codeforces']
    },
    {
      id: 'team',
      title: { ja: 'チーム戦と国内予選', en: 'Team contests and domestic preliminaries' },
      note: {
        ja: 'ICPC 国内予選は 3 人 1 台のチーム戦です。JAG の練習会で形式に慣れ、役割分担と提出規律を固めてから本番に臨みます。',
        en: 'The ICPC domestic preliminary is a three-person, one-machine contest. Get used to the format at JAG practice sessions, then fix roles and submission discipline.'
      },
      steps: ['jag', 'icpc-japan', 'icpc']
    },
    {
      id: 'ai',
      title: { ja: 'データと AI', en: 'Data and AI' },
      note: {
        ja: 'まず小さなデータで提出まで一周し、次に評価指標とリークの見方を学び、最後に長期のコンペで順位を狙います。',
        en: 'Complete one submission on a small dataset, learn how metrics and leakage work, then aim for a ranking in a longer competition.'
      },
      steps: ['signate', 'nishika', 'jss-data', 'ai-cup', 'kaggle']
    },
    {
      id: 'heuristic',
      title: { ja: 'ヒューリスティック', en: 'Heuristics' },
      note: {
        ja: '正解が一意でない問題に、制限時間内でどこまで良い解を出すかを競います。焼きなましと局所探索を自分の言葉で説明できる状態を目標に。',
        en: 'Compete on how good a solution you can produce in limited time when the answer is not unique. Aim to explain simulated annealing and local search in your own words.'
      },
      steps: ['ahc', 'atcoder']
    },
    {
      id: 'security',
      title: { ja: 'セキュリティ', en: 'Security' },
      note: {
        ja: 'CTF で一つの分野を深く掘り、SECCON で日本の大会形式に慣れます。writeup を書き続けることが一番の近道です。',
        en: 'Go deep in one CTF track, then get used to the Japanese contest format at SECCON. Writing write-ups consistently is the shortest path.'
      },
      steps: ['cpaw-ctf', 'seccon-beginners', 'seccon']
    },
    {
      id: 'university',
      title: { ja: '大学主催コンテスト', en: 'University-run contests' },
      note: {
        ja: 'yukicoder で毎週のリズムを作り、大学主催のオープン戦（UTPC・KUPC）でチームの実力を測ります。問題傾向が本選と近いので、国内予選の前哨戦になります。',
        en: 'Build a weekly rhythm on yukicoder, then test the team at university-run open contests such as UTPC and KUPC. Their style is close to the domestic preliminary, making them a useful warm-up.'
      },
      steps: ['yukicoder', 'utpc', 'kupc']
    },
    {
      id: 'engineering',
      title: { ja: '実装と現場', en: 'Engineering in the field' },
      note: {
        ja: '正解を書くのではなく、動くシステムを期限内に強くする大会です。ISUCON は性能、ロボカップは統合。どちらも長期のチーム開発と当日の調整力が問われます。',
        en: 'These contests do not ask for a correct answer but for a working system made better under a deadline. ISUCON is about performance, RoboCup about integration; both need long team development and onsite tuning.'
      },
      steps: ['isucon', 'robocup-jp']
    }
  ],
  years: [
    {
      id: 'y1',
      label: { ja: '学部 1 年', en: 'Year 1' },
      focus: { ja: '基礎とリズムをつくる', en: 'Fundamentals and rhythm' },
      contests: ['past', 'yukicoder', 'atcoder', 'codeforces'],
      actions: [
        {
          ja: 'C か Python を一つ選び、最後まで書ける状態にする。文法の暗記より、入出力・配列・関数を自分の手で書く回数を優先。',
          en: 'Pick C or Python and get to the point of writing a complete program. Prefer writing I/O, arrays and functions by hand over memorising syntax.'
        },
        {
          ja: 'AtCoder の ABC か PAST を週 1 回。解けなかった問題は 24 時間以内に解説を読み、原因を一文で残す。',
          en: 'One AtCoder ABC or PAST round a week. Read the editorial within 24 hours and record the cause of each miss in one sentence.'
        },
        {
          ja: '大学の競技プログラミング部やサークルに入り、先輩にコードを見てもらう。一人で抱え込むと伸びが止まりやすい。',
          en: 'Join a university programming club and get your code reviewed. Working alone tends to stall progress.'
        }
      ],
      output: {
        ja: '公式大会 1 回の参加記録と、続けられる誤答ノート。',
        en: 'One official contest and a mistake log you will keep using.'
      }
    },
    {
      id: 'y2',
      label: { ja: '学部 2 年', en: 'Year 2' },
      focus: { ja: '専門を決めてチームを組む', en: 'Choose a track and form a team' },
      contests: ['jag', 'icpc-japan', 'utpc', 'ahc'],
      actions: [
        {
          ja: '主軸を一つ決める（アルゴリズム / データ / セキュリティ）。8〜12 週間の集中期間を取り、その間は他の分野を増やさない。',
          en: 'Pick one main track — algorithms, data or security — and hold an 8–12 week focus period without adding new areas.'
        },
        {
          ja: '3 人の固定チームを組み、テンプレートと提出ルールを共有する。役割は読解・実装・検証で回す。',
          en: 'Form a stable team of three, share templates and submission rules, and rotate reading, coding and verifying roles.'
        },
        {
          ja: '月 1 回は仮想コンテストを実施し、終了後 30 分で振り返りを書く。順位より、同じ失敗を繰り返さないことを重視。',
          en: 'Run one virtual contest a month and write a review within 30 minutes. Value not repeating the same mistake over ranking.'
        }
      ],
      output: {
        ja: '学内・地区大会での入賞、または公開できる作品一つ。',
        en: 'A campus or regional award, or one project you can show publicly.'
      }
    },
    {
      id: 'y3',
      label: { ja: '学部 3 年', en: 'Year 3' },
      focus: { ja: '上位大会と成果の可視化', en: 'Advanced contests and visible output' },
      contests: ['icpc-japan', 'utpc', 'seccon', 'ai-cup', 'kaggle'],
      actions: [
        {
          ja: '目標大会から逆算して 12 週間の計画を立てる。基礎・専門・模擬・復習の四つに期間を分ける。',
          en: 'Work backwards from the target contest into a 12-week plan split into fundamentals, specialisation, simulation and review.'
        },
        {
          ja: '解答リポジトリ、writeup、実験ノートを公開する。第三者が再現できる形になっているかで価値が決まる。',
          en: 'Publish solution repositories, write-ups and experiment logs. Value depends on whether someone else can reproduce them.'
        },
        {
          ja: '授業で足りない部分（グラフ、確率、最適化、システム）を大会に合わせて学び直す。',
          en: 'Revisit coursework gaps — graphs, probability, optimisation, systems — driven by what the contest actually needs.'
        }
      ],
      output: {
        ja: '履歴書に書ける大会経験、または再現可能な研究・開発プロジェクト。',
        en: 'A contest story worth a CV line, or a reproducible research or engineering project.'
      }
    },
    {
      id: 'y4',
      label: { ja: '学部 4 年・大学院', en: 'Year 4 / postgraduate' },
      focus: { ja: '収束させ、後進に渡す', en: 'Focus and hand over' },
      contests: ['icpc', 'jss-data', 'ai-cup', 'signate'],
      actions: [
        {
          ja: '卒論・修士研究と重なる大会を 1〜2 個に絞る。就職活動や研究と競合する大会は思い切って外す。',
          en: 'Keep only one or two contests that overlap your thesis work, and drop those that compete with job hunting or research.'
        },
        {
          ja: '大会の成果を論文・OSS・技術レポートのいずれかにまとめる。提出物として残らない経験は忘れられる。',
          en: 'Turn contest work into a paper, an open-source project or a technical report. Experience without an artefact gets forgotten.'
        },
        {
          ja: '下級生のチームを一つ担当し、テンプレートと振り返りの手順を引き継ぐ。教えることで自分の理解の穴も見える。',
          en: 'Mentor one younger team and hand over templates and review routines; teaching exposes the gaps in your own understanding.'
        }
      ],
      output: {
        ja: 'ポートフォリオ、論文または推薦状の材料、チームに残る資産。',
        en: 'A portfolio, paper or recommendation material, plus assets the team keeps.'
      }
    }
  ]
};
