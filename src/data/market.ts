import {
  Wallet,
  BarChart3,
  Coins,
  ShieldAlert,
  Layers,
  Activity,
  Zap,
  Mail,
  Percent,
  Copy,
} from "lucide-react";

export interface OfferRow {
  icon: typeof Wallet;
  ruleKey: string;
  /** Literal value, already locale-neutral (numbers, percentages, contracts). */
  value?: string;
  /** Key under the `val` namespace, for values that must be translated. */
  valueKey?: string;
}

export interface Offer {
  id: string;
  /** Canonical size. The pixel maps it to the campaign's custom event. */
  size: string;
  /** Size as the page shows it. */
  sizeLabel: string;
  priceFrom: string;
  price: string;
  currency: "USD" | "BRL";
  buyUrl: string;
  rows: OfferRow[];
}

interface Market {
  offers: Offer[];
  /** How many `faq.q{n}` entries the home page shows. */
  homeFaqCount: number;
}

const INTERNATIONAL: Market = {
  offers: [
    {
      id: "25k",
      size: "$25K",
      sizeLabel: "$25K",
      priceFrom: "$165",
      price: "$99",
      currency: "USD",
      buyUrl: "https://pay.hotmart.com/H106010807E",
      rows: [
        { icon: Wallet, ruleKey: "activation", valueKey: "oneTimeFee" },
        { icon: BarChart3, ruleKey: "minProfitDays", value: "5" },
        { icon: Coins, ruleKey: "minDailyProfit", value: "$200" },
        { icon: ShieldAlert, ruleKey: "maxDD", value: "RT (Trailing)" },
        { icon: Layers, ruleKey: "exposure", value: "4 Minis" },
        { icon: Activity, ruleKey: "consistency", value: "30%" },
      ],
    },
    {
      id: "50k",
      size: "$50K",
      sizeLabel: "$50K",
      priceFrom: "$315",
      price: "$189",
      currency: "USD",
      buyUrl: "https://pay.hotmart.com/D106011089X",
      rows: [
        { icon: Wallet, ruleKey: "activation", valueKey: "oneTimeFee" },
        { icon: BarChart3, ruleKey: "minProfitDays", value: "5" },
        { icon: Coins, ruleKey: "minDailyProfit", value: "$200" },
        { icon: ShieldAlert, ruleKey: "maxDD", value: "RT (Trailing)" },
        { icon: Layers, ruleKey: "exposure", value: "10 Minis" },
        { icon: Activity, ruleKey: "consistency", value: "30%" },
      ],
    },
  ],
  homeFaqCount: 4,
};

// Brazil sells a single account, priced in reais and paid by Pix. Same Hotmart
// product as the international $25K.
const BRAZIL: Market = {
  offers: [
    {
      id: "25k",
      size: "$25K",
      sizeLabel: "R$ 125 mil",
      priceFrom: "R$ 688",
      price: "R$ 389",
      currency: "BRL",
      buyUrl: "https://pay.hotmart.com/H106010807E",
      rows: [
        { icon: Wallet, ruleKey: "activation", valueKey: "oneTimeFee" },
        { icon: Zap, ruleKey: "release", valueKey: "instantNoEval" },
        { icon: Mail, ruleKey: "access", valueKey: "login10" },
        { icon: Percent, ruleKey: "split", valueKey: "upTo90" },
        { icon: Layers, ruleKey: "exposure", valueKey: "yourSize" },
        { icon: Copy, ruleKey: "maxAccounts", valueKey: "maxAccounts" },
      ],
    },
  ],
  homeFaqCount: 10,
};

const MARKETS: Record<string, Market> = {
  pt: BRAZIL,
};

export function getMarket(locale: string): Market {
  return MARKETS[locale] ?? INTERNATIONAL;
}

/**
 * The offer every primary CTA checks out directly, when the locale sells only
 * one. Otherwise CTAs lead to the pricing section to pick an account.
 */
export function getDirectOffer(locale: string): Offer | undefined {
  const { offers } = getMarket(locale);
  return offers.length === 1 ? offers[0] : undefined;
}
