import { useNavigate } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useTrainingProgress } from "../store";

const trainingInfo: Record<string, { title: string; dimension: string; color: string; emoji: string }> = {
  "food-emotion": { title: "读懂你和食物的关系", dimension: "生物维度", color: "#9bb068", emoji: "🍽️" },
  "sleep-training": { title: "夜晚好好睡", dimension: "生物维度", color: "#9bb068", emoji: "😴" },
  "body-awareness": { title: "听懂身体说的话", dimension: "生物维度", color: "#9bb068", emoji: "🧘" },
  "exercise-emotion": { title: "动一动，心也跟着松了", dimension: "生物维度", color: "#9bb068", emoji: "🏃" },
  "cognitive-reframe": { title: "换一个角度想想看", dimension: "心理维度", color: "#926247", emoji: "💭" },
  "emotion-regulation": { title: "找到适合自己的方式", dimension: "心理维度", color: "#926247", emoji: "⚖️" },
  "stop-rumination": { title: "放下脑子里的那个声音", dimension: "心理维度", color: "#926247", emoji: "🔇" },
  "resilience-training": { title: "下次会更从容", dimension: "心理维度", color: "#926247", emoji: "🛡️" },
  "know-needs": { title: "知道自己需要什么", dimension: "社会维度", color: "#fe814b", emoji: "🎯" },
  "find-support": { title: "找到可以依靠的人", dimension: "社会维度", color: "#fe814b", emoji: "🤝" },
  "relationship-care": { title: "在关系里更自在", dimension: "社会维度", color: "#fe814b", emoji: "💕" },
};

export function Favorites() {
  const navigate = useNavigate();
  const { favorites, trainingProgress, getLevelProgress, toggleFavorite } = useTrainingProgress();

  const favoriteTrainings = favorites.map((id) => {
    const info = trainingInfo[id] || { title: id, dimension: "未知", color: "#9bb068", emoji: "❓" };
    const progress = trainingProgress[id];
    let progressPercent = 0;
    if (progress) {
      const lvl = progress.currentLevel;
      const completed = progress.completedLessons[lvl as keyof typeof progress.completedLessons]?.length ?? 0;
      progressPercent = Math.round((completed / Math.max(5, completed)) * 100);
    }
    return {
      id,
      ...info,
      progress: progressPercent,
    };
  });

  return (
    <div className="min-h-screen bg-[#f7f4f2] pb-24">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Star className="w-6 h-6 text-[#fbbf24]" fill="#fbbf24" />
          <h1 className="text-2xl font-bold text-[#4b3425]">收藏的训练</h1>
        </div>
        <p className="text-sm text-[rgba(31,22,15,0.64)]">
          你收藏了 {favoriteTrainings.length} 个训练包
        </p>
      </header>

      <main className="px-4 py-6">
        {favoriteTrainings.length > 0 ? (
          <div className="space-y-3">
            {favoriteTrainings.map((training) => (
              <button
                key={training.id}
                onClick={() => navigate(`/training/${training.id}`)}
                className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] hover:border-[#9bb068] transition-all text-left active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${training.color}20` }}
                  >
                    <span className="text-2xl">{training.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#4b3425] mb-0.5">
                      {training.title}
                    </h3>
                    <p className="text-xs text-[rgba(31,22,15,0.64)]">
                      {training.dimension}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(training.id);
                    }}
                    className="active:scale-90 transition-transform"
                  >
                    <Star
                      className="w-5 h-5 text-[#fbbf24]"
                      fill="#fbbf24"
                    />
                  </button>
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
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${training.progress}%`,
                          backgroundColor: training.color,
                        }}
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-lg font-bold text-[#4b3425] mb-2">还没有收藏</h3>
            <p className="text-sm text-[rgba(31,22,15,0.48)] mb-6">
              在训练详情页点击收藏按钮来添加
            </p>
            <button
              onClick={() => navigate("/training")}
              className="bg-[#9bb068] text-white px-8 py-3 rounded-full font-semibold active:scale-95 transition-transform"
            >
              浏览训练包
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
