"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Volume2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import CheckoutLink from "@/components/shared/CheckoutLink";
import { VSL, isVideoFile } from "@/data/vsl";
import ChallengeTable from "@/components/home/ChallengeTable";
import TradingConditions from "@/components/home/TradingConditions";
import PlatformShowcase from "@/components/home/PlatformShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import WhyTradersLove from "@/components/home/WhyTradersLove";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTAFinal from "@/components/home/CTAFinal";
import Footer from "@/components/layout/Footer";

export default function VslClient() {
  const t = useTranslations("hero");
  const cta = useTranslations("cta");
  const disclosure = useTranslations("disclosure");
  const footer = useTranslations("footer");
  const [showCta, setShowCta] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFile = isVideoFile(VSL.src);

  // Embeds can't report playback time, so they fall back to a page timer.
  useEffect(() => {
    if (isFile) return;
    const timer = setTimeout(() => setShowCta(true), VSL.ctaDelaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [isFile]);

  // Browsers only autoplay muted video, so the first tap turns the sound on
  // and restarts the video from the beginning.
  function unmute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    void video.play();
    setMuted(false);
  }

  const titleC = t("titleC");

  return (
    <main>
      <section
        className={`relative overflow-hidden bg-gradient-hero ${showCta ? "" : "min-h-screen"}`}
      >
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none" />

      <div className="container relative flex flex-col items-center pt-10 md:pt-16 pb-12 text-center">
        <img src="/logo-light.svg" alt="Trade4U" className="h-8 w-auto mb-8" />

        <h1 className="max-w-4xl font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(1.875rem,4.5vw,3.5rem)] animate-fade-up">
          {t("titleA")}{" "}
          <span className="text-gradient-accent font-semibold italic">{t("titleB")}</span>
          {titleC && (
            <>
              <br />
              <span className="font-light text-foreground/95">{titleC}</span>
            </>
          )}
        </h1>

        <div className="mt-8 md:mt-10 w-full max-w-4xl aspect-video overflow-hidden rounded-2xl border border-accent/30 bg-card/60 shadow-elevated">
          {!VSL.src ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Vídeo em breve
            </div>
          ) : isFile ? (
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                src={VSL.src}
                autoPlay
                muted
                playsInline
                controls={!muted}
                preload="auto"
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime >= VSL.ctaDelaySeconds) setShowCta(true);
                }}
                className="h-full w-full object-cover"
              />
              {muted && (
                <button
                  type="button"
                  onClick={unmute}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3 text-sm md:text-base font-bold text-white shadow-glow animate-pulse">
                    <Volume2 className="h-5 w-5" />
                    Clique para ativar o som
                  </span>
                </button>
              )}
            </div>
          ) : (
            <iframe
              src={VSL.src}
              title="VSL"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>

        <div className="mt-8 min-h-[3.5rem]">
          {showCta && (
            <CheckoutLink
              fallbackHref="/#pricing"
              fallbackLabel={cta("startChallenge")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-cta px-8 py-4 text-base md:text-lg font-bold text-white shadow-glow hover:scale-[1.03] transition-smooth animate-fade-up"
            >
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </CheckoutLink>
          )}
        </div>

        {/* Until the rest of the page is revealed, the legal notice sits here;
            afterwards the full site footer takes over. */}
        {!showCta && (
          <>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {disclosure("aboveFold")}
            </p>
            <nav className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <Link href="/terms" className="hover:text-accent transition-smooth">{footer("terms")}</Link>
              <Link href="/privacy" className="hover:text-accent transition-smooth">{footer("privacy")}</Link>
              <Link href="/risk-disclosure" className="hover:text-accent transition-smooth">{footer("risk")}</Link>
            </nav>
          </>
        )}
      </div>
      </section>

      {/* The home page sections below the hero appear together with the CTA. */}
      {showCta && (
        <div className="relative animate-fade-up">
          <ChallengeTable />
          <TradingConditions />
          <PlatformShowcase />
          <HowItWorks />
          <WhyTradersLove />
          <HomeFAQ />
          <CTAFinal />
          <Footer />
        </div>
      )}
    </main>
  );
}
