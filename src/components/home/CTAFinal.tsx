"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function CTAFinal() {
  const t = useTranslations("ctafinal");
  const cta = useTranslations("cta");

  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-card p-12 md:p-20 text-center shadow-elevated">
          <div className="absolute inset-0 bg-radial-glow" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent-glow mb-4">
              {t("eyebrow")}
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-gradient">
              {t("title")}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              {t("sub")}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/challenges"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-8 py-4 text-base font-bold text-white shadow-glow hover:scale-105 transition-smooth"
              >
                {cta("getFunded")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-8 py-4 text-base font-semibold text-foreground hover:border-accent/40 transition-smooth"
              >
                {cta("learnMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
