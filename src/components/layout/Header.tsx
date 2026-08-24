"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Sparkles, Menu, X } from "lucide-react";

export default function Header() {
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const promo = useTranslations("promo");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/#pricing" as const, label: t("challenges") },
    { href: "/how-it-works" as const, label: t("howItWorks") },
    { href: "/platform" as const, label: t("platform") },
    { href: "/about" as const, label: t("about") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <>
      {/* TopBand */}
      <div className="relative bg-gradient-band border-b border-accent/20">
        <div className="container py-2 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-white">
          <Sparkles className="h-3.5 w-3.5 text-accent-glow" />
          <span>{promo("welcome")}</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo-light.svg" alt="Trade4U" className="h-8 w-auto" />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://dashboard.trade4uprop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              {t("login")}
            </a>
            <a
              className="inline-flex items-center rounded-full bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-glow hover:opacity-90 transition-smooth"
              href="/#pricing"
            >
              {cta("startChallenge")}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container py-4 space-y-2">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-medium hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-border my-2" />
              <div className="flex items-center justify-end gap-2 pt-2">
                <a
                  href="https://dashboard.trade4uprop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium px-3 py-2"
                >
                  {t("login")}
                </a>
                <a
                  className="text-sm font-semibold rounded-full bg-gradient-accent px-4 py-2 text-accent-foreground"
                  href="/#pricing"
                  onClick={() => setMobileOpen(false)}
                >
                  {cta("startChallenge")}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
