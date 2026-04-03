interface FoodEmotionTheory2Props {
  onComplete: () => void;
  onNext: () => void;
  isLastLesson: boolean;
  trainingColor: string;
}

export function FoodEmotionTheory2({ onComplete, onNext, isLastLesson, trainingColor }: FoodEmotionTheory2Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]">
        <h2 className="text-xl font-bold text-[#4b3425] mb-4 text-center">
          两种"想吃"，感觉不一样
        </h2>

        <p className="text-[rgba(31,22,15,0.64)] leading-relaxed mb-6 text-center">
          学会区分真正的饥饿和情绪性饥饿，是情绪调节的第一步
        </p>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-[#e8f5e9] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#2e7d32] flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <h3 className="font-bold text-[#2e7d32] text-lg">真正的饥饿</h3>
            </div>
            <div className="space-y-2 text-sm text-[#2e7d32]">
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">出现方式</span>
                <span>慢慢来的，胃里有信号</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">食物选择</span>
                <span>吃什么都行，不挑剔</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">停止信号</span>
                <span>吃饱了自然会停</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">紧迫感</span>
                <span>可以等一等，不着急</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">吃后感受</span>
                <span>吃完感觉满足、舒服</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">身体信号</span>
                <span>胃里空、没力气、头晕</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fff3e0] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#e65100] flex items-center justify-center text-white font-bold">
                !
              </div>
              <h3 className="font-bold text-[#e65100] text-lg">情绪性饥饿</h3>
            </div>
            <div className="space-y-2 text-sm text-[#e65100]">
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">出现方式</span>
                <span>突然出现，很紧迫</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">食物选择</span>
                <span>只想吃某种特定食物</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">停止信号</span>
                <span>吃完了还想继续</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">紧迫感</span>
                <span>等不了，现在就要</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">吃后感受</span>
                <span>可能有罪恶感、懊悔</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[80px]">身体信号</span>
                <span>胃不饿，只是嘴巴想</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: `${trainingColor}10` }}
        >
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">记住：</span>
            情绪性饥饿不是你的错，也不代表你意志力薄弱。这是大脑在用它知道的方式照顾你。理解它，才能更好地应对它。
          </p>
        </div>

        <div className="bg-[#f7f4f2] rounded-xl p-5">
          <h3 className="font-semibold text-[#4b3425] mb-3">为什么会有情绪性饥饿？</h3>
          <div className="space-y-3 text-sm text-[rgba(31,22,15,0.64)] leading-relaxed">
            <p>
              当我们感到压力、焦虑、悲伤或无聊时，大脑会释放皮质醇等压力激素。这些激素会让我们渴望高糖、高脂的食物，因为它们能快速激活大脑的奖励中心，带来短暂的愉悦感。
            </p>
            <p>
              从进化角度看，这是大脑的自我保护机制——在危险或压力环境下，储存更多能量有助于生存。但在现代社会，这个机制可能会让我们在情绪困扰时过度进食。
            </p>
            <p className="font-semibold text-[#4b3425]">
              理解这个机制，能帮助我们减少对自己的苛责，转而寻找更健康的情绪应对方式。
            </p>
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