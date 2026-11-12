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
    <div className="w-full flex flex-col gap-y-2.5 sm:gap-y-3.5 lg:gap-y-4.5">
      {groupedSkills.map((cat, idx) => {
        const CategoryIcon = cat.icon;
        return (
          <BlurFade
            key={cat.key}
            delay={idx * 0.03}
            waitForSwarm={true}
            action={`reviewing ${cat.label} stack`}
            className="flex flex-col gap-0.5 sm:gap-1 lg:gap-1.5"
          >
            {/* Category Heading */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] lg:text-xs font-semibold text-foreground tracking-tight">
              <CategoryIcon className="size-3 sm:size-3.5 text-primary flex-none" />
              <span>{cat.label}</span>
              <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-mono text-muted-foreground/60 font-normal">
                ({cat.items.length})
              </span>
            </div>

            {/* List of Technologies separated by dots */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 sm:gap-x-2 sm:gap-y-1 text-[9.5px] sm:text-[11px] lg:text-xs text-muted-foreground leading-relaxed pl-1.5 sm:pl-3 lg:pl-5">
              {cat.items.map((skill, sIdx) => {
                const IconComponent = "icon" in skill && skill.icon ? skill.icon : null;
                return (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-foreground/90 font-medium hover:text-foreground transition-colors"
                  >
                    {IconComponent && (
                      <span className="size-3 sm:size-3.5 inline-flex items-center justify-center flex-none">
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
          </BlurFade>
        );
      })}
    </div>
  );
}
