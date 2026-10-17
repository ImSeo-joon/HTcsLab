# Laboratoire de la Haute Table · 高桌实验室

一个纯静态的计算机实验室站点：多语言刷题与调试、算法与 AI 资料索引、可交互的算法演示。
站名固定使用法语，界面支持中文 / English / 双语对照三种模式。

没有任何构建步骤。双击 `index.html` 就能在本地浏览，也可以直接丢到 GitHub Pages。

---

## 一、本地查看

### 最简单的方式：直接打开

双击 `index.html` 即可。所有数据都放在 `.js` 文件里而不是 `.json`，
就是为了绕开 `file://` 协议下的跨域限制，所以直接打开不会出现「数据加载失败」。

### 更接近线上的方式：起一个本地服务器

```bash
# 在站点根目录（本文件夹）执行其一
python -m http.server 8000
npx serve .
```

然后访问 <http://localhost:8000/>。用服务器方式打开时，CodeMirror 编辑器和高亮会更稳定。

---

## 二、目录结构

```
.
├─ index.html                    首页：站点定位、模块入口、数据统计
├─ practice.html                 刷题台
├─ resources.html                资料库
├─ demos.html                    演示室
├─ 404.html                      GitHub Pages 的 404 页面
├─ manifest.json                 PWA 清单：装到桌面时的名称、图标、快捷方式
├─ sw.js                         Service Worker：网络优先，断网回落缓存
├─ create-desktop-shortcut.bat   双击即可在桌面生成带图标的快捷方式
├─ create-desktop-shortcut.ps1   上面那个 bat 调用的 PowerShell 脚本
├─ tools/                        图标生成与题库校验脚本（不参与站点运行）
│  ├─ logo-source.jpg            原始 logo，生成图标时读它
│  ├─ make-icons.py              生成 assets/img/ 里的全部图标
│  ├─ icon-analyze.py            量徽标边界、采样主色
│  ├─ dump-problems.mjs          把题库导出成 JSON
│  ├─ verify-solutions.mjs       跑一遍所有 JS 参考解
│  └─ verify-python.py           跑一遍所有 Python 参考解
├─ data/
│  ├─ problems.js                题库（题目、测试用例、各语言模板、参考解）
│  └─ resources.js               资料索引（分类、类型、难度、链接）
└─ assets/
   ├─ css/
   │  ├─ base.css                设计变量、排版、页头页脚、通用组件
   │  └─ modules.css             各页面模块样式
   ├─ img/                       全套图标（见下一节）
   ├─ fonts/                     自托管字体（见"字体与排版"一节）
   └─ js/
      ├─ i18n.js                 双语文案与 META（站名、版本号）
      ├─ site.js                 主题、语言、安装按钮、Service Worker 注册
      ├─ sandbox.js              三种代码执行后端
      ├─ practice.js             刷题台控制器
      ├─ resources.js            资料库控制器
      ├─ demos.js                演示室宿主与控件工厂
      └─ demo-*.js               六个演示模块（自注册）
```

---

## 三、图标与品牌色

图标全部由 `assets/img/` 里的同一套文件派发而来，源头是你提供的那张 logo 图：

| 文件 | 用途 |
|---|---|
| `favicon.ico` | 标签页图标，也是 Windows 桌面快捷方式的图标（16/24/32/48/64 多尺寸） |
| `favicon-32.png`、`mark-192.png` | 标签页与安卓主屏图标 |
| `apple-touch-icon.png` | iOS 添加到主屏 |
| `mark-512.png` | PWA 安装图标 |
| `mark-maskable-512.png` | PWA 自适应图标（徽标落在安全区内，圆角裁切不会切到字） |
| `mark-wide.png` | 页头品牌徽标（横向，自带品牌底色） |
| `logo.jpg` | 首页"版本图"版面素材 |
| `og-cover.png` | 分享到社交平台的封面（1200×630） |
| `mark-alpha-512.png` | 去底色透明徽标，只适合深色底（浅色底上白字会看不见） |

品牌色直接从 logo 采样：底色 `#022370`（靛蓝）、轨道蓝 `#40a8fe`（站点主色）。
界面里只有蓝、金两色承担结构（金色只用在分隔线和编号上），青、紫、红、黄仅作为**数据色**出现在图表与状态里。

