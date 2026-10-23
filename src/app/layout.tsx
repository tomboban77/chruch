import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ActionBar } from "@/components/ActionBar";
import { Reveal } from "@/components/Reveal";
import { ToastProvider } from "@/components/Toast";

// Headings: Plus Jakarta Sans. Body: Inter. Scripture and accent words: Source Serif 4.
const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Bradley Seventh-day Adventist Church · Huddersfield",
    template: "%s · Bradley Adventist Church"
  },
  description:
    "A family church in Bradley, Huddersfield. Worship with us every Saturday from 10am, in person or online. Formerly Fartown SDA Church.",
  openGraph: {
    title: "Bradley Seventh-day Adventist Church",
    description: "Saturdays at ten. Come as you are.",
    locale: "en_GB",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1424" }
  ]
};

// Runs before paint so the saved or system theme never flashes.
const themeScript = `(function(){var t;try{t=localStorage.getItem('bsda-theme')}catch(e){}document.documentElement.setAttribute('data-theme',t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${serif.variable}`} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ToastProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ActionBar />
          <Reveal />
        </ToastProvider>
      </body>
    </html>
  );
}
