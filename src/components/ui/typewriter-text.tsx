"use client";

import React, { useEffect, useState, useRef } from "react";
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
}

export function TypewriterText({
  text,
  className = "",
  speed = 22,
  delay = 80,
  showCursor = true,
  cursorChar = "|",
  cursorClassName = "text-primary",
  sound = true,
  repeatOnScroll = true,
  as: Component = "span",
}: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: !repeatOnScroll,
    amount: 0.15,
  });

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    if (isInView) {
      setDisplayedLength(0);
      timeoutId = setTimeout(() => {
        setIsTyping(true);
        let current = 0;
        intervalId = setInterval(() => {
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
    } else if (repeatOnScroll) {
      // Reset when scrolled out of view
      setDisplayedLength(0);
      setIsTyping(false);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isInView, text, speed, delay, sound, repeatOnScroll]);

  const displayedText = text.slice(0, displayedLength);

  return (
    <Component ref={ref as any} className={cn("inline-block", className)}>
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
