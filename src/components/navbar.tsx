"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DATA } from "@/data/resume";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("/#hero");

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "work", "projects", "certifications", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 80) {
        setActiveTab("/#contact");
        return;
      }

      let currentSection = "/#hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= windowHeight * 0.45) {
            currentSection = `/#${id}`;
          }
        }
      }
      setActiveTab(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setActiveTab(href);
    if (href.startsWith("/#") || href.startsWith("#")) {
      const targetId = href.replace(/^\/?#/, "");
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <nav
        aria-label="Bottom Navigation"
        className="pointer-events-auto relative flex items-center gap-1 p-1 sm:p-1.5 rounded-full border border-black/[0.06] dark:border-white/10 bg-[#ECECEC]/90 dark:bg-[#181818]/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/50 max-w-[calc(100vw-1.5rem)]"
      >
        <TooltipProvider delayDuration={150}>
          {DATA.navbar.map((item) => {
            const isActive = pathname === "/" && activeTab === item.href;
            const Icon = item.icon;

            const buttonContent = (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                aria-label={item.label}
                className={cn(
                  "relative flex items-center gap-2 rounded-full font-medium transition-colors select-none",
                  isActive
                    ? "text-neutral-950 px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-xs sm:text-sm font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 p-2 sm:p-2.5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white shadow-sm shadow-black/10 -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                <Icon
                  className={cn(
                    "size-4.5 sm:size-5 shrink-0 transition-transform duration-200",
                    isActive
                      ? "text-neutral-950 stroke-[2.3] scale-105"
                      : "stroke-[1.8]"
                  )}
                />

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{
                        opacity: { duration: 0.16, delay: 0.04 },
                        width: { duration: 0.22, ease: "easeOut" },
                      }}
                      className="overflow-hidden whitespace-nowrap text-xs sm:text-sm tracking-tight text-neutral-950 font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );

            if (isActive) {
              return <React.Fragment key={item.href}>{buttonContent}</React.Fragment>;
            }

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={10}
                  className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-3 py-1.5 text-xs font-medium shadow-md border-0"
                >
                  <p>{item.label}</p>
                  <TooltipArrow className="fill-neutral-900 dark:fill-white" />
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-800 mx-0.5 sm:mx-1 flex-none" />

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center p-1.5 sm:p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <ModeToggle className="size-4.5 sm:size-5 cursor-pointer" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={10}
              className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-3 py-1.5 text-xs font-medium shadow-md border-0"
            >
              <p>Toggle Theme</p>
              <TooltipArrow className="fill-neutral-900 dark:fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </div>
  );
}
