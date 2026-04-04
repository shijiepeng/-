import { useNavigate } from "react-router";
import { ArrowLeft, Heart, CloudRain, UserX, Zap, Coffee, Flame, Lightbulb } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

export function Situations() {
  const navigate = useNavigate();

  const situations = [
    {
      id: "empty-heart",
      title: "心里有个地方空了",
      subtitle: "帮你慢慢把那个地方填回来",
      description: "适合感到空虚、失落、没有目标的时刻",
      icon: Heart,
      color: "#926247",
      bgColor: "#e8d5ca",
    },
    {
      id: "pressure",
      title: "压力压着我喘不过气",
      subtitle: "帮你在焦虑里还能稳稳地走",
      description: "适合压力大、焦虑、紧张的状态",
      icon: CloudRain,
      color: "#4b7fb8",
      bgColor: "#d4e7f5",
    },
    {
      id: "tired-relationship",
      title: "有些关系让我很累",
      subtitle: "练出一点不被消耗的能力",
      description: "适合人际关系困扰、感到被消耗的情况",
      icon: UserX,
      color: "#fe814b",
      bgColor: "#ffe4d6",
    },
    {
      id: "stay-calm",
      title: "我想在慌乱时也能稳住",
      subtitle: "稳，是可以练出来的",
      description: "适合从容面对慌乱、情绪波动大的时候",
      icon: Zap,
      color: "#9bb068",
      bgColor: "#d4e7b8",
    },
    {
      id: "no-energy",
      title: "最近提不起劲来",
      subtitle: "不用假装没事，先动一小步就好",
      description: "适合感到疲惫、缺乏动力的状态",
      icon: Coffee,
      color: "#7d6b5f",
      bgColor: "#e5ddd8",
    },
    {
      id: "food-complex",
      title: "我和食物的关系有点复杂",
      subtitle: "很多人都这样，不是意志力的问题",
      description: "适合情绪化进食、与食物关系困扰的情况",
      icon: Flame,
      color: "#ff6b6b",
      bgColor: "#ffe5e5",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4f2] pb-24">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#4b3425] mb-2">
          选择你的困扰
        </h1>
        <p className="text-sm text-[rgba(31,22,15,0.64)]">
          针对具体情境的训练方案
        </p>
      </header>

      <main className="px-4 py-6">
        <div className="space-y-4">
          {situations.map((situation) => (
            <button
              key={situation.id}
              onClick={() => navigate(`/situation/${situation.id}`)}
              className="w-full rounded-2xl p-5 text-left transition-all hover:scale-[1.02] border-2"
              style={{
                backgroundColor: situation.bgColor,
                borderColor: situation.color,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "white" }}
                >
                  <situation.icon
                    className="w-7 h-7"
                    style={{ color: situation.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#4b3425] mb-1">
                    {situation.title}
                  </h3>
                  <p className="text-sm text-[#4b3425] mb-2 font-medium">
                    {situation.subtitle}
                  </p>
                  <p className="text-xs text-[rgba(31,22,15,0.64)]">
                    {situation.description}
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="flex-shrink-0 mt-2"
                >
                  <path
                    d="M7 4l6 6-6 6"
                    stroke={situation.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-[#fff9f0] rounded-2xl p-5 border border-[#ffd89b]">
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold flex items-center gap-1"><Lightbulb className="w-4 h-4" /> 提示：</span>
            这些情境训练是从三大维度（生物/心理/社会）中精选出来的组合方案，
            帮助你针对性地应对具体困扰。
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
