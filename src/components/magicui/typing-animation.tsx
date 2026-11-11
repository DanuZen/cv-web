"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
  type RefObject,
} from "react";
import {
  motion,
  useInView,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";
import { swarmAudio } from "@/components/swarm/audio";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>;
type TypingAnimationMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>
>;

export interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  children?: string;
  words?: string[];
  className?: string;
  duration?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  pauseDelay?: number;
  loop?: boolean;
  as?: MotionElementType;
  startOnView?: boolean;
  showCursor?: boolean;
  blinkCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
  // Swarm & sound integration
  waitForSwarm?: boolean;
  action?: string;
  sound?: boolean;
  repeatOnScroll?: boolean;
}

export function TypingAnimation({
  children,
  words,
  className,
  duration = 80,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  as: Component = "span",
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
  waitForSwarm = true,
  action = "writing text",
  sound = true,
  repeatOnScroll = true,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motionElements[
    Component
  ] as TypingAnimationMotionComponent;

  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [swarmTriggered, setSwarmTriggered] = useState(!waitForSwarm);

  const elementRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef as RefObject<Element>, {
    amount: 0.2,
    once: !repeatOnScroll,
  });

  const wordsToAnimate = useMemo(
    () => words ?? (children ? [children] : []),
    [words, children]
  );
  const hasMultipleWords = wordsToAnimate.length > 1;

  const typingSpeed = typeSpeed ?? duration;
  const deletingSpeed = deleteSpeed ?? Math.max(20, typingSpeed / 2);

  const shouldStart = waitForSwarm
    ? swarmTriggered
    : startOnView
      ? isInView
      : true;

  const animationSourceKey = useMemo(
    () => (words ? words.join("\u0000") : (children ?? "")),
    [words, children]
  );

  useEffect(() => {
    setDisplayedText("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setPhase("typing");
  }, [animationSourceKey]);

  // Swarm Event Listeners
  useEffect(() => {
    if (!waitForSwarm) return;
    const el = elementRef.current;
    if (!el) return;

    const handleBuild = () => {
      setSwarmTriggered(true);
    };

    const handleReset = () => {
      if (repeatOnScroll) {
        setSwarmTriggered(false);
        setDisplayedText("");
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setPhase("typing");
      }
    };

    el.addEventListener("swarm:build", handleBuild);
    el.addEventListener("swarm:reset", handleReset);

    return () => {
      el.removeEventListener("swarm:build", handleBuild);
      el.removeEventListener("swarm:reset", handleReset);
    };
  }, [waitForSwarm, repeatOnScroll]);

  // Reset when scrolled out of view
  useEffect(() => {
    if (!isInView && repeatOnScroll) {
      if (waitForSwarm) setSwarmTriggered(false);
      setDisplayedText("");
      setCurrentWordIndex(0);
      setCurrentCharIndex(0);
      setPhase("typing");
    }
  }, [isInView, repeatOnScroll, waitForSwarm]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (shouldStart && wordsToAnimate.length > 0) {
      const timeoutDelay =
        delay > 0 && displayedText === ""
          ? delay
          : phase === "typing"
            ? typingSpeed
            : phase === "deleting"
              ? deletingSpeed
              : pauseDelay;

      timeout = setTimeout(() => {
        const currentWord = wordsToAnimate[currentWordIndex] || "";
        const graphemes = Array.from(currentWord);

        switch (phase) {
          case "typing":
            if (currentCharIndex < graphemes.length) {
              setDisplayedText(
                graphemes.slice(0, currentCharIndex + 1).join("")
              );
              setCurrentCharIndex(currentCharIndex + 1);

              if (sound && swarmAudio.isEnabled()) {
                swarmAudio.playClickSound();
              }
            } else {
              if (hasMultipleWords || loop) {
                const isLastWord =
                  currentWordIndex === wordsToAnimate.length - 1;
                if (!isLastWord || loop) {
                  setPhase("pause");
                }
              }
            }
            break;

          case "pause":
            setPhase("deleting");
            break;

          case "deleting":
            if (currentCharIndex > 0) {
              setDisplayedText(
                graphemes.slice(0, currentCharIndex - 1).join("")
              );
              setCurrentCharIndex(currentCharIndex - 1);
            } else {
              const nextIndex = (currentWordIndex + 1) % wordsToAnimate.length;
              setCurrentWordIndex(nextIndex);
              setPhase("typing");
            }
            break;
        }
      }, timeoutDelay);
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay,
    sound,
  ]);

  const currentWordGraphemes = Array.from(
    wordsToAnimate[currentWordIndex] || ""
  );
  const isComplete =
    !loop &&
    currentWordIndex === wordsToAnimate.length - 1 &&
    currentCharIndex >= currentWordGraphemes.length &&
    phase !== "deleting";

  const shouldShowCursor =
    showCursor &&
    !isComplete &&
    (hasMultipleWords || loop || currentCharIndex < currentWordGraphemes.length || !shouldStart);

  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "▌";
      case "underscore":
        return "_";
      case "line":
      default:
        return "|";
    }
  };

  return (
    <MotionComponent
      ref={elementRef}
      data-swarm-target={waitForSwarm ? "true" : undefined}
      data-swarm-action={waitForSwarm ? action : undefined}
      className={cn(
        "tracking-[-0.02em]",
        Component === "span" && "inline-block",
        className
      )}
      {...props}
    >
      <span>{displayedText}</span>
      {shouldShowCursor && (
        <span
          className={cn(
            "inline-block font-mono ml-0.5 select-none text-primary",
            blinkCursor && "animate-blink-cursor"
          )}
          aria-hidden="true"
        >
          {getCursorChar()}
        </span>
      )}
    </MotionComponent>
  );
}

export default TypingAnimation;

