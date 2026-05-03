import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArrowRight, Check, Globe, Mail, MapPin, Sparkles, MessageSquare, LayoutDashboard, X, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

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
      "Full social media management (IG, FB, LinkedIn)",
      "Razorpay payment integration on website",
      "Advanced CRM with lead tracking",
      "Monthly SEO report with keyword rankings",
      "Email marketing via Mailchimp or Zoho",
      "Priority support with 24 hour response",
    ],
    excluded: [],
    cta: "Talk to us",
    href: "/contact?plan=pro",
  },
] as Array<{ name: string; setup: string; monthly: string; blurb: string; highlight?: boolean; features: readonly string[]; excluded: readonly string[]; cta: string; href: string }>;

const faqs = [
  {
    q: "Do I own my domain and website?",
    a: "Yes, completely. Your domain is registered in your name and your website content belongs to you. If you ever leave Bridgeaux you take everything with you. No lock in.",
  },
  {
    q: "Is this just another website builder?",
    a: "No. Website builders make you do all the work. Bridgeaux does the work. One prompt builds your website, email, Google listing, social content and domain together. You manage everything from one dashboard.",
  },
  {
    q: "What if I already have a website?",
    a: "You can connect your existing domain and Bridgeaux builds around what you already have. We fill the gaps, not replace what is working.",
  },
  {
    q: "Which Indian payment methods do you accept?",
    a: "UPI, all major credit and debit cards, and net banking via Razorpay. No international card required.",
  },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[data-reveal]");
    sections.forEach((s) => {
      s.style.opacity = "0";
      s.style.transform = "translateY(20px)";
      s.style.transition = "opacity 500ms ease, transform 500ms ease";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const submitWaitlist = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* HERO */}
      <section data-reveal className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-bridge z-10" aria-hidden />
        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(161 80% 40% / 0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-32 -translate-x-1/2 h-[500px] w-[800px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(161 80% 40% / 0.18) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative container-prose pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="eyebrow">Now in early access · India</span>
            <h1 className="mt-5 font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-brand-ink break-words">
              Your business,{" "}
              <span className="italic text-bridge inline-block pr-2">live online</span>
              <br className="hidden sm:block" /> in 60 minutes.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Most Indian businesses spend three weeks and ₹40,000 just to get
              online. Bridgeaux does the whole bridge — domain, website, email,
              Google listing and social content — automatically, in under an
              hour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-sm bg-brand-green px-5 py-3 text-sm font-medium text-brand-paper hover:bg-brand-green/90 transition"
              >
                Get early access <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-medium text-brand-ink hover:bg-brand-sand transition"
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
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-3 text-[11px] text-muted-foreground font-mono">bridgeaux.app</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs font-mono text-muted-foreground">› Describe your business</p>
                <textarea
                  defaultValue="I run a small bakery in Indiranagar, Bengaluru. We do custom cakes and weekend brunch."
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-[13px] leading-relaxed text-foreground outline-none resize-none focus:border-brand-green/60 transition-colors"
                />
                <div className="flex flex-wrap gap-1.5">
                  {["Restaurant", "Retail", "Tutor", "Salon", "Freelancer"].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-sm bg-brand-sand text-brand-ink/70 border border-transparent transition-colors cursor-pointer hover:!border-brand-green hover:!text-brand-green"
                    >
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

                <a
                  href="#waitlist"
                  className="mt-2 w-full inline-flex items-center justify-center rounded-sm bg-gradient-bridge text-brand-paper text-sm font-medium py-2.5 hover:opacity-90 transition"
                >
                  Launch →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS strip */}
      <section data-reveal className="border-y border-border bg-brand-sand/40">
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
      <section data-reveal className="container-prose py-24">
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
      <section data-reveal className="bg-brand-sand/40 border-y border-border">
        <div className="container-prose py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">The process</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">
              Three steps. Zero confusion.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-border pt-6">
                <div className="font-mono text-sm text-brand-green">{s.n}</div>
                <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section data-reveal className="container-prose py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">
            Honest prices for <span className="italic text-bridge">Indian businesses</span>.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            No agency markups. No hidden fees. Pay only for what you use. All
            prices in INR, GST included where applicable.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
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
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">setup</div>
                </div>
                <div className="flex-1 rounded-sm border border-border p-3">
                  <div className="font-display text-2xl text-brand-ink">{t.monthly}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">per month</div>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
                {t.excluded?.map((f) => (
                  <li key={f} className="flex gap-2 text-muted-foreground/50">
                    <span className="h-4 w-4 shrink-0 inline-flex items-center justify-center text-xs">✕</span>
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
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Need more? We also offer Enterprise and Custom plans.
          </p>
          <Link
            to="/pricing"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:gap-2.5 transition-all"
          >
            See all plans including Enterprise and Custom <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="container-prose py-24">
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">
            Questions, <span className="italic">answered</span>.
          </h2>

          <div className="mt-12">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  style={{
                    borderBottom: "1px solid hsl(160 20% 12%)",
                    padding: "20px 0",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-6 text-left"
                  >
                    <span className="font-display text-lg md:text-xl text-brand-ink">{item.q}</span>
                    {open ? (
                      <Minus className="h-5 w-5 text-brand-green shrink-0" />
                    ) : (
                      <Plus className="h-5 w-5 text-brand-green shrink-0" />
                    )}
                  </button>
                  <div
                    style={{
                      maxHeight: open ? "400px" : "0",
                      overflow: "hidden",
                      transition: "max-height 400ms ease, opacity 300ms ease",
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <p className="pt-4 text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section data-reveal id="waitlist" className="container-prose py-24 text-center">
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            background: "hsl(160 35% 6%)",
            border: "1px solid hsl(161 80% 40% / 0.2)",
            borderRadius: "20px",
            padding: "52px 44px",
          }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Get in <span className="italic text-bridge">early</span>.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Bridgeaux is in early access. Join the waitlist and be first when
            we open up.
          </p>
          <div style={{ marginTop: "28px" }}>
            {submitted ? (
              <div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    background: "hsl(161 80% 40%)",
                    color: "hsl(160 40% 4%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: 600,
                  }}
                >
                  ✓
                </div>
                <p className="mt-4 font-display text-xl text-brand-ink">You are on the list.</p>
                <p className="mt-1 text-sm text-muted-foreground">We will be in touch soon.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(false);
                    }}
                    placeholder="you@email.com"
                    style={{
                      flex: 1,
                      minWidth: "220px",
                      background: "hsl(160 35% 8%)",
                      border: `1px solid ${emailError ? "hsl(0 70% 50%)" : "hsl(160 20% 14%)"}`,
                      borderRadius: "6px",
                      padding: "12px 18px",
                      color: "hsl(165 20% 94%)",
                      fontSize: "14px",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      if (!emailError) e.currentTarget.style.borderColor = "hsl(161 80% 40% / 0.6)";
                    }}
                    onBlur={(e) => {
                      if (!emailError) e.currentTarget.style.borderColor = "hsl(160 20% 14%)";
                    }}
                  />
                  <button
                    onClick={submitWaitlist}
                    style={{
                      background: "hsl(161 80% 40%)",
                      color: "hsl(160 40% 4%)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "inherit",
                    }}
                  >
                    Join Waitlist
                  </button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  No spam. Just an early invite when we launch.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
