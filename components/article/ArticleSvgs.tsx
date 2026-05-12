/** Decorative inline SVGs for article heroes & section accents — matches site leaf / Valley palette. */

export function SvgHeroLeafCluster({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="ahl1" x1="40" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ahl2" x1="100" y1="0" x2="40" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86efac" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="155" rx="72" ry="14" fill="#022c22" opacity="0.35" />
      <path
        d="M100 148c-28-42-52-62-68-88 18 8 42 22 68 48 26-26 50-40 68-48-16 26-40 46-68 88Z"
        fill="url(#ahl1)"
        opacity="0.95"
      />
      <path d="M100 28c12 28 20 52 0 120M76 64c24 12 48 36 24 84M124 64c-24 12-48 36-24 84" stroke="#022c22" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <circle cx="100" cy="42" r="36" fill="url(#ahl2)" />
      <path d="M100 18c-8 22-8 38 0 52 8-14 8-30 0-52Z" fill="#166534" opacity="0.6" />
    </svg>
  );
}

export function SvgHeroWaterIrrigation({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="ahw1" x1="100" y1="20" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="158" rx="78" ry="12" fill="#022c22" opacity="0.3" />
      <path d="M46 152h108v8H46v-8ZM54 96v56M74 76v76M94 88v64M114 72v80M134 84v68M154 104v48" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M54 96c10-28 22-42 38-58 16 16 28 30 38 58" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <circle cx="100" cy="52" r="28" fill="url(#ahw1)" />
      <path d="M100 36c-6 12-10 22-6 36 8-10 12-22 6-36Z" fill="#22d3ee" opacity="0.5" />
    </svg>
  );
}

export function SvgHeroTurfRoll({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="100" cy="158" rx="80" ry="12" fill="#022c22" opacity="0.28" />
      <path d="M36 124c0-22 28-40 64-40s64 18 64 40v24c0 10-28 18-64 18s-64-8-64-18v-24Z" fill="#166534" opacity="0.9" />
      <path d="M36 108c0-22 28-40 64-40s64 18 64 40" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 92c0-18 24-32 56-32s56 14 56 32v12c0 8-24 14-56 14s-56-6-56-14V92Z" fill="#22c55e" />
      <path d="M52 72c0-14 20-26 48-26s48 12 48 26v10c0 6-20 12-48 12s-48-6-48-12V72Z" fill="#86efac" opacity="0.85" />
      <path d="M60 54c0-10 16-18 40-18s40 8 40 18v8c0 4-16 8-40 8s-40-4-40-8V54Z" fill="#bbf7d0" opacity="0.75" />
    </svg>
  );
}

export function SvgHeroGravelHardscape({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="100" cy="158" rx="82" ry="12" fill="#022c22" opacity="0.28" />
      <rect x="32" y="88" width="136" height="56" rx="10" fill="#14532d" opacity="0.55" />
      <path d="M40 96h120M48 108h104M44 120h112M52 132h96" stroke="#4ade80" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="58" cy="102" r="4" fill="#78716c" opacity="0.7" />
      <circle cx="92" cy="114" r="5" fill="#a8a29e" opacity="0.65" />
      <circle cx="128" cy="100" r="4" fill="#57534e" opacity="0.75" />
      <circle cx="148" cy="122" r="6" fill="#94a3b8" opacity="0.5" />
      <circle cx="76" cy="128" r="5" fill="#cbd5e1" opacity="0.45" />
      <path d="M52 76l96-18 12 22-108 16z" fill="#166534" opacity="0.65" />
      <path d="M70 58l72-14 8 18-84 14z" fill="#22c55e" opacity="0.45" />
    </svg>
  );
}

export function SvgHeroLighting({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="ahlamp" cx="100" cy="120" r="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef9c3" stopOpacity="0.8" />
          <stop offset="1" stopColor="#022c22" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="158" rx="78" ry="12" fill="#022c22" opacity="0.28" />
      <path d="M100 28v96" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M84 40h32l-8 24H92L84 40Z" fill="#fef08a" opacity="0.9" />
      <path d="M76 68h48v8H76v-8Z" fill="#ca8a04" opacity="0.75" />
      <path d="M100 76c-24 20-40 44-36 72h72c4-28-12-52-36-72Z" fill="url(#ahlamp)" opacity="0.35" />
    </svg>
  );
}

export function SvgHeroCleanup({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="100" cy="158" rx="78" ry="12" fill="#022c22" opacity="0.28" />
      <path d="M52 132h96v16H52v-16Z" fill="#166534" opacity="0.55" />
      <path d="M68 76l16 56M116 72l-12 60" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
      <circle cx="76" cy="68" r="10" fill="#22c55e" opacity="0.35" />
      <circle cx="124" cy="64" r="14" fill="#15803d" opacity="0.4" />
      <path d="M92 88c12-8 28-6 40 4" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function SvgAccentSpark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#14532d" opacity="0.45" />
      <path d="M24 10l3 11 11 3-11 3-3 11-3-11-11-3 11-3 3-11Z" fill="#4ade80" opacity="0.9" />
    </svg>
  );
}

export function SvgAccentDroplet({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 8s14 14 14 24a14 14 0 1 1-28 0c0-10 14-24 14-24Z"
        fill="#0ea5e9"
        fillOpacity="0.35"
        stroke="#4ade80"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SvgAccentStone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M10 32l8-18 12-4 10 10 4 14-12 8H14l-4-10Z" fill="#57534e" fillOpacity="0.45" stroke="#4ade80" strokeOpacity="0.4" />
    </svg>
  );
}

export function SvgAccentSun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="10" fill="#fef08a" fillOpacity="0.75" />
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4M11 11l3 3M34 34l3 3M34 11l-3 3M11 37l3-3" stroke="#facc15" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function SvgAccentLeaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M36 12C22 12 10 22 8 36c14-2 24-14 24-28 0-4 2-8 4-12Z"
        fill="#22c55e"
        fillOpacity="0.55"
        stroke="#4ade80"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Pick hero + accent palette from slug keywords. */
export function pickArticleVisuals(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("irrigation") || s.includes("sprinkler") || s.includes("water")) {
    return { Hero: SvgHeroWaterIrrigation, accents: [SvgAccentDroplet, SvgAccentSpark, SvgAccentSun] as const };
  }
  if (s.includes("turf") || s.includes("sod") || s.includes("lawn")) {
    return { Hero: SvgHeroTurfRoll, accents: [SvgAccentSun, SvgAccentSpark, SvgAccentLeaf] as const };
  }
  if (s.includes("gravel") || s.includes("hardscape") || s.includes("driveway") || s.includes("paver")) {
    return { Hero: SvgHeroGravelHardscape, accents: [SvgAccentStone, SvgAccentSpark, SvgAccentSun] as const };
  }
  if (s.includes("lighting") || s.includes("led")) {
    return { Hero: SvgHeroLighting, accents: [SvgAccentSpark, SvgAccentSun, SvgAccentDroplet] as const };
  }
  if (s.includes("cleanup") || s.includes("yard-reset") || s.includes("fire")) {
    return { Hero: SvgHeroCleanup, accents: [SvgAccentLeaf, SvgAccentSpark, SvgAccentSun] as const };
  }
  return { Hero: SvgHeroLeafCluster, accents: [SvgAccentLeaf, SvgAccentDroplet, SvgAccentSpark] as const };
}

/** Decorative hero figure for service detail pages (matches article palette). */
export function pickServicePageHero(serviceSlug: string) {
  const s = serviceSlug.toLowerCase();
  if (s.includes("irrigation")) return SvgHeroWaterIrrigation;
  if (s.includes("turf")) return SvgHeroTurfRoll;
  if (s.includes("sod")) return SvgHeroTurfRoll;
  if (s.includes("gravel")) return SvgHeroGravelHardscape;
  if (s.includes("lighting")) return SvgHeroLighting;
  if (s.includes("cleanup") || s.includes("yard")) return SvgHeroCleanup;
  return SvgHeroLeafCluster;
}

export function pickCityPageHero() {
  return SvgHeroLeafCluster;
}

