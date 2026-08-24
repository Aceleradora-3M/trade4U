"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import { Mail, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { trackContact } from "@/lib/pixel";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackContact();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("sub")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-green-400 font-medium text-lg">
                    {t("toast")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-slate-500 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-slate-500 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      {t("message")}
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-slate-500 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t("send")}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Sidebar */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-0.5">
                    Email
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("email24h")}
                  </p>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-0.5">
                    {t("liveChat")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("liveChat")}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-0.5">
                    Hours
                  </div>
                  <p className="text-sm text-muted-foreground">{t("hours")}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}
