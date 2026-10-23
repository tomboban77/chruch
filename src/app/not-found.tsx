import Link from "next/link";
import { PageHero } from "@/components/Blocks";

export default function NotFound() {
  return (
    <PageHero crumb="Not found" eyebrow="Page not found" title="This page has gone for a Sabbath rest" lead="We couldn't find what you were looking for. Try one of these instead.">
      <div className="btn-row">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/visit" className="btn btn-ghost">Plan your visit</Link>
        <Link href="/watch" className="btn btn-ghost">Watch online</Link>
      </div>
    </PageHero>
  );
}
