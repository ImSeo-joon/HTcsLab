/* ============================================================
   battle-scenarios.js — 单机网络攻防推演场景

   纯虚构教学场景：
   · 节点、攻击事件、数值均为本站设计
   · 不含真实目标、真实漏洞利用代码或可操作攻击指令
   · 玩家扮演蓝队，在有限预算内加固、隔离、备份与恢复
   ============================================================ */

window.LHT_BATTLE_SCENARIOS = [
  {
    id: 'campus',
    name: { zh: '校园选课系统', en: 'Campus Course Portal' },
    level: 1,
    brief: {
      zh: '开学前的选课系统只剩八个回合。预算有限，攻击会从邮件、Web 漏洞、流量洪峰和数据库勒索几个方向来。先决定哪些节点值得保。',
      en: 'Eight rounds before course registration opens. With a limited budget, attacks arrive through email, web exploits, traffic floods and database ransomware. Decide which nodes are worth saving.'
    },
    budget: 120,
    ap: 10,
    rounds: 8,
    nodes: [
      { id: 'gw',  label: { zh: '边界网关', en: 'Gateway' },   x: 100, y: 80,  critical: false, data: 0,  exposure: 3, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'web', label: { zh: '选课服务', en: 'Courses' },   x: 320, y: 80,  critical: true,  data: 30, exposure: 5, defense: { patch: 1, segment: 0, monitor: 1, backup: false } },
      { id: 'bk',  label: { zh: '备份节点', en: 'Backup' },    x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ws',  label: { zh: '教务终端', en: 'Staff PC' },  x: 100, y: 240, critical: false, data: 10, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'db',  label: { zh: '学生数据库', en: 'Student DB' }, x: 320, y: 240, critical: true,  data: 50, exposure: 4, defense: { patch: 1, segment: 0, monitor: 1, backup: true } }
    ],
    links: [['gw', 'web'], ['gw', 'ws'], ['web', 'db'], ['db', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'ws',  power: 18, hint: { zh: '有教师收到一封“选课失败”的可疑邮件。', en: 'A lecturer received a suspicious “course registration failed” email.' } },
      { round: 2, type: 'exploit',    target: 'web', power: 26, hint: { zh: '选课页面出现异常高频请求。', en: 'The course page is receiving unusually frequent requests.' } },
      { round: 3, type: 'ddos',       target: 'gw',  power: 22, hint: { zh: '校园网出口流量突然升高。', en: 'Outbound campus traffic has suddenly risen.' } },
      { round: 4, type: 'ransomware', target: 'db',  power: 42, hint: { zh: '数据库磁盘出现大量异常写入。', en: 'The database disk is seeing a burst of abnormal writes.' } },
      { round: 5, type: 'insider',    target: 'db',  power: 18, hint: { zh: '一个教务账号在凌晨登录并批量查询学生信息。', en: 'A staff account logged in at night and bulk-queried student records.' } },
      { round: 6, type: 'exploit',    target: 'web', power: 28, hint: { zh: 'Web 服务器日志出现新的扫描特征。', en: 'New scanning signatures appear in the web server log.' } },
      { round: 7, type: 'ransomware', target: 'db',  power: 46, hint: { zh: '备份目录被一个未知进程访问。', en: 'An unknown process has touched the backup directory.' } },
      { round: 8, type: 'ddos',       target: 'gw',  power: 25, hint: { zh: '校园网出口再次出现流量洪峰。', en: 'Another traffic surge is hitting the campus gateway.' } }
    ]
  },
  {
    id: 'hospital',
    name: { zh: '医院预约与病历系统', en: 'Hospital Booking & EHR' },
    level: 2,
    brief: {
      zh: '预约系统与电子病历共享一张网络。医生要查房，病人要预约，而攻击者只需要一次成功的勒索。九个回合，预算更紧。',
      en: 'Booking and electronic health records share one network. Doctors need their rounds, patients need appointments, and an attacker needs only one successful ransomware. Nine rounds, a tighter budget.'
    },
    budget: 110,
    ap: 14,
    rounds: 9,
    nodes: [
      { id: 'gw',  label: { zh: '医院网关', en: 'Gateway' },  x: 100, y: 80,  critical: false, data: 0,  exposure: 3, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'app', label: { zh: '预约服务', en: 'Booking' },  x: 320, y: 80,  critical: true,  data: 25, exposure: 5, defense: { patch: 1, segment: 0, monitor: 1, backup: false } },
      { id: 'bk',  label: { zh: '备份库', en: 'Backup' },     x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ws',  label: { zh: '医生终端', en: 'Doctor PC' }, x: 100, y: 240, critical: false, data: 10, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ehr', label: { zh: '电子病历', en: 'EHR' },      x: 320, y: 240, critical: true,  data: 55, exposure: 4, defense: { patch: 1, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['gw', 'app'], ['gw', 'ws'], ['app', 'ehr'], ['ehr', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'ws',  power: 22, hint: { zh: '多名医生收到“预约系统升级”的邮件。', en: 'Several doctors received a “booking system upgrade” email.' } },
      { round: 2, type: 'exploit',    target: 'app', power: 28, hint: { zh: '预约服务出现异常的登录尝试。', en: 'The booking service is seeing abnormal login attempts.' } },
      { round: 3, type: 'ddos',       target: 'gw',  power: 26, hint: { zh: '医院出口带宽被占满。', en: 'The hospital’s outbound bandwidth is saturated.' } },
      { round: 4, type: 'ransomware', target: 'ehr', power: 48, hint: { zh: '病历库出现异常加密写入。', en: 'The EHR store shows abnormal encryption writes.' } },
      { round: 5, type: 'insider',    target: 'ehr', power: 22, hint: { zh: '一个实习账号在深夜访问了大量病历。', en: 'An intern account accessed many records late at night.' } },
      { round: 6, type: 'exploit',    target: 'app', power: 32, hint: { zh: '预约 API 被自动化脚本扫描。', en: 'The booking API is being scanned by automated scripts.' } },
      { round: 7, type: 'ransomware', target: 'ehr', power: 52, hint: { zh: '备份库的访问日志出现异常。', en: 'The backup access log looks abnormal.' } },
      { round: 8, type: 'ddos',       target: 'gw',  power: 28, hint: { zh: '医院网络再次出现流量尖峰。', en: 'Another traffic spike hits the hospital network.' } },
      { round: 9, type: 'insider',    target: 'ehr', power: 26, hint: { zh: '病历库出现内部账号的批量导出。', en: 'An internal account is bulk-exporting records.' } }
    ]
  },
  {
    id: 'ecommerce',
    name: { zh: '电商交易后台', en: 'E-commerce Back Office' },
    level: 3,
    brief: {
      zh: '大促前夜，CDN、订单 API、支付服务和交易库同时在线。攻击面最大，预算也最多，但任何一条链路失守都会放大损失。',
      en: 'The night before a major sale: CDN, order API, payments and the ledger are all online. The largest attack surface and the largest budget — but any broken link amplifies the loss.'
    },
    budget: 130,
    ap: 20,
    rounds: 9,
    nodes: [
      { id: 'cdn',   label: { zh: 'CDN 入口', en: 'CDN' },      x: 100, y: 80,  critical: false, data: 0,  exposure: 4, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'api',   label: { zh: '订单 API', en: 'Orders' },    x: 320, y: 80,  critical: true,  data: 35, exposure: 6, defense: { patch: 1, segment: 0, monitor: 1, backup: false } },
      { id: 'pay',   label: { zh: '支付服务', en: 'Payments' },  x: 540, y: 80,  critical: true,  data: 45, exposure: 5, defense: { patch: 2, segment: 1, monitor: 1, backup: false } },
      { id: 'admin', label: { zh: '运营后台', en: 'Admin' },     x: 100, y: 240, critical: false, data: 15, exposure: 7, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'db',    label: { zh: '交易数据库', en: 'Ledger' },  x: 320, y: 240, critical: true,  data: 50, exposure: 5, defense: { patch: 1, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['cdn', 'api'], ['api', 'pay'], ['api', 'db'], ['cdn', 'admin'], ['db', 'pay']],
    events: [
      { round: 1, type: 'ddos',       target: 'cdn',   power: 30, hint: { zh: 'CDN 节点流量异常。', en: 'CDN node traffic is abnormal.' } },
      { round: 2, type: 'exploit',    target: 'api',   power: 30, hint: { zh: '订单 API 出现异常参数探测。', en: 'The order API is being probed with abnormal parameters.' } },
      { round: 3, type: 'phishing',   target: 'admin', power: 24, hint: { zh: '运营后台收到“退款通知”邮件。', en: 'The admin team received a “refund notice” email.' } },
      { round: 4, type: 'ransomware', target: 'db',    power: 46, hint: { zh: '交易库出现异常加密写入。', en: 'The ledger shows abnormal encryption writes.' } },
      { round: 5, type: 'exploit',    target: 'pay',   power: 34, hint: { zh: '支付服务出现异常调用。', en: 'The payment service is seeing abnormal calls.' } },
      { round: 6, type: 'ddos',       target: 'cdn',   power: 32, hint: { zh: 'CDN 再次遭遇流量洪峰。', en: 'Another traffic flood hits the CDN.' } },
      { round: 7, type: 'insider',    target: 'db',    power: 24, hint: { zh: '交易库出现内部账号批量查询。', en: 'An internal account is bulk-querying the ledger.' } },
      { round: 8, type: 'ransomware', target: 'db',    power: 50, hint: { zh: '交易库备份目录被访问。', en: 'The ledger backup directory was accessed.' } },
      { round: 9, type: 'exploit',    target: 'api',   power: 36, hint: { zh: '订单 API 出现新的扫描特征。', en: 'New scanning signatures appear on the order API.' } }
    ]
  },
  {
    id: 'club-site',
    name: { zh: '社团官网与报名', en: 'Club Site & Sign-up' },
    level: 1,
    brief: {
      zh: '招新前夜，社团官网和报名名单跑在一台旧服务器上。预算不多，先保住报名数据，再谈官网好看不好看。',
      en: 'The night before recruitment, the club site and sign-up list share one old server. With a small budget, keep the sign-up data alive before worrying about the site.'
    },
    budget: 90,
    ap: 9,
    rounds: 6,
    nodes: [
      { id: 'gw',  label: { zh: '社团网关', en: 'Gateway' },     x: 100, y: 80,  critical: false, data: 0,  exposure: 3, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'web', label: { zh: '社团官网', en: 'Club site' },   x: 320, y: 80,  critical: true,  data: 25, exposure: 5, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'bk',  label: { zh: '报名备份', en: 'Backup' },      x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ws',  label: { zh: '管理员终端', en: 'Admin PC' },  x: 100, y: 240, critical: false, data: 10, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'db',  label: { zh: '报名名单', en: 'Sign-up DB' },  x: 320, y: 240, critical: true,  data: 35, exposure: 4, defense: { patch: 0, segment: 0, monitor: 0, backup: true } }
    ],
    links: [['gw', 'web'], ['gw', 'ws'], ['web', 'db'], ['db', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'ws',  power: 16, hint: { zh: '管理员收到一封“报名表更新”的邮件。', en: 'The admin received a “sign-up form update” email.' } },
      { round: 2, type: 'exploit',    target: 'web', power: 22, hint: { zh: '官网插件出现异常请求。', en: 'The club-site plugin is receiving abnormal requests.' } },
      { round: 3, type: 'ddos',       target: 'gw',  power: 18, hint: { zh: '社团域名解析突然变慢。', en: 'The club domain has suddenly slowed down.' } },
      { round: 4, type: 'ransomware', target: 'db',  power: 34, hint: { zh: '报名表出现异常加密写入。', en: 'The sign-up table shows abnormal encryption writes.' } },
      { round: 5, type: 'exploit',    target: 'web', power: 24, hint: { zh: '官网后台出现新的扫描特征。', en: 'New scanning signatures appear on the admin panel.' } },
      { round: 6, type: 'insider',    target: 'db',  power: 16, hint: { zh: '一个旧账号在凌晨批量导出报名信息。', en: 'An old account is bulk-exporting sign-ups at night.' } }
    ]
  },
  {
    id: 'lab-files',
    name: { zh: '实验室文件服务器', en: 'Lab File Server' },
    level: 1,
    brief: {
      zh: '毕业设计周，文件服务器上放着全组的代码与数据。备份是离线的，但恢复需要时间；先决定哪些目录值得保。',
      en: 'Thesis week: the file server holds the whole group’s code and data. The backup is offline, but restoring takes time. Decide which directories are worth saving.'
    },
    budget: 90,
    ap: 9,
    rounds: 6,
    nodes: [
      { id: 'gw',  label: { zh: '实验室网关', en: 'Gateway' },   x: 100, y: 80,  critical: false, data: 0,  exposure: 3, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'nas', label: { zh: '文件服务器', en: 'File server' }, x: 320, y: 80, critical: true,  data: 30, exposure: 4, defense: { patch: 0, segment: 0, monitor: 0, backup: true } },
      { id: 'bk',  label: { zh: '离线备份', en: 'Offline backup' }, x: 540, y: 80, critical: false, data: 0, exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'pc',  label: { zh: '实验终端', en: 'Lab PC' },      x: 320, y: 240, critical: false, data: 10, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } }
    ],
    links: [['gw', 'nas'], ['gw', 'pc'], ['nas', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'pc',  power: 16, hint: { zh: '实验终端收到“共享目录迁移”的邮件。', en: 'A lab PC received a “shared folder migration” email.' } },
      { round: 2, type: 'exploit',    target: 'nas', power: 22, hint: { zh: '文件服务器的旧服务出现异常登录。', en: 'An old file-server service is seeing abnormal logins.' } },
      { round: 3, type: 'ddos',       target: 'gw',  power: 18, hint: { zh: '实验室出口流量异常升高。', en: 'Lab outbound traffic is abnormally high.' } },
      { round: 4, type: 'ransomware', target: 'nas', power: 34, hint: { zh: '共享目录出现异常加密写入。', en: 'The shared folder shows abnormal encryption writes.' } },
      { round: 5, type: 'exploit',    target: 'nas', power: 24, hint: { zh: '文件服务器出现新的扫描特征。', en: 'New scanning signatures appear on the file server.' } },
      { round: 6, type: 'insider',    target: 'nas', power: 16, hint: { zh: '一个已毕业账号仍在访问共享目录。', en: 'A graduated account is still accessing the shared folder.' } }
    ]
  },
  {
    id: 'cafe-pos',
    name: { zh: '咖啡店收银与会员', en: 'Cafe POS & Loyalty' },
    level: 1,
    brief: {
      zh: '一家小店把收银、会员和监控接在同一张网上。预算不多，但会员数据不能丢；先分清哪些设备真的需要联网。',
      en: 'A small cafe puts the till, loyalty database and cameras on one network. The budget is small, but the loyalty data cannot be lost. Decide which devices really need to be online.'
    },
    budget: 85,
    ap: 9,
    rounds: 6,
    nodes: [
      { id: 'router', label: { zh: '门店路由', en: 'Router' },    x: 100, y: 80,  critical: false, data: 0,  exposure: 4, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'pos',    label: { zh: '收银终端', en: 'POS' },       x: 320, y: 80,  critical: true,  data: 20, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'camera', label: { zh: '监控主机', en: 'Camera NVR' }, x: 540, y: 80, critical: false, data: 5,  exposure: 5, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'member', label: { zh: '会员数据库', en: 'Loyalty DB' }, x: 320, y: 240, critical: true, data: 30, exposure: 4, defense: { patch: 0, segment: 0, monitor: 0, backup: true } }
    ],
    links: [['router', 'pos'], ['router', 'camera'], ['pos', 'member']],
    events: [
      { round: 1, type: 'phishing',   target: 'camera', power: 14, hint: { zh: '监控主机收到“固件升级”的邮件。', en: 'The camera NVR received a “firmware update” email.' } },
      { round: 2, type: 'exploit',    target: 'pos',    power: 20, hint: { zh: '收银终端出现异常外联。', en: 'The POS terminal is making abnormal outbound connections.' } },
      { round: 3, type: 'ddos',       target: 'router', power: 16, hint: { zh: '门店网络突然变慢。', en: 'The cafe network has suddenly slowed down.' } },
      { round: 4, type: 'ransomware', target: 'member', power: 30, hint: { zh: '会员库出现异常加密写入。', en: 'The loyalty database shows abnormal encryption writes.' } },
      { round: 5, type: 'insider',    target: 'member', power: 14, hint: { zh: '一个离职店员的账号仍在查询会员。', en: 'A former employee account is still querying members.' } },
      { round: 6, type: 'exploit',    target: 'pos',    power: 22, hint: { zh: '收银终端出现新的扫描特征。', en: 'New scanning signatures appear on the POS terminal.' } }
    ]
  },
  {
    id: 'exam-online',
    name: { zh: '在线考试系统', en: 'Online Exam System' },
    level: 2,
    brief: {
      zh: '期末考试前，考试服务和题库同时在线。泄题与宕机都会造成严重后果，而监考终端是最容易被忽略的入口。',
      en: 'Before finals, the exam service and question bank are both online. A leak or an outage is equally serious, and the proctor terminals are the easiest entry point to overlook.'
    },
    budget: 110,
    ap: 14,
    rounds: 8,
    nodes: [
      { id: 'gw',      label: { zh: '考试网关', en: 'Gateway' },     x: 100, y: 80,  critical: false, data: 0,  exposure: 3, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'exam',    label: { zh: '考试服务', en: 'Exam service' }, x: 320, y: 80,  critical: true,  data: 30, exposure: 5, defense: { patch: 1, segment: 0, monitor: 1, backup: false } },
      { id: 'bk',      label: { zh: '题库备份', en: 'Q-bank backup' }, x: 540, y: 80, critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'proctor', label: { zh: '监考终端', en: 'Proctor PC' },   x: 100, y: 240, critical: false, data: 10, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'qbank',   label: { zh: '题库', en: 'Question bank' },    x: 320, y: 240, critical: true,  data: 45, exposure: 4, defense: { patch: 1, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['gw', 'exam'], ['gw', 'proctor'], ['exam', 'qbank'], ['qbank', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'proctor', power: 20, hint: { zh: '监考终端收到“考试安排更新”的邮件。', en: 'A proctor PC received an “exam schedule update” email.' } },
      { round: 2, type: 'exploit',    target: 'exam',    power: 26, hint: { zh: '考试服务出现异常登录尝试。', en: 'The exam service is seeing abnormal login attempts.' } },
      { round: 3, type: 'ddos',       target: 'gw',      power: 22, hint: { zh: '考试入口流量突然升高。', en: 'Traffic to the exam gateway has suddenly risen.' } },
      { round: 4, type: 'ransomware', target: 'qbank',   power: 40, hint: { zh: '题库出现异常加密写入。', en: 'The question bank shows abnormal encryption writes.' } },
      { round: 5, type: 'insider',    target: 'qbank',   power: 18, hint: { zh: '一个旧教师账号在深夜批量查询题目。', en: 'An old teacher account is bulk-querying questions at night.' } },
      { round: 6, type: 'exploit',    target: 'exam',    power: 28, hint: { zh: '考试服务出现新的扫描特征。', en: 'New scanning signatures appear on the exam service.' } },
      { round: 7, type: 'ransomware', target: 'qbank',   power: 44, hint: { zh: '题库备份目录被访问。', en: 'The question-bank backup directory was accessed.' } },
      { round: 8, type: 'ddos',       target: 'gw',      power: 24, hint: { zh: '考试入口再次出现流量尖峰。', en: 'Another traffic spike hits the exam gateway.' } }
    ]
  },
  {
    id: 'library',
    name: { zh: '图书馆借阅与座位预约', en: 'Library Loans & Seats' },
    level: 2,
    brief: {
      zh: '考试周图书馆座位预约爆满，借阅库和预约服务都不能停。自助借还机是方便，也是最容易被忽略的入口。',
      en: 'During exam week the seat booking system is full, and neither the loan database nor the booking service can go down. Self-service kiosks are convenient — and the easiest entry point to overlook.'
    },
    budget: 115,
    ap: 14,
    rounds: 8,
    nodes: [
      { id: 'gw',    label: { zh: '图书馆网关', en: 'Gateway' },      x: 100, y: 80,  critical: false, data: 0,  exposure: 3, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'opac',  label: { zh: '检索与预约', en: 'Search & seats' }, x: 320, y: 80,  critical: true,  data: 25, exposure: 5, defense: { patch: 1, segment: 0, monitor: 1, backup: false } },
      { id: 'bk',    label: { zh: '借阅备份', en: 'Loan backup' },    x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'kiosk', label: { zh: '自助借还机', en: 'Kiosk' },        x: 100, y: 240, critical: false, data: 10, exposure: 6, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'loan',  label: { zh: '借阅数据库', en: 'Loan DB' },      x: 320, y: 240, critical: true,  data: 40, exposure: 4, defense: { patch: 1, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['gw', 'opac'], ['gw', 'kiosk'], ['opac', 'loan'], ['loan', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'kiosk', power: 18, hint: { zh: '自助借还机收到“系统升级”的邮件。', en: 'A kiosk received a “system upgrade” email.' } },
      { round: 2, type: 'exploit',    target: 'opac',  power: 24, hint: { zh: '座位预约页面出现异常请求。', en: 'The seat booking page is receiving abnormal requests.' } },
      { round: 3, type: 'ddos',       target: 'gw',    power: 20, hint: { zh: '图书馆入口流量突然升高。', en: 'Traffic to the library gateway has suddenly risen.' } },
      { round: 4, type: 'ransomware', target: 'loan',  power: 38, hint: { zh: '借阅库出现异常加密写入。', en: 'The loan database shows abnormal encryption writes.' } },
      { round: 5, type: 'insider',    target: 'loan',  power: 18, hint: { zh: '一个离职馆员账号仍在查询借阅记录。', en: 'A former librarian account is still querying loans.' } },
      { round: 6, type: 'exploit',    target: 'opac',  power: 28, hint: { zh: '预约服务出现新的扫描特征。', en: 'New scanning signatures appear on the booking service.' } },
      { round: 7, type: 'ransomware', target: 'loan',  power: 42, hint: { zh: '借阅库备份目录被访问。', en: 'The loan backup directory was accessed.' } },
      { round: 8, type: 'ddos',       target: 'gw',    power: 22, hint: { zh: '图书馆入口再次出现流量尖峰。', en: 'Another traffic spike hits the library gateway.' } }
    ]
  },
  {
    id: 'startup-saas',
    name: { zh: '创业公司 SaaS 后台', en: 'Startup SaaS Back Office' },
    level: 2,
    brief: {
      zh: '小团队把所有东西塞进一套后台：应用、租户库和 CI 主机都在线。CI 权限很大，租户库不能丢，发布流程也不能停。',
      en: 'A small team puts everything in one back office: app, tenant database and CI host all online. CI has broad permissions, the tenant database cannot be lost, and releases cannot stop.'
    },
    budget: 115,
    ap: 14,
    rounds: 8,
    nodes: [
      { id: 'lb',     label: { zh: '负载入口', en: 'Load balancer' }, x: 100, y: 80,  critical: false, data: 0,  exposure: 4, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'app',    label: { zh: '应用服务', en: 'App service' },   x: 320, y: 80,  critical: true,  data: 25, exposure: 5, defense: { patch: 1, segment: 0, monitor: 1, backup: false } },
      { id: 'bk',     label: { zh: '租户备份', en: 'Tenant backup' }, x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ci',     label: { zh: 'CI/CD 主机', en: 'CI/CD host' }, x: 100, y: 240, critical: false, data: 15, exposure: 7, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'tenant', label: { zh: '租户数据库', en: 'Tenant DB' },   x: 320, y: 240, critical: true,  data: 45, exposure: 4, defense: { patch: 1, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['lb', 'app'], ['app', 'tenant'], ['app', 'ci'], ['tenant', 'bk']],
    events: [
      { round: 1, type: 'phishing',   target: 'ci',     power: 20, hint: { zh: 'CI 主机收到“构建失败”的邮件。', en: 'The CI host received a “build failed” email.' } },
      { round: 2, type: 'exploit',    target: 'app',    power: 26, hint: { zh: '应用服务出现异常参数探测。', en: 'The app service is being probed with abnormal parameters.' } },
      { round: 3, type: 'ddos',       target: 'lb',     power: 22, hint: { zh: '负载入口流量异常升高。', en: 'Traffic to the load balancer is abnormally high.' } },
      { round: 4, type: 'ransomware', target: 'tenant', power: 42, hint: { zh: '租户库出现异常加密写入。', en: 'The tenant database shows abnormal encryption writes.' } },
      { round: 5, type: 'insider',    target: 'tenant', power: 20, hint: { zh: '一个旧员工账号仍在批量查询租户。', en: 'An ex-employee account is bulk-querying tenants.' } },
      { round: 6, type: 'exploit',    target: 'app',    power: 28, hint: { zh: '应用服务出现新的扫描特征。', en: 'New scanning signatures appear on the app service.' } },
      { round: 7, type: 'ransomware', target: 'tenant', power: 46, hint: { zh: '租户库备份目录被访问。', en: 'The tenant backup directory was accessed.' } },
      { round: 8, type: 'ddos',       target: 'lb',     power: 24, hint: { zh: '负载入口再次出现流量尖峰。', en: 'Another traffic spike hits the load balancer.' } }
    ]
  },
  {
    id: 'cloud-saas',
    name: { zh: '多租户云平台', en: 'Multi-tenant Cloud Platform' },
    level: 3,
    brief: {
      zh: '多租户平台一旦认证或租户库失守，所有客户都会受影响。发布流水线是最容易被忽略的入口，边缘网关则承受第一波流量。',
      en: 'If authentication or the tenant database falls, every customer is affected. The release pipeline is the easiest entry to overlook, while the edge gateway takes the first traffic wave.'
    },
    budget: 160,
    ap: 20,
    rounds: 10,
    nodes: [
      { id: 'edge',   label: { zh: '边缘网关', en: 'Edge gateway' }, x: 100, y: 80,  critical: false, data: 0,  exposure: 4, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'auth',   label: { zh: '认证服务', en: 'Auth service' }, x: 320, y: 80,  critical: true,  data: 30, exposure: 5, defense: { patch: 1, segment: 1, monitor: 1, backup: false } },
      { id: 'bk',     label: { zh: '异地备份', en: 'Offsite backup' }, x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ci',     label: { zh: '发布流水线', en: 'Release CI' }, x: 100, y: 240, critical: false, data: 15, exposure: 7, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'api',    label: { zh: '业务 API', en: 'Business API' }, x: 320, y: 240, critical: true,  data: 35, exposure: 6, defense: { patch: 2, segment: 1, monitor: 1, backup: false } },
      { id: 'tenant', label: { zh: '租户数据', en: 'Tenant data' },  x: 540, y: 240, critical: true,  data: 50, exposure: 4, defense: { patch: 2, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['edge', 'auth'], ['edge', 'api'], ['auth', 'api'], ['api', 'tenant'], ['ci', 'api'], ['tenant', 'bk']],
    events: [
      { round: 1,  type: 'ddos',       target: 'edge',   power: 28, hint: { zh: '边缘网关出现异常流量。', en: 'The edge gateway is seeing abnormal traffic.' } },
      { round: 2,  type: 'phishing',   target: 'ci',     power: 22, hint: { zh: '发布流水线收到“构建缓存清理”的邮件。', en: 'The release pipeline received a “build cache cleanup” email.' } },
      { round: 3,  type: 'exploit',    target: 'auth',   power: 30, hint: { zh: '认证服务出现异常令牌请求。', en: 'The auth service is seeing abnormal token requests.' } },
      { round: 4,  type: 'exploit',    target: 'api',    power: 32, hint: { zh: '业务 API 出现异常参数探测。', en: 'The business API is being probed with abnormal parameters.' } },
      { round: 5,  type: 'ransomware', target: 'tenant', power: 46, hint: { zh: '租户数据出现异常加密写入。', en: 'Tenant data shows abnormal encryption writes.' } },
      { round: 6,  type: 'insider',    target: 'tenant', power: 24, hint: { zh: '一个旧运维账号在批量导出租户数据。', en: 'An old ops account is bulk-exporting tenant data.' } },
      { round: 7,  type: 'ddos',       target: 'edge',   power: 30, hint: { zh: '边缘网关再次出现流量洪峰。', en: 'Another traffic flood hits the edge gateway.' } },
      { round: 8,  type: 'exploit',    target: 'auth',   power: 34, hint: { zh: '认证服务出现新的扫描特征。', en: 'New scanning signatures appear on the auth service.' } },
      { round: 9,  type: 'ransomware', target: 'tenant', power: 50, hint: { zh: '租户数据备份目录被访问。', en: 'The tenant backup directory was accessed.' } },
      { round: 10, type: 'exploit',    target: 'api',    power: 36, hint: { zh: '业务 API 出现新的扫描特征。', en: 'New scanning signatures appear on the business API.' } }
    ]
  },
  {
    id: 'fintech',
    name: { zh: '支付清算与风控', en: 'Payments, Clearing & Risk' },
    level: 3,
    brief: {
      zh: '支付、风控与清算三条链路互相依赖。任何一条断了，损失都会放大；运营终端和风控引擎是最容易被低估的入口。',
      en: 'Payments, risk and clearing depend on one another. If any link breaks, the loss amplifies; ops terminals and the risk engine are the most underestimated entry points.'
    },
    budget: 170,
    ap: 20,
    rounds: 10,
    nodes: [
      { id: 'edge',   label: { zh: '接入网关', en: 'Access gateway' }, x: 100, y: 80,  critical: false, data: 0,  exposure: 4, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'pay',    label: { zh: '支付服务', en: 'Payments' },      x: 320, y: 80,  critical: true,  data: 45, exposure: 6, defense: { patch: 2, segment: 1, monitor: 1, backup: false } },
      { id: 'bk',     label: { zh: '审计备份', en: 'Audit backup' },  x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'ops',    label: { zh: '运营终端', en: 'Ops terminal' },  x: 100, y: 240, critical: false, data: 15, exposure: 7, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'risk',   label: { zh: '风控引擎', en: 'Risk engine' },   x: 320, y: 240, critical: true,  data: 30, exposure: 5, defense: { patch: 1, segment: 1, monitor: 1, backup: false } },
      { id: 'ledger', label: { zh: '清算账本', en: 'Clearing ledger' }, x: 540, y: 240, critical: true, data: 55, exposure: 5, defense: { patch: 2, segment: 1, monitor: 1, backup: true } }
    ],
    links: [['edge', 'pay'], ['edge', 'ops'], ['pay', 'risk'], ['pay', 'ledger'], ['risk', 'ledger'], ['ledger', 'bk']],
    events: [
      { round: 1,  type: 'ddos',       target: 'edge',   power: 32, hint: { zh: '支付入口出现异常流量。', en: 'The payment gateway is seeing abnormal traffic.' } },
      { round: 2,  type: 'phishing',   target: 'ops',    power: 24, hint: { zh: '运营终端收到“退款审批”的邮件。', en: 'An ops terminal received a “refund approval” email.' } },
      { round: 3,  type: 'exploit',    target: 'pay',    power: 36, hint: { zh: '支付服务出现异常调用。', en: 'The payment service is seeing abnormal calls.' } },
      { round: 4,  type: 'exploit',    target: 'risk',   power: 30, hint: { zh: '风控引擎出现异常规则查询。', en: 'The risk engine is seeing abnormal rule queries.' } },
      { round: 5,  type: 'ransomware', target: 'ledger', power: 52, hint: { zh: '清算账本出现异常加密写入。', en: 'The clearing ledger shows abnormal encryption writes.' } },
      { round: 6,  type: 'insider',    target: 'ledger', power: 26, hint: { zh: '一个旧财务账号在批量导出账本。', en: 'An old finance account is bulk-exporting the ledger.' } },
      { round: 7,  type: 'ddos',       target: 'edge',   power: 34, hint: { zh: '支付入口再次出现流量洪峰。', en: 'Another traffic flood hits the payment gateway.' } },
      { round: 8,  type: 'exploit',    target: 'pay',    power: 38, hint: { zh: '支付服务出现新的扫描特征。', en: 'New scanning signatures appear on the payment service.' } },
      { round: 9,  type: 'ransomware', target: 'ledger', power: 56, hint: { zh: '清算账本备份目录被访问。', en: 'The ledger backup directory was accessed.' } },
      { round: 10, type: 'insider',    target: 'risk',   power: 28, hint: { zh: '风控引擎出现内部账号的批量规则修改。', en: 'An internal account is bulk-editing risk rules.' } }
    ]
  },
  {
    id: 'hospital-group',
    name: { zh: '跨院区医疗平台', en: 'Multi-campus Hospital' },
    level: 3,
    brief: {
      zh: '集团把预约、病历和影像打通后，攻击面也跟着变大。分院终端是最薄弱的入口，而病历与影像任何一边失守都会影响诊疗。',
      en: 'Connecting booking, records and imaging across the group also enlarges the attack surface. Branch terminals are the weakest entry, and losing either records or imaging disrupts care.'
    },
    budget: 165,
    ap: 20,
    rounds: 10,
    nodes: [
      { id: 'edge',    label: { zh: '集团网关', en: 'Group gateway' }, x: 100, y: 80,  critical: false, data: 0,  exposure: 4, defense: { patch: 0, segment: 1, monitor: 0, backup: false } },
      { id: 'booking', label: { zh: '统一预约', en: 'Booking' },       x: 320, y: 80,  critical: true,  data: 30, exposure: 5, defense: { patch: 1, segment: 1, monitor: 1, backup: false } },
      { id: 'bk',      label: { zh: '备份中心', en: 'Backup centre' }, x: 540, y: 80,  critical: false, data: 0,  exposure: 2, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'clinic',  label: { zh: '分院终端', en: 'Branch PC' },     x: 100, y: 240, critical: false, data: 15, exposure: 7, defense: { patch: 0, segment: 0, monitor: 0, backup: false } },
      { id: 'emr',     label: { zh: '集团病历', en: 'Group EHR' },     x: 320, y: 240, critical: true,  data: 55, exposure: 5, defense: { patch: 2, segment: 1, monitor: 1, backup: true } },
      { id: 'imaging', label: { zh: '影像系统', en: 'Imaging' },       x: 540, y: 240, critical: true,  data: 35, exposure: 5, defense: { patch: 1, segment: 1, monitor: 1, backup: false } }
    ],
    links: [['edge', 'booking'], ['edge', 'clinic'], ['booking', 'emr'], ['emr', 'imaging'], ['emr', 'bk'], ['clinic', 'booking']],
    events: [
      { round: 1,  type: 'phishing',   target: 'clinic',  power: 24, hint: { zh: '分院终端收到“集团通讯录更新”的邮件。', en: 'A branch PC received a “group directory update” email.' } },
      { round: 2,  type: 'exploit',    target: 'booking', power: 30, hint: { zh: '统一预约出现异常登录尝试。', en: 'Unified booking is seeing abnormal login attempts.' } },
      { round: 3,  type: 'ddos',       target: 'edge',    power: 30, hint: { zh: '集团网关流量异常升高。', en: 'Group gateway traffic is abnormally high.' } },
      { round: 4,  type: 'ransomware', target: 'emr',     power: 50, hint: { zh: '集团病历出现异常加密写入。', en: 'Group EHR shows abnormal encryption writes.' } },
      { round: 5,  type: 'exploit',    target: 'imaging', power: 34, hint: { zh: '影像系统出现异常查询。', en: 'The imaging system is seeing abnormal queries.' } },
      { round: 6,  type: 'insider',    target: 'emr',     power: 26, hint: { zh: '一个旧院区账号在批量导出病历。', en: 'An old campus account is bulk-exporting records.' } },
      { round: 7,  type: 'ransomware', target: 'emr',     power: 54, hint: { zh: '集团病历备份目录被访问。', en: 'The group EHR backup directory was accessed.' } },
      { round: 8,  type: 'ddos',       target: 'edge',    power: 32, hint: { zh: '集团网关再次出现流量洪峰。', en: 'Another traffic flood hits the group gateway.' } },
      { round: 9,  type: 'exploit',    target: 'booking', power: 32, hint: { zh: '统一预约出现新的扫描特征。', en: 'New scanning signatures appear on booking.' } },
      { round: 10, type: 'insider',    target: 'emr',     power: 30, hint: { zh: '集团病历出现内部账号的批量导出。', en: 'An internal account is bulk-exporting group records.' } }
    ]
  }
];
