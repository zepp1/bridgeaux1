import { Layout } from "@/components/Layout";

const principles = [
  {
    t: "Bridges, not builders",
    d: "We don't hand you tools and templates. We span the distance between your idea and a fully working business — the way a bridge spans a river. You walk across, you don't build it.",
  },
  {
    t: "Indian by default",
    d: "Built in INR pricing. Razorpay, UPI, .in domains, GST-ready invoicing, Indian data centres. Languages and listings tuned for India first — global later.",
  },
  {
    t: "Honest software",
    d: "No dark patterns, no surprise renewals, no agency markup. You can leave with everything you own, on any plan, at any time.",
  },
  {
    t: "Quiet automation",
    d: "AI does the heavy lifting in the background. The interface stays simple, the result feels human. Your customers should never know a robot wrote the first draft.",
  },
];

const About = () => (
  <Layout>
    <section className="container-prose pt-20 pb-16 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-5">
        <span className="eyebrow">About</span>
        <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight">
          We're building the <span className="italic text-bridge">on-ramp</span> to digital India.
        </h1>
      </div>
      <div className="md:col-span-7 md:pt-10 space-y-5 text-lg text-foreground/85 leading-relaxed">
        <p>
          There are 63 million businesses in India. Fewer than 30% have a
          website that works on a phone. Fewer still have a verified Google
          listing, a business email, or any kind of social presence.
        </p>
        <p>
          It isn't because they don't want one. It's because the path is too
          long: pick a builder, register a domain, find a designer, set up
          email, claim a listing, hire someone for posts. Three weeks. ₹40,000.
          Most never finish.
        </p>
        <p>
          Bridgeaux exists to collapse that path into a single sentence and a
          single hour. The bridge in our logo is literal: from where you are
          to where your customers can find you.
        </p>
      </div>
    </section>

    <div className="rule-bridge container-prose" />

    <section className="container-prose py-20">
      <h2 className="font-display text-3xl tracking-tight">What we believe</h2>
      <div className="mt-10 grid md:grid-cols-2 gap-10">
        {principles.map((p) => (
          <div key={p.t}>
            <h3 className="font-display text-xl">{p.t}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-brand-ink text-brand-paper">
      <div className="container-prose py-20 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-4xl">2025</div>
          <div className="text-sm text-brand-paper/60 mt-1 uppercase tracking-wider">Founded in Bengaluru</div>
        </div>
        <div>
          <div className="font-display text-4xl">9</div>
          <div className="text-sm text-brand-paper/60 mt-1 uppercase tracking-wider">People, three cities</div>
        </div>
        <div>
          <div className="font-display text-4xl">200+</div>
          <div className="text-sm text-brand-paper/60 mt-1 uppercase tracking-wider">Businesses on the waitlist</div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
