/* Плоские залитые векторные иллюстрации (детская тематика). viewBox 120×120. */

const ART: Record<string, React.ReactNode> = {
  rocket: (
    <>
      <path d="M60 16c15 11 21 32 17 53H43c-4-21 2-42 17-53z" fill="#fff" />
      <circle cx="60" cy="48" r="10" fill="#2E7DF6" />
      <path d="M43 70 30 86l6-24z" fill="#FF7A33" />
      <path d="M77 70 90 86l-6-24z" fill="#FF7A33" />
      <path d="M50 90h20l-6 14c-2 5-6 5-8 0z" fill="#FFC24D" />
    </>
  ),
  robot: (
    <>
      <rect x="26" y="54" width="8" height="22" rx="4" fill="#fff" />
      <rect x="86" y="54" width="8" height="22" rx="4" fill="#fff" />
      <rect x="34" y="42" width="52" height="46" rx="12" fill="#fff" />
      <circle cx="50" cy="62" r="6" fill="#2E7DF6" />
      <circle cx="70" cy="62" r="6" fill="#2E7DF6" />
      <rect x="50" y="74" width="20" height="6" rx="3" fill="#FF7A33" />
      <rect x="56" y="24" width="8" height="14" rx="4" fill="#FF7A33" />
      <circle cx="60" cy="22" r="5" fill="#FFC24D" />
    </>
  ),
  car: (
    <>
      <path d="M22 76c0-6 5-11 11-11h4l8-12c2-3 5-4 8-4h16c5 0 9 3 11 7l4 9h3c6 0 11 5 11 11 0 3-2 5-5 5H27c-3 0-5-2-5-5z" fill="#fff" />
      <path d="M52 53h13l4 9H47z" fill="#2E7DF6" />
      <circle cx="42" cy="86" r="9" fill="#22252D" />
      <circle cx="42" cy="86" r="3" fill="#fff" />
      <circle cx="80" cy="86" r="9" fill="#22252D" />
      <circle cx="80" cy="86" r="3" fill="#fff" />
    </>
  ),
  dino: (
    <>
      <path d="M28 90c-1-28 16-48 40-48 6 0 11 2 11 2l9-10 1 14c5 6 7 15 7 24 0 7-5 12-12 12h-4l-3 8h-9l-1-8H52l-3 8h-9l-1-8h-8c-1 0-2-1-2-2z" fill="#22C55E" />
      <circle cx="76" cy="60" r="3.5" fill="#22252D" />
      <path d="M44 64l5-7 5 7 5-7 5 7z" fill="#16A34A" />
    </>
  ),
  castle: (
    <>
      <rect x="32" y="54" width="56" height="44" fill="#fff" />
      <rect x="24" y="44" width="14" height="54" fill="#fff" />
      <rect x="82" y="44" width="14" height="54" fill="#fff" />
      <g fill="#fff">
        <rect x="24" y="38" width="4" height="6" /><rect x="32" y="38" width="4" height="6" />
        <rect x="82" y="38" width="4" height="6" /><rect x="90" y="38" width="4" height="6" />
        <rect x="34" y="48" width="4" height="6" /><rect x="42" y="48" width="4" height="6" />
        <rect x="50" y="48" width="4" height="6" /><rect x="58" y="48" width="4" height="6" />
        <rect x="66" y="48" width="4" height="6" /><rect x="74" y="48" width="4" height="6" />
      </g>
      <path d="M54 72h12v26H54z" fill="#FF7A33" />
      <rect x="40" y="64" width="9" height="9" rx="2" fill="#2E7DF6" />
      <rect x="71" y="64" width="9" height="9" rx="2" fill="#2E7DF6" />
    </>
  ),
  cog: (
    <>
      <g fill="#FF7A33">
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(0 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(45 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(90 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(135 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(180 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(225 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(270 60 60)" />
        <rect x="54" y="28" width="12" height="12" rx="2" transform="rotate(315 60 60)" />
        <circle cx="60" cy="60" r="22" />
      </g>
      <circle cx="60" cy="60" r="9" fill="#fff" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M60 28c-14 0-24 11-24 24 0 9 5 15 10 19v6h28v-6c5-4 10-10 10-19 0-13-10-24-24-24z" fill="#FFC24D" />
      <rect x="50" y="80" width="20" height="6" rx="3" fill="#fff" />
      <rect x="52" y="88" width="16" height="5" rx="2.5" fill="#fff" />
    </>
  ),
  target: (
    <>
      <circle cx="60" cy="60" r="30" fill="#2E7DF6" />
      <circle cx="60" cy="60" r="20" fill="#fff" />
      <circle cx="60" cy="60" r="11" fill="#FF7A33" />
      <circle cx="60" cy="60" r="4" fill="#fff" />
    </>
  ),
  star: (
    <path d="M60 26l9 21 23 2-17 15 5 23-20-12-20 12 5-23-17-15 23-2z" fill="#FFC24D" />
  ),
  abacus: (
    <>
      <rect x="30" y="32" width="60" height="56" rx="8" fill="#fff" />
      <g>
        <rect x="36" y="46" width="48" height="3" rx="1.5" fill="#C9A079" />
        <circle cx="46" cy="47" r="6" fill="#2E7DF6" /><circle cx="60" cy="47" r="6" fill="#FF7A33" /><circle cx="74" cy="47" r="6" fill="#22C55E" />
        <rect x="36" y="62" width="48" height="3" rx="1.5" fill="#C9A079" />
        <circle cx="46" cy="63" r="6" fill="#FFC24D" /><circle cx="60" cy="63" r="6" fill="#2E7DF6" /><circle cx="74" cy="63" r="6" fill="#FF7A33" />
        <rect x="36" y="78" width="48" height="3" rx="1.5" fill="#C9A079" />
        <circle cx="46" cy="79" r="6" fill="#22C55E" /><circle cx="60" cy="79" r="6" fill="#FFC24D" /><circle cx="74" cy="79" r="6" fill="#2E7DF6" />
      </g>
    </>
  ),
  puzzle: (
    <path d="M42 42h13a6 6 0 1 1 10 0h13v13a6 6 0 1 0 0 10v13H65a6 6 0 1 1-10 0H42V65a6 6 0 1 0 0-10z" fill="#A855F7" />
  ),
  tower: (
    <>
      <rect x="40" y="74" width="40" height="22" rx="6" fill="#2E7DF6" />
      <rect x="46" y="52" width="34" height="22" rx="6" fill="#FF7A33" />
      <rect x="50" y="30" width="28" height="22" rx="6" fill="#22C55E" />
      <circle cx="52" cy="74" r="3.5" fill="#fff" /><circle cx="64" cy="74" r="3.5" fill="#fff" />
      <circle cx="58" cy="52" r="3.5" fill="#fff" /><circle cx="70" cy="52" r="3.5" fill="#fff" />
    </>
  ),
  // Россыпь деталей конструктора (для блока «коробка → модель», слева)
  partsScatter: (
    <>
      <g transform="rotate(-14 44 50)">
        <rect x="26" y="42" width="36" height="16" rx="4" fill="#2E7DF6" />
        <rect x="32" y="38" width="8" height="5" rx="2.5" fill="#fff" opacity="0.9" />
        <rect x="44" y="38" width="8" height="5" rx="2.5" fill="#fff" opacity="0.9" />
      </g>
      <g transform="rotate(16 84 36)">
        <rect x="68" y="28" width="30" height="15" rx="4" fill="#FF7A33" />
        <rect x="73" y="24" width="7" height="5" rx="2.5" fill="#fff" opacity="0.85" />
        <rect x="85" y="24" width="7" height="5" rx="2.5" fill="#fff" opacity="0.85" />
      </g>
      <g transform="rotate(8 36 88)"><rect x="24" y="82" width="24" height="13" rx="4" fill="#FFC24D" /></g>
      <g transform="rotate(-10 86 86)"><rect x="74" y="80" width="24" height="13" rx="4" fill="#22C55E" /></g>
      <circle cx="58" cy="92" r="11" fill="#22252D" /><circle cx="58" cy="92" r="4" fill="#fff" />
      <circle cx="30" cy="30" r="9" fill="#22252D" /><circle cx="30" cy="30" r="3.5" fill="#fff" />
      <circle cx="92" cy="58" r="4" fill="#A855F7" />
      <circle cx="52" cy="22" r="3.5" fill="#2E7DF6" />
    </>
  ),
  // Собранная машинка (для блока «коробка → модель», справа)
  carBuilt: (
    <>
      <circle cx="40" cy="84" r="13" fill="#22252D" /><circle cx="40" cy="84" r="4.5" fill="#fff" />
      <circle cx="84" cy="84" r="13" fill="#22252D" /><circle cx="84" cy="84" r="4.5" fill="#fff" />
      <rect x="18" y="58" width="88" height="22" rx="7" fill="#2E7DF6" />
      <rect x="40" y="40" width="42" height="22" rx="7" fill="#FF7A33" />
      <rect x="46" y="45" width="30" height="12" rx="3" fill="#DCEBFF" />
      <rect x="48" y="36" width="9" height="5" rx="2.5" fill="#FF7A33" opacity="0.85" />
      <rect x="65" y="36" width="9" height="5" rx="2.5" fill="#FF7A33" opacity="0.85" />
      <circle cx="103" cy="66" r="4" fill="#FFC24D" />
    </>
  ),
};

export function Illus({ name, label }: { name: string; label?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" role="img" aria-label={label ?? name}>
      {ART[name] ?? ART.tower}
    </svg>
  );
}
