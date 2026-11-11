"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { TypewriterText } from "@/components/ui/typewriter-text";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onBuild = () => setBuilt(true);
    const onReset = () => setBuilt(false);

    el.addEventListener("swarm:build", onBuild);
    el.addEventListener("swarm:reset", onReset);
    return () => {
      el.removeEventListener("swarm:build", onBuild);
      el.removeEventListener("swarm:reset", onReset);
    };
  }, []);

  // Safety net
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInView && !built) {
      timer = setTimeout(() => setBuilt(true), 1300);
    } else if (!isInView) {
      setBuilt(false);
    }
    return () => clearTimeout(timer);
  }, [isInView, built]);

  const active = isInView && built;

  return (
    <div
      ref={ref}
      data-swarm-target="true"
      data-swarm-action={`introducing ${badge}`}
      className={`flex flex-col gap-y-5 sm:gap-y-6 items-center justify-center text-center ${className}`}
    >
      {/* Divider with Center Badge */}
      <div className="flex items-center w-full">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent origin-right"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "backOut" }}
          className="border bg-primary z-10 rounded-xl px-4 py-1.5 shadow-sm"
        >
          <span className="text-background text-xs sm:text-sm font-medium tracking-wide">
            {badge}
          </span>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent origin-left"
        />
      </div>

      {/* Title with Typewriter & Subtitle */}
      <div className="flex flex-col gap-y-3 items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center min-h-[40px]">
          <TypewriterText text={title} speed={25} delay={120} repeatOnScroll={true} />
        </h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
