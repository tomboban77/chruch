"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Baby, Clock, MonitorPlay, Navigation, Sunset, Utensils } from "lucide-react";
import { AddToCalendar } from "./AddToCalendar";
import { CHURCH } from "@/lib/content";
import { IMG } from "@/lib/images";
import { useNow } from "@/lib/hooks";
import { fmtCountdown, fmtDay, fmtTimeFull, greeting, isLive, isoLocal, nextService, sabbathState } from "@/lib/time";

function SabbathStrip({ now }: { now: Date }) {
  const s = sabbathState(now);
  return (
    <div className="sabbath-strip">
      <div className="ico"><Sunset aria-hidden /></div>
      <div>
        {s.inSabbath ? (
          <>
            <div className="t1">Happy Sabbath! The Sabbath ends at sunset</div>
            <div className="t2">{fmtTimeFull(s.end)} · {fmtCountdown(s.end.getTime() - now.getTime())} to go</div>
          </>
        ) : (
          <>
            <div className="t1">Sabbath begins at sunset, {fmtDay(s.start, { weekday: "long", day: "numeric", month: "short" })}</div>
            <div className="t2">{fmtTimeFull(s.start)} · in {fmtCountdown(s.start.getTime() - now.getTime())}</div>
          </>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ now }: { now: Date | null }) {
  const svc = now ? nextService(now) : null;
  const live = now ? isLive(now) : false;
  const label = !svc ? "Our next service" : live ? "Happening now" : svc.daysAway === 0 ? "Today" : svc.daysAway === 1 ? "Tomorrow" : "Our next service";

  return (
    <div className="service-card">
      <div className="label">
        <span>{label}</span>
        {live && <Link href="/watch" className="live-pill"><span className="live-dot" />Live</Link>}
      </div>
      <div className="date">{svc ? fmtDay(svc.start) : "Every Saturday"}</div>
      <div className="time"><Clock aria-hidden /> 10:00am to about 1:00pm</div>
      <hr />
      <address>{CHURCH.address.join(", ")}</address>
      <div className="btn-row">
        <a className="btn btn-ghost btn-sm" href={CHURCH.directions} target="_blank" rel="noopener">
          <Navigation aria-hidden /> Directions
        </a>
        {svc && (
          <AddToCalendar
            item={{
              id: "visit",
              title: "Sabbath service at Bradley Adventist Church",
              startLocal: isoLocal(svc.day, "09:45"),
              endLocal: isoLocal(svc.day, "13:00"),
              desc: "Sabbath School 10:00, family worship 11:15, fellowship lunch afterwards. Someone will meet you at the door.",
              location: "In person"
            }}
          />
        )}
      </div>
      {now && <SabbathStrip now={now} />}
    </div>
  );
}

export function Hero() {
  const now = useNow();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="hero-greeting">{now ? greeting(now) : " "}</p>
          <span className="eyebrow">Seventh-day Adventist Church · Huddersfield</span>
          <h1 className="reveal">
            Saturdays
            <br />
            at <em>ten.</em>
          </h1>
          <p className="lead reveal d1">
            We&apos;re a family church in Bradley, Huddersfield. Come as you are and worship with us from 10am to about 1pm,
            then stay for lunch. There&apos;s always room at the table.
          </p>
          <div className="btn-row reveal d1">
            <Link href="/visit#plan" className="btn btn-primary">Plan your visit</Link>
            <Link href="/watch" className="btn btn-ghost">Watch online</Link>
          </div>
          <div className="hero-proof reveal d2">
            <span><Baby aria-hidden /> Classes for every age</span>
            <span><MonitorPlay aria-hidden /> Live online every week</span>
            <span><Utensils aria-hidden /> Fellowship lunch after</span>
          </div>
        </div>

        <div className="hero-media reveal d1">
          <div className="hero-photo">
            <Image
              src={IMG.heroCongregation}
              alt="A congregation seated in wooden pews in a bright church with tall windows"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <span className="hero-badge"><Sunset aria-hidden /> Formerly Fartown SDA Church</span>
          </div>
          <ServiceCard now={now} />
        </div>
      </div>
    </section>
  );
}

export function SabbathTile() {
  const now = useNow();
  const s = now ? sabbathState(now) : null;
  return (
    <Link href="/visit#sabbath-times" className="tile t-sabbath">
      <span className="tile-ico"><Sunset aria-hidden /></span>
      <span className="go"><ArrowUpRight aria-hidden /></span>
      <div>
        <p style={{ margin: "0 0 6px", color: "var(--ink-2)" }}>{s?.inSabbath ? "Happy Sabbath! Ends at" : "Sabbath begins Friday at"}</p>
        <div className="big">{s ? fmtTimeFull(s.inSabbath ? s.end : s.start) : "sunset"}</div>
        <p>{s && !s.inSabbath ? `In ${fmtCountdown(s.start.getTime() - now!.getTime())}` : "Sunset in Huddersfield"}</p>
      </div>
    </Link>
  );
}