换 logo 的流程：把新图覆盖成 `tools/logo-source.jpg`（原始图已经存在这里），然后跑：

```bash
"C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe" tools/make-icons.py
```

脚本会顺手打印它从图里采样到的主色，方便你同步改 CSS 变量。
徽标取哪一块由 `MARK_BOX` 决定；不确定边界时先跑 `tools/icon-analyze.py`，它会逐行输出亮像素分布，徽标与文字之间的空隙一目了然。

---

## 四、装到桌面

### 方式一：本机直接用 —— 桌面快捷方式

双击项目里的 `create-desktop-shortcut.bat`（或右键 `create-desktop-shortcut.ps1` → 使用 PowerShell 运行）。
它会在桌面生成 `Laboratoire de la Haute Table.lnk`：

- 用 Chrome / Edge 的**应用模式**打开（`--app=` 参数），有自己的窗口和任务栏图标，用起来像个本地应用
- 图标取自 `assets/img/favicon.ico`
- 找不到 Chrome / Edge 时自动退回默认浏览器
- 脚本内容保持纯 ASCII，避免 Windows PowerShell 5.1 读中文 .ps1 时乱码

### 方式二：部署后用 PWA 安装

站点带 `manifest.json` 和 Service Worker，所以在 **http(s) 环境**（localhost 或 GitHub Pages）下，
Chrome / Edge 地址栏会出现安装入口，页脚也会出现"安装到桌面"按钮：

- 独立窗口运行，任务栏图标就是徽标
- 右键应用图标可以直接跳到刷题台 / 演示室 / 资料库（manifest 里的 shortcuts）
- 打开过的页面断网时依然能访问

`file://` 下浏览器不支持 Service Worker，所以页脚会提示改用方式一 —— 这是浏览器限制，不是配置问题。

---

## 五、字体与排版

站点的三个字体角色全部**自托管**（文件在 `assets/fonts/`，拉丁字形子集，共约 190KB），
不请求 Google Fonts 或任何 CDN，所以在国内不会因为字体被墙而掉字形：

| 角色 | 字体 | 用在哪 |
|---|---|---|
| 展示衬线 `--serif` | Cormorant Garamond | 站名、首页大标题、法语文案、模块卡的斜体小标 |
| 正文无衬线 `--sans` | Inter | 界面文字、按钮、正文中英混排的拉丁部分 |
| 等宽 `--mono` | IBM Plex Mono | 图注编号、指标数字、代码、演示画布里的标签 |

中文不下载字体文件（CJK 字体动辄数 MB，会拖垮首屏），而是交给系统：
正文顺序是苹方 → 思源黑体 → 微软雅黑；`h1`/`h2` 走**宋体系**（Songti SC → SimSun），
这样中文标题和拉丁的 Cormorant 是同一套"铅字"气质。

想换风格的话，`assets/css/base.css` 顶部有全部 `@font-face`，`--serif` / `--sans` / `--mono`
三个变量在 `:root` 里，改完刷新即可。若要把中文标题也改成黑体，把 `h1, h2` 那两行的
`font-family` 换成 `var(--sans)` 就行（宋体在 Windows 上没有真粗体，靠合成加粗，字重要给足才有力）。

字号的整体尺度也在同一文件的 `body` 规则里：正文 16.5px / 行高 1.74，视觉上比常见博客站大一号。

---

## 六、专题内容（C 语言 / 机器学习）

### C 语言专题

编程题的实现语言里 **C 与 Python 排在最前**，因为这两门最适合配合课程练习。C 的内容分成两块：

1. **给已有题目补上 C 模板与参考解**（13 道经典题：输入输出、字符串反转、回文、FizzBuzz、
   二分查找、两数之和、最大子数组、括号匹配、最长公共子序列、编辑距离、单源最短路、
   N 皇后、拓扑排序）。其中几处是刻意用 C 的原生写法：
   - 字符串反转按 **UTF-8 字符**切分，而不是按字节倒序，否则中文会变乱码
   - 两数之和用一张开放寻址的小哈希表做到近似 O(n)，而不是两重循环
   - N 皇后用位掩码回溯，`free_bits & (~free_bits + 1)` 取最低位的 1
   - 编辑距离的字符比较同样按码点走，中文字符串才算得对
   - 空输入时 `fgets` 返回 NULL，回文与括号匹配这两题仍要输出正确结果
