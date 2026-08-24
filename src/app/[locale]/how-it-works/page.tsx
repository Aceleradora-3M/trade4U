import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import { Target, TrendingUp, Banknote, Shield, Clock, BarChart3 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "How It Works",
    es: "Como Funciona",
    pt: "Como Funciona",
  };
  return { title: titles[locale] || titles.en };
}

function HowItWorksContent() {
  const journey = useTranslations("journey");
  const cta = useTranslations("cta");

  const phases = [
    {
      icon: Target,
      step: 1,
      phase: journey("phase1"),
      title: journey("s1.title"),
      body: journey("s1.body"),
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: TrendingUp,
      step: 2,
      phase: journey("phase2"),
      title: journey("s2.title"),
      body: journey("s2.body"),
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      icon: Banknote,
      step: 3,
      phase: journey("phase3"),
      title: journey("s3.title"),
      body: journey("s3.body"),
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
  ];

  const rules = [
    { icon: Shield, label: journey("rule1") || "No Martingale" },
    { icon: Clock, label: journey("rule2") || "Minimum trading days" },
    { icon: BarChart3, label: journey("rule3") || "Respect drawdown limits" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container relative text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              {journey("eyebrow")}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              {journey("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {journey("sub")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Overview Steps */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {phases.map((phase, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-gradient-card border border-border rounded-3xl p-6 text-center hover:border-accent/30 transition-smooth h-full">
                <div className={`w-16 h-16 rounded-2xl ${phase.bg} flex items-center justify-center mx-auto mb-4 relative`}>
                  <phase.icon className={`w-8 h-8 ${phase.color}`} />
                  <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold text-white`}>
                    {phase.step}
                  </span>
                </div>
                <p className={`text-xs font-semibold tracking-wider uppercase ${phase.color} mb-2`}>
                  {phase.phase}
                </p>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.body}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Detailed Phases */}
      <Section className="bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <AnimatedSection>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            {journey("detailTitle") || "Your Journey in Detail"}
          </h2>
        </AnimatedSection>

        <div className="space-y-6 max-w-4xl mx-auto">
          {phases.map((phase, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-gradient-card border border-border rounded-3xl p-6 md:p-8 hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="shrink-0">
                    <div className={`w-14 h-14 rounded-xl ${phase.bg} flex items-center justify-center relative`}>
                      <phase.icon className={`w-7 h-7 ${phase.color}`} />
                      <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold ${phase.color}`}>
                        {phase.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className={`text-xs font-semibold tracking-wider uppercase ${phase.color} mb-1`}>
                      {phase.phase}
                    </p>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {phase.body}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
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

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HowItWorksContent />;
}
