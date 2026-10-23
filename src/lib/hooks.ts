"use client";

import { useEffect, useState } from "react";

/**
 * The current time, refreshed on an interval. Returns null during server
 * rendering and the first client render so time-dependent UI never
 * mismatches on hydration.
 */
export function useNow(intervalMs = 30_000): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const override = new URLSearchParams(window.location.search).get("now");
    const offset = override && !Number.isNaN(Date.parse(override)) ? Date.parse(override) - Date.now() : 0;
    const tick = () => setNow(new Date(Date.now() + offset));
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