2. **5 道 C 课程向的原创题**：数组统计、按分隔符切分文本、结构体排序（`qsort` + 比较函数）、
   位运算（数 1 与判断 2 的幂）、动态数组逆序输出（`malloc` / `free` 配对）。

这些题在刷题台里带 `C 语言` 标签，语言选 C 时会载入专属模板与参考解。

C 参考解在本地用 gcc 逐用例验证：

```bash
node tools/verify-c.mjs      # 需要 PATH 里有 gcc（或设置 CC 环境变量）
```

三本 C 教材（*A First Book of ANSI C*、*C How to Program*、*The C Programming Language*）
只作为**知识点结构**的参考：覆盖哪些主题按它们来，题目、数据、代码全部原创，
没有收录任何原文，PDF 也没有放进仓库。

### 机器学习专题

刷题台里有一个按教材章节顺序组织的机器学习专题（22 道题），演示室里有 6 个对应的交互演示：

| 章节主题 | 题目 | 演示 |
|---|---|---|
| 模型评估 | 分类性能度量、P-R 曲线与平衡点、ROC 与 AUC、分层 k 折划分、偏差-方差分解、代价敏感决策 | ROC 曲线与 P-R 曲线 |
| 线性模型 | 线性回归一步梯度下降、对数几率回归、softmax 与交叉熵、SVM 间隔与支持向量 | 梯度下降与损失曲面 |
| 决策树 | 信息熵、信息增益、基尼指数 | 决策树与信息增益 |
| 神经网络 | 感知机更新、反向传播一层梯度 | （沿用演示室里的神经网络决策边界） |
| 贝叶斯 | 朴素贝叶斯（拉普拉斯平滑） | — |
| 集成学习 | AdaBoost 一轮权重更新 | — |
| 聚类 | K 均值一次迭代 | K 均值聚类 |
| 降维 | k 近邻分类、PCA 第一主成分 | k 近邻决策边界、主成分分析 |
| 强化学习 | Q 学习的一步更新、策略评估一步 | — |

章节顺序参照周志华《机器学习》（清华大学出版社），可以在资料库里看到这条书目记录。
**题目与数据都是本站原创**，只沿用公开的标准定义与公式，没有复制教材正文；
原始 PDF 也没有放进仓库，避免公开托管受版权保护的材料。

所有参考解都有 JavaScript 与 Python 两份，并且用 `tools/verify-*.mjs|py` 做过逐用例比对
（当前全站 35 题、164 个用例，两边都是 0 失败）。加新题的方式和普通题目完全一样，
只需在 `data/problems.js` 里追加，并给 `tags` 加上 `ml` 与对应章节标签即可被筛选到。

---

## 七、加内容（不用改页面结构）

### 加一道题

在 `data/problems.js` 的 `window.LHT_PROBLEMS` 数组里追加一个对象：

```js
{
  id: 'my-problem',
  title: { zh: '我的题目', en: 'My problem' },
  difficulty: 'easy',                    // easy | medium | hard
  tags: ['array', 'dp'],                 // 键取自同文件的 LHT_TAGS
  complexity: { time: 'O(n)', space: 'O(1)' },
  statement: { zh: '……', en: '……' },
  input:     { zh: '……', en: '……' },
  output:    { zh: '……', en: '……' },
  samples: [{ input: '1 2', output: '3' }],
  tests:   [{ name: '样例 1', input: '1 2', output: '3' }],
  hints:   [{ zh: '提示', en: 'Hint' }],
  templates: { js: '...', py: '...' },   // 起始模板，键名是 js / py
  solutions: { js: '...', py: '...' },   // 参考解
  demoId: 'dp'                           // 可选：关联到演示室的某个演示
}
```

约定：程序从标准输入读、往标准输出写；判定时只忽略首尾空白，并统一把 `\r\n` 归一为 `\n`。
JavaScript 额外提供 `readAll()` / `readline()` / `debug(...)`，Python 额外提供 `debug(...)`。

