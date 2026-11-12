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
  duration = 0.55,
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

  // Fail-safe: If in view and swarm hasn't triggered after 3000ms, auto-trigger so content is never hidden
  useEffect(() => {
    if (!waitForSwarm || swarmTriggered) return;
    if (!inViewResult) return;

    const timer = setTimeout(() => {
      setSwarmTriggered(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [waitForSwarm, swarmTriggered, inViewResult]);

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
      data-swarm-status={waitForSwarm ? (swarmTriggered ? "built" : "idle") : undefined}
      initial="hidden"
      animate={shouldBeVisible ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: waitForSwarm ? 0.02 : delay,
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
