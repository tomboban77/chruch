import type { Metadata } from "next";
import { BookOpen, Radio, Users } from "lucide-react";
import { PageHero, SectionHead } from "@/components/Blocks";
import { LiveStatus } from "@/components/LiveStatus";
import { SermonLibrary } from "@/components/Video";
import { CHURCH } from "@/lib/content";

export const metadata: Metadata = {
  title: "Watch online",
  description: "Join Bradley Seventh-day Adventist Church live every Saturday from 10am, or catch up on past sermons."
};

export default function WatchPage() {
  return (
    <>
      <PageHero
        variant="dark"
        crumb="Watch online"
        image="worship"
        imageAlt="A congregation standing in worship"
        eyebrow="Watch online"
        title={<>Church, wherever <span className="accent" style={{ color: "var(--sun)" }}>you are</span></>}
        lead="Every Saturday service is streamed live from 10am. Catch up on past sermons any time."
      >
        <div className="mt-3"><LiveStatus /></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Sermon library" title="Watch again" text="Browse by series or search for a passage." />
          <SermonLibrary />
        </div>
      </section>

      <section className="section alt">
        <div className="container grid grid-3">
          <div className="card reveal">
            <div className="card-ico"><Radio aria-hidden /></div>
            <h3>Live every Saturday</h3>
            <p className="muted">Sabbath School from 10:00am and the main service from 11:15am. The &ldquo;Live now&rdquo; badge appears in the menu when we&apos;re on air.</p>
          </div>
          <div className="card reveal d1">
            <div className="card-ico"><BookOpen aria-hidden /></div>
            <h3>Study along</h3>
            <p className="muted">Follow this quarter&apos;s Sabbath School lesson, studied by Adventists all over the world each week.</p>
            <a className="link-arrow" href="https://absg.adventist.org" target="_blank" rel="noopener">Open the lesson</a>
          </div>
          <div className="card reveal d2">
            <div className="card-ico"><Users aria-hidden /></div>
            <h3>Watching from home?</h3>
            <p className="muted">Say hello in the chat, or send us a prayer request. You&apos;re part of this church family too.</p>
            <a className="link-arrow" href={CHURCH.youtubeChannel} target="_blank" rel="noopener">Go to YouTube</a>
          </div>
        </div>
      </section>
    </>
  );
}
