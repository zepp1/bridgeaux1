import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="container-prose py-32 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-teal">Error 404</div>
        <h1 className="mt-4 font-display text-6xl md:text-8xl tracking-tight">
          That bridge isn't <span className="italic text-bridge">built</span> yet.
        </h1>
        <p className="mt-5 text-muted-foreground max-w-md mx-auto">
          The page you tried to reach doesn't exist, or has moved. Let's get you back to solid ground.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-sm bg-brand-ink px-6 py-3 text-sm font-medium text-brand-paper hover:bg-brand-ink/90"
        >
          Back to home
        </Link>
      </section>
    </Layout>
  );
};

export default NotFound;
