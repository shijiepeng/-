import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { usePrePostTest } from "../store";
import { trainingPackages } from "../data/trainingPackages";

const emotionOptions = [
  "焦虑/紧张",
  "低落/难过",
  "愤怒/烦躁",
  "空洞/麻木",
  "疲惫/无力",
  "还好/平静",
];

const reasonOptions = [
  "学业压力",
  "人际关系",
  "失眠/身体不适",
  "情绪低落",
  "感情问题",
  "就是想练练",
];

const changeOptions = [
  "好多了，轻松了很多",
  "好一点点",
  "没什么变化",
  "有点不一样，但说不清楚",
  "反而更难受了",
];

const impressOptions = [
  "某个练习让我停下来想了很久",
  "我发现自己了一些没注意到的事情",
  "有个方法我想试试",
  "没什么特别的",
];

export function PrePostTest() {
  const navigate = useNavigate();
  const { trainingId, level, testType } = useParams<{
    trainingId: string;
    level: "beginner" | "advanced" | "intensive";
    testType: "pre" | "post";
  }>();
  const { savePrePostTest } = usePrePostTest();

  const training = trainingPackages[trainingId as keyof typeof trainingPackages];

  const [Q1_mood, setQ1_mood] = useState(5);
  const [Q2_emotion, setQ2_emotion] = useState<string>("");
  const [Q3_intensity, setQ3_intensity] = useState(5);
  const [Q4_reason, setQ4_reason] = useState<string>("");
  const [Q2_change, setQ2_change] = useState<string>("");
  const [Q3_impress, setQ3_impress] = useState<string>("");
  const [Q4_completion, setQ4_completion] = useState(3);

  const handleComplete = () => {
    if (!trainingId || !level || !testType) return;

    const result = {
      trainingId,
      level,
      type: testType,
      date: new Date().toISOString(),
      Q1_mood,
      Q2_emotion: testType === "pre" ? Q2_emotion : Q2_change,
      Q3_intensity: testType === "pre" ? Q3_intensity : 0,
      Q4_reason: testType === "pre" ? Q4_reason : undefined,
      Q2_change: testType === "post" ? Q2_change : undefined,
      Q3_impress: testType === "post" ? Q3_impress : undefined,
      Q4_completion: testType === "post" ? Q4_completion : undefined,
    };

    savePrePostTest(result);

    // 前测完成后跳转到第一课，后测返回课程列表
    if (testType === "pre") {
      navigate(`/training/${trainingId}/level/${level}/lesson/1`);
    } else {
      navigate(`/training/${trainingId}/level/${level}`);
    }
  };

  const levelName = {
    beginner: "入门级",
    advanced: "进阶级",
    intensive: "强化级",
  }[level] || level;

  if (!training || !trainingId || !level || !testType) {
    return <div>无效的路径</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <motion.header
        className="bg-white px-4 pt-6 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(`/training/${trainingId}/level/${level}`)}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
          <span className="text-sm text-[rgba(31,22,15,0.64)]">
            {testType === "pre" ? "训练前测" : "训练后测"}
          </span>
        </div>
        <h1 className="text-xl font-bold text-[#4b3425]">
          {testType === "pre" ? "训练前测" : "训练后测"}
        </h1>
        <p className="text-sm text-[rgba(31,22,15,0.64)] mt-1">
          {training.title} · {levelName}
        </p>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 pb-24">
        {testType === "pre" ? (
          <PreTestContent
            Q1_mood={Q1_mood}
            setQ1_mood={setQ1_mood}
            Q2_emotion={Q2_emotion}
            setQ2_emotion={setQ2_emotion}
            Q3_intensity={Q3_intensity}
            setQ3_intensity={setQ3_intensity}
            Q4_reason={Q4_reason}
            setQ4_reason={setQ4_reason}
          />
        ) : (
          <PostTestContent
            Q1_mood={Q1_mood}
            setQ1_mood={setQ1_mood}
            Q2_change={Q2_change}
            setQ2_change={setQ2_change}
            Q3_impress={Q3_impress}
            setQ3_impress={setQ3_impress}
            Q4_completion={Q4_completion}
            setQ4_completion={setQ4_completion}
          />
        )}
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(31,22,15,0.12)] p-4">
        <button
          onClick={handleComplete}
          className="w-full py-4 rounded-full font-semibold text-lg text-white bg-[#e8b84f]"
        >
          {testType === "pre" ? "完成前测，开始训练" : "完成后测，返回列表"}
        </button>
      </div>
    </div>
  );
}

