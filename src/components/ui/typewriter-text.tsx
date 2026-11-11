"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { swarmAudio } from "@/components/swarm/audio";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  delay?: number; // ms before start
  showCursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  sound?: boolean;
  repeatOnScroll?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  action?: string;
}

export function TypewriterText({
  text,
  className = "",
  speed = 22,
  delay = 50,
  showCursor = true,
  cursorChar = "|",
  cursorClassName = "text-primary",
  sound = true,
  repeatOnScroll = true,
  as: Component = "span",
  action = "writing text",
}: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: !repeatOnScroll,
    amount: 0.2,
  });

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const isStartedRef = useRef(false);

  const startTyping = useCallback(() => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    setTimeout(() => {
      setIsTyping(true);
      let current = 0;
      const intervalId = setInterval(() => {
        current++;
        setDisplayedLength(current);

        if (sound && swarmAudio.isEnabled()) {
          swarmAudio.playClickSound();
        }

        if (current >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
    }, delay);
  }, [text, speed, delay, sound]);

  const resetTyping = useCallback(() => {
    isStartedRef.current = false;
    setDisplayedLength(0);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Listen for build trigger from Swarm cursor
    const handleSwarmBuild = () => {
      startTyping();
    };

    const handleSwarmReset = () => {
      if (repeatOnScroll) {
        resetTyping();
      }
    };

    el.addEventListener("swarm:build", handleSwarmBuild);
    el.addEventListener("swarm:reset", handleSwarmReset);

    return () => {
      el.removeEventListener("swarm:build", handleSwarmBuild);
      el.removeEventListener("swarm:reset", handleSwarmReset);
    };
  }, [startTyping, resetTyping, repeatOnScroll]);

  // Viewport tracking & safety timer
  useEffect(() => {
    let safetyTimeout: NodeJS.Timeout;

    if (isInView) {
      // Safety net: if cursor doesn't build it within 1.2s, auto-start
      safetyTimeout = setTimeout(() => {
        if (!isStartedRef.current) {
          startTyping();
        }
      }, 1200);
    } else if (repeatOnScroll) {
      resetTyping();
    }

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [isInView, repeatOnScroll, startTyping, resetTyping]);

  const displayedText = text.slice(0, displayedLength);

  return (
    <Component
      ref={ref as any}
      data-swarm-target="true"
      data-swarm-action={action}
      className={cn("inline-block", className)}
    >
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className={cn(
            "inline-block font-mono ml-0.5 select-none transition-opacity duration-150",
            cursorClassName,
            isTyping ? "opacity-100" : "animate-pulse opacity-75"
          )}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </Component>
  );
}
