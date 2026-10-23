import Image from "next/image";
import Link from "next/link";
import { IMG, type ImgKey } from "@/lib/images";
import type { ReactNode } from "react";
import { Mail, MapPin, Navigation, Phone, Smartphone } from "lucide-react";
import { CHURCH } from "@/lib/content";
import { Example } from "./Example";

export function Waves({ className = "waves" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 30c180-20 360-24 540-10s360 22 540 8 270-18 360-14v56H0z" fill="var(--sky-2)" opacity=".5" />
      <path d="M0 48c200-12 420-14 640-4s440 12 800-2v28H0z" fill="var(--bg)" />
    </svg>
  );
}

export function PageHero({
  eyebrow, title, lead, children, variant, crumb, image, imageAlt = ""
}: {
  eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; variant?: "dark" | "warm"; crumb: string;
  image?: ImgKey; imageAlt?: string;
}) {
  const text = (
    <div>
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / {crumb}</nav>
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="reveal">{title}</h1>
      {lead && <p className="lead reveal d1">{lead}</p>}
      {children}
    </div>
  );

  // Dark variant: the photo fills the background behind the text.
  if (variant === "dark") {
    return (
      <section className="page-hero dark">
        {image && <Image className="ph-bg" src={IMG[image]} alt={imageAlt} fill priority placeholder="blur" sizes="100vw" />}
        <div className="container">{text}</div>
      </section>
    );
  }

  return (
    <section className={`page-hero${variant ? " " + variant : ""}${image ? " with-image" : ""}`}>
      <div className="container">
        {image ? (
          <div className="ph-grid">
            {text}
            <div className="ph-photo reveal d1">
              <Image src={IMG[image]} alt={imageAlt} fill priority placeholder="blur" sizes="(max-width: 900px) 100vw, 44vw" />
            </div>
          </div>
        ) : (
          text
        )}
      </div>
      <Waves />
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, action }: { eyebrow?: string; title: ReactNode; text?: ReactNode; action?: ReactNode }) {
  return (
    <div className="section-head reveal">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

export const SATURDAY = [
  { time: "9:45", title: "Arrive and say hello", text: "Someone will meet you at the door, help you find a seat and show you where the children go." },
  { time: "10:00", title: "Sabbath School", text: "Relaxed Bible study in small groups, with classes for children and young people." },
  { time: "11:15", title: "Family worship", text: "Singing, prayer and a message from the Bible that everyone can follow." },
  { time: "1:00", title: "Stay for lunch", text: "Guests are always welcome to join our fellowship lunch afterwards. No need to bring anything." }
];

export function Timeline() {
  return (
    <div className="timeline">
      {SATURDAY.map((s, i) => (
        <div key={s.time} className={`tl-item reveal d${i}`}>
          <div className="tl-time">{s.time}<small>{s.time === "1:00" ? "pm" : "am"}</small></div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export const FAQS: { q: string; a: ReactNode; example?: boolean }[] = [
  { q: "Why do you meet on Saturday?", a: "As Seventh-day Adventists, we keep the Bible's seventh-day Sabbath, from sunset on Friday to sunset on Saturday. It's a day of rest, worship and time with family and friends, a weekly gift we love to share." },
  { q: "What should I wear?", a: "Whatever you feel comfortable in. Some people dress up for church and some don't. You'll be welcome either way." },
  { q: "Is there something for my children?", a: "Yes. During Sabbath School there are classes for children and young people, and children are very welcome to stay with you in the main service.", example: true },
  { q: "Where do I park?", a: "There is on-street parking on Copthorne Gardens and the surrounding roads. Please be considerate of our neighbours' driveways. If you need a space close to the door, let us know when you plan your visit.", example: true },
  { q: "Will I be asked to do anything?", a: "No. You won't be asked to stand up, speak or give money. Just come, join in as much as you like, and enjoy." },
  { q: "Is the building accessible?", a: "There's step-free access into the main hall and an accessible toilet. Tell us what would help and we'll make sure someone is ready to assist.", example: true },
  { q: "We used to know you as Fartown church. Is this the same place?", a: "It's the same church family. Fartown SDA Church is now Bradley Seventh-day Adventist Church, meeting at 5 Copthorne Gardens, Bradley." }
];

export function Faq({ items = FAQS, openFirst = true }: { items?: typeof FAQS; openFirst?: boolean }) {
  return (
    <div className="accordion">
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0}>
          <summary>{f.q}{f.example && <Example />}</summary>
          <div className="acc-body"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  );
}

export function FindUs() {
  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
  return (
    <div className="split">
      <div className="map-frame reveal">
        <iframe src={CHURCH.mapEmbed} title="Map showing 5 Copthorne Gardens, Bradley, Huddersfield" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <div className="reveal d1">
        <span className="eyebrow">Find us</span>
        <h2>5 Copthorne Gardens</h2>
        <p className="lead">Bradley, Huddersfield HD2 1RH. Close to Bradley Park, with on-street parking nearby.</p>
        <ul className="contact-list">
          <li><span className="ci"><MapPin aria-hidden /></span><span><span className="k">Address</span>{CHURCH.address.join(", ")}</span></li>
          <li><span className="ci"><Phone aria-hidden /></span><span><span className="k">Phone</span><a href={tel(CHURCH.phone)}>{CHURCH.phone}</a></span></li>
          <li><span className="ci"><Smartphone aria-hidden /></span><span><span className="k">Mobile</span><a href={tel(CHURCH.mobile)}>{CHURCH.mobile}</a></span></li>
          <li><span className="ci"><Mail aria-hidden /></span><span><span className="k">Email</span><a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a></span></li>
        </ul>
        <a className="btn btn-primary" href={CHURCH.directions} target="_blank" rel="noopener"><Navigation aria-hidden /> Get directions</a>
      </div>
    </div>
  );
}

export function CtaBand({ title, text, children }: { title: ReactNode; text: ReactNode; children: ReactNode }) {
  return (
    <div className="cta-band reveal">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="btn-row">{children}</div>
    </div>
  );
}
