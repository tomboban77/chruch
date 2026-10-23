import Link from "next/link";

export function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" className="brand-mark" aria-hidden="true">
      <rect width="40" height="40" fill="#1d5c96" />
      <circle cx="20" cy="22" r="8" fill="#f2a33a" />
      <path d="M0 24c6-3 12-3 20 0s14 3 20 0v16H0z" fill="#8fb8db" />
      <path d="M0 30c7-2.5 13-2.5 20 0s13 2.5 20 0v10H0z" fill="#dceaf6" />
    </svg>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label="Bradley Adventist Church, home" onClick={onClick}>
      <BrandMark />
      <span className="brand-text">
        <span className="brand-name">Bradley Adventist Church</span>
        <span className="brand-sub">Huddersfield</span>
      </span>
    </Link>
  );
}
