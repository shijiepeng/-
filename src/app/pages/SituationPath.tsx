import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

// 情境化训练路径配置
const situationPaths = {
  "empty-heart": {
    title: "心里有个地方空了",
    description: "帮你慢慢把那个地方填回来，不是忘掉，是长出新的东西",
    color: "#CFC3EF",
    modules: [
      { id: "stop-rumination", name: "放下脑子里的那个声音", reason: "先停止反复回想" },
      { id: "find-support", name: "找到可以依靠的人", reason: "建立支持系统" },
      { id: "relationship-care", name: "在关系里更自在", reason: "修复关系模式" },
      { id: "cognitive-reframe", name: "换一个角度想想看", reason: "重建思维方式" }
    ]
  },
  "pressure": {
    title: "压力压着我喘不过气",
    description: "不是让你不焦虑，是帮你在焦虑里还能稳稳地走",
    color: "#4b7fb8",
    modules: [
      { id: "body-awareness", name: "听懂身体说的话", reason: "觉察身体的压力信号" },
      { id: "cognitive-reframe", name: "换一个角度想想看", reason: "改变对压力的看法" },
      { id: "sleep-training", name: "夜晚好好睡", reason: "恢复身体能量" },
      { id: "resilience-training", name: "下次会更从容", reason: "提升抗压能力" }
    ]
  },
  "tired-relationship": {
    title: "有些关系让我很累",
    description: "累不是你的错，但你可以练出一点不被消耗的能力",
    color: "#FFC0C0",
    modules: [
      { id: "know-needs", name: "知道自己需要什么", reason: "明确自己的边界" },
      { id: "relationship-care", name: "在关系里更自在", reason: "学会保护自己" },
      { id: "emotion-regulation", name: "找到适合自己的方式", reason: "调节关系中的情绪" }
    ]
  },
  "stay-calm": {
    title: "我想在慌乱时也能稳住",
    description: "稳，是可以练出来的",
    color: "#B5CF80",
    modules: [
      { id: "body-awareness", name: "听懂身体说的话", reason: "快速识别情绪信号" },
      { id: "emotion-regulation", name: "找到适合自己的方式", reason: "建立应急工具箱" },
      { id: "cognitive-reframe", name: "换一个角度想想看", reason: "保持认知清晰" },
      { id: "resilience-training", name: "下次会更从容", reason: "长期提升韧性" }
    ]
  },
  "no-energy": {
    title: "最近提不起劲来",
    description: "不用假装没事，先动一小步就好",
    color: "#7d6b5f",
    modules: [
      { id: "stop-rumination", name: "放下脑子里的那个声音", reason: "打破消极循环" },
      { id: "exercise-emotion", name: "动一动，心也跟着松了", reason: "激活身体能量" },
      { id: "find-support", name: "找到可以依靠的人", reason: "获得支持和陪伴" }
    ]
  },
  "food-complex": {
    title: "我和食物的关系有点复杂",
    description: "很多人都这样，不是意志力的问题",
    color: "#ff6b6b",
    modules: [
      { id: "food-emotion", name: "读懂你和食物的关系", reason: "理解情绪性进食" },
      { id: "emotion-regulation", name: "找到适合自己的方式", reason: "学习替代应对策略" },
      { id: "body-awareness", name: "听懂身体说的话", reason: "区分真饿和假饿" }
    ]
  }
};

export function SituationPath() {
  const navigate = useNavigate();
  const { situationId } = useParams();

  const situation = situationPaths[situationId as keyof typeof situationPaths];

  if (!situation) {
    return <div>情境不存在</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
        </div>

        <div className="mb-4">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
            style={{ backgroundColor: situation.color }}
          >
            情境导向训练路径
          </span>
          <h1 className="text-2xl font-bold text-[#4b3425] mb-3">
            {situation.title}
          </h1>
          <p className="text-[rgba(31,22,15,0.64)] leading-relaxed">
            {situation.description}
          </p>
        </div>
      </header>

      {/* Training Path */}
      <main className="px-4 py-6 pb-24">
        <h2 className="text-lg font-bold text-[#4b3425] mb-4">
          为你推荐的训练路径
        </h2>

        <div className="relative">
          {/* Connection Line */}
          <div 
            className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-[rgba(31,22,15,0.12)] to-transparent"
          />

          <div className="space-y-4">
            {situation.modules.map((module, index) => (
              <div key={module.id} className="relative">
                <button
                  onClick={() => navigate(`/training/${module.id}`)}
                  className="w-full bg-white rounded-2xl p-5 text-left transition-all hover:scale-[1.01] border-2 border-[rgba(31,22,15,0.12)] hover:border-[#B5CF80]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#f7f4f2] flex items-center justify-center border-2 border-white relative z-10">
                      <span className="text-lg font-bold text-[#4b3425]">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                      <h3 className="font-bold text-[#4b3425] mb-2">
                        {module.name}
                      </h3>
                      <p className="text-sm text-[rgba(31,22,15,0.64)] mb-3">
                        {module.reason}
                      </p>
                      <div className="inline-flex items-center gap-1 text-xs font-semibold"
                        style={{ color: situation.color }}
                      >
                        开始训练
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path 
                            d="M4 2l4 4-4 4" 
                            stroke="currentColor"
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-[#FFDD5B]/10 rounded-2xl p-5 border-0">
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">训练建议：</span>
            按照推荐顺序完成训练，每个模块都有入门/进阶/强化三级。你可以根据自己的节奏调整进度。
          </p>
        </div>

        {/* Back to Dimension Training */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/training")}
            className="w-full py-4 border-2 border-[rgba(31,22,15,0.24)] text-[#4b3425] font-semibold rounded-full"
          >
            查看全部训练模块
          </button>
        </div>
      </main>
    </div>
  );
}