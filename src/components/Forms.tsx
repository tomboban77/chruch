"use client";

/*
 * These forms work entirely in the browser for now. When the church is ready
 * for a backend, swap each `onSubmit` for a call to a form service or API route.
 */

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy, Heart, Navigation, Send } from "lucide-react";
import { AddToCalendar } from "./AddToCalendar";
import { CHURCH, SITE, type PrayerNote } from "@/lib/content";
import { useNow, useStoredState } from "@/lib/hooks";
import { addDays, fmtLDate, isoLocal, nextService } from "@/lib/time";
import { useToast } from "./Toast";

function Success({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0", animation: "rise .5s" }}>
      <div className="ok" style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--green-soft)", color: "var(--green)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
        <Check size={34} aria-hidden />
      </div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ---------- Prayer ---------- */

type WallNote = PrayerNote & { id: string };

export function PrayerHub() {
  const toast = useToast();
  const [sent, setSent] = useState(false);
  const [mine, setMine] = useStoredState<WallNote[]>("bsda-wall", []);
  const [prayed, setPrayed] = useStoredState<string[]>("bsda-prayed", []);
  const [errors, setErrors] = useState(false);

  const wall: WallNote[] = [...mine, ...SITE.prayerWall.map((p, i) => ({ ...p, id: `s${i}` }))];

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = String(f.get("request") ?? "").trim();
    if (!text) return setErrors(true);
    if (f.get("wall")) {
      const name = String(f.get("name") ?? "").trim();
      setMine((m) => [{ id: `u${Date.now()}`, text, name: name ? name.split(" ")[0] : "Anonymous", when: "Just now", count: 0 }, ...m]);
    }
    setSent(true);
    toast("Prayer request received");
  };

  const pray = (id: string) => {
    const on = !prayed.includes(id);
    setPrayed((p) => (on ? [...p, id] : p.filter((x) => x !== id)));
    if (on) toast("Thank you for praying");
  };

  return (
    <>
      <div className="split top" id="request">
        <div className="reveal">
          <span className="eyebrow">Prayer requests</span>
          <h2>How can we pray for you?</h2>
          <p className="lead">Whatever you&apos;re facing, you don&apos;t have to face it alone. Share as much or as little as you like.</p>
          <ul className="kv light">
            <li><span>Who reads it</span><span>Our prayer team only</span></li>
            <li><span>Prayer meeting</span><span>Wednesdays, 7:00pm</span></li>
            <li><span>Urgent need?</span><span><a href={`tel:${CHURCH.mobile.replace(/\s/g, "")}`}>{CHURCH.mobile}</a></span></li>
          </ul>
          <p className="small muted">If you are in crisis or feel unsafe, please call 999 or Samaritans on 116 123 (free, 24 hours).</p>
        </div>
        <div className="form-card reveal d1">
          {sent ? (
            <Success title="We're praying with you">
              <p className="muted">Our prayer team will lift this up this week. If you asked us to get in touch, someone will contact you soon.</p>
              <button className="btn btn-ghost" type="button" onClick={() => setSent(false)}>Send another request</button>
            </Success>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor="p-name">Your name <span className="opt">(optional)</span></label>
                <input id="p-name" name="name" className="input" autoComplete="given-name" />
              </div>
              <div className="field">
                <label htmlFor="p-req">Your prayer request</label>
                <textarea id="p-req" name="request" className="textarea" aria-invalid={errors} onChange={() => setErrors(false)} placeholder="What would you like us to pray about?" />
                {errors && <span className="hint" style={{ color: "var(--rose)" }}>Please write a short request so we know how to pray.</span>}
              </div>
              <div className="field">
                <label htmlFor="p-contact">Email or phone <span className="opt">(only if you&apos;d like a reply)</span></label>
                <input id="p-contact" name="contact" className="input" />
              </div>
              <label className="check"><input type="checkbox" name="callback" /> I&apos;d like someone from the church to contact me</label>
              <label className="check"><input type="checkbox" name="wall" /> Share it on the prayer wall without my surname, so others can pray too</label>
              <button className="btn btn-primary btn-block" type="submit"><Send aria-hidden /> Send prayer request</button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-5" id="wall">
        <div className="section-head">
          <div>
            <span className="eyebrow">Prayer wall</span>
            <h2>Pray for one another</h2>
            <p>Tap &ldquo;I prayed&rdquo; to let someone know they&apos;re not alone. Praise reports are marked in green.</p>
          </div>
        </div>
        <div className="prayer-wall">
          {wall.map((p) => {
            const on = prayed.includes(p.id);
            return (
              <article key={p.id} className="prayer-note">
                {p.praise && <span className="chip green mb-2" style={{ marginBottom: 10 }}>Praise report</span>}
                <p>{p.text}</p>
                <div className="pn-foot">
                  <span>{p.name} · {p.when}</span>
                  <button type="button" className="pray-btn" aria-pressed={on} onClick={() => pray(p.id)}>
                    <Heart aria-hidden /> {on ? "Prayed" : "I prayed"} · {p.count + (on ? 1 : 0)}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------- Plan your visit ---------- */

const STEPS = ["When", "Who", "Needs", "You"];

export function VisitWizard() {
  const now = useNow(300_000);
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ date: "", adults: "1", kids: [] as string[], needs: [] as string[], lunch: "yes", name: "", contact: "", note: "" });

  const saturdays = now
    ? Array.from({ length: 4 }, (_, i) => addDays(nextService(now).day, i * 7))
    : [];

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (k: "kids" | "needs", v: string) => set(k, data[k].includes(v) ? data[k].filter((x) => x !== v) : [...data[k], v]);

  const canNext = [!!data.date, true, true, data.name.trim().length > 1 && data.contact.trim().length > 4][step];
  const next = () => {
    if (!canNext) return toast(step === 0 ? "Pick a Saturday first" : "Please add your name and a way to reach you");
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setDone(true);
      toast("Thanks, we can't wait to meet you!");
    }
  };

  const chosen = saturdays.find((s) => isoLocal(s, "10:00") === data.date);
  const prettyDate = chosen ? fmtLDate(chosen, { weekday: "long", day: "numeric", month: "long" }) : "";

  if (done && chosen) {
    return (
      <div className="form-card">
        <Success title={`See you ${prettyDate}, ${data.name.split(" ")[0]}!`}>
          <p className="muted">Someone from our welcome team will be in touch before Saturday. Here&apos;s your plan:</p>
          <ul className="summary-list">
            <li><span>Arrive</span><span>9:45am, {prettyDate}</span></li>
            <li><span>Where</span><span>{CHURCH.address.join(", ")}</span></li>
            <li><span>Group</span><span>{data.adults} adult{data.adults === "1" ? "" : "s"}{data.kids.length ? `, children: ${data.kids.join(", ")}` : ""}</span></li>
            {data.needs.length > 0 && <li><span>We&apos;ll have ready</span><span>{data.needs.join(", ")}</span></li>}
            <li><span>Lunch</span><span>{data.lunch === "yes" ? "Staying, a place is saved" : "Maybe next time"}</span></li>
          </ul>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <AddToCalendar
              className="btn btn-primary"
              item={{ id: "my-visit", title: "Visit Bradley Adventist Church", startLocal: isoLocal(chosen, "09:45"), endLocal: isoLocal(chosen, "13:00"), desc: "Arrive 9:45am. Sabbath School 10:00, worship 11:15, lunch after.", location: "In person" }}
            />
            <a className="btn btn-ghost" href={CHURCH.directions} target="_blank" rel="noopener"><Navigation aria-hidden /> Directions</a>
          </div>
        </Success>
      </div>
    );
  }

  return (
    <div className="form-card" id="plan">
      <div className="stepper" aria-hidden="true">
        {STEPS.map((s, i) => <span key={s} className={`s${i <= step ? " done" : ""}`} />)}
      </div>
      <div className="step-count">Step {step + 1} of {STEPS.length} · {STEPS[step]}</div>

      {step === 0 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="serif" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>Which Saturday works for you?</legend>
          <div className="choice-grid">
            {saturdays.map((s, i) => {
              const v = isoLocal(s, "10:00");
              return (
                <label key={v} className="choice">
                  <input type="radio" name="date" value={v} checked={data.date === v} onChange={() => set("date", v)} />
                  <span>
                    {fmtLDate(s, { day: "numeric", month: "long" })}
                    <small>{i === 0 ? "This Saturday" : i === 1 ? "Next week" : fmtLDate(s, { weekday: "long" })}</small>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div>
          <h3>Who&apos;s coming?</h3>
          <div className="field">
            <label htmlFor="v-adults">Adults</label>
            <select id="v-adults" className="select input" value={data.adults} onChange={(e) => set("adults", e.target.value)}>
              {["1", "2", "3", "4", "5+"].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="label mb-2" style={{ fontWeight: 600 }}>Bringing children? Tick their age groups</div>
          <div className="choice-grid">
            {[["Babies", "0 to 2"], ["Little ones", "3 to 5"], ["Children", "6 to 11"], ["Teens", "12 to 17"]].map(([k, sub]) => (
              <label key={k} className="choice">
                <input type="checkbox" checked={data.kids.includes(k)} onChange={() => toggle("kids", k)} />
                <span>{k}<small>Ages {sub}</small></span>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Anything that would help?</h3>
          <div className="choice-grid mb-3">
            {["Someone to meet me at the door", "A parking space near the door", "Step-free access", "Large-print hymn book", "Hearing loop", "A quiet space for a baby"].map((n) => (
              <label key={n} className="choice">
                <input type="checkbox" checked={data.needs.includes(n)} onChange={() => toggle("needs", n)} />
                <span>{n}</span>
              </label>
            ))}
          </div>
          <div className="field">
            <span className="label">Staying for lunch?</span>
            <div className="choice-grid">
              {[["yes", "Yes please"], ["no", "Not this time"]].map(([v, l]) => (
                <label key={v} className="choice">
                  <input type="radio" name="lunch" checked={data.lunch === v} onChange={() => set("lunch", v)} />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>How can we reach you?</h3>
          <div className="field">
            <label htmlFor="v-name">Your name</label>
            <input id="v-name" className="input" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="v-contact">Email or mobile</label>
            <input id="v-contact" className="input" autoComplete="email" value={data.contact} onChange={(e) => set("contact", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="v-note">Anything else? <span className="opt">(optional)</span></label>
            <textarea id="v-note" className="textarea" style={{ minHeight: 90 }} value={data.note} onChange={(e) => set("note", e.target.value)} />
          </div>
          <p className="hint">We&apos;ll only use this to welcome you. No mailing lists unless you ask.</p>
        </div>
      )}

      <div className="wizard-nav">
        <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)} disabled={step === 0} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
          <ArrowLeft aria-hidden /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={next}>
          {step === STEPS.length - 1 ? "Plan my visit" : "Continue"} <ArrowRight aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ---------- Give ---------- */

export function GiftAidCalculator() {
  const [amount, setAmount] = useState(20);
  const presets = [10, 20, 50, 100];
  const extra = amount * 0.25;
  return (
    <div className="give-option">
      <div className="amounts" role="group" aria-label="Choose an amount">
        {presets.map((p) => (
          <button key={p} type="button" className="amount-btn" aria-pressed={amount === p} onClick={() => setAmount(p)}>£{p}</button>
        ))}
      </div>
      <div className="field mb-0">
        <label htmlFor="ga-amount">Or enter an amount</label>
        <input id="ga-amount" className="input" type="number" min={1} inputMode="decimal" value={amount || ""} onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} />
      </div>
      <div className="fund-split" aria-hidden="true">
        <span style={{ flexGrow: amount || 1, background: "var(--blue)" }} />
        <span style={{ flexGrow: extra || 0.25, background: "var(--sun)" }} />
      </div>
      <div className="legend">
        <span><i style={{ background: "var(--blue)" }} />Your gift £{amount.toFixed(2)}</span>
        <span><i style={{ background: "var(--sun)" }} />Gift Aid +£{extra.toFixed(2)}</span>
      </div>
      <p className="serif" style={{ fontSize: "1.6rem", fontWeight: 600, margin: "6px 0 0" }}>
        The church receives £{(amount + extra).toFixed(2)}
      </p>
      <p className="small muted mb-0">If you pay UK income tax, Gift Aid lets the church claim 25p for every £1 you give, at no cost to you.</p>
    </div>
  );
}

export function CopyRow({ label, value }: { label: string; value: string }) {
  const toast = useToast();
  return (
    <div className="copy-row">
      <span><span className="small muted" style={{ display: "block" }}>{label}</span><span className="v">{value}</span></span>
      <button type="button" className="copy-btn" onClick={() => navigator.clipboard?.writeText(value).then(() => toast(`${label} copied`))}>
        <Copy aria-hidden /> Copy
      </button>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const toast = useToast();
  if (sent)
    return (
      <div className="form-card">
        <Success title="Message sent">
          <p className="muted">Thanks for getting in touch. We usually reply within a couple of days.</p>
          <Link className="btn btn-ghost" href="/">Back to home</Link>
        </Success>
      </div>
    );
  return (
    <form
      className="form-card"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        toast("Message sent");
      }}
    >
      <div className="field-row">
        <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" className="input" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" className="input" type="email" required autoComplete="email" /></div>
      </div>
      <div className="field">
        <label htmlFor="c-topic">What&apos;s it about?</label>
        <select id="c-topic" className="input select">
          <option>Visiting for the first time</option>
          <option>Bible studies</option>
          <option>Baptism</option>
          <option>Weddings, dedications and funerals</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" className="textarea" required /></div>
      <button className="btn btn-primary" type="submit"><Send aria-hidden /> Send message</button>
    </form>
  );
}

