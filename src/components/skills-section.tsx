"use client";

import { useMemo } from "react";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { 
  Layout, 
  Server, 
  Database, 
  Terminal,
  Wrench
} from "lucide-react";

export function SkillsSection({ compact = false }: { compact?: boolean } = {}) {
  const groupedSkills = useMemo(() => {
    return [
      {
        key: "frontend",
        label: "Frontend",
        icon: Layout,
        items: DATA.skills.filter((s) => s.category === "frontend"),
      },
      {
        key: "backend",
        label: "Backend",
        icon: Server,
        items: DATA.skills.filter((s) => s.category === "backend"),
      },
      {
        key: "database",
        label: "Database",
        icon: Database,
        items: DATA.skills.filter((s) => s.category === "database"),
      },
      {
        key: "devops",
        label: "DevOps",
        icon: Terminal,
        items: DATA.skills.filter((s) => s.category === "devops"),
      },
      {
        key: "tools",
        label: "Tools",
        icon: Wrench,
        items: DATA.skills.filter((s) => s.category === "tools"),
      },
    ];
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 lg:gap-y-4.5">
      {groupedSkills.map((cat, idx) => {
        const CategoryIcon = cat.icon;
        return (
          <BlurFade
            key={cat.key}
            delay={idx * 0.03}
            waitForSwarm={true}
            action={`reviewing ${cat.label} stack`}
            className="w-full min-w-0"
          >
            {/* ================= MOBILE COMPACT INLINE FLOW (< lg) ================= */}
            <div className="block lg:hidden text-[9.5px] sm:text-[10.5px] leading-relaxed text-foreground/90">
              <span className="font-semibold text-foreground inline-flex items-center gap-1 mr-1.5 align-baseline">
                <CategoryIcon className="size-2.5 sm:size-3 text-primary flex-none" />
                <span>{cat.label}:</span>
              </span>
              {cat.items.map((skill, sIdx) => {
                const IconComponent = "icon" in skill && skill.icon ? skill.icon : null;
                return (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-0.5 sm:gap-1 text-foreground/90 font-medium whitespace-nowrap align-baseline"
                  >
                    {IconComponent && (
                      <span className="size-2.5 sm:size-3 inline-flex items-center justify-center flex-none">
                        <IconComponent className="size-full object-contain overflow-visible" />
                      </span>
                    )}
                    <span>{skill.name}</span>
                    {sIdx < cat.items.length - 1 && (
                      <span className="mx-1 text-muted-foreground/40 font-normal select-none">·</span>
                    )}
                  </span>
                );
              })}
            </div>

            {/* ================= DESKTOP ORIGINAL LAYOUT (>= lg) ================= */}
            <div className="hidden lg:flex flex-col gap-1.5">
              {/* Category Heading */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
                <CategoryIcon className="size-3.5 text-primary flex-none" />
                <span>{cat.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground/60 font-normal">
                  ({cat.items.length})
                </span>
              </div>

              {/* List of Technologies separated by dots */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground leading-relaxed pl-5">
                {cat.items.map((skill, sIdx) => {
                  const IconComponent = "icon" in skill && skill.icon ? skill.icon : null;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 text-foreground/90 font-medium hover:text-foreground transition-colors"
                    >
                      {IconComponent && (
                        <span className="size-3.5 inline-flex items-center justify-center flex-none">
                          <IconComponent className="size-full object-contain overflow-visible" />
                        </span>
                      )}
                      <span>{skill.name}</span>
                      {sIdx < cat.items.length - 1 && (
                        <span className="text-muted-foreground/40 font-normal select-none">·</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
}
