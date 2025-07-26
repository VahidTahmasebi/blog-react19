"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeStore } from "@/store/theme-store";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    toggleTheme();
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme !== (isDarkMode ? "dark" : "light")) {
      useThemeStore.setState({ isDarkMode: theme === "dark" });
    } else if (theme === "light" && isDarkMode) {
      useThemeStore.setState({ isDarkMode: false });
    }
  }, [theme, isDarkMode]);

  return (
    <Button variant="ghost" size="icon" onClick={handleToggleTheme}>
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="w-5 h-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
