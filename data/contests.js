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
  { id: 'algorithm', label: { zh: '算法竞赛', en: 'Algorithms', fr: 'Algorithmique' } },
  { id: 'ai',        label: { zh: 'AI 与模型', en: 'AI & models', fr: 'IA & modèles' } },
  { id: 'math',      label: { zh: '数学与建模', en: 'Mathematics', fr: 'Mathématiques' } },
  { id: 'security',  label: { zh: '网络安全', en: 'Security', fr: 'Sécurité' } },
  { id: 'data',      label: { zh: '数据科学', en: 'Data science', fr: 'Science des données' } },
  { id: 'design',    label: { zh: '综合与设计', en: 'General & design', fr: 'Général & design' } }
];

/* 年级阶段：筛选项文案在 i18n.js 的 con.* 里。 */
window.LHT_CONTEST_STAGES = ['lower', 'upper', 'postgrad', 'open'];
window.LHT_CONTEST_LEVELS = [1, 2, 3];

window.LHT_CONTESTS = [
  {
    id: 'icpc',
    name: { zh: 'ICPC 国际大学生程序设计竞赛', en: 'ICPC International Collegiate Programming Contest' },
    abbr: 'ICPC',
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
    name: { zh: 'AtCoder 常规赛', en: 'AtCoder Regular Contests' },
    abbr: 'AC',
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
    title: { zh: '模板库', en: 'Template library' },
    body: {
      zh: '把常用算法写成自己的模板，但要在随机题上盲写验证。比赛时只允许增量修改，否则模板会变成你不理解的负担。',
      en: 'Write your own templates for common algorithms, then re-type them blind on random problems. During a contest only add to them; otherwise the library becomes code you do not understand.'
    }
  },
  {
    id: 'review',
    title: { zh: '赛后复盘', en: 'Post-contest review' },
    body: {
      zh: '每场只问三个问题：哪里读错、哪里想错、哪里写错。24 小时内补题，并把错因写成一句话，而不是抄一份题解。',
      en: 'Ask only three questions after each round: what did I misread, mis-think and mis-write? Upsolve within 24 hours and record the cause in one sentence, not a copied editorial.'
    }
  },
  {
    id: 'team',
    title: { zh: '团队分工', en: 'Team roles' },
    body: {
      zh: '固定读题、主码、验证三个角色，每 30 分钟同步一次剩余题目。罚时是团队纪律的体现，不是某一个人的手速问题。',
      en: 'Fix reader, coder and verifier roles, and sync every 30 minutes on the remaining problems. Penalty reflects team discipline, not one person’s typing speed.'
    }
  },
  {
    id: 'portfolio',
    title: { zh: '作品与简历', en: 'Portfolio and CV' },
    body: {
      zh: '比赛结果只是入口。题解仓库、writeup、作品演示与实验报告，才是能长期复用、也能在面试里讲清楚的东西。',
      en: 'A result is only the entry point. Solution repositories, write-ups, demos and experiment reports are what you can reuse and explain in an interview.'
    }
  },
  {
    id: 'rhythm',
    title: { zh: '时间与节奏', en: 'Time and rhythm' },
    body: {
      zh: '赛前 8 周开始加密，赛前一周减量。长期稳定训练比临场冲刺可靠；把训练排进课表，而不是等有空再说。',
      en: 'Increase intensity eight weeks out and taper in the final week. Steady training beats last-minute sprints; put it in your timetable instead of waiting for free time.'
    }
  },
  {
    id: 'english',
    title: { zh: '英文表达', en: 'English communication' },
    body: {
      zh: '建模与 AI 赛事最终要交英文摘要或报告。提前准备问题、方法、结果、局限四段句式，比赛时才能把精力留给模型。',
      en: 'Modelling and AI contests end in an English abstract or report. Prepare phrasing for problem, method, result and limitations so the contest energy goes into the model.'
    }
  }
];
