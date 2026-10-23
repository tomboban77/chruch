import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { MinistryGrid } from "@/components/Explore";

export const metadata: Metadata = {
  title: "Ministries",
  description: "Sabbath School, Pathfinders, Adventurers, youth, health, community services and more at Bradley Adventist Church."
};

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        variant="warm"
        crumb="Ministries"
        image="childrenInChurch"
        imageAlt="A young child peeking over a church pew next to his father"
        eyebrow="Get involved"
        title={<>Find your <span className="accent">place</span></>}
        lead="Church is more than Saturday morning. Here's how we learn, play, serve and grow together through the week."
      />
      <section className="section">
        <div className="container">
          <MinistryGrid />
        </div>
      </section>
      <section className="section tight">
        <div className="container">
          <CtaBand title="Want to serve?" text="Whether you sing, cook, code, teach or just love people, there's a team that would love your help.">
            <Link href="/visit#contact" className="btn btn-light">Tell us about you</Link>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
