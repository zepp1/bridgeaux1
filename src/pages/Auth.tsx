import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";

type Mode = "signin" | "signup";
type Method = "email" | "email-otp" | "phone-otp";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z.string().min(8, "At least 8 characters").max(128);
const phoneSchema = z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Use international format, e.g. +919876543210");

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [method, setMethod] = useState<Method>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const oauth = async (provider: "google" | "apple") => {
    setBusy(true);
    try {
      const res = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/dashboard" });
      if (res.error) {
        toast.error(res.error.message || `Could not sign in with ${provider}`);
      } else if (!res.redirected) {
        navigate("/dashboard");
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const submitEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRes = emailSchema.safeParse(email);
    const pwRes = passwordSchema.safeParse(password);
    if (!emailRes.success) return toast.error(emailRes.error.issues[0].message);
    if (!pwRes.success) return toast.error(pwRes.error.issues[0].message);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: emailRes.data,
          password: pwRes.data,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName.trim() || undefined },
          },
        });
        if (error) throw error;
        toast.success("Account created. Welcome to Bridgeaux.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: emailRes.data, password: pwRes.data });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const sendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = emailSchema.safeParse(email);
    if (!res.success) return toast.error(res.error.issues[0].message);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: res.data,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
      setOtpSent(true);
      toast.success("Code sent to your email");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not send code");
    } finally {
      setBusy(false);
    }
  };

  const sendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = phoneSchema.safeParse(phone);
    if (!res.success) return toast.error(res.error.issues[0].message);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: res.data });
      if (error) throw error;
      setOtpSent(true);
      toast.success("Code sent via SMS");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not send code. Phone provider may need setup.");
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("Enter the 6-digit code");
    setBusy(true);
    try {
      const params = method === "phone-otp"
        ? { phone, token: otp, type: "sms" as const }
        : { email, token: otp, type: "email" as const };
      const { error } = await supabase.auth.verifyOtp(params);
      if (error) throw error;
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid code");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/"><Logo /></Link>
        </div>

        <div className="bg-card border border-border rounded-md shadow-paper p-7">
          <h1 className="text-2xl font-display mb-1">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "signin" ? "Sign in to your Bridgeaux dashboard." : "Start your business online in minutes."}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              disabled={busy}
              onClick={() => oauth("google")}
              className="flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-3 py-2.5 text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <GoogleIcon /> Google
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => oauth("apple")}
              className="flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-3 py-2.5 text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <AppleIcon /> Apple
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider"><span className="bg-card px-2 text-muted-foreground">or</span></div>
          </div>

          <div className="flex gap-1 mb-4 text-xs">
            {(["email", "email-otp", "phone-otp"] as Method[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMethod(m); setOtpSent(false); setOtp(""); }}
                className={`flex-1 py-1.5 rounded-sm border transition-colors ${
                  method === m ? "border-brand-ink bg-brand-ink text-brand-paper" : "border-border text-muted-foreground hover:text-brand-ink"
                }`}
              >
                {m === "email" ? "Password" : m === "email-otp" ? "Email OTP" : "Phone OTP"}
              </button>
            ))}
          </div>

          {method === "email" && (
            <form onSubmit={submitEmailPassword} className="space-y-3">
              {mode === "signup" && (
                <Input label="Full name" value={fullName} onChange={setFullName} placeholder="Priya Sharma" />
              )}
              <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@business.com" required />
              <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" required />
              <PrimaryButton busy={busy}>{mode === "signin" ? "Sign in" : "Create account"}</PrimaryButton>
            </form>
          )}

          {method === "email-otp" && (
            otpSent ? (
              <form onSubmit={verifyOtp} className="space-y-3">
                <p className="text-sm text-muted-foreground">We sent a 6-digit code to <b>{email}</b>.</p>
                <Input label="Verification code" value={otp} onChange={setOtp} placeholder="123456" required />
                <PrimaryButton busy={busy}>Verify and sign in</PrimaryButton>
                <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-muted-foreground hover:text-brand-ink w-full text-center">Use a different email</button>
              </form>
            ) : (
              <form onSubmit={sendEmailOtp} className="space-y-3">
                <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@business.com" required />
                <PrimaryButton busy={busy}>Send code</PrimaryButton>
              </form>
            )
          )}

          {method === "phone-otp" && (
            otpSent ? (
              <form onSubmit={verifyOtp} className="space-y-3">
                <p className="text-sm text-muted-foreground">We sent a 6-digit code to <b>{phone}</b>.</p>
                <Input label="Verification code" value={otp} onChange={setOtp} placeholder="123456" required />
                <PrimaryButton busy={busy}>Verify and sign in</PrimaryButton>
                <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-muted-foreground hover:text-brand-ink w-full text-center">Use a different number</button>
              </form>
            ) : (
              <form onSubmit={sendPhoneOtp} className="space-y-3">
                <Input label="Phone number" value={phone} onChange={setPhone} placeholder="+919876543210" required />
                <PrimaryButton busy={busy}>Send SMS code</PrimaryButton>
              </form>
            )
          )}

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signin" ? "New to Bridgeaux?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-brand-ink font-medium hover:underline">
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-brand-ink">← Back to homepage</Link>
        </p>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-green/60 focus:ring-2 focus:ring-brand-green/20 transition-colors"
      />
    </label>
  );
}

function PrimaryButton({ children, busy }: { children: React.ReactNode; busy: boolean }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="w-full rounded-sm bg-brand-ink text-brand-paper px-4 py-2.5 text-sm font-medium hover:bg-brand-ink/90 transition-colors disabled:opacity-60"
    >
      {busy ? "Please wait..." : children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 12.04c-.03-2.97 2.42-4.39 2.53-4.46-1.38-2.02-3.53-2.3-4.3-2.33-1.83-.18-3.57 1.08-4.5 1.08-.94 0-2.37-1.05-3.9-1.02-2 .03-3.85 1.16-4.88 2.95-2.08 3.61-.53 8.95 1.5 11.88.99 1.43 2.17 3.04 3.71 2.98 1.49-.06 2.05-.96 3.85-.96 1.8 0 2.31.96 3.88.93 1.6-.03 2.62-1.46 3.6-2.9 1.13-1.66 1.6-3.27 1.63-3.36-.04-.02-3.13-1.2-3.16-4.79zM14.13 3.5c.82-1 1.37-2.38 1.22-3.76-1.18.05-2.61.79-3.46 1.78-.76.88-1.43 2.29-1.25 3.64 1.32.1 2.66-.67 3.49-1.66z"/>
    </svg>
  );
}
