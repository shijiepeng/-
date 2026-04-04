import { useNavigate } from "react-router";
import { ArrowLeft, Moon, Bell, Shield, Info, Trash2 } from "lucide-react";

export function Settings() {
  const navigate = useNavigate();

  const handleClearData = () => {
    if (window.confirm("确定要清除所有数据吗？此操作不可恢复。")) {
      localStorage.removeItem("mental-gym-store");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
          <h1 className="text-xl font-bold text-[#4b3425]">设置</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* About Section */}
        <div>
          <h2 className="text-sm font-semibold text-[rgba(31,22,15,0.48)] mb-3 px-1">
            关于
          </h2>
          <div className="bg-white rounded-2xl border-2 border-[rgba(31,22,15,0.08)] overflow-hidden">
            <button
              className="w-full p-4 flex items-center gap-3 hover:bg-[#f7f4f2] transition-colors text-left border-b border-[rgba(31,22,15,0.06)]"
              onClick={() =>
                alert("心理健身房 v1.0.0\n基于生物-心理-社会模型的情绪训练应用")
              }
            >
              <div className="w-10 h-10 rounded-full bg-[#d4e7b8] flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#9bb068]" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-[#4b3425]">版本信息</span>
                <p className="text-xs text-[rgba(31,22,15,0.48)]">v1.0.0</p>
              </div>
            </button>

            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fff9f0] flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#fe814b]" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-[#4b3425]">隐私说明</span>
                <p className="text-xs text-[rgba(31,22,15,0.48)] mt-0.5">
                  所有数据仅存储在本地设备中
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div>
          <h2 className="text-sm font-semibold text-[rgba(31,22,15,0.48)] mb-3 px-1">
            数据管理
          </h2>
          <div className="bg-white rounded-2xl border-2 border-[rgba(31,22,15,0.08)] overflow-hidden">
            <button
              onClick={handleClearData}
              className="w-full p-4 flex items-center gap-3 hover:bg-[#fff5f5] transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-[#d4183d]" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-[#d4183d]">清除所有数据</span>
                <p className="text-xs text-[rgba(31,22,15,0.48)] mt-0.5">
                  删除所有本地记录，此操作不可恢复
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#fff9f0] rounded-2xl p-5 border border-[#ffd89b]">
          <h3 className="font-bold text-[#4b3425] mb-2 text-sm">免责声明</h3>
          <ul className="text-xs text-[rgba(31,22,15,0.64)] space-y-1.5 leading-relaxed">
            <li>· 心理健身房不提供医疗诊断或治疗服务</li>
            <li>· 不替代专业心理咨询或精神科治疗</li>
            <li>· 如有严重情绪问题，请寻求专业帮助</li>
            <li>· 本应用旨在帮助提升日常情绪调节能力</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="text-center py-4">
          <p className="text-xs text-[rgba(31,22,15,0.32)]">
            每天记录心情，坚持训练，你会看到改变
          </p>
        </div>
      </main>
    </div>
  );
}
