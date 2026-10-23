import type { Metadata } from "next";
import { Church, CreditCard, Info, Landmark, Mail, Phone } from "lucide-react";
import { Faq, PageHero, SectionHead } from "@/components/Blocks";
import { Example } from "@/components/Example";
import { CHURCH } from "@/lib/content";

export const metadata: Metadata = {
  title: "Give",
  description: "Tithes and offerings at Bradley Seventh-day Adventist Church."
};

const GIVING_FAQ = [
  { q: "What's the difference between tithe and offerings?", a: "Tithe is the tenth of our income Adventists return to God (Malachi 3:10). It supports pastors and ministry across the conference. Offerings are gifts beyond that, and they support the local church, community work and mission." },
  { q: "Do I have to give if I'm visiting?", a: "Not at all. Giving is an act of worship for church members. As our guest, please just enjoy the service." }
];

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

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
          <div className="note sun mb-4">
            <Info aria-hidden />
            <span>
              Giving details are deliberately left out of this demo. The church treasurer will confirm the online giving option, bank
              details and any Gift Aid wording before anything is published here.
            </span>
          </div>
          <div className="grid grid-3">
            <div className="card reveal">
              <div className="card-ico"><CreditCard aria-hidden /></div>
              <h3>Online <Example label="Coming soon" /></h3>
              <p className="muted">A secure way to give by card, once or regularly, will be added here once the church has chosen a provider.</p>
              <button type="button" className="btn btn-primary mt-1" disabled>Online giving coming soon</button>
            </div>
            <div className="card reveal d1">
              <div className="card-ico"><Landmark aria-hidden /></div>
              <h3>Bank transfer</h3>
              <p className="muted">To give by standing order or one-off transfer, please ask the church treasurer for the account details.</p>
              <ul className="contact-list mb-0">
                <li><span className="ci"><Phone aria-hidden /></span><span><span className="k">Phone</span><a href={tel(CHURCH.phone)}>{CHURCH.phone}</a></span></li>
                <li><span className="ci"><Mail aria-hidden /></span><span><span className="k">Email</span><a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a></span></li>
              </ul>
            </div>
            <div className="card reveal d2">
              <div className="card-ico"><Church aria-hidden /></div>
              <h3>In person <Example /></h3>
              <p className="muted">Give during the Saturday service using a tithe envelope. Ask a deacon or the welcome team if you need one.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <SectionHead eyebrow="FAQ" title="Questions about giving" />
          <Faq items={GIVING_FAQ} openFirst={false} />
        </div>
      </section>
    </>
  );
}
