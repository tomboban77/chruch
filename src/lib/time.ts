/* ==========================================================================
   Time helpers. Everything is worked out in Europe/London so the site shows
   the right Sabbath and service times wherever the visitor is.
   ========================================================================== */

import { CHURCH, SITE, type ChurchEvent, type WeeklyItem } from "./content";

const TZ = "Europe/London";
const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export type LDate = { y: number; m: number; d: number };
export type LParts = LDate & { h: number; min: number; wd: number };

const partsFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short"
});

/** Calendar parts of an instant as seen in London. */
export function londonParts(date: Date = new Date()): LParts {
  const p: Record<string, string> = {};
  for (const x of partsFmt.formatToParts(date)) p[x.type] = x.value;
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour % 24, min: +p.minute, wd: WEEKDAYS[p.weekday] };
}

/** The instant at which London clocks show the given local time. */
export function zoned(y: number, m: number, d: number, h = 0, min = 0): Date {
  const guess = Date.UTC(y, m - 1, d, h, min);
  const p = londonParts(new Date(guess));
  const asUTC = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min);
  return new Date(guess - (asUTC - guess));
}

export function addDays(dt: LDate, k: number): LDate & { wd: number } {
  const t = new Date(Date.UTC(dt.y, dt.m - 1, dt.d + k));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate(), wd: t.getUTCDay() };
}

const pad = (n: number) => String(n).padStart(2, "0");
export const isoLocal = (dt: LDate, hm: string) => `${dt.y}-${pad(dt.m)}-${pad(dt.d)}T${hm}`;

/** Parse "YYYY-MM-DDTHH:MM" London local time into an instant. */
export function parseLocal(iso: string): Date {
  const [date, time = "00:00"] = iso.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return zoned(y, m, d, h, min);
}

/* ---------- Sunrise / sunset (NOAA almanac algorithm, ±2 min) ---------- */

const rad = Math.PI / 180;
const norm = (v: number, max: number) => ((v % max) + max) % max;

export function sunEvent(dt: LDate, rise: boolean, lat = CHURCH.lat, lng = CHURCH.lng): Date {
  const N = Math.floor((Date.UTC(dt.y, dt.m - 1, dt.d) - Date.UTC(dt.y, 0, 0)) / 864e5);
  const lngHour = lng / 15;
  const t = N + ((rise ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  const L = norm(M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634, 360);
  let RA = norm(Math.atan(0.91764 * Math.tan(L * rad)) / rad, 360);
  RA = (RA + Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90) / 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  const H = (rise ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  const UT = norm(T - lngHour, 24);
  return new Date(Date.UTC(dt.y, dt.m - 1, dt.d) + UT * 3600e3);
}

export const sunset = (dt: LDate) => sunEvent(dt, false);
export const sunrise = (dt: LDate) => sunEvent(dt, true);

/* ---------- Sabbath ---------- */

export type SabbathState = { inSabbath: boolean; start: Date; end: Date };

export function sabbathState(now: Date = new Date()): SabbathState {
  const t = londonParts(now);
  if (t.wd === 6) {
    const end = sunset(t);
    if (now < end) return { inSabbath: true, start: sunset(addDays(t, -1)), end };
    const fri = addDays(t, 6);
    return { inSabbath: false, start: sunset(fri), end: sunset(addDays(fri, 1)) };
  }
  if (t.wd === 5) {
    const start = sunset(t);
    return { inSabbath: now >= start, start, end: sunset(addDays(t, 1)) };
  }
  const fri = addDays(t, (5 - t.wd + 7) % 7);
  return { inSabbath: false, start: sunset(fri), end: sunset(addDays(fri, 1)) };
}

/** The next n Sabbaths, starting with the current or upcoming one. */
export function sabbathTable(now: Date, n = 8) {
  const t = londonParts(now);
  let fri = addDays(t, (5 - t.wd + 7) % 7);
  if (t.wd === 6) fri = addDays(t, -1);
  return Array.from({ length: n }, (_, i) => {
    const f = addDays(fri, i * 7);
    return { friday: f, start: sunset(f), end: sunset(addDays(f, 1)) };
  });
}

/* ---------- Services and live stream ---------- */

const hm = (s: string) => s.split(":").map(Number) as [number, number];

export function nextService(now: Date = new Date()) {
  const t = londonParts(now);
  const [eh, em] = hm(CHURCH.service.end);
  const doneToday = t.h * 60 + t.min >= eh * 60 + em;
  let k = (6 - t.wd + 7) % 7;
  if (k === 0 && doneToday) k = 7;
  const day = addDays(t, k);
  const [sh, sm] = hm(CHURCH.service.start);
  return { day, daysAway: k, start: zoned(day.y, day.m, day.d, sh, sm), end: zoned(day.y, day.m, day.d, eh, em) };
}

/** True from ten minutes before the service until fifteen after it ends. */
export function isLive(now: Date = new Date()) {
  const t = londonParts(now);
  if (t.wd !== CHURCH.service.weekday) return false;
  const mins = t.h * 60 + t.min;
  const [sh, sm] = hm(CHURCH.service.start);
  const [eh, em] = hm(CHURCH.service.end);
  return mins >= sh * 60 + sm - 10 && mins <= eh * 60 + em + 15;
}

export function greeting(now: Date = new Date()) {
  if (sabbathState(now).inSabbath) return "Happy Sabbath!";
  const h = londonParts(now).h;
  if (h < 12) return "Good morning, and welcome.";
  if (h < 18) return "Good afternoon, and welcome.";
  return "Good evening, and welcome.";
}

/* ---------- Events ---------- */

export type EventInstance = (ChurchEvent | WeeklyItem) & { key: string; startLocal: string; endLocal: string; startAt: Date; weekly?: boolean };

export function upcomingEvents(now: Date): EventInstance[] {
  return SITE.events
    .map((e) => ({ ...e, key: e.id, startLocal: e.start, endLocal: e.end, startAt: parseLocal(e.start) }))
    .filter((e) => parseLocal(e.endLocal) > now)
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}

/** Next occurrence of a weekly item. */
export function nextWeekly(item: WeeklyItem, now: Date): EventInstance {
  const t = londonParts(now);
  let day = addDays(t, (item.weekday - t.wd + 7) % 7);
  const [eh, em] = hm(item.end);
  if (zoned(day.y, day.m, day.d, eh, em) <= now) day = addDays(day, 7);
  const startLocal = isoLocal(day, item.start);
  return { ...item, key: `${item.id}-${startLocal}`, startLocal, endLocal: isoLocal(day, item.end), startAt: parseLocal(startLocal), weekly: true };
}

/* ---------- Formatting ---------- */

export const fmtTime = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(d).replace(/\s/g, "").replace(":00", "");

export const fmtTimeFull = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(d).replace(/\s/g, "");

export const fmtDay = (d: Date, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(d);

/** Format a local calendar date (no time zone shifting). */
export const fmtLDate = (dt: LDate, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(new Date(Date.UTC(dt.y, dt.m - 1, dt.d)));

export function fmtCountdown(ms: number) {
  const mins = Math.max(0, Math.round(ms / 60e3));
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  if (d > 0) return `${d} day${d > 1 ? "s" : ""} ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export function dayOfYear(now: Date) {
  const t = londonParts(now);
  return Math.floor((Date.UTC(t.y, t.m - 1, t.d) - Date.UTC(t.y, 0, 0)) / 864e5);
}
