import { useState } from "react";
import { Lightbulb } from "lucide-react";

interface FoodEmotionRecord1Props {
  onComplete: () => void;
  onNext: () => void;
  isLastLesson: boolean;
  trainingColor: string;
}

export function FoodEmotionRecord1({ onComplete, onNext, isLastLesson, trainingColor }: FoodEmotionRecord1Props) {
  const [physicalHunger, setPhysicalHunger] = useState<string[]>([]);
  const [emotionalHunger, setEmotionalHunger] = useState<string[]>([]);

  const physicalSigns = [
    "胃里有点空，有轻微的饿感",
    "上次吃东西已经好几个小时了",
    "吃什么都可以，不特别挑",
    "感觉有点没力气或注意力不集中"
  ];

  const emotionalSigns = [
    "刚刚发生了让我烦恼或难受的事",
    "感到无聊、空洞，不知道干什么",
    "只想吃某样东西，换别的不行",
    "这种想吃的感觉很急，等不了",
    "压力大、焦虑或者情绪低落"
  ];

  const togglePhysical = (sign: string) => {
    setPhysicalHunger(prev => 
      prev.includes(sign) 
        ? prev.filter(s => s !== sign)
        : [...prev, sign]
    );
  };

  const toggleEmotional = (sign: string) => {
    setEmotionalHunger(prev => 
      prev.includes(sign) 
        ? prev.filter(s => s !== sign)
        : [...prev, sign]
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]">
        <h2 className="text-xl font-bold text-[#4b3425] mb-4">
          下次"想吃"的时候，勾选你感受到的
        </h2>

        <p className="text-[rgba(31,22,15,0.64)] leading-relaxed mb-6">
          这是一个觉察记录工具。当你想吃东西时，暂停一下，勾选你此刻的感受。不需要判断对错，只是如实记录。
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-[#e8f5e9] rounded-xl p-5">
            <h3 className="font-semibold text-[#2e7d32] mb-4">
              如果是这些感觉 — 可能是真的饿了
            </h3>
            <div className="space-y-3">
              {physicalSigns.map((sign) => (
                <label
                  key={sign}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={physicalHunger.includes(sign)}
                      onChange={() => togglePhysical(sign)}
                      className="w-5 h-5 rounded border-2 border-[#2e7d32] appearance-none checked:bg-[#2e7d32] cursor-pointer transition-all"
                    />
                    {physicalHunger.includes(sign) && (
                      <svg
                        className="w-3 h-3 absolute pointer-events-none text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-[#2e7d32] leading-relaxed flex-1">
                    {sign}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#fff3e0] rounded-xl p-5">
            <h3 className="font-semibold text-[#e65100] mb-4">
              如果是这些感觉 — 可能是情绪在说话
            </h3>
            <div className="space-y-3">
              {emotionalSigns.map((sign) => (
                <label
                  key={sign}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={emotionalHunger.includes(sign)}
                      onChange={() => toggleEmotional(sign)}
                      className="w-5 h-5 rounded border-2 border-[#e65100] appearance-none checked:bg-[#e65100] cursor-pointer transition-all"
                    />
                    {emotionalHunger.includes(sign) && (
                      <svg
                        className="w-3 h-3 absolute pointer-events-none text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-[#e65100] leading-relaxed flex-1">
                    {sign}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div 
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: `${trainingColor}10` }}
        >
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">使用建议：</span>
            把这个页面收藏或截图保存。下次想吃东西时，花30秒做这个觉察练习。不需要每次都完美判断，重要的是养成<span className="font-semibold">暂停和觉察</span>的习惯。
          </p>
        </div>

        {(physicalHunger.length > 0 || emotionalHunger.length > 0) && (
          <div className="bg-[#f7f4f2] rounded-xl p-5">
            <h3 className="font-semibold text-[#4b3425] mb-3">你的觉察记录</h3>
            
            {physicalHunger.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-[#2e7d32] font-semibold mb-2">
                  真实饥饿信号 ({physicalHunger.length}个)
                </p>
                <p className="text-xs text-[rgba(31,22,15,0.64)]">
                  你的身体在告诉你需要能量了，可以放心地进食。
                </p>
              </div>
            )}

            {emotionalHunger.length > 0 && (
              <div>
                <p className="text-sm text-[#e65100] font-semibold mb-2">
                  情绪性饥饿信号 ({emotionalHunger.length}个)
                </p>
                <p className="text-xs text-[rgba(31,22,15,0.64)]">
                  你的情绪可能需要被看见和照顾。下一课会教你如何应对。
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-[#fff9f0] rounded-xl p-4 border border-[#ffd89b] mt-4">
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold flex items-center gap-1"><Lightbulb className="w-4 h-4" /> 下一课预告</span>
            <br />
            如果发现是情绪饥饿，有哪些温和有效的应对方法？我们一起来练习。
          </p>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-4 rounded-full font-semibold text-lg text-white"
        style={{ backgroundColor: trainingColor }}
      >
        {isLastLesson ? "返回列表" : "完成并继续"}
      </button>
    </div>
  );
}