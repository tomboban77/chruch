import type { Metadata } from "next";
import { BookOpen, Radio, Users } from "lucide-react";
import { PageHero, SectionHead } from "@/components/Blocks";
import { LiveStatus } from "@/components/LiveStatus";
import { SermonLibrary, VideoPlayer } from "@/components/Video";
import { Example } from "@/components/Example";
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
        <div className="container split wide-right">
          <div className="reveal">
            <span className="eyebrow">Latest service</span>
            <h2>Watch the most recent service</h2>
            <p className="lead">This is the church&apos;s latest service on YouTube. Press play to watch it here.</p>
            <a className="btn btn-ghost" href={CHURCH.youtubeChannel} target="_blank" rel="noopener">Open on YouTube</a>
          </div>
          <div className="reveal d1"><VideoPlayer /></div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Sermon library" title={<>Watch again <Example label="Mock-up" /></>} text="A preview of how past sermons could be browsed by series or searched by passage." />
          <SermonLibrary />
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-3">
          <div className="card reveal">
            <div className="card-ico"><Radio aria-hidden /></div>
            <h3>Live every Saturday <Example /></h3>
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
