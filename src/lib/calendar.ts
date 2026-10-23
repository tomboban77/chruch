/* Add-to-calendar links and .ics files, generated in the browser. */

import { CHURCH } from "./content";

export type CalItem = {
  id: string;
  title: string;
  startLocal: string; // "YYYY-MM-DDTHH:MM" London time
  endLocal: string;
  desc?: string;
  location?: string;
  weekly?: boolean;
};

const stamp = (iso: string) => iso.replace(/[-:]/g, "") + "00";
const esc = (s = "") => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => "\\" + c);
const fullAddress = () => `${CHURCH.name}, ${CHURCH.address.join(", ")}`;

export function googleCalendarUrl(e: CalItem) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${stamp(e.startLocal)}/${stamp(e.endLocal)}`,
    ctz: "Europe/London",
    details: e.desc ?? "",
    location: e.location && !/online/i.test(e.location) ? fullAddress() : e.location ?? fullAddress()
  });
  if (e.weekly) p.set("recur", "RRULE:FREQ=WEEKLY");
  return `https://calendar.google.com/calendar/render?${p}`;
}

const VTIMEZONE = [
  "BEGIN:VTIMEZONE", "TZID:Europe/London",
  "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0000", "TZOFFSETTO:+0100", "TZNAME:BST", "DTSTART:19810329T010000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
  "BEGIN:STANDARD", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0000", "TZNAME:GMT", "DTSTART:19961027T020000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
  "END:VTIMEZONE"
];

export function buildIcs(e: CalItem) {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Bradley SDA Church//Website//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    ...VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${e.id}-${stamp(e.startLocal)}@bradley-sda`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Europe/London:${stamp(e.startLocal)}`,
    `DTEND;TZID=Europe/London:${stamp(e.endLocal)}`,
    ...(e.weekly ? ["RRULE:FREQ=WEEKLY"] : []),
    `SUMMARY:${esc(e.title)}`,
    `DESCRIPTION:${esc(e.desc)}`,
    `LOCATION:${esc(e.location && /online/i.test(e.location) && !/person/i.test(e.location) ? e.location : fullAddress())}`,
    "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
}

export function downloadIcs(e: CalItem) {
  const blob = new Blob([buildIcs(e)], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
