"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades .reveal elements in as they scroll into view.
 *
 * Content is visible by default; elements are only hidden once this script
 * has switched on <html data-reveal>, so a script failure never blanks the
 * page. State lives in a data attribute React doesn't manage, so re-renders
 * can't undo it, and the effect is safe to run twice (React Strict Mode).
 */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.removeAttribute("data-reveal");
      return;
    }

    const show = (el: Element) => el.setAttribute("data-shown", "");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );

    const watched = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll(".reveal:not([data-shown])").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        // Anything already on screen shows straight away, no flash.
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
        else io.observe(el);
      });

    scan();
    root.setAttribute("data-reveal", "");
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}
