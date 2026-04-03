import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Activity, Brain, Users, ChevronRight } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useAssessment } from "../store";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const questions = [
  {
    id: 1,
    question: "最近这段时间，哪个方面最让你感到吃力?",
    options: [
      { text: "身体状态——睡不好、吃不规律、总是累", dimension: "biological", score: { biological: -10, psychological: 0, social: 0 } },
      { text: "脑子里的声音——焦虑、反复想、停不下来", dimension: "psychological", score: { biological: 0, psychological: -10, social: 0 } },
      { text: "关系里的感觉——累，内耗、不知道怎么相处", dimension: "social", score: { biological: 0, psychological: 0, social: -10 } },
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

const dimensionConfig = [
  { key: "biological" as const, title: "生物维度", color: "#9bb068", icon: Activity },
  { key: "psychological" as const, title: "心理维度", color: "#926247", icon: Brain },
  { key: "social" as const, title: "社会维度", color: "#fe814b", icon: Users },
];

export function Assessment() {
  const navigate = useNavigate();
  const { assessmentData, saveAssessment, clearAssessment } = useAssessment();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scaleValue, setScaleValue] = useState(5);

  // 如果已完成过测评，显示报告列表
  if (assessmentData) {
    return (
      <div className="min-h-screen bg-[#f7f4f2] pb-24">
        <motion.header
          className="bg-[#f7f4f2] px-4 pt-12 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-extrabold text-[#4B3425]">测评报告</h1>
          <p className="text-sm text-[rgba(31,22,15,0.64)] mt-1">基于3题快速测试</p>
        </motion.header>

        <motion.main
          className="px-4 pb-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* 快速测评报告 */}
          <motion.div className="mb-6" variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#4B3425]">快速测试</h2>
              <button
                onClick={() => {
                  clearAssessment();
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setSelectedOption(null);
                }}
                className="text-sm text-[#9bb068] font-semibold"
              >
                重新测评
              </button>
            </div>
            <div className="space-y-3">
              {dimensionConfig.map((dim) => {
                const Icon = dim.icon;
                const score = assessmentData.scores?.[dim.key] ?? 50;
                return (
                  <motion.div
                    key={dim.key}
                    className="bg-white rounded-2xl p-4 flex items-center gap-4"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${dim.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: dim.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#4B3425]">{dim.title}</span>
                        <span className="text-sm font-semibold text-[#4B3425]">{score}分</span>
                      </div>
                      <div className="h-2 bg-[rgba(31,22,15,0.08)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, score)}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                          style={{ backgroundColor: dim.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 深化测评入口 */}
          <motion.div className="mb-6" variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#4B3425]">深化测评</h2>
              <button
                onClick={() => navigate("/deep-assessment")}
                className="text-sm text-[#9bb068] font-semibold"
              >
                重新测评
              </button>
            </div>
            <motion.button
              onClick={() => navigate("/deep-assessment")}
              className="w-full bg-white rounded-2xl p-4 flex items-center justify-between"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4e7b8] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#9bb068]" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[#4B3425]">深度分析</h3>
                  <p className="text-sm text-[rgba(31,22,15,0.64)]">更全面的心理状态评估</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[rgba(31,22,15,0.48)]" />
            </motion.button>
          </motion.div>
        </motion.main>
        <BottomNav />
      </div>
    );
  }

  // 未完成测评，显示测评题目
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
      const moodAdjustment = (moodAnswer - 5) * 2;
      bioScore += moodAdjustment;
      psyScore += moodAdjustment * 1.5;
      socScore += moodAdjustment;

      // 限制分数范围
      bioScore = Math.max(10, Math.min(90, Math.round(bioScore)));
      psyScore = Math.max(10, Math.min(90, Math.round(psyScore)));
      socScore = Math.max(10, Math.min(90, Math.round(socScore)));

      // 保存并导航到结果
      saveAssessment({
        type: "quick",
        date: new Date().toISOString(),
        scores: {
          biological: bioScore,
          psychological: psyScore,
          social: socScore,
        },
      });

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
      <motion.header
        className="bg-[#f7f4f2] px-4 pt-6 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[rgba(31,22,15,0.64)] mb-2">
            <span>快速测试 · 第{currentQuestion + 1}题</span>
            <span>共{questions.length}题</span>
          </div>
          <div className="h-2 bg-[rgba(31,22,15,0.12)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#9bb068]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.header>

      {/* Question */}
      <main className="px-4 pb-24">
        <motion.h2
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-[#4b3425] mb-8"
        >
          {currentQ.question}
        </motion.h2>

        {isScaleQuestion ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-sm text-[rgba(31,22,15,0.64)] mb-2">
              0 = {currentQ.minLabel}, 10 = {currentQ.maxLabel}
            </div>
            <div className="flex gap-2 justify-between">
              {[...Array(11)].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setScaleValue(i)}
                  className={`w-12 h-12 rounded-lg font-semibold text-lg transition-all ${
                    scaleValue === i
                      ? "bg-[#9bb068] text-white scale-110"
                      : "bg-white text-[#4b3425] border-2 border-[rgba(31,22,15,0.12)]"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {i}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-[rgba(31,22,15,0.64)]">
              <span>{currentQ.minLabel}</span>
              <span>还好</span>
              <span>{currentQ.maxLabel}</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-sm text-[rgba(31,22,15,0.64)] mb-4">
              选一个最符合的就好，不用想太多
            </p>
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  selectedOption === index
                    ? "bg-[#d4e7b8] border-2 border-[#9bb068]"
                    : "bg-white border-2 border-[rgba(31,22,15,0.12)]"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-[#4b3425] font-medium">{option.text}</span>
              </motion.button>
            ))}
          </motion.div>
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
      <BottomNav />
    </div>
  );
}
