import type { SVGProps } from "react";

const RestApi = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="restApiGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5E9" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <rect x="2.5" y="3.5" width="19" height="17" rx="4" stroke="url(#restApiGrad)" strokeWidth="1.75" />
    <path
      d="M7.5 9L4.75 12L7.5 15M16.5 9L19.25 12L16.5 15"
      stroke="url(#restApiGrad)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 15.5L14 8.5"
      stroke="#38BDF8"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

export { RestApi };
