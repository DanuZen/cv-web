import React from "react";

export function Azure(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.05 3.5L5.75 16.2a.8.8 0 0 0 .7 1.2h4.5l2.6-4.5 4.9 7.6a.8.8 0 0 0 .7.4h4.1a.8.8 0 0 0 .7-1.2L14.45 3.5a.8.8 0 0 0-1.4 0z"
        fill="#0078D4"
      />
      <path
        d="M13.55 12.9L8.2 20.5h9.1l-3.75-7.6z"
        fill="#5EA0EF"
      />
      <path
        d="M13.55 12.9l-2.6 4.5H6.45l7.1-13.9z"
        fill="#005BA1"
        fillOpacity="0.3"
      />
    </svg>
  );
}
