"use client";

import { useMemo, useState } from "react";
import { Play, Search } from "lucide-react";
import { CHURCH, SITE } from "@/lib/content";
import { DemoNotice, Example } from "./Example";

/**
 * Click-to-load YouTube player. Nothing loads from YouTube until the visitor
 * presses play, which keeps pages fast and avoids cookies.
 */
export function VideoPlayer({ id = CHURCH.youtubeLatest, caption = "Latest service" }: { id?: string; caption?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={caption}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <button className="video-btn" type="button" onClick={() => setPlaying(true)} aria-label={`Play: ${caption}`}>
            <span className="play"><Play aria-hidden fill="currentColor" /></span>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <div className="video-caption"><span className="chip">Watch</span>{caption}</div>
        </>
      )}
    </div>
  );
}

/**
 * Layout preview for a future sermon archive. The entries in content.ts are
 * made up, so cards are clearly labelled and deliberately don't play anything.
 */
export function SermonLibrary() {
  const [series, setSeries] = useState("All");
  const [q, setQ] = useState("");

  const allSeries = useMemo(() => ["All", ...new Set(SITE.sermons.map((s) => s.series))], []);
  const list = SITE.sermons.filter((s) => {
    if (series !== "All" && s.series !== series) return false;
    const hay = `${s.title} ${s.speaker} ${s.text} ${s.series}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <>
      <DemoNotice>
        Mock-up: these sermons are made-up examples to show how a searchable archive could look. They don&apos;t link to real
        recordings. For real services, use the player above or the church&apos;s YouTube channel.
      </DemoNotice>
      <div className="beliefs-tools">
        <div className="filter-bar" role="group" aria-label="Filter by series">
          {allSeries.map((s) => (
            <button key={s} type="button" className="filter-btn" aria-pressed={series === s} onClick={() => setSeries(s)}>
              {s === "All" ? "All sermons" : s}
            </button>
          ))}
        </div>
        <label className="search">
          <Search aria-hidden />
          <span className="sr-only">Search sermons</span>
          <input className="input" type="search" placeholder="Search title, speaker or passage" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <div className="sermon-grid">
        {list.map((s) => (
          <article key={s.title} className="sermon">
            <div className="thumb" style={{ background: SITE.seriesColours[s.series as keyof typeof SITE.seriesColours] }}>
              <span className="series">{s.series}</span>
              <span className="dur">{s.length}</span>
            </div>
            <div className="body">
              <span className="meta">{s.text}</span>
              <h3>{s.title} <Example /></h3>
              <span className="meta">{s.speaker}</span>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="empty">No sermons match that search.</p>}
      </div>
    </>
  );
}
