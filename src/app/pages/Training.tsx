import { useNavigate } from "react-router";
import { ArrowLeft, Dumbbell, Activity, Brain, Users, ChevronRight } from "lucide-react";
import { trainingPackages } from "../data/trainingPackages";
import { BottomNav } from "../components/BottomNav";

const iconMap: Record<string, any> = {
  Activity,
  Brain,
  Users
};

export function Training() {
  const navigate = useNavigate();

  // Convert trainingPackages object to array
  const trainingList = Object.values(trainingPackages);

  return (
    <div className="min-h-screen bg-[#f7f4f2] pb-24">
      {/* Header */}
      <header className="bg-[#f7f4f2] px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
          <div className="text-sm text-[#4b3425]">9:41</div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#4b3425] mb-2">
          心理健身房
        </h1>
        <p className="text-lg text-[rgba(31,22,15,0.64)]">
          三大维度 × 11个训练包，每包分入门/进阶/强化三级
        </p>
      </header>

      <main className="px-4 pb-6">
        {/* 推荐训练顺序 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-5 h-5 text-[#4b3425]" />
            <h2 className="text-xl font-bold text-[#4b3425]">推荐训练顺序</h2>
          </div>
          <p className="text-sm text-[rgba(31,22,15,0.64)] mb-4">
            基于你的测评结果，系统为你推荐以下训练顺序
          </p>
          
          <div className="space-y-3">
            {/* 优先：生物维度 */}
            <div className="bg-[#d4e7b8] rounded-2xl p-5 border-2 border-[#9bb068]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#9bb068] text-white text-xs font-bold px-3 py-1 rounded-full">
                  优先
                </span>
                <span className="font-bold text-[#4b3425]">生物维度·从基础开始</span>
              </div>
              <p className="text-sm text-[#4b3425] mb-3">
                身心联结需要加强，建议从生物维度入门级开始
              </p>
            </div>

            {/* 然后：心理维度 */}
            <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#926247] text-white text-xs font-bold px-3 py-1 rounded-full">
                  然后
                </span>
                <span className="font-bold text-[#4b3425]">心理维度·配合第一个维度同步练习</span>
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">
                在生物维度取得进展后，可以同步训练心理维度
              </p>
            </div>

            {/* 之后：社会维度 */}
            <div className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[rgba(31,22,15,0.24)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  之后
                </span>
                <span className="font-bold text-[#4b3425]">社会维度·视进度开始</span>
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">
                当前两个维度稳定后开始
              </p>
            </div>
          </div>
        </div>

        {/* 生物维度训练包 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#9bb068]" />
            <h2 className="text-xl font-bold text-[#4b3425]">生物维度</h2>
            <span className="text-sm text-[rgba(31,22,15,0.48)]">身体是情绪的载体</span>
          </div>
          <div className="space-y-3">
            {trainingList.filter(t => t.dimension === "生物维度").map((training) => (
              <button
                key={training.id}
                onClick={() => navigate(`/training/${training.id}`)}
                className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] text-left hover:border-[#9bb068] transition-all flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${training.color}20` }}
                >
                  {/* Icon placeholder */}
                  <div className="w-7 h-7" style={{ color: training.color }}>●</div>
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
              </button>
            ))}
          </div>
        </div>

        {/* 心理维度训练包 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-[#926247]" />
            <h2 className="text-xl font-bold text-[#4b3425]">心理维度</h2>
            <span className="text-sm text-[rgba(31,22,15,0.48)]">思维方式决定情绪走向</span>
          </div>
          <div className="space-y-3">
            {trainingList.filter(t => t.dimension === "心理维度").map((training) => (
              <button
                key={training.id}
                onClick={() => navigate(`/training/${training.id}`)}
                className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] text-left hover:border-[#926247] transition-all flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${training.color}20` }}
                >
                  <div className="w-7 h-7" style={{ color: training.color }}>●</div>
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
              </button>
            ))}
          </div>
        </div>

        {/* 社会维度训练包 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#fe814b]" />
            <h2 className="text-xl font-bold text-[#4b3425]">社会维度</h2>
            <span className="text-sm text-[rgba(31,22,15,0.48)]">关系是情绪最大的变量</span>
          </div>
          <div className="space-y-3">
            {trainingList.filter(t => t.dimension === "社会维度").map((training) => (
              <button
                key={training.id}
                onClick={() => navigate(`/training/${training.id}`)}
                className="w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.12)] text-left hover:border-[#fe814b] transition-all flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${training.color}20` }}
                >
                  <div className="w-7 h-7" style={{ color: training.color }}>●</div>
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
              </button>
            ))}
          </div>
        </div>

        {/* 重新测评按钮 */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/deep-assessment")}
            className="w-full py-4 border-2 border-[#4b3425] text-[#4b3425] font-semibold rounded-full"
          >
            重新深化测评
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}