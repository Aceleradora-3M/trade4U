export interface ChallengePhase {
  name: string;
  duration: string;
  minDays: string;
  profitTarget: string;
  dailyDD: string;
  maxDD: string;
  leverage: string;
  profitSplit: string;
  commissions: string;
  consistency: string;
  sltp: string;
  news: string;
}

export interface ChallengeAccount {
  size: string;
  price: string;
  activation?: string;
  buyUrl: string;
  popular?: boolean;
}

export interface Challenge {
  slug: string;
  nameKey: string;
  taglineKey: string;
  badgeKey?: string;
  accounts: ChallengeAccount[];
  phases: ChallengePhase[];
  features: string[];
}

export const challenges: Challenge[] = [
  {
    slug: "standard",
    nameKey: "challenge.standard.name",
    taglineKey: "challenge.standard.tagline",
    badgeKey: "challenge.standard.badge",
    accounts: [
      {
        size: "$25K",
        price: "$287",
        buyUrl: "https://pay.hotmart.com/trade4u-standard-25k",
      },
      {
        size: "$50K",
        price: "$457",
        buyUrl: "https://pay.hotmart.com/trade4u-standard-50k",
        popular: true,
      },
      {
        size: "$100K",
        price: "$697",
        buyUrl: "https://pay.hotmart.com/trade4u-standard-100k",
      },
      {
        size: "$150K",
        price: "$897",
        buyUrl: "https://pay.hotmart.com/trade4u-standard-150k",
      },
    ],
    phases: [
      {
        name: "challenge.standard.phase1",
        duration: "30 days",
        minDays: "5",
        profitTarget: "8%",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "-",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
      {
        name: "challenge.standard.phase2",
        duration: "60 days",
        minDays: "5",
        profitTarget: "5%",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "-",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
      {
        name: "challenge.standard.funded",
        duration: "challenge.rules.unlimited",
        minDays: "-",
        profitTarget: "-",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "90%",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
    ],
    features: [
      "challenge.standard.feature1",
      "challenge.standard.feature2",
      "challenge.standard.feature3",
      "challenge.standard.feature4",
    ],
  },
  {
    slug: "instant",
    nameKey: "challenge.instant.name",
    taglineKey: "challenge.instant.tagline",
    badgeKey: "challenge.instant.badge",
    accounts: [
      {
        size: "$25K",
        price: "$97",
        activation: "$149",
        buyUrl: "https://pay.hotmart.com/trade4u-instant-25k",
      },
      {
        size: "$50K",
        price: "$197",
        activation: "$199",
        buyUrl: "https://pay.hotmart.com/trade4u-instant-50k",
        popular: true,
      },
      {
        size: "$100K",
        price: "$297",
        activation: "$299",
        buyUrl: "https://pay.hotmart.com/trade4u-instant-100k",
      },
      {
        size: "$150K",
        price: "$397",
        activation: "$399",
        buyUrl: "https://pay.hotmart.com/trade4u-instant-150k",
      },
    ],
    phases: [
      {
        name: "challenge.instant.phase1",
        duration: "30 days",
        minDays: "5",
        profitTarget: "8%",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "-",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
      {
        name: "challenge.instant.funded",
        duration: "challenge.rules.unlimited",
        minDays: "-",
        profitTarget: "-",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "90%",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
    ],
    features: [
      "challenge.instant.feature1",
      "challenge.instant.feature2",
      "challenge.instant.feature3",
      "challenge.instant.feature4",
    ],
  },
  {
    slug: "oneday",
    nameKey: "challenge.oneday.name",
    taglineKey: "challenge.oneday.tagline",
    badgeKey: "challenge.oneday.badge",
    accounts: [
      {
        size: "$25K",
        price: "$149",
        buyUrl: "https://pay.hotmart.com/trade4u-oneday-25k",
      },
      {
        size: "$50K",
        price: "$249",
        buyUrl: "https://pay.hotmart.com/trade4u-oneday-50k",
        popular: true,
      },
      {
        size: "$100K",
        price: "$349",
        buyUrl: "https://pay.hotmart.com/trade4u-oneday-100k",
      },
    ],
    phases: [
      {
        name: "challenge.oneday.phase1",
        duration: "1 day",
        minDays: "1",
        profitTarget: "6%",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "-",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
      {
        name: "challenge.oneday.funded",
        duration: "challenge.rules.unlimited",
        minDays: "-",
        profitTarget: "-",
        dailyDD: "4%",
        maxDD: "8%",
        leverage: "1:100",
        profitSplit: "90%",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
    ],
    features: [
      "challenge.oneday.feature1",
      "challenge.oneday.feature2",
      "challenge.oneday.feature3",
    ],
  },
  {
    slug: "instantFunded",
    nameKey: "challenge.instantFunded.name",
    taglineKey: "challenge.instantFunded.tagline",
    badgeKey: "challenge.instantFunded.badge",
    accounts: [
      {
        size: "$25K",
        price: "$299",
        buyUrl: "https://pay.hotmart.com/trade4u-instantFunded-25k",
      },
      {
        size: "$50K",
        price: "$499",
        buyUrl: "https://pay.hotmart.com/trade4u-instantFunded-50k",
        popular: true,
      },
      {
        size: "$100K",
        price: "$699",
        buyUrl: "https://pay.hotmart.com/trade4u-instantFunded-100k",
      },
    ],
    phases: [
      {
        name: "challenge.instantFunded.funded",
        duration: "challenge.rules.unlimited",
        minDays: "-",
        profitTarget: "-",
        dailyDD: "4%",
        maxDD: "6% trailing",
        leverage: "1:100",
        profitSplit: "80%",
        commissions: "$4/lot",
        consistency: "challenge.rules.noConsistency",
        sltp: "challenge.rules.notRequired",
        news: "challenge.rules.allowed",
      },
    ],
    features: [
      "challenge.instantFunded.feature1",
      "challenge.instantFunded.feature2",
      "challenge.instantFunded.feature3",
    ],
  },
];

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}
