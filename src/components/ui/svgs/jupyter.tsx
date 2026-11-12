import React from "react";

export function Jupyter(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Top crescent */}
      <path
        d="M12 4.5c4.1 0 7.5 1.5 8.7 3.6-1.5-1.5-4.8-2.6-8.7-2.6s-7.2 1.1-8.7 2.6C4.5 6 7.9 4.5 12 4.5z"
        fill="#F37626"
      />
      {/* Central planet dots */}
      <circle cx="12" cy="12" r="2.8" fill="#F37626" />
      <circle cx="5" cy="13.5" r="1.5" fill="#6B7280" />
      <circle cx="19" cy="10.5" r="1.5" fill="#6B7280" />
      {/* Bottom crescent */}
      <path
        d="M12 19.5c-4.1 0-7.5-1.5-8.7-3.6 1.5 1.5 4.8 2.6 8.7 2.6s7.2-1.1 8.7-2.6c-1.2 2.1-4.6 3.6-8.7 3.6z"
        fill="#F37626"
      />
    </svg>
  );
}

