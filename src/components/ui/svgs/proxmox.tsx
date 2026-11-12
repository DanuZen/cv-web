import React from "react";

export function Proxmox(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2z"
        fill="#E57000"
        fillOpacity="0.15"
      />
      <path
        d="M12 2.5l7.5 4.3v8.6L12 19.7l-7.5-4.3V6.8L12 2.5z"
        stroke="#E57000"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 2.5v17.2M4.5 6.8l15 8.6M19.5 6.8l-15 8.6"
        stroke="#E57000"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      <circle cx="12" cy="11.1" r="3" fill="#E57000" />
    </svg>
  );
}
