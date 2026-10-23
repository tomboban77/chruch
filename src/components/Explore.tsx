"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IMG, type ImgKey } from "@/lib/images";
import {
  Baby, BookOpen, ChevronLeft, ChevronRight, Clock, Compass, Flame, Flower2, HandHeart, HeartHandshake,
  HeartPulse, House, Music, Search, Share2, Tent, Users, type LucideIcon
} from "lucide-react";
import { SITE } from "@/lib/content";
import { useNow } from "@/lib/hooks";
import { dayOfYear, fmtLDate, fmtTimeFull, sabbathState, sabbathTable } from "@/lib/time";
import { useToast } from "./Toast";

/* ---------- Ministries ---------- */

const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen, baby: Baby, compass: Compass, tent: Tent, flame: Flame, "heart-pulse": HeartPulse,
  "hand-heart": HandHeart, "flower-2": Flower2, users: Users, music: Music, "heart-handshake": HeartHandshake, house: House
};

const MINISTRY_PHOTOS: Record<string, ImgKey> = {
  "Sabbath School": "bibleStudy",
  "Children's ministries": "childrenInChurch",
  Adventurers: "childBible",
  "Community services": "communityServing",
  "Prayer ministry": "prayerHandsBible",
  "Music ministry": "worship",
  "Men's ministries": "fellowshipAfterService",
  "Family ministries": "embrace"
};

function MinistryCard({ m }: { m: (typeof SITE.ministries)[number] }) {
  const Icon = ICONS[m.icon] ?? Users;
  const photo = MINISTRY_PHOTOS[m.name];
  return (
    <article className="ministry">
      <div className="m-media" style={{ background: m.tint }}>
        {photo ? (
          <Image src={IMG[photo]} alt="" fill placeholder="blur" sizes="(max-width: 640px) 90vw, 360px" />
        ) : (
          <Icon className="m-media-ico" style={{ color: m.colour }} aria-hidden />
        )}
      </div>
      <div className="m-body">
        <div className="m-ico" style={{ background: m.colour }}><Icon aria-hidden /></div>
        <h3>{m.name}</h3>
        <p>{m.desc}</p>
        <div className="m-meta">
          {m.audience.map((a) => <span key={a} className="chip ghost">{a}</span>)}
        </div>
        <div className="m-when"><Clock aria-hidden />{m.when}</div>
      </div>
    </article>
  );
}

export function MinistryScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  return (
    <>
      <div className="scroll-btns mb-2" style={{ justifyContent: "flex-end" }}>
        <button className="icon-btn" type="button" aria-label="Scroll ministries left" onClick={() => scroll(-1)}><ChevronLeft aria-hidden /></button>
        <button className="icon-btn" type="button" aria-label="Scroll ministries right" onClick={() => scroll(1)}><ChevronRight aria-hidden /></button>
      </div>
      <div className="scroller" ref={ref}>
        {SITE.ministries.map((m) => <MinistryCard key={m.name} m={m} />)}
      </div>
    </>
  );
}

const AUDIENCES = ["Everyone", "Children", "Youth", "Adults", "Community"];

export function MinistryGrid() {
  const [aud, setAud] = useState("Everyone");
  const list = SITE.ministries.filter((m) => aud === "Everyone" || m.audience.includes(aud) || (aud !== "Community" && m.audience.includes("All ages")));
  return (
    <>
      <div className="filter-bar mb-4" role="group" aria-label="Filter by age group">
        {AUDIENCES.map((a) => (
          <button key={a} type="button" className="filter-btn" aria-pressed={aud === a} onClick={() => setAud(a)}>{a}</button>
        ))}
      </div>
      <div className="grid grid-3">
        {list.map((m) => <MinistryCard key={m.name} m={m} />)}
      </div>
    </>
  );
}

/* ---------- 28 Fundamental Beliefs ---------- */

const CATS = ["All", "God", "Humanity", "Salvation", "Church", "Christian life", "Last things"];

export function BeliefsExplorer() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const list = SITE.beliefs.filter(
    (b) => (cat === "All" || b.cat === cat) && (!needle || `${b.title} ${b.text} ${b.ref}`.toLowerCase().includes(needle))
  );
  return (
    <>
      <div className="beliefs-tools">
        <div className="filter-bar" role="group" aria-label="Filter beliefs">
          {CATS.map((c) => (
            <button key={c} type="button" className="filter-btn" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <label className="search">
          <Search aria-hidden />
          <span className="sr-only">Search beliefs</span>
          <input className="input" type="search" placeholder="Search, e.g. Sabbath" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <div className="beliefs-grid" aria-live="polite">
        {list.map((b) => (
          <article key={b.n} className="belief">
            <span className="num">{String(b.n).padStart(2, "0")}</span>
            <span className="chip ghost" style={{ alignSelf: "flex-start" }}>{b.cat}</span>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            <span className="ref">{b.ref}</span>
          </article>
        ))}
        {list.length === 0 && <p className="empty">No beliefs match &ldquo;{q}&rdquo;.</p>}
      </div>
    </>
  );
}

/* ---------- Verse of the day ---------- */

export function VerseBanner() {
  const now = useNow(300_000);
  const toast = useToast();
  const inSabbath = now ? sabbathState(now).inSabbath : false;
  const v = !now ? SITE.verses[0] : inSabbath ? SITE.sabbathVerse : SITE.verses[dayOfYear(now) % SITE.verses.length];

  const share = async () => {
    const text = `“${v.text}” ${v.ref} (KJV)`;
    try {
      if (navigator.share) await navigator.share({ text, url: window.location.origin });
      else {
        await navigator.clipboard.writeText(text);
        toast("Verse copied to clipboard");
      }
    } catch {}
  };

  return (
    <div className="verse-banner has-photo reveal">
      <Image className="vb-bg" src={IMG.sabbathSunsetBible} alt="" fill placeholder="blur" sizes="(max-width: 1200px) 100vw, 1200px" />
      <span className="eyebrow">{inSabbath ? "A word for the Sabbath" : "Today's verse"}</span>
      <blockquote>{v.text}</blockquote>
      <cite>{v.ref} · KJV</cite>
      <div className="verse-actions">
        <button className="btn btn-outline-light btn-sm" type="button" onClick={share}><Share2 aria-hidden /> Share this verse</button>
        <a className="btn btn-outline-light btn-sm" href="https://absg.adventist.org" target="_blank" rel="noopener"><BookOpen aria-hidden /> This week&apos;s Sabbath School lesson</a>
      </div>
    </div>
  );
}

/* ---------- Sabbath times ---------- */

export function SabbathTimes() {
  const now = useNow(60_000);
  if (!now) return <div style={{ minHeight: 420 }} />;
  const rows = sabbathTable(now, 8);
  const current = sabbathState(now);
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="sabbath-table">
        <caption className="sr-only">Sabbath start and end times in Huddersfield for the next eight weeks</caption>
        <thead>
          <tr><th scope="col">Weekend</th><th scope="col">Begins (Friday sunset)</th><th scope="col">Ends (Saturday sunset)</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={r.start.getTime() === current.start.getTime() ? "current" : undefined}>
              <td>{fmtLDate(r.friday, { day: "numeric", month: "short" })} to {fmtLDate({ ...r.friday, d: r.friday.d + 1 }, { day: "numeric", month: "short" })}</td>
              <td>{fmtTimeFull(r.start)}</td>
              <td>{fmtTimeFull(r.end)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