function PreTestContent({
  Q1_mood,
  setQ1_mood,
  Q2_emotion,
  setQ2_emotion,
  Q3_intensity,
  setQ3_intensity,
  Q4_reason,
  setQ4_reason,
}: {
  Q1_mood: number;
  setQ1_mood: (v: number) => void;
  Q2_emotion: string;
  setQ2_emotion: (v: string) => void;
  Q3_intensity: number;
  setQ3_intensity: (v: number) => void;
  Q4_reason: string;
  setQ4_reason: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Q1 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-4">
          Q1 此刻你的情绪总体感受是？
        </h3>
        <div className="flex justify-between text-xs text-[rgba(31,22,15,0.48)] mb-2">
          <span>很糟糕</span>
          <span>很好</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={Q1_mood}
          onChange={(e) => setQ1_mood(Number(e.target.value))}
          className="w-full h-2 bg-[#f7f4f2] rounded-lg appearance-none cursor-pointer accent-[#e8b84f]"
        />
        <div className="text-center mt-2">
          <span className="text-2xl font-bold text-[#e8b84f]">{Q1_mood}</span>
        </div>
      </div>

      {/* Q2 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-4">
          Q2 此刻你最强烈的感受是？
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {emotionOptions.map((option) => (
            <button
              key={option}
              onClick={() => setQ2_emotion(option)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                Q2_emotion === option
                  ? "bg-[#e8b84f]/20 border-2 border-[#e8b84f] text-[#4b3425]"
                  : "bg-[#f7f4f2] text-[#4b3425] border-2 border-transparent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="其他感受..."
          className="mt-3 w-full px-4 py-3 rounded-xl border-2 border-[rgba(31,22,15,0.12)] focus:border-[#e8b84f] outline-none"
          onChange={(e) => setQ2_emotion(e.target.value)}
        />
      </div>

      {/* Q3 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-4">
          Q3 这种感受大概有多强烈？
        </h3>
        <div className="flex justify-between text-xs text-[rgba(31,22,15,0.48)] mb-2">
          <span>很轻微</span>
          <span>非常强烈</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={Q3_intensity}
          onChange={(e) => setQ3_intensity(Number(e.target.value))}
          className="w-full h-2 bg-[#f7f4f2] rounded-lg appearance-none cursor-pointer accent-[#e8b84f]"
        />
        <div className="text-center mt-2">
          <span className="text-2xl font-bold text-[#e8b84f]">{Q3_intensity}</span>
        </div>
      </div>

      {/* Q4 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-2">
          Q4 今天是什么让你来训练的？
        </h3>
        <p className="text-xs text-[rgba(31,22,15,0.48)] mb-4">选填</p>
        <div className="grid grid-cols-2 gap-2">
          {reasonOptions.map((option) => (
            <button
              key={option}
              onClick={() => setQ4_reason(option)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                Q4_reason === option
                  ? "bg-[#e8b84f]/20 border-2 border-[#e8b84f] text-[#4b3425]"
                  : "bg-[#f7f4f2] text-[#4b3425] border-2 border-transparent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PostTestContent({
  Q1_mood,
  setQ1_mood,
  Q2_change,
  setQ2_change,
  Q3_impress,
  setQ3_impress,
  Q4_completion,
  setQ4_completion,
}: {
  Q1_mood: number;
  setQ1_mood: (v: number) => void;
  Q2_change: string;
  setQ2_change: (v: string) => void;
  Q3_impress: string;
  setQ3_impress: (v: string) => void;
  Q4_completion: number;
  setQ4_completion: (v: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Q1 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-4">
          Q1 此刻你的情绪总体感受是？
        </h3>
        <div className="flex justify-between text-xs text-[rgba(31,22,15,0.48)] mb-2">
          <span>很糟糕</span>
          <span>很好</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={Q1_mood}
          onChange={(e) => setQ1_mood(Number(e.target.value))}
          className="w-full h-2 bg-[#f7f4f2] rounded-lg appearance-none cursor-pointer accent-[#e8b84f]"
        />
        <div className="text-center mt-2">
          <span className="text-2xl font-bold text-[#e8b84f]">{Q1_mood}</span>
        </div>
      </div>

      {/* Q2 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-4">
          Q2 和训练前比，你的感受有什么变化？
        </h3>
        <div className="space-y-2">
          {changeOptions.map((option) => (
            <button
              key={option}
              onClick={() => setQ2_change(option)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-left transition-all ${
                Q2_change === option
                  ? "bg-[#e8b84f]/20 border-2 border-[#e8b84f] text-[#4b3425]"
                  : "bg-[#f7f4f2] text-[#4b3425] border-2 border-transparent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Q3 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-2">
          Q3 这次训练里，什么让你印象深刻？
        </h3>
        <p className="text-xs text-[rgba(31,22,15,0.48)] mb-4">选填</p>
        <div className="space-y-2">
          {impressOptions.map((option) => (
            <button
              key={option}
              onClick={() => setQ3_impress(option)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-left transition-all ${
                Q3_impress === option
                  ? "bg-[#e8b84f]/20 border-2 border-[#e8b84f] text-[#4b3425]"
                  : "bg-[#f7f4f2] text-[#4b3425] border-2 border-transparent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Q4 */}
      <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
        <h3 className="font-bold text-[#4b3425] mb-4">
          Q4 今天的训练完成了！给自己打个分
        </h3>
        <div className="flex justify-between gap-2">
          {[
            { value: 1, label: "我只是看了看" },
            { value: 2, label: "做了一半" },
            { value: 3, label: "基本完成" },
            { value: 4, label: "认真完成了" },
            { value: 5, label: "全力以赴" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setQ4_completion(opt.value)}
              className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all ${
                Q4_completion === opt.value
                  ? "bg-[#e8b84f] text-white"
                  : "bg-[#f7f4f2] text-[#4b3425]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
