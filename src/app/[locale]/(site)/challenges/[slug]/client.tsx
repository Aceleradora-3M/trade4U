"use client";

import { useTranslations } from "next-intl";
import { getChallengeBySlug } from "@/data/challenges";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import { trackStartChallenge } from "@/lib/pixel";

export default function ChallengeDetailClient({ slug }: { slug: string }) {
  const badge = useTranslations("badge");
  const rule = useTranslations("rule");
  const cta = useTranslations("cta");
  const challenge = getChallengeBySlug(slug);

  if (!challenge) return null;

  const fundedPhase = challenge.phases[challenge.phases.length - 1];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {challenge.accounts.map((account) => (
        <div
          key={account.size}
          className={`relative rounded-3xl border p-6 transition-smooth hover:scale-[1.02] ${
            account.popular
              ? "border-accent/50 bg-accent/5 shadow-lg shadow-accent/10"
              : "border-border bg-gradient-card"
          }`}
        >
          {account.popular && (
            <Badge
              variant="teal"
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              {badge("popular")}
            </Badge>
          )}

          <div className="text-center mb-6">
            <div className="font-display font-bold text-2xl text-foreground mb-1">
              {account.size}
            </div>
            <div className="font-display font-black text-3xl text-accent mt-1">
              {account.price}
            </div>
            {account.activation && (
              <div className="text-xs text-muted-foreground mt-1">
                + {account.activation} {rule("activation")}
              </div>
            )}
          </div>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{rule("split")}</span>
              <span className="text-accent font-semibold">
                {fundedPhase.profitSplit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{rule("maxDD")}</span>
              <span className="text-foreground font-medium">
                {fundedPhase.maxDD}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{rule("leverage")}</span>
              <span className="text-foreground font-medium">
                {fundedPhase.leverage}
              </span>
            </div>
          </div>

          <Button
            href={account.buyUrl}
            external
            className="w-full"
            size="sm"
            variant={account.popular ? "primary" : "outline"}
            onClick={() =>
              trackStartChallenge(challenge.slug, account.size, account.price)
            }
          >
            {cta("buyChallenge")}
          </Button>
        </div>
      ))}
    </div>
  );
}
