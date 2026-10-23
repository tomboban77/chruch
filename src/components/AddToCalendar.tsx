"use client";

import { useEffect, useRef } from "react";
import { CalendarPlus, Download, ExternalLink } from "lucide-react";
import { downloadIcs, googleCalendarUrl, type CalItem } from "@/lib/calendar";
import { useToast } from "./Toast";

export function AddToCalendar({ item, label = "Add to calendar", className = "btn btn-ghost btn-sm" }: { item: CalItem; label?: string; className?: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const toast = useToast();

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener("click", onDown);
    return () => document.removeEventListener("click", onDown);
  }, []);

  return (
    <details className="cal-menu" ref={ref}>
      <summary className={className}>
        <CalendarPlus aria-hidden /> {label}
      </summary>
      <div className="menu">
        <a href={googleCalendarUrl(item)} target="_blank" rel="noopener" onClick={() => ref.current && (ref.current.open = false)}>
          <ExternalLink aria-hidden /> Google Calendar
        </a>
        <button
          type="button"
          onClick={() => {
            downloadIcs(item);
            if (ref.current) ref.current.open = false;
            toast("Calendar file downloaded");
          }}
        >
          <Download aria-hidden /> Apple, Outlook (.ics)
        </button>
      </div>
    </details>
  );
}
