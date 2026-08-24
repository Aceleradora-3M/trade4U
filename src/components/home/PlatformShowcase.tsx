"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Check, ArrowRight } from "lucide-react";

export default function PlatformShowcase() {
  const t = useTranslations("platform");

  const features = [t("f1"), t("f2"), t("f3"), t("f4"), t("f5")];

  return (
    <section className="py-20 md:py-28 border-t border-border/30 relative overflow-hidden">
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px] pointer-events-none animate-drift motion-reduce:animate-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - order-2 mobile, order-1 desktop */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-3xl rounded-3xl animate-pulse-soft motion-reduce:animate-none" />
            <div className="relative rounded-2xl border border-border overflow-hidden shadow-elevated">
              <img
                src="/platform-mockup.jpg"
                alt="Trade4U trading platform"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-glow mb-5">
              {t("eyebrow")}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight mb-5">
              {t("title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {t("sub")}
            </p>

            <ul className="space-y-3 mb-9">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-glow mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90">{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/platform"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-cta px-7 py-3.5 text-base font-bold text-white shadow-glow hover:scale-[1.03] transition-smooth"
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
