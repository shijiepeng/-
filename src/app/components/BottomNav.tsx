import { useNavigate, useLocation } from "react-router";
import { Home, Dumbbell, Plus, ClipboardList, User } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "主页", icon: Home, route: "/home" },
    { id: "training", label: "训练", icon: Dumbbell, route: "/training" },
    { id: "record", label: "记录", icon: Plus, route: "/mood-record" },
    { id: "assessment", label: "测评", icon: ClipboardList, route: "/assessment" },
    { id: "profile", label: "我的", icon: User, route: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(31,22,15,0.12)] z-50">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;
          const isCenter = item.id === "record";

          if (isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className="flex flex-col items-center justify-center relative -mt-6"
              >
                <img src="/image/icon.png" alt="记录" className="w-18 h-18 object-contain" />
                <span className="text-xs text-[#4b3425] mt-1 font-medium">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="flex flex-col items-center justify-center py-2 px-3 min-w-[60px]"
            >
              <Icon
                className="w-6 h-6 mb-1"
                style={{ color: isActive ? "#9bb068" : "rgba(31,22,15,0.48)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: isActive ? "#9bb068" : "rgba(31,22,15,0.64)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
