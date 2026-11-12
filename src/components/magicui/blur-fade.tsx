"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
  once?: boolean;
  waitForSwarm?: boolean;
  action?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.32,
  delay = 0,
  yOffset = 8,
  inView = true,
  inViewMargin = "0px",
  blur = "4px",
  once = false,
  waitForSwarm = false,
  action = "revealing component",
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, {
    once,
    amount: 0.05,
    ...(inViewMargin ? { margin: inViewMargin as any } : {}),
  });

  const [swarmTriggered, setSwarmTriggered] = useState(!waitForSwarm);

  // Synchronize state during render when scrolled out of view (React standard pattern)
  const [prevInView, setPrevInView] = useState(inViewResult);
  if (prevInView !== inViewResult) {
    setPrevInView(inViewResult);
    if (!inViewResult && !once && waitForSwarm) {
      setSwarmTriggered(false);
    }
  }

  useEffect(() => {
    if (!waitForSwarm) return;
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleBuild = () => {
      setSwarmTriggered(true);
      el.dataset.swarmStatus = "building";
      timer = setTimeout(() => {
        if (el) {
          el.dataset.swarmStatus = "built";
          el.dispatchEvent(new CustomEvent("swarm:completed"));
        }
      }, (duration + delay) * 1000 + 100);
    };

    const handleReset = () => {
      if (!once) {
        setSwarmTriggered(false);
        el.dataset.swarmStatus = "idle";
        if (timer) clearTimeout(timer);
      }
    };

    el.addEventListener("swarm:build", handleBuild);
    el.addEventListener("swarm:reset", handleReset);

    return () => {
      el.removeEventListener("swarm:build", handleBuild);
      el.removeEventListener("swarm:reset", handleReset);
      if (timer) clearTimeout(timer);
    };
  }, [waitForSwarm, once, duration, delay]);

  // Fast-reveal: Content is revealed immediately on inView, swarm follows seamlessly as an overlay
  const shouldBeVisible = inView ? inViewResult : true;

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})`, scale: 0.98 },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      data-swarm-target={waitForSwarm ? "true" : undefined}
      data-swarm-action={waitForSwarm ? action : undefined}
      data-swarm-status={
        waitForSwarm
          ? swarmTriggered
            ? "built"
            : inViewResult
              ? "building"
              : "idle"
          : undefined
      }
      initial="hidden"
      animate={shouldBeVisible ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
