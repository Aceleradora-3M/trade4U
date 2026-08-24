"use client";

import { useTranslations } from "next-intl";
import {
  Briefcase,
  TrendingDown,
  Layers,
  MonitorSmartphone,
  Headphones,
  Globe,
} from "lucide-react";

const CARDS = [
  { icon: Briefcase, titleKey: "experience.title", bodyKey: "experience.body" },
  { icon: TrendingDown, titleKey: "spreads.title", bodyKey: "spreads.body" },
  { icon: Layers, titleKey: "multiasset.title", bodyKey: "multiasset.body" },
  { icon: MonitorSmartphone, titleKey: "platforms.title", bodyKey: "platforms.body" },
  { icon: Headphones, titleKey: "support.title", bodyKey: "support.body" },
  { icon: Globe, titleKey: "global.title", bodyKey: "global.body" },
];

export default function WhyTradersLove() {
  const t = useTranslations("love");

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const IconComp = card.icon;
            return (
              <div
                key={i}
                className="group rounded-3xl border border-border bg-gradient-card p-7 hover:border-accent/40 transition-smooth"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent-glow mb-5 shadow-[0_0_24px_hsl(185_80%_58%_/_0.25)]">
                  <IconComp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">
                  {t(card.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(card.bodyKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
