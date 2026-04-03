import { useState } from "react";

interface FoodEmotionPractice1Props {
  onComplete: () => void;
  onNext: () => void;
  isLastLesson: boolean;
  trainingColor: string;
}

export function FoodEmotionPractice1({ onComplete, onNext, isLastLesson, trainingColor }: FoodEmotionPractice1Props) {
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

  const strategies = [
    {
      id: 1,
      title: "暂停10分钟",
      subtitle: "给冲动一个缓冲期",
      description: "告诉自己：「我可以先等10分钟。」",
      details: "这不是让你忍住不吃，而是给自己一个缓冲。很多时候，情绪性饥饿会在10分钟后自然减弱。如果10分钟后还想吃，那就吃，至少你知道这是一个有意识的选择。",
      practice: [
        "看看时间，设定10分钟计时器",
        "在这10分钟里，可以做任何你想做的事",
        "时间到了，再问自己：我还想吃吗？",
        "如果还想吃，那就去吃，不要有罪恶感"
      ],
      tip: "重点不是「忍住」，而是创造一个觉察的空间。"
    },
    {
      id: 2,
      title: "说出感受",
      subtitle: "命名你的情绪",
      description: "问自己：「我现在在躲避什么感受？」",
      details: "试着把情绪命名出来：「我感到焦虑」、「我很孤独」、「我被伤害了」...有时候，看见和命名情绪本身就能带来缓解。你可以把它写下来，或者对着镜子说出来。",
      practice: [
        "找一个安静的地方，坐下来",
        "把手放在胸口，感受呼吸",
        "问自己：我现在感觉到什么？",
        "用一两个词给这个感觉命名",
        "说出来：「我现在感到___」",
        "不评判，只是看见它"
      ],
      tip: "情绪被命名的那一刻，它的强度就会下降。"
    },
    {
      id: 3,
      title: "换一个动作",
      subtitle: "用其他方式安抚自己",
      description: "试试其他能安抚情绪的方式",
      details: "有很多小动作能打断冲动，给大脑一个转向的机会。关键是找到适合你的方式。",
      practice: [
        "喝一杯温水，慢慢喝",
        "出去走5分钟，感受阳光或风",
        "深呼吸3次：吸4秒，憋4秒，呼8秒",
        "听一首喜欢的歌，专心听",
        "给朋友发条消息，分享你的感受",
        "洗把脸或洗个手，感受水的温度"
      ],
      tip: "选2-3个你最喜欢的动作，记在心里。"
    },
    {
      id: 4,
      title: "带着觉察地吃",
      subtitle: "如果还是想吃，那就吃",
      description: "没关系，允许自己吃",
      details: "只是试着慢一点、有意识地吃。把食物拿出来，坐下来，一口一口地吃，感受每一口的味道。不要边吃边做其他事。这不是「破功」，而是在学习带着觉察地满足自己。",
      practice: [
        "把食物放在盘子里，坐在桌前",
        "关掉手机、电脑，专心吃",
        "看看食物的颜色、形状",
        "闻一闻它的味道",
        "第一口慢慢咀嚼，感受质地和味道",
        "每咀嚼10下，放下手里的食物",
        "吃一半时暂停，问自己：我还想继续吗？"
      ],
      tip: "有意识地吃，比控制不吃更重要。"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]">
        <h2 className="text-xl font-bold text-[#4b3425] mb-4">
          发现是情绪饥饿时，试试这4个方法
        </h2>

        <p className="text-[rgba(31,22,15,0.64)] leading-relaxed mb-6">
          这些不是"控制"的方法，而是给自己更多选择的工具。试着练习，找到最适合你的方式。
        </p>

        <div className="space-y-3 mb-6">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="border-2 border-[rgba(31,22,15,0.12)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedStrategy(
                  expandedStrategy === strategy.id ? null : strategy.id
                )}
                className="w-full p-5 text-left bg-white hover:bg-[#f7f4f2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: trainingColor }}
                  >
                    {strategy.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#4b3425] mb-1">
                      {strategy.title}
                    </h3>
                    <p className="text-sm text-[rgba(31,22,15,0.64)]">
                      {strategy.subtitle}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#4b3425] transition-transform ${
                      expandedStrategy === strategy.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {expandedStrategy === strategy.id && (
                <div className="p-5 pt-0 bg-[#f7f4f2]">
                  <div className="mb-4">
                    <p className="text-sm text-[#4b3425] font-semibold mb-2">
                      {strategy.description}
                    </p>
                    <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
                      {strategy.details}
                    </p>
                  </div>

                  <div 
                    className="rounded-lg p-4 mb-3"
                    style={{ backgroundColor: `${trainingColor}10` }}
                  >
                    <p className="text-sm font-semibold text-[#4b3425] mb-3">
                      练习步骤
                    </p>
                    <div className="space-y-2">
                      {strategy.practice.map((step, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-sm font-semibold text-[#4b3425] min-w-[20px]">
                            {index + 1}.
                          </span>
                          <span className="text-sm text-[#4b3425]">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-[rgba(31,22,15,0.64)]">
                      💡 <span className="font-semibold">记住：</span>{strategy.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div 
          className="rounded-xl p-5 border-2"
          style={{ 
            backgroundColor: `${trainingColor}05`,
            borderColor: trainingColor
          }}
        >
          <p className="text-sm text-[#4b3425] leading-relaxed mb-3">
            <span className="font-semibold">最重要的一点：</span>
          </p>
          <p className="text-sm text-[#4b3425] leading-relaxed">
            这些方法不是每次都要做到，也不是用来"战胜"情绪性进食。它们是<span className="font-semibold">工具箱</span>，你可以根据当下的状态选择使用。有时候你会成功，有时候不会，都没关系。<span className="font-semibold">温柔地对待自己</span>，比完美地控制更重要。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-semibold text-[#4b3425] mb-3">本周挑战</h3>
        <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed mb-4">
          选择其中<span className="font-semibold text-[#4b3425]">1-2个方法</span>，在接下来的一周里，每次想吃东西时都试一试。不要期待完美，只是练习。一周后，看看你的感受有什么变化。
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#f7f4f2] rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-xs text-[#4b3425]">暂停10分钟</div>
          </div>
          <div className="bg-[#f7f4f2] rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💭</div>
            <div className="text-xs text-[#4b3425]">说出感受</div>
          </div>
          <div className="bg-[#f7f4f2] rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🚶</div>
            <div className="text-xs text-[#4b3425]">换个动作</div>
          </div>
          <div className="bg-[#f7f4f2] rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🍽️</div>
            <div className="text-xs text-[#4b3425]">觉察地吃</div>
          </div>
        </div>
      </div>

      <button
        onClick={isLastLesson ? onComplete : onNext}
        className="w-full py-4 rounded-full font-semibold text-lg text-white"
        style={{ backgroundColor: trainingColor }}
      >
        {isLastLesson ? "完成本课" : "下一课"}
      </button>

      {!isLastLesson && (
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-full font-semibold text-lg border-2 text-[#4b3425] bg-white"
          style={{ borderColor: trainingColor }}
        >
          返回课程列表
        </button>
      )}
    </div>
  );
}