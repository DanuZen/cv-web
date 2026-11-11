"use client";

import { AnimatedThemeToggler, type TransitionVariant } from "@/components/ui/animated-theme-toggler";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
  variant?: TransitionVariant;
}

export function ModeToggle({ className, variant = "circle" }: ModeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = (theme === "system" ? resolvedTheme : theme) as "light" | "dark" | undefined;

  return (
    <AnimatedThemeToggler
      theme={currentTheme ?? "light"}
      onThemeChange={(newTheme) => setTheme(newTheme)}
      variant={variant}
      duration={500}
      className={cn("size-full p-0 flex items-center justify-center", className)}
    />
  );
}

export default ModeToggle;
