"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

export interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  // Swarm & scroll integration
  waitForSwarm?: boolean;
  action?: string;
  repeatOnScroll?: boolean;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  waitForSwarm = false,
  action = "calculating metrics",
  repeatOnScroll = true,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [swarmTriggered, setSwarmTriggered] = useState(!waitForSwarm);

  const motionValue = useMotionValue(direction === "down" ? value : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const isInView = useInView(ref, {
    once: !repeatOnScroll,
    margin: "0px",
  });

  const shouldStart = waitForSwarm ? swarmTriggered : isInView;

  // Swarm event listeners
  useEffect(() => {
    if (!waitForSwarm) return;
    const el = ref.current;
    if (!el) return;

    const handleBuild = () => {
      setSwarmTriggered(true);
    };

    const handleReset = () => {
      if (repeatOnScroll) {
        setSwarmTriggered(false);
        motionValue.set(direction === "down" ? value : startValue);
      }
    };

    el.addEventListener("swarm:build", handleBuild);
    el.addEventListener("swarm:reset", handleReset);

    return () => {
      el.removeEventListener("swarm:build", handleBuild);
      el.removeEventListener("swarm:reset", handleReset);
    };
  }, [waitForSwarm, repeatOnScroll, motionValue, direction, startValue, value]);

  // Reset when scrolled out of view
  useEffect(() => {
    if (!isInView && repeatOnScroll) {
      if (waitForSwarm) setSwarmTriggered(false);
      motionValue.set(direction === "down" ? value : startValue);
    }
  }, [isInView, repeatOnScroll, waitForSwarm, motionValue, direction, startValue, value]);

  // Trigger spring animation
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (shouldStart) {
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value);
      }, delay * 1000);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [motionValue, shouldStart, delay, value, direction, startValue]);

  // Update text content with formatted number
  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces]
  );

  return (
    <span
      ref={ref}
      data-swarm-target={waitForSwarm ? "true" : undefined}
      data-swarm-action={waitForSwarm ? action : undefined}
      className={cn(
        "inline-block tracking-wider tabular-nums font-semibold",
        className
      )}
      {...props}
    >
      {startValue}
    </span>
  );
}

export default NumberTicker;

