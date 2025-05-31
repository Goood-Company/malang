import Button from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function TestColor() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      컬러 팔레트
      <Button variant="secondary" onClick={toggleTheme}>
        {isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </Button>
      <div className="bg-primary">primary</div>
      <div className="bg-primary-light">primary-light</div>
      <div className="bg-error">error</div>
      <div className="bg-error-light">error-light</div>
      <div className="bg-success">success</div>
      <div className="bg-success-light">success-light</div>
      <div className="bg-warning">warning</div>
      <div className="bg-warning-light">warning-light</div>
      <div className="bg-text-primary text-background-1">text-primary</div>
      <div className="bg-text-secondary text-background-1">text-secondary</div>
      <div className="bg-text-tertiary text-background-1">text-tertiary</div>
      <div className="bg-text-quaternary">text-quaternary</div>
      <div className="bg-text-disabled">text-disabled</div>
      <div className="bg-text-placeholder">text-placeholder</div>
      <div className="bg-divider-1">divider-1</div>
      <div className="bg-divider-2">divider-2</div>
      <div className="bg-background-1">background-1</div>
      <div className="bg-background-2">background-2</div>
      <div className="bg-background-3 text-background-1">background-3</div>
      <div className="bg-background-dim-1">background-dim-1</div>
      <div className="bg-background-dim-2">background-dim-2</div>
      <div className="bg-background-dim-3">background-dim-3</div>
    </div>
  );
}
