import type { Metadata } from "next";
import { Accessibility, Baby, Car, Coffee, MessageCircle, Shirt, Utensils } from "lucide-react";
import { Faq, FindUs, PageHero, SectionHead, Timeline } from "@/components/Blocks";
import { SabbathTimes } from "@/components/Explore";
import { ContactForm, VisitWizard } from "@/components/Forms";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Plan your visit",
  description: "What to expect on your first Saturday at Bradley Seventh-day Adventist Church in Huddersfield."
};

const GOOD_TO_KNOW = [
  { icon: Shirt, title: "Come as you are", text: "Suits, jeans, your favourite jumper. There's no dress code, just a warm welcome." },
  { icon: Baby, title: "Children welcome", text: "Classes for children during Sabbath School, and little ones are always welcome in the service.", example: true },
  { icon: Car, title: "Parking", text: "On-street parking around Copthorne Gardens. Ask for a space by the door if you need one.", example: true },
  { icon: Accessibility, title: "Accessibility", text: "Tell us what would help and we'll do our best to make your visit easy.", example: true },
  { icon: Coffee, title: "No pressure", text: "You won't be singled out or asked to give. Sit back, join in, or just listen." },
  { icon: Utensils, title: "Fellowship lunch", text: "Stay after the service to share a meal and get to know people.", example: true }
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        crumb="Plan your visit"
        image="welcomeGreeting"
        imageAlt="Two church members greeting each other with a hug"
        eyebrow="Plan your visit"
        title={<>We&apos;d love to <span className="accent">meet you</span></>}
        lead="Whether you've been to church all your life or never at all, you're welcome here. Here's everything you need for your first Saturday."
      >
        <div className="btn-row reveal d2">
          <a href="#plan" className="btn btn-primary">Let us know you&apos;re coming</a>
          <a href="#faq" className="btn btn-ghost">Read the FAQs</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Saturday morning" title={<>What to expect <Example label="Example schedule" /></>} text="Our Saturday service runs from 10am to about 1pm. The breakdown below is an example for the church team to confirm." />
          <Timeline />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Good to know" title="The little things" />
          <div className="grid grid-3">
            {GOOD_TO_KNOW.map(({ icon: Icon, title, text, example }, i) => (
              <div key={title} className={`card reveal d${i % 3}`}>
                <div className="card-ico"><Icon aria-hidden /></div>
                <h3>{title}{example && <Example />}</h3>
                <p className="muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="plan-section">
        <div className="container split top">
          <div className="reveal">
            <span className="eyebrow">Plan your visit</span>
            <h2>Let us know you&apos;re coming</h2>
            <p className="lead">It takes a minute, and it means the welcome team will know to look out for you.</p>
            <div className="note mt-3">
              <MessageCircle aria-hidden />
              <span>Prefer to just turn up? That&apos;s completely fine too. Look for the welcome team at the door.</span>
            </div>
          </div>
          <div className="reveal d1"><VisitWizard /></div>
        </div>
      </section>

      <section className="section sky" id="sabbath-times">
        <div className="container split top">
          <div className="reveal">
            <span className="eyebrow">Why Saturday?</span>
            <h2>The Sabbath, sunset to sunset</h2>
            <p className="lead">
              Like Jesus and the early church, we rest and worship on the seventh day of the week, the Sabbath. It begins at sunset on
              Friday and ends at sunset on Saturday (Genesis 1:5, Exodus 20:8-11).
            </p>
            <p className="muted">
              It&apos;s a weekly pause from work and screens to spend time with God, family and friends, and to enjoy creation. The times
              here are calculated live for Huddersfield.
            </p>
          </div>
          <div className="reveal d1"><SabbathTimes /></div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container narrow">
          <SectionHead eyebrow="FAQ" title="Questions newcomers ask" />
          <Faq />
        </div>
      </section>

      <section className="section alt" id="contact">
        <div className="container split top">
          <div className="reveal">
            <span className="eyebrow">Get in touch</span>
            <h2>Ask us anything</h2>
            <p className="lead">Bible studies, baptism, a dedication or just a question about Saturday. We&apos;d love to hear from you.</p>
          </div>
          <div className="reveal d1"><ContactForm /></div>
        </div>
      </section>

      <section className="section">
        <div className="container"><FindUs /></div>
      </section>
    </>
  );
}
