"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { getMarket, type Offer } from "@/data/market";

/** Live Brazil price ("R$ 376"), computed on the server from the USD/BRL rate. */
const BrlPriceContext = createContext<string | null>(null);

export function BrlPriceProvider({
  price,
  children,
}: {
  price: string | null;
  children: ReactNode;
}) {
  return <BrlPriceContext.Provider value={price}>{children}</BrlPriceContext.Provider>;
}

/** The locale's market, with BRL offers priced at the live rate. */
export function useMarket() {
  const market = getMarket(useLocale());
  const brlPrice = useContext(BrlPriceContext);

  return useMemo(() => {
    if (!brlPrice) return market;
    const offers: Offer[] = market.offers.map((offer) =>
      offer.currency === "BRL" ? { ...offer, price: brlPrice } : offer
    );
    return { ...market, offers };
  }, [market, brlPrice]);
}

/**
 * The offer every primary CTA checks out directly, when the locale sells only
 * one. Otherwise CTAs lead to the pricing section to pick an account.
 */
export function useDirectOffer(): Offer | undefined {
  const { offers } = useMarket();
  return offers.length === 1 ? offers[0] : undefined;
}
