import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { IntroMarquee } from "@/components/IntroMarquee";

const person: Person = {
  firstName: "泓铠",
  lastName: "庄",
  name: "庄泓铠",
  role: "AI硬件产品经理",
  avatar: "/images/avatar.jpg",
  email: "1379804870@qq.com",
  location: "Asia/Shanghai",
  locationLabel: "深圳 · 南山区",
  languages: [],
};

const newsletter: Newsletter = {
  display: false,
  title: <>订阅{person.firstName}的动态</>,
  description: <>获取最新的产品思考与行业洞察</>,
};

const social: Social = [
  {
    name: "小红书",
    icon: "xiaohongshu",
    link: "https://www.xiaohongshu.com/user/profile/62dcbd18000000001f0168ea",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>{person.name}</>,
  featured: {
    display: false,
    title: <></>,
    href: "/about",
  },
  subline: (
    <>
      啥都懂一些的产品经理
      <br />
      日常折腾好玩的 AI 产品 / 消费电子 / 自动驾驶
      <br />
      累计时长 100h+
      <br />
      长期关注互联网与科技的商业模式与投资动态。
      <br />
      不断追问：什么是真正的"好生意"，什么是好产品
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Shenzhen`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "关于我",
    description: (
      <>
        <Text variant="body-default-l" as="div" style={{ marginBottom: "12px" }}>
          ·
          多段消费电子软硬件产品实习经历、一段闭环的创业经历：覆盖多款前沿AI硬件产品，大学期间自主创业创收10万+，体现用户思维与市场分析能力。
        </Text>
        <Text variant="body-default-l" as="div" style={{ marginBottom: "12px" }}>
          ·
          科技产品爱好者：喜欢购买、测评、体验各类消费电子产品、AI产品，多次参加OPPO、vivo、地平线智驾等公司的AI产品用户深度访谈活动（每次三小时起）。
        </Text>
        <Text variant="body-default-l" as="div" style={{ marginBottom: "12px" }}>
          ·
          自媒体博主：运营个人小红书账号"向天再借五百亿"，追踪最新的AI产品趋势，主打AI产品&消费电子产品&新能源汽车测评等。收获粉丝500+，点赞13000+。
        </Text>
        <Text variant="body-default-l" as="div">
          · AI产品重度使用者，能高效运用国内外各类前沿AI产品提高工作效率，如Opencode、Gemini in
          chrome等。
        </Text>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "阶跃星辰 (AI六小龙)",
        timeframe: "2025.12 - 2026.3",
        role: "AI影像产品实习生",
        achievements: [
          <>
            "AI云台生命键"设计：负责AI影像手机的新增按键产品 definition 与设计。通过竞品调研，分析对比大疆Pocket3、OPPO、vivo、苹果等品牌创作键的软件方案、交互范式、硬件形态等；同时基于实际场景和爬取1000+用户反馈，深入分析其优劣势；最终完成按键功能的优先级排序，设计多种可行性方案，并结合产品形态与实际应用场景，提出"AI云台生命键"的理念，输出完整的按键方案。产品方案被采纳。
          </>,
          <>
            全场景配件方案设计：负责产品配件方案设计。通过竞品调研，分析对比大疆、Insta、OPPO、vivo的手持云台、运动相机等产品线70+款产品，分别从功能导向、核心使用场景、需求背景、销量等角度进行深度挖掘；基于产品调研结果，从产品第一性角度明确"不做Always
            on"，爬取分析京东、淘宝等平台500+型号销量数据，提出"不重复造轮子"而是以第三方扩展为主；最终输出涵盖4个类别的全场景配件方案。产品方案被采纳。
          </>,
          <>
            AI OS、AI Agent洞察：负责近年终端厂商AI OS、AI
            Agent调研并向组内同事分享汇报。独立复盘小米、华为、苹果、智谱、谷歌、阶跃星辰、字节跳动等厂商近30场发布会，梳理AI
            OS迭代方向与关键技术进步；基于调研结果，从时间维度分析AI
            OS三阶段演进方向，并按阶段梳理分析12个重点关注功能；从产品维度分别从"工作生产力、个人记忆与知识库管理、多模态交互、系统级Agent"等维度进行深入分析，总结20+典型功能落地方案；得出"AI
            for System→System for AI→AI as
            System"的趋势总结。最终完成组内汇报，提高自己与组内成员对AI OS与AI Agent产品的认知水平。
          </>,
        ],
        images: [
          {
            src: "/images/gallery/horizontal-1.jpg",
            alt: "深智联实习",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "OPPO",
        timeframe: "2025.3 - 2025.7",
        role: "社区产品实习生",
        achievements: [
          <>
            健康社区个人主页迭代：负责社区个人主页布局与功能的重新设计。通过竞品调研，分析Keep、咕咚圈等App的用户页面布局与交互逻辑，独立负责设计并上线运动勋章展示、成绩档案、成就墙等模块，增强用户归属感与内容可信度；打通健康云数据，实现用户过往运动记录与荣誉卡片自动同步，满足了活跃用户的个性化展示需求；绑定手表尾标展示，打通手表商城跳转路径，为后续社区电商转化预埋能力。
          </>,
          <>
            健康社区互动机制优化：负责优化社区评论区回复功能。针对社区推荐页"首评率"、社区官方贴评论质量偏低的现状，独立负责并推动上线「一键评论」功能，能够基于帖子内容，动态为用户提供结构化、引导式表达方式。上线后，该功能使用率稳定保持15%+，社区评论质量分数由68.9提升到70.9（"好""66"等无效短评减少），社区首评率提升5%，并初步探索引进社区AI机器人功能。
          </>,
          <>
            好评引导节点设计：针对iOS端的App
            Store评分显著低于友商产品评分现状，通过在App内发掘多个用户爽点，设计多个好评引导节点（连续登录七天、运动累计里程xxkm、运动课程时长xx小时等），实现好评放大展现、差评内化处理的结果，两个月内推动App
            Store评分由3.1提升到3.8。
          </>,
        ],
        images: [
          {
            src: "/images/gallery/horizontal-2.jpg",
            alt: "OPPO工作",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "玖治科技 (智能戒指企业)",
        timeframe: "2024.8 - 2024.10",
        role: "软件产品实习生",
        achievements: [
          <>
            用户运营与竞品分析：负责运营品牌Reddit、Facebook社群，处理500+海外用户反馈，提炼10+可落地需求；通过竞品调研，评估现有产品相较Oura
            ring和Apple watch等竞品在需求实现上的差异与优势，完成软件产品功能的优先级排序。
          </>,
          <>
            App页面布局和功能设计：对多个产品模块中进行功能优化。基于社群内海外用户调研，新增App内黑夜/白天模式切换功能，提高老年人对于产品的阅读体验。将"身心平衡"页面由雷达图调整为四叶草图，增强数据可视性且更符合积累型运动产品需要；优化"觉知-生命体征"页面展示，以时间为脉络动态呈现生命体征的变化趋势，提升了视觉表达的简洁性与功能的可读性。
          </>,
        ],
        images: [
          {
            src: "/images/gallery/horizontal-3.jpg",
            alt: "商汤实习",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  entrepreneurship: {
    display: true,
    title: "Entrepreneurship",
    experiences: [
      {
        company: "不咕嘟科技有限公司（含前身深圳高校观影团）",
        timeframe: "2023.4 - 2024.11",
        role: "CEO、产品经理",
        achievements: [
          <>
            MVP验证与需求洞察：作为主理人，从0到1打造"深圳高校观影团"，通过高频线下活动（累计4000+人次）建立深圳最大高校影迷社群，基于O2O模式进行运营，年流水超20万，总盈利超5万元。在此基础上，在运营中洞察到学生群体"找搭子"难、信任度低的痛点，作为产品经理和团队负责人，从0到1打造校园找搭子平台"不咕嘟"。平台上线后积累超3000名用户。
          </>,
          <>
            社交安全与智能匹配设计：针对大学生对社会人的不安全感，设计并实现身份认证系统，建立私域屏障；为解决竞品未能有效满足大学生找搭子需求的问题，创新设计了找搭子功能；同时，基于平台用户的个性化信息，设计一对多匹配功能，帮助用户找到志同道合的群体。
          </>,
          <>
            全周期运营体系构建：上线前主导产品冷启动，基于产品调性与校内20+垂直社团建立深度合作，精准获取首批高粘性种子用户；上线后搭建双端运营矩阵：线上深耕微信公众号与微信私域社群，拓宽产品曝光，线下构建"官方主办、社团联动、用户自发、商家合作"四维活动体系，维持用户日常活跃。
          </>,
          <>
            产品商业化闭环：整合社群时期的"票务差价+物料售卖+主题包场服务"B&C端营收模式，通过"高频线下社群活动"引流，与影院/KTV/酒吧/餐饮店等线下商家建立合作；基于线上平台留存与目标用户属性，与新东方、启德教育、泊寓等建立合作，实现项目总盈利超10万元，跑通从社群到平台的商业闭环。
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false,
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false,
    title: "技能掌握",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "产品思考与行业洞察",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `作品集 – ${person.name}`,
  description: `产品设计作品集 by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
