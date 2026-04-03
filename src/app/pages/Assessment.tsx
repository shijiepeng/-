import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "最近这段时间，哪个方面最让你感到吃力?",
    options: [
      { text: "身体状态——睡不好、吃不规律、总是累", dimension: "biological", score: { biological: -10, psychological: 0, social: 0 } },
      { text: "脑子里的声音——焦虑、反复想、停不下来", dimension: "psychological", score: { biological: 0, psychological: -10, social: 0 } },
      { text: "关系里的感觉——累、内耗、不知道怎么相处", dimension: "social", score: { biological: 0, psychological: 0, social: -10 } },
      { text: "说不清楚，好像哪里都有一点", dimension: "mixed", score: { biological: -5, psychological: -5, social: -5 } },
    ],
  },
  {
    id: 2,
    question: "当你情绪不好时，你通常会怎么做?",
    options: [
      { text: "一个人待着、睡觉、刷手机转移注意力", dimension: "avoidance", score: { biological: -3, psychological: -8, social: -2 } },
      { text: "反复想这件事，越想越难受", dimension: "rumination", score: { biological: -2, psychological: -10, social: -1 } },
      { text: "找人说说，或者特别想找人说但不知道找谁", dimension: "social", score: { biological: -2, psychological: -4, social: -8 } },
      { text: "吃东西、或者完全没有食欲", dimension: "biological", score: { biological: -8, psychological: -5, social: -1 } },
    ],
  },
  {
    id: 3,
    question: "此刻，你的整体情绪状态大概是几分?",
    type: "scale",
    min: 0,
    max: 10,
    minLabel: "很糟糕",
    maxLabel: "很好",
  },
];

export function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scaleValue, setScaleValue] = useState(5);

  const handleNext = () => {
    if (questions[currentQuestion].type === "scale") {
      setAnswers([...answers, scaleValue]);
    } else {
      setAnswers([...answers, selectedOption]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // 计算三维度分数
      let bioScore = 50;
      let psyScore = 50;
      let socScore = 50;

      answers.forEach((ans, idx) => {
        if (idx < 2 && ans !== null && ans !== undefined) {
          const q = questions[idx];
          const opt = q.options[ans as number];
          if (opt?.score) {
            bioScore += opt.score.biological;
            psyScore += opt.score.psychological;
            socScore += opt.score.social;
          }
        }
      });

      // 第3题（情绪量表）影响所有维度
      const moodAnswer = answers[2] ?? scaleValue;
      const moodAdjustment = (moodAnswer - 5) * 2; // 偏离中间值调整
      bioScore += moodAdjustment;
      psyScore += moodAdjustment * 1.5;
      socScore += moodAdjustment;

      // 限制分数范围
      bioScore = Math.max(10, Math.min(90, Math.round(bioScore)));
      psyScore = Math.max(10, Math.min(90, Math.round(psyScore)));
      socScore = Math.max(10, Math.min(90, Math.round(socScore)));

      // Navigate to results with calculated scores
      navigate("/assessment-results", {
        state: {
          scores: {
            biological: bioScore,
            psychological: psyScore,
            social: socScore,
          },
          answers: [...answers, scaleValue],
        },
      });
    }
  };

  const currentQ = questions[currentQuestion];
  const isScaleQuestion = currentQ.type === "scale";

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <header className="bg-[#f7f4f2] px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
          <div className="text-sm text-[#4b3425]">9:41</div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[rgba(31,22,15,0.64)] mb-2">
            <span>快速测试 · 第{currentQuestion + 1}题</span>
            <span>共{questions.length}题</span>
          </div>
          <div className="h-2 bg-[rgba(31,22,15,0.12)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9bb068] transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="px-4 pb-24">
        <h2 className="text-2xl font-bold text-[#4b3425] mb-8">
          {currentQ.question}
        </h2>

        {isScaleQuestion ? (
          <div className="space-y-6">
            <div className="text-sm text-[rgba(31,22,15,0.64)] mb-2">
              0 = {currentQ.minLabel}, 10 = {currentQ.maxLabel}
            </div>
            <div className="flex gap-2 justify-between">
              {[...Array(11)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setScaleValue(i)}
                  className={`w-12 h-12 rounded-lg font-semibold text-lg transition-all ${
                    scaleValue === i
                      ? "bg-[#9bb068] text-white scale-110"
                      : "bg-white text-[#4b3425] border-2 border-[rgba(31,22,15,0.12)]"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-[rgba(31,22,15,0.64)]">
              <span>{currentQ.minLabel}</span>
              <span>还好</span>
              <span>{currentQ.maxLabel}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[rgba(31,22,15,0.64)] mb-4">
              选一个最符合的就好，不用想太多
            </p>
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  selectedOption === index
                    ? "bg-[#d4e7b8] border-2 border-[#9bb068]"
                    : "bg-white border-2 border-[rgba(31,22,15,0.12)]"
                }`}
              >
                <span className="text-[#4b3425] font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!isScaleQuestion && selectedOption === null}
          className="fixed bottom-8 left-4 right-4 bg-[#4b3425] text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion < questions.length - 1 ? "下一题" : "完成测评"}
        </button>
      </main>
    </div>
  );
}
