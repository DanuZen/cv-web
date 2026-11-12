"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    // Disable browser automatic scroll restoration so it never jumps down on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Clear hash if present on refresh so browser doesn't scroll to anchor
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Immediately scroll to the very top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // RequestAnimationFrame & micro-timeout to ensure top scroll after layout calculations
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    const handleBeforeUnload = () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}

