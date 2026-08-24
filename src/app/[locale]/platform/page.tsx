import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import { Check, Zap, BarChart3, Shield, Globe, Smartphone } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Trading Platform",
    es: "Plataforma de Trading",
    pt: "Plataforma de Trading",
  };
  return { title: titles[locale] || titles.en };
}

function PlatformContent() {
  const platforms = useTranslations("platforms");
  const platform = useTranslations("platform");

  const featureCards = [
    { icon: Zap, title: platform("card1") || "Lightning Fast Execution", desc: platform("card1Desc") || "Execute trades in milliseconds with our optimized infrastructure." },
    { icon: BarChart3, title: platform("card2") || "Advanced Charting", desc: platform("card2Desc") || "Professional-grade charts with 100+ indicators." },
    { icon: Shield, title: platform("card3") || "Risk Management", desc: platform("card3Desc") || "Built-in risk controls to protect your capital." },
    { icon: Globe, title: platform("card4") || "Multi-Market Access", desc: platform("card4Desc") || "Trade futures across CME, CBOT, NYMEX, and COMEX." },
    { icon: Smartphone, title: platform("card5") || "Mobile Trading", desc: platform("card5Desc") || "Full-featured mobile apps for iOS and Android." },
  ];

  const features = [
    platform("f1"),
    platform("f2"),
    platform("f3"),
    platform("f4"),
    platform("f5"),
  ];

  const platformNames = [
    { name: "Rithmic / R|Trader", desc: platforms("ctrader.body") },
    { name: "Tradovate", desc: platforms("mt5.body") },
    { name: "NinjaTrader", desc: platforms("dxtrade.body") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container relative text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              {platforms("eyebrow")}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              {platforms("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {platform("sub")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Platform Mockup */}
      <Section>
        <AnimatedSection>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-elevated">
              <Image
                src="/platform-mockup.jpg"
                alt="Trading Platform"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* Feature Cards */}
      <Section>
        <AnimatedSection>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-10">
            {platform("title")}
          </h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featureCards.map((card, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="bg-gradient-card border border-border rounded-3xl p-6 hover:border-accent/30 transition-smooth h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Supported Platforms */}
      <Section className="bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <AnimatedSection>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            {platforms("supported") || "Supported Platforms"}
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {platformNames.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-gradient-card border border-border rounded-3xl p-6 hover:border-accent/30 transition-smooth h-full">
                <h3 className="font-display font-semibold text-foreground mb-3">
                  {p.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Features Checklist */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <li className="flex items-center gap-4 bg-gradient-card border border-border rounded-xl p-4 hover:border-accent/30 transition-smooth">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <AnimatedSection>
          <div className="text-center">
            <Button href="/challenges" size="lg">
              {platform("cta")}
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PlatformContent />;
}
