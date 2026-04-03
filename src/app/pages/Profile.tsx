import { useNavigate } from "react-router";
import { User, Settings, Award, Heart, TrendingUp, ChevronRight, Calendar, Target, Trash2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useMoodRecords, useTrainingProgress, useStore } from "../store";
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

export function Profile() {
  const navigate = useNavigate();
  const { getStreakDays, moodRecords } = useMoodRecords();
  const { favorites } = useTrainingProgress();
  const { store, update } = useStore();

  const streakDays = getStreakDays();
  const totalRecords = moodRecords.length;
  const totalLessons = store.userStats.totalLessonsCompleted;

  // 计算等级
  const getLevelInfo = () => {
    if (totalLessons >= 30) return { level: "高级训练者", progress: Math.min(100, ((totalLessons - 20) / 10) * 100), nextTarget: "已达到最高等级！" };
    if (totalLessons >= 15) return { level: "进阶训练者", progress: ((totalLessons - 8) / 12) * 100, nextTarget: `再完成 ${30 - totalLessons} 节课升级到高级训练者` };
    return { level: "入门训练者", progress: (totalLessons / 8) * 100, nextTarget: `再完成 ${Math.max(0, 8 - totalLessons)} 节课升级到进阶训练者` };
  };

  const levelInfo = getLevelInfo();

  // 计算加入天数
  const joinDays = store.userStats.joinDate
    ? Math.max(1, Math.ceil((Date.now() - new Date(store.userStats.joinDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;

  const stats = [
    { label: "连续记录", value: `${streakDays}天`, icon: TrendingUp, color: "#9bb068" },
    { label: "完成课程", value: `${totalLessons}节`, icon: Award, color: "#926247" },
    { label: "情绪记录", value: `${totalRecords}次`, icon: Calendar, color: "#fe814b" },
  ];

  const menuItems = [
    { id: "favorites", label: "收藏的训练", icon: Heart, route: "/favorites", badge: favorites.length > 0 ? String(favorites.length) : undefined },
    { id: "mood-history", label: "情绪历史记录", icon: Calendar, route: "/mood-log" },
    { id: "settings", label: "设置", icon: Settings, route: "/settings" },
  ];

  const handleClearData = () => {
    if (window.confirm("确定要清除所有数据吗？此操作不可恢复。")) {
      localStorage.removeItem("mental-gym-store");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4f2] pb-24">
      {/* Header */}
      <motion.header
        className="bg-[#9bb068] px-4 pt-6 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Info */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-[#9bb068]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">训练者</h1>
            <p className="text-sm text-white opacity-90">
              加入心理健身房 {joinDays} 天
            </p>
          </div>
        </motion.div>
      </motion.header>

      <motion.main
        className="px-4 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Stats Cards */}
        <motion.div className="grid grid-cols-3 gap-3 mb-6 -mt-12" variants={itemVariants}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.08)] text-center"
            >
              <div
                className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-xl font-bold text-[#4b3425] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[rgba(31,22,15,0.64)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Level Badge */}
        <motion.div
          className="bg-gradient-to-br from-[#926247] to-[#7d5338] rounded-2xl p-5 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">{levelInfo.level}</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, levelInfo.progress)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
                <span className="text-white text-xs font-semibold">{Math.round(levelInfo.progress)}%</span>
              </div>
              <p className="text-white text-xs opacity-90 mt-1">
                {levelInfo.nextTarget}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div className="space-y-3" variants={itemVariants}>
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.08)] hover:border-[#9bb068] transition-all active:scale-[0.98]"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f4f2] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#4b3425]" />
                </div>
                <span className="flex-1 text-left font-semibold text-[#4b3425]">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-[#9bb068] text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-[rgba(31,22,15,0.48)]" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Clear Data (Danger Zone) */}
        <motion.div className="mt-6" variants={itemVariants}>
          <button
            onClick={handleClearData}
            className="w-full bg-white rounded-2xl p-4 border-2 border-[#d4183d]/30 hover:border-[#d4183d] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4 text-[#d4183d]" />
            <span className="font-medium text-[#d4183d]">清除所有数据</span>
          </button>
        </motion.div>

        {/* Version Info */}
        <motion.div className="mt-6 text-center" variants={itemVariants}>
          <p className="text-xs text-[rgba(31,22,15,0.48)]">
            心理健身房 v1.0.0
          </p>
        </motion.div>
      </motion.main>

      <BottomNav />
    </div>
  );
}