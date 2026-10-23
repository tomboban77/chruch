"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarHeart, CirclePlay, Navigation, Phone } from "lucide-react";
import { CHURCH } from "@/lib/content";

/** Thumb-reach shortcuts on phones. Hides while scrolling down, returns on scroll up. */
export function ActionBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`action-bar${hidden ? " hide" : ""}`} aria-label="Quick actions">
      <a href={`tel:${CHURCH.phone.replace(/\s/g, "")}`}><Phone aria-hidden />Call</a>
      <a href={CHURCH.directions} target="_blank" rel="noopener"><Navigation aria-hidden />Directions</a>
      <Link href="/watch"><CirclePlay aria-hidden />Watch</Link>
      <Link href="/visit#plan" className="primary"><CalendarHeart aria-hidden />Visit</Link>
    </nav>
  );
}
