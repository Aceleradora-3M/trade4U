"use client";

import { useTranslations } from "next-intl";
import { Target, Award, Wallet, ArrowRight } from "lucide-react";

const STEPS = [
  { badge: "Step 1", eyebrow: "Evaluation Phase", icon: Target },
  { badge: "Step 2", eyebrow: "Funded Phase", icon: Award },
  { badge: "Step 3", eyebrow: "Payout", icon: Wallet },
];

export default function HowItWorks() {
  const t = useTranslations("journey");
  const cta = useTranslations("cta");

  const stepContent = [
    { title: t("s1.title"), body: t("s1.body") },
    { title: t("s2.title"), body: t("s2.body") },
    { title: t("s3.title"), body: t("s3.body") },
  ];

  return (
    <section className="py-24 border-t border-border/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-glow/90 mb-4">
            {t("eyebrow")}
          </div>
          <h2 className="text-2xl md:text-[2.5rem] font-display font-bold tracking-tight text-gradient leading-[1.15]">
            {t("title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("sub")}
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-5">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          {STEPS.map((step, i) => {
            const IconComp = step.icon;
            return (
              <div
                key={i}
                className="relative rounded-3xl border border-border bg-gradient-card p-8 hover:border-accent/40 transition-smooth"
              >
                <div className="absolute -top-3 left-8 text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-accent text-accent-foreground px-3 py-1 rounded-full">
                  {step.badge}
                </div>
                <div className="text-xs uppercase tracking-widest text-accent-glow font-bold mb-4">
                  {step.eyebrow}
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent-glow shadow-[0_0_24px_hsl(185_80%_58%_/_0.3)] mb-6">
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-3">
                  {stepContent[i].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stepContent[i].body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-8 py-4 text-base font-bold text-white shadow-glow hover:scale-105 transition-smooth"
            href="/#pricing"
          >
            {cta("getFunded")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
