import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { ArrowRight, ArrowUpRight, CalendarHeart, CirclePlay, HeartHandshake } from "lucide-react";
import { Hero, SabbathTile } from "@/components/Hero";
import { CtaBand, Faq, FAQS, FindUs, SectionHead, Timeline } from "@/components/Blocks";
import { EventCards } from "@/components/Events";
import { MinistryScroller, VerseBanner } from "@/components/Explore";
import { VideoPlayer } from "@/components/Video";
import { Example } from "@/components/Example";

const MARQUEE = ["Come as you are", "Saturdays at ten", "Rest for the weary", "Families welcome", "Everyone welcome", "Bradley, Huddersfield"];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Quick links */}
      <section className="section tight">
        <div className="container">
          <div className="bento">
            <Link href="/visit" className="tile t-visit reveal">
              <span className="tile-ico"><CalendarHeart aria-hidden /></span>
              <span className="go"><ArrowUpRight aria-hidden /></span>
              <Image className="tile-bg" src={IMG.welcomeGreeting} alt="" fill placeholder="blur" sizes="(max-width: 960px) 100vw, 50vw" />
              <div>
                <h3>New here? We saved you a seat.</h3>
                <p>Tell us you&apos;re coming and someone will be ready to meet you at the door and show you around.</p>
              </div>
            </Link>
            <Link href="/watch" className="tile t-watch reveal d1">
              <span className="tile-ico"><CirclePlay aria-hidden /></span>
              <span className="go"><ArrowUpRight aria-hidden /></span>
              <div>
                <h3>Worship from home</h3>
                <p>Live every Saturday from 10am, with past services and sermon series on demand.</p>
              </div>
            </Link>
            <SabbathTile />
            <Link href="/prayer" className="tile t-prayer reveal d2">
              <span className="tile-ico"><HeartHandshake aria-hidden /></span>
              <span className="go"><ArrowUpRight aria-hidden /></span>
              <div>
                <h3>Need prayer?</h3>
                <p>Our prayer team keeps every request private.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      {/* First Saturday */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Your first visit"
            title={<>Your first Saturday with us <Example label="Example schedule" /></>}
            text="Visiting a new church can feel like a lot. Here's what a typical Saturday morning could look like, so you know what to expect before you arrive. Our service runs from 10am to about 1pm."
            action={<Link href="/visit" className="link-arrow">Everything about visiting <ArrowRight aria-hidden /></Link>}
          />
          <Timeline />
          <div className="photo-pair">
            <figure className="photo reveal">
              <Image src={IMG.fellowshipAfterService} alt="Families chatting together after a church service" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 58vw" />
              <figcaption>A warm welcome, every week</figcaption>
            </figure>
            <figure className="photo reveal d1">
              <Image src={IMG.fellowshipLunch} alt="People sharing food together at a church gathering" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 40vw" />
              <figcaption>Time together after worship</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Watch */}
      <section className="section watch-section">
        <div className="container split wide-right">
          <div className="reveal">
            <span className="eyebrow">Watch online</span>
            <h2>Worship with us from home</h2>
            <p className="lead">Can&apos;t make it in person? Every Saturday service is streamed online, so you can join from wherever you are.</p>
            <ul className="kv">
              <li><span>Live stream <Example /></span><span>Saturdays from 10:00am</span></li>
              <li><span>Past services</span><span>On our YouTube channel</span></li>
              <li><span>Midweek prayer <Example /></span><span>Wednesdays, 7:00pm</span></li>
            </ul>
            <div className="btn-row">
              <Link href="/watch" className="btn btn-sun">Sermon library</Link>
            </div>
          </div>
          <div className="reveal d1">
            <VideoPlayer />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What's on"
            title="Coming up"
            text="Everyone is welcome at our events, whether or not you've been to a service."
            action={<Link href="/events" className="btn btn-ghost">See all events</Link>}
          />
          <EventCards />
        </div>
      </section>

      {/* Ministries */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Get involved"
            title={<>Something for <span className="accent">every age</span></>}
            text="From Pathfinders to the prayer team, there's a place for you to belong, grow and serve."
            action={<Link href="/ministries" className="link-arrow">All ministries <ArrowRight aria-hidden /></Link>}
          />
          <MinistryScroller />
        </div>
      </section>

      {/* Verse */}
      <section className="section tight">
        <div className="container">
          <VerseBanner />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container split top">
          <div className="reveal">
            <span className="eyebrow">Good questions</span>
            <h2>Questions newcomers ask</h2>
            <p className="lead">Still wondering about something? Ask us anything, there&apos;s no such thing as a silly question.</p>
            <Link href="/visit#contact" className="btn btn-ghost mt-2">Ask a question</Link>
          </div>
          <div className="reveal d1">
            <Faq items={FAQS.slice(0, 5).concat(FAQS[FAQS.length - 1])} />
          </div>
        </div>
      </section>

      {/* Prayer CTA */}
      <section className="section tight">
        <div className="container">
          <CtaBand
            title="How can we pray for you?"
            text="Whatever you're facing, you don't have to face it alone. Our prayer team keeps every request private."
          >
            <Link href="/prayer" className="btn btn-light">Send a prayer request</Link>
          </CtaBand>
        </div>
      </section>

      {/* Find us */}
      <section className="section">
        <div className="container">
          <FindUs />
        </div>
      </section>
    </>
  );
}
