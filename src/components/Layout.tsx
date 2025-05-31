import { Link, useLocation, Outlet } from "react-router";
import { cn } from "@/lib/utils";

export const Layout = () => {
  const location = useLocation();

  const tabs = [
    { path: "/", label: "홈", icon: "🏠" },
    { path: "/study", label: "학습", icon: "📚" },
    { path: "/setting", label: "설정", icon: "⚙️" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16 relative">
          {tabs.map((tab, index) => {
            const isActive = location.pathname === tab.path;
            const isMiddle = index === 1; // 가운데 탭

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center justify-center",
                  isMiddle
                    ? "absolute -top-4 transform -translate-y-1/2 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg z-10"
                    : "w-full h-full",
                  isActive && !isMiddle && "text-blue-600",
                  !isActive && !isMiddle && "text-gray-600"
                )}
              >
                <span className={cn("text-xl", isMiddle && "text-2xl")}>
                  {tab.icon}
                </span>
                {!isMiddle && <span className="text-xs mt-1">{tab.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
