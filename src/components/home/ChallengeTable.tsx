"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trackStartChallenge } from "@/lib/pixel";
import {
  Wallet,
  BarChart3,
  Coins,
  ShieldAlert,
  Layers,
  Activity,
  Info,
  Check,
  ArrowRight,
} from "lucide-react";

interface AccountRow {
  icon: typeof Wallet;
  ruleKey: string;
  value: string;
}

interface Account {
  id: string;
  accountSize: string;
  priceFrom: string;
  price: string;
  buyUrl: string;
  rows: AccountRow[];
}

const ACCOUNTS: Account[] = [
  {
    id: "25k",
    accountSize: "$25K",
    priceFrom: "$165",
    price: "$99",
    buyUrl: "https://pay.hotmart.com/H106010807E",
    rows: [
      { icon: Wallet, ruleKey: "activation", value: "One-time fee" },
      { icon: BarChart3, ruleKey: "minProfitDays", value: "5" },
      { icon: Coins, ruleKey: "minDailyProfit", value: "$200" },
      { icon: ShieldAlert, ruleKey: "maxDD", value: "RT (Trailing)" },
      { icon: Layers, ruleKey: "exposure", value: "4 Minis" },
      { icon: Activity, ruleKey: "consistency", value: "30%" },
    ],
  },
  {
    id: "50k",
    accountSize: "$50K",
    priceFrom: "$315",
    price: "$189",
    buyUrl: "https://pay.hotmart.com/D106011089X",
    rows: [
      { icon: Wallet, ruleKey: "activation", value: "One-time fee" },
      { icon: BarChart3, ruleKey: "minProfitDays", value: "5" },
      { icon: Coins, ruleKey: "minDailyProfit", value: "$200" },
      { icon: ShieldAlert, ruleKey: "maxDD", value: "RT (Trailing)" },
      { icon: Layers, ruleKey: "exposure", value: "10 Minis" },
      { icon: Activity, ruleKey: "consistency", value: "30%" },
    ],
  },
];

export default function ChallengeTable() {
  const t = useTranslations("table");
  const r = useTranslations("rule");
  const ch = useTranslations("challenge");
  const cta = useTranslations("cta");
  const perks = useTranslations("perks");

  const [activeAccount, setActiveAccount] = useState(0);
  const account = ACCOUNTS[activeAccount];

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-border/30">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-glow/90 mb-4">
            {t("eyebrow")}
          </div>
          <h2 className="text-2xl md:text-[2.5rem] font-display font-bold tracking-tight text-gradient leading-[1.15]">
            {t("title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("sub")}
          </p>
        </div>

        {/* Toggle 1 — Program */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center justify-center gap-1 rounded-full border border-border bg-card/50 p-1.5">
            <button className="relative inline-flex items-center gap-2 rounded-full px-5 md:px-7 py-2.5 text-xs md:text-sm transition-smooth bg-gradient-cta text-white font-semibold shadow-glow">
              {ch("instantFunding.name")}
            </button>
          </div>
        </div>

        {/* Toggle 2 — Account size */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card/50 p-1.5 max-w-full">
            {ACCOUNTS.map((acc, i) => (
              <button
                key={acc.id}
                onClick={() => setActiveAccount(i)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 md:px-6 py-2.5 text-xs md:text-sm transition-smooth ${
                  activeAccount === i
                    ? "bg-gradient-cta text-white font-light shadow-glow"
                    : "text-muted-foreground font-semibold hover:text-foreground"
                }`}
              >
                {t("challengeWord")} {acc.accountSize}
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-gradient-card overflow-hidden shadow-elevated">
          {/* Top band: name + price */}
          <div className="px-5 sm:px-7 md:px-10 py-6 md:py-8 flex flex-col items-center text-center sm:flex-row sm:items-start sm:justify-between sm:text-left gap-4 sm:gap-6 border-b border-border/60">
            <div className="min-w-0">
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground mb-2">
                {ch("instantFunding.name")}
              </div>
              <div className="flex items-baseline justify-center sm:justify-start gap-2 flex-wrap">
                <div className="text-base md:text-lg text-muted-foreground font-semibold">
                  {t("accountWord")}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground">
                  {account.accountSize}
                </div>
              </div>
            </div>
            <div className="shrink-0 min-w-0 sm:text-right">
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground mb-2">
                {t("from")}
              </div>
              <div className="flex items-baseline justify-center sm:justify-end gap-2 sm:gap-3 flex-wrap">
                <span className="text-sm sm:text-base md:text-lg text-muted-foreground/70 line-through">
                  {account.priceFrom}
                </span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-accent">
                  {account.price}
                </div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t("oneTimePayment")}</div>
            </div>
          </div>

          {/* Body: group + rows */}
          <div className="px-2 md:px-4 py-2">
            <div className="py-2">
              {/* Group label */}
              <div className="px-5 md:px-6 pt-3 pb-2">
                <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-accent-glow bg-accent/10 border border-accent/30 rounded-full px-3 py-1">
                  {t("challengeAccount")}
                </span>
              </div>

              {/* Rows */}
              {account.rows.map((row, i) => {
                const IconComp = row.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 ${
                      i < account.rows.length - 1 ? "border-b border-border/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <IconComp className="h-4 w-4 text-accent-glow shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        {r(row.ruleKey)}
                      </span>
                      <button
                        type="button"
                        aria-label="More info"
                        className="text-muted-foreground/60 hover:text-foreground transition-smooth"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-foreground text-right shrink-0">
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer 1: 3 checks */}
          <div className="border-t border-border/60 px-7 md:px-10 py-6 grid sm:grid-cols-2 gap-3 bg-card/30">
            {[
              t("foot.split"),
              t("foot.platforms"),
              perks("payouts24h"),
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-accent-glow shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Footer 2: learn more + buy */}
          <div className="border-t border-border/60 px-7 md:px-10 py-6 flex flex-wrap gap-3 items-center justify-between">
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-glow hover:gap-2.5 transition-all"
            >
              {t("learnMore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={account.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackStartChallenge("instant", account.accountSize, account.price)
              }
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-7 py-3 text-sm md:text-base font-bold text-white shadow-glow hover:scale-[1.04] transition-smooth"
            >
              {cta("buyChallenge")} {account.accountSize}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
