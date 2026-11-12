import React from "react";

export function Linux(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Tux penguin silhouette */}
      <path
        d="M12 2c-3.1 0-5 2.5-5 6 0 2.2.8 4 1.2 5.5-.8 1-2.2 2.8-2.2 4.5 0 2 2.5 3.5 5 3.5h2c2.5 0 5-1.5 5-3.5 0-1.7-1.4-3.5-2.2-4.5.4-1.5 1.2-3.3 1.2-5.5 0-3.5-1.9-6-5-6z"
        fill="#FCC624"
      />
      <path
        d="M12 3c-2.5 0-4 2-4 5 0 2 .6 3.5 1 5-.8.9-2 2.5-2 4 0 1.5 2 2.5 4 2.5h2c2 0 4-1 4-2.5 0-1.5-1.2-3.1-2-4 .4-1.5 1-3 1-5 0-3-1.5-5-4-5z"
        fill="#111827"
      />
      {/* White belly */}
      <ellipse cx="12" cy="15" rx="3" ry="3.5" fill="#FFFFFF" />
      {/* Eyes */}
      <circle cx="10.5" cy="7" r="0.8" fill="#FFFFFF" />
      <circle cx="10.5" cy="7" r="0.4" fill="#000000" />
      <circle cx="13.5" cy="7" r="0.8" fill="#FFFFFF" />
      <circle cx="13.5" cy="7" r="0.4" fill="#000000" />
      {/* Beak */}
      <path d="M11 8.5h2l-1 1.8-1-1.8z" fill="#FFA500" />
      {/* Feet */}
      <ellipse cx="9" cy="20.5" rx="2" ry="1" fill="#FFA500" />
      <ellipse cx="15" cy="20.5" rx="2" ry="1" fill="#FFA500" />
    </svg>
  );
}

