"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "../shared/AnimatedSection";
import { Trophy, Star, Award, Globe } from "lucide-react";

export default function TrustBar() {
  const t = useTranslations("trustbar");

  const badges = [
    { icon: Trophy, label: t("year") },
    { icon: Award, label: t("experience") },
    { icon: Star, label: t("rated") },
    { icon: Globe, label: t("latam") },
  ];

  // Double for infinite scroll
  const allBadges = [...badges, ...badges];

  return (
    <section className="py-8 overflow-hidden bg-card/50 border-y border-border">
      <AnimatedSection>
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-4">
          {t("eyebrow")}
        </p>
      </AnimatedSection>
      <div className="flex animate-marquee">
        {allBadges.map((badge, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-8 whitespace-nowrap"
          >
            <badge.icon className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground font-medium">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
