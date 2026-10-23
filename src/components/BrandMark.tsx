import Link from "next/link";

/**
 * Church logo: an open Bible with a rising flame, beside a wordmark in the
 * style of the Seventh-day Adventist Church logo, with the congregation's
 * name beneath. An original mark, not the official Adventist symbol.
 * Teal follows `currentColor` and the flame uses --brand-flame, so both adapt
 * to light, dark and footer backgrounds from CSS.
 */

/** Open Bible and flame, drawn on a 48×48 grid. */
function IconShapes() {
  return (
    <>
      <path fill="currentColor" d="M22.6 43C17 39.4 10 38.4 3 39.2V23.4c7-1.4 14.2-.4 19.6 3.8z" />
      <path fill="currentColor" d="M25.4 43c5.6-3.6 12.6-4.6 19.6-3.8V23.4c-7-1.4-14.2-.4-19.6 3.8z" />
      {/* Flame with its inner tongue cut out (evenodd), so it works on any background */}
      <path
        className="logo-flame"
        fillRule="evenodd"
        d="M24 24.6c-4.9-1.5-6.6-6.3-4.3-10.8.6 2.2 2 3.4 3.3 3.7-1.3-4.4.6-9.3 4.8-12.9-.6 3.4 1.2 5.4 2.4 7.6 1.4 2.6 1.4 5.6-.2 8.2-1.3 2.1-3.4 3.6-6 4.2zM25.1 22.3c-1.7-.9-2.2-2.9-1.2-4.7.4 1 1.2 1.4 1.8 1.4-.4-1.8.4-3.6 1.8-4.6.9 2.6.7 6.1-2.4 7.9z"
      />
    </>
  );
}

/** The icon on its own, e.g. for favicons or small spaces. */
export function LogoIcon({ className = "logo-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <IconShapes />
    </svg>
  );
}

export function Wordmark({ sub = "Bradley · Huddersfield" }: { sub?: string | false }) {
  return (
    <svg
      className="wordmark"
      viewBox={`0 0 262 ${sub ? 74 : 62}`}
      role="img"
      aria-label={`Seventh-day Adventist Church${sub ? `, ${sub.replace(" · ", ", ")}` : ""}`}
    >
      <g transform={`translate(0 ${sub ? 6 : 2}) scale(1.2)`}>
        <IconShapes />
      </g>
      <g transform="translate(68 0)">
        <text x="0" y="23" className="wm-line">Seventh-day</text>
        <text x="0" y="50" className="wm-line">
          Adventist
          <tspan className="wm-reg" dx="1" dy="-10">®</tspan>
          <tspan dx="4" dy="10">Church</tspan>
        </text>
        {sub && <text x="1" y="70" className="wm-sub">{sub.toUpperCase()}</text>}
      </g>
    </svg>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label="Bradley Seventh-day Adventist Church, home" onClick={onClick}>
      <Wordmark />
    </Link>
  );
}
