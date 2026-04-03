import { useNavigate, useLocation } from "react-router";
import { Activity, Brain, Users } from "lucide-react";

interface Scores {
  biological: number;
  psychological: number;
  social: number;
}

const dimensions = [
  {
    id: "biological",
    title: "生物维度",
    icon: Activity,
    color: "#9bb068",
    maxScore: 40,
    ranges: [
      { min: 32, max: 40, level: "良好", description: "身心联结良好，基础稳固", recommendation: "可直接进入进阶级" },
      { min: 20, max: 31, level: "中等", description: "部分区域需要关注", recommendation: "从入门级开始系统训练" },
      { min: 0, max: 19, level: "需关注", description: "身心联结较弱，需重点关注", recommendation: "优先选择此维度，从入门级开始" }
    ]
  },
  {
    id: "psychological",
    title: "心理维度",
    icon: Brain,
    color: "#926247",
    maxScore: 50,
    ranges: [
      { min: 40, max: 50, level: "良好", description: "情绪调节策略丰富灵活", recommendation: "可直接进入进阶级" },
      { min: 25, max: 39, level: "中等", description: "有一定调节能力，仍有提升空间", recommendation: "从入门级开始" },
      { min: 0, max: 24, level: "需关注", description: "情绪调节较困难，需系统训练", recommendation: "优先选择此维度" }
    ]
  },
  {
    id: "social",
    title: "社会维度",
    icon: Users,
    color: "#fe814b",
    maxScore: 40,
    ranges: [
      { min: 32, max: 40, level: "良好", description: "社会支持系统健全", recommendation: "可直接进入进阶级" },
      { min: 20, max: 31, level: "中等", description: "支持网络有待加强", recommendation: "从入门级开始" },
      { min: 0, max: 19, level: "需关注", description: "社会资源较匮乏，关系内耗较重", recommendation: "优先选择此维度" }
    ]
  }
];

export function DeepAssessmentResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const scores: Scores = location.state?.scores || { biological: 25, psychological: 30, social: 28 };

  const getRange = (dimensionId: string, score: number) => {
    const dimension = dimensions.find(d => d.id === dimensionId);
    if (!dimension) return null;
    return dimension.ranges.find(r => score >= r.min && score <= r.max);
  };

  // 找出得分最低的维度作为优先训练
  const lowestDimension = dimensions.reduce((lowest, current) => {
    const currentScore = scores[current.id as keyof Scores];
    const lowestScore = scores[lowest.id as keyof Scores];
    const currentPercent = (currentScore / current.maxScore) * 100;
    const lowestPercent = (lowestScore / lowest.maxScore) * 100;
    return currentPercent < lowestPercent ? current : lowest;
  });

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
          你的情绪体能深化报告
        </h1>
        <p className="text-lg text-[rgba(31,22,15,0.64)]">
          基于三维度深化测评，系统已为你匹配精准训练方向
        </p>
      </header>

      <main className="px-4 pb-24">
        {/* Dimensions */}
        <div className="space-y-4 mb-8">
          {dimensions.map((dim) => {
            const score = scores[dim.id as keyof Scores];
            const range = getRange(dim.id, score);
            const percentage = (score / dim.maxScore) * 100;

            return (
              <div
                key={dim.id}
                className={`rounded-2xl p-6 border-2 ${
                  dim.id === lowestDimension.id
                    ? "bg-[#fff9f0] border-[#ffd89b]"
                    : "bg-white border-[rgba(31,22,15,0.12)]"
                }`}
              >
                {dim.id === lowestDimension.id && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#fe814b] text-white text-xs font-bold rounded-full">
                      建议优先训练
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${dim.color}20` }}
                  >
                    <dim.icon className="w-6 h-6" style={{ color: dim.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#4b3425] text-lg">{dim.title}</h3>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                        style={{ backgroundColor: dim.color }}
                      >
                        {range?.level}
                      </span>
                    </div>
                    <p className="text-sm text-[rgba(31,22,15,0.64)]">
                      {score}分 / {dim.maxScore}分
                    </p>
                  </div>
                </div>

                <div className="h-3 bg-[rgba(31,22,15,0.08)] rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: dim.color,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-[#4b3425] font-medium">
                    {range?.description}
                  </p>
                  <p className="text-sm text-[rgba(31,22,15,0.64)]">
                    训练建议：{range?.recommendation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Training Order */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#4b3425] mb-4">精准训练顺序</h2>
          
          <div className="space-y-3 mb-6">
            <div className="bg-[#d4e7b8] rounded-2xl p-5 border-2 border-[#9bb068]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#9bb068] text-white text-xs font-bold px-3 py-1 rounded-full">
                  优先
                </span>
                <span className="font-bold text-[#4b3425]">
                  {lowestDimension.title}·从最需要的地方开始
                </span>
              </div>
              <p className="text-sm text-[#4b3425]">
                根据你的测评结果，建议优先训练这个维度
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#926247] text-white text-xs font-bold px-3 py-1 rounded-full">
                  然后
                </span>
                <span className="font-bold text-[#4b3425]">其他维度·配合第一个维度同步练习</span>
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">
                在优先维度取得进展后，可以同步训练其他维度
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => navigate("/deep-assessment", { state: { fromResults: true } })}
              className="flex-1 py-4 border-2 border-[#4b3425] text-[#4b3425] font-semibold rounded-full"
            >
              重新测评
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
          <p className="text-sm text-[#4b3425] leading-relaxed mb-3 font-semibold">
            关于你的报告：
          </p>
          <ul className="space-y-2 text-sm text-[#4b3425]">
            <li>• 这份报告基于成熟的心理测评量表改编</li>
            <li>• 得分越高表示该维度情绪能力越强</li>
            <li>• 建议每月重新测评一次，追踪进步</li>
            <li>• 记住：心理健身房不治病，不替代心理咨询</li>
          </ul>
        </div>
      </main>
    </div>
  );
}