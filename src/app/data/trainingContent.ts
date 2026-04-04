// 训练包内容数据 - 基于PDF文档设计

export const trainingContent = {
  "sleep-training": {
    title: "夜晚好好睡",
    color: "#B5CF80",
    level: "入门",
    dimension: "生物维度",
    duration: "5天计划",
    description: "睡眠是情绪的基础。通过5天渐进式训练，建立健康的睡眠习惯，提升情绪稳定性。",
    lessons: [
      {
        id: 1,
        title: "睡眠与情绪的循环",
        duration: "10分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "睡眠不足会让你的杏仁核（情绪中枢）变得更加敏感，情绪调节能力下降30%以上。同时，情绪问题也会影响睡眠质量，形成恶性循环。"
            },
            {
              type: "keyPoints",
              title: "核心要点",
              points: [
                "睡眠不足→情绪敏感→更难入睡",
                "充足睡眠能提升情绪韧性",
                "规律作息是打破循环的关键"
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "你的睡眠质量如何？",
        duration: "8分钟",
        type: "测评",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "使用简化版匹兹堡睡眠质量指数(PSQI)评估你的睡眠状况"
            }
          ]
        }
      },
      {
        id: 3,
        title: "睡前1小时仪式",
        duration: "15分钟",
        type: "练习",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "建立专属的睡前仪式，让大脑和身体知道：该休息了。"
            },
            {
              type: "checklist",
              title: "睡前1小时清单",
              items: [
                "调暗灯光，营造入睡氛围",
                "停止使用电子屏幕",
                "洗个温水澡（37-39℃）",
                "做5分钟轻柔拉伸",
                "写下今天的3件好事"
              ]
            }
          ]
        }
      },
      {
        id: 4,
        title: "4-7-8呼吸助眠法",
        duration: "12分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "这是一种经过验证的助眠呼吸技巧，能在1-2分钟内让身体进入放松状态。"
            },
            {
              type: "steps",
              title: "练习步骤",
              items: [
                "用鼻子吸气，数4秒",
                "屏住呼吸，数7秒",
                "用嘴呼气，数8秒",
                "重复4-8次"
              ]
            }
          ]
        }
      },
      {
        id: 5,
        title: "建立你的睡眠计划",
        duration: "10分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "根据这5天的学习和练习，制定个性化的睡眠改善计划。"
            }
          ]
        }
      }
    ]
  },
  "body-awareness": {
    title: "听懂身体说的话",
    color: "#B5CF80",
    level: "入门",
    dimension: "生物维度",
    duration: "4天计划",
    description: "身体是情绪的载体。学会觉察身体信号，是理解和调节情绪的第一步。",
    lessons: [
      {
        id: 1,
        title: "情绪住在身体哪里？",
        duration: "12分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "每种情绪都有独特的身体特征：焦虑时胸口发紧，愤怒时身体发热，悲伤时身体沉重..."
            },
            {
              type: "emotionMap",
              title: "情绪的身体地图",
              emotions: [
                { name: "焦虑", areas: ["胸口", "肩膀", "胃部"] },
                { name: "愤怒", areas: ["头部", "胸部", "双臂"] },
                { name: "悲伤", areas: ["胸口", "喉咙", "全身沉重"] },
                { name: "快乐", areas: ["胸部温暖", "全身轻盈"] }
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "3分钟身体扫描",
        duration: "10分钟",
        type: "练习",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "学习快速扫描全身，觉察身体的紧张和放松。"
            }
          ]
        }
      },
      {
        id: 3,
        title: "身体信号日记",
        duration: "15分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "记录情绪发生时，你的身体在哪里有感觉，建立个人的情绪-身��连接地图。"
            }
          ]
        }
      },
      {
        id: 4,
        title: "让身体帮你调节情绪",
        duration: "10分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "总结你的觉察练习，建立身体信号→情绪识别→调节行动的完整链条。"
            }
          ]
        }
      }
    ]
  },
  "food-emotion": {
    title: "读懂你和食物的关系",
    color: "#B5CF80",
    level: "入门",
    dimension: "生物维度",
    duration: "5天计划",
    description: "情绪性进食是用食物来应对情绪的方式。学会区分真假饥饿，建立健康的食物-情绪关系。",
    lessons: [
      {
        id: 1,
        title: "你是情绪性进食者吗？",
        duration: "10分钟",
        type: "测评",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "通过情绪性进食量表，了解你和食物的关系模式。"
            }
          ]
        }
      },
      {
        id: 2,
        title: "真饿还是假饿？",
        duration: "12分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "生理性饥饿 vs 情绪性饥饿：学会区分身体需要和情绪需要。"
            },
            {
              type: "comparison",
              title: "两种饥饿的区别",
              items: [
                { physical: "逐渐产生", emotional: "突然出现" },
                { physical: "任何食物都可以", emotional: "想吃特定食物（通常是高糖高脂）" },
                { physical: "吃饱就停", emotional: "吃到撑还想吃" },
                { physical: "吃完满足", emotional: "吃完内疚" }
              ]
            }
          ]
        }
      },
      {
        id: 3,
        title: "正念吃一颗葡萄干",
        duration: "15分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "经典的正念饮食练习：用全部的注意力，体验吃的过程。"
            }
          ]
        }
      },
      {
        id: 4,
        title: "情绪-饮食追踪",
        duration: "10分钟",
        type: "记录",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "记录一周的饮食和情绪，发现自己的情绪-食物模式。"
            }
          ]
        }
      },
      {
        id: 5,
        title: "建立替代性应对清单",
        duration: "12分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "当情绪来临时，除了吃，你还可以做什么？建立个人的情绪应对清单。"
            }
          ]
        }
      }
    ]
  },
  "cognitive-reframe": {
    title: "换一个角度想想看",
    color: "#CFC3EF",
    level: "进阶",
    dimension: "心理维度",
    duration: "6天计划",
    description: "改变不了事情，可以改变看待事情的方式。学习认知重构，打破消极思维模式。",
    lessons: [
      {
        id: 1,
        title: "情绪ABC模型",
        duration: "15分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "情绪不是由事件(A)直接引起的，而是由你对事件的看法(B)决定的，进而产生情绪结果(C)。"
            },
            {
              type: "example",
              title: "同一件事，不同想法",
              scenario: "朋友没回你消息",
              thoughts: [
                { belief: "Ta不在乎我了", emotion: "伤心、焦虑" },
                { belief: "Ta可能在忙", emotion: "平静、理解" },
                { belief: "我也经常忘记回消息", emotion: "轻松、共情" }
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "10种思维陷阱",
        duration: "12分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "list",
              title: "识别你的思维陷阱",
              items: [
                { name: "全或无", example: "考试没考好=我是失败者" },
                { name: "过度概括", example: "这次被拒绝=永远不会成功" },
                { name: "心理过滤", example: "只记得被批评，忘记被表扬" },
                { name: "读心术", example: "我知道Ta在想什么" },
                { name: "算命先生", example: "我肯定会搞砸" },
                { name: "放大缩小", example: "把错误放大，把成就缩小" },
                { name: "情绪推理", example: "我觉得焦虑=一定有问题" },
                { name: "应该句式", example: "我应该/必须..." },
                { name: "贴标签", example: "我是个失败者" },
                { name: "个人化", example: "都是我的错" }
              ]
            }
          ]
        }
      },
      {
        id: 3,
        title: "思维记录表",
        duration: "15分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "学习使用思维记录表，捕捉自动化思维。"
            }
          ]
        }
      },
      {
        id: 4,
        title: "找证据挑战思维",
        duration: "18分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "像法官一样，用证据检验你的想法是否成立。"
            }
          ]
        }
      },
      {
        id: 5,
        title: "生成替代性想法",
        duration: "15分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "练习为消极想法生成更平衡的替代解释。"
            }
          ]
        }
      },
      {
        id: 6,
        title: "建立你的重构习惯",
        duration: "12分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "将认知重构融入日常生活，形成新的思维习惯。"
            }
          ]
        }
      }
    ]
  },
  "stop-rumination": {
    title: "让大脑停下来",
    color: "#CFC3EF",
    level: "进阶",
    dimension: "心理维度",
    duration: "5天计划",
    description: "反刍思维像唱片卡住了一样，让你陷入消极循环。学会按下暂停键。",
    lessons: [
      {
        id: 1,
        title: "什么是反刍思维？",
        duration: "12分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "反刍思维是指反复、被动地思考消极事件和感受，像反刍动物重复咀嚼食物一样。"
            },
            {
              type: "signs",
              title: "反刍思维的标志",
              items: [
                "不断回放令人难受的场景",
                "反复问'为什么是我'",
                "预演灾难性后果",
                "难以集中注意力做其他事",
                "越想越焦虑或抑郁"
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "反刍自测量表",
        duration: "8分钟",
        type: "测评",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "评估你的反刍思维程度。"
            }
          ]
        }
      },
      {
        id: 3,
        title: "思维中断技术",
        duration: "15分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "当发现自己开始反刍时，用具体的方法打断思维循环。"
            },
            {
              type: "techniques",
              title: "中断方法",
              items: [
                "大声说'停！'",
                "戴上橡皮筋轻弹手腕",
                "起身换个环境",
                "做5次深呼吸",
                "打开音乐或播客"
              ]
            }
          ]
        }
      },
      {
        id: 4,
        title: "5-4-3-2-1接地技术",
        duration: "12分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "用感官觉察把注意力拉回当下，离开反刍的循环。"
            },
            {
              type: "steps",
              items: [
                "说出5样你看到的东西",
                "说出4样你能触摸到的东西",
                "说出3种你听到的声音",
                "说出2种你闻到的气味",
                "说出1种你尝到的味道"
              ]
            }
          ]
        }
      },
      {
        id: 5,
        title: "建立防反刍日常",
        duration: "10分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "预防胜于治疗：建立日常习惯，减少反刍的发生。"
            }
          ]
        }
      }
    ]
  },
  "emotion-regulation": {
    title: "找到适合自己的方式",
    color: "#CFC3EF",
    level: "进阶",
    dimension: "心理维度",
    duration: "7天计划",
    description: "情绪调节没有万能公式。探索多种策略，建立属于你的情绪工具箱。",
    lessons: [
      {
        id: 1,
        title: "情绪调节策略图谱",
        duration: "15分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "认识多种情绪调节策略：从改变情境到改变反应，每个阶段都有对应的方法。"
            },
            {
              type: "strategies",
              title: "五类调节策略",
              items: [
                { name: "情境选择", example: "避开触发情绪的场景" },
                { name: "情境调整", example: "改变环境中的某些因素" },
                { name: "注意力分配", example: "把注意力转移到其他事物" },
                { name: "认知改变", example: "换个角度看问题" },
                { name: "反应调节", example: "深呼吸、运动等" }
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "你的调节风格测评",
        duration: "10分钟",
        type: "测评",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "了解你更倾向使用哪些调节策略。"
            }
          ]
        }
      },
      {
        id: 3,
        title: "盒式呼吸法",
        duration: "10分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "海豹突击队使用的快速降压技巧：吸4-停4-呼4-停4。"
            }
          ]
        }
      },
      {
        id: 4,
        title: "渐进式肌肉放松",
        duration: "18分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "通过紧张-放松肌肉，释放身体中积累的压力和焦虑。"
            }
          ]
        }
      },
      {
        id: 5,
        title: "情绪命名与外化",
        duration: "12分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "给情绪命名，把情绪当成一个可以对话的对象，而不是'我就是这个情绪'。"
            }
          ]
        }
      },
      {
        id: 6,
        title: "建立情绪急救包",
        duration: "15分钟",
        type: "工具",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "为不同类型的情绪准备专属应对工具。"
            }
          ]
        }
      },
      {
        id: 7,
        title: "完成个人工具箱",
        duration: "15分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "整合所有学到的策略，建立个性化的情绪调节系统。"
            }
          ]
        }
      }
    ]
  },
  "know-needs": {
    title: "知道自己需要什么",
    color: "#FFC0C0",
    level: "进阶",
    dimension: "社会维度",
    duration: "5天计划",
    description: "在人际关系中，先要懂自己的需求和边界，才能建立健康的关系。",
    lessons: [
      {
        id: 1,
        title: "人际需求清单",
        duration: "15分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "每个人在关系中都有不同的需求：归属感、自主性、认可、支持..."
            },
            {
              type: "needs",
              title: "常见的人际需求",
              items: [
                "归属感：被接纳、有地方可以做自己",
                "自主性：有自己的空间和选择",
                "认可：被看见、被肯定",
                "支持：困难时有人陪伴",
                "亲密：深度连接和理解"
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "你的依恋风格",
        duration: "12分钟",
        type: "测评",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "依恋风格测评：了解你在关系中的模式。"
            }
          ]
        }
      },
      {
        id: 3,
        title: "画出你的人际边界",
        duration: "18分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "什么是你可以接受的？什么让你感觉不舒服？明确自己的边界。"
            }
          ]
        }
      },
      {
        id: 4,
        title: "非暴力沟通：表达需求",
        duration: "15分钟",
        type: "技巧",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "学习用'我'句式表达需求，而不是指责对方。"
            },
            {
              type: "formula",
              title: "非暴力沟通四要素",
              steps: [
                "观察：陈述客观事实",
                "感受：表达你的情绪",
                "需要：说出背后的需求",
                "请求：提出具体的请求"
              ]
            }
          ]
        }
      },
      {
        id: 5,
        title: "建立支持网络地图",
        duration: "12分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "梳理你的人际支持系统，明确不同关系中可以满足的需求。"
            }
          ]
        }
      }
    ]
  },
  "relationship-care": {
    title: "在关系中照顾好自己",
    color: "#FFC0C0",
    level: "进阶",
    dimension: "社会维度",
    duration: "6天计划",
    description: "学会在维持关系的同时，也照顾好自己的情绪需求，避免关系内耗。",
    lessons: [
      {
        id: 1,
        title: "识别情绪传染",
        duration: "15分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "情绪会在人与人之间传递。理解情绪传染的机制，避免被他人情绪淹没。"
            },
            {
              type: "concept",
              title: "镜像神经元",
              content: "我们的大脑会自动模仿他人的情绪状态，这是共情的生理基础，但也可能让我们承担不属于自己的情绪。"
            }
          ]
        }
      },
      {
        id: 2,
        title: "共情 vs 过度共情",
        duration: "12分钟",
        type: "理论",
        completed: false,
        content: {
          sections: [
            {
              type: "text",
              content: "共情是理解他人，过度共情是把他人的情绪当成自己的。"
            },
            {
              type: "comparison",
              title: "两者的区别",
              items: [
                { empathy: "我理解你的感受", overEmpathy: "我感觉像是发生在我身上" },
                { empathy: "我能帮你什么？", overEmpathy: "我必须解决你的问题" },
                { empathy: "陪伴但保持界限", overEmpathy: "完全卷入对方的情绪" }
              ]
            }
          ]
        }
      },
      {
        id: 3,
        title: "情绪界限练习",
        duration: "18分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "练习区分：这是Ta的情绪，还是我的情绪？"
            }
          ]
        }
      },
      {
        id: 4,
        title: "关系冲突中的自我照顾",
        duration: "15分钟",
        type: "练习",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "冲突时如何既表达自己，又不伤害关系。"
            }
          ]
        }
      },
      {
        id: 5,
        title: "说'不'的艺术",
        duration: "15分钟",
        type: "技巧",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "拒绝不是冷漠，而是保护自己的能量去做真正重要的事。"
            },
            {
              type: "examples",
              title: "温和拒绝的方式",
              items: [
                "'我现在没有精力，但我很在乎你'",
                "'这次不行，我们可以...'（提供替代方案）",
                "'我需要先照顾好自己，才能更好地支持你'"
              ]
            }
          ]
        }
      },
      {
        id: 6,
        title: "制定关系自我照顾计划",
        duration: "12分钟",
        type: "总结",
        completed: false,
        locked: true,
        content: {
          sections: [
            {
              type: "text",
              content: "总结你的学习，建立在关系中保护自己的个性化策略。"
            }
          ]
        }
      }
    ]
  }
};
