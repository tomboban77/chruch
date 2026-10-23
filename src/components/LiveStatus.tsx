"use client";

import { CHURCH } from "@/lib/content";
import { useNow } from "@/lib/hooks";
import { fmtCountdown, fmtDay, isLive, nextService } from "@/lib/time";

/** "Live now" or a countdown to the next stream. */
export function LiveStatus() {
  const now = useNow(30_000);
  if (!now) return <div style={{ minHeight: 48 }} />;
  if (isLive(now)) {
    return (
      <a className="btn btn-sun" href={CHURCH.youtubeChannel} target="_blank" rel="noopener">
        <span className="live-dot" style={{ background: "#d92d3a" }} /> We&apos;re live. Join the stream
      </a>
    );
  }
  const svc = nextService(now);
  return (
    <p className="chip sun" style={{ fontSize: ".95rem", padding: "10px 16px" }}>
      Next live stream: {fmtDay(svc.start, { weekday: "long", day: "numeric", month: "long" })}, 10:00am · in {fmtCountdown(svc.start.getTime() - now.getTime())}
    </p>
  );
}
