import React from "react";

export function NoSQL(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4z"
        fill="#13AA52"
        fillOpacity="0.15"
      />
      <ellipse cx="12" cy="6" rx="10" ry="4" stroke="#13AA52" strokeWidth="1.6" fill="#13AA52" fillOpacity="0.3" />
      <path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4" stroke="#13AA52" strokeWidth="1.6" />
      <path d="M2 18c0 2.21 4.48 4 10 4s10-1.79 10-4" stroke="#13AA52" strokeWidth="1.6" />
      <path d="M2 6v12" stroke="#13AA52" strokeWidth="1.6" />
      <path d="M22 6v12" stroke="#13AA52" strokeWidth="1.6" />
      <path
        d="M12 8.5c-1.5 2-2.5 3.8-2.5 5.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-1.7-1-3.5-2.5-5.5z"
        fill="#13AA52"
      />
    </svg>
  );
}
