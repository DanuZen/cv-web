import React from "react";

export function CICD(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.6 6.6A6 6 0 0 0 8.3 8.3L3.8 12.8a4 4 0 1 0 5.6 5.6l4.5-4.5a6 6 0 1 0 4.7-7.3zm-11.4 10a2 2 0 1 1 0-2.8 2 2 0 0 1 0 2.8zm9.6-4a4 4 0 1 1 0-5.6 4 4 0 0 1 0 5.6z"
        fill="#2563EB"
      />
      <circle cx="16.8" cy="9.6" r="1.8" fill="#10B981" />
      <path
        d="M3 12h2M19 12h2M12 3v2M12 19v2"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

