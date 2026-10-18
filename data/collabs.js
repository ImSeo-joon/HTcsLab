/* ============================================================
   collabs.js — 高校课题组 / 项目组公开信息索引

   合规说明：
   · 仅收录机构官网、实验室 People/Join Us/Admissions 页面可公开访问的信息
   · 不收录个人邮箱、学生名单、未公开招生名额或付费内推信息
   · 导师简介为公开资料摘要，可能与最新页面有差异，具体以官网为准
   · 项目摘要为本站原创改写，不复制官网原文
   · updated 表示条目整理时间，不代表招生状态已逐条核验
   ============================================================ */

window.LHT_COLLAB_REGIONS = [
  { id: 'us',   label: { zh: '美国', en: 'United States' } },
  { id: 'ca',   label: { zh: '加拿大', en: 'Canada' } },
  { id: 'uk',   label: { zh: '英国', en: 'United Kingdom' } },
  { id: 'eu',   label: { zh: '欧洲', en: 'Europe' } },
  { id: 'cn',   label: { zh: '中国', en: 'China' } },
  { id: 'hk',   label: { zh: '中国香港', en: 'Hong Kong, China' } },
  { id: 'mo',   label: { zh: '中国澳门', en: 'Macau, China' } },
  { id: 'tw',   label: { zh: '中国台湾', en: 'Taiwan, China' } },
  { id: 'asia', label: { zh: '亚洲', en: 'Asia' } }
];

window.LHT_COLLAB_FIELDS = [
  { id: 'ai',       label: { zh: '人工智能', en: 'AI' } },
  { id: 'ml',       label: { zh: '机器学习', en: 'Machine learning' } },
  { id: 'cv',       label: { zh: '计算机视觉', en: 'Computer vision' } },
  { id: 'nlp',      label: { zh: '自然语言处理', en: 'NLP' } },
  { id: 'robotics', label: { zh: '机器人', en: 'Robotics' } },
  { id: 'systems',  label: { zh: '系统与网络', en: 'Systems' } },
  { id: 'theory',   label: { zh: '理论计算机', en: 'Theory' } },
  { id: 'hci',      label: { zh: '人机交互', en: 'HCI' } },
  { id: 'medai',    label: { zh: '医学 AI', en: 'Medical AI' } }
];

window.LHT_COLLAB_LEVELS = [
  { id: 'undergrad', label: { zh: '本科', en: 'Undergraduate' } },
  { id: 'master',    label: { zh: '硕士', en: "Master's" } },
  { id: 'phd',       label: { zh: '博士', en: 'PhD' } },
  { id: 'postdoc',   label: { zh: '博士后', en: 'Postdoc' } },
  { id: 'visiting',  label: { zh: '访问 / 交换', en: 'Visiting' } }
];

window.LHT_COLLAB_TYPES = [
  { id: 'summer',     label: { zh: '暑期研究', en: 'Summer research' } },
  { id: 'research',   label: { zh: '科研项目', en: 'Research project' } },
  { id: 'phd',        label: { zh: '博士项目', en: 'PhD program' } },
  { id: 'visiting',   label: { zh: '访问项目', en: 'Visiting programme' } },
  { id: 'fellowship', label: { zh: '奖学金 / Fellowship', en: 'Fellowship' } },
  { id: 'joint',      label: { zh: '联合培养', en: 'Joint training' } }
];

