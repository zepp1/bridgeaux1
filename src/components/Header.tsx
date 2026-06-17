import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors",
        scrolled
          ? "bg-background/85 backdrop-blur border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-sm transition-colors",
                  isActive
                    ? "text-brand-ink"
                    : "text-muted-foreground hover:text-brand-ink",
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/auth"
            className="inline-flex items-center rounded-sm border border-brand-ink/15 px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-sand transition-colors"
          >
            Sign in
          </Link>
          <a
            href="/#waitlist"
            className="inline-flex items-center rounded-sm bg-brand-ink px-4 py-2 text-sm font-medium text-brand-paper hover:bg-brand-ink/90 transition-colors"
          >
            Get early access
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-brand-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "py-2.5 text-base",
                    isActive ? "text-brand-ink font-medium" : "text-muted-foreground",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-3">
              <Link
                to="/auth"
                className="flex-1 text-center rounded-sm border border-brand-ink/15 px-4 py-2.5 text-sm"
              >
                Sign in
              </Link>
              <a
                href="/#waitlist"
                className="flex-1 text-center rounded-sm bg-brand-ink text-brand-paper px-4 py-2.5 text-sm"
              >
                Get early access
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
