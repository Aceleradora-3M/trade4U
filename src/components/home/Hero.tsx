"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const cta = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none animate-drift motion-reduce:animate-none" />
      <div className="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-primary-glow/20 blur-[160px] pointer-events-none animate-drift-reverse motion-reduce:animate-none" />

      <div className="container relative pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left column (7/12) */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur px-3.5 py-1.5 text-[11px] md:text-xs font-medium tracking-wide mb-7 animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-glow shadow-[0_0_10px_hsl(185_80%_58%)] animate-pulse" />
              {t("badge")}
            </div>

            {/* H1 */}
            <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5vw,4rem)] animate-fade-up">
              {t("titleA")}{" "}
              <span className="text-gradient-accent font-semibold italic">{t("titleB")}</span>
              <br />
              <span className="font-light text-foreground/95">{t("titleC")}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("sub")}
            </p>

            {/* 4 stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 max-w-2xl">
              <div>
                <div className="text-lg md:text-xl font-display font-black text-foreground leading-tight">90% / 10%</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{t("s1")}</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-display font-black text-foreground leading-tight">$150K</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{t("s2")}</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-display font-black text-foreground leading-tight">24h</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{t("s3")}</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-display font-black text-foreground leading-tight">$149</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{t("s4")}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-cta px-7 py-3.5 text-base font-bold text-white shadow-glow hover:scale-[1.03] transition-smooth"
              >
                {cta("startChallenge")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </a>
              <a
                href="https://dashboard.trade4uprop.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-6 py-3.5 text-base font-semibold text-foreground hover:border-accent/40 transition-smooth"
              >
                {cta("login")}
              </a>
            </div>
          </div>

          {/* Right column (5/12) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-[520px] mx-auto">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-radial from-accent/30 via-accent/5 to-transparent blur-3xl animate-pulse-soft motion-reduce:animate-none" />

              <img
                src="/hero-candles.png"
                alt="Trading performance"
                loading="lazy"
                className="relative w-full h-full object-contain animate-float motion-reduce:animate-none"
              />

              {/* Floating card 1 - top left */}
              <div className="absolute top-8 left-0 rounded-2xl border border-accent/40 bg-card/80 backdrop-blur-xl px-5 py-4 shadow-elevated animate-float motion-reduce:animate-none">
                <div className="text-xs text-muted-foreground">P&amp;L Today</div>
                <div className="text-3xl font-display font-black text-accent-glow">+$3,450</div>
                <div className="text-xs text-accent-glow/80">+3.34%</div>
              </div>

              {/* Floating card 2 - bottom right */}
              <div className="absolute bottom-6 right-0 rounded-2xl border border-border bg-card/80 backdrop-blur-xl px-5 py-4 shadow-elevated animate-float-delayed motion-reduce:animate-none">
                <div className="text-xs text-muted-foreground">Funded Account</div>
                <div className="text-2xl font-display font-black text-foreground">$103,450</div>
                <div className="flex items-center gap-1 text-xs text-accent-glow">
                  Live
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
