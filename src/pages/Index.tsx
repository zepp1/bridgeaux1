import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArrowRight, Check, Globe, Mail, MapPin, Sparkles, MessageSquare, LayoutDashboard } from "lucide-react";

const pieces = [
  { icon: Globe, title: "Website", body: "Mobile-ready, SEO clean. Live in minutes — not weeks." },
  { icon: Mail, title: "Business email", body: "yourname@yourbrand.in via Zoho. Professional from day one." },
  { icon: MapPin, title: "Google listing", body: "GBP set up and optimised so locals actually find you." },
  { icon: MessageSquare, title: "Social content", body: "Your first 15 posts, captions and a calendar — ready to publish." },
  { icon: Sparkles, title: "Domain", body: ".com or .in suggestions, registered in your name. One click." },
  { icon: LayoutDashboard, title: "Dashboard", body: "One control room for your entire online presence." },
];

const steps = [
  { n: "01", title: "Describe your business", body: "A few sentences — what you do, who you serve, where you are." },
  { n: "02", title: "Bridgeaux assembles it all", body: "Domain, website, email, listing and content — built in parallel." },
  { n: "03", title: "Approve and go live", body: "Review in one screen. Click launch. Manage from a single dashboard." },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-bridge" aria-hidden />
        <div className="container-prose pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="eyebrow">Now in early access · India</span>
            <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.02] tracking-tight text-brand-ink">
              Your business,{" "}
              <span className="italic text-bridge pr-2">live online</span>
              <br /> in 60 minutes.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Most Indian businesses spend three weeks and ₹40,000 just to get
              online. Bridgeaux does the whole bridge — domain, website, email,
              Google listing and social content — automatically, in under an
              hour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact?intent=waitlist"
                className="inline-flex items-center gap-2 rounded-sm bg-brand-ink px-5 py-3 text-sm font-medium text-brand-paper hover:bg-brand-ink/90 transition"
              >
                Get early access <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-sm border border-brand-ink/15 px-5 py-3 text-sm font-medium text-brand-ink hover:bg-brand-sand transition"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["AK", "RS", "PM", "VT", "NK", "SD"].map((i, idx) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-semibold text-brand-paper"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--brand-blue)) ${idx * 15}%, hsl(var(--brand-green)))`,
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-brand-ink font-medium">200+ founders</span> already on the waitlist
              </p>
            </div>
          </div>

          {/* Hero illustration: bridge */}
          <div className="md:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative rounded-md bg-card shadow-lift border border-border overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border flex items-center gap-1.5 bg-brand-sand/40">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-ink/15" />
                <span className="ml-3 text-[11px] text-muted-foreground font-mono">bridgeaux.app</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs font-mono text-muted-foreground">› Describe your business</p>
                <p className="text-sm text-brand-ink leading-relaxed">
                  "I run a small bakery in Indiranagar, Bengaluru. We do
                  custom cakes and weekend brunch."
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Restaurant", "Retail", "Tutor", "Salon", "Freelancer"].map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-sm bg-brand-sand text-brand-ink/70">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="rule-bridge my-2" />

                <ul className="space-y-2.5 text-sm">
                  {[
                    ["Domain", "sweetcrumb.in"],
                    ["Website", "5 pages, mobile ready"],
                    ["Email", "hello@sweetcrumb.in"],
                    ["Google listing", "Verified · Indiranagar"],
                    ["Social", "15 posts queued"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="flex items-center gap-1.5 text-brand-ink">
                        <Check className="h-3.5 w-3.5 text-brand-green" />
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className="mt-2 w-full rounded-sm bg-gradient-bridge text-brand-paper text-sm font-medium py-2.5">
                  Launch →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS strip */}
      <section className="border-y border-border bg-brand-sand/40">
        <div className="container-prose py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["60 min", "Average setup"],
            ["8+", "Tools, one place"],
            ["63 M", "Indian businesses"],
            ["< 30%", "Properly online today"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-brand-ink">{n}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="container-prose py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">The bridge</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">
            One prompt. <span className="italic">Everything</span> launches.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            No agency. No developer. No Googling at midnight. The six things
            every business actually needs — assembled together, the way a
            bridge is built piece by piece, span by span.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border">
          {pieces.map((p) => (
            <div key={p.title} className="bg-card p-7 flex flex-col gap-3">
              <p.icon className="h-5 w-5 text-brand-teal" />
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-brand-ink text-brand-paper">
        <div className="container-prose py-24">
          <div className="max-w-2xl">
            <span className="eyebrow text-brand-paper/60">The process</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-brand-paper">
              Three steps. Zero confusion.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-brand-paper/15 pt-6">
                <div className="font-mono text-sm text-brand-leaf">{s.n}</div>
                <h3 className="mt-3 font-display text-2xl text-brand-paper">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-paper/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl tracking-tight">
          Get in <span className="italic text-bridge">early</span>.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          Bridgeaux is in early access. Join the waitlist and be first in line
          when we open up.
        </p>
        <Link
          to="/contact?intent=waitlist"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-brand-ink px-6 py-3 text-sm font-medium text-brand-paper hover:bg-brand-ink/90"
        >
          Join the waitlist <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </Layout>
  );
};

export default Index;
