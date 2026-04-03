import { useNavigate } from "react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { useMoodRecords } from "../store";
import { motion, AnimatePresence } from "motion/react";

const moods = [
  { id: 0, label: "很糟糕", image: "/image/mood_depressed.png" },
  { id: 1, label: "不太好", image: "/image/mood_sad.png" },
  { id: 2, label: "还不错", image: "/image/mood_neutral.png" },
  { id: 3, label: "挺好的", image: "/image/mood_happy.png" },
  { id: 4, label: "非常棒", image: "/image/mood_overjoyed.png" },
];

// 弧形选择器的位置（5个圆按钮的坐标）
const sliderPositions = [
  { x: 0, y: 0 },    // 左端
  { x: 64, y: 42 },  // 左中
  { x: 153, y: 56 }, // 底部中心
  { x: 242, y: 42 }, // 右中
  { x: 307, y: 0 }, // 右端
];

// 不同心情的绿色弧形路径（从 Figma 设计提取）
const arcPaths = [
  "", // 很糟糕 - 没有绿色弧形，只有白色背景
  "M3.85672 4.59631C23.8332 21.3586 46.2389 34.6163 70.1258 44.0303", // 不太好 - 很短的弧
  "M3.85675 4.59631C47.777 41.4498 103.439 61.3627 160.77 60.7311", // 还不错 - 中等弧
  "M3.85669 4.59631C46.5518 40.4218 100.385 60.2708 156.117 60.7372C186.943 60.9952 217.287 55.3147 245.577 44.2457", // 挺好的 - 长弧
  "M3.85669 4.59631C46.5518 40.4218 100.385 60.2708 156.117 60.7372C211.85 61.2037 266.007 42.2585 309.296 7.15272", // 非常棒 - 完整弧
];

export function MoodEdit() {
  const navigate = useNavigate();
  const [moodValue, setMoodValue] = useState(2);
  const [showSaved, setShowSaved] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
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

  // 已记录状态（且不是重新记录模式）
  if (todayRecord && !showRecording) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#E9E7E3" }}>
        <div className="h-12" />

        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <img
              src={moods[todayRecord.moodValue].image}
              alt={moods[todayRecord.moodValue].label}
              className="w-[182px] h-[181px] object-contain"
            />
          </motion.div>
          <p className="text-[#4B3425] text-xl font-semibold mt-4 mb-2">
            今天已经记录过了
          </p>
          <p className="text-[#4B3425]/60 text-base text-center mb-10">
            心情是「{moods[todayRecord.moodValue].label}」
          </p>

          <button
            onClick={() => {
              setMoodValue(2);
              setShowRecording(true);
            }}
            className="bg-white text-[#4B3425] text-lg font-extrabold px-12 py-4 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            重新记录
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
    <div
      className="min-h-screen flex flex-col select-none"
      style={{ backgroundColor: "#E9E7E3" }}
    >
      {/* 状态栏区域 */}
      <div className="h-12" />

      <main className="flex-1 flex flex-col items-center px-5 pt-4">
        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#4B3425] text-[36px] font-extrabold text-center leading-tight tracking-tight"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          你现在感觉怎么样？
        </motion.h1>

        {/* 心情图片展示区 */}
        <div className="relative w-full flex items-center justify-center my-4" style={{ height: "181px" }}>
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
              className="absolute"
              style={{
                transformOrigin: "center bottom",
                width: "182px",
                height: "181px",
              }}
            >
              {showSaved ? (
                <div className="w-full h-full bg-[#9bb068] rounded-full flex items-center justify-center">
                  <Check className="w-16 h-16 text-white" />
                </div>
              ) : (
                <img
                  src={currentMood.image}
                  alt={currentMood.label}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 心情文字标签 */}
        <motion.p
          key={`label-${moodValue}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#4B3425] text-2xl font-semibold mb-6"
          style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 600 }}
        >
          {currentMood.label}
        </motion.p>

        {/* 弧形选择器 - 精确匹配 Figma 设计 */}
        {!showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
            style={{ width: "314px", height: "67px" }}
          >
            {/* 背景弧线（白色） */}
            <svg
              className="absolute pointer-events-none"
              style={{ width: "314px", height: "67px" }}
              viewBox="0 0 314 67"
              fill="none"
            >
              <path
                d="M3.85675 4.59631C46.5519 40.4218 100.385 60.2708 156.117 60.7372C211.85 61.2037 266.007 42.2585 309.296 7.15272"
                stroke="#FFFBFB"
                strokeWidth="12"
              />
            </svg>

            {/* 选中弧线（绿色）- 根据心情变化 */}
            {arcPaths[moodValue] && (
              <svg
                className="absolute pointer-events-none"
                style={{ width: "314px", height: "67px" }}
                viewBox="0 0 314 67"
                fill="none"
              >
                <path
                  d={arcPaths[moodValue]}
                  stroke="#6C7B47"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* 5 个圆形按钮 */}
            {sliderPositions.map((pos, index) => {
              const isSelected = moodValue === index;
              return (
                <button
                  key={index}
                  onClick={() => setMoodValue(index)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none active:scale-90 transition-transform"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: "52px",
                    height: "52px",
                  }}
                >
                  {/* 外圈 - 圆角矩形 */}
                  <div
                    className="absolute inset-0 rounded-[22px]"
                    style={{
                      backgroundColor: isSelected ? "#6C7B47" : "#FFFBFB",
                      border: "8px solid #9BB068",
                      boxShadow: isSelected
                        ? "0 4px 12px rgba(108, 123, 71, 0.4)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  />
                  {/* 内圈小圆点 */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#9BB068",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </button>
              );
            })}
          </motion.div>
        )}

        {/* 确认按钮 */}
        {!showSaved ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            onClick={handleSave}
            whileTap={{ scale: 0.96 }}
            className="w-full bg-white text-[#4B3425] text-lg font-extrabold py-4 rounded-full shadow-md shadow-black/5 hover:shadow-lg transition-shadow flex items-center justify-center gap-3 mx-auto mt-12"
            style={{
              fontFamily: "Urbanist, sans-serif",
              maxWidth: "343px",
            }}
          >
            <span>记录心情</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2071 6.86392L12.5355 15.5355C11.7093 16.3618 10.9237 16.7153 9.97545 16.9039C9.00555 17.0968 8.00021 16.9978 7.08658 16.6193C6.17295 16.2409 5.39206 15.6 4.84265 14.7778C4.29324 13.9556 4 12.9889 4 11.9999H6C6 12.5933 6.17595 13.1733 6.50559 13.6667C6.83524 14.16 7.30377 14.5445 7.85195 14.7716C8.40013 14.9987 9.00333 15.0581 9.58527 14.9423C10.1889 14.8222 10.6044 14.6382 11.1213 14.1213L19.7929 5.44971L21.2071 6.86392Z"
                fill="#4B3425"
              />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-white text-[#9bb068] text-lg font-bold py-4 rounded-full shadow-md flex items-center justify-center gap-2 mx-auto mt-12"
            style={{ maxWidth: "343px" }}
          >
            <Check className="w-5 h-5" />
            <span>已保存</span>
          </motion.div>
        )}
      </main>

      {/* 底部安全区域 */}
      <div className="h-8" />
    </div>
  );
}
