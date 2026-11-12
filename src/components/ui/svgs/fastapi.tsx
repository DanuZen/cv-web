import React from "react";

export function FastAPI(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="11" fill="#009688" />
      <path
        d="M12.5 3.5L5.5 13.5h6l-1 7 7-10h-6l1-7z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
