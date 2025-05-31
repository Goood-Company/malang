import { Link, useLocation, Outlet } from "react-router";
import { cn } from "@/lib/utils";
import StudyBottomSheet from "./study-bottom-sheet";
import { useState } from "react";

export default function Layout() {
  const location = useLocation();

  const [isBottomSheetOn, setIsBottomSheetOn] = useState<boolean>(false);

  const tabs = [
    { path: "/", label: "홈", icon: "🏠" },
    { path: "/study-1", label: "학습", icon: "📚" },
    { path: "/setting", label: "설정", icon: "⚙️" },
  ];

  const handleClickMiddle = () => {
    setIsBottomSheetOn(true);
  };

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

            const baseClasses = cn(
              "flex flex-col items-center justify-center",
              isMiddle
                ? "absolute -top-4 transform -translate-y-1/2 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg z-10"
                : "w-full h-full",
              isActive && !isMiddle && "text-blue-600",
              !isActive && !isMiddle && "text-gray-600"
            );

            if (isMiddle) {
              return (
                <button
                  type="button"
                  key={tab.path}
                  onClick={handleClickMiddle}
                  className={baseClasses}
                >
                  <span className="text-2xl">{tab.icon}</span>
                </button>
              );
            }

            return (
              <Link key={tab.path} to={tab.path} className={baseClasses}>
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <StudyBottomSheet
        isOpen={isBottomSheetOn}
        close={() => setIsBottomSheetOn(false)}
      />
    </div>
  );
}
