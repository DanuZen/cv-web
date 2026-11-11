"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { TypingAnimation } from "@/components/ui/typing-animation";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  // Granular build states for each individual part
  const [badgeBuilt, setBadgeBuilt] = useState(false);
  const [descBuilt, setDescBuilt] = useState(false);

  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  // 1. Badge granular swarm listeners
  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;

    const onBuild = () => setBadgeBuilt(true);
    const onReset = () => setBadgeBuilt(false);

    el.addEventListener("swarm:build", onBuild);
    el.addEventListener("swarm:reset", onReset);
    return () => {
      el.removeEventListener("swarm:build", onBuild);
      el.removeEventListener("swarm:reset", onReset);
    };
  }, []);

  // 2. Description (Keterangan) granular swarm listeners
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const onBuild = () => setDescBuilt(true);
    const onReset = () => setDescBuilt(false);

    el.addEventListener("swarm:build", onBuild);
    el.addEventListener("swarm:reset", onReset);
    return () => {
      el.removeEventListener("swarm:build", onBuild);
      el.removeEventListener("swarm:reset", onReset);
    };
  }, []);

  // Reset when scrolled out of view
  useEffect(() => {
    if (!isInView) {
      setBadgeBuilt(false);
      setDescBuilt(false);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-y-5 sm:gap-y-6 items-center justify-center text-center ${className}`}
    >
      {/* Divider with Granular Badge Target (Only badge is targeted, NOT the entire line) */}
      <div className="flex items-center w-full">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView && badgeBuilt ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent origin-right"
        />

        <div
          ref={badgeRef}
          data-swarm-target="true"
          data-swarm-action={`placing ${badge} badge`}
          className="z-10 inline-block px-1"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView && badgeBuilt ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="border bg-primary rounded-xl px-4 py-1.5 shadow-sm"
          >
            <span className="text-background text-xs sm:text-sm font-medium tracking-wide">
              {badge}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView && badgeBuilt ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent origin-left"
        />
      </div>

      {/* Title & Description with Separate Granular Targets */}
      <div className="flex flex-col gap-y-3 items-center justify-center text-center">
        {/* Title (Judul) - targeted directly by TypingAnimation */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center min-h-[40px]">
          <TypingAnimation
            typeSpeed={16}
            delay={20}
            action={`writing ${title}`}
            className="text-3xl font-bold tracking-tighter sm:text-4xl text-center"
          >
            {title}
          </TypingAnimation>
        </h2>

        {/* Description (Keterangan) - targeted as its own separate block */}
        {description && (
          <div
            ref={descRef}
            data-swarm-target="true"
            data-swarm-action="drafting description"
            className="max-w-2xl mx-auto"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView && descBuilt ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
