import React from "react";

export function Flutter(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14.314 0L2.3 12l3.714 3.714L21.742 0h-7.428z" fill="#47C5FB" />
      <path d="M14.286 10.771L8.571 16.486 14.286 22.2h7.428l-9.4-9.429 2-2z" fill="#02569B" />
      <path d="M8.571 16.486l3.715-3.715 3.714 3.715-3.714 3.714-3.715-3.714z" fill="#0175C2" />
      <path d="M12.286 20.2l2-2 7.428 5.8h-7.428l-2-3.8z" fill="#13B9FD" fillOpacity="0.8" />
    </svg>
  );
}
