// 完整训练包数据 - 基于PDF第七组-3文档设计
// 三大维度 × 11个训练包，每包分入门/进阶/强化三级

export const trainingPackages = {
  // ==================== 生物维度 ====================
  "sleep-training": {
    id: "sleep-training",
    title: "夜晚好好睡",
    subtitle: "睡眠节律训练",
    dimension: "生物维度",
    color: "#9bb068",
    icon: "Moon",
    description: "睡眠是情绪的基础。通过渐进式训练，建立健康的睡眠习惯，提升情绪稳定性。",
    theoreticalBasis: "PSQI · Wirz-Justice昼夜节律研究",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "睡眠日记 + 情绪关联记录，识别睡眠质量与次日情绪的对应规律",
        lessons: [
          { id: 1, title: "睡眠与情绪的循环", type: "理论" },
          { id: 2, title: "你的睡眠质量如何？", type: "测评" },
          { id: 3, title: "睡前1小时仪式", type: "练习" },
          { id: 4, title: "睡眠日记实践", type: "记录" },
          { id: 5, title: "总结：我的睡眠模式", type: "总结" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "6天",
        description: "睡前情绪缓冲练习（写出明日待办 + 今日情绪清空）；刺激控制训练",
        lessons: [
          { id: 1, title: "情绪如何影响睡眠", type: "理论" },
          { id: 2, title: "睡前情绪清空练习", type: "练习" },
          { id: 3, title: "刺激控制法", type: "技巧" },
          { id: 4, title: "床=睡觉的地方", type: "练习" },
          { id: 5, title: "建立条件反射", type: "练习" },
          { id: 6, title: "稳定你的睡眠节律", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "7天",
        description: "昼夜节律重建计划；跨周情绪-睡眠趋势分析报告",
        lessons: [
          { id: 1, title: "昼夜节律的科学", type: "理论" },
          { id: 2, title: "光照与生物钟", type: "理论" },
          { id: 3, title: "个性化节律调整", type: "练习" },
          { id: 4, title: "跨周趋势分析", type: "分析" },
          { id: 5, title: "应对倒时差和轮班", type: "技巧" },
          { id: 6, title: "睡眠质量提升计划", type: "规划" },
          { id: 7, title: "长期维护策略", type: "总结" }
        ]
      }
    }
  },

  "body-awareness": {
    id: "body-awareness",
    title: "听懂身体说的话",
    subtitle: "身体感知训练",
    dimension: "生物维度",
    color: "#9bb068",
    icon: "Activity",
    description: "身体是情绪的载体。学会觉察身体信号，是理解和调节情绪的第一步。",
    theoreticalBasis: "内感受研究（Craig & Garfinkel）· 情绪粒度理论（Barrett）",
    levels: {
      beginner: {
        title: "入门级",
        duration: "4天",
        description: "身体部位情绪定位练习（「你的焦虑在哪里？胸口？肩膀？」）",
        lessons: [
          { id: 1, title: "情绪住在身体哪里？", type: "理论" },
          { id: 2, title: "3分钟身体扫描", type: "练习" },
          { id: 3, title: "情绪的身体地图", type: "练习" },
          { id: 4, title: "建立身体-情绪连接", type: "总结" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "5天",
        description: "身体扫描 + 情绪命名联动练习；躯体化信号识别清单",
        lessons: [
          { id: 1, title: "完整身体扫描练习", type: "练习" },
          { id: 2, title: "身体信号日记", type: "记录" },
          { id: 3, title: "识别躯体化症状", type: "理论" },
          { id: 4, title: "情绪-身体联动训练", type: "练习" },
          { id: 5, title: "建立个人身体词典", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "6天",
        description: "建立个人躯体化情绪词典；身体信号作为情绪预警系统的训练",
        lessons: [
          { id: 1, title: "身体作为预警系统", type: "理论" },
          { id: 2, title: "微小信号觉察训练", type: "练习" },
          { id: 3, title: "压力的身体表现", type: "理论" },
          { id: 4, title: "建立预警机制", type: "练习" },
          { id: 5, title: "身体调节技巧", type: "技巧" },
          { id: 6, title: "完善个人词典", type: "总结" }
        ]
      }
    }
  },

  "food-emotion": {
    id: "food-emotion",
    title: "读懂你和食物的关系",
    subtitle: "饮食-情绪联结训练",
    dimension: "生物维度",
    color: "#9bb068",
    icon: "Utensils",
    description: "情绪性进食是用食物来应对情绪的方式。学会区分真假饥饿，建立健康的食物-情绪关系。",
    theoreticalBasis: "情绪性进食研究（van Strien · DEBQ量表）",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "情绪性进食识别测试；饥饿感 vs 情绪性饥饿的区分练习",
        lessons: [
          { id: 1, title: "你是情绪性进食者吗？", type: "测评" },
          { id: 2, title: "真饿还是假饿？", type: "理论" },
          { id: 3, title: "情绪饥饿的特征", type: "理论" },
          { id: 4, title: "饥饿感觉察练习", type: "记录" },
          { id: 5, title: "应对情绪饥饿", type: "练习" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "6天",
        description: "饮食日记与情绪记录关联分析；触发情绪性进食的情境识别",
        lessons: [
          { id: 1, title: "正念吃一颗葡萄干", type: "练习" },
          { id: 2, title: "情绪-饮食追踪", type: "记录" },
          { id: 3, title: "发现你的触发情境", type: "分析" },
          { id: 4, title: "情绪性进食的功能", type: "理论" },
          { id: 5, title: "正念饮食训练", type: "练习" },
          { id: 6, title: "总结你的模式", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "7天",
        description: "替代性应对策略建立（情绪性进食冲动来临时的行动菜单）",
        lessons: [
          { id: 1, title: "情绪应对工具箱", type: "理论" },
          { id: 2, title: "建立替代行为清单", type: "练习" },
          { id: 3, title: "5分钟延迟技术", type: "技巧" },
          { id: 4, title: "冲动来临时的应对", type: "练习" },
          { id: 5, title: "处理滑倒时刻", type: "技巧" },
          { id: 6, title: "自我关怀练习", type: "练习" },
          { id: 7, title: "制定长期计划", type: "总结" }
        ]
      }
    }
  },

  "exercise-emotion": {
    id: "exercise-emotion",
    title: "动一动，心也跟着松了",
    subtitle: "运动-情绪联结训练",
    dimension: "生物维度",
    color: "#9bb068",
    icon: "Dumbbell",
    description: "运动不仅改善身体，更能直接调节情绪。找到适合你的运动方式。",
    theoreticalBasis: "运动心理学（Biddle）",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "运动前后情绪值记录；发现哪种运动对自己情绪影响最大",
        lessons: [
          { id: 1, title: "运动如何改善情绪", type: "理论" },
          { id: 2, title: "找到你的运动类型", type: "测评" },
          { id: 3, title: "运动前后对比记录", type: "记录" },
          { id: 4, title: "轻量运动体验", type: "练习" },
          { id: 5, title: "分析你的运动效果", type: "分析" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "6天",
        description: "制定情绪导向的运动触发规则（「焦虑超过7分时，走路20分钟」）",
        lessons: [
          { id: 1, title: "情绪-运动匹配", type: "理论" },
          { id: 2, title: "建立触发规则", type: "练习" },
          { id: 3, title: "不同强度的选择", type: "理论" },
          { id: 4, title: "运动习惯养成", type: "技巧" },
          { id: 5, title: "克服运动阻力", type: "技巧" },
          { id: 6, title: "个性化运动计划", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "7天",
        description: "建立个人运动-情绪响应档案；跨月趋势分析",
        lessons: [
          { id: 1, title: "长期运动效果追踪", type: "理论" },
          { id: 2, title: "建立响应档案", type: "分析" },
          { id: 3, title: "跨月趋势解读", type: "分析" },
          { id: 4, title: "调整运动策略", type: "练习" },
          { id: 5, title: "处理运动倦怠", type: "技巧" },
          { id: 6, title: "社交性运动", type: "练习" },
          { id: 7, title: "可持续运动系统", type: "总结" }
        ]
      }
    }
  },

  // ==================== 心理维度 ====================
  "cognitive-reframe": {
    id: "cognitive-reframe",
    title: "换一个角度想想看",
    subtitle: "认知重构训练",
    dimension: "心理维度",
    color: "#926247",
    icon: "Brain",
    description: "改变不了事情，可以改变看待事情的方式。学习认知重构，打破消极思维模式。",
    theoreticalBasis: "CBT（Beck）· 苏格拉底式提问",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "认知扭曲类型识别测试（灾难化/非黑即白/过度概括等10种）",
        lessons: [
          { id: 1, title: "情绪ABC模型", type: "理论" },
          { id: 2, title: "10种思维陷阱", type: "理论" },
          { id: 3, title: "识别你的思维陷阱", type: "测评" },
          { id: 4, title: "思维记录练习", type: "练习" },
          { id: 5, title: "捕捉自动化思维", type: "总结" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "6天",
        description: "思维记录表练习（情境→自动化思维→情绪→替代思维）",
        lessons: [
          { id: 1, title: "思维记录表详解", type: "理论" },
          { id: 2, title: "找证据挑战思维", type: "练习" },
          { id: 3, title: "生成替代性想法", type: "练习" },
          { id: 4, title: "平衡思维训练", type: "练习" },
          { id: 5, title: "苏格拉底式提问", type: "技巧" },
          { id: 6, title: "建立重构习惯", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "7天",
        description: "核心信念识别与重构；建立个人认知扭曲预警清单",
        lessons: [
          { id: 1, title: "什么是核心信念", type: "理论" },
          { id: 2, title: "探索你的核心信念", type: "练习" },
          { id: 3, title: "向下箭头技术", type: "技巧" },
          { id: 4, title: "挑战核心信念", type: "练习" },
          { id: 5, title: "建立新的信念", type: "练习" },
          { id: 6, title: "预警系统建立", type: "工具" },
          { id: 7, title: "认知重构系统", type: "总结" }
        ]
      }
    }
  },

  "emotion-regulation": {
    id: "emotion-regulation",
    title: "找到适合自己的方式",
    subtitle: "情绪调节策略训练",
    dimension: "心理维度",
    color: "#926247",
    icon: "Heart",
    description: "情绪调节没有万能公式。探索多种策略，建立属于你的情绪工具箱。",
    theoreticalBasis: "Gross过程模型 · ERQ · DERS",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "个人惯用调节策略识别（认知重评 vs 表达抑制 vs 回避）",
        lessons: [
          { id: 1, title: "情绪调节策略图谱", type: "理论" },
          { id: 2, title: "你的调节风格测评", type: "测评" },
          { id: 3, title: "认识各种策略", type: "理论" },
          { id: 4, title: "盒式呼吸法", type: "练习" },
          { id: 5, title: "基础调节工具", type: "总结" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "7天",
        description: "适应性策略扩充练习；情绪调节灵活性训练（根据情境选择策略）",
        lessons: [
          { id: 1, title: "渐进式肌肉放松", type: "练习" },
          { id: 2, title: "情绪命名与外化", type: "练习" },
          { id: 3, title: "情境匹配原则", type: "理论" },
          { id: 4, title: "策略灵活性训练", type: "练习" },
          { id: 5, title: "情绪急救包", type: "工具" },
          { id: 6, title: "高压情境应对", type: "练习" },
          { id: 7, title: "个性化工具箱", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "8天",
        description: "建立个人情绪调节策略库；高压情境下的策略切换练习",
        lessons: [
          { id: 1, title: "策略库系统建立", type: "理论" },
          { id: 2, title: "快速策略选择训练", type: "练习" },
          { id: 3, title: "复杂情境应对", type: "练习" },
          { id: 4, title: "策略组合使用", type: "练习" },
          { id: 5, title: "失效时的备案", type: "技巧" },
          { id: 6, title: "长期效果追踪", type: "分析" },
          { id: 7, title: "策略优化调整", type: "练习" },
          { id: 8, title: "完善调节系统", type: "总结" }
        ]
      }
    }
  },

  "stop-rumination": {
    id: "stop-rumination",
    title: "放下脑子里的那个声音",
    subtitle: "反刍思维干预训练",
    dimension: "心理维度",
    color: "#926247",
    icon: "Brain",
    description: "反刍思维像唱片卡住了一样，让你陷入消极循环。学会按下暂停键。",
    theoreticalBasis: "Nolen-Hoeksema · 反应风格理论 · RRS量表",
    levels: {
      beginner: {
        title: "入门级",
        duration: "4天",
        description: "反刍思维识别测试；反刍（绕圈）vs 反思（前进）的区分",
        lessons: [
          { id: 1, title: "什么是反刍思维？", type: "理论" },
          { id: 2, title: "反刍自测量表", type: "测评" },
          { id: 3, title: "反刍 vs 反思", type: "理论" },
          { id: 4, title: "识别你的反刍模式", type: "练习" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "5天",
        description: "注意力转移练习；行为激活打破反刍循环",
        lessons: [
          { id: 1, title: "思维中断技术", type: "练习" },
          { id: 2, title: "5-4-3-2-1接地技术", type: "练习" },
          { id: 3, title: "注意力转移法", type: "练习" },
          { id: 4, title: "行为激活训练", type: "练习" },
          { id: 5, title: "建立防反刍习惯", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "6天",
        description: "建立个人反刍触发情境清单；预防性应对计划",
        lessons: [
          { id: 1, title: "设定'担心时间'", type: "技巧" },
          { id: 2, title: "正念观察练习", type: "练习" },
          { id: 3, title: "识别触发情境", type: "分析" },
          { id: 4, title: "预防性应对计划", type: "规划" },
          { id: 5, title: "长期防反刍策略", type: "练习" },
          { id: 6, title: "完善预警系统", type: "总结" }
        ]
      }
    }
  },

  "resilience-training": {
    id: "resilience-training",
    title: "下次会更从容",
    subtitle: "心理弹性训练",
    dimension: "心理维度",
    color: "#926247",
    icon: "Shield",
    description: "提升心理韧性，让你在压力面前更有掌控感。",
    theoreticalBasis: "Bonanno韧性研究 · Lazarus压力-应对模型",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "压力评价方式测试；应对资源盘点（我有哪些内外部资源）",
        lessons: [
          { id: 1, title: "什么是心理弹性", type: "理论" },
          { id: 2, title: "压力评价方式测试", type: "测评" },
          { id: 3, title: "盘点你的资源", type: "练习" },
          { id: 4, title: "小挫折应对练习", type: "练习" },
          { id: 5, title: "建立资源清单", type: "总结" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "6天",
        description: "次级评价能力训练（「我能处理这件事吗？」的系统性评估）",
        lessons: [
          { id: 1, title: "初级vs次级评价", type: "理论" },
          { id: 2, title: "次级评价训练", type: "练习" },
          { id: 3, title: "应对效能提升", type: "练习" },
          { id: 4, title: "从挫折中学习", type: "练习" },
          { id: 5, title: "弹性思维模式", type: "理论" },
          { id: 6, title: "增强掌控感", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "7天",
        description: "建立个人应对资源库；压力预防性规划",
        lessons: [
          { id: 1, title: "完善应对资源库", type: "工具" },
          { id: 2, title: "压力预见与规划", type: "规划" },
          { id: 3, title: "高压情境模拟", type: "练习" },
          { id: 4, title: "恢复力训练", type: "练习" },
          { id: 5, title: "意义感建立", type: "练习" },
          { id: 6, title: "长期韧性培养", type: "规划" },
          { id: 7, title: "弹性生活系统", type: "总结" }
        ]
      }
    }
  },

  // ==================== 社会维度 ====================
  "know-needs": {
    id: "know-needs",
    title: "知道自己需要什么",
    subtitle: "人际边界训练",
    dimension: "社会维度",
    color: "#fe814b",
    icon: "Users",
    description: "在人际关系中，先要懂自己的需求和边界，才能建立健康的关系。",
    theoreticalBasis: "DBT人际效能（Linehan）",
    levels: {
      beginner: {
        title: "入门级",
        duration: "4天",
        description: "边界感评估测试；识别自己在哪类关系中边界最模糊",
        lessons: [
          { id: 1, title: "人际需求清单", type: "理论" },
          { id: 2, title: "你的依恋风格", type: "测评" },
          { id: 3, title: "边界感评估", type: "测评" },
          { id: 4, title: "识别边界模糊区", type: "分析" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "5天",
        description: "拒绝练习（情境模拟）；表达需求的语言训练；关系内耗识别清单",
        lessons: [
          { id: 1, title: "画出你的人际边界", type: "练习" },
          { id: 2, title: "非暴力沟通：表达需求", type: "技巧" },
          { id: 3, title: "拒绝的艺术", type: "练习" },
          { id: 4, title: "识别关系内耗", type: "分析" },
          { id: 5, title: "建立支持网络地图", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "6天",
        description: "建立个人边界规则系统；跨关系类型的边界一致性训练",
        lessons: [
          { id: 1, title: "边界规则系统", type: "工具" },
          { id: 2, title: "不同关系的边界", type: "理论" },
          { id: 3, title: "边界一致性训练", type: "练习" },
          { id: 4, title: "应对冲突情境", type: "练习" },
          { id: 5, title: "边界维护策略", type: "技巧" },
          { id: 6, title: "健康关系系统", type: "总结" }
        ]
      }
    }
  },

  "find-support": {
    id: "find-support",
    title: "找到可以依靠的人",
    subtitle: "社会支持激活训练",
    dimension: "社会维度",
    color: "#fe814b",
    icon: "Users",
    description: "建立和激活你的社会支持系统，让你不再孤单。",
    theoreticalBasis: "Cohen & Wills · 社会支持缓冲效应",
    levels: {
      beginner: {
        title: "入门级",
        duration: "4天",
        description: "个人支持系统地图绘制（谁能帮我？各擅长什么？）",
        lessons: [
          { id: 1, title: "社会支持的类型", type: "理论" },
          { id: 2, title: "社会支持评定", type: "测评" },
          { id: 3, title: "绘制支持系统地图", type: "练习" },
          { id: 4, title: "分析你的支持网络", type: "分析" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "5天",
        description: "主动寻求支持的障碍识别；求助行为练习（从低风险到高风险情境）",
        lessons: [
          { id: 1, title: "求助的障碍", type: "理论" },
          { id: 2, title: "克服求助羞耻", type: "练习" },
          { id: 3, title: "低风险求助练习", type: "练习" },
          { id: 4, title: "高风险求助练习", type: "练习" },
          { id: 5, title: "维护支持关系", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "6天",
        description: "支持网络主动维护计划；识别并减少支持消耗型关系",
        lessons: [
          { id: 1, title: "主动维护计划", type: "规划" },
          { id: 2, title: "识别消耗型关系", type: "分析" },
          { id: 3, title: "关系质量提升", type: "练习" },
          { id: 4, title: "扩展支持网络", type: "练习" },
          { id: 5, title: "互惠性支持", type: "理论" },
          { id: 6, title: "可持续支持系统", type: "总结" }
        ]
      }
    }
  },

  "relationship-care": {
    id: "relationship-care",
    title: "在关系里更自在",
    subtitle: "关系情绪训练",
    dimension: "社会维度",
    color: "#fe814b",
    icon: "Heart",
    description: "学会在维持关系的同时，也照顾好自己的情绪需求，避免关系内耗。",
    theoreticalBasis: "依恋理论（Bowlby）· 非暴力沟通（Rosenberg）",
    levels: {
      beginner: {
        title: "入门级",
        duration: "5天",
        description: "依恋风格识别（安全/焦虑/回避/混乱）；了解自己在亲密关系中的情绪模式",
        lessons: [
          { id: 1, title: "依恋风格测评", type: "测评" },
          { id: 2, title: "你的关系模式", type: "理论" },
          { id: 3, title: "识别情绪传染", type: "理论" },
          { id: 4, title: "关系中的情绪日记", type: "记录" },
          { id: 5, title: "理解你的模式", type: "总结" }
        ]
      },
      advanced: {
        title: "进阶级",
        duration: "6天",
        description: "非暴力沟通四要素练习（观察/感受/需要/请求）；冲突情境情绪调节",
        lessons: [
          { id: 1, title: "共情 vs 过度共情", type: "理论" },
          { id: 2, title: "情绪界限练习", type: "练习" },
          { id: 3, title: "非暴力沟通实践", type: "练习" },
          { id: 4, title: "冲突中的自我照顾", type: "练习" },
          { id: 5, title: "说'不'的艺术", type: "技巧" },
          { id: 6, title: "平衡关系与自我", type: "总结" }
        ]
      },
      intensive: {
        title: "强化级",
        duration: "7天",
        description: "依恋模式对情绪的长期影响分析；建立更安全的关系互动模式",
        lessons: [
          { id: 1, title: "依恋创伤的影响", type: "理论" },
          { id: 2, title: "修复性关系体验", type: "练习" },
          { id: 3, title: "建立安全感", type: "练习" },
          { id: 4, title: "关系修复技巧", type: "技巧" },
          { id: 5, title: "长期关系维护", type: "规划" },
          { id: 6, title: "依恋风格调整", type: "练习" },
          { id: 7, title: "健康关系模式", type: "总结" }
        ]
      }
    }
  }
};

// 训练包列表（用于展示）
export const trainingList = [
  // 生物维度
  {
    id: "sleep-training",
    title: "夜晚好好睡",
    dimension: "生物维度",
    color: "#9bb068",
    description: "改善睡眠质量，打好情绪基础"
  },
  {
    id: "body-awareness",
    title: "听懂身体说的话",
    dimension: "生物维度",
    color: "#9bb068",
    description: "觉察身体信号，理解情绪反应"
  },
  {
    id: "food-emotion",
    title: "读懂你和食物的关系",
    dimension: "生物维度",
    color: "#9bb068",
    description: "调节饮食与情绪的联结"
  },
  {
    id: "exercise-emotion",
    title: "动一动，心也跟着松了",
    dimension: "生物维度",
    color: "#9bb068",
    description: "通过运动改善情绪状态"
  },
  // 心理维度
  {
    id: "cognitive-reframe",
    title: "换一个角度想想看",
    dimension: "心理维度",
    color: "#926247",
    description: "认知重构，改变思维模式"
  },
  {
    id: "emotion-regulation",
    title: "找到适合自己的方式",
    dimension: "心理维度",
    color: "#926247",
    description: "情绪调节策略选择训练"
  },
  {
    id: "stop-rumination",
    title: "放下脑子里的那个声音",
    dimension: "心理维度",
    color: "#926247",
    description: "反刍思维干预训练"
  },
  {
    id: "resilience-training",
    title: "下次会更从容",
    dimension: "心理维度",
    color: "#926247",
    description: "心理弹性与韧性训练"
  },
  // 社会维度
  {
    id: "know-needs",
    title: "知道自己需要什么",
    dimension: "社会维度",
    color: "#fe814b",
    description: "识别人际需求与边界"
  },
  {
    id: "find-support",
    title: "找到可以依靠的人",
    dimension: "社会维度",
    color: "#fe814b",
    description: "激活社会支持系统"
  },
  {
    id: "relationship-care",
    title: "在关系里更自在",
    dimension: "社会维度",
    color: "#fe814b",
    description: "人际关系情绪管理"
  }
];
