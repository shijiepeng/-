import { useNavigate } from "react-router";
import {
  Activity,
  Brain,
  Users,
  Heart,
  TrendingUp,
  Star,
  SmilePlus,
  Calendar,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useMoodRecords, useTrainingProgress } from "../store";
import { motion } from "motion/react";
import { useState } from "react";
import { MoodChart } from "../components/MoodChart";

const moods = [
  { value: 0, label: "很糟糕", emoji: "😢" },
  { value: 1, label: "不太好", emoji: "😔" },
  { value: 2, label: "还不错", emoji: "😐" },
  { value: 3, label: "挺好的", emoji: "🙂" },
  { value: 4, label: "非常棒", emoji: "😄" },
];

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

export function Home() {
  const navigate = useNavigate();
  const { getStreakDays, getTodayRecord, getRecentRecords } = useMoodRecords();
  const { favorites, trainingProgress, getLevelProgress } = useTrainingProgress();

  const streakDays = getStreakDays();
  const todayRecord = getTodayRecord();
  const recentRecords = getRecentRecords(7);

  // 获取收藏的训练及其进度
  const favoriteTrainingsWithProgress = favorites.map((trainingId) => {
    // 从所有训练包数据中查找
    // 简单映射：使用已知 ID 的默认信息
    const trainingInfo: Record<string, { title: string; dimension: string; color: string }> = {
      "food-emotion": { title: "读懂你和食物的关系", dimension: "生物维度", color: "#9bb068" },
      "sleep-training": { title: "夜晚好好睡", dimension: "生物维度", color: "#9bb068" },
      "body-awareness": { title: "听懂身体说的话", dimension: "生物维度", color: "#9bb068" },
      "exercise-emotion": { title: "动一动，心也跟着松了", dimension: "生物维度", color: "#9bb068" },
      "cognitive-reframe": { title: "换一个角度想想看", dimension: "心理维度", color: "#926247" },
      "emotion-regulation": { title: "找到适合自己的方式", dimension: "心理维度", color: "#926247" },
      "stop-rumination": { title: "放下脑子里的那个声音", dimension: "心理维度", color: "#926247" },
      "resilience-training": { title: "下次会更从容", dimension: "心理维度", color: "#926247" },
      "know-needs": { title: "知道自己需要什么", dimension: "社会维度", color: "#fe814b" },
      "find-support": { title: "找到可以依靠的人", dimension: "社会维度", color: "#fe814b" },
      "relationship-care": { title: "在关系里更自在", dimension: "社会维度", color: "#fe814b" },
    };

    const info = trainingInfo[trainingId] || { title: trainingId, dimension: "未知", color: "#9bb068" };
    const progress = trainingProgress[trainingId];
    let progressPercent = 0;
    if (progress) {
      // 计算当前级别的进度
      const currentLvl = progress.currentLevel;
      const totalLessons = 5; // 近似值，实际应从 trainingPackages 获取
      const completed = progress.completedLessons[currentLvl as keyof typeof progress.completedLessons]?.length ?? 0;
      progressPercent = Math.round((completed / Math.max(totalLessons, completed)) * 100);
    }

    return {
      id: trainingId,
      ...info,
      progress: progressPercent,
    };
  });

  return (
    <div className="min-h-screen bg-[#f7f4f2] pb-24">
      {/* Header */}
      <header className="px-4 pt-12 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[36px] font-extrabold text-[#4B3425] mb-2 tracking-tight"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          心理健身房
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base text-[rgba(31,22,15,0.64)]"
        >
          练出更好的自己，从情绪开始
        </motion.p>
      </header>

      <main className="px-4 pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Training Streak Card */}
          <motion.div variants={itemVariants}>
            <div
              className="bg-gradient-to-br from-[#9bb068] to-[#7d9456] rounded-3xl p-6 mb-6 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => navigate("/mood-record")}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-semibold">
                    {streakDays > 0 ? `已坚持 ${streakDays} 天` : "开始你的记录"}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.span
                    key={streakDays}
                    initial={{ scale: 1.3, color: "#fff" }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-5xl font-extrabold text-white"
                  >
                    {streakDays}
                  </motion.span>
                  <span className="text-2xl font-bold text-white opacity-90">天</span>
                </div>

                {/* 今日心情摘要或引导 */}
                {todayRecord ? (
                  <div className="flex items-center gap-2 mt-3 bg-white/20 rounded-full px-3 py-1.5 w-fit">
                    <span className="text-lg">{moods[todayRecord.moodValue]?.emoji}</span>
                    <span className="text-sm text-white">
                      今天心情：{moods[todayRecord.moodValue]?.label}
                    </span>
                  </div>
                ) : (
                  <p className="text-white text-sm opacity-90 mt-2">
                    今天还没记录哦～ 点击这里记录心情
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* 今日心情快速记录（如果未记录） */}
          {!todayRecord && (
            <motion.div variants={itemVariants}>
              <button
                onClick={() => navigate("/mood-record")}
                className="w-full bg-white rounded-2xl p-4 border-2 border-dashed border-[#9bb068]/50 flex items-center justify-between hover:border-[#9bb068] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#d4e7b8] flex items-center justify-center group-hover:bg-[#9bb068] transition-colors">
                    <SmilePlus className="w-5 h-5 text-[#9bb068] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-[#4b3425]">记录今日心情</h3>
                    <p className="text-xs text-[rgba(31,22,15,0.48)]">
                      花几秒钟记录此刻的感受
                    </p>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="#9bb068" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* 收藏的训练 */}
          {favoriteTrainingsWithProgress.length > 0 && (
            <motion.div variants={itemVariants} className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#fbbf24]" fill="#fbbf24" />
                <h2 className="text-lg font-bold text-[#4b3425]">收藏的训练</h2>
              </div>

              <div className="space-y-3">
                {favoriteTrainingsWithProgress.slice(0, 3).map((training) => (
                  <button
                    key={training.id}
                    onClick={() => navigate(`/training/${training.id}`)}
                    className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] hover:border-[#9bb068] transition-all text-left active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${training.color}20` }}
                      >
                        <span className="text-lg">
                          {training.dimension === "生物维度"
                            ? "🌿"
                            : training.dimension === "心理维度"
                              ? "🧠"
                              : "👥"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#4b3425] mb-0.5 truncate">
                          {training.title}
                        </h3>
                        <p className="text-xs text-[rgba(31,22,15,0.64)]">
                          {training.dimension}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {training.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-[rgba(31,22,15,0.64)]">
                            学习进度
                          </span>
                          <span className="text-xs font-semibold text-[#4b3425]">
                            {training.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-[rgba(31,22,15,0.08)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: training.color,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${training.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Entry Buttons */}
          <motion.div variants={itemVariants} className="space-y-3 mt-6">
            <button
              onClick={() => navigate("/training")}
              className="w-full bg-white border-2 border-[#9bb068] rounded-2xl p-5 text-left hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#9bb068]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#4b3425] mb-1">
                    我想系统提升情绪能力
                  </h3>
                  <p className="text-sm text-[rgba(31,22,15,0.64)]">
                    三大维度 × 11个训练包
                  </p>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="#9bb068"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={() => navigate("/situations")}
              className="w-full bg-white border-2 border-[#926247] rounded-2xl p-5 text-left hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#f7f4f2] rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#926247]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#4b3425] mb-1">
                    我现在有具体困扰
                  </h3>
                  <p className="text-sm text-[rgba(31,22,15,0.64)]">
                    6种常见情境，针对性训练
                  </p>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="rgba(31,22,15,0.48)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </motion.div>

          {/* 本周情绪趋势图（有记录时显示） */}
          {recentRecords.length >= 2 && (
            <motion.div variants={itemVariants} className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#926247]" />
                <h2 className="text-lg font-bold text-[#4b3425]">本周情绪趋势</h2>
              </div>
              <MoodChart />
            </motion.div>
          )}

          {/* Info Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#fff9f0] rounded-2xl p-5 border border-[#ffd89b] mt-6">
              <p className="text-sm text-[#4b3425] leading-relaxed">
                <strong>关于心理健身房：</strong>
                就像Keep帮你提升身体素质一样，我们帮助你在日常生活中系统提升情绪调节能力。
                {" "}<strong>不治病，不替代心理咨询。</strong>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
