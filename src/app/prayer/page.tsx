import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { VerseBanner } from "@/components/Explore";
import { PrayerHub } from "@/components/Forms";

export const metadata: Metadata = {
  title: "Prayer",
  description: "Send a private prayer request to Bradley Seventh-day Adventist Church."
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
        lead="Share a request in confidence and our prayer team will pray for you. Whatever you're facing, you're not on your own."
      >
        <div className="btn-row reveal d2">
          <a href="#request" className="btn btn-primary">Send a request</a>
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
