import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { Globe, HeartPulse, Sunrise } from "lucide-react";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { BeliefsExplorer } from "@/components/Explore";
import { CHURCH } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description: "The story of Bradley Seventh-day Adventist Church (formerly Fartown SDA Church) and what Adventists believe."
};

const PILLARS = [
  { icon: Sunrise, title: "Sabbath rest", text: "Every week we stop, from Friday sunset to Saturday sunset, to rest, worship and enjoy time with the people we love." },
  { icon: HeartPulse, title: "Whole-person health", text: "We believe God cares about body, mind and spirit, so we're passionate about healthy living, rest and community wellbeing." },
  { icon: Globe, title: "A worldwide family", text: "We're one of tens of thousands of Adventist congregations worldwide, part of the North England Conference here in the UK." }
];

const LEADERS = [
  { name: CHURCH.pastor, role: "Pastor", initials: "FN", colour: "linear-gradient(135deg,#1d5c96,#0d2644)" },
  { name: "Name to confirm", role: "Head elder", initials: "HE", colour: "linear-gradient(135deg,#2c7656,#123d2c)" },
  { name: "Name to confirm", role: "Church clerk", initials: "CC", colour: "linear-gradient(135deg,#d6831a,#8a4a0b)" },
  { name: "Name to confirm", role: "Youth leader", initials: "YL", colour: "linear-gradient(135deg,#b8475f,#5e1d2c)" }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About us"
        image="congregation"
        imageAlt="A diverse congregation gathered for worship"
        eyebrow="Who we are"
        title={<>A family church with <span className="accent">a blessed hope</span></>}
        lead="We're Bradley Seventh-day Adventist Church: ordinary people from many backgrounds, learning to follow Jesus together in Huddersfield."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>From Fartown to Bradley</h2>
            <p className="lead">For years, many in Huddersfield knew us as Fartown SDA Church. Today our church family meets at 5 Copthorne Gardens in Bradley, under a new name and with the same heart.</p>
            <p className="muted">
              We&apos;re a multi-generational, multicultural congregation. On any Saturday you&apos;ll find grandparents and babies, students and
              families, long-time members and first-time visitors. Our aim is simple: that everyone who walks through the door feels like part
              of the family. (The church team can add more of its history here.)
            </p>
          </div>
          <div className="reveal d1">
            <figure className="photo story-photo">
              <Image src={IMG.embrace} alt="Two church members embracing during a service" fill placeholder="blur" sizes="(max-width: 900px) 100vw, 50vw" />
            </figure>
            <div className="name-card">
              <span className="eyebrow">Our name</span>
              <p>
                <em>Seventh-day</em> for the Sabbath we keep. <em>Adventist</em> for the return of Jesus we look forward to.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="What shapes us" title="Three things you'll notice" />
          <div className="grid grid-3">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className={`card reveal d${i}`}>
                <div className="card-ico"><Icon aria-hidden /></div>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="beliefs">
        <div className="container">
          <SectionHead
            eyebrow="What we believe"
            title="The 28 Fundamental Beliefs"
            text="Adventists take the Bible as our only creed. These 28 beliefs summarise how we understand its teaching. Explore them by theme, or search."
            action={<a className="link-arrow" href="https://www.adventist.org/beliefs/" target="_blank" rel="noopener">Read them in full at adventist.org</a>}
          />
          <BeliefsExplorer />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Leadership" title="Our team" text="Names and photos for the church team to add." />
          <div className="grid grid-4">
            {LEADERS.map((l, i) => (
              <div key={l.role} className={`person reveal d${i}`}>
                <div className="avatar" style={{ background: l.colour }}>{l.initials}</div>
                <h3>{l.name}</h3>
                <div className="role">{l.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <CtaBand title="Want to know more?" text="Bible studies, baptism classes or just a coffee and a chat. We'd love to explore faith with you.">
            <Link href="/visit#contact" className="btn btn-light">Get in touch</Link>
            <Link href="/visit" className="btn btn-outline-light">Plan a visit</Link>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
