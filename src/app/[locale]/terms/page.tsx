import { setRequestLocale } from "next-intl/server";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Terms of Service",
    es: "Terminos de Servicio",
    pt: "Termos de Servico",
  };
  return { title: titles[locale] || titles.en };
}

const sections = [
  {
    title: "1. Introduction",
    text: "These Terms of Service govern your use of the Trade4U website and evaluation services. By accessing or using our platform, you agree to be bound by these terms. Trade4U provides simulated trading evaluation programs designed to identify skilled futures traders for potential funding opportunities.",
  },
  {
    title: "2. Definitions",
    text: "\"Service\" refers to the Trade4U prop trading evaluation platform, including all challenge programs, simulated trading accounts, and related tools. \"User\" means any individual who registers for and/or uses the Service. \"Challenge\" or \"Evaluation\" refers to the simulated trading assessment programs offered through the platform. \"Funded Account\" refers to the simulated trading account provided after successfully completing an evaluation.",
  },
  {
    title: "3. Services",
    text: "Trade4U offers simulated futures trading evaluation programs. Users purchase access to evaluation challenges where they must meet specified profit targets while adhering to risk management rules including daily drawdown limits and maximum drawdown limits. Successful completion of an evaluation may result in access to a funded simulated trading account with profit-sharing arrangements as described in the specific program terms.",
  },
  {
    title: "4. User Obligations",
    text: "Users must provide accurate registration information, maintain the confidentiality of their account credentials, and comply with all applicable trading rules for their selected program. Users are prohibited from using automated trading systems unless explicitly permitted, sharing account access with third parties, attempting to manipulate or exploit the evaluation system, or engaging in any form of coordinated trading across multiple accounts.",
  },
  {
    title: "5. Payment",
    text: "All challenge fees are due at the time of purchase and are processed through our authorized payment providers. Fees are non-refundable except as explicitly stated in the specific program terms. Profit payouts for funded accounts are processed according to the payout schedule and split ratio described in the applicable program documentation.",
  },
  {
    title: "6. Risk Disclosure",
    text: "Trading futures involves substantial risk of loss and is not suitable for every investor. Past performance in simulated or live trading environments is not indicative of future results. The evaluation programs use simulated trading environments and results may not reflect actual market conditions. Users should carefully consider their financial situation and risk tolerance before purchasing any evaluation program.",
  },
  {
    title: "7. Limitation of Liability",
    text: "Trade4U shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our services, including but not limited to losses resulting from trading decisions, platform downtime, data inaccuracies, or system failures. Our total liability shall not exceed the amount paid by the user for the specific service giving rise to the claim.",
  },
  {
    title: "8. Governing Law",
    text: "These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from or related to these terms or the use of our services shall be resolved through binding arbitration. Trade4U reserves the right to modify these terms at any time. Continued use of the service after modifications constitutes acceptance of the updated terms.",
  },
];

function TermsContent() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gradient mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: August 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((section, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.text}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </Section>
    </>
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}
