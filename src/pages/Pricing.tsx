import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "₹0",
    sub: "forever",
    blurb: "Test the waters. See your business online today.",
    features: [
      "Bridgeaux subdomain",
      "Single page website",
      "Google Business Profile setup guide",
      "Zoho free email",
    ],
    excluded: ["Custom domain", "Remove watermark", "Business email inbox", "Monthly content"],
    cta: "Get started free",
    href: "/contact?plan=free",
  },
  {
    name: "Starter",
    price: "₹499",
    sub: "setup, then ₹299/month",
    blurb: "Everything a small business needs to look professional.",
    highlight: true,
    features: [
      "Custom .com or .in domain",
      "Multi-page website, no watermark",
      "Business email via Zoho",
      "Google Business Profile auto-linked",
      "15 AI social posts per month",
      "Content calendar included",
    ],
    cta: "Get early access",
    href: "/contact?plan=starter",
  },
  {
    name: "Growth",
    price: "₹2,999",
    sub: "setup, then ₹999/month",
    blurb: "For businesses that want leads, not just a website.",
    features: [
      "Everything in Starter",
      "25 AI image generations / month",
      "WhatsApp Business setup",
      "CRM via Google Sheets or Cloud",
      "Lead inbox dashboard",
      "Directory listings (JustDial, IndiaMART)",
      "Priority support",
    ],
    cta: "Talk to us",
    href: "/contact?plan=growth",
  },
];

const Pricing = () => (
  <Layout>
    <section className="container-prose pt-20 pb-10">
      <span className="eyebrow">Pricing</span>
      <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight max-w-3xl">
        Honest prices for <span className="italic text-bridge">Indian businesses</span>.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        No agency markups. No hidden fees. Pay only for what you actually use.
        All prices in INR, GST included where applicable.
      </p>
    </section>

    <section className="container-prose pb-20 grid md:grid-cols-3 gap-6">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={cn(
            "relative rounded-md border p-7 flex flex-col bg-card",
            t.highlight ? "border-brand-ink shadow-lift" : "border-border",
          )}
        >
          {t.highlight && (
            <span className="absolute -top-3 left-7 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm bg-gradient-bridge text-brand-paper">
              Most popular
            </span>
          )}
          <h3 className="font-display text-2xl">{t.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-4xl text-brand-ink">{t.price}</span>
            <span className="text-sm text-muted-foreground">{t.sub}</span>
          </div>

          <ul className="mt-6 space-y-2.5 text-sm flex-1">
            {t.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
            {t.excluded?.map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground/50">
                <span className="h-4 w-4 shrink-0 rounded-full bg-muted-foreground/30 inline-flex items-center justify-center">
                  <X className="h-2.5 w-2.5 text-background" strokeWidth={3} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            to={t.href}
            className={cn(
              "mt-8 inline-flex justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition",
              t.highlight
                ? "bg-brand-ink text-brand-paper hover:bg-brand-ink/90"
                : "border border-brand-ink/15 text-brand-ink hover:bg-brand-sand",
            )}
          >
            {t.cta}
          </Link>
        </div>
      ))}
    </section>

    <section className="container-prose pb-24">
      <div className="rounded-md border border-border p-8 md:p-12 bg-brand-sand/40">
        <h2 className="font-display text-2xl">Need something custom?</h2>
        <p className="mt-2 text-muted-foreground max-w-xl">
          For chains, franchises, and agencies serving multiple businesses,
          we offer volume pricing and a partner dashboard. Get in touch.
        </p>
        <Link
          to="/contact?intent=enterprise"
          className="mt-5 inline-flex rounded-sm border border-brand-ink/15 px-5 py-2.5 text-sm font-medium hover:bg-background"
        >
          Talk to sales
        </Link>
      </div>
    </section>
  </Layout>
);

export default Pricing;
