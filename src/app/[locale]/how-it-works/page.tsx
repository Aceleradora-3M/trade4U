import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import { Target, TrendingUp, Banknote } from "lucide-react";

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
  const how = useTranslations("section.how");
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
      border: "border-accent/20",
    },
    {
      icon: TrendingUp,
      step: 2,
      phase: journey("phase2"),
      title: journey("s2.title"),
      body: journey("s2.body"),
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      icon: Banknote,
      step: 3,
      phase: journey("phase3"),
      title: journey("s3.title"),
      body: journey("s3.body"),
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
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

      {/* Phases */}
      <Section>
        <div className="space-y-8 max-w-4xl mx-auto">
          {phases.map((phase, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className={`bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 hover:${phase.border} transition-colors`}>
                <div className="flex items-start gap-5 md:gap-6">
                  {/* Step number + icon */}
                  <div className="shrink-0">
                    <div className={`w-14 h-14 rounded-xl ${phase.bg} flex items-center justify-center relative`}>
                      <phase.icon className={`w-7 h-7 ${phase.color}`} />
                      <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-white/10 flex items-center justify-center text-xs font-bold ${phase.color}`}>
                        {phase.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
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
          <div className="bg-gradient-cta rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              {cta("startToday")}
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              {cta("startTodaySub")}
            </p>
            <Button href="/challenges" size="lg" variant="secondary">
              {cta("startChallenge")}
            </Button>
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
