import React from "react";

export function Grafana(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"
        fill="#F46800"
        fillOpacity="0.15"
      />
      <path
        d="M12 4.5a7.5 7.5 0 1 0 7.5 7.5h-2.5a5 5 0 1 1-5-5V4.5z"
        fill="#F46800"
      />
      <circle cx="12" cy="12" r="2.8" fill="#F46800" />
      <path
        d="M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
        fill="#FFA000"
      />
    </svg>
  );
}

