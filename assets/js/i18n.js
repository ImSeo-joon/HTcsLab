/* ============================================================
   i18n.js — 站点文案与双语工具
   站名固定使用法语；界面语言支持 中文 / English / 双语对照。
   ============================================================ */

(function () {
  'use strict';

  var LHT = (window.LHT = window.LHT || {});

  LHT.META = {
    nameFr: 'Laboratoire de la Haute Table',
    shortFr: 'Haute Table',
    abbr: 'LHT',
    nameZh: '高桌实验室',
    nameEn: 'High Table Laboratory',
    taglineFr: 'Tout algorithme commence par une table haute.',
    version: '0.2.0',
    year: 2026
  };

  var DICT = {
    zh: {
      'brand.sub': 'Laboratoire · 实验室',
      'nav.home': '首页',
      'nav.practice': '刷题台',
      'nav.resources': '资料库',
      'nav.demos': '演示室',
      'nav.notes': '笔记',
      'nav.about': '关于',

      'common.theme': '主题',
      'common.themeDark': '深色',
      'common.themeLight': '浅色',
      'common.lang': '语言',
      'common.copy': '复制',
      'common.copied': '已复制',
      'common.copyFail': '复制失败，请手动选择',
      'common.reset': '重置',
      'common.run': '运行',
      'common.running': '运行中…',
      'common.loading': '加载中…',
      'common.github': 'GitHub',
      'common.backHome': '返回首页',
      'common.readMore': '了解详情',
      'common.open': '打开',
      'common.source': '来源',
      'common.none': '暂无',
      'common.cleared': '已清空',
      'common.docs': '文档',
      'common.draft': '草稿',
      'common.expand': '展开',
      'common.collapse': '收起',
      'theme.auto': '跟随系统',

      'footer.tag': '实验室宣言',
      'footer.tagText': '算法不是背诵的目录，而是可以亲手拧开的机关。这里把题目、资料和可视化放在同一张桌子上。',
      'footer.nav': '站点地图',
      'footer.ref': '常用外部资源',
      'footer.built': '纯静态站点，可部署于 GitHub Pages。',
      'footer.licenseNote': '站点内容用于学习整理，外部链接版权归原作者所有。',
      'footer.colophon': '纯 HTML / CSS / JS 排版 · 无需构建',
      'notFound.title': '这一页不在这张桌子上',
      'notFound.body': '地址可能写错了，或者这个页面还没做出来。可以从下面的入口回到站内其他地方。',
      'install.title': '桌面快捷方式',
      'install.button': '安装到桌面',
      'install.hintPwa': '以独立窗口运行，有自己的任务栏图标，也能离线打开已缓存的页面。',
      'install.hintLocal': '用 file:// 直接打开时浏览器不允许安装：双击项目里的 create-desktop-shortcut.bat，会在桌面生成带图标的快捷方式。',
      'install.hintBrowser': '当前浏览器没有提供安装入口。换成 Chrome / Edge 打开，或把标签页固定到任务栏。',
      'install.hintInApp': '你正在应用内置浏览器里打开（微信 / QQ / 夸克等），这类浏览器不支持安装。点右上角「···」→ 用系统浏览器打开，再添加到主屏幕。',
      'install.hintIOS': 'iPhone / iPad 需要手动添加：点 Safari 底部的分享按钮 → 「添加到主屏幕」。',
      'install.hintAndroid': '点浏览器右上角菜单（⋮）→ 「安装应用」或「添加到主屏幕」。',
      'install.done': '已安装到桌面',
      'install.installed': '这个站点已经作为应用安装过了。',
      'install.ready': '可以安装：点上面的按钮把实验室放到桌面。',

      'home.eyebrow': 'Labo ouvert · 开放实验室',
      'home.title1': '高桌',
      'home.title2': '实验室',
      'home.lede': '一个可以立刻上手开动的计算机实验室：用多种语言刷题并实时调试，把算法与 AI 的学习资料整理成可检索的地图，再配上能拖动、能暂停、能改参数的动态演示，把抽象过程摊开在桌面上看清楚。',
      'home.ctaPrimary': '进入刷题台',
      'home.ctaSecondary': '看动态演示',
      'home.panelTitle': '站点现状',
      'home.statProblems': '道练习题',
      'home.statResources': '条资料索引',
      'home.statDemos': '个交互演示',
      'home.statLangs': '种编程语言',
      'home.modulesTitle': '四个工作台',
      'home.modulesLede': '每个模块都可以独立使用，后续扩展只需往数据文件里加内容。',
      'home.m1.title': '刷题台',
      'home.m1.fr': 'Table d\u2019exercices',
      'home.m1.desc': '按难度与标签筛选题目，含一个按教材章节组织的机器学习专题。选好语言直接写代码，运行测试用例并查看输出、耗时、报错行与变量快照。',
      'home.m2.title': '资料库',
      'home.m2.fr': 'Bibliothèque',
      'home.m2.desc': '算法与 AI 的资料索引：课程、书籍、论文、工具、练习场。支持关键词搜索与分类筛选。',
      'home.m3.title': '演示室',
      'home.m3.fr': 'Salle des démonstrations',
      'home.m3.desc': '排序、寻路、动态规划、二叉搜索树、注意力矩阵，以及机器学习专题的梯度下降、K 均值、决策树、k 近邻与主成分分析，全部可交互。',
      'home.m4.title': '安装到桌面',
      'home.m4.fr': 'Application locale',
      'home.m4.desc': '带 PWA 清单和 Service Worker：可以装成独立窗口的应用，断网也能打开看过的页面。本机用 file:// 打开时，项目里附了一个脚本用来生成带图标的桌面快捷方式。',
      'home.go': '进入 →',
      'home.howTitle': '这套站是怎么跑起来的',
      'home.how1.title': '本地直接打开',
      'home.how1.desc': '双击 index.html 即可浏览，不需要装任何东西。数据写成 .js 而不是 .json，就是为了避开 file:// 的跨域限制。',
      'home.how2.title': 'JS 与 Python 本地执行',
      'home.how2.desc': 'JavaScript 在 iframe 沙箱里真实运行，Python 由 Pyodide 在浏览器内编译执行（首次加载需要联网下载约 10MB 运行时）。',
      'home.how3.title': '其余语言走远程编译',
      'home.how3.desc': 'C / C++ / Java / C# / Go / Rust / PHP / Ruby / TypeScript 通过 Wandbox 公共编译服务运行：免密钥、需要联网，每个用例都会重新编译一次，所以比较慢。',
      'home.how4.title': '内容与代码分离',
      'home.how4.desc': '题目在 data/problems.js，资料在 data/resources.js，演示注册在 assets/js/demos.js。加内容不用改页面结构。',
      'practice.title': '刷题台',
      'practice.fr': 'Table d\u2019exercices',
      'practice.lede': '选题目、选语言、写代码、跑测试。所有运行结果都留在下方的调试预览里。',
      'practice.filter': '筛选',
      'practice.search': '搜索题目 / 标签…',
      'practice.diffAll': '全部',
      'practice.easy': '入门',
      'practice.medium': '进阶',
      'practice.hard': '挑战',
      'practice.noMatch': '没有符合条件的题目，换个关键词试试。',
      'practice.statement': '题目描述',
      'practice.inputFmt': '输入格式',
      'practice.outputFmt': '输出格式',
      'practice.samples': '样例',
      'practice.sampleIn': '输入',
      'practice.sampleOut': '输出',
      'practice.hint': '提示',
      'practice.editor': '代码编辑器',
      'practice.language': '语言',
      'practice.template': '起始模板',
      'practice.loadTemplate': '载入模板',
      'practice.resetConfirm': '确定要恢复到起始模板吗？当前代码会丢失。',
      'practice.refSolution': '参考解',
      'practice.showSolution': '查看参考解',
      'practice.solutionWarn': '参考解会覆盖当前编辑器内容，建议先自己写完再看。',
      'practice.runSample': '运行样例',
      'practice.runAll': '运行全部测试',
      'practice.result': '运行结果',
      'practice.tabTests': '测试用例',
      'practice.tabDebug': '调试预览',
      'practice.tabStdout': '输出',
      'practice.noRun': '还没有运行记录。点“运行样例”或“运行全部测试”开始。',
      'practice.emptyOut': '（无输出）',
      'practice.elapsed': '耗时',
      'practice.passed': '通过',
      'practice.failed': '未通过',
      'practice.wrongAnswer': '答案不一致',
      'practice.runtimeError': '运行出错',
      'practice.compileError': '编译错误',
      'practice.timeout': '超时',
      'practice.expected': '期望输出',
      'practice.actual': '实际输出',
      'practice.stdin': '输入',
      'practice.vars': '变量快照',
      'practice.noVars': '代码里调用 debug(值, 说明) 可以把中间变量打印到这一栏。',
      'practice.showMore': '展开全部',
      'practice.showLess': '收起',
      'practice.runnerJs': '浏览器内执行 · 离线可用',
      'practice.runnerPy': 'Pyodide · 首次约 10MB',
      'practice.runnerRemote': '远程沙箱 · 需联网 · 每个用例要重新编译，较慢',
      'practice.runnerLoad': '正在初始化运行环境…',
      'practice.remoteFail': '远程运行服务不可用（可能被网络拦截或超出频率限制），可以改用 JavaScript 或 Python 本地运行。',
      'practice.offlineHint': '当前语言需要联网运行，本地离线时请选 JavaScript 或 Python。',
      'practice.answerNote': '答案比对标明“忽略首尾空白”，行内空白差异会导致判定失败。',
      'practice.tabVars': '变量快照',
      'practice.sampleLabel': '样例',
      'practice.runningCase': '正在运行第 {n} / {m} 个用例…',
      'practice.statusAllPass': '全部通过',
      'practice.statusSomeFail': '还有未通过的用例',
      'practice.noSolution': '这道题还没有该语言的参考解',
      'practice.templateLoaded': '已恢复起始模板',
      'practice.solutionLoaded': '已载入参考解，建议先自己写完再看',
      'practice.demoLink': '相关演示',
      'practice.genericTemplate': '该语言使用通用输入输出模板，需要自己按题目改写读入部分',
      'practice.runHint': '快捷键 Ctrl / Cmd + Enter',
      'practice.runnerVersion': '编译器',

      'res.title': '算法与 AI 资料库',
      'res.fr': 'Bibliothèque',
      'res.lede': '把散落各处的课程、论文、工具和练习场整理成一张可检索的地图。分类会持续扩充。',
      'res.search': '搜索标题、作者、标签…',
      'res.allCats': '全部分类',
      'res.allTypes': '全部类型',
      'res.allLangs': '不限语言',
      'res.sortBy': '排序',
      'res.sortDefault': '默认顺序',
      'res.sortLevel': '按难度',
      'res.sortName': '按名称',
      'res.count': '条结果',
      'res.none': '没有匹配的资料，换个关键词或清空筛选。',
      'res.clearFilter': '清空筛选',
      'res.level': '难度',
      'res.level1': '入门',
      'res.level2': '进阶',
      'res.level3': '深入',
      'res.langZh': '中文',
      'res.langEn': '英文',
      'res.langBoth': '中英',
      'res.free': '免费',
      'res.paid': '部分收费',
      'res.noteTitle': '使用建议',
      'res.searchLabel': '关键词',
      'res.type': '类型',
      'res.levelLabel': '难度',
      'res.langLabel': '语言',
      'res.allLevels': '不限难度',
      'res.disclaimer': '以上条目是整理与推荐，版权归原作者所有；如果某个链接失效，直接在 data/resources.js 里改地址即可。',

      'demos.title': '动态演示室',
      'demos.fr': 'Salle des démonstrations',
      'demos.lede': '每个演示都能改参数、暂停和单步，用来把算法的中间状态看清楚，而不是只记住结论。',
      'demos.pick': '选择演示',
      'demos.howto': '怎么用',
      'demos.start': '开始',
      'demos.pause': '暂停',
      'demos.resume': '继续',
      'demos.step': '单步',
      'demos.shuffle': '重新生成',
      'demos.speed': '速度',
      'demos.size': '规模',
      'demos.algorithm': '算法',
      'demos.comparisons': '比较次数',
      'demos.swaps': '交换次数',
      'demos.complexity': '复杂度',
      'demos.elapsed': '步数',
      'demos.reset': '重置视图',
      'demos.drawWall': '按住鼠标拖动可以画墙，右键或按住 Shift 拖动可以擦除。',
      'demos.dragStart': '拖动绿色方块或红色方块可以移动起点和终点。',
      'demos.epoch': '训练轮次',
      'demos.loss': '损失',
      'demos.accuracy': '准确率',
      'demos.hidden': '隐藏层规模',
      'demos.lr': '学习率',
      'demos.dataset': '数据集',
      'demos.train': '开始训练',
      'demos.pauseTrain': '暂停训练',
      'demos.clearModel': '清空模型',
      'demos.noise': '噪声',
      'demos.similarity': '相似度矩阵',
      'demos.temperature': '温度',
      'demos.tokens': '词元数量',
      'demos.dim': '向量维度',
      'demos.attentionNote': '行方向做 softmax：每个词元按权重“看向”其他词元。改温度和维度看注意力如何变尖锐或分散。',
      'demos.sortNote': '柱高代表数值大小，金色柱是当前正在比较的一对，青色柱是已归位的元素。',
      'demos.pathNote': '灰色是墙，颜色深浅代表从起点出发的实际距离，白色虚线是回溯出来的路径。按住鼠标拖动可以画墙，右键或按住 Shift 拖动是擦除，拖动绿方块和红方块可以移动起点与终点。',
      'demos.nnNote': '每个点是一条训练样本，背景颜色是该点的预测分类，边界会随着训练不断被推平。',
      'demos.dpNote': '逐格填表：每一格都只依赖它的上方、左方和对角，这正是动态规划能省掉重复计算的原因。',
      'demos.bstNote': '插入时按大小分流，删除时用后继替换。切换遍历方式可以看到访问顺序的变化。',
      'demos.treeInsert': '插入值',
      'demos.treeDelete': '删除值',
      'demos.traversal': '遍历方式',
      'demos.treeRandom': '随机插入',
      'demos.treeClear': '清空树',
      'demos.treeHeight': '树高',
      'demos.treeNodes': '节点数',
      'demos.ops': '操作次数',
      'demos.dpCase': '例子',
      'demos.dpAlgorithm': '问题',
      'demos.playing': '演示中',
      'demos.done': '已完成',
      'demos.idle': '待开始',
      'demos.visited': '已访问格子',
      'demos.pathLen': '路径步数',
      'demos.pathCost': '路径代价',
      'demos.noPath': '不可达'
      ,'demos.dpSize': '表格规模'
      ,'demos.dpFilled': '已填格数'
      ,'demos.dpAnswer': '最终答案'
      ,'demos.value': '节点值'
      ,'demos.insert': '插入'
      ,'demos.remove': '删除'
      ,'demos.treeEmpty': '树是空的，插入一个值试试'
      ,'demos.structure': '向量结构'
      ,'demos.maxWeight': '最大权重'
      ,'demos.entropy': '行熵'
      ,'demos.selectedRow': '选中行'
      ,'demos.howto': '先挑一个演示，再用下方控件调参数。“开始 / 暂停”控制时间，“单步”一次推进一点，画布上能拖的东西都可以直接拖。'
      ,'demos.footerNote': '所有演示都在浏览器里算，没有任何后端依赖。想改行为直接改 assets/js/demo-*.js 里的参数或公式即可。'
      ,'demos.gdNote': '等高线是损失曲面，亮蓝线是参数走过的轨迹，右侧是损失随步数的变化。把学习率调大能看到震荡甚至发散；条件数越大（椭圆越扁）越难走。'
      ,'demos.gdStep': '步数'
      ,'demos.gdGrad': '梯度范数'
      ,'demos.gdState': '状态'
      ,'demos.gdCond': '条件数'
      ,'demos.momentum': '动量'
      ,'demos.kmeansNote': '灰点是数据，彩色圆点是质心。每个点先归给最近的质心，再把质心移到该簇的均值处 —— 这个过程中目标函数 J 只会下降。'
      ,'demos.kmeansK': '簇数 k'
      ,'demos.kmeansRounds': '迭代轮次'
      ,'demos.kmeansInertia': '目标函数 J'
      ,'demos.kmeansChanged': '本轮改判的点数'
      ,'demos.kmeansReset': '重置质心'
      ,'demos.treeNote': '金色线是当前选出的划分（信息增益最大），叶子区域的底色是它内部样本的多数类别。深度越大训练集越准，但也更容易过拟合。'
      ,'demos.treeDepth': '最大深度'
      ,'demos.treeLeaves': '叶子数'
      ,'demos.treeAccuracy': '训练集准确率'
      ,'demos.treeGain': '平均信息增益'
      ,'demos.treeEntropy': '叶子平均熵'
      ,'demos.knnNote': '背景是每个位置被 k 近邻投票的结果。k=1 时边界紧贴每个点、非常锯齿；k 调大后边界变平滑——这就是偏差与方差的权衡。'
      ,'demos.knnK': '近邻数 k'
      ,'demos.knnAccuracy': '训练集准确率'
      ,'demos.knnArea': '判为正类的面积'
      ,'demos.points': '样本数'
      ,'demos.pcaNote': '金色线是第一主成分方向（方差最大的方向），细虚线是各点在该方向上的投影，浅色虚线是与它垂直的次轴。相关系数越接近 ±1，第一主成分解释的方差比例越高。'
      ,'demos.pcaRho': '相关系数 ρ'
      ,'demos.pcaTheta': '主轴角度'
      ,'demos.pcaL1': '特征值 λ1'
      ,'demos.pcaRatio': '方差解释比例'
      ,'demos.pcaProject': '显示投影'
      ,'demos.pcaSpin': '连续变化 ρ'
      ,'demos.rocNote': '同一批带分数的样本画出的两条曲线。拖动阈值，金色圆点会沿曲线移动，指标栏里的混淆矩阵同步变化。两类分布重叠越少，AUC 越接近 1。'
      ,'demos.rocOverlap': '两类可分离度'
      ,'demos.rocThreshold': '判定阈值'
      ,'demos.rocPoint': '精确率 / 召回率'
      ,'demos.rocMatrix': 'TP / FP / FN / TN'
      ,'demos.linalgNote': '拖动画布可以改变向量 v，蓝色箭头是 A·v。四个滑块决定矩阵 A：网格被拉斜、旋转或压扁；单位方格变形后的面积等于 |det|，det 接近 0 时整个平面塌成一条线。'
      ,'demos.linalgArea': '面积缩放 |det|'
      ,'demos.linalgRank': '秩'
      ,'demos.linalgRotate': '旋转 30°'
      ,'demos.linalgReset': '重置矩阵'
      ,'demos.integralNote': '金色曲线下方的面积就是定积分。彩色梯形是数值近似，n 越大越贴近；指标栏同时给出近似值、精确值与误差，可以看到误差大约按 1/n² 收敛。'
      ,'demos.integralApprox': '梯形近似'
      ,'demos.integralExact': '精确值'
      ,'demos.integralError': '误差'
      ,'demos.integralAuto': '自动加密'
      ,'demos.integralFunc': '被积函数'
      ,'demos.pylistNote': '一步一步看 [表达式 for x in xs if 条件] 的求值顺序：取元素 → 判条件 → 通过才求值并追加。被划掉的元素没有通过条件，右侧只出现通过的那些结果。'
      ,'demos.pylistCond': '过滤条件'
      ,'demos.pylistExpr': '表达式'
      ,'demos.pylistScanned': '已扫描'
      ,'demos.pylistPassed': '通过条件'
      ,'demos.pylistOut': '已产出'
    },

    en: {
      'brand.sub': 'Laboratoire · Laboratory',
      'nav.home': 'Home',
      'nav.practice': 'Practice',
      'nav.resources': 'Library',
      'nav.demos': 'Demos',
      'nav.notes': 'Notes',
      'nav.about': 'About',

      'common.theme': 'Theme',
      'common.themeDark': 'Dark',
      'common.themeLight': 'Light',
      'common.lang': 'Language',
      'common.copy': 'Copy',
      'common.copied': 'Copied',
      'common.copyFail': 'Copy failed, select manually',
      'common.reset': 'Reset',
      'common.run': 'Run',
      'common.running': 'Running…',
      'common.loading': 'Loading…',
      'common.github': 'GitHub',
      'common.backHome': 'Back home',
      'common.readMore': 'Details',
      'common.open': 'Open',
      'common.source': 'Source',
      'common.none': 'None',
      'common.cleared': 'Cleared',
      'common.docs': 'Docs',
      'common.draft': 'Draft',
      'common.expand': 'Expand',
      'common.collapse': 'Collapse',
      'theme.auto': 'System',

      'footer.tag': 'Manifesto',
      'footer.tagText': 'Algorithms are not a list to memorise; they are mechanisms you can take apart by hand. This site puts problems, references and visualisations on one table.',
      'footer.nav': 'Sitemap',
      'footer.ref': 'External references',
      'footer.built': 'Pure static site, ready for GitHub Pages.',
      'footer.licenseNote': 'Content is curated for study; linked materials belong to their authors.',
      'footer.colophon': 'Typeset in plain HTML / CSS / JS · no build step',
      'notFound.title': 'This page is not on this table',
      'notFound.body': 'The address may be misspelled, or the page does not exist yet. Use one of the links below to get back on track.',
      'install.title': 'Desktop shortcut',
      'install.button': 'Install to desktop',
      'install.hintPwa': 'Runs in its own window with its own taskbar icon, and opens cached pages offline.',
      'install.hintLocal': 'Browsers cannot install over file://. Double-click create-desktop-shortcut.bat in the project to get a desktop shortcut with the icon.',
      'install.hintBrowser': 'This browser offers no install entry point. Open the site in Chrome or Edge, or pin the tab to the taskbar.',
      'install.hintInApp': 'You are inside an in-app browser (WeChat, QQ, Quark…), which does not support installation. Open the menu (⋯), choose "Open in browser", then add it to the home screen.',
      'install.hintIOS': 'On iPhone or iPad, tap the Safari share button, then "Add to Home Screen".',
      'install.hintAndroid': 'Open the browser menu (⋮) and choose "Install app" or "Add to Home screen".',
      'install.done': 'Installed to desktop',
      'install.installed': 'This site is already installed as an app.',
      'install.ready': 'Installable — use the button above to put the lab on your desktop.',

      'home.eyebrow': 'Labo ouvert · Open lab',
      'home.title1': 'Haute',
      'home.title2': 'Table',
      'home.lede': 'A computer laboratory you can start using immediately: solve problems in many languages with live debugging, browse algorithm and AI references as a searchable map, and watch abstract processes unfold through interactive demos you can drag, pause and re-tune.',
      'home.ctaPrimary': 'Open the practice table',
      'home.ctaSecondary': 'See the demos',
      'home.panelTitle': 'Current state',
      'home.statProblems': 'problems',
      'home.statResources': 'references',
      'home.statDemos': 'interactive demos',
      'home.statLangs': 'languages',
      'home.modulesTitle': 'Four workbenches',
      'home.modulesLede': 'Each module stands alone. Extending the site means adding rows to a data file.',
      'home.m1.title': 'Practice table',
      'home.m1.fr': 'Table d\u2019exercices',
      'home.m1.desc': 'Filter by difficulty and tag — including a machine learning set organised by textbook chapter — write in any supported language, then run the tests and inspect output, timing, error lines and variable snapshots.',
      'home.m2.title': 'Library',
      'home.m2.fr': 'Bibliothèque',
      'home.m2.desc': 'A curated index of algorithms and AI material: courses, books, papers, tools and practice arenas, with search and category filters.',
      'home.m3.title': 'Demo hall',
      'home.m3.fr': 'Salle des démonstrations',
      'home.m3.desc': 'Sorting, pathfinding, dynamic programming, binary search trees and attention matrices, plus gradient descent, k-means, decision trees, k-nearest neighbours and PCA from the machine learning set.',
      'home.m4.title': 'Install to desktop',
      'home.m4.fr': 'Application locale',
      'home.m4.desc': 'Ships a PWA manifest and a service worker: install it as a standalone window and reopen visited pages offline. On a local file:// copy, run create-desktop-shortcut.bat for a shortcut with the icon.',
      'home.go': 'Enter →',
      'home.howTitle': 'How this site runs',
      'home.how1.title': 'Open it locally',
      'home.how1.desc': 'Double-click index.html — no install required. Data lives in .js files rather than .json precisely so that file:// keeps working.',
      'home.how2.title': 'JS and Python run locally',
      'home.how2.desc': 'JavaScript executes in an iframe sandbox; Python is compiled in-browser by Pyodide (about 10 MB of runtime fetched on first use).',
      'home.how3.title': 'Other languages compile remotely',
      'home.how3.desc': 'C, C++, Java, C#, Go, Rust, PHP, Ruby and TypeScript run through the public Wandbox compile service: no API key, needs a network connection, and every test case is recompiled — so it is slow.',
      'home.how4.title': 'Content split from code',
      'home.how4.desc': 'Problems live in data/problems.js, references in data/resources.js, demos register themselves in assets/js/demos.js. Adding content never means editing page structure.',
      'practice.title': 'Practice table',
      'practice.fr': 'Table d\u2019exercices',
      'practice.lede': 'Pick a problem, pick a language, write code, run the tests. Everything you need to inspect stays in the debug panel below.',
      'practice.filter': 'Filter',
      'practice.search': 'Search problems or tags…',
      'practice.diffAll': 'All',
      'practice.easy': 'Easy',
      'practice.medium': 'Medium',
      'practice.hard': 'Hard',
      'practice.noMatch': 'No problem matches. Try another keyword.',
      'practice.statement': 'Statement',
      'practice.inputFmt': 'Input',
      'practice.outputFmt': 'Output',
      'practice.samples': 'Samples',
      'practice.sampleIn': 'Input',
      'practice.sampleOut': 'Output',
      'practice.hint': 'Hint',
      'practice.editor': 'Editor',
      'practice.language': 'Language',
      'practice.template': 'Starter template',
      'practice.loadTemplate': 'Load template',
      'practice.resetConfirm': 'Restore the starter template? Your current code will be lost.',
      'practice.refSolution': 'Reference solution',
      'practice.showSolution': 'Show reference solution',
      'practice.solutionWarn': 'The reference solution replaces the editor content. Try it yourself first.',
      'practice.runSample': 'Run samples',
      'practice.runAll': 'Run all tests',
      'practice.result': 'Result',
      'practice.tabTests': 'Test cases',
      'practice.tabDebug': 'Debug preview',
      'practice.tabStdout': 'Output',
      'practice.noRun': 'Nothing has run yet. Start with "Run samples" or "Run all tests".',
      'practice.emptyOut': '(no output)',
      'practice.elapsed': 'Time',
      'practice.passed': 'Passed',
      'practice.failed': 'Failed',
      'practice.wrongAnswer': 'Wrong answer',
      'practice.runtimeError': 'Runtime error',
      'practice.compileError': 'Compile error',
      'practice.timeout': 'Timeout',
      'practice.expected': 'Expected',
      'practice.actual': 'Actual',
      'practice.stdin': 'Input',
      'practice.vars': 'Variable snapshots',
      'practice.noVars': 'Call debug(value, label) in your code to dump intermediate values here.',
      'practice.showMore': 'Show all',
      'practice.showLess': 'Collapse',
      'practice.runnerJs': 'In-browser · works offline',
      'practice.runnerPy': 'Pyodide · ~10 MB first load',
      'practice.runnerRemote': 'Remote sandbox · needs network · recompiles per case, slow',
      'practice.runnerLoad': 'Initialising runtime…',
      'practice.remoteFail': 'The remote runner is unavailable (blocked network or rate limit). Switch to JavaScript or Python to run locally.',
      'practice.offlineHint': 'This language needs the network. Pick JavaScript or Python when offline.',
      'practice.answerNote': 'Comparison trims leading and trailing whitespace; inner whitespace differences still fail.',
      'practice.tabVars': 'Variables',
      'practice.sampleLabel': 'Sample',
      'practice.runningCase': 'Running case {n} / {m}…',
      'practice.statusAllPass': 'All tests passed',
      'practice.statusSomeFail': 'Some cases still fail',
      'practice.noSolution': 'No reference solution for this language yet',
      'practice.templateLoaded': 'Starter template restored',
      'practice.solutionLoaded': 'Reference solution loaded — try it yourself first next time',
      'practice.demoLink': 'Related demo',
      'practice.genericTemplate': 'this language uses the generic I/O template, so adapt the reading section yourself',
      'practice.runHint': 'Shortcut: Ctrl / Cmd + Enter',
      'practice.runnerVersion': 'Compiler',

      'res.title': 'Algorithm & AI library',
      'res.fr': 'Bibliothèque',
      'res.lede': 'Courses, papers, tools and arenas gathered into one searchable map. Categories keep growing.',
      'res.search': 'Search titles, authors, tags…',
      'res.allCats': 'All categories',
      'res.allTypes': 'All types',
      'res.allLangs': 'Any language',
      'res.sortBy': 'Sort',
      'res.sortDefault': 'Default order',
      'res.sortLevel': 'By level',
      'res.sortName': 'By name',
      'res.count': 'results',
      'res.none': 'Nothing matches. Try another keyword or clear the filters.',
      'res.clearFilter': 'Clear filters',
      'res.level': 'Level',
      'res.level1': 'Intro',
      'res.level2': 'Intermediate',
      'res.level3': 'Advanced',
      'res.langZh': 'Chinese',
      'res.langEn': 'English',
      'res.langBoth': 'Both',
      'res.free': 'Free',
      'res.paid': 'Partly paid',
      'res.noteTitle': 'How to use',
      'res.searchLabel': 'Keyword',
      'res.type': 'Type',
      'res.levelLabel': 'Level',
      'res.langLabel': 'Language',
      'res.allLevels': 'Any level',
      'res.disclaimer': 'These entries are curated recommendations; all rights belong to their authors. If a link breaks, edit the address in data/resources.js.',

      'demos.title': 'Demo hall',
      'demos.fr': 'Salle des démonstrations',
      'demos.lede': 'Every demo can be re-tuned, paused and stepped, so you can watch intermediate state instead of memorising conclusions.',
      'demos.pick': 'Pick a demo',
      'demos.howto': 'How to use',
      'demos.start': 'Start',
      'demos.pause': 'Pause',
      'demos.resume': 'Resume',
      'demos.step': 'Step',
      'demos.shuffle': 'Shuffle',
      'demos.speed': 'Speed',
      'demos.size': 'Size',
      'demos.algorithm': 'Algorithm',
      'demos.comparisons': 'Comparisons',
      'demos.swaps': 'Swaps',
      'demos.complexity': 'Complexity',
      'demos.elapsed': 'Steps',
      'demos.reset': 'Reset view',
      'demos.drawWall': 'Drag to draw walls; right-click or hold Shift to erase.',
      'demos.dragStart': 'Drag the green or red block to move start and target.',
      'demos.epoch': 'Epoch',
      'demos.loss': 'Loss',
      'demos.accuracy': 'Accuracy',
      'demos.hidden': 'Hidden units',
      'demos.lr': 'Learning rate',
      'demos.dataset': 'Dataset',
      'demos.train': 'Start training',
      'demos.pauseTrain': 'Pause training',
      'demos.clearModel': 'Clear model',
      'demos.noise': 'Noise',
      'demos.similarity': 'Similarity matrix',
      'demos.temperature': 'Temperature',
      'demos.tokens': 'Tokens',
      'demos.dim': 'Dimensions',
      'demos.attentionNote': 'Softmax runs along each row: every token "looks at" the others with some weight. Change temperature and dimensions to see attention sharpen or spread.',
      'demos.sortNote': 'Bar height is the value; the gold pair is being compared, teal bars are already in place.',
      'demos.pathNote': 'Grey cells are walls. Shade encodes real distance from the start, and the white dashed line is the reconstructed path. Drag to draw walls, right-click or hold Shift to erase, and drag the green or red block to move start and target.',
      'demos.nnNote': 'Each dot is a training sample, background colour is its predicted class, and the boundary flattens as training proceeds.',
      'demos.dpNote': 'Cells fill one at a time, each depending only on its top, left and diagonal neighbours — exactly why dynamic programming removes repeated work.',
      'demos.bstNote': 'Inserts branch by value; deletes swap in the successor. Switch traversal to watch the visit order change.',
      'demos.treeInsert': 'Insert value',
      'demos.treeDelete': 'Delete value',
      'demos.traversal': 'Traversal',
      'demos.treeRandom': 'Random insert',
      'demos.treeClear': 'Clear tree',
      'demos.treeHeight': 'Height',
      'demos.treeNodes': 'Nodes',
      'demos.ops': 'Operations',
      'demos.dpCase': 'Example',
      'demos.dpAlgorithm': 'Problem',
      'demos.playing': 'Running',
      'demos.done': 'Done',
      'demos.idle': 'Ready',
      'demos.visited': 'Visited cells',
      'demos.pathLen': 'Path steps',
      'demos.pathCost': 'Path cost',
      'demos.noPath': 'Unreachable'
      ,'demos.dpSize': 'Table size'
      ,'demos.dpFilled': 'Cells filled'
      ,'demos.dpAnswer': 'Answer'
      ,'demos.value': 'Value'
      ,'demos.insert': 'Insert'
      ,'demos.remove': 'Delete'
      ,'demos.treeEmpty': 'The tree is empty — insert a value'
      ,'demos.structure': 'Vector structure'
      ,'demos.maxWeight': 'Peak weight'
      ,'demos.entropy': 'Row entropy'
      ,'demos.selectedRow': 'Selected row'
      ,'demos.howto': 'Pick a demo, then tune it with the controls below. Start / Pause controls time, Step advances one unit, and anything draggable on the canvas can be dragged directly.'
      ,'demos.footerNote': 'Every demo runs entirely in the browser with no backend. To change behaviour, edit the parameters or formulas in the matching assets/js/demo-*.js file.'
      ,'demos.gdNote': 'Contours are the loss surface, the blue line is the parameter trajectory, and the right panel plots loss per step. Raise the learning rate to see oscillation and divergence; a larger condition number (flatter ellipse) makes progress harder.'
      ,'demos.gdStep': 'Steps'
      ,'demos.gdGrad': 'Gradient norm'
      ,'demos.gdState': 'State'
      ,'demos.gdCond': 'Conditioning'
      ,'demos.momentum': 'Momentum'
      ,'demos.kmeansNote': 'Grey points are data, coloured dots are centroids. Assign each point to its nearest centroid, then move each centroid to its cluster mean — the objective J never increases during this process.'
      ,'demos.kmeansK': 'Clusters k'
      ,'demos.kmeansRounds': 'Iterations'
      ,'demos.kmeansInertia': 'Objective J'
      ,'demos.kmeansChanged': 'Points reassigned'
      ,'demos.kmeansReset': 'Reset centroids'
      ,'demos.treeNote': 'The gold line is the split with the largest information gain; a leaf tint shows that region\'s majority class. Deeper trees fit the training set better and overfit sooner.'
      ,'demos.treeDepth': 'Max depth'
      ,'demos.treeLeaves': 'Leaves'
      ,'demos.treeAccuracy': 'Train accuracy'
      ,'demos.treeGain': 'Mean gain'
      ,'demos.treeEntropy': 'Mean leaf entropy'
      ,'demos.knnNote': 'The background is the k-NN vote at every location. With k=1 the boundary hugs every point and is very jagged; larger k smooths it — the bias-variance trade-off in one picture.'
      ,'demos.knnK': 'Neighbours k'
      ,'demos.knnAccuracy': 'Train accuracy'
      ,'demos.knnArea': 'Area predicted positive'
      ,'demos.points': 'Samples'
      ,'demos.pcaNote': 'The gold line is the first principal direction (largest variance), the faint lines are projections of each point onto it, and the dashed line is the perpendicular second axis. As |ρ| approaches 1 the first component explains more of the variance.'
      ,'demos.pcaRho': 'Correlation ρ'
      ,'demos.pcaTheta': 'Axis angle'
      ,'demos.pcaL1': 'Eigenvalue λ1'
      ,'demos.pcaRatio': 'Variance explained'
      ,'demos.pcaProject': 'Show projections'
      ,'demos.pcaSpin': 'Sweep ρ'
      ,'demos.rocNote': 'Both curves come from the same scored samples. Drag the threshold and the gold dot slides along each curve while the confusion matrix in the metrics updates. The less the two classes overlap, the closer AUC is to 1.'
      ,'demos.rocOverlap': 'Class separation'
      ,'demos.rocThreshold': 'Decision threshold'
      ,'demos.rocPoint': 'Precision / recall'
      ,'demos.rocMatrix': 'TP / FP / FN / TN'
      ,'demos.linalgNote': 'Drag anywhere on the canvas to move v; the blue arrow is A·v. The four sliders define A: the grid shears, rotates or collapses. The transformed unit square has area |det|, and as det approaches 0 the whole plane flattens onto a line.'
      ,'demos.linalgArea': 'Area scale |det|'
      ,'demos.linalgRank': 'Rank'
      ,'demos.linalgRotate': 'Rotate 30°'
      ,'demos.linalgReset': 'Reset matrix'
      ,'demos.integralNote': 'The area under the gold curve is the definite integral. The coloured trapezoids are the numerical approximation; larger n hugs the curve more closely, and the metrics show the approximation, the exact value and the error, which falls roughly like 1/n².'
      ,'demos.integralApprox': 'Trapezoid estimate'
      ,'demos.integralExact': 'Exact value'
      ,'demos.integralError': 'Error'
      ,'demos.integralAuto': 'Refine automatically'
      ,'demos.integralFunc': 'Integrand'
      ,'demos.pylistNote': 'Step through [expr for x in xs if cond]: take an element, test the condition, and only evaluate and append when it passes. Struck-through items failed the test, and only the survivors appear on the right.'
      ,'demos.pylistCond': 'Filter'
      ,'demos.pylistExpr': 'Expression'
      ,'demos.pylistScanned': 'Scanned'
      ,'demos.pylistPassed': 'Passed'
      ,'demos.pylistOut': 'Produced'
    }
  };

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* file:// 或隐私模式下可能不可用 */ }
    return null;
  }

  LHT.store = store;

  /* 语言模式：en（默认）| both（中英双语）| fr（法语界面，缺译回退英文） */
  LHT.lang = (function () {
    var saved = store('lht.lang');
    if (saved === 'zh') return 'both';          // 旧版「纯中文」并入双语模式
    if (saved === 'en' || saved === 'both' || saved === 'fr') return saved;
    return 'en';                                 // 进入站点默认英文
  })();

  /* 法语界面文案：只覆盖最常看到的骨架，其余键回退英文 */
  var FR = {
    'nav.home': 'Accueil',
    'nav.practice': 'Exercices',
    'nav.resources': 'Bibliothèque',
    'nav.demos': 'Démonstrations',
    'nav.notes': 'Notes de cours',
    'brand.sub': 'Laboratoire · 实验室',
    'common.run': 'Exécuter',
    'common.running': 'Exécution…',
    'common.reset': 'Réinitialiser',
    'common.copy': 'Copier',
    'common.copied': 'Copié',
    'common.open': 'Ouvrir',
    'common.theme': 'Thème',
    'common.lang': 'Langue',
    'practice.title': 'Table d’exercices',
    'practice.runSample': 'Exemples',
    'practice.runAll': 'Tous les tests',
    'resources.title': 'Bibliothèque',
    'demos.title': 'Salle des démonstrations',
    'demos.start': 'Démarrer',
    'demos.pause': 'Pause',
    'demos.step': 'Pas à pas',
    'demos.shuffle': 'Régénérer',
    'demos.speed': 'Vitesse',
    'footer.nav': 'Plan du site',
    'footer.ref': 'Références',
    'footer.built': 'Site statique, prêt pour GitHub Pages.'
  };
  DICT.fr = FR;

  /** 界面文案：双语模式下界面上仍用中文，正文内容才对照显示。 */
  LHT.t = function (key, fallback) {
    /* en → 全英文；both → 界面用中文、正文西文小字对照；fr → 法语词条，缺译回退英文 */
    var table = LHT.lang === 'fr' ? DICT.fr : (LHT.lang === 'both' ? DICT.zh : DICT.en);
    if (table && table[key] != null) return table[key];
    if (LHT.lang === 'fr' && DICT.en[key] != null) return DICT.en[key];
    var other = DICT.zh;
    if (other && other[key] != null) return other[key];
    return fallback != null ? fallback : key;
  };

  LHT.setLang = function (lang) {
    LHT.lang = lang;
    store('lht.lang', lang);
    LHT.applyI18n();
    if (typeof LHT.onLangChange === 'function') LHT.onLangChange(lang);
  };

  /**
   * 双语内容：接受 { zh, en } 或普通字符串。
   * 返回 HTML 片段（内容由本站数据文件提供，因此允许内嵌简单标签）。
   */
  LHT.pick = function (obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    var zh = obj.zh || obj.en || '';
    var en = obj.en || obj.zh || '';
    if (LHT.lang === 'fr') return obj.fr || en;
    if (LHT.lang === 'en') return en;
    if (LHT.lang === 'both' && zh !== en) {
      return LHT.esc(zh) + '<span class="lang-alt">' + LHT.esc(en) + '</span>';
    }
    return zh;
  };

  /** 纯文本版本，用于 title / aria-label 等属性。 */
  LHT.pickText = function (obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    var zh = obj.zh || obj.en || '';
    var en = obj.en || obj.zh || '';
    if (LHT.lang === 'fr') return obj.fr || en;
    if (LHT.lang === 'en') return en;
    if (LHT.lang === 'both' && zh !== en) return zh + ' / ' + en;
    return zh;
  };

  LHT.esc = function (value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  /** 把页面里所有 data-i18n* 属性刷新一遍。 */
  LHT.applyI18n = function (root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = LHT.t(nodes[i].getAttribute('data-i18n'));
    }
    var placeholders = scope.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      placeholders[j].setAttribute('placeholder', LHT.t(placeholders[j].getAttribute('data-i18n-placeholder')));
    }
    var labels = scope.querySelectorAll('[data-i18n-label]');
    for (var k = 0; k < labels.length; k++) {
      labels[k].setAttribute('aria-label', LHT.t(labels[k].getAttribute('data-i18n-label')));
    }
    var titles = scope.querySelectorAll('[data-i18n-title]');
    for (var m = 0; m < titles.length; m++) {
      titles[m].setAttribute('title', LHT.t(titles[m].getAttribute('data-i18n-title')));
    }
    document.documentElement.setAttribute('lang', LHT.lang === 'fr' ? 'fr' : 'en');
    document.documentElement.setAttribute('data-lang', LHT.lang);
  };
})();
