"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { AddToCalendar } from "./AddToCalendar";
import { SITE, type Category } from "@/lib/content";
import { useNow } from "@/lib/hooks";
import { fmtDay, fmtTime, londonParts, nextWeekly, parseLocal, upcomingEvents, type EventInstance } from "@/lib/time";

function DateBlock({ e }: { e: EventInstance }) {
  return (
    <div className="event-date">
      <span className="d">{fmtDay(e.startAt, { day: "numeric" })}</span>
      <span className="m">{fmtDay(e.startAt, { month: "short" })}</span>
      <span className="w">{fmtDay(e.startAt, { weekday: "short" })}</span>
    </div>
  );
}

function CatChip({ cat }: { cat: Category }) {
  const c = SITE.categories[cat];
  return <span className={`chip ${c.chip}`}>{c.label}</span>;
}

const timeRange = (e: EventInstance) => `${fmtTime(e.startAt)} to ${fmtTime(parseLocal(e.endLocal))}`;

export function EventCards({ limit = 3 }: { limit?: number }) {
  const now = useNow(60_000);
  if (!now) return <div className="event-cards" style={{ minHeight: 220 }} />;
  const midweek = nextWeekly(SITE.weekly.find((w) => w.id === "midweek-prayer")!, now);
  const list = [midweek, ...upcomingEvents(now)].sort((a, b) => a.startAt.getTime() - b.startAt.getTime()).slice(0, limit);

  return (
    <div className="event-cards">
      {list.map((e, i) => (
        <article key={e.key} className={`card event-card hover reveal d${i}`} data-cat={e.category}>
          <div className="top">
            <DateBlock e={e} />
            <div>
              <CatChip cat={e.category} />
              <h3 style={{ marginTop: 8 }}>{e.title}</h3>
            </div>
          </div>
          <p className="desc">{e.desc}</p>
          <div className="flex between items-center wrap gap-1">
            <span className="small muted">{e.weekly ? "Every week · " : ""}{timeRange(e)}</span>
            <AddToCalendar item={e} label="Add" />
          </div>
        </article>
      ))}
    </div>
  );
}

const FILTERS: (Category | "all")[] = ["all", "worship", "prayer", "youth", "family", "community", "health"];

export function EventList() {
  const now = useNow(60_000);
  const [filter, setFilter] = useState<Category | "all">("all");
  if (!now) return <div style={{ minHeight: 400 }} />;

  const events = upcomingEvents(now).filter((e) => filter === "all" || e.category === filter);
  const byMonth = new Map<string, EventInstance[]>();
  for (const e of events) {
    const k = fmtDay(e.startAt, { month: "long", year: "numeric" });
    byMonth.set(k, [...(byMonth.get(k) ?? []), e]);
  }

  return (
    <>
      <div className="filter-bar mb-4" role="group" aria-label="Filter events">
        {FILTERS.map((f) => (
          <button key={f} type="button" className="filter-btn" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f === "all" ? "All events" : SITE.categories[f].label}
          </button>
        ))}
      </div>
      {events.length === 0 && <p className="empty">Nothing in this category yet. Check back soon.</p>}
      {[...byMonth].map(([month, list]) => (
        <section key={month}>
          <h3 className="month-label">{month}</h3>
          <div className="event-list">
            {list.map((e) => (
              <article key={e.key} className="event" data-cat={e.category}>
                <DateBlock e={e} />
                <div>
                  <CatChip cat={e.category} />
                  {e.sample && <span className="chip ghost" style={{ marginLeft: 6 }}>Sample</span>}
                  <h3>{e.title}</h3>
                  <div className="meta">
                    <span><Clock aria-hidden />{fmtDay(e.startAt, { weekday: "long" })}, {timeRange(e)}</span>
                    <span><MapPin aria-hidden />{e.location}</span>
                  </div>
                  <p className="desc">{e.desc}</p>
                </div>
                <div className="event-actions">
                  <AddToCalendar item={e} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** The church's week at a glance, with tonight's Sabbath times filled in. */
export function WeeklyRhythm() {
  const now = useNow(60_000);
  const today = now ? londonParts(now).wd : -1;
  return (
    <div className="rhythm">
      {[0, 1, 2, 3, 4, 5, 6].map((wd) => {
        const slots = SITE.weekly.filter((w) => w.weekday === wd);
        return (
          <div key={wd} className={`day${wd === 6 ? " sabbath" : ""}${wd === 5 ? " friday" : ""}${wd === today ? " today" : ""}`}>
            <span className="dn">{DAY_NAMES[wd]}{wd === today ? " · today" : ""}</span>
            {wd === 5 && <div className="slot"><b>At sunset</b>Sabbath begins</div>}
            {slots.map((s) => (
              <div className="slot" key={s.id}>
                <b>{fmtHm(s.start)}</b>
                {s.title}
              </div>
            ))}
            {wd === 6 && <div className="slot"><b>At sunset</b>Sabbath ends</div>}
          </div>
        );
      })}
    </div>
  );
}

function fmtHm(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""}${h < 12 ? "am" : "pm"}`;
}
