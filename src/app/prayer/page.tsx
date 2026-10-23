import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { VerseBanner } from "@/components/Explore";
import { PrayerHub } from "@/components/Forms";

export const metadata: Metadata = {
  title: "Prayer",
  description: "Send a private prayer request to Bradley Seventh-day Adventist Church, or pray for others on our prayer wall."
};

export default function PrayerPage() {
  return (
    <>
      <PageHero
        crumb="Prayer"
        image="prayerQuiet"
        imageAlt="A woman praying quietly with a Bible on her lap"
        eyebrow="Prayer"
        title={<>You don&apos;t have to carry it <span className="accent">alone</span></>}
        lead="Share a request in confidence, join us for midweek prayer, or pray for someone else on the prayer wall."
      >
        <div className="btn-row reveal d2">
          <a href="#request" className="btn btn-primary">Send a request</a>
          <a href="#wall" className="btn btn-ghost">Visit the prayer wall</a>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <PrayerHub />
        </div>
      </section>
      <section className="section tight">
        <div className="container">
          <VerseBanner />
        </div>
      </section>
    </>
  );
}
