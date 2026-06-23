/* Общие инлайн-SVG-иконки (Lucide-стиль, stroke 2px). Без эмодзи. */

type IconProps = { size?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function BrickIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="8" width="18" height="11" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2M14 8a2 2 0 0 1 4 0v0" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.5}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function SearchIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function CartIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.2l2.3 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H5.3" />
    </svg>
  );
}

export function PlusIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.4}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function SlidersIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="13" cy="18" r="2" />
    </svg>
  );
}

/** Декоративная иллюстрация набора — стопка кубиков (студы-«бугорки» лежат на блоках). */
export function BlocksArt({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label}>
      {/* нижний ряд */}
      <rect x="22" y="62" width="36" height="26" rx="6" fill={color} />
      <rect x="62" y="62" width="36" height="26" rx="6" fill="#FFC24D" />
      {/* верхний блок */}
      <rect x="42" y="34" width="36" height="26" rx="6" fill="#fff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
      {/* студы — небольшие бугорки на верхней грани каждого блока */}
      <g>
        <rect x="29" y="64" width="9" height="5" rx="2.5" fill="#fff" opacity="0.9" />
        <rect x="43" y="64" width="9" height="5" rx="2.5" fill="#fff" opacity="0.9" />
        <rect x="69" y="64" width="9" height="5" rx="2.5" fill="rgba(0,0,0,0.16)" />
        <rect x="83" y="64" width="9" height="5" rx="2.5" fill="rgba(0,0,0,0.16)" />
        <rect x="49" y="36" width="9" height="5" rx="2.5" fill={color} opacity="0.85" />
        <rect x="63" y="36" width="9" height="5" rx="2.5" fill={color} opacity="0.85" />
      </g>
    </svg>
  );
}
