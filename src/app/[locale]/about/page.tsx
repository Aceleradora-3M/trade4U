import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { MapPin, Users, Building2, Headphones } from "lucide-react";

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

  const stats = [
    { value: "30+", label: team("stat1") },
    { value: "3", label: team("stat2") },
    { value: "24/7", label: team("stat3") },
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
      <section className="bg-gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              {t("title")}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission / Body */}
      <Section>
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("body")}
            </p>
          </div>
        </AnimatedSection>
      </Section>

      {/* Team Section */}
      <Section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <AnimatedSection>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase text-center mb-3">
            {team("eyebrow")}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-4">
            {team("title")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {team("body")}
          </p>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient-accent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Office Locations */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {offices.map((office, i) => (
            <AnimatedSection key={i} delay={0.3 + i * 0.1}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center hover:border-accent/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
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

        {/* Support note */}
        <AnimatedSection delay={0.6}>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Headphones className="w-5 h-5 text-accent" />
            <p className="text-sm">{team("support")}</p>
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
