import React from "react";

export function Nuxt(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.978 4.606a2.008 2.008 0 0 1 3.49 0l8.769 14.86a2.008 2.008 0 0 1-1.745 3.034H2.508A2.008 2.008 0 0 1 .763 19.466l8.769-14.86z"
        fill="#00DC82"
        fillOpacity="0.2"
      />
      <path
        d="M15.485 13.125a1.8 1.8 0 0 1 2.87 2.16l-3.32 4.425a1.8 1.8 0 0 1-1.44.79H3.72a1.8 1.8 0 0 1-1.44-2.88l6.3-8.4a1.8 1.8 0 0 1 2.88 0l4.025 3.905z"
        fill="#00DC82"
      />
      <path
        d="M10.978 4.606a2.008 2.008 0 0 1 3.49 0l7.747 13.126a2.008 2.008 0 0 1-1.745 3.034h-4.382l-5.11-8.66-2.023 2.7 2.023-10.2z"
        fill="#00C58E"
      />
    </svg>
  );
}
