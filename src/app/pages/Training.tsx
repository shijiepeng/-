import { useNavigate } from "react-router";
import { Activity, Brain, Users, ChevronRight, Apple, Moon, Heart, Dumbbell, RefreshCw, Sliders, VolumeX, Shield, Compass, UserCheck, Utensils } from "lucide-react";
import { trainingPackages } from "../data/trainingPackages";
import { BottomNav } from "../components/BottomNav";
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

// 根据训练包ID映射到合适的图标
const trainingIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "food-emotion": Utensils,
  "sleep-training": Moon,
  "body-awareness": Heart,
  "exercise-emotion": Dumbbell,
  "cognitive-reframe": RefreshCw,
  "emotion-regulation": Sliders,
  "stop-rumination": VolumeX,
  "resilience-training": Shield,
  "know-needs": Compass,
  "find-support": UserCheck,
  "relationship-care": Users,
};

export function Training() {
  const navigate = useNavigate();

  // Convert trainingPackages object to array
  const trainingList = Object.values(trainingPackages);

  return (
    <div className="min-h-screen bg-[#f7f4f2] pb-24">
      {/* Header */}
      <motion.header
        className="bg-[#f7f4f2] px-4 pt-6 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-[#4b3425] mb-2">
          心理健身房
        </h1>
        <p className="text-lg text-[rgba(31,22,15,0.64)]">
          三大维度 × 11个训练包，每包分入门/进阶/强化三级
        </p>
      </motion.header>

      <main className="px-4 pb-6">
        {/* 推荐训练顺序 - 简化版 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-[#4B3425] mb-3">推荐路径</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-[#9BB068] text-white px-3 py-1.5 rounded-full font-semibold">生物</span>
            <span className="text-[rgba(31,22,15,0.48)]">→</span>
            <span className="bg-[#926247] text-white px-3 py-1.5 rounded-full font-semibold">心理</span>
            <span className="text-[rgba(31,22,15,0.48)]">→</span>
            <span className="bg-[rgba(31,22,15,0.24)] text-white px-3 py-1.5 rounded-full font-semibold">社会</span>
          </div>
          <p className="text-xs text-[rgba(31,22,15,0.48)] mt-2">基于你的测评结果推荐</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* 生物维度训练包 */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#9bb068]" />
              <h2 className="text-xl font-bold text-[#4b3425]">生物维度</h2>
              <span className="text-sm text-[rgba(31,22,15,0.48)]">身体是情绪的载体</span>
            </div>
            <div className="space-y-3">
              {trainingList.filter(t => t.dimension === "生物维度").map((training) => {
                const IconComponent = trainingIcons[training.id] || Activity;
                return (
                  <motion.button
                    key={training.id}
                    onClick={() => navigate(`/training/${training.id}`)}
                    className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] text-left hover:border-[#9bb068] transition-all flex items-center gap-4 active:scale-[0.98]"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${training.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: training.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#4b3425] text-base mb-1">
                        {training.title}
                      </h3>
                      <p className="text-sm text-[rgba(31,22,15,0.64)]">{training.description}</p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M7 4l6 6-6 6"
                        stroke="rgba(31,22,15,0.48)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* 心理维度训练包 */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[#926247]" />
              <h2 className="text-xl font-bold text-[#4b3425]">心理维度</h2>
              <span className="text-sm text-[rgba(31,22,15,0.48)]">思维方式决定情绪走向</span>
            </div>
            <div className="space-y-3">
              {trainingList.filter(t => t.dimension === "心理维度").map((training) => {
                const IconComponent = trainingIcons[training.id] || Brain;
                return (
                  <motion.button
                    key={training.id}
                    onClick={() => navigate(`/training/${training.id}`)}
                    className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] text-left hover:border-[#926247] transition-all flex items-center gap-4 active:scale-[0.98]"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${training.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: training.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#4b3425] text-base mb-1">
                        {training.title}
                      </h3>
                      <p className="text-sm text-[rgba(31,22,15,0.64)]">{training.description}</p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M7 4l6 6-6 6"
                        stroke="rgba(31,22,15,0.48)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* 社会维度训练包 */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#fe814b]" />
              <h2 className="text-xl font-bold text-[#4b3425]">社会维度</h2>
              <span className="text-sm text-[rgba(31,22,15,0.48)]">关系是情绪最大的变量</span>
            </div>
            <div className="space-y-3">
              {trainingList.filter(t => t.dimension === "社会维度").map((training) => {
                const IconComponent = trainingIcons[training.id] || Users;
                return (
                  <motion.button
                    key={training.id}
                    onClick={() => navigate(`/training/${training.id}`)}
                    className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] text-left hover:border-[#fe814b] transition-all flex items-center gap-4 active:scale-[0.98]"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${training.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: training.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#4b3425] text-base mb-1">
                        {training.title}
                      </h3>
                      <p className="text-sm text-[rgba(31,22,15,0.64)]">{training.description}</p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M7 4l6 6-6 6"
                        stroke="rgba(31,22,15,0.48)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}