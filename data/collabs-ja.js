/* ============================================================
   collabs-ja.js — 日语版新增条目（日本为主，兼新加坡）

   合规说明与主索引一致：只收录机构官网公开页面；
   不收录个人邮箱、学生名单或未公开名额；摘要为本站原创改写。
   ============================================================ */

(function () {
  'use strict';

  var extra = [
    {
      id: 'kyoto-informatics',
      institution: { zh: '京都大学', en: 'Kyoto University', ja: '京都大学' },
      unit: { zh: '情报学研究科 · 机器学习与数据挖掘', en: 'Graduate School of Informatics · machine learning and data mining', ja: '情報学研究科 · 機械学習とデータマイニング' },
      region: 'jp',
      fields: ['ml', 'ai'],
      levels: ['master', 'phd', 'visiting'],
      types: ['research', 'phd'],
      language: ['ja', 'en'],
      funding: { zh: '以京都大学官方奖学金与研究室项目说明为准', en: 'Check Kyoto University scholarship and lab project terms' },
      mentor: {
        name: { zh: '鹿岛久嗣', en: 'Hisashi Kashima', ja: '鹿島久嗣' },
        initials: 'HK',
        title: { zh: '京都大学情报学研究科教授', en: 'Professor, Graduate School of Informatics, Kyoto University', ja: '京都大学大学院情報学研究科 教授' },
        bio: {
          zh: '公开资料摘要：鹿岛久嗣任职于京都大学情报学研究科，公开研究方向包括统计机器学习、数据挖掘、图与关系数据分析，以及面向科学与社会的应用。具体招生与访问安排以京都大学官网为准。',
          en: 'Public-profile summary: Hisashi Kashima is a professor at Kyoto University’s Graduate School of Informatics. His public work covers statistical machine learning, data mining, graph and relational data, and applications in science and society. Check Kyoto University’s official pages for admissions and visiting arrangements.'
        },
        link: 'https://www.i.kyoto-u.ac.jp/en/',
        highlight: true
      },
      project: {
        title: { zh: '图数据、时间序列与跨学科机器学习', en: 'Graph data, time series and interdisciplinary ML', ja: 'グラフ・時系列・学際的機械学習' },
        summary: {
          zh: '研究室以统计机器学习与数据挖掘为主线，关注图与关系数据、时间序列，以及材料、生物与社会系统中的预测问题。学生通常先复现一篇论文或整理一个公开数据集，再逐步转入自己的问题；申请走京都大学情报学研究科的官方入学与访问程序。',
          en: 'The lab works along statistical machine learning and data mining, focusing on graphs and relational data, time series, and prediction problems in materials, biology and social systems. Students usually start by reproducing a paper or curating a public dataset before moving to their own problem. Apply through the official admissions and visiting routes of Kyoto University’s Graduate School of Informatics.'
        },
        methods: {
          zh: '统计机器学习、图与关系数据、时间序列、跨学科应用。',
          en: 'Statistical machine learning, graph and relational data, time series, interdisciplinary applications.'
        },
        fit: {
          zh: '适合线性代数与概率统计扎实、能读写英文论文、熟悉 Python 与基础深度学习的学生；日语有助于日常讨论。',
          en: 'Best for students with solid linear algebra and probability, English paper reading, Python and basic deep learning; Japanese helps for daily discussion.'
        }
      },
      apply: {
        url: 'https://www.i.kyoto-u.ac.jp/en/',
        label: { zh: '京都大学情报学研究科', en: 'Kyoto University Graduate School of Informatics' },
        note: {
          zh: '通过京都大学情报学研究科的官方入学、访问与研究室页面申请；本站不代收材料，也不提供内推。',
          en: 'Apply through the official admissions, visiting and lab pages of Kyoto University’s Graduate School of Informatics. This site does not collect materials or offer referrals.'
        }
      },
      source: { url: 'https://www.i.kyoto-u.ac.jp/en/', label: { zh: '京都大学情报学研究科', en: 'Kyoto University Graduate School of Informatics' } },
      updated: '2026-10',
      status: 'check'
    },
    {
      id: 'osaka-ist',
      institution: { zh: '大阪大学', en: 'Osaka University', ja: '大阪大学' },
      unit: { zh: '情报科学研究科', en: 'Graduate School of Information Science and Technology', ja: '情報科学研究科' },
      region: 'jp',
      fields: ['ai', 'ml', 'robotics', 'cv'],
      levels: ['master', 'phd', 'visiting'],
      types: ['research', 'phd'],
      language: ['ja', 'en'],
      funding: { zh: '以大阪大学与情报科学研究科官方奖学金、项目说明为准', en: 'Check Osaka University and IST scholarship and program terms' },
      mentor: {
        name: { zh: '情报科学研究科 研究室群', en: 'IST research groups', ja: '情報科学研究科の研究室群' },
        initials: 'IST',
        title: { zh: '学院层面索引，不对应单一导师', en: 'School-level index, not a single supervisor', ja: '研究科単位の索引（特定の教員ではありません）' },
        bio: {
          zh: '公开资料摘要：大阪大学情报科学研究科下设多个研究室，公开方向覆盖人工智能、机器学习、计算机视觉、机器人与信息系统。本条按学院整理，不指认某位教授一定招生；具体导师与名额以官网为准。',
          en: 'Public-profile summary: Osaka University’s Graduate School of Information Science and Technology hosts many labs across AI, machine learning, computer vision, robotics and information systems. This entry indexes the school rather than one supervisor; check the official site for advisers and openings.'
        },
        link: 'https://www.osaka-u.ac.jp/en',
        highlight: false
      },
      project: {
        title: { zh: '智能系统、视觉与机器人', en: 'Intelligent systems, vision and robotics', ja: '知能システム・視覚・ロボティクス' },
        summary: {
          zh: '研究覆盖机器学习、计算机视觉、机器人与媒体处理等方向，与关西地区的产业和研究机构联系紧密。申请之前先确认目标研究室近年论文与在读学生的去向，再用一页材料说明你能复现或推进哪一部分；具体流程走学院官方入试页面。',
          en: 'Research spans machine learning, computer vision, robotics and media processing, with close ties to industry and research institutes in the Kansai region. Before applying, check the target lab’s recent papers and where its students go, then write one page on what you can reproduce or advance. Use the school’s official admissions pages.'
        },
        methods: {
          zh: '机器学习、计算机视觉、机器人、媒体信息处理。',
          en: 'Machine learning, computer vision, robotics, media information processing.'
        },
        fit: {
          zh: '适合已有一门编程语言与数学基础、能读英文论文的学生；有机器人、视觉或嵌入式项目经历更有说服力。',
          en: 'Best for students with one strong language and solid maths who can read English papers; robotics, vision or embedded projects strengthen the case.'
        }
      },
      apply: {
        url: 'https://www.osaka-u.ac.jp/en',
        label: { zh: '大阪大学官网', en: 'Osaka University official site' },
        note: {
          zh: '通过大阪大学情报科学研究科的官方入试与访问页面申请，并通过目标研究室公开的联系渠道询问；本站不代收材料，也不提供内推。',
          en: 'Apply through the official IST admissions and visiting pages and contact the target lab through its published channels. This site does not collect materials or offer referrals.'
        }
      },
      source: { url: 'https://www.osaka-u.ac.jp/en', label: { zh: '大阪大学', en: 'Osaka University' } },
      updated: '2026-10',
      status: 'check'
    },
    {
      id: 'naist-is',
      institution: { zh: '奈良先端科学技术大学院大学', en: 'Nara Institute of Science and Technology', ja: '奈良先端科学技術大学院大学' },
      unit: { zh: '情报科学领域', en: 'Division of Information Science', ja: '情報科学領域' },
      region: 'jp',
      fields: ['ai', 'ml', 'nlp', 'cv', 'hci'],
      levels: ['master', 'phd', 'visiting'],
      types: ['research', 'phd'],
      language: ['ja', 'en'],
      funding: { zh: '以 NAIST 官方入学与奖学金说明为准', en: 'Check NAIST official admissions and scholarship terms' },
      mentor: {
        name: { zh: '情报科学领域 研究室群', en: 'Division of Information Science groups', ja: '情報科学領域の研究室群' },
        initials: 'NAIST',
        title: { zh: '领域层面索引，不对应单一导师', en: 'Division-level index, not a single supervisor', ja: '領域単位の索引（特定の教員ではありません）' },
        bio: {
          zh: '公开资料摘要：NAIST 情报科学领域由多个研究室组成，公开方向包括机器学习、自然语言处理、计算机视觉、人机交互与数据科学。研究生院以国际化程度较高、英语环境友好著称；本条按领域整理，导师与名额以官网为准。',
          en: 'Public-profile summary: NAIST’s Division of Information Science is made up of many labs covering machine learning, NLP, computer vision, HCI and data science. The graduate school is known for an international, English-friendly environment. This entry indexes the division; check the official site for advisers and openings.'
        },
        link: 'https://www.naist.jp/en/',
        highlight: false
      },
      project: {
        title: { zh: '信息科学：从感知到语言', en: 'Information science: from perception to language', ja: '情報科学：知覚から言語まで' },
        summary: {
          zh: '方向横跨视觉、语音、自然语言、机器学习与人机交互，多数研究室希望学生在入学前就有一个可演示的小项目或复现报告。申请以 NAIST 官方入试说明为准，部分研究室接受访问学生与短期研究实习。',
          en: 'Directions span vision, speech, natural language, machine learning and HCI. Most labs hope to see a demonstrable small project or reproduction report before entry. Follow NAIST’s official admissions guidance; some labs accept visiting students and short research internships.'
        },
        methods: {
          zh: '机器学习、NLP、计算机视觉、语音、人机交互。',
          en: 'Machine learning, NLP, computer vision, speech, HCI.'
        },
        fit: {
          zh: '适合希望在日本读研、英语能应付课堂与研究交流的学生；GitHub 项目或论文复现记录更容易被记住。',
          en: 'Best for students aiming at a Japanese graduate degree with English good enough for classes and research; a GitHub project or reproduction record helps you stand out.'
        }
      },
      apply: {
        url: 'https://www.naist.jp/en/',
        label: { zh: 'NAIST 官网', en: 'NAIST official site' },
        note: {
          zh: '通过 NAIST 官方入学考试说明与各研究室公开页面申请；本站不代收材料，也不提供内推。',
          en: 'Apply through NAIST’s official admissions information and the public pages of individual labs. This site does not collect materials or offer referrals.'
        }
      },
      source: { url: 'https://www.naist.jp/en/', label: { zh: 'NAIST', en: 'NAIST' } },
      updated: '2026-10',
      status: 'check'
    },
    {
      id: 'nii-aizawa',
      institution: { zh: '日本国立情报学研究所', en: 'National Institute of Informatics', ja: '国立情報学研究所' },
      unit: { zh: '情报社会研究系 · 自然语言处理', en: 'Information and Society Research Division · NLP', ja: '情報社会研究系 · 自然言語処理' },
      region: 'jp',
      kind: 'institute',
      fields: ['nlp', 'ai', 'ml'],
      levels: ['phd', 'postdoc', 'visiting'],
      types: ['research', 'phd'],
      language: ['ja', 'en'],
      funding: { zh: '以 NII 与综合研究大学院大学官方项目说明为准', en: 'Check NII and SOKENDAI program terms' },
      mentor: {
        name: { zh: '相泽彰子', en: 'Akiko Aizawa', ja: '相澤彰子' },
        initials: 'AA',
        title: { zh: '日本国立情报学研究所教授', en: 'Professor, National Institute of Informatics', ja: '国立情報学研究所 教授' },
        bio: {
          zh: '公开资料摘要：相泽彰子任职于日本国立情报学研究所，公开研究涉及自然语言处理、学术文本挖掘、信息检索与知识组织，并参与学术信息平台相关项目。博士培养多通过综合研究大学院大学（SOKENDAI）等官方渠道，具体安排以官网为准。',
          en: 'Public-profile summary: Akiko Aizawa is a professor at Japan’s National Institute of Informatics. Her public work covers natural language processing, scholarly text mining, information retrieval and knowledge organisation, including academic information platforms. Doctoral training usually runs through official channels such as SOKENDAI; check the official pages.'
        },
        link: 'https://www.nii.ac.jp/en/',
        highlight: true
      },
      project: {
        title: { zh: '学术文本挖掘与知识组织', en: 'Scholarly text mining and knowledge organisation', ja: '学術テキストマイニングと知識組織化' },
        summary: {
          zh: '研究所以信息学基础研究为主，方向包括自然语言处理、学术文献挖掘、信息检索与知识图谱。项目通常围绕真实学术数据展开，强调数据清洗、评测设计与可复现实验；申请需通过 NII 或 SOKENDAI 的官方程序。',
          en: 'The institute focuses on fundamental informatics research, including NLP, scholarly document mining, information retrieval and knowledge graphs. Projects usually work on real scholarly data and emphasise data cleaning, evaluation design and reproducible experiments. Apply through official NII or SOKENDAI procedures.'
        },
        methods: {
          zh: 'NLP、学术文本挖掘、信息检索、知识图谱。',
          en: 'NLP, scholarly text mining, information retrieval, knowledge graphs.'
        },
        fit: {
          zh: '适合 NLP 或信息检索基础扎实、能处理大规模文本与标注数据的学生；日语与英语都可能在实际项目中使用。',
          en: 'Best for students with solid NLP or IR foundations who can handle large text corpora and annotation; both Japanese and English may be used in projects.'
        }
      },
      apply: {
        url: 'https://www.nii.ac.jp/en/',
        label: { zh: 'NII 官网', en: 'NII official site' },
        note: {
          zh: '通过 NII 与 SOKENDAI 官方招生、访问与实习页面申请；本站不代收材料，也不提供内推。',
          en: 'Apply through official NII and SOKENDAI admissions, visiting and internship pages. This site does not collect materials or offer referrals.'
        }
      },
      source: { url: 'https://www.nii.ac.jp/en/', label: { zh: 'National Institute of Informatics', en: 'National Institute of Informatics' } },
      updated: '2026-10',
      status: 'check'
    },
    {
      id: 'preferred-networks',
      institution: { zh: 'Preferred Networks（PFN）', en: 'Preferred Networks, Inc.', ja: '株式会社Preferred Networks' },
      unit: { zh: '研究开发部门', en: 'Research and development', ja: '研究開発部門' },
      region: 'jp',
      kind: 'industry',
      fields: ['ml', 'ai', 'systems'],
      levels: ['undergrad', 'master', 'phd'],
      types: ['research', 'summer'],
      language: ['ja', 'en'],
      funding: { zh: '实习与聘用条件以 PFN 官方招聘页面为准', en: 'Internship and employment terms follow PFN’s official careers pages' },
      mentor: {
        name: { zh: '冈野原大辅', en: 'Daisuke Okanohara', ja: '岡野原大輔' },
        initials: 'DO',
        title: { zh: 'Preferred Networks 共同创业者、代表董事', en: 'Co-founder and Representative Director, Preferred Networks', ja: 'Preferred Networks 共同創業者・代表取締役' },
        bio: {
          zh: '公开资料摘要：冈野原大辅是 Preferred Networks 的共同创业者与代表董事，公开工作涉及大规模机器学习、自然语言处理与深度学习系统；公司长期投入深度学习框架、计算硬件与产业应用。具体岗位与实习安排以官方招聘页面为准。',
          en: 'Public-profile summary: Daisuke Okanohara is a co-founder and Representative Director of Preferred Networks. His public work spans large-scale machine learning, NLP and deep-learning systems; the company invests in frameworks, computing hardware and industrial applications. Check the official careers pages for roles and internships.'
        },
        link: 'https://www.preferred.jp/en/',
        highlight: false
      },
      project: {
        title: { zh: '深度学习系统与产业落地', en: 'Deep-learning systems and industrial deployment', ja: '深層学習システムと産業実装' },
        summary: {
          zh: '企业实验室，研究深度学习系统、分布式训练、计算硬件，以及制造、交通等产业应用。实习通常要求能独立完成一个小型工程任务，并提交可运行的代码与说明；招聘与实习入口以官网为准，本站不代表任何合作或内推。',
          en: 'An industrial lab working on deep-learning systems, distributed training, computing hardware and applications in manufacturing and transport. Internships usually require delivering a small engineering task with runnable code and documentation. Use the official careers pages; this site implies no partnership or referral.'
        },
        methods: {
          zh: '分布式训练、深度学习系统、计算硬件、产业应用。',
          en: 'Distributed training, deep-learning systems, computing hardware, industrial applications.'
        },
        fit: {
          zh: '适合工程能力强、写过可运行项目、熟悉 Python/C++ 与并行计算的学生；研究与工程岗都看重实际交付。',
          en: 'Best for strong engineers with runnable projects and Python/C++ plus parallel computing experience; both research and engineering roles value real delivery.'
        }
      },
      apply: {
        url: 'https://www.preferred.jp/en/',
        label: { zh: 'PFN 官网', en: 'PFN official site' },
        note: {
          zh: '通过 PFN 官方招聘与实习页面投递；本站不代收简历，也不提供内推。',
          en: 'Apply through PFN’s official careers and internship pages. This site does not collect CVs or offer referrals.'
        }
      },
      source: { url: 'https://www.preferred.jp/en/', label: { zh: 'Preferred Networks', en: 'Preferred Networks' } },
      updated: '2026-10',
      status: 'check'
    },
    {
      id: 'ntu-singapore',
      institution: { zh: '南洋理工大学', en: 'Nanyang Technological University', ja: '南洋理工大学' },
      unit: { zh: '计算与数据科学学院', en: 'College of Computing and Data Science', ja: '計算・データ科学学院' },
      region: 'asia',
      fields: ['ai', 'ml', 'systems', 'cv'],
      levels: ['master', 'phd', 'visiting'],
      types: ['research', 'phd'],
      language: ['en'],
      funding: { zh: '以 NTU 官方博士资助与项目说明为准', en: 'Check NTU official PhD funding and programme terms' },
      mentor: {
        name: { zh: '计算与数据科学学院 导师组', en: 'Faculty group, College of Computing and Data Science', ja: '計算・データ科学学院の教員グループ' },
        initials: 'NTU',
        title: { zh: '学院层面索引，不对应单一导师', en: 'College-level index, not a single supervisor', ja: '学院単位の索引（特定の教員ではありません）' },
        bio: {
          zh: '公开资料摘要：南洋理工大学计算与数据科学学院覆盖人工智能、机器学习、计算机视觉、系统与数据科学等方向，英语为主要工作语言。本条按学院整理，不指认某位教授一定招生；具体导师与名额以官网为准。',
          en: 'Public-profile summary: NTU’s College of Computing and Data Science covers AI, machine learning, computer vision, systems and data science, with English as the working language. This entry indexes the college rather than one supervisor; check the official site for advisers and openings.'
        },
        link: 'https://www.ntu.edu.sg/computing',
        highlight: false
      },
      project: {
        title: { zh: '人工智能与数据科学', en: 'AI and data science', ja: '人工知能とデータ科学' },
        summary: {
          zh: '学院以英语授课，研究方向包括机器学习、视觉、自然语言、系统与数据科学，与新加坡本地产业联系紧密。申请博士通常需要研究计划与推荐信；联系目标导师时，最好附上可复现的项目或论文阅读笔记。',
          en: 'Teaching is in English, with research across machine learning, vision, NLP, systems and data science, closely tied to Singapore industry. PhD applications usually need a research statement and references; when contacting a supervisor, attach a reproducible project or paper notes.'
        },
        methods: {
          zh: '机器学习、计算机视觉、NLP、系统、数据科学。',
          en: 'Machine learning, computer vision, NLP, systems, data science.'
        },
        fit: {
          zh: '适合英语写作与口语过关、有明确研究方向的学生；有论文、竞赛或开源项目会明显加分。',
          en: 'Best for students with solid English and a clear research direction; papers, contests or open-source work help noticeably.'
        }
      },
      apply: {
        url: 'https://www.ntu.edu.sg/computing',
        label: { zh: 'NTU 计算与数据科学学院', en: 'NTU College of Computing and Data Science' },
        note: {
          zh: '通过 NTU 官方博士与访问项目页面申请；本站不代收材料，也不提供内推。',
          en: 'Apply through NTU’s official PhD and visiting programme pages. This site does not collect materials or offer referrals.'
        }
      },
      source: { url: 'https://www.ntu.edu.sg/computing', label: { zh: 'NTU Computing', en: 'NTU Computing' } },
      updated: '2026-10',
      status: 'check'
    }
  ];

  window.LHT_COLLABS = (window.LHT_COLLABS || []).concat(extra);

  /* 日语版可见范围：日本为主；新加坡 / 香港 / 英国 / 美国为重点；
     中国大陆仅保留顶尖院校与科研机构；中国台湾保留两所作辅助。 */
  window.LHT_COLLAB_JA_IDS = [
    'utokyo-matsuo', 'riken-aip', 'kyoto-informatics', 'osaka-ist', 'naist-is', 'nii-aizawa', 'preferred-networks',
    'nus-computing', 'ntu-singapore',
    'cityu-cs', 'polyu-comp', 'hkbu-cs',
    'oxford-aims', 'cambridge-mlg', 'turing-institute',
    'stanford-sail', 'berkeley-bair', 'mit-csail', 'cmu-lti', 'allen-ai2',
    'tsinghua-iiis', 'pku-ai', 'nju-lamda', 'shanghai-ai-lab', 'cas-ict', 'msra',
    'ntu-csie', 'nthu-cs'
  ];
})();
