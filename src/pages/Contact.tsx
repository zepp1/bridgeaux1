import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [params] = useSearchParams();
  const intent = params.get("intent") ?? params.get("plan") ?? "general";
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      message:
        intent === "waitlist"
          ? "I'd like early access for my business."
          : intent === "enterprise"
          ? "I'm interested in volume / partner pricing."
          : intent === "starter" || intent === "growth" || intent === "free"
          ? `I'd like to start on the ${intent} plan.`
          : "",
    }));
  }, [intent]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) {
      toast({ title: "Please fill in your name and email.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "You're on the list.", description: "We'll be in touch within a working day." });
  };

  return (
    <Layout>
      <section className="container-prose pt-20 pb-16 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 font-display text-5xl tracking-tight">
            Let's <span className="italic text-bridge">talk</span>.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Whether you want early access, have a partnership idea, or just a
            question, drop us a line and a real human writes back.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-brand-teal" />
              <div>
                <div className="font-medium text-brand-ink">hello@bridgeaux.app</div>
                <div className="text-muted-foreground">For general questions</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-brand-teal" />
              <div>
                <div className="font-medium text-brand-ink">+91 80 4718 2200</div>
                <div className="text-muted-foreground">Mon–Sat, 10am–7pm IST</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-brand-teal" />
              <div>
                <div className="font-medium text-brand-ink">Bengaluru, India</div>
                <div className="text-muted-foreground">HSR Layout · By appointment</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div className="rounded-md border border-border bg-card p-10 text-center shadow-paper">
              <div className="mx-auto h-12 w-12 rounded-full bg-brand-green/15 flex items-center justify-center">
                <Check className="h-6 w-6 text-brand-green" />
              </div>
              <h2 className="mt-5 font-display text-2xl">You're on the list.</h2>
              <p className="mt-2 text-muted-foreground">
                We'll reply to <span className="text-brand-ink font-medium">{form.email}</span> within a working day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-md border border-border bg-card p-7 md:p-9 shadow-paper space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" required>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-base"
                    placeholder="Anita Krishnan"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-base"
                    placeholder="anita@bakery.in"
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Business name">
                  <input
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="input-base"
                    placeholder="Sweet Crumb"
                  />
                </Field>
                <Field label="City">
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input-base"
                    placeholder="Bengaluru"
                  />
                </Field>
              </div>
              <Field label="Tell us a little more">
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-base resize-none"
                  placeholder="What kind of business do you run? What do you need help with?"
                />
              </Field>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-brand-ink px-6 py-3 text-sm font-medium text-brand-paper hover:bg-brand-ink/90"
              >
                {intent === "waitlist" ? "Join the waitlist" : "Send message"}
              </button>
              <p className="text-xs text-muted-foreground">
                No spam. We reply from a real human within a working day.
              </p>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
      {label} {required && <span className="text-brand-green">*</span>}
    </span>
    {children}
  </label>
);

export default Contact;
