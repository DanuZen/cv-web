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
  duration = 0.45,
  delay = 0,
  yOffset = 16,
  inView = true,
  inViewMargin = "-20px",
  blur = "8px",
  once = false,
  waitForSwarm = false,
  action = "revealing component",
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, {
    once,
    amount: 0.1,
    ...(inViewMargin ? { margin: inViewMargin as any } : {}),
  });

  const [swarmTriggered, setSwarmTriggered] = useState(!waitForSwarm);

  useEffect(() => {
    if (!waitForSwarm) return;
    const el = ref.current;
    if (!el) return;

    const handleBuild = () => {
      setSwarmTriggered(true);
    };

    const handleReset = () => {
      if (!once) {
        setSwarmTriggered(false);
      }
    };

    el.addEventListener("swarm:build", handleBuild);
    el.addEventListener("swarm:reset", handleReset);

    return () => {
      el.removeEventListener("swarm:build", handleBuild);
      el.removeEventListener("swarm:reset", handleReset);
    };
  }, [waitForSwarm, once]);

  // Reset when scrolled out of view
  useEffect(() => {
    if (!waitForSwarm) return;
    if (!inViewResult && !once) {
      setSwarmTriggered(false);
    }
  }, [inViewResult, waitForSwarm, once]);

  const shouldBeVisible = inView
    ? inViewResult && (waitForSwarm ? swarmTriggered : true)
    : true;

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})`, scale: 0.96 },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      data-swarm-target={waitForSwarm ? "true" : undefined}
      data-swarm-action={waitForSwarm ? action : undefined}
      initial="hidden"
      animate={shouldBeVisible ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: 0.02 + delay,
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
