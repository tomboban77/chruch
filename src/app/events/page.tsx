import type { Metadata } from "next";
import { PageHero, SectionHead } from "@/components/Blocks";
import { EventList, WeeklyRhythm } from "@/components/Events";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Events",
  description: "Worship, prayer, youth, health and community events at Bradley Seventh-day Adventist Church, Huddersfield."
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumb="Events"
        image="fellowshipLunch"
        imageAlt="People sharing a meal together"
        eyebrow="What's on"
        title={<>Life together, <span className="accent">all week</span></>}
        lead="Everyone is welcome at our events, whether or not you've been to a service. Add anything to your calendar in one tap."
      />

      <section className="section tight">
        <div className="container">
          <SectionHead eyebrow="Every week" title={<>Our weekly rhythm <Example label="Example schedule" /></>} />
          <WeeklyRhythm />
        </div>
      </section>

      <section className="section">
        <div className="container narrow" style={{ maxWidth: 980 }}>
          <SectionHead eyebrow="Coming up" title="Special events" text="Events marked Example are placeholders for the church team to replace." />
          <EventList />
        </div>
      </section>
    </>
  );
}
