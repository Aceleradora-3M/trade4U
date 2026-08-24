"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const challenge = useTranslations("challenge");

  return (
    <footer className="border-t border-border/50 bg-background/60 mt-20">
      <div className="container py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src="/logo-light.svg" alt="Trade4U" className="h-9 w-auto mb-4" />
          <p className="text-sm text-muted-foreground max-w-xs">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
            {t("product")}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/challenges" className="hover:text-accent transition-smooth">
                {challenge("instantFunding.name")}
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition-smooth">
                {challenge("freedom.name")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
            {t("company")}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-accent transition-smooth">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-accent transition-smooth">
                {nav("howItWorks")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-accent transition-smooth">
                {nav("faq")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition-smooth">
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
            {t("legal")}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/terms" className="hover:text-accent transition-smooth">
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent transition-smooth">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent transition-smooth">
                {t("risk")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container py-6 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
            {t("disclaimer")}
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 Trade4U. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
