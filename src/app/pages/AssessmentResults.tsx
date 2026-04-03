import { useNavigate, useLocation } from "react-router";
import { Activity, Brain, Users } from "lucide-react";

interface Scores {
  biological: number;
  psychological: number;
  social: number;
}

const dimensionConfig = [
  {
    key: "biological" as const,
    title: "生物维度",
    color: "#9bb068",
    descriptionTemplate: (score: number) => {
      if (score >= 60) return "身心联结良好，睡眠和身体状态不错，继续保持！";
      if (score >= 40) return "身心联结需要加强，睡眠和饮食是情绪的地基";
      return "身心联结较弱，建议优先关注生物维度的基础训练";
    },
    icon: Activity,
  },
  {
    key: "psychological" as const,
    title: "心理维度",
    color: "#926247",
    descriptionTemplate: (score: number) => {
      if (score >= 60) return "思维模式灵活，情绪调节能力较强！";
      if (score >= 40) return "思维模式有改善空间，认知重构可以帮你停下来重新思考";
      return "情绪调节较困难，建议从认知重构入门训练开始";
    },
    icon: Brain,
  },
  {
    key: "social" as const,
    title: "社会维度",
    color: "#fe814b",
    descriptionTemplate: (score: number) => {
      if (score >= 60) return "社会支持系统健全，人际关系质量较高！";
      if (score >= 40) return "社会资源较好，可以强化人际情绪调节能力";
      return "社会资源有待加强，建议从边界训练开始建立健康关系";
    },
    icon: Users,
  },
];

export function AssessmentResults() {
  const navigate = useNavigate();
  const location = useLocation();

  // 从路由状态获取分数，如果没有则使用默认值
  const stateScores = location.state?.scores as Scores | undefined;

  // 排序：分数最低的维度排前面（优先训练）
  const dimensions = dimensionConfig
    .map((dim) => ({
      ...dim,
      score: stateScores?.[dim.key] ?? dim.key === "biological" ? 38 : dim.key === "psychological" ? 48 : 53,
    }))
    .sort((a, b) => a.score - b.score);

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <header className="bg-[#f7f4f2] px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/training")}
            className="text-sm text-[#4b3425] font-semibold"
          >
            跳过
          </button>
          <div className="text-sm text-[#4b3425]">9:41</div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#4b3425] mb-2">
          你的情绪体能初始报告
        </h1>
        <p className="text-lg text-[rgba(31,22,15,0.64)]">
          基于3题快速测试，系统已为你匹配训练方向
        </p>
      </header>

      <main className="px-4 pb-24">
        {/* Dimensions */}
        <div className="space-y-4 mb-8">
          {dimensions.map((dim, index) => (
            <div
              key={dim.key}
              className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)]"
            >
              {index === 0 && (
                <span className="inline-block px-3 py-1 bg-[#fe814b] text-white text-xs font-bold rounded-full mb-3">
                  建议优先
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${dim.color}20` }}
                >
                  <dim.icon className="w-6 h-6" style={{ color: dim.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#4b3425] text-lg">{dim.title}</h3>
                  <p className="text-sm text-[rgba(31,22,15,0.64)]">{dim.score}分</p>
                </div>
              </div>
              <div className="h-3 bg-[rgba(31,22,15,0.08)] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, dim.score)}%`,
                    backgroundColor: dim.color,
                  }}
                />
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">
                {dim.descriptionTemplate(dim.score)}
              </p>
            </div>
          ))}
        </div>

        {/* Training Order */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#4b3425] mb-4">推荐训练顺序</h2>

          <div className="space-y-3 mb-6">
            <div className="bg-[#d4e7b8] rounded-2xl p-5 border-2 border-[#9bb068]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#9bb068] text-white text-xs font-bold px-3 py-1 rounded-full">
                  优先
                </span>
                <span className="font-bold text-[#4b3425]">{dimensions[0].title}·入门级</span>
              </div>
              <p className="text-sm text-[#4b3425}">
                从这里开始，打好基础
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#926247] text-white text-xs font-bold px-3 py-1 rounded-full">
                  然后
                </span>
                <span className="font-bold text-[#4b3425]">{dimensions[1]?.title}·入门级</span>
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">
                配合第一个维度同步练习
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[rgba(31,22,15,0.24)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  之后
                </span>
                <span className="font-bold text-[#4b3425]">{dimensions[2]?.title}·视进度开始</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/deep-assessment")}
              className="flex-1 py-4 border-2 border-[#4b3425] text-[#4b3425] font-semibold rounded-full"
            >
              深化测评
            </button>
            <button
              onClick={() => navigate("/training")}
              className="flex-1 py-4 bg-[#4b3425] text-white font-semibold rounded-full"
            >
              开始训练
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#fff9f0] rounded-2xl p-5 border border-[#ffd89b]">
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">小提示：</span>
            心理健身房不治病，不替代心理咨询。我们帮你在日常生活中系统提升情绪调节能力——就像Keep帮你提升身体素质一样。
          </p>
        </div>
      </main>
    </div>
  );
}
