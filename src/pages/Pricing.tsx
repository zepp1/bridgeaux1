import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    setup: "₹1,999",
    monthly: "₹999",
    blurb:
      "For solo founders and home businesses that want to look legitimate online from day one.",
    highlight: false,
    features: [
      "AI generated multi-page website",
      "Domain purchase assisted via GoDaddy",
      "Business email via Zoho (you@yourbrand.in)",
      "Google Business Profile created and optimised",
      "AI generated logo",
      "10 social media posts per month with captions",
      "Basic content calendar",
      "Bridgeaux dashboard access",
    ],
    excluded: [
      "AI image generation",
      "Social media scheduling",
      "WhatsApp Business",
      "CRM setup",
      "Integrations",
    ],
    cta: "Get started",
    href: "/contact?plan=starter",
  },
  {
    name: "Growth",
    setup: "₹3,499",
    monthly: "₹1,299",
    blurb: "For serious businesses that want leads, not just a website.",
    highlight: true,
    features: [
      "Everything in Starter",
      "15 AI image generations per month",
      "Social media scheduling from dashboard",
      "WhatsApp Business API setup",
      "Basic CRM via Google Sheets or Supabase",
      "Directory listings on JustDial and IndiaMART",
      "Google review management and response suggestions",
      "Monthly website content updates",
      "Analytics dashboard, website visits and GBP views",
    ],
    excluded: [],
    cta: "Get early access",
    href: "/contact?plan=growth",
  },
  {
    name: "Pro",
    setup: "₹6,499",
    monthly: "₹3,999",
    blurb:
      "For real operations that want to grow aggressively and run everything from one place.",
    highlight: false,
    features: [
      "Everything in Growth",
      "25 AI image generations per month",
      "Full social media management across Instagram, Facebook and LinkedIn",
      "Razorpay payment integration on website",
      "Advanced CRM with lead tracking and follow-up reminders",
      "Monthly SEO report with keyword rankings",
      "Email marketing via Mailchimp or Zoho Campaigns",
      "CA partner referral for GST and compliance",
      "Priority support with 24 hour response",
      "Quarterly strategy call with Bridgeaux team",
    ],
    excluded: [],
    cta: "Talk to us",
    href: "/contact?plan=pro",
  },
  {
    name: "Enterprise",
    setup: "₹14,999",
    monthly: "₹7,499",
    blurb:
      "For chains, franchises, funded startups and agencies managing multiple businesses.",
    highlight: false,
    features: [
      "Everything in Pro",
      "Multi-location dashboard management",
      "Dedicated account manager",
      "Custom integrations on request",
      "White label option for agencies",
      "Weekly performance reports",
      "Google and Meta ad campaign management",
      "Custom API connections to existing tools",
      "Legal partner referrals for trademark and company registration",
      "Monthly 1 on 1 strategy call",
    ],
    excluded: [],
    cta: "Talk to us",
    href: "/contact?plan=enterprise",
  },
  {
    name: "Custom",
    setup: "₹30,000+",
    monthly: "Custom",
    blurb:
      "For businesses with specific needs outside our standard stack. We scope and quote per project.",
    highlight: false,
    features: [
      "Fully custom scope and delivery",
      "Government and enterprise grade integrations",
      "Dedicated build team",
      "Custom SLA and support terms",
      "White label and reseller options",
      "Direct founder access",
    ],
    excluded: [],
    cta: "Contact us",
    href: "/contact?plan=custom",
  },
];

const PricingCard = ({ t }: { t: (typeof tiers)[number] }) => (
  <div
    className={cn(
      "relative rounded-md border p-7 flex flex-col bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
      t.highlight ? "border-brand-green shadow-lift" : "border-border",
    )}
  >
    {t.highlight && (
      <span className="absolute -top-3 left-7 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm bg-gradient-bridge text-brand-paper">
        Most popular
      </span>
    )}
    <h3 className="font-display text-2xl">{t.name}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>

    <div className="mt-6 flex items-stretch gap-3">
      <div className="flex-1 rounded-sm border border-border p-3">
        <div className="font-display text-2xl text-brand-ink">{t.setup}</div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
          setup
        </div>
      </div>
      <div className="flex-1 rounded-sm border border-border p-3">
        <div className="font-display text-2xl text-brand-ink">{t.monthly}</div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
          per month
        </div>
      </div>
    </div>

    <ul className="mt-6 space-y-2.5 text-sm flex-1">
      {t.features.map((f) => (
        <li key={f} className="flex gap-2">
          <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
          <span>{f}</span>
        </li>
      ))}
      {t.excluded.map((f) => (
        <li key={f} className="flex gap-2 text-muted-foreground/50">
          <span className="h-4 w-4 shrink-0 inline-flex items-center justify-center text-xs">
            ✕
          </span>
          <span className="line-through">{f}</span>
        </li>
      ))}
    </ul>

    <Link
      to={t.href}
      className={cn(
        "mt-8 inline-flex justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition",
        t.highlight
          ? "bg-brand-green text-brand-paper hover:bg-brand-green/90"
          : "border border-border text-brand-ink hover:bg-brand-sand",
      )}
    >
      {t.cta}
    </Link>
  </div>
);

const Pricing = () => (
  <Layout>
    <section className="container-prose pt-20 pb-10">
      <span className="eyebrow">Pricing</span>
      <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight max-w-4xl">
        Everything your business needs online.{" "}
        <span className="text-bridge">None of the agency markup.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Five plans built for Indian businesses at every stage. From a solo home
        baker to a funded startup with multiple locations. All prices in INR,
        GST applicable.
      </p>
      <p className="mt-6 max-w-3xl text-sm text-muted-foreground bg-brand-sand/40 border border-border rounded-sm px-4 py-3">
        💡 A freelancer charges ₹15,000 to ₹40,000 for a basic website alone. A
        digital agency costs ₹15,000 to ₹50,000 per month. Bridgeaux gives you
        both, plus email, Google listing, social content and a dashboard, for
        a fraction of the cost.
      </p>
    </section>

    <section className="container-prose pb-10 grid md:grid-cols-3 gap-6">
      {tiers.slice(0, 3).map((t) => (
        <PricingCard key={t.name} t={t} />
      ))}
    </section>

    <section className="container-prose pb-20">
      <div className="grid md:grid-cols-2 gap-6 md:max-w-[66%] md:mx-auto">
        {tiers.slice(3).map((t) => (
          <PricingCard key={t.name} t={t} />
        ))}
      </div>
    </section>

    <section className="container-prose pb-24">
      <div className="rounded-md border border-border p-8 md:p-12 bg-brand-sand/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl">Not sure which plan fits?</h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Every business is different. If none of the plans above match
            exactly what you need, talk to us. We will scope a custom plan that
            works for your budget and goals.
          </p>
        </div>
        <Link
          to="/contact?intent=custom"
          className="inline-flex shrink-0 rounded-sm bg-brand-green px-5 py-2.5 text-sm font-medium text-brand-paper hover:bg-brand-green/90 transition"
        >
          Talk to us
        </Link>
      </div>
    </section>
  </Layout>
);

export default Pricing;
