import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface FoodEmotionBeginnerProps {
  onComplete: () => void;
  onNext: () => void;
  isLastLesson: boolean;
  trainingColor: string;
}

export function FoodEmotionBeginner({ onComplete, onNext, isLastLesson, trainingColor }: FoodEmotionBeginnerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      title: "场景 1 / 8",
      scenario: "你刚刚跟朋友吵炒架了，心里很烦，打开冰箱找东西吃。",
      question: "这次想吃东西，是因为...",
      options: [
        { value: "hungry", label: "身体真的饿了" },
        { value: "emotion", label: "情绪让我想吃东西" },
        { value: "both", label: "说不准，两者都有" }
      ],
      feedback: "吵架之后想吃东西，是情绪在找出口。这不是意志力的问题，是大脑在寻找安慰。"
    },
    {
      id: 2,
      title: "场景 2 / 8",
      scenario: "图书馆坐了三个小时，胃开始有出声音，你意识到自己饭还没吃呢。",
      question: "这次的进食信号来自？",
      options: [
        { value: "body", label: "身体发出的真实饥饿" },
        { value: "emotion", label: "情绪驱动的进食冲动" },
        { value: "unsure", label: "不确定" }
      ],
      feedback: "胃里的声音、距离上次进食很久——这些是身体真实的饥饿信号，吃东西完全没问题。"
    },
    {
      id: 3,
      title: "场景 3 / 8",
      scenario: "考试前一晚，你反复翻手机，然后发现自己在找零食，其实刚吃完晚饭。",
      question: "这次想吃的冲动是？",
      options: [
        { value: "need", label: "身体还需要能量" },
        { value: "trigger", label: "焦虑或无聊引发的" },
        { value: "unsure", label: "不确定" }
      ],
      feedback: "刚吃完晚饭就想吃零食，通常是情绪在说话。焦虑会让人想通过咀嚼获得安慰感。"
    },
    {
      id: 4,
      title: "场景 4 / 8",
      scenario: "你正在专心做一件事，突然脑子里冒出\"好想吃薯片\"的念头，停不下来。",
      question: "这种\"想吃\"更像是？",
      options: [
        { value: "need", label: "身体需要补充能量" },
        { value: "craving", label: "大脑在寻找分心的借口" },
        { value: "wrong", label: "真的不知道" }
      ],
      feedback: "专注时突然想吃特定食物，通常是大脑在逃避当前任务。不是真的饿。"
    },
    {
      id: 5,
      title: "场景 5 / 8",
      scenario: "你妈妈说了一句让你很受伤的话，你坐在那里沉默，然后拿起零食吃了起来。",
      question: "驱动这次进食的是？",
      options: [
        { value: "tired", label: "身体饿了" },
        { value: "comfort", label: "情绪受伤需要安慰" },
        { value: "both", label: "两者都有" }
      ],
      feedback: "受伤时我拿食物，是寻求情绪的本能反应。食物短时间内能带来安慰，这很正常。"
    },
    {
      id: 6,
      title: "场景 6 / 8",
      scenario: "跑步结束，你感觉轻飘飘的，身体有点虚，想吃西点补充能量。",
      question: "这次是哪种饥饿？",
      options: [
        { value: "consume", label: "运动消耗后的真实需要" },
        { value: "trigger", label: "情绪波动引发的进食" },
        { value: "unsure", label: "不确定" }
      ],
      feedback: "运动后的虚弱感、轻飘飘——这是身体真实的能量需求，及时进食是对自己身体的照顾。"
    },
    {
      id: 7,
      title: "场景 7 / 8",
      scenario: "你独自待在宿舍，什么都不想做，翻来覆去，最后打开外卖软件。",
      question: "这次点外卖更多是？",
      options: [
        { value: "need", label: "身体真的需要吃东西" },
        { value: "low", label: "无聊或低落引发的" },
        { value: "unsure", label: "不确定" }
      ],
      feedback: "无聊和低落是情绪性进食最常见的触发器。那种空洞的感觉，让人很想通过食物来填满它。"
    },
    {
      id: 8,
      title: "场景 8 / 8",
      scenario: "和朋友一起玩得很开心，大家说吃吃宵夜吧，你其实不太饿，但很想一起去。",
      question: "你的进食动机是？",
      options: [
        { value: "need", label: "身体真的需要食物" },
        { value: "social", label: "社交氛围和情绪驱动" },
        { value: "little", label: "两者都有一点" }
      ],
      feedback: "开心时跟朋友吃东西，有社交的成分也有情绪在里面。这没有问题，享受美好时光重要。"
    }
  ];

  const currentQ = questions.find(q => q.id === currentQuestion);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const emotionCount = Object.values(answers).filter(a => 
      a === "emotion" || a === "comfort" || a === "trigger" || a === "craving" || a === "low" || a === "social"
    ).length;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]">
          <div className="flex items-center justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${trainingColor}20` }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: trainingColor }} />
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#4b3425] text-center mb-4">
            测评完成
          </h2>
          <p className="text-center text-[rgba(31,22,15,0.64)] mb-6">
            你完成了8个场景的自我觉察练习
          </p>

          <div 
            className="rounded-xl p-5 mb-6"
            style={{ backgroundColor: `${trainingColor}10` }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-[#4b3425] mb-2">
                {emotionCount} / 8
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">
                个场景中，你的进食可能与情绪有关
              </p>
            </div>

            <div className="border-t border-[rgba(31,22,15,0.12)] pt-4">
              <p className="text-sm text-[#4b3425] leading-relaxed">
                这个测评没有对错，重要的是<span className="font-semibold">开始觉察</span>自己和食物的关系。
              </p>
            </div>
          </div>

          <div className="bg-[#fff9f0] rounded-xl p-4 border border-[#ffd89b]">
            <p className="text-sm text-[#4b3425] leading-relaxed">
              <span className="font-semibold">💡 下一课预告</span>
              <br />
              我们将深入学习"真饿"和"假饿"的区别，以及如何在日常生活中识别它们。
            </p>
          </div>
        </div>

        <button
          onClick={isLastLesson ? onComplete : onNext}
          className="w-full py-4 rounded-full font-semibold text-lg text-white"
          style={{ backgroundColor: trainingColor }}
        >
          {isLastLesson ? "完成测评" : "下一课"}
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

  if (!currentQ) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]">
        <div className="mb-4">
          <span className="text-sm font-semibold" style={{ color: trainingColor }}>
            {currentQ.title}
          </span>
        </div>

        <p className="text-[#4b3425] leading-relaxed mb-6">
          {currentQ.scenario}
        </p>

        <h3 className="font-bold text-[#4b3425] mb-4">
          {currentQ.question}
        </h3>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                answers[currentQuestion] === option.value
                  ? 'border-[#9bb068] bg-[#9bb06810]'
                  : 'border-[rgba(31,22,15,0.12)] bg-white'
              }`}
            >
              <span className="text-[#4b3425]">{option.label}</span>
            </button>
          ))}
        </div>

        {answers[currentQuestion] && (
          <div 
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: `${trainingColor}10` }}
          >
            <p className="text-sm text-[#4b3425] leading-relaxed">
              {currentQ.feedback}
            </p>
          </div>
        )}
      </div>

      {answers[currentQuestion] && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full font-semibold text-lg text-white"
          style={{ backgroundColor: trainingColor }}
        >
          下一题
        </button>
      )}

      <div className="text-center">
        <span className="text-sm text-[rgba(31,22,15,0.64)]">
          没有对错，只有觉察
        </span>
      </div>
    </div>
  );
}