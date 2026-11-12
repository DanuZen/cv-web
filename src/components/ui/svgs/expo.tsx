import React from "react";

export function Expo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.5 19.5h5.8l3.7-6.2 3.7 6.2h5.8L13.8 6.5a2.1 2.1 0 0 0-3.6 0L2.5 19.5zm9.5-9.1 2.5 4.3h-5l2.5-4.3z" />
    </svg>
  );
}

