import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import { MapPin, Users, Building2, Headphones, Target, Heart, Zap } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "About Us",
    es: "Nosotros",
    pt: "Sobre",
  };
  return { title: titles[locale] || titles.en };
}

function AboutContent() {
  const t = useTranslations("about");
  const team = useTranslations("team");
  const cta = useTranslations("cta");

  const stats = [
    { value: "30+", label: team("stat1") },
    { value: "3", label: team("stat2") },
    { value: "24/7", label: team("stat3") },
  ];

  const values = [
    { icon: Target, title: t("value1") || "Transparency", desc: t("value1Desc") || "Clear rules, no hidden fees. What you see is what you get." },
    { icon: Heart, title: t("value2") || "Trader First", desc: t("value2Desc") || "Every decision we make puts our traders' success first." },
    { icon: Zap, title: t("value3") || "Innovation", desc: t("value3Desc") || "Constantly improving our technology and programs." },
  ];

  const offices = [
    {
      name: team("spain"),
      badge: team("hq"),
      icon: Building2,
    },
    {
      name: team("usa"),
      badge: null,
      icon: MapPin,
    },
    {
      name: team("argentina"),
      badge: null,
      icon: MapPin,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container relative text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              {team("eyebrow")}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              {t("title")}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-gradient-accent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
              {t("missionTitle") || "Our Mission"}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("body")}
            </p>
          </div>
        </AnimatedSection>
      </Section>

      {/* Values */}
      <Section>
        <AnimatedSection>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            {t("valuesTitle") || "Our Values"}
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {values.map((value, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-gradient-card border border-border rounded-3xl p-6 text-center hover:border-accent/30 transition-smooth h-full">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Team & Offices */}
      <Section className="bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <AnimatedSection>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-4">
            {team("title")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {team("body")}
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {offices.map((office, i) => (
            <AnimatedSection key={i} delay={0.3 + i * 0.1}>
              <div className="bg-gradient-card border border-border rounded-3xl p-6 text-center hover:border-accent/30 transition-smooth">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <office.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {office.name}
                </h3>
                {office.badge && (
                  <span className="inline-block text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                    {office.badge}
                  </span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Headphones className="w-5 h-5 text-accent" />
            <p className="text-sm">{team("support")}</p>
          </div>
        </AnimatedSection>
      </Section>

      {/* CTA */}
      <Section>
        <AnimatedSection>
          <div className="relative bg-gradient-card border border-accent/30 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial-glow opacity-30" />
            <div className="relative">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-gradient mb-4">
                {cta("startToday")}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                {cta("startTodaySub")}
              </p>
              <Button href="/challenges" size="lg">
                {cta("startChallenge")}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
