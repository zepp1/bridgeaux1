import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I own my domain and website?",
    a: "Yes, completely. Your domain is registered in your name. Your website content belongs to you. If you ever leave Bridgeaux you take everything with you. No lock-in.",
  },
  {
    q: "Is this just another website builder?",
    a: "No. Website builders make you do all the work — pick a template, write copy, configure email, set up a Google listing. Bridgeaux does the work. One prompt assembles your website, email, Google listing, social content and domain together. You manage everything from one dashboard.",
  },
  {
    q: "What if I already have a website?",
    a: "You can connect your existing domain and Bridgeaux builds around what you already have — adding email, Google listing, social content, lead inbox. We fill the gaps, not replace what is working.",
  },
  {
    q: "Which Indian payment methods do you accept?",
    a: "UPI, all major credit and debit cards, and net banking via Razorpay. No international card required.",
  },
  {
    q: "Which languages do you support?",
    a: "English today, with Hindi, Tamil, Telugu, Kannada, Marathi and Bengali rolling out through 2026. You can write the prompt in any of these and your website can be bilingual.",
  },
  {
    q: "How long does setup actually take?",
    a: "47 minutes on average from first prompt to a fully live business — including Google listing verification (which is the slowest piece). Most websites are ready to preview in under 10 minutes.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans cancel at the end of the current billing cycle. You keep your domain, content and email — you can point them anywhere.",
  },
  {
    q: "Is my data safe?",
    a: "Your data lives in Indian data centres. We never sell or share it. You can export everything at any time, and delete your account in one click.",
  },
];

const FAQ = () => (
  <Layout>
    <section className="container-prose pt-20 pb-10">
      <span className="eyebrow">FAQ</span>
      <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight max-w-3xl">
        Questions people <span className="italic text-bridge">actually ask</span>.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Don't see your question? Write to us — we reply within a working day.
      </p>
    </section>

    <section className="container-prose pb-24 max-w-3xl">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="font-display text-lg text-left hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </Layout>
);

export default FAQ;
