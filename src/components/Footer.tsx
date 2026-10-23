"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CirclePlay, Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "./BrandMark";
import { CHURCH } from "@/lib/content";
import { fmtDay, fmtTimeFull, sabbathState } from "@/lib/time";
import { useNow } from "@/lib/hooks";

function SabbathMini() {
  const now = useNow(60_000);
  if (!now) return <div className="footer-sabbath">Sabbath hours: Friday sunset to Saturday sunset.</div>;
  const s = sabbathState(now);
  return (
    <div className="footer-sabbath">
      {s.inSabbath ? (
        <>Happy Sabbath! Sabbath ends at <b>{fmtTimeFull(s.end)}</b> tonight.</>
      ) : (
        <>This week, Sabbath begins <b>{fmtDay(s.start, { weekday: "long" })} at {fmtTimeFull(s.start)}</b> and ends Saturday at {fmtTimeFull(s.end)}.</>
      )}
    </div>
  );
}

function Newsletter() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="footer-news">
      <h4>Friday reminder</h4>
      <p className="small">A short email each Friday: Sabbath times, the weekend&apos;s programme and the livestream link.</p>
      {sent ? (
        <p className="small" style={{ color: "#fff" }}>Demo only: you have not been signed up. Email sign-up will work once the site is live.</p>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor="news-email" className="sr-only">Email address</label>
          <input id="news-email" className="input" type="email" required placeholder="Your email" autoComplete="email" />
          <button className="btn btn-sun" type="submit">Join</button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>A family church in Bradley, Huddersfield. Come as you are and worship with us every Saturday from 10am.</p>
            <SabbathMini />
            <div className="footer-social">
              <a href={CHURCH.youtubeChannel} target="_blank" rel="noopener" aria-label="Watch on YouTube"><CirclePlay aria-hidden /></a>
              <a href={`mailto:${CHURCH.email}`} aria-label="Email the church"><Mail aria-hidden /></a>
              <a href={CHURCH.directions} target="_blank" rel="noopener" aria-label="Directions"><MapPin aria-hidden /></a>
            </div>
          </div>
          <div>
            <h4>New here</h4>
            <ul>
              <li><Link href="/visit">Plan your visit</Link></li>
              <li><Link href="/visit#faq">Questions newcomers ask</Link></li>
              <li><Link href="/about#beliefs">What Adventists believe</Link></li>
              <li><Link href="/visit#sabbath-times">Sabbath times</Link></li>
              <li><Link href="/prayer">Ask for prayer</Link></li>
            </ul>
          </div>
          <div>
            <h4>Church life</h4>
            <ul>
              <li><Link href="/watch">Watch online</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/ministries">Ministries</Link></li>
              <li><Link href="/give">Give</Link></li>
              <li><Link href="/about">Our story</Link></li>
            </ul>
          </div>
          <div>
            <h4>Find us</h4>
            <ul>
              <li>{CHURCH.address.join(", ")}</li>
              <li><Phone size={14} aria-hidden style={{ display: "inline", marginRight: 6 }} /><a href={`tel:${CHURCH.phone.replace(/\s/g, "")}`}>{CHURCH.phone}</a></li>
              <li><a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a></li>
            </ul>
            <div className="mt-3"><Newsletter /></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            {CHURCH.name}, formerly {CHURCH.formerName}. Part of the {CHURCH.conference}.
          </span>
          <span>© {new Date().getFullYear()} {CHURCH.name}</span>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">Saturdays at ten.</div>
    </footer>
  );
}
