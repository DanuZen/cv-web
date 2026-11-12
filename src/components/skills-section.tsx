"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DATA } from "@/data/resume";
import { MagicCard } from "@/components/ui/magic-card";
import BlurFade from "@/components/magicui/blur-fade";
import { 
  Sparkles, 
  Layout, 
  Server, 
  Database, 
  Terminal,
  Wrench,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryKey = "all" | "frontend" | "backend" | "database" | "devops" | "tools";

interface CategoryFilter {
  key: CategoryKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

export function SkillsSection({ compact = false }: { compact?: boolean } = {}) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const categories: CategoryFilter[] = useMemo(() => {
    const total = DATA.skills.length;
    const frontendCount = DATA.skills.filter((s) => s.category === "frontend").length;
    const backendCount = DATA.skills.filter((s) => s.category === "backend").length;
    const dbCount = DATA.skills.filter((s) => s.category === "database").length;
    const devopsCount = DATA.skills.filter((s) => s.category === "devops").length;
    const toolsCount = DATA.skills.filter((s) => s.category === "tools").length;

    return [
      { key: "all", label: "All Stacks", icon: Sparkles, count: total },
      { key: "frontend", label: "Frontend", icon: Layout, count: frontendCount },
      { key: "backend", label: "Backend", icon: Server, count: backendCount },
      { key: "database", label: "Database", icon: Database, count: dbCount },
      { key: "devops", label: "DevOps", icon: Terminal, count: devopsCount },
      { key: "tools", label: "Tools", icon: Wrench, count: toolsCount },
    ];
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return DATA.skills;
    return DATA.skills.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className={cn("w-full flex flex-col", compact ? "items-start gap-y-4 sm:gap-y-5" : "items-center gap-y-7 sm:gap-y-8")}>
      {/* Category Filter Tabs with Sliding Active Pill */}
      <BlurFade waitForSwarm={true} action="filtering technologies" delay={0.02} className="w-full">
        <div className={cn(
          "flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-border/60 backdrop-blur-md shadow-xs max-w-full",
          compact ? "justify-start" : "justify-center"
        )}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "relative flex items-center transition-colors cursor-pointer outline-none select-none",
                  compact
                    ? "gap-1.5 px-2.5 py-1 text-xs rounded-lg"
                    : "gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm",
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId={compact ? "activeSkillTabCompact" : "activeSkillTab"}
                    className={cn("absolute inset-0 bg-primary shadow-sm z-0", compact ? "rounded-lg" : "rounded-xl")}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  <Icon className={cn(compact ? "size-3 sm:size-3.5" : "size-3.5 sm:size-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {cat.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </BlurFade>

      {/* Grid of Skill Badges with MagicCard Spotlight */}
      <BlurFade waitForSwarm={true} action="tagging tech stack" className="w-full">
        <motion.div
          layout
          className={cn(
            "flex flex-wrap py-1",
            compact ? "gap-2 sm:gap-2.5 justify-start w-full" : "gap-2.5 sm:gap-3.5 justify-center max-w-4xl mx-auto"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = "icon" in skill && skill.icon ? skill.icon : null;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group"
                >
                  <MagicCard
                    gradientSize={compact ? 120 : 150}
                    gradientOpacity={0.2}
                    className={cn(
                      "border border-border/70 hover:border-primary/40 bg-background/80 hover:bg-muted/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-default",
                      compact ? "rounded-xl" : "rounded-2xl"
                    )}
                  >
                    <div className={cn(
                      "flex items-center",
                      compact ? "gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2" : "gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5"
                    )}>
                      {IconComponent && (
                        <div className={cn(
                          "rounded-lg bg-muted/50 border border-border/40 p-1 flex items-center justify-center flex-none group-hover:scale-110 group-hover:bg-muted transition-transform duration-200 shadow-2xs",
                          compact ? "size-5 sm:size-6" : "size-6 sm:size-7"
                        )}>
                          <IconComponent className="size-full object-contain overflow-visible" />
                        </div>
                      )}
                      <span className={cn(
                        "text-foreground font-semibold tracking-tight whitespace-nowrap",
                        compact ? "text-xs" : "text-xs sm:text-sm"
                      )}>
                        {skill.name}
                      </span>
                    </div>
                  </MagicCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </BlurFade>

      {/* Modern Bottom Quality Assurance Indicator */}
      <BlurFade waitForSwarm={true} action="verifying stack readiness" delay={0.06} className="w-full">
        <div className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground/80 mt-1",
          compact ? "justify-start text-left px-0.5" : "justify-center text-center px-2"
        )}>
          <CheckCircle2 className="size-3.5 text-emerald-500 flex-none" />
          <span>All {DATA.skills.length} technologies actively used in high-traffic production environments</span>
        </div>
      </BlurFade>
    </div>
  );
}
