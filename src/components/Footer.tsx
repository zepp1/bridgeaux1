import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="mt-24 border-t border-border bg-brand-sand/40">
    <div className="container-prose py-14 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2 max-w-sm">
        <Logo />
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Bridgeaux gets Indian businesses fully online — domain, website,
          email, Google listing and social — in under an hour. Built in India,
          for India.
        </p>
        <div className="mt-6 h-px w-24 bg-gradient-bridge" />
        <p className="mt-4 text-xs text-muted-foreground">
          Bengaluru · Mumbai · Delhi
        </p>
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold text-brand-ink">Product</h4>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li><Link to="/how-it-works" className="hover:text-brand-ink">How it works</Link></li>
          <li><Link to="/pricing" className="hover:text-brand-ink">Pricing</Link></li>
          <li><Link to="/faq" className="hover:text-brand-ink">FAQ</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold text-brand-ink">Company</h4>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li><Link to="/about" className="hover:text-brand-ink">About</Link></li>
          <li><Link to="/contact" className="hover:text-brand-ink">Contact</Link></li>
          <li><a href="mailto:hello@bridgeaux.app" className="hover:text-brand-ink">hello@bridgeaux.app</a></li>
        </ul>
      </div>
    </div>

    <div className="rule-bridge" />
    <div className="container-prose py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} Bridgeaux Technologies Pvt. Ltd.</p>
      <p className="flex items-center gap-4">
        <span>Made in India 🇮🇳</span>
        <span>·</span>
        <span>Privacy</span>
        <span>·</span>
        <span>Terms</span>
      </p>
    </div>
  </footer>
);
