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
  const [isBuilt, setIsBuilt] = useState(false);

  // Synchronize state during render when scrolled out of view (React standard pattern)
  const [prevInView, setPrevInView] = useState(inViewResult);
  if (prevInView !== inViewResult) {
    setPrevInView(inViewResult);
    if (!inViewResult && !once && waitForSwarm) {
      setSwarmTriggered(false);
      setIsBuilt(false);
    }
  }

  // Handle DOM swarmStatus update when scrolled out of view
  useEffect(() => {
    if (!inViewResult && !once && waitForSwarm) {
      if (ref.current) {
        ref.current.dataset.swarmStatus = "idle";
      }
    }
  }, [inViewResult, once, waitForSwarm]);

  // Fail-safe: If in view and swarm hasn't triggered after 900ms, auto-reveal
  useEffect(() => {
    if (!waitForSwarm || swarmTriggered) return;
    if (!inViewResult) return;

    const autoTimer = setTimeout(() => {
      setSwarmTriggered(true);
      setIsBuilt(true);
      if (ref.current) {
        ref.current.dataset.swarmStatus = "built";
        ref.current.dispatchEvent(new CustomEvent("swarm:completed"));
      }
    }, 900);

    return () => clearTimeout(autoTimer);
  }, [waitForSwarm, swarmTriggered, inViewResult]);

  useEffect(() => {
    if (!waitForSwarm) return;
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleBuild = () => {
      setSwarmTriggered(true);
      setIsBuilt(false);
      el.dataset.swarmStatus = "building";
      timer = setTimeout(() => {
        if (el) {
          setIsBuilt(true);
          el.dataset.swarmStatus = "built";
          el.dispatchEvent(new CustomEvent("swarm:completed"));
        }
      }, (duration + delay) * 1000 + 150);
    };

    const handleReset = () => {
      if (!once) {
        setSwarmTriggered(false);
        setIsBuilt(false);
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

  // Content animates in on inView, and animates out when scrolled out of view
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
          ? isBuilt
            ? "built"
            : swarmTriggered
              ? "building"
              : "idle"
          : undefined
      }
      initial="hidden"
      animate={shouldBeVisible ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: shouldBeVisible ? delay : 0,
        duration: shouldBeVisible ? duration : 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
