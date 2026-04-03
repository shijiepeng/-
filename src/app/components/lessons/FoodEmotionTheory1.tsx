import { useState } from "react";

interface FoodEmotionTheory1Props {
  onComplete: () => void;
  onNext: () => void;
  isLastLesson: boolean;
  trainingColor: string;
}

export function FoodEmotionTheory1({ onComplete, onNext, isLastLesson, trainingColor }: FoodEmotionTheory1Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]">
        <h2 className="text-xl font-bold text-[#4b3425] mb-4">
          认识你的进食触发模式
        </h2>

        <p className="text-[rgba(31,22,15,0.64)] leading-relaxed mb-6">
          通过上一课的测评，你可能已经发现，很多时候我们想吃东西，并不是因为身体真的饿了。
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-[#f7f4f2]">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: trainingColor }}
              />
              <span className="font-semibold text-[#4b3425]">
                触发器1：人际冲突
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
              跟朋友吵架、被批评、感到被误解...这些人际冲突会让我们本能地寻找安慰，而食物是最容易获得的安慰来源。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f4f2]">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: trainingColor }}
              />
              <span className="font-semibold text-[#4b3425]">
                触发器2：焦虑/压力
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
              考试、deadline、不确定的未来...焦虑会让大脑想要通过咀嚼来释放紧张感。这是一种自我安抚的方式。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f4f2]">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: trainingColor }}
              />
              <span className="font-semibold text-[#4b3425]">
                触发器3：注意力逃避
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
              当我们面对困难或无聊的任务时，大脑会寻找各种借口逃避。突然想吃某样东西，可能就是大脑在说"我不想做这件事了"。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f4f2]">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: trainingColor }}
              />
              <span className="font-semibold text-[#4b3425]">
                触发器4：情绪受伤
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
              被伤害、感到委屈、失望...这些痛苦的情绪让我们想要填补内心的空洞。食物能暂时麻痹痛感。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f4f2]">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: trainingColor }}
              />
              <span className="font-semibold text-[#4b3425]">
                触发器5：无聊/低落
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
              什么都不想做的空洞感、轻度的抑郁情绪...食物能带来短暂的刺激和满足感，填补那种"空"的感觉。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f4f2]">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: trainingColor }}
              />
              <span className="font-semibold text-[#4b3425]">
                触发器6：社交情绪
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
              开心、庆祝、归属感...正面情绪也会触发进食。这通常没问题，食物本来就是社交和快乐的一部分。
            </p>
          </div>
        </div>

        <div 
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: `${trainingColor}10` }}
        >
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">重要提醒：</span>
            识别这些触发器不是为了责怪自己，而是为了更好地理解自己。当你能看清楚"我现在是因为什么想吃"，你就有了选择的能力。
          </p>
        </div>

        <div className="bg-[#fff9f0] rounded-xl p-4 border border-[#ffd89b]">
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">💡 下一课预告</span>
            <br />
            我们将学习如何区分"真饿"和"假饿"——两种饥饿的感觉是完全不同的。
          </p>
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