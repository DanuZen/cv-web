"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";

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
}: BlurFadeProps) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, {
    once,
    amount: 0.1,
    ...(inViewMargin ? { margin: inViewMargin as any } : {}),
  });
  const isInView = inView ? inViewResult : true;

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})`, scale: 0.96 },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
