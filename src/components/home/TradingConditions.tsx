"use client";

import { useTranslations } from "next-intl";
import {
  Target,
  TrendingDown,
  Shield,
  Zap,
  CalendarClock,
  Newspaper,
  CalendarDays,
} from "lucide-react";

const CONDITIONS = [
  { icon: Target, labelKey: "target", valueKey: "targetVal" },
  { icon: TrendingDown, labelKey: "daily", valueKey: "dailyVal" },
  { icon: Shield, labelKey: "max", valueKey: "maxVal" },
  { icon: Zap, labelKey: "leverage", valueKey: "leverageVal" },
  { icon: CalendarClock, labelKey: "minDays", valueKey: "minDaysVal" },
  { icon: Newspaper, labelKey: "news", valueKey: "newsVal" },
  { icon: CalendarDays, labelKey: "weekend", valueKey: "weekendVal" },
];

export default function TradingConditions() {
  const t = useTranslations("conditions");

  return (
    <section className="py-20 md:py-24 border-t border-border/30">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONDITIONS.map((cond, i) => {
            const IconComp = cond.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-gradient-card p-5 hover:border-accent/40 transition-smooth"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-glow mb-4 group-hover:shadow-[0_0_24px_hsl(185_80%_58%_/_0.4)] transition-smooth">
                  <IconComp className="h-5 w-5" />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {t(cond.labelKey)}
                </div>
                <div className="text-base md:text-lg font-display font-bold text-foreground leading-tight">
                  {t(cond.valueKey)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
