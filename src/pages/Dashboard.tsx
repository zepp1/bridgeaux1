import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  LayoutDashboard, Globe, Sparkles, Inbox, CreditCard, Settings, LogOut,
  CheckCircle2, Circle, ArrowRight, TrendingUp, Eye, MessageSquare, FileText
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  business_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  plan: string;
  onboarding_step: number;
};

type Section = "overview" | "website" | "content" | "leads" | "billing" | "settings";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [section, setSection] = useState<Section>("overview");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile(data as Profile);
    });
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  const saveProfile = async (patch: Partial<Profile>) => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      setProfile((p) => p ? { ...p, ...patch } as Profile : p);
      toast.success("Saved");
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const displayName = profile?.full_name || profile?.business_name || user.email?.split("@")[0] || "there";
  const initial = displayName.charAt(0).toUpperCase();

  const navItems: { id: Section; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "website", label: "Website", icon: Globe },
    { id: "content", label: "AI Content", icon: Sparkles },
    { id: "leads", label: "Leads", icon: Inbox },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-card">
        <div className="h-16 flex items-center px-5 border-b border-border">
          <Link to="/"><Logo /></Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors ${
                section === id
                  ? "bg-brand-ink text-brand-paper"
                  : "text-muted-foreground hover:text-brand-ink hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-white text-sm font-semibold">{initial}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-brand-ink truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email || user.phone}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile nav) */}
        <header className="h-16 md:hidden border-b border-border bg-card flex items-center justify-between px-4">
          <Logo />
          <button onClick={handleSignOut} className="text-sm text-muted-foreground"><LogOut className="h-5 w-5" /></button>
        </header>
        <div className="md:hidden border-b border-border bg-card overflow-x-auto">
          <div className="flex gap-1 p-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setSection(id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap ${section === id ? "bg-brand-ink text-brand-paper" : "text-muted-foreground bg-secondary"}`}>
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {section === "overview" && <Overview profile={profile} name={displayName} />}
          {section === "website" && <WebsitePanel />}
          {section === "content" && <ContentPanel />}
          {section === "leads" && <LeadsPanel />}
          {section === "billing" && <BillingPanel profile={profile} />}
          {section === "settings" && <SettingsPanel profile={profile} user={user} onSave={saveProfile} saving={saving} />}
        </main>
      </div>
    </div>
  );
}

/* ============ SECTIONS ============ */

function Overview({ profile, name }: { profile: Profile | null; name: string }) {
  const steps = [
    { label: "Account created", done: true },
    { label: "Tell us about your business", done: !!profile?.business_name },
    { label: "Choose your plan", done: profile?.plan !== "Starter" || (profile?.onboarding_step ?? 0) >= 2 },
    { label: "Approve your AI-generated website", done: false },
    { label: "Go live", done: false },
  ];
  const completed = steps.filter((s) => s.done).length;
  const pct = Math.round((completed / steps.length) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-3xl md:text-4xl font-display">{name}.</h1>
      </div>

      {/* Onboarding progress */}
      <div className="bg-card border border-border rounded-md p-6 shadow-paper">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-display">Getting started</h2>
            <p className="text-sm text-muted-foreground mt-0.5">You're on the <b className="text-brand-ink">{profile?.plan ?? "Starter"}</b> plan. {completed} of {steps.length} steps complete.</p>
          </div>
          <span className="text-2xl font-display text-brand-green">{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden mb-5">
          <div className="h-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green transition-all" style={{ width: `${pct}%` }} />
        </div>
        <ul className="space-y-2.5">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              {s.done ? <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground/50 shrink-0" />}
              <span className={s.done ? "text-muted-foreground line-through" : "text-brand-ink"}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Site visits" value="0" hint="Last 7 days" />
        <StatCard icon={Inbox} label="New leads" value="0" hint="Awaiting reply" />
        <StatCard icon={MessageSquare} label="Social posts" value="0" hint="Scheduled" />
        <StatCard icon={TrendingUp} label="Search rank" value=" - " hint="Top keywords" />
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <QuickCard
          title="Your website is being built"
          body="Our AI is drafting your homepage, about page, and contact form. You'll get a preview email within 24 hours."
          cta="See preview"
        />
        <QuickCard
          title="Connect your socials"
          body="Link Instagram and Facebook so we can post AI-generated content for you on autopilot."
          cta="Connect now"
        />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }: any) {
  return (
    <div className="bg-card border border-border rounded-md p-4 shadow-paper">
      <Icon className="h-4 w-4 text-muted-foreground mb-3" />
      <p className="text-2xl font-display text-brand-ink">{value}</p>
      <p className="text-xs font-medium text-brand-ink mt-1">{label}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function QuickCard({ title, body, cta }: { title: string; body: string; cta: string }) {
  return (
    <div className="bg-card border border-border rounded-md p-5 shadow-paper">
      <h3 className="font-display text-base mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{body}</p>
      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink hover:gap-2 transition-all">
        {cta} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function WebsitePanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-1">Website</h1>
      <p className="text-muted-foreground mb-8">Your AI-generated site, fully editable.</p>
      <div className="bg-card border border-border rounded-md p-8 text-center shadow-paper">
        <Globe className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-display text-lg mb-1">Your site is being drafted</h3>
        <p className="text-sm text-muted-foreground mb-5">We'll email you when the first preview is ready.</p>
        <Link to="/contact" className="inline-flex items-center text-sm font-medium text-brand-ink hover:underline">Need to add details? Talk to us <ArrowRight className="h-4 w-4 ml-1" /></Link>
      </div>
    </div>
  );
}

function ContentPanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-1">AI Content</h1>
      <p className="text-muted-foreground mb-8">Posts and captions drafted for you, ready to schedule.</p>
      <div className="bg-card border border-border rounded-md p-8 text-center shadow-paper">
        <Sparkles className="h-10 w-10 text-brand-green mx-auto mb-3" />
        <h3 className="font-display text-lg mb-1">No posts yet</h3>
        <p className="text-sm text-muted-foreground">Connect a social account to start generating content.</p>
      </div>
    </div>
  );
}

function LeadsPanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-1">Leads</h1>
      <p className="text-muted-foreground mb-8">Form submissions and WhatsApp inquiries land here.</p>
      <div className="bg-card border border-border rounded-md p-8 text-center shadow-paper">
        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-display text-lg mb-1">Inbox is empty</h3>
        <p className="text-sm text-muted-foreground">Leads will appear here once your site is live.</p>
      </div>
    </div>
  );
}

