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
    en: "Privacy Policy",
    es: "Politica de Privacidad",
    pt: "Politica de Privacidade",
  };
  return { title: titles[locale] || titles.en };
}

const sections = [
  {
    title: "1. Information Collection",
    text: "We collect personal information that you voluntarily provide when registering for our services, purchasing evaluation programs, or contacting our support team. This includes your name, email address, phone number, payment information, and trading activity data within our platform. We also automatically collect technical data such as IP addresses, browser type, device information, and usage patterns through cookies and similar technologies.",
  },
  {
    title: "2. Use of Information",
    text: "We use collected information to provide and improve our trading evaluation services, process payments and payouts, communicate with you about your account and programs, ensure compliance with our trading rules and terms of service, detect and prevent fraud or abuse, and analyze usage patterns to enhance the user experience. We may also use aggregated, anonymized data for research and business analytics purposes.",
  },
  {
    title: "3. Data Sharing",
    text: "We do not sell your personal information to third parties. We may share your data with payment processors to complete transactions, trading platform providers necessary to deliver our services, legal authorities when required by law or to protect our rights, and service providers who assist us in operating our platform under strict confidentiality agreements. In the event of a business transfer or merger, your data may be transferred as part of the business assets.",
  },
  {
    title: "4. Cookies",
    text: "Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. Essential cookies are required for the website to function properly. Analytics cookies help us understand how visitors interact with our site. Marketing cookies may be used to deliver relevant advertisements. You can control cookie preferences through your browser settings, though disabling certain cookies may affect site functionality.",
  },
  {
    title: "5. Security",
    text: "We implement industry-standard security measures to protect your personal information, including encryption of data in transit and at rest, secure server infrastructure, regular security audits, and access controls limiting data access to authorized personnel only. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security of your data.",
  },
  {
    title: "6. Your Rights",
    text: "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, object to or restrict certain processing activities, request data portability, and withdraw consent where processing is based on consent. To exercise any of these rights, please contact our support team. We will respond to verified requests within the timeframe required by applicable law.",
  },
  {
    title: "7. Contact",
    text: "If you have questions about this Privacy Policy or our data practices, please contact us at support@trade4uprop.com. We are committed to resolving any concerns about your privacy and will work to address your inquiry promptly. This Privacy Policy may be updated periodically to reflect changes in our practices or applicable laws. We encourage you to review this policy regularly.",
  },
];

function PrivacyContent() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gradient mb-4">
              Privacy Policy
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

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}
