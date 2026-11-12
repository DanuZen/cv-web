import React from "react";

export function PM2(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10.5" fill="#2B037A" />
      <path
        d="M6.5 7.5h5a3.5 3.5 0 0 1 0 7h-3v3H6.5v-10zm2 5h3a1.5 1.5 0 0 0 0-3h-3v3z"
        fill="#29BEB0"
      />
      <path
        d="M14.5 10.5a2.5 2.5 0 0 1 4.5 1.5c0 1.2-.8 2-2 3.2l-2.5 2.3h4.5v1.5h-7v-1.5l3.2-3.1c1-.9 1.5-1.5 1.5-2.2a1.2 1.2 0 0 0-2.2-.6l-1.5-.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