写完参考解之后，让机器替你验一遍（会逐个用例比对，有问题会打印期望与实际输出）：

```bash
node tools/verify-solutions.mjs     # 所有 JS 参考解
py   tools/verify-python.py         # 所有 Python 参考解（内部会调用 Node 导出题库）
```

当前题库共 13 题、两边各 70 个用例，全部通过。新增题目后跑一遍，能挡掉绝大多数手误。

### 加一条资料

在 `data/resources.js` 的 `window.LHT_RESOURCES` 里追加：

```js
{
  id: 'my-link',
  title: { zh: '标题', en: 'Title' },
  author: '作者 / 机构',
  cat: 'ml',            // 分类键，取自 LHT_RES_CATEGORIES
  type: 'course',       // 类型键，取自 LHT_RES_TYPES
  level: 2,             // 1 入门 / 2 进阶 / 3 深入
  lang: 'both',         // zh | en | both
  free: true,
  url: 'https://example.com/',
  alt: [{ label: '备用入口', url: 'https://example.org/' }],   // 可选
  note: { zh: '一句话说明', en: 'One-line note' },
  tags: ['标签']
}
```

### 加一个演示

新建 `assets/js/demo-xxx.js`，照抄任意一个现有演示的骨架即可，核心只有一步：

```js
LHT.Demos.register({
  id: 'xxx', name: { zh: '名字', en: 'Name' }, fr: 'Nom', aspect: 2,
  noteKey: 'demos.xxxNote',
  mount: function (ctx) { /* 用 ctx.view() 拿画布，用 ctx.range/select/button 造控件 */ }
});
```

然后在 `demos.html` 里加一行 `<script src="assets/js/demo-xxx.js"></script>`（放在 `demos.js` 之后）。
入口会按脚本顺序自动出现在左侧列表里，不需要改任何其它代码。

### 加一门语言

两处改动：在 `assets/js/sandbox.js` 的 `LHT.LANGUAGES` 里加一条（远程语言的 `runner`
填 `remote`，语言名要和 <https://wandbox.org/api/list.json> 里的 `language` 字段一致），
再在 `data/problems.js` 的 `LHT_GENERIC_TEMPLATES` 里补一份该语言的输入输出模板。

---

## 八、三种代码执行后端

| 语言 | 执行方式 | 联网 | 说明 |
|---|---|---|---|
| JavaScript | `sandbox="allow-scripts"` 的 iframe 沙箱 | 不需要 | 真实执行，6 秒超时保护，死循环会被强制中断 |
| Python | Pyodide（WebAssembly） | 首次约 10MB | 多镜像自动切换，之后走浏览器缓存 |
| C / C++ / Java / C# / Go / Rust / PHP / Ruby / TypeScript | Wandbox 公共编译服务 | 需要 | 免密钥、允许跨域；每个用例都要重新编译，比较慢 |

注意事项：

- Pyodide 版本写在 `assets/js/sandbox.js` 顶部的 `PYODIDE_VERSION`，换版本只改这一行。
- Pyodide 的镜像列表在同文件的 `PYODIDE_BASES`。实测 `cdn.jsdelivr.net` 与 `unpkg.com`
  在国内网络下经常被重置，所以默认顺序是 `fastly.jsdelivr.net` → `cdnjs` → 两者兜底。
- Pyodide 在主线程运行，**没法中断死循环**，写 Python 时请自己确认循环会退出。
- C / C++ 固定选用 GCC（否则 `bits/stdc++.h` 找不到），C# 固定选用 mono
  （Wandbox 上的 dotnetcore 构建会崩），这些偏好写在 `COMPILER_PREFERENCE` 里。
- 远程执行**不需要任何密钥**。曾经可用的 Piston 公共接口自 2026-02-15 起改成白名单制，
  所以默认走 Wandbox；如果你有自己的 Piston 实例，可以在控制台执行：

  ```js
  LHT.configureRemote({ pistonBase: 'https://your-host/api/v2', pistonKey: '可选' });
  ```

  之后所有远程语言都会改走该实例（配置存在浏览器本地，不会写进仓库）。