function BillingPanel({ profile }: { profile: Profile | null }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-1">Billing</h1>
      <p className="text-muted-foreground mb-8">Manage your plan and invoices.</p>
      <div className="bg-card border border-border rounded-md p-6 shadow-paper mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Current plan</p>
        <p className="text-2xl font-display mt-1">{profile?.plan ?? "Starter"}</p>
        <p className="text-sm text-muted-foreground mt-2">All prices in INR, GST applicable.</p>
        <Link to="/pricing" className="inline-flex items-center mt-4 rounded-sm bg-brand-ink text-brand-paper px-4 py-2 text-sm font-medium hover:bg-brand-ink/90 transition-colors">
          Compare plans <ArrowRight className="h-4 w-4 ml-1.5" />
        </Link>
      </div>
      <div className="bg-card border border-border rounded-md p-6 shadow-paper">
        <h3 className="font-display text-base mb-1">Invoices</h3>
        <p className="text-sm text-muted-foreground">No invoices yet.</p>
      </div>
    </div>
  );
}

function SettingsPanel({ profile, user, onSave, saving }: { profile: Profile | null; user: any; onSave: (p: Partial<Profile>) => void; saving: boolean }) {
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [businessName, setBusinessName] = useState(profile?.business_name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setBusinessName(profile?.business_name ?? "");
    setPhone(profile?.phone ?? "");
  }, [profile]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-display mb-1">Settings</h1>
      <p className="text-muted-foreground mb-8">Update your account details.</p>
      <form
        onSubmit={(e) => { e.preventDefault(); onSave({ full_name: fullName, business_name: businessName, phone }); }}
        className="bg-card border border-border rounded-md p-6 shadow-paper space-y-4"
      >
        <Field label="Email" value={user.email ?? ""} disabled />
        <Field label="Full name" value={fullName} onChange={setFullName} placeholder="Priya Sharma" />
        <Field label="Business name" value={businessName} onChange={setBusinessName} placeholder="Sharma Bakery" />
        <Field label="Phone" value={phone} onChange={setPhone} placeholder="+919876543210" />
        <button type="submit" disabled={saving} className="rounded-sm bg-brand-ink text-brand-paper px-5 py-2.5 text-sm font-medium hover:bg-brand-ink/90 transition-colors disabled:opacity-60">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, disabled }: { label: string; value: string; onChange?: (v: string) => void; placeholder?: string; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-green/60 focus:ring-2 focus:ring-brand-green/20 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      />
    </label>
  );
}
