import type { Metadata } from "next";
import { Church, CreditCard, Info, Landmark } from "lucide-react";
import { Faq, PageHero, SectionHead } from "@/components/Blocks";
import { CopyRow, GiftAidCalculator } from "@/components/Forms";
import { OnlineGiving } from "@/components/OnlineGiving";

export const metadata: Metadata = {
  title: "Give",
  description: "Tithes and offerings at Bradley Seventh-day Adventist Church, with Gift Aid for UK taxpayers."
};

const GIVING_FAQ = [
  { q: "What's the difference between tithe and offerings?", a: "Tithe is the tenth of our income Adventists return to God (Malachi 3:10). It supports pastors and ministry across the conference. Offerings are gifts beyond that, and they fund our local church, community work and missions." },
  { q: "Do I have to give if I'm visiting?", a: "Not at all. Giving is an act of worship for church members. As our guest, please just enjoy the service." },
  { q: "How does Gift Aid work?", a: "If you're a UK taxpayer, you can complete a simple Gift Aid declaration once. The church can then claim an extra 25p from HMRC for every £1 you give." },
  { q: "Can I give to a specific project?", a: "Yes. Mark your envelope or bank reference with the project name, for example Building, Youth or Community." }
];

export default function GivePage() {
  return (
    <>
      <PageHero
        crumb="Give"
        image="openHands"
        imageAlt="Two open hands held out in prayer"
        eyebrow="Tithes and offerings"
        title={<>Generosity is <span className="accent">worship</span></>}
        lead="Every gift supports worship in Bradley, care for our neighbours and the mission of the Adventist church around the world. Thank you."
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Ways to give" title="Choose what works for you" />
          <div className="grid grid-3">
            <div className="card reveal">
              <div className="card-ico"><CreditCard aria-hidden /></div>
              <h3>Online</h3>
              <p className="muted">Give securely by card, once or regularly. Tithe and offerings are recorded for your Gift Aid.</p>
              <OnlineGiving />
            </div>
            <div className="card reveal d1">
              <div className="card-ico"><Landmark aria-hidden /></div>
              <h3>Bank transfer</h3>
              <p className="muted">Set up a standing order or one-off payment. Use your name and &ldquo;Tithe&rdquo; or &ldquo;Offering&rdquo; as the reference.</p>
              <CopyRow label="Account name" value="Bradley SDA Church (to confirm)" />
              <CopyRow label="Sort code" value="00-00-00" />
              <CopyRow label="Account number" value="00000000" />
            </div>
            <div className="card reveal d2">
              <div className="card-ico"><Church aria-hidden /></div>
              <h3>In person</h3>
              <p className="muted">Tithe envelopes are available at the welcome desk every Saturday. Place them in the offering during the service.</p>
            </div>
          </div>
          <div className="note sun mt-3">
            <Info aria-hidden />
            <span>Bank details and the online giving link are placeholders. The church treasurer should supply the real ones before launch.</span>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Gift Aid</span>
            <h2>Make your gift go 25% further</h2>
            <p className="lead">If you&apos;re a UK taxpayer, Gift Aid adds 25p to every £1 you give, at no extra cost to you. Try it:</p>
          </div>
          <div className="form-card reveal d1"><GiftAidCalculator /></div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHead eyebrow="FAQ" title="Questions about giving" />
          <Faq items={GIVING_FAQ} openFirst={false} />
        </div>
      </section>
    </>
  );
}
