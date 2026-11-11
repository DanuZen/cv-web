"use client";

import React from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";

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
  as?: any;
  action?: string;
  waitForSwarm?: boolean;
}

export function TypewriterText({
  text,
  className = "",
  speed = 15,
  delay = 20,
  showCursor = true,
  cursorChar = "|",
  sound = true,
  repeatOnScroll = true,
  as = "span",
  action = "writing text",
  waitForSwarm = true,
}: TypewriterTextProps) {
  const cursorStyle = cursorChar === "▌" ? "block" : cursorChar === "_" ? "underscore" : "line";

  return (
    <TypingAnimation
      as={as}
      className={className}
      typeSpeed={speed}
      delay={delay}
      showCursor={showCursor}
      cursorStyle={cursorStyle}
      sound={sound}
      repeatOnScroll={repeatOnScroll}
      action={action}
      waitForSwarm={waitForSwarm}
    >
      {text}
    </TypingAnimation>
  );
}

export default TypewriterText;
