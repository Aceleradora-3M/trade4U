import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import { Check } from "lucide-react";

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

  const descriptions = [
    platforms("ctrader.body"),
    platforms("mt5.body"),
    platforms("dxtrade.body"),
  ];

  const features = [
    platform("f1"),
    platform("f2"),
    platform("f3"),
    platform("f4"),
    platform("f5"),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient">
                {platforms("title")}
              </h1>
              <Badge variant="green">{platforms("new")}</Badge>
            </div>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              {platforms("eyebrow")}
            </p>
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
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-elevated">
              <Image
                src="/platform-mockup.jpg"
                alt="BlackArrow Trading Platform"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* Platform Descriptions */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {descriptions.map((desc, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-accent/20 transition-colors h-full">
                <p className="text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <AnimatedSection>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-10">
            {platform("title")}
          </h2>
        </AnimatedSection>
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <li className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-accent/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
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
