import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
});

export function LeafLogo({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest} fill="none">
      <defs>
        <linearGradient id="leaf-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <path
        d="M4 14.5C4 8.7 8.7 4 14.5 4H20v5.5C20 15.3 15.3 20 9.5 20H4v-5.5Z"
        fill="url(#leaf-grad)"
        stroke="none"
      />
      <path d="M4 20 16 8" stroke="#022c22" strokeWidth="1.4" />
    </svg>
  );
}

export function PhoneIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MailIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function MapPinIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ClockIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function StarIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest} fill="currentColor" stroke="none">
      <path d="M12 2.6 14.6 8l5.9.9-4.3 4.2 1 5.9L12 16.3 6.8 19l1-5.9L3.5 8.9 9.4 8Z" />
    </svg>
  );
}

export function MenuIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function CloseIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest} fill="currentColor" stroke="none">
      <path d="M14 8h2.5V5H14c-2.2 0-4 1.8-4 4v2H7.5v3H10v6h3v-6h2.5l.5-3H13V9c0-.55.45-1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GoogleIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 11h-9v2.5h5.5A5 5 0 0 1 12 17" />
    </svg>
  );
}

export function YelpIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest} fill="currentColor" stroke="none">
      <path d="M11 3 9 11.5l4.5-2L11 3Zm5 5.5L11.5 11l4.5 1.5 1-3.5-1-.5ZM11 12.5 6.5 11l1 4 4-2.5Zm.5 2 3.5 4 1-4.5-4.5.5ZM7 16l3.5 2 .5-4-4 2Z" />
    </svg>
  );
}

export function TurfIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M3 18h18" />
      <path d="M5 18v-3l1.5-1.5L8 15v3" />
      <path d="M9 18v-4l1.5-1.5L12 14v4" />
      <path d="M13 18v-5l1.5-1.5L16 13v5" />
      <path d="M17 18v-3l1.5-1.5L20 15v3" />
      <path d="M3 21h18" stroke="#4ade80" />
    </svg>
  );
}

export function SodIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <path d="M3 14c2-3 4-3 6 0M9 14c2-3 4-3 6 0M15 14c2-3 4-3 6 0" />
      <path d="M3 17h18" />
    </svg>
  );
}

export function SprinklerIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 14V6" />
      <circle cx="12" cy="15" r="2.2" />
      <path d="M5 9c1 1 2 1 3 0M16 9c1 1 2 1 3 0M8 6c1 1 2 1 3 0M13 6c1 1 2 1 3 0" />
      <path d="M6 20h12" />
    </svg>
  );
}

export function LightIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M9 14h6l-1 4h-4l-1-4Z" />
      <path d="M12 14V8" />
      <path d="M12 5v1" />
      <path d="M7 7l1 1M17 7l-1 1" />
      <path d="M5 12h1M19 12h-1" />
      <path d="M9 21h6" />
    </svg>
  );
}

export function CleanupIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="m4 20 5-5" />
      <path d="m9 15 4-9 6 6-9 4Z" />
      <path d="m13 6 5 5" />
      <path d="M4 20h6" />
    </svg>
  );
}

export function GravelIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <circle cx="7" cy="14" r="2.6" />
      <circle cx="13" cy="11" r="3.2" />
      <circle cx="17.5" cy="15.5" r="2" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function WaterDropIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 3.5c3.5 4.2 6 7.4 6 10.5a6 6 0 0 1-12 0c0-3.1 2.5-6.3 6-10.5Z" />
      <path d="M9 14.5a3 3 0 0 0 3 2.5" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6Z" />
      <path d="m9 12 2.2 2.2L15 10.5" />
    </svg>
  );
}

export function CalendarIcon({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18" />
      <path d="M8 3v4M16 3v4" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

export function SparkleIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
    </svg>
  );
}

export const serviceIconMap: Record<string, (props: IconProps) => ReactElement> = {
  "artificial-turf-installation": TurfIcon,
  "sod-installation": SodIcon,
  "irrigation-repair": SprinklerIcon,
  "landscape-lighting": LightIcon,
  "yard-cleanup": CleanupIcon,
  "gravel-landscaping": GravelIcon
};

export function ServiceIcon({ slug, ...rest }: { slug: string } & IconProps) {
  const Component = serviceIconMap[slug] ?? TurfIcon;
  return <Component {...rest} />;
}
