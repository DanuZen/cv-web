"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { TypingAnimation } from "@/components/ui/typing-animation";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  compact?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
  align = "center",
  compact = false,
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  // Granular build states for each individual part
  const [badgeBuilt, setBadgeBuilt] = useState(false);
  const [descBuilt, setDescBuilt] = useState(false);

  // Synchronize state during render when scrolled out of view
  const [prevInView, setPrevInView] = useState(isInView);
  if (prevInView !== isInView) {
    setPrevInView(isInView);
    if (!isInView) {
      setBadgeBuilt(false);
      setDescBuilt(false);
    }
  }

  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  // 1. Badge granular swarm listeners
  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const onBuild = () => {
      setBadgeBuilt(true);
      el.dataset.swarmStatus = "building";
      timer = setTimeout(() => {
        if (el) {
          el.dataset.swarmStatus = "built";
          el.dispatchEvent(new CustomEvent("swarm:completed"));
        }
      }, 550);
    };

    const onReset = () => {
      setBadgeBuilt(false);
      el.dataset.swarmStatus = "idle";
      if (timer) clearTimeout(timer);
    };

    el.addEventListener("swarm:build", onBuild);
    el.addEventListener("swarm:reset", onReset);
    return () => {
      el.removeEventListener("swarm:build", onBuild);
      el.removeEventListener("swarm:reset", onReset);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 2. Description (Keterangan) granular swarm listeners
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const onBuild = () => {
      setDescBuilt(true);
      el.dataset.swarmStatus = "building";
      timer = setTimeout(() => {
        if (el) {
          el.dataset.swarmStatus = "built";
          el.dispatchEvent(new CustomEvent("swarm:completed"));
        }
      }, 550);
    };

    const onReset = () => {
      setDescBuilt(false);
      el.dataset.swarmStatus = "idle";
      if (timer) clearTimeout(timer);
    };

    el.addEventListener("swarm:build", onBuild);
    el.addEventListener("swarm:reset", onReset);
    return () => {
      el.removeEventListener("swarm:build", onBuild);
      el.removeEventListener("swarm:reset", onReset);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (align === "left") {
    return (
      <div
        ref={containerRef}
        className={`flex flex-col ${
          compact ? "gap-y-1.5 sm:gap-y-2.5 lg:gap-y-3.5" : "gap-y-3 sm:gap-y-3.5"
        } items-start text-left w-full ${className}`}
      >
        {/* Divider with Granular Badge Target (Left-aligned badge with line extending right) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 w-full">
          <div
            ref={badgeRef}
            data-swarm-target="true"
            data-swarm-status={badgeBuilt ? "built" : (isInView ? "building" : "idle")}
            data-swarm-action="placing badge"
            className="z-10 inline-block flex-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className={
                compact
                  ? "border border-white/80 dark:border-white/70 bg-linear-to-b from-white via-neutral-100 to-neutral-200 dark:from-white dark:via-neutral-100 dark:to-neutral-200 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-0.5 lg:px-3 lg:py-1 shadow-[0_1px_3px_rgba(0,0,0,0.12)] dark:shadow-[0_0_10px_rgba(255,255,255,0.12)] inline-flex items-center justify-center flex-none"
                  : "border border-white/80 dark:border-white/70 bg-linear-to-b from-white via-neutral-100 to-neutral-200 dark:from-white dark:via-neutral-100 dark:to-neutral-200 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 shadow-xs inline-flex items-center justify-center flex-none"
              }
            >
              <span
                className={
                  compact
                    ? "text-neutral-950 text-[8.5px] sm:text-[10px] md:text-[11px] lg:text-xs font-semibold tracking-wide whitespace-nowrap"
                    : "text-neutral-950 text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap"
                }
              >
                {badge}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 h-px bg-linear-to-r from-border/80 via-border/40 to-transparent origin-left"
          />
        </div>

        {/* Title & Description with Separate Granular Targets */}
        <div className="flex flex-col gap-y-0.5 sm:gap-y-1 lg:gap-y-1.5 items-start text-left w-full">
          <h2
            className={
              compact
                ? "text-xs sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight text-left min-h-[18px] sm:min-h-[24px] lg:min-h-[32px] leading-snug"
                : "text-xl sm:text-2xl font-bold tracking-tight text-left min-h-[28px] sm:min-h-[32px]"
            }
          >
            <TypingAnimation
              typeSpeed={18}
              delay={20}
              action="writing heading"
              className={
                compact
                  ? "text-xs sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight text-left leading-snug"
                  : "text-xl sm:text-2xl font-bold tracking-tight text-left"
              }
            >
              {title}
            </TypingAnimation>
          </h2>

          {description && (
            <div
              ref={descRef}
              data-swarm-target="true"
              data-swarm-status={descBuilt ? "built" : (isInView ? "building" : "idle")}
              data-swarm-action="drafting description"
              className="w-full"
            >
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={
                  compact
                    ? "text-muted-foreground text-[9.5px] sm:text-xs lg:text-sm leading-relaxed text-left"
                    : "text-muted-foreground text-xs sm:text-sm leading-relaxed text-left"
                }
              >
                {description}
              </motion.p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-y-7 sm:gap-y-6 items-center justify-center text-center ${className}`}
    >
      {/* Divider with Granular Badge Target (Only badge is targeted, NOT the entire line) */}
      <div className="flex items-center w-full">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent origin-right"
        />

        <div
          ref={badgeRef}
          data-swarm-target="true"
          data-swarm-status={badgeBuilt ? "built" : (isInView ? "building" : "idle")}
          data-swarm-action="placing badge"
          className="z-10 inline-block px-1"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="border border-white/80 dark:border-white/70 bg-linear-to-b from-white via-neutral-100 to-neutral-200 dark:from-white dark:via-neutral-100 dark:to-neutral-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.12)] dark:shadow-[0_0_12px_rgba(255,255,255,0.12)] inline-flex items-center justify-center"
          >
            <span className="text-neutral-950 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
              {badge}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent origin-left"
        />
      </div>

      {/* Title & Description with Separate Granular Targets */}
      <div className="flex flex-col gap-y-2.5 sm:gap-y-3 items-center justify-center text-center w-full max-w-full">
        {/* Title (Judul) - targeted directly by TypingAnimation */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center min-h-[34px] sm:min-h-[40px] px-2 sm:px-0">
          <TypingAnimation
            typeSpeed={18}
            delay={20}
            action="writing heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center"
          >
            {title}
          </TypingAnimation>
        </h2>

        {/* Description (Keterangan) - targeted as its own separate block */}
        {description && (
          <div
            ref={descRef}
            data-swarm-target="true"
            data-swarm-status={descBuilt ? "built" : (isInView ? "building" : "idle")}
            data-swarm-action="drafting description"
            className="max-w-2xl mx-auto px-2 sm:px-0"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-muted-foreground text-xs sm:text-base md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
