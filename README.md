# Bradley Seventh-day Adventist Church website

Next.js 16 (App Router, TypeScript), plain CSS, no backend yet.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Church details, events, sermons, ministries, beliefs, verses, prayer wall samples | `src/lib/content.ts` |
| Colours, fonts, every component style | `src/app/globals.css` |
| Sabbath sunset maths, live-stream window, next service | `src/lib/time.ts` |
| Add-to-calendar (.ics and Google) | `src/lib/calendar.ts` |
| Pages | `src/app/<page>/page.tsx` |
| Photos (stock placeholders, swap for real church photos with the same filenames) | `public/images/`, wired up in `src/lib/images.ts` |

Items marked `sample: true` in `content.ts` are placeholders for the church team to confirm.

## Preview tricks

- `?now=2026-10-24T10:30` pretends it's that moment (shows the Live badge, Sabbath countdown and so on).

## Forms

Prayer requests, plan-a-visit, contact and newsletter forms work in the browser only. To go live, replace each `onSubmit` in `src/components/Forms.tsx` (and the newsletter in `Footer.tsx`) with a call to a form service or a Next.js route handler. Bank details and the online giving link on `/give` are placeholders.
