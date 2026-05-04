import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const phases = [
  {
    n: "01",
    title: "Tell us about your business",
    detail:
      "Two or three sentences. What you do, who you serve, where you are. That's the whole input. No forms, no jargon, no 12-step wizards.",
    sample: "“Family-run dosa cafe in Koramangala, open 7am–10pm, dine-in and Swiggy.”",
  },
  {
    n: "02",
    title: "Bridgeaux fills the gaps",
    detail:
      "A short conversation, opening hours, photos you already have, the social handles you want. Skip anything you don't know; we'll suggest sensible defaults.",
    sample: "Auto-detected: cuisine, neighbourhood, price range, suggested .in domain.",
  },
  {
    n: "03",
    title: "Everything is assembled in parallel",
    detail:
      "While you sip chai: domain checked and reserved, website laid out and written, business email provisioned via Zoho, Google Business Profile drafted, first 15 social posts written and scheduled.",
    sample: "Average build time: 47 minutes.",
  },
  {
    n: "04",
    title: "Review in one screen",
    detail:
      "Every piece appears in your dashboard with a preview. Approve, tweak the wording, swap a photo, change the colour. One button to publish it all.",
    sample: "Edits are plain English, “make the hero shorter”, “add WhatsApp button”.",
  },
  {
    n: "05",
    title: "Run your business from one place",
    detail:
      "After launch, the same dashboard becomes your control room. Update content, see leads from your website and Google listing, schedule next month's posts.",
    sample: "Lead inbox · content calendar · domain & email settings.",
  },
];

const HowItWorks = () => (
  <Layout>
    <section className="container-prose pt-20 pb-12">
      <span className="eyebrow">How it works · Powered by AI</span>
      <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight max-w-3xl">
        From a single sentence to a <span className="italic text-bridge">live business</span>, in under an hour.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Bridgeaux is powered by AI end to end. You describe your business in
        plain English; our AI writes your website copy, designs the layout,
        drafts your Google listing, generates your first month of social posts
        and assembles everything together, the way an engineer builds a bridge,
        span by span. You stay in control; the AI does the heavy lifting.
      </p>
    </section>

    <div className="rule-bridge container-prose" />

    <section className="container-prose py-16 space-y-20">
      {phases.map((p, i) => (
        <div key={p.n} className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <div className="font-mono text-sm text-brand-teal">{p.n} / 05</div>
            <h2 className="mt-3 font-display text-3xl tracking-tight">{p.title}</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg text-foreground/85 leading-relaxed">{p.detail}</p>
            <div className="mt-5 border-l-2 border-brand-green pl-4 text-sm text-muted-foreground italic">
              {p.sample}
            </div>
          </div>
          {i < phases.length - 1 && (
            <div className="md:col-span-12 rule-bridge opacity-30" />
          )}
        </div>
      ))}
    </section>

    <section className="container-prose py-20 text-center bg-brand-sand/40 rounded-md mx-6 md:mx-10 mb-16">
      <h2 className="font-display text-4xl tracking-tight">Ready to cross the bridge?</h2>
      <p className="mt-3 text-muted-foreground">Early access is opening city by city.</p>
      <Link
        to="/#waitlist"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand-ink px-6 py-3 text-sm font-medium text-brand-paper hover:bg-brand-ink/90 transition-colors"
      >
        Join the waitlist <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  </Layout>
);

export default HowItWorks;
