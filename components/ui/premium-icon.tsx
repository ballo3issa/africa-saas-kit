import type { ReactNode, SVGProps } from "react";

export type PremiumIconName = "home" | "dashboard" | "billing" | "security";

type PremiumIconProps = SVGProps<SVGSVGElement> & {
  name: PremiumIconName;
  size?: number;
};

const paths: Record<PremiumIconName, ReactNode> = {
  home: (
    <>
      <path d="M3.75 10.5 12 3.75l8.25 6.75" />
      <path d="M5.75 9.75v10.5h12.5V9.75" />
      <path d="M9.5 20.25v-6.5h5v6.5" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.75" y="3.75" width="6.5" height="6.5" rx="1.25" />
      <rect x="13.75" y="3.75" width="6.5" height="6.5" rx="1.25" />
      <rect x="3.75" y="13.75" width="6.5" height="6.5" rx="1.25" />
      <rect x="13.75" y="13.75" width="6.5" height="6.5" rx="1.25" />
    </>
  ),
  billing: (
    <>
      <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2" />
      <path d="M3.25 9.5h17.5" />
      <path d="M7 14.5h3.5" />
    </>
  ),
  security: (
    <>
      <path d="M12 3.25 19 6v5.25c0 4.45-2.9 7.85-7 9.5-4.1-1.65-7-5.05-7-9.5V6l7-2.75Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export function PremiumIcon({ name, size = 20, ...props }: PremiumIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
