import React from "react";

export function ORM(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.77 19.34L11.55 2.6c.2-.42.79-.42.99 0l7.85 16.74c.18.39-.14.83-.56.78l-7.79-.88a.95.95 0 0 1-.41-.12l-7.31-4.04c-.38-.21-.48-.71-.24-1.08z"
        fill="#2D3748"
      />
      <path
        d="M12.04 2.6l7.85 16.74c.18.39-.14.83-.56.78l-7.79-.88c-.37-.04-.54-.48-.31-.78L12.04 2.6z"
        fill="#5A67D8"
      />
      <path
        d="M11.55 2.6l-7.78 16.74c-.24.37-.14.87.24 1.08l7.31 4.04c.13.07.27.11.41.12l.13-21.98z"
        fill="#2C7A7B"
        fillOpacity="0.8"
      />
    </svg>
  );
}