---

## 九、部署到 GitHub Pages

### 建仓库时怎么填

在 GitHub 的 "Create a new repository" 表单里：

| 字段 | 填什么 | 为什么 |
|---|---|---|
| Repository name | 任意，例如 `HTcsLab` | 站点地址会变成 `https://<用户名>.github.io/HTcsLab/`。站内所有路径都是相对的，放在子路径下完全正常，不用改任何代码 |
| Description | 随便写 | 只影响仓库页面的介绍 |
| Choose visibility | **Public** | 免费账号只有公开仓库能用 Pages（私有仓库需要 Pro） |
| Add README | **Off** | 项目里已经有 README.md，让 GitHub 再生成一个会在首次推送时冲突 |
| Add .gitignore | **No .gitignore** | 项目里已经带了一份 .gitignore（忽略 tools 产生的临时文件、系统文件） |
| Add license | No license | 按需。想让别人能自由复用代码，可以之后补一个 MIT |

想让站点直接在根路径（`https://<用户名>.github.io/`）而不是子路径，把仓库名写成
`<用户名>.github.io` 即可，其余填法完全一样。

### 推送

在项目文件夹里执行：

   ```bash
   git init
   git add .
   git commit -m "init: Laboratoire de la Haute Table"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

首次推送会弹窗要账号密码，密码框里必须粘贴 Personal Access Token（GitHub 从 2021 年起不接受登录密码）。

### 打开 Pages

仓库页面 → Settings → Pages → Source 选 `Deploy from a branch` →
分支选 `main`、目录选 `/ (root)` → 保存。一两分钟后访问 `https://<用户名>.github.io/<仓库名>/`。

因为站点根目录就是 `index.html` 所在目录，不需要任何额外配置。

上线后建议顺手确认三件事：标签页显示的是 HT 徽标、右侧"桌面快捷方式"一栏出现"安装到桌面"按钮
（Pages 是 https，Service Worker 和 PWA 都可用）、刷题台跑一次"运行全部测试"能通过。

### 两个小提醒

- `tools/` 目录也会一起发布出去（里面有你那张原始 logo 和几个脚本）。
  如果不想公开，推送前删掉它，或者把 `tools/` 加进 `.gitignore`。
- GitHub Pages 必须公开仓库，所以 commit 里会带上你在 git 里配置的邮箱。
  介意的话先在 GitHub 设置里开启 "Keep my email addresses private"，
  再把 `git config --global user.email` 改成 GitHub 给的那个 noreply 地址。

想用自定义域名、或者要国内访问更稳，可以把仓库接到 Cloudflare Pages：
构建命令留空、输出目录填 `/`，其余默认即可（Cloudflare 还允许私有仓库）。

---

## 十、改站名与版本号

站名、缩写、标语、版本号集中在 `assets/js/i18n.js` 顶部的 `LHT.META`。
改完记得同步 `index.html`、`practice.html`、`resources.html`、`demos.html`、`404.html`
里的品牌区和 `<title>`（这些是静态写死的，为的是 JS 失效时页面依然可用）。

---

## 十一、缓存与更新

Service Worker 采用**网络优先**：只要联网，刷新就能看到最新内容，改完 CSS / JS 不必担心被旧缓存挡住；
断网时回落到缓存版本，页面仍可打开。

真遇到"改了但没变"：

1. 先按 Ctrl+F5 强制刷新一次；
2. 还不行就把 `sw.js` 顶部的 `CACHE_VERSION` 加一（`v1` → `v2`），下次访问会整体换新缓存；
3. 调试期间可以在开发者工具的 Application → Service Workers 里勾选 Bypass for network。

---

## 十二、已知边界

- 远程语言（C / C++ / Java / Go / Rust 等）用的是公共执行服务，高峰期可能排队或限流。
- 资料库里的外部链接没有做可用性探测，失效了直接在 `data/resources.js` 里改地址。
- 刷题草稿存在浏览器 `localStorage`，换浏览器或清缓存会丢；题目本身在文件里，不受影响。
- 演示室同时只运行一个演示，切换时上一个演示的定时器和监听器会被自动释放。
