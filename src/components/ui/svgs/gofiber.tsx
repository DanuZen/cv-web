import React from "react";

export function GoFiber(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 13.5C3 8.8 6.8 5 11.5 5c4.7 0 8.5 3.8 8.5 8.5 0 2.8-1.4 5.3-3.5 6.8l-1.5-2c1.3-.9 2.1-2.4 2.1-4.1 0-2.8-2.3-5.1-5.1-5.1S6.9 11.4 6.9 14.2c0 1.7.8 3.2 2.1 4.1l-1.5 2C5.4 18.8 3 16.3 3 13.5z"
        fill="#00ACD7"
      />
      <circle cx="11.5" cy="14" r="2.2" fill="#00ACD7" />
      <path
        d="M11.5 2C17.8 2 23 7.2 23 13.5c0 3.8-1.9 7.2-4.8 9.3l-1.4-2.1c2.3-1.6 3.8-4.2 3.8-7.2 0-4.8-3.9-8.7-8.7-8.7S3.2 8.7 3.2 13.5c0 3 1.5 5.6 3.8 7.2L5.6 22.8C2.7 20.7.8 17.3.8 13.5.8 7.2 6 2 11.5 2z"
        fill="#00ACD7"
        fillOpacity="0.4"
      />
    </svg>
  );
}