window.LHT_COLLABS = [
  {
    id: 'stanford-sail',
    institution: { zh: '斯坦福大学', en: 'Stanford University' },
    unit: { zh: 'Stanford AI Lab (SAIL) · HAI', en: 'Stanford AI Lab (SAIL) · HAI' },
    region: 'us',
    fields: ['ai', 'cv', 'ml'],
    levels: ['phd', 'visiting'],
    types: ['research', 'visiting'],
    language: ['en'],
    funding: { zh: '以项目/导师资助与官方项目说明为准', en: 'Depends on the project, supervisor funding and official program terms' },
    mentor: {
      name: { zh: '李飞飞', en: 'Fei-Fei Li' },
      initials: 'FL',
      title: { zh: '斯坦福大学计算机科学教授', en: 'Professor of Computer Science, Stanford' },
      bio: {
        zh: '公开资料摘要：李飞飞教授任职于斯坦福大学计算机科学系，是 Stanford HAI 的联合主任之一，长期从事计算机视觉与以人为中心的 AI 研究，也是 ImageNet 的主要推动者之一。具体招生与访问安排以斯坦福官网为准。',
        en: 'Public-profile summary: Fei-Fei Li is a professor of computer science at Stanford and a co-director of Stanford HAI. Her public work spans computer vision and human-centered AI, and she was a leading force behind ImageNet. Check Stanford’s official pages for current admissions and visiting arrangements.'
      },
      link: 'https://ai.stanford.edu/~feifeili/',
      highlight: true
    },
    project: {
      title: { zh: '视觉、基础模型与以人为中心的 AI', en: 'Vision, foundation models and human-centered AI' },
      summary: {
        zh: 'SAIL 与 HAI 的研究覆盖计算机视觉、机器人学习、基础模型、医疗 AI 与 AI 政策。学生项目通常从论文复现、数据集构建或小规模实验开始，强调独立读论文、清楚记录实验和跨学科合作。访问或博士申请应通过斯坦福官方项目与导师页面，本站不代收材料。',
        en: 'Research across SAIL and HAI spans computer vision, robot learning, foundation models, medical AI and AI policy. Student projects often begin with paper reproduction, dataset work or small experiments, with an emphasis on independent reading, clear experiment logs and interdisciplinary collaboration. Apply through Stanford’s official program and faculty pages; this site does not collect materials.'
      },
      methods: {
        zh: '视觉表征、基础模型评估、人机协作、医疗影像与 AI 政策研究。',
        en: 'Visual representations, foundation-model evaluation, human-AI collaboration, medical imaging and AI policy.'
      },
      fit: {
        zh: '适合有 CV/ML 基础、能读英文论文、熟悉 PyTorch 的学生；有公开项目、复现报告或论文经历更有说服力。',
        en: 'Best for students with CV/ML fundamentals, English paper reading and PyTorch experience; public projects, reproduction reports or papers help.'
      }
    },
    apply: {
      url: 'https://ai.stanford.edu/',
      label: { zh: 'SAIL 官方页面', en: 'SAIL official page' },
      note: {
        zh: '通过官网的招生/访问/研究页面申请；本站不是中介，不提供内推、保录或付费服务。',
        en: 'Apply through the official admissions, visiting or research pages. This site is not an agency and offers no referrals, guarantees or paid services.'
      }
    },
    source: { url: 'https://ai.stanford.edu/', label: { zh: 'Stanford SAIL', en: 'Stanford SAIL' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'berkeley-bair',
    institution: { zh: '加州大学伯克利分校', en: 'UC Berkeley' },
    unit: { zh: 'Berkeley AI Research (BAIR)', en: 'Berkeley AI Research (BAIR)' },
    region: 'us',
    fields: ['ai', 'ml', 'robotics'],
    levels: ['phd', 'visiting'],
    types: ['research', 'visiting'],
    language: ['en'],
    funding: { zh: '以 Berkeley 官方项目、导师资助与奖学金说明为准', en: 'Check Berkeley program funding, supervisor support and fellowships' },
    mentor: {
      name: { zh: 'Pieter Abbeel', en: 'Pieter Abbeel' },
      initials: 'PA',
      title: { zh: 'UC Berkeley EECS 教授', en: 'Professor of EECS, UC Berkeley' },
      bio: {
        zh: '公开资料摘要：Pieter Abbeel 是 UC Berkeley EECS 教授、BAIR 成员，公开研究集中在机器人学习、强化学习、模仿学习与自主系统。具体招生与访问安排以 Berkeley 官网为准。',
        en: 'Public-profile summary: Pieter Abbeel is a professor of EECS at UC Berkeley and a BAIR member. His public research focuses on robot learning, reinforcement learning, imitation learning and autonomous systems. Check Berkeley’s official pages for current admissions and visiting arrangements.'
      },
      link: 'https://people.eecs.berkeley.edu/~pabbeel/',
      highlight: true
    },
    project: {
      title: { zh: '机器人学习与自主系统', en: 'Robot learning and autonomous systems' },
      summary: {
        zh: 'BAIR 覆盖机器人学习、强化学习、模仿学习、自动驾驶、操控与多模态感知。项目重视真实机器人或仿真实验、代码质量与安全评估；访问/博士申请通过 Berkeley 官方页面。建议先读目标课题组近两年的论文，再说明你能复现或推进哪一部分。',
        en: 'BAIR spans robot learning, reinforcement learning, imitation learning, autonomous driving, manipulation and multimodal perception. Projects value real-robot or simulation experiments, code quality and safety evaluation. Apply through Berkeley’s official pages, and read the target group’s recent papers before proposing what you can reproduce or extend.'
      },
      methods: {
        zh: '强化学习、模仿学习、机器人操控、仿真到现实迁移、多模态感知。',
        en: 'Reinforcement learning, imitation learning, manipulation, sim-to-real transfer and multimodal perception.'
      },
      fit: {
        zh: '适合有 PyTorch、控制/优化、机器人或 RL 基础的学生；能维护实验代码和清楚记录失败案例很重要。',
        en: 'Best for students with PyTorch, control/optimisation, robotics or RL foundations; maintaining experiment code and documenting failures matters.'
      }
    },
    apply: {
      url: 'https://bair.berkeley.edu/',
      label: { zh: 'BAIR 官方页面', en: 'BAIR official page' },
      note: {
        zh: '通过 Berkeley 官方招生/访问页面申请；本站不代收材料，也不提供导师内推。',
        en: 'Apply through Berkeley’s official admissions or visiting pages. This site does not collect materials or offer faculty referrals.'
      }
    },
    source: { url: 'https://bair.berkeley.edu/', label: { zh: 'Berkeley BAIR', en: 'Berkeley BAIR' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'mit-csail',
    institution: { zh: '麻省理工学院', en: 'MIT' },
    unit: { zh: 'Computer Science and Artificial Intelligence Laboratory (CSAIL)', en: 'Computer Science and Artificial Intelligence Laboratory (CSAIL)' },
    region: 'us',
    fields: ['ai', 'robotics', 'systems', 'hci'],
    levels: ['undergrad', 'phd', 'visiting'],
    types: ['summer', 'research', 'phd'],
    language: ['en'],
    funding: { zh: '以 MIT 官方项目、REU/访问项目与导师资助为准', en: 'Check MIT official programs, REU/visiting terms and supervisor funding' },
    mentor: {
      name: { zh: 'Daniela Rus', en: 'Daniela Rus' },
      initials: 'DR',
      title: { zh: 'MIT CSAIL 主任、EECS 教授', en: 'Director of CSAIL and Professor of EECS, MIT' },
      bio: {
        zh: '公开资料摘要：Daniela Rus 是 MIT CSAIL 主任、EECS 教授，公开研究覆盖机器人、自治系统与网络化机器人。CSAIL 的招生与访问通常按课题组进行，具体以官网为准。',
        en: 'Public-profile summary: Daniela Rus is the director of MIT CSAIL and a professor of EECS. Her public research covers robotics, autonomous systems and networked robots. CSAIL admissions and visiting are usually organised by research group; check the official pages.'
      },
      link: 'https://danielarus.csail.mit.edu/',
      highlight: true
    },
    project: {
      title: { zh: '机器人、系统与跨组合作', en: 'Robotics, systems and cross-group collaboration' },
      summary: {
        zh: 'CSAIL 是 MIT 最大的跨学科计算实验室之一，覆盖机器人、系统、AI、HCI、理论等多个方向。本科研究、访问与博士机会通常按课题组招生；建议先锁定 2–3 个目标组，读组内论文与项目页，再通过官方渠道联系。',
        en: 'CSAIL is one of MIT’s largest interdisciplinary computing labs, spanning robotics, systems, AI, HCI and theory. Undergraduate research, visiting and PhD opportunities are usually group-specific; shortlist two or three groups, read their papers and project pages, then use official channels.'
      },
      methods: {
        zh: '机器人、自治系统、系统与网络、人机交互、AI 基础与跨学科项目。',
        en: 'Robotics, autonomous systems, systems and networking, HCI, AI foundations and interdisciplinary projects.'
      },
      fit: {
        zh: '适合有较强编程/数学基础、能独立读论文并愿意长期投入项目的学生；不同组的先修要求差异很大。',
        en: 'Best for students with strong programming/maths, independent paper reading and commitment to a longer project; prerequisites vary widely by group.'
      }
    },
    apply: {
      url: 'https://www.csail.mit.edu/',
      label: { zh: 'CSAIL 官方页面', en: 'CSAIL official page' },
      note: {
        zh: '通过 MIT/CSAIL 官方项目页与课题组页面申请；本站不代收材料，也不保证回复。',
        en: 'Apply through MIT/CSAIL official program and group pages. This site does not collect materials or guarantee a reply.'
      }
    },
    source: { url: 'https://www.csail.mit.edu/', label: { zh: 'MIT CSAIL', en: 'MIT CSAIL' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'cmu-lti',
    institution: { zh: '卡内基梅隆大学', en: 'Carnegie Mellon University' },
    unit: { zh: 'Language Technologies Institute (LTI)', en: 'Language Technologies Institute (LTI)' },
    region: 'us',
    fields: ['nlp', 'ml', 'ai'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en'],
    funding: { zh: '以 CMU 博士项目资助与官方说明为准', en: 'Check CMU PhD funding and official program terms' },
    mentor: {
      name: { zh: 'LTI 导师组', en: 'LTI faculty group' },
      initials: 'LTI',
      title: { zh: '语言技术研究所导师组', en: 'Language Technologies Institute faculty' },
      bio: {
        zh: '公开资料摘要：LTI 由 NLP、语音、机器翻译、对话系统与机器学习等方向的导师组共同指导，博士录取后按研究方向匹配导师。具体导师名单与招生状态以 LTI 官网 People/Admissions 页面为准。',
        en: 'Public-profile summary: LTI brings together faculty in NLP, speech, machine translation, dialogue and machine learning; PhD students are matched with advisers after admission. Check the LTI People/Admissions pages for the current faculty list and status.'
      },
      link: 'https://www.lti.cs.cmu.edu/',
      highlight: false
    },
    project: {
      title: { zh: '语言技术、NLP 与语音', en: 'Language technologies, NLP and speech' },
      summary: {
        zh: 'LTI 聚焦自然语言处理、语音识别与合成、机器翻译、对话系统、信息检索与语言技术应用。博士项目为主，也提供访问/研究机会；申请材料通常包括成绩单、推荐信、研究陈述与英语成绩，具体以官网为准。',
        en: 'LTI focuses on NLP, speech recognition and synthesis, machine translation, dialogue, information retrieval and language applications. It is primarily a PhD-oriented institute with some visiting/research opportunities; typical materials include transcripts, references, a research statement and English scores. Check the official page.'
      },
      methods: {
        zh: '大语言模型、机器翻译、语音、对话、信息检索、多模态语言处理。',
        en: 'Large language models, machine translation, speech, dialogue, retrieval and multimodal language processing.'
      },
      fit: {
        zh: '适合有 NLP/ML 基础、较强编程与英文写作能力的学生；有论文、开源项目或评测经验更有竞争力。',
        en: 'Best for students with NLP/ML foundations, strong coding and English writing; papers, open-source work or evaluation experience help.'
      }
    },
    apply: {
      url: 'https://www.lti.cs.cmu.edu/',
      label: { zh: 'LTI 官方页面', en: 'LTI official page' },
      note: {
        zh: '通过 CMU/LTI 官方招生页面申请；本站不代收材料，也不提供内部推荐。',
        en: 'Apply through CMU/LTI official admissions pages. This site does not collect materials or offer internal referrals.'
      }
    },
    source: { url: 'https://www.lti.cs.cmu.edu/', label: { zh: 'CMU LTI', en: 'CMU LTI' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'mila',
    institution: { zh: '蒙特利尔大学 / Mila', en: 'Université de Montréal / Mila' },
    unit: { zh: 'Mila — Quebec AI Institute', en: 'Mila — Quebec AI Institute' },
    region: 'ca',
    fields: ['ai', 'ml'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en', 'fr'],
    funding: { zh: '以 Mila/蒙特利尔大学官方项目与奖学金为准', en: 'Check Mila/Université de Montréal program funding and scholarships' },
    mentor: {
      name: { zh: 'Yoshua Bengio', en: 'Yoshua Bengio' },
      initials: 'YB',
      title: { zh: 'Mila 科学主任、蒙特利尔大学教授', en: 'Scientific Director of Mila and Professor at Université de Montréal' },
      bio: {
        zh: '公开资料摘要：Yoshua Bengio 是 Mila 科学主任、蒙特利尔大学教授，公开研究覆盖深度学习、生成模型、表示学习、AI 安全与神经科学启发的方法。具体招生与访问安排以 Mila 官网为准。',
        en: 'Public-profile summary: Yoshua Bengio is the scientific director of Mila and a professor at Université de Montréal. His public work spans deep learning, generative models, representation learning, AI safety and neuroscience-inspired methods. Check Mila’s official pages for admissions and visiting.'
      },
      link: 'https://yoshuabengio.org/',
      highlight: true
    },
    project: {
      title: { zh: '深度学习、生成模型与 AI 安全', en: 'Deep learning, generative models and AI safety' },
      summary: {
        zh: 'Mila 是全球深度学习研究重镇，研究覆盖生成模型、表示学习、优化、因果、AI 安全与神经科学启发方法。提供博士、实习/研究访问等机会，法语和英语环境并存；申请通过 Mila 或蒙特利尔大学官方页面。',
        en: 'Mila is a major deep-learning hub, covering generative models, representation learning, optimisation, causality, AI safety and neuroscience-inspired methods. It offers PhD, internship/research-visiting opportunities in a French/English environment; apply through Mila or Université de Montréal official pages.'
      },
      methods: {
        zh: '生成模型、表示学习、优化、因果推断、AI 安全、神经科学启发计算。',
        en: 'Generative models, representation learning, optimisation, causal inference, AI safety and neuroscience-inspired computing.'
      },
      fit: {
        zh: '适合数学与编程基础扎实、能读论文并独立做实验的学生；法语不是硬性要求，但生活与部分项目会用到。',
        en: 'Best for students with solid maths and coding, able to read papers and run experiments independently; French is not always required, but helps in daily life and some projects.'
      }
    },
    apply: {
      url: 'https://mila.quebec/en/',
      label: { zh: 'Mila 官方页面', en: 'Mila official page' },
      note: {
        zh: '通过 Mila/蒙特利尔大学官方招生与实习页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through Mila/Université de Montréal official admissions and internship pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://mila.quebec/en/', label: { zh: 'Mila', en: 'Mila' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'oxford-aims',
    institution: { zh: '牛津大学', en: 'University of Oxford' },
    unit: { zh: 'Autonomous Intelligent Machines and Systems (AIMS)', en: 'Autonomous Intelligent Machines and Systems (AIMS)' },
    region: 'uk',
    fields: ['cv', 'ml', 'medai'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en'],
    funding: { zh: '以牛津官方 DPhil 资助、奖学金与项目说明为准', en: 'Check Oxford DPhil funding, scholarships and project terms' },
    mentor: {
      name: { zh: 'Philip Torr', en: 'Philip Torr' },
      initials: 'PT',
      title: { zh: '牛津大学工程科学教授', en: 'Professor of Engineering Science, University of Oxford' },
      bio: {
        zh: '公开资料摘要：Philip Torr 是牛津大学工程科学教授，公开研究覆盖计算机视觉、生成模型、医学影像 AI 与机器学习的交叉方向。具体 DPhil/访问安排以牛津官网为准。',
        en: 'Public-profile summary: Philip Torr is a professor of engineering science at Oxford. His public work spans computer vision, generative models, medical imaging AI and related machine learning. Check Oxford’s official pages for DPhil and visiting arrangements.'
      },
      link: 'https://www.robots.ox.ac.uk/~phst/',
      highlight: true
    },
    project: {
      title: { zh: '视觉、生成模型与医学影像', en: 'Vision, generative models and medical imaging' },
      summary: {
        zh: 'AIMS 聚焦计算机视觉、生成模型、3D/医学影像与 AI 安全。DPhil 或访问项目通常要求较强的数学、编程与论文阅读能力；建议先读组内近期论文，再通过牛津官方页面申请。',
        en: 'AIMS focuses on computer vision, generative models, 3D/medical imaging and AI safety. DPhil or visiting projects usually require strong maths, coding and paper reading; read recent group papers, then apply through Oxford’s official pages.'
      },
      methods: {
        zh: '视觉表征、生成模型、3D 重建、医学影像、AI 安全与评测。',
        en: 'Visual representations, generative models, 3D reconstruction, medical imaging, AI safety and evaluation.'
      },
      fit: {
        zh: '适合数学/编程基础强、能独立读论文并做实验的学生；医学影像方向还需要一定的领域知识。',
        en: 'Best for students with strong maths/coding, independent paper reading and experiments; medical imaging work also benefits from domain knowledge.'
      }
    },
    apply: {
      url: 'https://www.robots.ox.ac.uk/~aims/',
      label: { zh: 'AIMS 官方页面', en: 'AIMS official page' },
      note: {
        zh: '通过牛津大学/AIMS 官方 DPhil 与访问页面申请；本站不代收材料，也不提供导师内推。',
        en: 'Apply through Oxford/AIMS official DPhil and visiting pages. This site does not collect materials or offer faculty referrals.'
      }
    },
    source: { url: 'https://www.robots.ox.ac.uk/~aims/', label: { zh: 'Oxford AIMS', en: 'Oxford AIMS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'cambridge-mlg',
    institution: { zh: '剑桥大学', en: 'University of Cambridge' },
    unit: { zh: 'Machine Learning Group (MLG)', en: 'Machine Learning Group (MLG)' },
    region: 'uk',
    fields: ['ml', 'ai'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en'],
    funding: { zh: '以剑桥官方博士资助与奖学金说明为准', en: 'Check Cambridge PhD funding and scholarship terms' },
    mentor: {
      name: { zh: 'MLG 导师组', en: 'MLG faculty group' },
      initials: 'MLG',
      title: { zh: '剑桥机器学习组导师组', en: 'Cambridge Machine Learning Group faculty' },
      bio: {
        zh: '公开资料摘要：剑桥机器学习组由多位教授与研究员共同指导，公开方向覆盖贝叶斯机器学习、概率模型、因果推断、生成模型与 AI 安全。具体导师名单以官网 People 页面为准。',
        en: 'Public-profile summary: the Cambridge Machine Learning Group brings together faculty and researchers working on Bayesian machine learning, probabilistic models, causality, generative models and AI safety. Check the official People page for the current list.'
      },
      link: 'https://mlg.eng.cam.ac.uk/',
      highlight: false
    },
    project: {
      title: { zh: '贝叶斯机器学习与概率模型', en: 'Bayesian machine learning and probabilistic models' },
      summary: {
        zh: 'MLG 研究贝叶斯推断、高斯过程、因果推断、生成模型、强化学习与 AI 安全。博士/访问申请通过剑桥官方页面，建议先读组内论文并明确你想推进的具体问题。',
        en: 'MLG studies Bayesian inference, Gaussian processes, causality, generative models, reinforcement learning and AI safety. Apply for PhD/visiting through Cambridge’s official pages; read group papers and state the specific question you want to advance.'
      },
      methods: {
        zh: '贝叶斯推断、高斯过程、因果、生成模型、强化学习、AI 安全。',
        en: 'Bayesian inference, Gaussian processes, causality, generative models, reinforcement learning and AI safety.'
      },
      fit: {
        zh: '适合概率/统计与编程基础扎实、能读数学推导的学生；有研究项目或论文经历更好。',
        en: 'Best for students with solid probability/statistics and coding, comfortable with mathematical derivations; research projects or papers help.'
      }
    },
    apply: {
      url: 'https://mlg.eng.cam.ac.uk/',
      label: { zh: 'MLG 官方页面', en: 'MLG official page' },
      note: {
        zh: '通过剑桥大学/MLG 官方招生与访问页面申请；本站不代收材料，也不保证回复。',
        en: 'Apply through Cambridge/MLG official admissions and visiting pages. This site does not collect materials or guarantee a reply.'
      }
    },
    source: { url: 'https://mlg.eng.cam.ac.uk/', label: { zh: 'Cambridge MLG', en: 'Cambridge MLG' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'eth-ai-center',
    institution: { zh: '苏黎世联邦理工学院', en: 'ETH Zurich' },
    unit: { zh: 'ETH AI Center', en: 'ETH AI Center' },
    region: 'eu',
    fields: ['ai', 'ml', 'robotics'],
    levels: ['phd', 'postdoc'],
    types: ['fellowship', 'phd'],
    language: ['en'],
    funding: { zh: '以 ETH AI Center fellowship/博士项目官方说明为准', en: 'Check ETH AI Center fellowship/PhD terms' },
    mentor: {
      name: { zh: 'ETH AI Center 导师组', en: 'ETH AI Center faculty' },
      initials: 'ETH',
      title: { zh: '跨院系 AI 导师组', en: 'Cross-department AI faculty' },
      bio: {
        zh: '公开资料摘要：ETH AI Center 连接计算机、机器人、健康与自然科学等多个院系，导师覆盖机器学习、机器人、AI for Science 与健康 AI。具体导师与项目匹配以官网为准。',
        en: 'Public-profile summary: ETH AI Center connects computer science, robotics, health and natural sciences. Faculty cover machine learning, robotics, AI for Science and health AI. Check the official site for current faculty and project matching.'
      },
      link: 'https://ai.ethz.ch/',
      highlight: false
    },
    project: {
      title: { zh: '跨院系 AI、机器人与健康', en: 'Cross-department AI, robotics and health' },
      summary: {
        zh: 'ETH AI Center 以跨院系合作著称，研究覆盖机器学习、机器人、健康 AI、AI for Science 与可信 AI。提供 fellowship/博士/访问机会，申请通过 ETH 官方项目页面，通常需要明确的研究计划与导师匹配。',
        en: 'ETH AI Center is known for cross-department collaboration, covering machine learning, robotics, health AI, AI for Science and trustworthy AI. It offers fellowship/PhD/visiting opportunities through official ETH pages, usually requiring a clear research plan and supervisor match.'
      },
      methods: {
        zh: '机器学习、机器人、健康 AI、AI for Science、可信 AI。',
        en: 'Machine learning, robotics, health AI, AI for Science and trustworthy AI.'
      },
      fit: {
        zh: '适合已有较强研究基础、能提出明确问题并愿意跨院系合作的学生；博士/博后要求更高的独立研究能力。',
        en: 'Best for students with strong research foundations, a clear question and interest in cross-department work; PhD/postdoc roles expect more independence.'
      }
    },
    apply: {
      url: 'https://ai.ethz.ch/',
      label: { zh: 'ETH AI Center 官方页面', en: 'ETH AI Center official page' },
      note: {
        zh: '通过 ETH AI Center/ETH 官方项目页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through ETH AI Center/ETH official program pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://ai.ethz.ch/', label: { zh: 'ETH AI Center', en: 'ETH AI Center' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'tsinghua-iiis',
    institution: { zh: '清华大学', en: 'Tsinghua University' },
    unit: { zh: '交叉信息研究院 (IIIS)', en: 'Institute for Interdisciplinary Information Sciences (IIIS)' },
    region: 'cn',
    tier: '985',
    fields: ['theory', 'ai'],
    levels: ['undergrad', 'phd'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以清华/IIIS 官方博士与本科研究项目说明为准', en: 'Check Tsinghua/IIIS official PhD and undergraduate research terms' },
    mentor: {
      name: { zh: '姚期智', en: 'Andrew Chi-Chih Yao' },
      initials: '姚',
      title: { zh: '清华大学交叉信息研究院教授', en: 'Professor at IIIS, Tsinghua University' },
      bio: {
        zh: '公开资料摘要：姚期智是清华大学交叉信息研究院教授、图灵奖得主，公开研究覆盖理论计算机科学、算法、密码学、量子信息与 AI 基础。具体招生与访问安排以清华/IIIS 官网为准。',
        en: 'Public-profile summary: Andrew Chi-Chih Yao is a professor at Tsinghua IIIS and a Turing Award laureate. His public work spans theoretical computer science, algorithms, cryptography, quantum information and AI foundations. Check Tsinghua/IIIS official pages for admissions and visiting.'
      },
      link: 'https://iiis.tsinghua.edu.cn/',
      highlight: true
    },
    project: {
      title: { zh: '理论计算机、量子信息与 AI 基础', en: 'Theory, quantum information and AI foundations' },
      summary: {
        zh: 'IIIS 覆盖理论计算机科学、算法、密码学、量子信息、机器学习基础与交叉学科。本科研究/博士项目重视数学基础、推导能力与长期投入；申请通过清华/IIIS 官方页面。',
        en: 'IIIS covers theoretical computer science, algorithms, cryptography, quantum information, machine-learning foundations and interdisciplinary work. Undergraduate research/PhD projects value mathematical maturity, derivation skills and long-term commitment; apply through Tsinghua/IIIS official pages.'
      },
      methods: {
        zh: '算法与复杂度、密码学、量子计算/信息、机器学习理论、博弈论。',
        en: 'Algorithms and complexity, cryptography, quantum computing/information, machine-learning theory and game theory.'
      },
      fit: {
        zh: '适合数学基础扎实、喜欢证明与抽象建模的学生；有竞赛、理论课程或研究经历更好。',
        en: 'Best for students with strong maths who enjoy proofs and abstraction; contests, theory courses or research experience help.'
      }
    },
    apply: {
      url: 'https://iiis.tsinghua.edu.cn/',
      label: { zh: 'IIIS 官方页面', en: 'IIIS official page' },
      note: {
        zh: '通过清华/IIIS 官方招生与研究项目页面申请；本站不代收材料，也不提供内部推荐。',
        en: 'Apply through Tsinghua/IIIS official admissions and research pages. This site does not collect materials or offer internal referrals.'
      }
    },
    source: { url: 'https://iiis.tsinghua.edu.cn/', label: { zh: 'Tsinghua IIIS', en: 'Tsinghua IIIS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'nju-lamda',
    institution: { zh: '南京大学', en: 'Nanjing University' },
    unit: { zh: 'LAMDA 机器学习与数据挖掘组', en: 'LAMDA Group (Machine Learning and Data Mining)' },
    region: 'cn',
    tier: '985',
    fields: ['ml', 'ai'],
    levels: ['undergrad', 'phd', 'visiting'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以南京大学/LAMDA 官方博士与研究项目说明为准', en: 'Check Nanjing University/LAMDA official PhD and research terms' },
    mentor: {
      name: { zh: '周志华', en: 'Zhi-Hua Zhou' },
      initials: '周',
      title: { zh: '南京大学计算机系教授', en: 'Professor of Computer Science, Nanjing University' },
      bio: {
        zh: '公开资料摘要：周志华是南京大学计算机系教授、LAMDA 组负责人，公开研究覆盖机器学习、集成学习、数据挖掘与弱监督学习。具体招生与访问安排以南京大学/LAMDA 官网为准。',
        en: 'Public-profile summary: Zhi-Hua Zhou is a professor of computer science at Nanjing University and leads the LAMDA group. His public work covers machine learning, ensemble learning, data mining and weakly supervised learning. Check Nanjing University/LAMDA official pages for admissions and visiting.'
      },
      link: 'https://cs.nju.edu.cn/zhouzh/',
      highlight: true
    },
    project: {
      title: { zh: '机器学习、集成学习与弱监督', en: 'Machine learning, ensembles and weak supervision' },
      summary: {
        zh: 'LAMDA 长期研究机器学习、集成学习、数据挖掘、弱监督与开放环境学习。博士/访问/本科研究机会通过南京大学与实验室官方页面；重视论文阅读、数学基础与可复现实验。',
        en: 'LAMDA has long worked on machine learning, ensemble methods, data mining, weak supervision and open-environment learning. PhD/visiting/undergraduate research opportunities go through Nanjing University and lab pages; paper reading, maths and reproducible experiments matter.'
      },
      methods: {
        zh: '集成学习、弱监督、开放环境学习、数据挖掘、机器学习理论。',
        en: 'Ensemble learning, weak supervision, open-environment learning, data mining and machine-learning theory.'
      },
      fit: {
        zh: '适合数学与编程基础扎实、能坚持读论文和做实验的学生；有复现或开源项目经历更好。',
        en: 'Best for students with solid maths and coding who can keep up with papers and experiments; reproduction or open-source work helps.'
      }
    },
    apply: {
      url: 'http://lamda.nju.edu.cn/',
      label: { zh: 'LAMDA 官方页面', en: 'LAMDA official page' },
      note: {
        zh: '通过南京大学/LAMDA 官方招生与研究页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through Nanjing University/LAMDA official admissions and research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.nju.edu.cn/zhouzh/', label: { zh: 'Zhi-Hua Zhou @ NJU', en: 'Zhi-Hua Zhou @ NJU' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'pku-ai',
    institution: { zh: '北京大学', en: 'Peking University' },
    unit: { zh: '人工智能研究院', en: 'Institute for Artificial Intelligence' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'cv', 'robotics'],
    levels: ['undergrad', 'phd'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以北大官方博士/本科研究项目说明为准', en: 'Check PKU official PhD/undergraduate research terms' },
    mentor: {
      name: { zh: '朱松纯', en: 'Song-Chun Zhu' },
      initials: '朱',
      title: { zh: '北京大学人工智能研究院教授', en: 'Professor at PKU Institute for Artificial Intelligence' },
      bio: {
        zh: '公开资料摘要：朱松纯是北京大学人工智能研究院教授，公开研究覆盖计算机视觉、认知推理、机器人、多模态与通用人工智能。具体招生与访问安排以北大官网为准。',
        en: 'Public-profile summary: Song-Chun Zhu is a professor at PKU’s Institute for Artificial Intelligence. His public work spans computer vision, cognitive reasoning, robotics, multimodality and general AI. Check PKU official pages for admissions and visiting.'
      },
      link: 'https://www.ai.pku.edu.cn/',
      highlight: true
    },
    project: {
      title: { zh: '视觉、认知 AI 与机器人', en: 'Vision, cognitive AI and robotics' },
      summary: {
        zh: '北大 AI 研究院覆盖计算机视觉、认知推理、机器人、多模态与 AI 基础。博士/本科研究项目通过北大官方页面；项目强调跨学科建模、系统实现与长期问题。',
        en: 'PKU’s AI institute covers computer vision, cognitive reasoning, robotics, multimodality and AI foundations. PhD/undergraduate research goes through PKU official pages; projects emphasise interdisciplinary modelling, system building and long-term questions.'
      },
      methods: {
        zh: '视觉与场景理解、认知推理、机器人、多模态、通用人工智能。',
        en: 'Vision and scene understanding, cognitive reasoning, robotics, multimodality and general AI.'
      },
      fit: {
        zh: '适合对视觉/认知/机器人有长期兴趣、数学与编程基础较好的学生；跨学科项目需要较强自驱力。',
        en: 'Best for students with a long-term interest in vision/cognition/robotics and solid maths/coding; interdisciplinary work needs self-direction.'
      }
    },
    apply: {
      url: 'https://www.ai.pku.edu.cn/',
      label: { zh: '北大 AI 研究院官方页面', en: 'PKU AI official page' },
      note: {
        zh: '通过北大官方招生与研究项目页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through PKU official admissions and research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.ai.pku.edu.cn/', label: { zh: 'PKU Institute for AI', en: 'PKU Institute for AI' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'shanghai-ai-lab',
    institution: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' },
    unit: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' },
    region: 'cn',
    fields: ['ai', 'ml', 'robotics'],
    levels: ['undergrad', 'phd', 'visiting'],
    types: ['research', 'joint'],
    language: ['zh', 'en'],
    funding: { zh: '以实验室官方实习/联合培养/招聘说明为准', en: 'Check official internship/joint-training/recruitment terms' },
    mentor: {
      name: { zh: '研究员 / 联合培养导师组', en: 'Research and joint-training faculty' },
      initials: 'SAI',
      title: { zh: '多方向研究员与高校联合导师', en: 'Researchers and university co-advisers' },
      bio: {
        zh: '公开资料摘要：上海人工智能实验室由多方向研究员与高校联合导师组成，公开方向覆盖大模型、多模态、具身智能、AI for Science 与评测。具体导师与项目匹配以官网为准。',
        en: 'Public-profile summary: Shanghai AI Laboratory brings together researchers and university co-advisers across large models, multimodality, embodied AI, AI for Science and evaluation. Check the official site for current advisers and project matching.'
      },
      link: 'https://www.shlab.org.cn/',
      highlight: false
    },
    project: {
      title: { zh: '大模型、多模态与具身智能', en: 'Large models, multimodality and embodied AI' },
      summary: {
        zh: '上海 AI Lab 聚焦大模型、多模态、具身智能、AI for Science 与评测。提供实习、联合培养与访问机会；申请通过实验室官方招聘/申请页面，通常需要 CV、项目经历与研究兴趣说明。',
        en: 'Shanghai AI Lab focuses on large models, multimodality, embodied AI, AI for Science and evaluation. It offers internships, joint training and visiting opportunities through official recruitment/application pages, usually with a CV, project experience and a research-interest statement.'
      },
      methods: {
        zh: '大模型训练与评测、多模态、具身智能、AI for Science、数据与算力系统。',
        en: 'Large-model training and evaluation, multimodality, embodied AI, AI for Science, data and compute systems.'
      },
      fit: {
        zh: '适合有较强工程/实验能力、能在大团队中协作的学生；有开源项目、竞赛或论文经历更好。',
        en: 'Best for students with strong engineering/experiment skills and comfort in large teams; open-source, contest or paper experience helps.'
      }
    },
    apply: {
      url: 'https://www.shlab.org.cn/',
      label: { zh: '上海 AI Lab 官方页面', en: 'Shanghai AI Lab official page' },
      note: {
        zh: '通过实验室官方招聘/实习/联合培养页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through the official recruitment/internship/joint-training pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.shlab.org.cn/', label: { zh: 'Shanghai AI Laboratory', en: 'Shanghai AI Laboratory' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'nus-computing',
    institution: { zh: '新加坡国立大学', en: 'National University of Singapore' },
    unit: { zh: 'School of Computing', en: 'School of Computing' },
    region: 'asia',
    fields: ['ai', 'ml', 'systems', 'hci'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en'],
    funding: { zh: '以 NUS 官方博士资助与项目说明为准', en: 'Check NUS official PhD funding and program terms' },
    mentor: {
      name: { zh: 'NUS Computing 导师组', en: 'NUS Computing faculty' },
      initials: 'NUS',
      title: { zh: '新加坡国立大学计算学院导师组', en: 'Faculty at NUS School of Computing' },
      bio: {
        zh: '公开资料摘要：NUS Computing 导师组覆盖 AI/ML、系统、数据库、HCI、安全等方向，博士录取后按研究方向匹配导师。具体导师名单与招生状态以官网为准。',
        en: 'Public-profile summary: NUS Computing faculty cover AI/ML, systems, databases, HCI and security; PhD students are matched with advisers by research area. Check the official site for the current faculty list and admissions status.'
      },
      link: 'https://www.comp.nus.edu.sg/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、系统与跨方向研究', en: 'AI, systems and cross-area research' },
      summary: {
        zh: 'NUS Computing 覆盖 AI/ML、系统、数据库、HCI、安全与软件工程。博士/访问/暑期研究通过 NUS 官方页面；英语环境，适合希望在亚洲建立国际研究网络的学生。',
        en: 'NUS Computing covers AI/ML, systems, databases, HCI, security and software engineering. PhD/visiting/summer research goes through official NUS pages; the English-speaking environment suits students building an international research network in Asia.'
      },
      methods: {
        zh: '机器学习、系统、数据库、HCI、安全、软件工程。',
        en: 'Machine learning, systems, databases, HCI, security and software engineering.'
      },
      fit: {
        zh: '适合英语写作与编程能力较好、能独立推进研究的学生；不同方向先修要求差异较大。',
        en: 'Best for students with good English writing and coding who can drive research independently; prerequisites vary by area.'
      }
    },
    apply: {
      url: 'https://www.comp.nus.edu.sg/',
      label: { zh: 'NUS Computing 官方页面', en: 'NUS Computing official page' },
      note: {
        zh: '通过 NUS 官方博士/访问/研究项目页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through NUS official PhD/visiting/research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.comp.nus.edu.sg/', label: { zh: 'NUS Computing', en: 'NUS Computing' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'utokyo-matsuo',
    institution: { zh: '东京大学', en: 'University of Tokyo' },
    unit: { zh: 'Matsuo Lab', en: 'Matsuo Lab' },
    region: 'asia',
    fields: ['ml', 'nlp'],
    levels: ['master', 'phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['ja', 'en'],
    funding: { zh: '以东京大学/Matsuo Lab 官方项目与奖学金说明为准', en: 'Check University of Tokyo/Matsuo Lab official funding and scholarship terms' },
    mentor: {
      name: { zh: '松尾丰', en: 'Yutaka Matsuo' },
      initials: '松',
      title: { zh: '东京大学工学系研究科教授', en: 'Professor at the University of Tokyo' },
      bio: {
        zh: '公开资料摘要：松尾丰是东京大学工学系研究科教授、Matsuo Lab 负责人，公开研究覆盖机器学习、自然语言处理、Web 数据挖掘与 AI 社会应用。具体招生与访问安排以东京大学官网为准。',
        en: 'Public-profile summary: Yutaka Matsuo is a professor at the University of Tokyo and leads Matsuo Lab. His public work covers machine learning, NLP, web data mining and social applications of AI. Check the University of Tokyo official pages for admissions and visiting.'
      },
      link: 'https://weblab.t.u-tokyo.ac.jp/en/',
      highlight: true
    },
    project: {
      title: { zh: '机器学习、NLP 与社会应用', en: 'Machine learning, NLP and social applications' },
      summary: {
        zh: 'Matsuo Lab 研究机器学习、自然语言处理、Web 数据挖掘、AI 社会应用与创业。提供硕士/博士/访问机会；日语和英语环境并存，申请通过东京大学官方页面。',
        en: 'Matsuo Lab studies machine learning, NLP, web data mining, social applications of AI and entrepreneurship. It offers master’s/PhD/visiting opportunities in a Japanese/English environment; apply through University of Tokyo official pages.'
      },
      methods: {
        zh: 'NLP、Web 数据挖掘、机器学习、AI 社会应用、创业与技术转化。',
        en: 'NLP, web data mining, machine learning, social AI applications, entrepreneurship and technology transfer.'
      },
      fit: {
        zh: '适合有 ML/NLP 基础、愿意学习日语或在日本长期发展的学生；有项目或论文经历更好。',
        en: 'Best for students with ML/NLP foundations and interest in Japan; Japanese helps, and projects or papers strengthen the application.'
      }
    },
    apply: {
      url: 'https://weblab.t.u-tokyo.ac.jp/en/',
      label: { zh: 'Matsuo Lab 官方页面', en: 'Matsuo Lab official page' },
      note: {
        zh: '通过东京大学/Matsuo Lab 官方招生与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through University of Tokyo/Matsuo Lab official admissions and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://weblab.t.u-tokyo.ac.jp/en/', label: { zh: 'Matsuo Lab', en: 'Matsuo Lab' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'bupt-cs',
    institution: { zh: '北京邮电大学', en: 'Beijing University of Posts and Telecommunications' },
    unit: { zh: '计算机学院（国家示范性软件学院）', en: 'School of Computer Science (National Pilot Software College)' },
    region: 'cn',
    tier: '211',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school, faculty and supervisor funding terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'BUPT',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖计算机系统、网络智能、数据科学、软件工程与人工智能等方向，由多支课题组组成；具体导师名单与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers computer systems, network intelligence, data science, software engineering and AI through multiple research groups. Check the official site for the current faculty list and admissions status.'
      },
      link: 'https://scs.bupt.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '网络智能、数据科学与软件系统', en: 'Network intelligence, data science and software systems' },
      summary: {
        zh: '学院的研究覆盖网络智能、数据挖掘、机器学习、软件工程与系统安全。本科/硕士/博士研究机会通常通过学院导师组与实验室页面发布；建议先读目标组论文，再通过官方渠道了解课题与名额。',
        en: 'Research covers network intelligence, data mining, machine learning, software engineering and systems security. Undergraduate/master/PhD opportunities are usually announced through faculty groups and lab pages; read the target group’s papers before asking about topics and openings.'
      },
      methods: {
        zh: '网络智能、数据挖掘、机器学习、软件工程、系统与安全。',
        en: 'Network intelligence, data mining, machine learning, software engineering, systems and security.'
      },
      fit: {
        zh: '适合编程基础扎实、能做数据分析或系统实现的学生；有项目、竞赛或开源经历更好。',
        en: 'Best for students with solid coding who can do data analysis or system implementation; projects, contests or open-source work help.'
      }
    },
    apply: {
      url: 'https://scs.bupt.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的招生/导师/实验室页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official admissions, faculty and lab pages to learn about opportunities. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://scs.bupt.edu.cn/', label: { zh: 'BUPT 计算机学院', en: 'BUPT School of Computer Science' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'xidian-ipiu',
    institution: { zh: '西安电子科技大学', en: 'Xidian University' },
    unit: { zh: '智能感知与图像理解教育部重点实验室 (IPIU)', en: 'Key Laboratory of Intelligent Perception and Image Understanding (IPIU)' },
    region: 'cn',
    tier: '211',
    fields: ['cv', 'ai', 'ml'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以实验室/学校官方项目与导师说明为准', en: 'Check lab/school program terms and supervisor funding' },
    mentor: {
      name: { zh: 'IPIU 导师组', en: 'IPIU faculty group' },
      initials: 'IPIU',
      title: { zh: '重点实验室导师组', en: 'Key laboratory faculty group' },
      bio: {
        zh: '公开资料摘要：IPIU 聚焦视觉感知、遥感影像、机器学习与智能计算，由多支课题组组成；具体导师与招生状态以实验室官网为准。',
        en: 'Public-profile summary: IPIU focuses on visual perception, remote sensing, machine learning and intelligent computing through several research groups. Check the lab site for current advisers and admissions status.'
      },
      link: 'https://ipiu.xidian.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '视觉感知、遥感影像与智能计算', en: 'Visual perception, remote sensing and intelligent computing' },
      summary: {
        zh: '实验室研究计算机视觉、遥感图像理解、目标检测、机器学习与智能计算。项目通常需要较强的数学/编程基础与论文阅读能力；申请通过学校/实验室官方页面，建议先读组内近期论文。',
        en: 'The lab studies computer vision, remote-sensing image understanding, object detection, machine learning and intelligent computing. Projects usually require strong maths/coding and paper reading; apply through official school/lab pages and read recent group papers first.'
      },
      methods: {
        zh: '视觉感知、遥感影像、目标检测、机器学习、智能计算。',
        en: 'Visual perception, remote sensing, object detection, machine learning and intelligent computing.'
      },
      fit: {
        zh: '适合有 CV/ML 基础、能读英文论文并做实验的学生；遥感方向需要一定的图像处理背景。',
        en: 'Best for students with CV/ML foundations, English paper reading and experiments; remote sensing benefits from image-processing background.'
      }
    },
    apply: {
      url: 'https://ipiu.xidian.edu.cn/',
      label: { zh: 'IPIU 官网', en: 'IPIU official site' },
      note: {
        zh: '通过实验室/学院官方招生与访问页面申请；本站不代收材料，也不提供导师内推。',
        en: 'Apply through official lab/school admissions and visiting pages. This site does not collect materials or offer faculty referrals.'
      }
    },
    source: { url: 'https://cs.xidian.edu.cn/', label: { zh: '西电计算机学院', en: 'Xidian School of Computer Science' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'hdu-cs',
    institution: { zh: '杭州电子科技大学', en: 'Hangzhou Dianzi University' },
    unit: { zh: '计算机学院', en: 'School of Computer Science' },
    region: 'cn',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master'],
    types: ['research', 'summer'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'HDU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院研究覆盖数据挖掘、推荐系统、网络分析、机器学习与软件系统，强调工程实践；具体导师与课题组以学院官网为准。',
        en: 'Public-profile summary: the school covers data mining, recommender systems, network analysis, machine learning and software systems with an engineering focus. Check the official site for current groups.'
      },
      link: 'https://computer.hdu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '数据智能、推荐系统与网络分析', en: 'Data intelligence, recommenders and network analysis' },
      summary: {
        zh: '学院的研究覆盖数据挖掘、推荐系统、网络分析、机器学习与软件系统。适合从数据集和工程实现入手的学生；通过学院官网了解导师组、实验室与本科研究机会。',
        en: 'Research covers data mining, recommender systems, network analysis, machine learning and software systems. It suits students who start from datasets and engineering; use the school site to find groups, labs and undergraduate research opportunities.'
      },
      methods: {
        zh: '数据挖掘、推荐系统、网络分析、机器学习、软件系统。',
        en: 'Data mining, recommender systems, network analysis, machine learning and software systems.'
      },
      fit: {
        zh: '适合编程与数据分析基础较好、希望做落地项目的学生；有竞赛或开源经历更好。',
        en: 'Best for students with good coding and data analysis who want applied projects; contests or open-source work help.'
      }
    },
    apply: {
      url: 'https://computer.hdu.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://computer.hdu.edu.cn/', label: { zh: 'HDU 计算机学院', en: 'HDU School of Computer Science' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'njupt-cs',
    institution: { zh: '南京邮电大学', en: 'Nanjing University of Posts and Telecommunications' },
    unit: { zh: '计算机学院', en: 'School of Computer Science' },
    region: 'cn',
    fields: ['systems', 'ai', 'ml'],
    levels: ['undergrad', 'master'],
    types: ['research', 'summer'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'NJUPT',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院依托学校通信与网络积累，研究覆盖物联网、边缘计算、网络系统、数据智能与安全；具体导师与课题组以学院官网为准。',
        en: 'Public-profile summary: building on the university’s communications and networking strength, the school covers IoT, edge computing, networked systems, data intelligence and security. Check the official site for current groups.'
      },
      link: 'https://cs.njupt.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '物联网、边缘计算与数据智能', en: 'IoT, edge computing and data intelligence' },
      summary: {
        zh: '学院的研究覆盖物联网、边缘计算、网络系统、数据智能与安全。适合愿意做系统/网络实验、把算法落到设备与边缘侧的学生；通过学院官网了解课题组与本科研究机会。',
        en: 'Research covers IoT, edge computing, networked systems, data intelligence and security. It suits students who enjoy systems/network experiments and deploying algorithms on devices and the edge; use the school site to find groups and undergraduate opportunities.'
      },
      methods: {
        zh: '物联网、边缘计算、网络系统、数据智能、安全。',
        en: 'IoT, edge computing, networked systems, data intelligence and security.'
      },
      fit: {
        zh: '适合有网络/操作系统基础、愿意做系统实验的学生；通信背景是加分项。',
        en: 'Best for students with networking/OS foundations and interest in systems experiments; communications background helps.'
      }
    },
    apply: {
      url: 'https://cs.njupt.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.njupt.edu.cn/', label: { zh: 'NJUPT 计算机学院', en: 'NJUPT School of Computer Science' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'szu-vcc',
    institution: { zh: '深圳大学', en: 'Shenzhen University' },
    unit: { zh: '可视计算研究中心 (VCC)', en: 'Visual Computing Research Center (VCC)' },
    region: 'cn',
    fields: ['cv', 'ai'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer'],
    language: ['zh', 'en'],
    funding: { zh: '以中心/学校官方项目与导师说明为准', en: 'Check center/school program terms and supervisor funding' },
    mentor: {
      name: { zh: 'VCC 导师组', en: 'VCC faculty group' },
      initials: 'VCC',
      title: { zh: '可视计算研究中心导师组', en: 'Visual Computing Research Center faculty' },
      bio: {
        zh: '公开资料摘要：VCC 聚焦计算机图形学、计算机视觉、三维视觉、可视计算与智能感知，由多支课题组组成；具体导师与招生状态以中心官网为准。',
        en: 'Public-profile summary: VCC focuses on computer graphics, computer vision, 3D vision, visual computing and intelligent perception through several groups. Check the center site for advisers and admissions status.'
      },
      link: 'http://vcc.szu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '图形学、视觉与可视计算', en: 'Graphics, vision and visual computing' },
      summary: {
        zh: '中心研究计算机图形学、三维视觉、图像处理、可视分析与智能感知。项目通常需要较强的数学/编程基础；通过深圳大学/中心官网了解研究机会，建议先看组内论文与作品。',
        en: 'The center studies computer graphics, 3D vision, image processing, visual analytics and intelligent perception. Projects usually require strong maths/coding; use Shenzhen University/center pages to find opportunities, and read group papers and work first.'
      },
      methods: {
        zh: '图形学、三维视觉、图像处理、可视分析、智能感知。',
        en: 'Graphics, 3D vision, image processing, visual analytics and intelligent perception.'
      },
      fit: {
        zh: '适合数学/编程基础好、对图形学/视觉有长期兴趣的学生；作品集或复现项目有帮助。',
        en: 'Best for students with strong maths/coding and a long-term interest in graphics/vision; a portfolio or reproduction project helps.'
      }
    },
    apply: {
      url: 'http://vcc.szu.edu.cn/',
      label: { zh: 'VCC 官网', en: 'VCC official site' },
      note: {
        zh: '通过中心/学院官方招生与访问页面申请；本站不代收材料，也不提供导师内推。',
        en: 'Apply through official center/school admissions and visiting pages. This site does not collect materials or offer faculty referrals.'
      }
    },
    source: { url: 'https://csse.szu.edu.cn/', label: { zh: '深大计算机与软件学院', en: 'SZU College of Computer Science and Software Engineering' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'sustech-cse',
    institution: { zh: '南方科技大学', en: 'Southern University of Science and Technology' },
    unit: { zh: '计算机科学与工程系', en: 'Department of Computer Science and Engineering' },
    region: 'cn',
    fields: ['ai', 'ml', 'robotics', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学校/系官方项目与导师说明为准', en: 'Check university/department program terms and supervisor funding' },
    mentor: {
      name: { zh: '计算机系导师组', en: 'CSE faculty group' },
      initials: 'SUST',
      title: { zh: '计算机科学与工程系导师组', en: 'Department of CSE faculty' },
      bio: {
        zh: '公开资料摘要：计算机系覆盖机器学习、机器人、系统、数据与 AI 交叉方向，强调小班化与跨学科研究；具体导师名单以系官网为准。',
        en: 'Public-profile summary: the department covers machine learning, robotics, systems, data and AI intersections, with an emphasis on small-group and interdisciplinary research. Check the official site for faculty.'
      },
      link: 'https://cse.sustech.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '机器学习、机器人与系统', en: 'Machine learning, robotics and systems' },
      summary: {
        zh: '计算机系研究机器学习、机器人、系统、数据与 AI 交叉方向。本科研究/博士/访问机会通过学校官方页面；适合希望在小班化、跨学科环境里做研究、能主动推进项目的学生。',
        en: 'The department studies machine learning, robotics, systems, data and AI intersections. Undergraduate research/PhD/visiting opportunities go through official university pages; it suits students who want a small-group, interdisciplinary environment and can drive projects.'
      },
      methods: {
        zh: '机器学习、机器人、系统、数据、AI 交叉。',
        en: 'Machine learning, robotics, systems, data and AI intersections.'
      },
      fit: {
        zh: '适合自驱力强、能读论文并做实验的学生；英语能力重要。',
        en: 'Best for self-directed students who can read papers and run experiments; English matters.'
      }
    },
    apply: {
      url: 'https://cse.sustech.edu.cn/',
      label: { zh: '计算机系官网', en: 'CSE department' },
      note: {
        zh: '通过学校/系官方招生与研究页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official university/department admissions and research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cse.sustech.edu.cn/', label: { zh: 'SUSTech CSE', en: 'SUSTech CSE' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'shanghaitech-sist',
    institution: { zh: '上海科技大学', en: 'ShanghaiTech University' },
    unit: { zh: '信息科学与技术学院', en: 'School of Information Science and Technology' },
    region: 'cn',
    fields: ['ai', 'cv', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学校/学院官方项目与导师说明为准', en: 'Check university/school program terms and supervisor funding' },
    mentor: {
      name: { zh: '信息学院导师组', en: 'SIST faculty group' },
      initials: 'SIST',
      title: { zh: '信息科学与技术学院导师组', en: 'School of Information Science and Technology faculty' },
      bio: {
        zh: '公开资料摘要：信息学院覆盖计算机视觉、机器学习、数据科学、系统与硬件交叉方向，强调科研训练；具体导师与课题组以学院官网为准。',
        en: 'Public-profile summary: SIST covers computer vision, machine learning, data science, systems and hardware intersections with a strong research-training focus. Check the official site for current groups.'
      },
      link: 'https://sist.shanghaitech.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '视觉、机器学习与系统', en: 'Vision, machine learning and systems' },
      summary: {
        zh: '信息学院研究计算机视觉、机器学习、数据科学、系统与硬件交叉方向。研究机会通过学校/学院官方页面；适合希望参与前沿项目、接受较高强度训练的学生。',
        en: 'SIST studies computer vision, machine learning, data science, systems and hardware intersections. Opportunities go through official university/school pages; it suits students who want frontier projects and can handle intensive training.'
      },
      methods: {
        zh: '视觉、机器学习、数据科学、系统、硬件交叉。',
        en: 'Vision, machine learning, data science, systems and hardware intersections.'
      },
      fit: {
        zh: '适合数学/编程基础扎实、能投入较长时间的学生；有科研经历更好。',
        en: 'Best for students with strong maths/coding who can commit for longer periods; research experience helps.'
      }
    },
    apply: {
      url: 'https://sist.shanghaitech.edu.cn/',
      label: { zh: '信息学院官网', en: 'SIST official site' },
      note: {
        zh: '通过学校/学院官方招生与研究页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official university/school admissions and research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://sist.shanghaitech.edu.cn/', label: { zh: 'ShanghaiTech SIST', en: 'ShanghaiTech SIST' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'suda-cs',
    institution: { zh: '苏州大学', en: 'Soochow University' },
    unit: { zh: '计算机科学与技术学院', en: 'School of Computer Science and Technology' },
    region: 'cn',
    tier: '211',
    fields: ['ai', 'ml', 'nlp'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'SUDA',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院研究机器学习、自然语言处理、数据挖掘、智能计算与软件系统，由多支课题组组成；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers machine learning, NLP, data mining, intelligent computing and software systems through several groups. Check the official site for advisers and admissions status.'
      },
      link: 'https://scst.suda.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: '机器学习、自然语言处理与数据挖掘', en: 'Machine learning, NLP and data mining' },
      summary: {
        zh: '学院研究机器学习、自然语言处理、数据挖掘、智能计算与软件系统。适合想做 ML/NLP 应用与实验的学生；通过学院官网了解导师组与研究生/本科研究机会。',
        en: 'Research covers machine learning, NLP, data mining, intelligent computing and software systems. It suits students interested in ML/NLP applications and experiments; use the school site to find groups and research opportunities.'
      },
      methods: {
        zh: '机器学习、NLP、数据挖掘、智能计算、软件系统。',
        en: 'Machine learning, NLP, data mining, intelligent computing and software systems.'
      },
      fit: {
        zh: '适合编程/数学基础较好、能读论文的学生；有 NLP/数据项目经历更好。',
        en: 'Best for students with good coding/maths and paper reading; NLP/data project experience helps.'
      }
    },
    apply: {
      url: 'https://scst.suda.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://scst.suda.edu.cn/', label: { zh: 'Soochow CS', en: 'Soochow CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'cityu-cs',
    institution: { zh: '香港城市大学', en: 'City University of Hong Kong' },
    unit: { zh: '计算机科学系', en: 'Department of Computer Science' },
    region: 'hk',
    fields: ['ai', 'ml', 'systems'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en', 'zh'],
    funding: { zh: '以学系/学校官方博士资助与项目说明为准', en: 'Check department/university PhD funding and program terms' },
    mentor: {
      name: { zh: 'CS 导师组', en: 'CS faculty group' },
      initials: 'CityU',
      title: { zh: '计算机科学系导师组', en: 'Department of Computer Science faculty' },
      bio: {
        zh: '公开资料摘要：CityU CS 覆盖人工智能、机器学习、数据管理、系统、安全与软件工程；博士/访问机会通过学系官网，具体导师与招生状态以官网为准。',
        en: 'Public-profile summary: CityU CS covers AI, machine learning, data management, systems, security and software engineering. PhD/visiting opportunities go through the department site; check the official pages for advisers and status.'
      },
      link: 'https://www.cs.cityu.edu.hk/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、数据与系统', en: 'AI, data and systems' },
      summary: {
        zh: '学系研究 AI、机器学习、数据管理、系统、安全与软件工程。博士/访问机会通过学系官网；英语环境，适合希望在香港做研究、能独立读论文与写代码的学生。',
        en: 'The department studies AI, machine learning, data management, systems, security and software engineering. PhD/visiting opportunities go through the department site; the English-speaking environment suits independent readers and coders who want to research in Hong Kong.'
      },
      methods: {
        zh: 'AI、机器学习、数据管理、系统、安全。',
        en: 'AI, machine learning, data management, systems and security.'
      },
      fit: {
        zh: '适合英语写作/编程能力较好、能独立研究的学生；不同导师组要求不同。',
        en: 'Best for students with good English writing and coding who can research independently; requirements vary by group.'
      }
    },
    apply: {
      url: 'https://www.cs.cityu.edu.hk/',
      label: { zh: 'CityU CS 官网', en: 'CityU CS official site' },
      note: {
        zh: '通过学系/学校官方博士与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official department/university PhD and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.cs.cityu.edu.hk/', label: { zh: 'CityU CS', en: 'CityU CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'polyu-comp',
    institution: { zh: '香港理工大学', en: 'The Hong Kong Polytechnic University' },
    unit: { zh: '电子计算学系', en: 'Department of Computing' },
    region: 'hk',
    fields: ['ai', 'hci', 'systems'],
    levels: ['phd', 'visiting'],
    types: ['phd', 'research'],
    language: ['en'],
    funding: { zh: '以学系/学校官方博士资助与项目说明为准', en: 'Check department/university PhD funding and program terms' },
    mentor: {
      name: { zh: 'COMP 导师组', en: 'COMP faculty group' },
      initials: 'PolyU',
      title: { zh: '电子计算学系导师组', en: 'Department of Computing faculty' },
      bio: {
        zh: '公开资料摘要：PolyU COMP 研究 AI、数据科学、人机交互、系统与软件工程，强调应用型研究；具体导师与招生状态以学系官网为准。',
        en: 'Public-profile summary: PolyU COMP studies AI, data science, HCI, systems and software engineering with an applied-research emphasis. Check the department site for advisers and admissions status.'
      },
      link: 'https://www.polyu.edu.hk/comp/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、人机交互与数据系统', en: 'AI, HCI and data systems' },
      summary: {
        zh: '学系研究 AI、数据科学、人机交互、系统与软件工程。博士/访问机会通过学系官网；适合希望做应用型研究、能把原型做成可演示系统的学生。',
        en: 'The department studies AI, data science, HCI, systems and software engineering. PhD/visiting opportunities go through the department site; it suits students who want applied research and can turn prototypes into demonstrable systems.'
      },
      methods: {
        zh: 'AI、数据科学、HCI、系统、软件工程。',
        en: 'AI, data science, HCI, systems and software engineering.'
      },
      fit: {
        zh: '适合有项目/作品集、英语沟通能力较好的学生；应用型方向重视落地。',
        en: 'Best for students with projects/portfolio and good English communication; applied tracks value delivery.'
      }
    },
    apply: {
      url: 'https://www.polyu.edu.hk/comp/',
      label: { zh: 'PolyU COMP 官网', en: 'PolyU COMP official site' },
      note: {
        zh: '通过学系/学校官方博士与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official department/university PhD and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.polyu.edu.hk/comp/', label: { zh: 'PolyU COMP', en: 'PolyU COMP' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'hkbu-cs',
    institution: { zh: '香港浸会大学', en: 'Hong Kong Baptist University' },
    unit: { zh: '计算机科学系', en: 'Department of Computer Science' },
    region: 'hk',
    fields: ['ai', 'ml', 'hci'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'phd'],
    language: ['en', 'zh'],
    funding: { zh: '以学系/学校官方项目与奖学金说明为准', en: 'Check department/university program and scholarship terms' },
    mentor: {
      name: { zh: 'CS 导师组', en: 'CS faculty group' },
      initials: 'HKBU',
      title: { zh: '计算机科学系导师组', en: 'Department of Computer Science faculty' },
      bio: {
        zh: '公开资料摘要：HKBU CS 研究 AI、机器学习、数据、媒体计算与人机交互，规模相对紧凑；具体导师与招生状态以学系官网为准。',
        en: 'Public-profile summary: HKBU CS studies AI, machine learning, data, media computing and HCI in a relatively compact department. Check the official site for advisers and admissions status.'
      },
      link: 'https://www.comp.hkbu.edu.hk/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、媒体计算与人机交互', en: 'AI, media computing and HCI' },
      summary: {
        zh: '学系研究 AI、机器学习、数据、媒体计算与人机交互。硕士/博士/访问机会通过学系官网；适合希望在小规模团队里获得较多指导、做交叉应用的学生。',
        en: 'The department studies AI, machine learning, data, media computing and HCI. Master’s/PhD/visiting opportunities go through the department site; it suits students who want closer supervision in a smaller team and interdisciplinary applications.'
      },
      methods: {
        zh: 'AI、机器学习、数据、媒体计算、HCI。',
        en: 'AI, machine learning, data, media computing and HCI.'
      },
      fit: {
        zh: '适合有一定项目基础、英语沟通能力较好的学生；跨学科作品是加分项。',
        en: 'Best for students with project experience and good English communication; interdisciplinary work helps.'
      }
    },
    apply: {
      url: 'https://www.comp.hkbu.edu.hk/',
      label: { zh: 'HKBU CS 官网', en: 'HKBU CS official site' },
      note: {
        zh: '通过学系/学校官方招生与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official department/university admissions and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.comp.hkbu.edu.hk/', label: { zh: 'HKBU CS', en: 'HKBU CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'um-fst',
    institution: { zh: '澳门大学', en: 'University of Macau' },
    unit: { zh: '科技学院', en: 'Faculty of Science and Technology' },
    region: 'mo',
    fields: ['ai', 'ml', 'systems'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'phd'],
    language: ['en', 'zh'],
    funding: { zh: '以学院/学校官方项目与奖学金说明为准', en: 'Check faculty/university program and scholarship terms' },
    mentor: {
      name: { zh: '科技学院导师组', en: 'FST faculty group' },
      initials: 'UM',
      title: { zh: '科技学院导师组', en: 'Faculty of Science and Technology faculty' },
      bio: {
        zh: '公开资料摘要：澳门大学科技学院覆盖 AI、数据科学、物联网、系统与工程，依托粤港澳大湾区合作；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: UM’s FST covers AI, data science, IoT, systems and engineering with Greater Bay Area collaboration. Check the faculty site for advisers and admissions status.'
      },
      link: 'https://fst.um.edu.mo/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、数据与物联网', en: 'AI, data and IoT' },
      summary: {
        zh: '学院研究 AI、数据科学、物联网、系统与工程。硕士/博士/访问机会通过学院官网；适合希望在粤港澳大湾区做研究、能跨学科合作的学生。',
        en: 'The faculty studies AI, data science, IoT, systems and engineering. Master’s/PhD/visiting opportunities go through the faculty site; it suits students who want to research in the Greater Bay Area and work across disciplines.'
      },
      methods: {
        zh: 'AI、数据科学、物联网、系统、工程。',
        en: 'AI, data science, IoT, systems and engineering.'
      },
      fit: {
        zh: '适合英语/编程基础较好、愿意跨学科合作的学生。',
        en: 'Best for students with good English/coding and interest in interdisciplinary collaboration.'
      }
    },
    apply: {
      url: 'https://fst.um.edu.mo/',
      label: { zh: '科技学院官网', en: 'FST official site' },
      note: {
        zh: '通过学院/学校官方招生与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official faculty/university admissions and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://fst.um.edu.mo/', label: { zh: 'UM FST', en: 'UM FST' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'ntu-csie',
    institution: { zh: '台湾大学', en: 'National Taiwan University' },
    unit: { zh: '资讯工程学系', en: 'Department of Computer Science and Information Engineering' },
    region: 'tw',
    fields: ['ai', 'ml', 'systems', 'theory'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以系/学校官方项目与奖学金说明为准', en: 'Check department/university program and scholarship terms' },
    mentor: {
      name: { zh: '资工系导师组', en: 'CSIE faculty group' },
      initials: 'NTU',
      title: { zh: '资讯工程学系导师组', en: 'Department of CSIE faculty' },
      bio: {
        zh: '公开资料摘要：台大资工系覆盖 AI/ML、系统、网络、理论与软件工程，由多支课题组组成；具体导师与招生状态以系官网为准。',
        en: 'Public-profile summary: NTU CSIE covers AI/ML, systems, networking, theory and software engineering through multiple groups. Check the department site for advisers and admissions status.'
      },
      link: 'https://www.csie.ntu.edu.tw/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、系统与理论', en: 'AI, systems and theory' },
      summary: {
        zh: '学系研究 AI/ML、系统、网络、理论与软件工程。硕士/博士/访问机会通过系官网；适合希望在台湾做研究、能读英文论文并独立推进项目的学生。',
        en: 'The department studies AI/ML, systems, networking, theory and software engineering. Master’s/PhD/visiting opportunities go through the department site; it suits students who want to research in Taiwan, read English papers and drive projects independently.'
      },
      methods: {
        zh: 'AI/ML、系统、网络、理论、软件工程。',
        en: 'AI/ML, systems, networking, theory and software engineering.'
      },
      fit: {
        zh: '适合编程/数学基础较好、能读英文论文的学生；不同导师组要求不同。',
        en: 'Best for students with good coding/maths and English paper reading; requirements vary by group.'
      }
    },
    apply: {
      url: 'https://www.csie.ntu.edu.tw/',
      label: { zh: '台大资工系官网', en: 'NTU CSIE official site' },
      note: {
        zh: '通过系/学校官方招生与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official department/university admissions and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.csie.ntu.edu.tw/', label: { zh: 'NTU CSIE', en: 'NTU CSIE' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'nthu-cs',
    institution: { zh: '台湾清华大学', en: 'National Tsing Hua University' },
    unit: { zh: '资讯工程学系', en: 'Department of Computer Science' },
    region: 'tw',
    fields: ['ai', 'ml', 'systems'],
    levels: ['master', 'phd'],
    types: ['research', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以系/学校官方项目与奖学金说明为准', en: 'Check department/university program and scholarship terms' },
    mentor: {
      name: { zh: '资工系导师组', en: 'CS faculty group' },
      initials: 'NTHU',
      title: { zh: '资讯工程学系导师组', en: 'Department of Computer Science faculty' },
      bio: {
        zh: '公开资料摘要：清大资工系覆盖 AI/ML、系统、数据与软件工程，由多支课题组组成；具体导师与招生状态以系官网为准。',
        en: 'Public-profile summary: NTHU CS covers AI/ML, systems, data and software engineering through multiple groups. Check the department site for advisers and admissions status.'
      },
      link: 'https://www.cs.nthu.edu.tw/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、系统与数据', en: 'AI, systems and data' },
      summary: {
        zh: '学系研究 AI/ML、系统、数据与软件工程。硕士/博士/研究机会通过系官网；适合希望在台湾做研究、能独立读论文与做实验的学生。',
        en: 'The department studies AI/ML, systems, data and software engineering. Master’s/PhD/research opportunities go through the department site; it suits students who want to research in Taiwan and can read papers and run experiments independently.'
      },
      methods: {
        zh: 'AI/ML、系统、数据、软件工程。',
        en: 'AI/ML, systems, data and software engineering.'
      },
      fit: {
        zh: '适合编程/数学基础较好、能独立推进项目的学生；有项目经历更好。',
        en: 'Best for students with good coding/maths who can drive projects; project experience helps.'
      }
    },
    apply: {
      url: 'https://www.cs.nthu.edu.tw/',
      label: { zh: '清大资工系官网', en: 'NTHU CS official site' },
      note: {
        zh: '通过系/学校官方招生与访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official department/university admissions and visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.cs.nthu.edu.tw/', label: { zh: 'NTHU CS', en: 'NTHU CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'zju-cs',
    institution: { zh: '浙江大学', en: 'Zhejiang University' },
    unit: { zh: '计算机科学与技术学院', en: 'College of Computer Science and Technology' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'ml', 'cv', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, College of Computer Science' },
      initials: 'ZJU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖人工智能、机器学习、计算机视觉、系统、数据库、图形学与软件工程，由多支课题组组成；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the college covers AI, machine learning, computer vision, systems, databases, graphics and software engineering through multiple groups. Check the official site for advisers and admissions status.'
      },
      link: 'http://www.cs.zju.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、系统、图形与数据', en: 'AI, systems, graphics and data' },
      summary: {
        zh: '学院研究 AI、机器学习、计算机视觉、系统、数据库、图形学与软件工程。本科/硕士/博士研究机会通过学院导师组与实验室页面；建议先读目标组近两年的论文，再通过官方渠道了解课题与名额。',
        en: 'The college studies AI, machine learning, computer vision, systems, databases, graphics and software engineering. Undergraduate/master/PhD opportunities go through faculty groups and lab pages; read the target group’s recent papers before asking about topics and openings.'
      },
      methods: {
        zh: 'AI、机器学习、计算机视觉、系统、数据库、图形学、软件工程。',
        en: 'AI, machine learning, computer vision, systems, databases, graphics and software engineering.'
      },
      fit: {
        zh: '适合编程/数学基础扎实、能读论文并做实验的学生；有项目、竞赛或开源经历更好。',
        en: 'Best for students with strong coding/maths, paper reading and experiments; projects, contests or open-source work help.'
      }
    },
    apply: {
      url: 'http://www.cs.zju.edu.cn/',
      label: { zh: '计算机学院官网', en: 'College of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'http://www.cs.zju.edu.cn/', label: { zh: 'ZJU 计算机学院', en: 'ZJU College of Computer Science' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'sjtu-cs',
    institution: { zh: '上海交通大学', en: 'Shanghai Jiao Tong University' },
    unit: { zh: '计算机科学与工程系', en: 'Department of Computer Science and Engineering' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机系导师组', en: 'CSE faculty group' },
      initials: 'SJTU',
      title: { zh: '计算机科学与工程系导师组', en: 'Department of CSE faculty' },
      bio: {
        zh: '公开资料摘要：学系覆盖 AI、机器学习、系统、网络、数据与软件工程，与产业合作紧密；具体导师与招生状态以学系官网为准。',
        en: 'Public-profile summary: the department covers AI, machine learning, systems, networking, data and software engineering with strong industry links. Check the official site for advisers and admissions status.'
      },
      link: 'https://www.cs.sjtu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、系统、网络与数据', en: 'AI, systems, networking and data' },
      summary: {
        zh: '学系研究 AI、机器学习、系统、网络、数据与软件工程，与产业合作紧密。本科/硕士/博士研究机会通过学系与实验室页面；建议先读目标组论文，再通过官方渠道联系。',
        en: 'The department studies AI, machine learning, systems, networking, data and software engineering with strong industry links. Undergraduate/master/PhD opportunities go through department and lab pages; read target-group papers before using official channels.'
      },
      methods: {
        zh: 'AI、机器学习、系统、网络、数据、软件工程。',
        en: 'AI, machine learning, systems, networking, data and software engineering.'
      },
      fit: {
        zh: '适合工程/数学基础好、能独立做项目的学生；英语与代码能力重要。',
        en: 'Best for students with strong engineering/maths who can drive projects; English and coding matter.'
      }
    },
    apply: {
      url: 'https://www.cs.sjtu.edu.cn/',
      label: { zh: '计算机系官网', en: 'Department of CSE' },
      note: {
        zh: '通过学系/学院官方招生与研究页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official department/school admissions and research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.cs.sjtu.edu.cn/', label: { zh: 'SJTU CSE', en: 'SJTU CSE' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'fudan-cs',
    institution: { zh: '复旦大学', en: 'Fudan University' },
    unit: { zh: '计算机科学技术学院', en: 'School of Computer Science' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'nlp', 'ml'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'FDU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、自然语言处理、机器学习、系统、数据与软件工程，NLP/数据方向活跃；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, NLP, machine learning, systems, data and software engineering, with active NLP/data groups. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.fudan.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、NLP、系统与数据', en: 'AI, NLP, systems and data' },
      summary: {
        zh: '学院研究 AI、自然语言处理、机器学习、系统、数据与软件工程。本科/硕士/博士研究机会通过学院导师组与实验室页面；建议先读目标组论文，明确你想做的语言/数据问题。',
        en: 'The school studies AI, NLP, machine learning, systems, data and software engineering. Undergraduate/master/PhD opportunities go through faculty groups and lab pages; read target-group papers and state the language/data question you want to pursue.'
      },
      methods: {
        zh: 'AI、NLP、机器学习、系统、数据、软件工程。',
        en: 'AI, NLP, machine learning, systems, data and software engineering.'
      },
      fit: {
        zh: '适合 NLP/ML 基础、能读英文论文的学生；有文本/数据项目经历更好。',
        en: 'Best for students with NLP/ML foundations and English paper reading; text/data project experience helps.'
      }
    },
    apply: {
      url: 'https://cs.fudan.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.fudan.edu.cn/', label: { zh: 'Fudan CS', en: 'Fudan CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'ustc-cs',
    institution: { zh: '中国科学技术大学', en: 'University of Science and Technology of China' },
    unit: { zh: '计算机科学与技术学院', en: 'School of Computer Science and Technology' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'ml', 'systems', 'theory'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'USTC',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、系统、高性能计算、数据与理论，理工科基础强；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, machine learning, systems, high-performance computing, data and theory with a strong science/engineering base. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.ustc.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、ML、系统与高性能计算', en: 'AI, ML, systems and high-performance computing' },
      summary: {
        zh: '学院研究 AI、机器学习、系统、高性能计算、数据与理论。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合数学/系统基础扎实、愿意长期做研究的学生。',
        en: 'The school studies AI, machine learning, systems, HPC, data and theory. Undergraduate/master/PhD opportunities go through faculty groups and lab pages; it suits students with strong maths/systems who want long-term research.'
      },
      methods: {
        zh: 'AI、机器学习、系统、高性能计算、数据、理论。',
        en: 'AI, machine learning, systems, HPC, data and theory.'
      },
      fit: {
        zh: '适合数学/系统基础扎实、能读论文与做实验的学生；有科研经历更好。',
        en: 'Best for students with strong maths/systems, paper reading and experiments; research experience helps.'
      }
    },
    apply: {
      url: 'https://cs.ustc.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.ustc.edu.cn/', label: { zh: 'USTC CS', en: 'USTC CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'hit-cs',
    institution: { zh: '哈尔滨工业大学', en: 'Harbin Institute of Technology' },
    unit: { zh: '计算学部', en: 'Faculty of Computing' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'robotics', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学部/导师/学校官方项目说明为准', en: 'Check faculty/supervisor/university program terms' },
    mentor: {
      name: { zh: '计算学部导师组', en: 'Faculty of Computing faculty group' },
      initials: 'HIT',
      title: { zh: '计算学部导师组', en: 'Faculty of Computing faculty' },
      bio: {
        zh: '公开资料摘要：计算学部覆盖 AI、机器人、系统、网络与安全等方向，工程与航天背景强；具体导师与招生状态以学部官网为准。',
        en: 'Public-profile summary: the Faculty of Computing covers AI, robotics, systems, networking and security with strong engineering and aerospace links. Check the official site for advisers and admissions status.'
      },
      link: 'http://computing.hit.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、机器人、系统与网络安全', en: 'AI, robotics, systems and cybersecurity' },
      summary: {
        zh: '学部研究 AI、机器人、系统、网络与安全，工程与航天背景强。本科/硕士/博士研究机会通过学部导师组与实验室页面；适合愿意做系统/机器人实验、能长期投入的学生。',
        en: 'The faculty studies AI, robotics, systems, networking and security with strong engineering and aerospace links. Opportunities go through faculty groups and lab pages; it suits students who enjoy systems/robotics experiments and long commitments.'
      },
      methods: {
        zh: 'AI、机器人、系统、网络、安全。',
        en: 'AI, robotics, systems, networking and security.'
      },
      fit: {
        zh: '适合工程能力强、愿意做系统/机器人实验的学生；有项目经历更好。',
        en: 'Best for students with strong engineering and interest in systems/robotics experiments; project experience helps.'
      }
    },
    apply: {
      url: 'http://computing.hit.edu.cn/',
      label: { zh: '计算学部官网', en: 'Faculty of Computing' },
      note: {
        zh: '通过学部/学校官方招生与研究页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official faculty/university admissions and research pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'http://computing.hit.edu.cn/', label: { zh: 'HIT 计算学部', en: 'HIT Faculty of Computing' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'buaa-cs',
    institution: { zh: '北京航空航天大学', en: 'Beihang University' },
    unit: { zh: '计算机学院', en: 'School of Computer Science and Engineering' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'robotics', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'BUAA',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、软件工程、系统、网络与航空航天交叉，工程实践强；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, software engineering, systems, networking and aerospace intersections with strong engineering practice. Check the official site for advisers and admissions status.'
      },
      link: 'https://scse.buaa.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、软件、系统与航空航天交叉', en: 'AI, software, systems and aerospace intersections' },
      summary: {
        zh: '学院研究 AI、软件工程、系统、网络与航空航天交叉。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合工程/数学基础好、对航空航天交叉感兴趣的学生。',
        en: 'The school studies AI, software engineering, systems, networking and aerospace intersections. Opportunities go through faculty groups and lab pages; it suits students with strong engineering/maths and interest in aerospace.'
      },
      methods: {
        zh: 'AI、软件工程、系统、网络、航空航天交叉。',
        en: 'AI, software engineering, systems, networking and aerospace intersections.'
      },
      fit: {
        zh: '适合工程/数学基础好、能读论文并做系统实现的学生。',
        en: 'Best for students with strong engineering/maths, paper reading and system implementation.'
      }
    },
    apply: {
      url: 'https://scse.buaa.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://scse.buaa.edu.cn/', label: { zh: 'Beihang CS', en: 'Beihang CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'bit-cs',
    institution: { zh: '北京理工大学', en: 'Beijing Institute of Technology' },
    unit: { zh: '计算机学院', en: 'School of Computer Science and Technology' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'BIT',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、系统、网络与信息安全，工程与国防背景强；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, machine learning, systems, networking and information security with strong engineering and defence links. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.bit.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、ML、系统与信息安全', en: 'AI, ML, systems and information security' },
      summary: {
        zh: '学院研究 AI、机器学习、系统、网络与信息安全。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合编程/数学基础好、愿意做系统或安全实验的学生。',
        en: 'The school studies AI, machine learning, systems, networking and information security. Opportunities go through faculty groups and lab pages; it suits students with good coding/maths who enjoy systems or security experiments.'
      },
      methods: {
        zh: 'AI、机器学习、系统、网络、信息安全。',
        en: 'AI, machine learning, systems, networking and information security.'
      },
      fit: {
        zh: '适合编程/数学基础好、愿意做系统或安全实验的学生。',
        en: 'Best for students with good coding/maths and interest in systems or security experiments.'
      }
    },
    apply: {
      url: 'https://cs.bit.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.bit.edu.cn/', label: { zh: 'BIT CS', en: 'BIT CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'hust-cs',
    institution: { zh: '华中科技大学', en: 'Huazhong University of Science and Technology' },
    unit: { zh: '计算机科学与技术学院', en: 'School of Computer Science and Technology' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'HUST',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、存储、系统、数据与软件工程，系统/存储方向有积累；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, machine learning, storage, systems, data and software engineering, with strength in systems/storage. Check the official site for advisers and admissions status.'
      },
      link: 'http://cs.hust.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、存储、系统与数据', en: 'AI, storage, systems and data' },
      summary: {
        zh: '学院研究 AI、机器学习、存储、系统、数据与软件工程。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合系统/编程基础好、能做工程实验的学生。',
        en: 'The school studies AI, machine learning, storage, systems, data and software engineering. Opportunities go through faculty groups and lab pages; it suits students with strong systems/coding and engineering experiments.'
      },
      methods: {
        zh: 'AI、机器学习、存储、系统、数据、软件工程。',
        en: 'AI, machine learning, storage, systems, data and software engineering.'
      },
      fit: {
        zh: '适合系统/编程基础好、能做工程实验的学生；有项目经历更好。',
        en: 'Best for students with strong systems/coding and engineering experiments; project experience helps.'
      }
    },
    apply: {
      url: 'http://cs.hust.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'http://cs.hust.edu.cn/', label: { zh: 'HUST CS', en: 'HUST CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'whu-cs',
    institution: { zh: '武汉大学', en: 'Wuhan University' },
    unit: { zh: '计算机学院', en: 'School of Computer Science' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'cv', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'WHU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、计算机视觉、遥感、软件工程与数据，遥感/测绘交叉有特色；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, computer vision, remote sensing, software engineering and data, with distinctive remote-sensing/geomatics links. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.whu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、遥感、软件与数据', en: 'AI, remote sensing, software and data' },
      summary: {
        zh: '学院研究 AI、计算机视觉、遥感、软件工程与数据。本科/硕士/博士研究机会通过学院导师组与实验室页面；遥感/测绘交叉适合有图像处理背景的学生。',
        en: 'The school studies AI, computer vision, remote sensing, software engineering and data. Opportunities go through faculty groups and lab pages; remote-sensing/geomatics intersections suit students with image-processing background.'
      },
      methods: {
        zh: 'AI、计算机视觉、遥感、软件工程、数据。',
        en: 'AI, computer vision, remote sensing, software engineering and data.'
      },
      fit: {
        zh: '适合 CV/遥感/数据方向、能读论文的学生；有图像项目经历更好。',
        en: 'Best for students in CV/remote sensing/data who can read papers; image-project experience helps.'
      }
    },
    apply: {
      url: 'https://cs.whu.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.whu.edu.cn/', label: { zh: 'WHU CS', en: 'WHU CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'sysu-cs',
    institution: { zh: '中山大学', en: 'Sun Yat-sen University' },
    unit: { zh: '计算机学院', en: 'School of Computer Science and Engineering' },
    region: 'cn',
    tier: '985',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Science' },
      initials: 'SYSU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、系统、数据与交叉应用，地处粤港澳大湾区；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, machine learning, systems, data and cross-disciplinary applications in the Greater Bay Area. Check the official site for advisers and admissions status.'
      },
      link: 'https://cse.sysu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、系统、数据与交叉', en: 'AI, systems, data and intersections' },
      summary: {
        zh: '学院研究 AI、机器学习、系统、数据与交叉应用。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合想在大湾区做研究、工程能力较好的学生。',
        en: 'The school studies AI, machine learning, systems, data and cross-disciplinary applications. Opportunities go through faculty groups and lab pages; it suits students who want to research in the Greater Bay Area with solid engineering.'
      },
      methods: {
        zh: 'AI、机器学习、系统、数据、交叉应用。',
        en: 'AI, machine learning, systems, data and cross-disciplinary applications.'
      },
      fit: {
        zh: '适合想在大湾区做研究、工程能力较好的学生；有项目经历更好。',
        en: 'Best for students who want to research in the Greater Bay Area with strong engineering; project experience helps.'
      }
    },
    apply: {
      url: 'https://cse.sysu.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cse.sysu.edu.cn/', label: { zh: 'SYSU CSE', en: 'SYSU CSE' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'bjtu-cs',
    institution: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    unit: { zh: '计算机与信息技术学院', en: 'School of Computer and Information Technology' },
    region: 'cn',
    tier: '211',
    fields: ['ai', 'systems', 'ml'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer and Information Technology' },
      initials: 'BJTU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、交通数据、系统与网络，轨道交通背景强；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, machine learning, transport data, systems and networking with strong rail-transit links. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.bjtu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、交通数据、系统与网络', en: 'AI, transport data, systems and networking' },
      summary: {
        zh: '学院研究 AI、机器学习、交通数据、系统与网络。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合数据/系统/交通交叉、工程能力好的学生。',
        en: 'The school studies AI, machine learning, transport data, systems and networking. Opportunities go through faculty groups and lab pages; it suits students strong in data/systems/transport intersections and engineering.'
      },
      methods: {
        zh: 'AI、机器学习、交通数据、系统、网络。',
        en: 'AI, machine learning, transport data, systems and networking.'
      },
      fit: {
        zh: '适合数据/系统/交通交叉、工程能力好的学生；有项目经历更好。',
        en: 'Best for students in data/systems/transport intersections with strong engineering; project experience helps.'
      }
    },
    apply: {
      url: 'https://cs.bjtu.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer and Information Technology' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.bjtu.edu.cn/', label: { zh: 'BJTU CS', en: 'BJTU CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'nuaa-cs',
    institution: { zh: '南京航空航天大学', en: 'Nanjing University of Aeronautics and Astronautics' },
    unit: { zh: '计算机科学与技术学院', en: 'College of Computer Science and Technology' },
    region: 'cn',
    tier: '211',
    fields: ['ai', 'robotics', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, College of Computer Science' },
      initials: 'NUAA',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、航空计算、系统与数据，航空航天背景强；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the college covers AI, machine learning, aerospace computing, systems and data with strong aerospace links. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.nuaa.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、航空计算、系统与数据', en: 'AI, aerospace computing, systems and data' },
      summary: {
        zh: '学院研究 AI、机器学习、航空计算、系统与数据。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合工程/数学基础好、对航空交叉感兴趣的学生。',
        en: 'The college studies AI, machine learning, aerospace computing, systems and data. Opportunities go through faculty groups and lab pages; it suits students with strong engineering/maths and interest in aerospace.'
      },
      methods: {
        zh: 'AI、机器学习、航空计算、系统、数据。',
        en: 'AI, machine learning, aerospace computing, systems and data.'
      },
      fit: {
        zh: '适合工程/数学基础好、对航空交叉感兴趣的学生；有项目经历更好。',
        en: 'Best for students with strong engineering/maths and interest in aerospace; project experience helps.'
      }
    },
    apply: {
      url: 'https://cs.nuaa.edu.cn/',
      label: { zh: '计算机学院官网', en: 'College of Computer Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.nuaa.edu.cn/', label: { zh: 'NUAA CS', en: 'NUAA CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'shu-cs',
    institution: { zh: '上海大学', en: 'Shanghai University' },
    unit: { zh: '计算机工程与科学学院', en: 'School of Computer Engineering and Science' },
    region: 'cn',
    tier: '211',
    fields: ['ai', 'ml', 'systems'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '计算机学院导师组', en: 'Faculty group, School of Computer Engineering' },
      initials: 'SHU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、数据、系统与交叉应用，与上海产业结合紧密；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the school covers AI, machine learning, data, systems and applied intersections with strong Shanghai industry links. Check the official site for advisers and admissions status.'
      },
      link: 'https://cs.shu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、数据、系统与交叉', en: 'AI, data, systems and intersections' },
      summary: {
        zh: '学院研究 AI、机器学习、数据、系统与交叉应用。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合想在上海做应用研究、工程能力好的学生。',
        en: 'The school studies AI, machine learning, data, systems and applied intersections. Opportunities go through faculty groups and lab pages; it suits students who want applied research in Shanghai with strong engineering.'
      },
      methods: {
        zh: 'AI、机器学习、数据、系统、交叉应用。',
        en: 'AI, machine learning, data, systems and applied intersections.'
      },
      fit: {
        zh: '适合想在上海做应用研究、工程能力好的学生；有项目经历更好。',
        en: 'Best for students who want applied research in Shanghai with strong engineering; project experience helps.'
      }
    },
    apply: {
      url: 'https://cs.shu.edu.cn/',
      label: { zh: '计算机学院官网', en: 'School of Computer Engineering' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://cs.shu.edu.cn/', label: { zh: 'SHU CS', en: 'SHU CS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'jnu-cs',
    institution: { zh: '暨南大学', en: 'Jinan University' },
    unit: { zh: '信息科学技术学院', en: 'College of Information Science and Technology' },
    region: 'cn',
    tier: '211',
    fields: ['ai', 'ml', 'nlp'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer', 'phd'],
    language: ['zh', 'en'],
    funding: { zh: '以学院/导师/学校官方项目说明为准', en: 'Check school/faculty/supervisor program terms' },
    mentor: {
      name: { zh: '信息学院导师组', en: 'Faculty group, College of Information Science' },
      initials: 'JNU',
      title: { zh: '学院导师组', en: 'Faculty group' },
      bio: {
        zh: '公开资料摘要：学院覆盖 AI、机器学习、数据、网络与交叉应用，港澳台学生与国际合作较多；具体导师与招生状态以学院官网为准。',
        en: 'Public-profile summary: the college covers AI, machine learning, data, networking and applied intersections, with many Hong Kong/Macau/Taiwan students and international links. Check the official site for advisers and admissions status.'
      },
      link: 'https://xxxy.jnu.edu.cn/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、数据、网络与交叉', en: 'AI, data, networking and intersections' },
      summary: {
        zh: '学院研究 AI、机器学习、数据、网络与交叉应用。本科/硕士/博士研究机会通过学院导师组与实验室页面；适合英语/编程基础好、想在大湾区做交叉研究的学生。',
        en: 'The college studies AI, machine learning, data, networking and applied intersections. Opportunities go through faculty groups and lab pages; it suits students with good English/coding who want cross-disciplinary research in the Greater Bay Area.'
      },
      methods: {
        zh: 'AI、机器学习、数据、网络、交叉应用。',
        en: 'AI, machine learning, data, networking and applied intersections.'
      },
      fit: {
        zh: '适合英语/编程基础好、想在大湾区做交叉研究的学生；有项目经历更好。',
        en: 'Best for students with good English/coding and interest in cross-disciplinary work in the Greater Bay Area; project experience helps.'
      }
    },
    apply: {
      url: 'https://xxxy.jnu.edu.cn/',
      label: { zh: '信息学院官网', en: 'College of Information Science' },
      note: {
        zh: '通过学院官网的导师/实验室/招生页面了解机会；本站不代收材料，也不提供内推。',
        en: 'Use the official faculty, lab and admissions pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://xxxy.jnu.edu.cn/', label: { zh: 'JNU 信息学院', en: 'JNU College of Information Science' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'cas-ict',
    institution: { zh: '中国科学院计算技术研究所', en: 'Institute of Computing Technology, Chinese Academy of Sciences' },
    unit: { zh: '计算技术研究所 (ICT)', en: 'Institute of Computing Technology (ICT)' },
    region: 'cn',
    kind: 'institute',
    fields: ['ai', 'systems', 'theory'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'phd', 'joint'],
    language: ['zh', 'en'],
    funding: { zh: '以研究所/导师/联合培养项目官方说明为准', en: 'Check institute, supervisor and joint-program terms' },
    mentor: {
      name: { zh: 'ICT 导师组', en: 'ICT research faculty' },
      initials: 'ICT',
      title: { zh: '科研院所导师组', en: 'Research institute faculty' },
      bio: {
        zh: '公开资料摘要：计算所覆盖智能计算、计算机系统、网络、数据与理论等方向，由多支研究团队组成；具体导师、联合培养与访问安排以研究所官网为准。',
        en: 'Public-profile summary: ICT covers intelligent computing, computer systems, networking, data and theory through multiple research teams. Check the official site for advisers, joint training and visiting arrangements.'
      },
      link: 'http://www.ict.cas.cn/',
      highlight: false
    },
    project: {
      title: { zh: '智能计算、系统与数据', en: 'Intelligent computing, systems and data' },
      summary: {
        zh: '研究所的研究覆盖智能计算、处理器与系统、网络、数据管理、AI 与理论。硕士/博士/访问与联合培养机会通过研究所官方页面；建议先读目标团队论文，再了解课题与名额。',
        en: 'Research covers intelligent computing, processors and systems, networking, data management, AI and theory. Master’s/PhD/visiting and joint-training opportunities go through official institute pages; read target-team papers before asking about topics and openings.'
      },
      methods: {
        zh: '智能计算、处理器/系统、网络、数据管理、AI、理论。',
        en: 'Intelligent computing, processors/systems, networking, data management, AI and theory.'
      },
      fit: {
        zh: '适合计算机系统/算法基础扎实、能读论文并做工程实验的学生；有科研或工程项目更好。',
        en: 'Best for students with strong systems/algorithms, paper reading and engineering experiments; research or engineering projects help.'
      }
    },
    apply: {
      url: 'http://www.ict.cas.cn/',
      label: { zh: '计算所官网', en: 'ICT official site' },
      note: {
        zh: '通过研究所官网的招生/联合培养/访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official admissions, joint-training or visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'http://www.ict.cas.cn/', label: { zh: '中科院计算所', en: 'CAS ICT' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'cas-ia',
    institution: { zh: '中国科学院自动化研究所', en: 'Institute of Automation, Chinese Academy of Sciences' },
    unit: { zh: '自动化研究所 (IA)', en: 'Institute of Automation (IA)' },
    region: 'cn',
    kind: 'institute',
    fields: ['ai', 'robotics', 'cv'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'phd', 'joint'],
    language: ['zh', 'en'],
    funding: { zh: '以研究所/导师/联合培养项目官方说明为准', en: 'Check institute, supervisor and joint-program terms' },
    mentor: {
      name: { zh: 'IA 导师组', en: 'IA research faculty' },
      initials: 'IA',
      title: { zh: '科研院所导师组', en: 'Research institute faculty' },
      bio: {
        zh: '公开资料摘要：自动化所覆盖模式识别、计算机视觉、机器人、智能系统与脑启发计算，由多支研究团队组成；具体导师与招生状态以研究所官网为准。',
        en: 'Public-profile summary: IA covers pattern recognition, computer vision, robotics, intelligent systems and brain-inspired computing through multiple teams. Check the official site for advisers and admissions status.'
      },
      link: 'http://www.ia.cas.cn/',
      highlight: false
    },
    project: {
      title: { zh: '智能感知、机器人与视觉', en: 'Intelligent perception, robotics and vision' },
      summary: {
        zh: '研究所研究模式识别、计算机视觉、机器人、智能系统与脑启发计算。硕士/博士/访问与联合培养机会通过研究所官方页面；适合有 CV/机器人/控制基础、愿意做实验的学生。',
        en: 'Research covers pattern recognition, computer vision, robotics, intelligent systems and brain-inspired computing. Master’s/PhD/visiting and joint-training opportunities go through official pages; it suits students with CV/robotics/control foundations and experiment experience.'
      },
      methods: {
        zh: '模式识别、计算机视觉、机器人、智能系统、脑启发计算。',
        en: 'Pattern recognition, computer vision, robotics, intelligent systems and brain-inspired computing.'
      },
      fit: {
        zh: '适合有 CV/机器人/控制基础、能读论文并做实验的学生；有项目经历更好。',
        en: 'Best for students with CV/robotics/control foundations, paper reading and experiments; project experience helps.'
      }
    },
    apply: {
      url: 'http://www.ia.cas.cn/',
      label: { zh: '自动化所官网', en: 'IA official site' },
      note: {
        zh: '通过研究所官网的招生/联合培养/访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official admissions, joint-training or visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'http://www.ia.cas.cn/', label: { zh: '中科院自动化所', en: 'CAS IA' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'cas-iscas',
    institution: { zh: '中国科学院软件研究所', en: 'Institute of Software, Chinese Academy of Sciences' },
    unit: { zh: '软件研究所 (ISCAS)', en: 'Institute of Software (ISCAS)' },
    region: 'cn',
    kind: 'institute',
    fields: ['systems', 'theory', 'ai'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'phd', 'joint'],
    language: ['zh', 'en'],
    funding: { zh: '以研究所/导师/联合培养项目官方说明为准', en: 'Check institute, supervisor and joint-program terms' },
    mentor: {
      name: { zh: 'ISCAS 导师组', en: 'ISCAS research faculty' },
      initials: 'ISCAS',
      title: { zh: '科研院所导师组', en: 'Research institute faculty' },
      bio: {
        zh: '公开资料摘要：软件所覆盖软件工程、操作系统、程序语言、可信计算、AI 与理论，由多支研究团队组成；具体导师与招生状态以研究所官网为准。',
        en: 'Public-profile summary: ISCAS covers software engineering, operating systems, programming languages, trustworthy computing, AI and theory through multiple teams. Check the official site for advisers and admissions status.'
      },
      link: 'http://www.iscas.ac.cn/',
      highlight: false
    },
    project: {
      title: { zh: '软件、系统与可信计算', en: 'Software, systems and trustworthy computing' },
      summary: {
        zh: '研究所研究软件工程、操作系统、程序语言、可信计算、AI 与理论。硕士/博士/访问与联合培养机会通过研究所官方页面；适合系统/软件基础扎实、能读论文并做工程实验的学生。',
        en: 'Research covers software engineering, operating systems, programming languages, trustworthy computing, AI and theory. Master’s/PhD/visiting and joint-training opportunities go through official pages; it suits students with strong systems/software foundations and engineering experiments.'
      },
      methods: {
        zh: '软件工程、操作系统、程序语言、可信计算、AI、理论。',
        en: 'Software engineering, operating systems, programming languages, trustworthy computing, AI and theory.'
      },
      fit: {
        zh: '适合系统/软件基础扎实、能读论文并做工程实验的学生；有开源或系统项目更好。',
        en: 'Best for students with strong systems/software, paper reading and engineering experiments; open-source or systems projects help.'
      }
    },
    apply: {
      url: 'http://www.iscas.ac.cn/',
      label: { zh: '软件所官网', en: 'ISCAS official site' },
      note: {
        zh: '通过研究所官网的招生/联合培养/访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official admissions, joint-training or visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'http://www.iscas.ac.cn/', label: { zh: '中科院软件所', en: 'CAS ISCAS' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'baai',
    institution: { zh: '北京智源人工智能研究院', en: 'Beijing Academy of Artificial Intelligence (BAAI)' },
    unit: { zh: '智源研究院', en: 'BAAI research teams' },
    region: 'cn',
    kind: 'institute',
    fields: ['ai', 'ml', 'nlp'],
    levels: ['phd', 'visiting'],
    types: ['research', 'joint', 'fellowship'],
    language: ['zh', 'en'],
    funding: { zh: '以研究院官方项目/奖学金/联合培养说明为准', en: 'Check BAAI program, fellowship and joint-training terms' },
    mentor: {
      name: { zh: 'BAAI 研究团队', en: 'BAAI research teams' },
      initials: 'BAAI',
      title: { zh: '研究院研究团队', en: 'Research institute teams' },
      bio: {
        zh: '公开资料摘要：智源研究院聚焦大模型、AI 基础、多模态、AI 安全与开放数据集，由多支研究团队与高校合作者组成；具体导师与项目以官网为准。',
        en: 'Public-profile summary: BAAI focuses on large models, AI foundations, multimodality, AI safety and open datasets through research teams and university collaborators. Check the official site for advisers and projects.'
      },
      link: 'https://www.baai.ac.cn/',
      highlight: false
    },
    project: {
      title: { zh: '大模型、AI 基础与开放研究', en: 'Large models, AI foundations and open research' },
      summary: {
        zh: '研究院研究大模型、多模态、AI 安全、开放数据集与评测。博士/访问/联合培养与 fellowship 机会通过官网；适合有 ML/LLM 基础、能读论文并做大规模实验的学生。',
        en: 'Research covers large models, multimodality, AI safety, open datasets and evaluation. PhD/visiting/joint-training and fellowship opportunities go through the official site; it suits students with ML/LLM foundations, paper reading and large-scale experiments.'
      },
      methods: {
        zh: '大模型、多模态、AI 安全、开放数据、评测。',
        en: 'Large models, multimodality, AI safety, open data and evaluation.'
      },
      fit: {
        zh: '适合 ML/LLM 基础好、能读论文并做大规模实验的学生；有开源或论文经历更好。',
        en: 'Best for students with strong ML/LLM, paper reading and large-scale experiments; open-source or paper experience helps.'
      }
    },
    apply: {
      url: 'https://www.baai.ac.cn/',
      label: { zh: '智源研究院官网', en: 'BAAI official site' },
      note: {
        zh: '通过研究院官网的项目/招聘/联合培养页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official project, recruitment or joint-training pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.baai.ac.cn/', label: { zh: 'BAAI', en: 'BAAI' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'zhejiang-lab',
    institution: { zh: '之江实验室', en: 'Zhejiang Lab' },
    unit: { zh: '之江实验室', en: 'Zhejiang Lab' },
    region: 'cn',
    kind: 'lab',
    fields: ['ai', 'systems'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'joint'],
    language: ['zh', 'en'],
    funding: { zh: '以实验室官方项目/联合培养/招聘说明为准', en: 'Check lab program, joint-training and recruitment terms' },
    mentor: {
      name: { zh: '之江实验室研究团队', en: 'Zhejiang Lab research teams' },
      initials: 'ZJ',
      title: { zh: '实验室研究团队', en: 'Laboratory research teams' },
      bio: {
        zh: '公开资料摘要：之江实验室聚焦智能计算、AI、智能系统与算力基础设施，由多支研究团队组成；具体导师与项目以官网为准。',
        en: 'Public-profile summary: Zhejiang Lab focuses on intelligent computing, AI, intelligent systems and compute infrastructure through multiple research teams. Check the official site for advisers and projects.'
      },
      link: 'https://www.zhejianglab.com/',
      highlight: false
    },
    project: {
      title: { zh: '智能计算、AI 与系统', en: 'Intelligent computing, AI and systems' },
      summary: {
        zh: '实验室研究智能计算、AI、智能系统与算力基础设施。硕士/博士/访问与联合培养机会通过官网；适合系统/算法基础好、能参与大型平台与工程项目的学生。',
        en: 'Research covers intelligent computing, AI, intelligent systems and compute infrastructure. Master’s/PhD/visiting and joint-training opportunities go through the official site; it suits students with strong systems/algorithms who can contribute to large platforms and engineering projects.'
      },
      methods: {
        zh: '智能计算、AI、智能系统、算力基础设施。',
        en: 'Intelligent computing, AI, intelligent systems and compute infrastructure.'
      },
      fit: {
        zh: '适合系统/算法基础好、能参与大型平台与工程项目的学生；有工程项目经历更好。',
        en: 'Best for students with strong systems/algorithms and large platform/engineering experience; engineering projects help.'
      }
    },
    apply: {
      url: 'https://www.zhejianglab.com/',
      label: { zh: '之江实验室官网', en: 'Zhejiang Lab official site' },
      note: {
        zh: '通过实验室官网的项目/招聘/联合培养页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official project, recruitment or joint-training pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.zhejianglab.com/', label: { zh: 'Zhejiang Lab', en: 'Zhejiang Lab' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'pengcheng-lab',
    institution: { zh: '鹏城实验室', en: 'Peng Cheng Laboratory' },
    unit: { zh: '鹏城实验室', en: 'Peng Cheng Laboratory' },
    region: 'cn',
    kind: 'lab',
    fields: ['ai', 'systems'],
    levels: ['master', 'phd', 'visiting'],
    types: ['research', 'joint'],
    language: ['zh', 'en'],
    funding: { zh: '以实验室官方项目/联合培养/招聘说明为准', en: 'Check lab program, joint-training and recruitment terms' },
    mentor: {
      name: { zh: '鹏城实验室研究团队', en: 'Peng Cheng Laboratory research teams' },
      initials: 'PCL',
      title: { zh: '实验室研究团队', en: 'Laboratory research teams' },
      bio: {
        zh: '公开资料摘要：鹏城实验室聚焦网络通信、AI、算力与重大基础设施，由多支研究团队组成；具体导师与项目以官网为准。',
        en: 'Public-profile summary: Peng Cheng Laboratory focuses on networking, AI, computing infrastructure and major facilities through multiple research teams. Check the official site for advisers and projects.'
      },
      link: 'https://www.pcl.ac.cn/',
      highlight: false
    },
    project: {
      title: { zh: '网络通信、AI 与算力', en: 'Networking, AI and computing infrastructure' },
      summary: {
        zh: '实验室研究网络通信、AI、算力基础设施与重大应用。硕士/博士/访问与联合培养机会通过官网；适合网络/系统/AI 基础好、能参与大型实验平台的学生。',
        en: 'Research covers networking, AI, computing infrastructure and major applications. Master’s/PhD/visiting and joint-training opportunities go through the official site; it suits students with strong networking/systems/AI who can join large experimental platforms.'
      },
      methods: {
        zh: '网络通信、AI、算力基础设施、重大应用。',
        en: 'Networking, AI, computing infrastructure and major applications.'
      },
      fit: {
        zh: '适合网络/系统/AI 基础好、能参与大型实验平台的学生；有工程项目经历更好。',
        en: 'Best for students with strong networking/systems/AI and large platform experience; engineering projects help.'
      }
    },
    apply: {
      url: 'https://www.pcl.ac.cn/',
      label: { zh: '鹏城实验室官网', en: 'Peng Cheng Laboratory official site' },
      note: {
        zh: '通过实验室官网的项目/招聘/联合培养页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official project, recruitment or joint-training pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.pcl.ac.cn/', label: { zh: 'Peng Cheng Laboratory', en: 'Peng Cheng Laboratory' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'msra',
    institution: { zh: '微软亚洲研究院', en: 'Microsoft Research Asia' },
    unit: { zh: 'Microsoft Research Asia (MSRA)', en: 'Microsoft Research Asia (MSRA)' },
    region: 'cn',
    kind: 'industry',
    fields: ['ai', 'ml', 'systems', 'hci'],
    levels: ['undergrad', 'master', 'phd'],
    types: ['research', 'summer'],
    language: ['en', 'zh'],
    funding: { zh: '以研究院官方实习/联合培养/招聘说明为准', en: 'Check official internship, joint-training and recruitment terms' },
    mentor: {
      name: { zh: 'MSRA 研究组', en: 'MSRA research groups' },
      initials: 'MSRA',
      title: { zh: '企业研究院研究组', en: 'Industry research groups' },
      bio: {
        zh: '公开资料摘要：MSRA 覆盖 AI、机器学习、系统、HCI、语音与自然语言等方向，由多支研究组组成；实习/联合培养机会与导师安排以官方页面为准。',
        en: 'Public-profile summary: MSRA covers AI, machine learning, systems, HCI, speech and NLP through multiple research groups. Check official pages for internships, joint training and adviser arrangements.'
      },
      link: 'https://www.microsoft.com/en-us/research/lab/microsoft-research-asia/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、ML、系统与 HCI', en: 'AI, ML, systems and HCI' },
      summary: {
        zh: '研究院研究 AI、机器学习、系统、HCI、语音与自然语言。本科/硕士/博士实习与联合培养机会通过官方页面；适合有较强编程/论文能力、希望做产业研究的同学。',
        en: 'Research covers AI, machine learning, systems, HCI, speech and NLP. Undergraduate/master/PhD internships and joint training go through official pages; it suits students with strong coding/paper skills who want industry research.'
      },
      methods: {
        zh: 'AI、机器学习、系统、HCI、语音、自然语言。',
        en: 'AI, machine learning, systems, HCI, speech and NLP.'
      },
      fit: {
        zh: '适合编程/论文能力较强、能独立推进项目的学生；有实习或开源经历更好。',
        en: 'Best for students with strong coding/paper skills who can drive projects; internships or open-source work help.'
      }
    },
    apply: {
      url: 'https://www.microsoft.com/en-us/research/lab/microsoft-research-asia/',
      label: { zh: 'MSRA 官方页面', en: 'MSRA official page' },
      note: {
        zh: '通过研究院官方实习/招聘/联合培养页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official internship, recruitment or joint-training pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.microsoft.com/en-us/research/lab/microsoft-research-asia/', label: { zh: 'Microsoft Research Asia', en: 'Microsoft Research Asia' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'mpi-is',
    institution: { zh: '马克斯·普朗克智能系统研究所', en: 'Max Planck Institute for Intelligent Systems' },
    unit: { zh: 'MPI for Intelligent Systems (MPI-IS)', en: 'Max Planck Institute for Intelligent Systems (MPI-IS)' },
    region: 'eu',
    kind: 'institute',
    fields: ['ai', 'robotics', 'ml'],
    levels: ['phd', 'postdoc', 'visiting'],
    types: ['phd', 'research'],
    language: ['en'],
    funding: { zh: '以 MPI/博士项目官方资助说明为准', en: 'Check MPI/PhD program funding terms' },
    mentor: {
      name: { zh: 'MPI-IS 研究组', en: 'MPI-IS research groups' },
      initials: 'MPI',
      title: { zh: '国际研究所研究组', en: 'International research institute groups' },
      bio: {
        zh: '公开资料摘要：MPI-IS 覆盖经验推断、机器人、机器学习、计算机视觉与物理智能，由多个研究组组成；具体导师与博士/访问安排以官网为准。',
        en: 'Public-profile summary: MPI-IS covers empirical inference, robotics, machine learning, computer vision and physical intelligence through multiple groups. Check the official site for advisers and PhD/visiting arrangements.'
      },
      link: 'https://is.mpg.de/',
      highlight: false
    },
    project: {
      title: { zh: '智能系统、机器人与机器学习', en: 'Intelligent systems, robotics and machine learning' },
      summary: {
        zh: '研究所研究经验推断、机器人、机器学习、计算机视觉与物理智能。博士/博后/访问机会通过 MPI 官方页面；适合数学/编程基础强、能独立做研究的学生。',
        en: 'Research covers empirical inference, robotics, machine learning, computer vision and physical intelligence. PhD/postdoc/visiting opportunities go through official MPI pages; it suits students with strong maths/coding who can research independently.'
      },
      methods: {
        zh: '经验推断、机器人、机器学习、计算机视觉、物理智能。',
        en: 'Empirical inference, robotics, machine learning, computer vision and physical intelligence.'
      },
      fit: {
        zh: '适合数学/编程基础强、能独立读论文与做实验的学生；有研究经历更好。',
        en: 'Best for students with strong maths/coding who can read papers and run experiments independently; research experience helps.'
      }
    },
    apply: {
      url: 'https://is.mpg.de/',
      label: { zh: 'MPI-IS 官网', en: 'MPI-IS official site' },
      note: {
        zh: '通过 MPI-IS 官方博士/访问/招聘页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official MPI-IS PhD, visiting or recruitment pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://is.mpg.de/', label: { zh: 'MPI for Intelligent Systems', en: 'MPI for Intelligent Systems' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'allen-ai2',
    institution: { zh: '艾伦人工智能研究所', en: 'Allen Institute for AI (AI2)' },
    unit: { zh: 'Allen Institute for AI (AI2)', en: 'Allen Institute for AI (AI2)' },
    region: 'us',
    kind: 'institute',
    fields: ['ai', 'nlp', 'cv'],
    levels: ['phd', 'visiting'],
    types: ['research', 'fellowship'],
    language: ['en'],
    funding: { zh: '以 AI2 官方项目/fellowship 说明为准', en: 'Check AI2 program and fellowship terms' },
    mentor: {
      name: { zh: 'AI2 研究团队', en: 'AI2 research teams' },
      initials: 'AI2',
      title: { zh: '非营利研究所研究团队', en: 'Nonprofit research institute teams' },
      bio: {
        zh: '公开资料摘要：AI2 聚焦自然语言处理、常识推理、计算机视觉、AI for Science 与开放研究，由多个研究团队组成；具体导师与项目以官网为准。',
        en: 'Public-profile summary: AI2 focuses on NLP, commonsense reasoning, computer vision, AI for Science and open research through multiple teams. Check the official site for advisers and projects.'
      },
      link: 'https://allenai.org/',
      highlight: false
    },
    project: {
      title: { zh: 'NLP、常识推理与 AI for Science', en: 'NLP, commonsense reasoning and AI for Science' },
      summary: {
        zh: '研究所研究 NLP、常识推理、计算机视觉、AI for Science 与开放研究。博士/访问/fellowship 机会通过官网；适合有 NLP/ML 基础、能读论文并做开源研究的学生。',
        en: 'Research covers NLP, commonsense reasoning, computer vision, AI for Science and open research. PhD/visiting/fellowship opportunities go through the official site; it suits students with NLP/ML foundations, paper reading and open research.'
      },
      methods: {
        zh: 'NLP、常识推理、计算机视觉、AI for Science、开放研究。',
        en: 'NLP, commonsense reasoning, computer vision, AI for Science and open research.'
      },
      fit: {
        zh: '适合 NLP/ML 基础好、能读论文并做开源研究的学生；有论文或开源项目更好。',
        en: 'Best for students with strong NLP/ML, paper reading and open research; papers or open-source projects help.'
      }
    },
    apply: {
      url: 'https://allenai.org/',
      label: { zh: 'AI2 官网', en: 'AI2 official site' },
      note: {
        zh: '通过 AI2 官方项目/招聘/访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official AI2 program, recruitment or visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://allenai.org/', label: { zh: 'Allen Institute for AI', en: 'Allen Institute for AI' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'vector-institute',
    institution: { zh: 'Vector 人工智能研究所', en: 'Vector Institute' },
    unit: { zh: 'Vector Institute', en: 'Vector Institute' },
    region: 'ca',
    kind: 'institute',
    fields: ['ai', 'ml', 'medai'],
    levels: ['phd', 'postdoc', 'visiting'],
    types: ['research', 'fellowship'],
    language: ['en'],
    funding: { zh: '以 Vector/合作高校官方项目与奖学金说明为准', en: 'Check Vector/partner university program and scholarship terms' },
    mentor: {
      name: { zh: 'Vector 研究团队', en: 'Vector research teams' },
      initials: 'VEC',
      title: { zh: '研究所研究团队', en: 'Research institute teams' },
      bio: {
        zh: '公开资料摘要：Vector 聚焦机器学习、AI、健康与可信 AI，与多所加拿大高校合作；具体导师与项目以官网为准。',
        en: 'Public-profile summary: Vector focuses on machine learning, AI, health and trustworthy AI in collaboration with Canadian universities. Check the official site for advisers and projects.'
      },
      link: 'https://vectorinstitute.ai/',
      highlight: false
    },
    project: {
      title: { zh: '机器学习、AI 与健康', en: 'Machine learning, AI and health' },
      summary: {
        zh: '研究所研究机器学习、AI、健康、可信 AI 与产业合作。博士/博后/访问/fellowship 机会通过官网与高校合作项目；适合 ML 基础好、能读论文并做实验的学生。',
        en: 'Research covers machine learning, AI, health, trustworthy AI and industry collaboration. PhD/postdoc/visiting/fellowship opportunities go through official and partner-university programs; it suits students with strong ML, paper reading and experiments.'
      },
      methods: {
        zh: '机器学习、AI、健康、可信 AI、产业合作。',
        en: 'Machine learning, AI, health, trustworthy AI and industry collaboration.'
      },
      fit: {
        zh: '适合 ML 基础好、能读论文并做实验的学生；有健康 AI 或论文经历更好。',
        en: 'Best for students with strong ML, paper reading and experiments; health AI or papers help.'
      }
    },
    apply: {
      url: 'https://vectorinstitute.ai/',
      label: { zh: 'Vector 官网', en: 'Vector official site' },
      note: {
        zh: '通过 Vector/合作高校官方项目页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official Vector/partner-university program pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://vectorinstitute.ai/', label: { zh: 'Vector Institute', en: 'Vector Institute' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'riken-aip',
    institution: { zh: '理化学研究所 先进智能项目中心', en: 'RIKEN Center for Advanced Intelligence Project' },
    unit: { zh: 'RIKEN AIP', en: 'RIKEN AIP' },
    region: 'asia',
    kind: 'institute',
    fields: ['ai', 'ml'],
    levels: ['phd', 'postdoc', 'visiting'],
    types: ['research', 'phd'],
    language: ['en', 'ja'],
    funding: { zh: '以 RIKEN/AIP 官方项目与奖学金说明为准', en: 'Check RIKEN/AIP program and fellowship terms' },
    mentor: {
      name: { zh: 'AIP 研究团队', en: 'AIP research teams' },
      initials: 'AIP',
      title: { zh: '研究所研究团队', en: 'Research institute teams' },
      bio: {
        zh: '公开资料摘要：RIKEN AIP 聚焦 AI、机器学习、优化、AI for Science 与跨学科研究，由多个团队组成；具体导师与项目以官网为准。',
        en: 'Public-profile summary: RIKEN AIP focuses on AI, machine learning, optimisation, AI for Science and interdisciplinary research through multiple teams. Check the official site for advisers and projects.'
      },
      link: 'https://aip.riken.jp/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、ML 与跨学科', en: 'AI, ML and interdisciplinary research' },
      summary: {
        zh: '研究所研究 AI、机器学习、优化、AI for Science 与跨学科应用。博士/博后/访问机会通过官网；适合数学/ML 基础好、能读论文并做实验的学生。',
        en: 'Research covers AI, machine learning, optimisation, AI for Science and interdisciplinary applications. PhD/postdoc/visiting opportunities go through the official site; it suits students with strong maths/ML, paper reading and experiments.'
      },
      methods: {
        zh: 'AI、机器学习、优化、AI for Science、跨学科。',
        en: 'AI, machine learning, optimisation, AI for Science and interdisciplinary research.'
      },
      fit: {
        zh: '适合数学/ML 基础好、能读论文并做实验的学生；有跨学科项目经历更好。',
        en: 'Best for students with strong maths/ML, paper reading and experiments; interdisciplinary projects help.'
      }
    },
    apply: {
      url: 'https://aip.riken.jp/',
      label: { zh: 'RIKEN AIP 官网', en: 'RIKEN AIP official site' },
      note: {
        zh: '通过 RIKEN/AIP 官方博士/访问/招聘页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official RIKEN/AIP PhD, visiting or recruitment pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://aip.riken.jp/', label: { zh: 'RIKEN AIP', en: 'RIKEN AIP' } },
    updated: '2026-10',
    status: 'check'
  },
  {
    id: 'turing-institute',
    institution: { zh: '艾伦·图灵研究所', en: 'The Alan Turing Institute' },
    unit: { zh: 'The Alan Turing Institute', en: 'The Alan Turing Institute' },
    region: 'uk',
    kind: 'institute',
    fields: ['ai', 'ml', 'hci'],
    levels: ['phd', 'postdoc', 'visiting'],
    types: ['research', 'fellowship'],
    language: ['en'],
    funding: { zh: '以 Turing 官方项目/fellowship 说明为准', en: 'Check Turing program and fellowship terms' },
    mentor: {
      name: { zh: 'Turing 研究团队', en: 'Turing research teams' },
      initials: 'ATI',
      title: { zh: '国家研究所研究团队', en: 'National institute research teams' },
      bio: {
        zh: '公开资料摘要：图灵研究所聚焦 AI、数据科学、可信 AI、健康与公共政策，与英国高校合作；具体导师与项目以官网为准。',
        en: 'Public-profile summary: the Turing Institute focuses on AI, data science, trustworthy AI, health and public policy in collaboration with UK universities. Check the official site for advisers and projects.'
      },
      link: 'https://www.turing.ac.uk/',
      highlight: false
    },
    project: {
      title: { zh: 'AI、数据科学与公共政策', en: 'AI, data science and public policy' },
      summary: {
        zh: '研究所研究 AI、数据科学、可信 AI、健康与公共政策。博士/博后/访问/fellowship 机会通过官网；适合 ML/数据基础好、对公共政策或健康交叉感兴趣的学生。',
        en: 'Research covers AI, data science, trustworthy AI, health and public policy. PhD/postdoc/visiting/fellowship opportunities go through the official site; it suits students with strong ML/data and interest in policy or health intersections.'
      },
      methods: {
        zh: 'AI、数据科学、可信 AI、健康、公共政策。',
        en: 'AI, data science, trustworthy AI, health and public policy.'
      },
      fit: {
        zh: '适合 ML/数据基础好、对公共政策或健康交叉感兴趣的学生；有跨学科经历更好。',
        en: 'Best for students with strong ML/data and interest in policy or health; interdisciplinary experience helps.'
      }
    },
    apply: {
      url: 'https://www.turing.ac.uk/',
      label: { zh: 'Turing 官网', en: 'Turing official site' },
      note: {
        zh: '通过 Turing 官方项目/招聘/访问页面申请；本站不代收材料，也不提供内推。',
        en: 'Apply through official Turing program, recruitment or visiting pages. This site does not collect materials or offer referrals.'
      }
    },
    source: { url: 'https://www.turing.ac.uk/', label: { zh: 'The Alan Turing Institute', en: 'The Alan Turing Institute' } },
    updated: '2026-10',
    status: 'check'
  }
];
