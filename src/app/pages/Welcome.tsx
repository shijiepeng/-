import { useNavigate } from "react-router";
import { Target, TrendingUp } from "lucide-react";
import { useAssessment } from "../store";

export function Welcome() {
  const navigate = useNavigate();
  const { clearAssessment } = useAssessment();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9bb068] to-[#f7f4f2] flex flex-col">
      {/* Header */}
      <header className="relative px-4 pt-12 pb-8">
        {/* icon.png as background on left */}
        <img
          src="/image/icon.png"
          alt=""
          className="absolute left-0 top-8 w-48 h-48 object-contain"
        />

        {/* White circle with mentalgym */}
        <div className="relative z-10 w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
          <img src="/image/mentalgym.png" alt="心理健身房" className="w-20 h-20 object-contain" />
        </div>

        {/* icon2.png on right of circle */}
        <img
          src="/image/icon2.png"
          alt=""
          className="absolute right-0 top-8 w-48 h-48 object-contain"
        />

        <p className="relative z-10 text-lg text-white/90 text-center">
          练出更好的自己，从情绪开始
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-t-[32px] px-4 pt-8 pb-24">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#4b3425] mb-6 text-center">
            欢迎来到心理健身房
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4 p-4 bg-[#f7f4f2] rounded-2xl">
              <div className="w-12 h-12 bg-[#9bb068]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-[#9bb068]" />
              </div>
              <div>
                <h3 className="font-bold text-[#4b3425] mb-1">系统化训练</h3>
                <p className="text-sm text-[rgba(31,22,15,0.64)]">
                  基于生物-心理-社会模型，从三个维度提升情绪能力
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-[#f7f4f2] rounded-2xl">
              <div className="w-12 h-12 bg-[#926247]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#926247]" />
              </div>
              <div>
                <h3 className="font-bold text-[#4b3425] mb-1">可视化进步</h3>
                <p className="text-sm text-[rgba(31,22,15,0.64)]">
                  即时反馈训练效果，看见自己的每一次成长
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-[#f7f4f2] rounded-2xl">
              <div className="w-12 h-12 bg-[#fe814b]/20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/image/icon2.png" alt="icon" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-[#4b3425] mb-1">温柔陪伴</h3>
                <p className="text-sm text-[rgba(31,22,15,0.64)]">
                  每一次练习，都是对自己更温柔一点
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                clearAssessment();
                navigate("/assessment");
              }}
              className="w-full bg-[#4b3425] text-white py-4 rounded-full font-semibold text-lg shadow-lg"
            >
              开始情绪体能测评
            </button>
            <button
              onClick={() => navigate("/home")}
              className="w-full py-4 text-[rgba(31,22,15,0.64)] font-medium hover:text-[#4b3425] hover:bg-[#f7f4f2] rounded-full transition-all cursor-pointer"
            >
              稍后再说，先看看
            </button>

            <div className="bg-[#fff9f0] rounded-2xl p-5 border border-[#ffd89b] mt-4">
              <h3 className="font-bold text-[#4b3425] mb-2">开始之前</h3>
              <ul className="space-y-2 text-sm text-[#4b3425]">
                <li>• 这里不治病，不替代心理咨询</li>
                <li>• 帮你在日常生活中提升情绪调节能力</li>
                <li>• 就像Keep帮你提升身体素质一样</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-center text-[rgba(31,22,15,0.48)] mt-6">
            测评约需3分钟，系统会为你匹配专属训练方向
          </p>
        </div>
      </main>
    </div>
  );
}