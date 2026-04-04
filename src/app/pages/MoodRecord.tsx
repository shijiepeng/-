import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useMoodRecords } from "../store";
import { motion, AnimatePresence } from "motion/react";

const moods = [
  { id: 0, label: "很糟糕", color: "#8b7bb8", dotColor: "#e67a5a" },
  { id: 1, label: "不太好", color: "#e67a5a", dotColor: "#fe814b" },
  { id: 2, label: "还不错", color: "#a68968", dotColor: "#e8b84f" },
  { id: 3, label: "挺好的", color: "#e8b84f", dotColor: "#B5CF80" },
  { id: 4, label: "非常棒", color: "#B5CF80", dotColor: "#B5CF80" },
];

// 弧形滑块的 5 个点位置（百分比坐标，模拟 Figma 设计中的弧形排列）
const sliderPoints = [
  { x: 0, y: 0 },       // 左端 - 最差
  { x: 21, y: 42 },     // 左中
  { x: 50, y: 56 },     // 底部中心 - 中性
  { x: 79, y: 42 },     // 右中
  { x: 100, y: 0 },     // 右端 - 最好
];

export function MoodRecord() {
  const navigate = useNavigate();
  const [moodValue, setMoodValue] = useState(2);
  const [showSaved, setShowSaved] = useState(false);
  const { addMoodRecord, getTodayRecord } = useMoodRecords();

  const currentMood = moods[moodValue];
  const todayRecord = getTodayRecord();

  const handleSave = () => {
    addMoodRecord({
      date: new Date().toISOString().split("T")[0],
      moodValue,
      emotions: [currentMood.label],
      sleepQuality: 5,
      brainFatigue: 5,
      bodyFeeling: 5,
      emotionLevel: moodValue * 2 + 2,
      stressLevel: 5,
    });

    setShowSaved(true);
    setTimeout(() => {
      navigate("/home");
    }, 1200);
  };

  // 已记录状态
  if (todayRecord) {
    const recordedMood = moods[todayRecord.moodValue];
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "rgba(194,226,237,0.42)" }}>
        {/* Status Bar Area */}
        <div className="h-12" />

        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="text-[140px] leading-none mb-4 text-center" style={{ color: recordedMood.dotColor }}>
              {recordedMood.label}
            </div>
          </motion.div>
          <p className="text-[#4B3425] text-xl font-semibold mt-4 mb-2">
            今天已经记录过了
          </p>
          <p className="text-[#4B3425]/60 text-base text-center mb-10">
            心情是「{recordedMood.label}」
          </p>

          <button
            onClick={() => navigate("/mood-log")}
            className="bg-white text-[#4B3425] text-lg font-extrabold px-12 py-4 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            补充详细记录
          </button>

          <button
            onClick={() => navigate("/home")}
            className="mt-4 text-[#4B3425]/48 text-sm font-medium active:opacity-70 transition-opacity"
          >
            返回首页
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col select-none" style={{ backgroundColor: "rgba(194,226,237,0.42)" }}>
      {/* 状态栏区域 */}
      <div className="h-12" />

      <main className="flex-1 flex flex-col items-center px-5 pt-4">
        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#4B3425] text-4xl font-extrabold text-center leading-tight tracking-tight"
        >
          你今天感觉怎么样？
        </motion.h1>

        {/* Emoji 展示区 */}
        <div className="relative w-full h-56 flex items-center justify-center my-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={moodValue}
              initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
              animate={{
                scale: [0.85, 1.05, 1],
                opacity: 1,
                rotate: [-5, 2, 0],
              }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-[160px] leading-none absolute"
              style={{ transformOrigin: "center bottom" }}
            >
              {showSaved ? "✓" : currentMood.label}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 情绪文字标签 */}
        <motion.p
          key={`label-${moodValue}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#4B3425] text-2xl font-semibold mb-2"
        >
          {showSaved ? "保存成功！" : currentMood.label}
        </motion.p>

        {/* 弧形滑块 */}
        {!showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-sm mt-4 mb-8 relative"
            style={{ height: "100px" }}
          >
            {/* 渐变连线（背景层）— 用 SVG 绘制弧形连线 */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ overflow: "visible" }}
            >
              {/* 从左到右的渐变弧线 — 模拟 outline 连线效果 */}
              <defs>
                <linearGradient id="arcGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0A500" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#FFCE5C" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#FFCE5C" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* 左半段连线：左 → 中 */}
              <path
                d={`M ${sliderPoints[0].x} ${sliderPoints[0].y} Q ${sliderPoints[0].x + 25} ${sliderPoints[0].y + 30}, ${sliderPoints[2].x} ${sliderPoints[2].y}`}
                stroke="url(#arcGradientLeft)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* 右半段连线：中 → 右 */}
              <path
                d={`M ${sliderPoints[2].x} ${sliderPoints[2].y} Q ${sliderPoints[2].x + 25} ${sliderPoints[2].y - 14}, ${sliderPoints[4].x} ${sliderPoints[4].y}`}
                stroke="url(#arcGradientLeft)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* 5 个圆点 */}
            {sliderPoints.map((point, index) => {
              const isSelected = moodValue === index;
              const mood = moods[index];
              return (
                <button
                  key={index}
                  onClick={() => setMoodValue(index)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none active:scale-90 transition-transform"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}px`,
                    width: "44px",
                    height: "44px",
                  }}
                >
                  {/* 外圈描边 */}
                  <div
                    className="absolute inset-0 rounded-full border-[6px] transition-colors duration-300"
                    style={{
                      borderColor: isSelected ? mood.dotColor : "#FFCE5C",
                      backgroundColor: isSelected ? mood.dotColor : "white",
                      boxShadow: isSelected
                        ? `0 2px 12px ${mood.dotColor}40`
                        : "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  />

                  {/* 内圈小圆点 */}
                  <div
                    className="absolute inset-[14px] rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: isSelected ? "white" : "#FFCE5C",
                    }}
                  />
                </button>
              );
            })}
          </motion.div>
        )}

        {/* 确定按钮 */}
        {!showSaved ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            onClick={handleSave}
            whileTap={{ scale: 0.96 }}
            className="w-full max-w-sm bg-white text-[#4B3425] text-lg font-extrabold py-4 rounded-full shadow-md shadow-black/5 hover:shadow-lg transition-shadow flex items-center justify-center gap-3 mx-auto"
          >
            <span>确定心情</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-sm bg-white text-[#B5CF80] text-lg font-bold py-4 rounded-full shadow-md flex items-center justify-center gap-2 mx-auto"
          >
            <span>已保存</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}
      </main>

      {/* 底部安全区域 */}
      <div className="h-8" />
    </div>
  );
}
