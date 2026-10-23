"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Brand } from "./BrandMark";
import { CHURCH } from "@/lib/content";
import { isLive } from "@/lib/time";
import { useNow } from "@/lib/hooks";

export const NAV = [
  { href: "/visit", label: "Visit" },
  { href: "/watch", label: "Watch" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/prayer", label: "Prayer" },
  { href: "/give", label: "Give" }
];

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("bsda-theme", next); } catch {}
  };
  return (
    <button className="icon-btn theme-toggle" type="button" onClick={toggle} aria-label="Switch between light and dark mode">
      <Sun className="i-sun" aria-hidden />
      <Moon className="i-moon" aria-hidden />
    </button>
  );
}

export function LivePill() {
  const now = useNow();
  if (!now || !isLive(now)) return null;
  return (
    <Link href="/watch" className="live-pill">
      <span className="live-dot" /> Live now
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const current = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  return (
    <>
      <div className="concept-bar">
        <strong>Website concept.</strong> Events, schedules and some details are samples for the church team to confirm.
      </div>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <LivePill />
            <ThemeToggle />
            <Link href="/visit#plan" className="btn btn-primary btn-sm hide-md">
              Plan your visit
            </Link>
            <button className="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Menu aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="mobile-menu-top">
          <Brand onClick={close} />
          <button className="icon-btn" type="button" aria-label="Close menu" onClick={close}>
            <X aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile">
          <Link href="/" onClick={close}>Home <ArrowUpRight aria-hidden /></Link>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={close} aria-current={current(n.href)}>
              {n.label} <ArrowUpRight aria-hidden />
            </Link>
          ))}
        </nav>
        <div className="btn-row">
          <Link href="/visit#plan" className="btn btn-primary" onClick={close}>Plan your visit</Link>
          <Link href="/watch" className="btn btn-ghost" onClick={close}>Watch online</Link>
        </div>
        <div className="mm-contact">
          {CHURCH.address.join(", ")}
          <br />
          <a href={`tel:${CHURCH.phone.replace(/\s/g, "")}`}>{CHURCH.phone}</a> · <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
        </div>
      </div>
    </>
  );
}
