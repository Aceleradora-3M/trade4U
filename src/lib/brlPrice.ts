/**
 * The Brazil offer is the same Hotmart product as the international $25K, which
 * is priced in dollars. Hotmart converts it at checkout, so the site shows the
 * dollar price converted at the current USD/BRL rate instead of a fixed amount
 * that falls behind when the dollar rises.
 */
export const BRAZIL_PRICE_USD = 60;

/** Placeholder written in `messages/pt.json` wherever the price appears. */
export const BRL_PRICE_TOKEN = "{precoPix}";

/**
 * Hotmart does not convert at the commercial rate: its rate "already includes
 * IOF" plus spread and international processing costs, refreshed every 24h,
 * and the percentage is not published (help.hotmart.com, article
 * 360025069992). So this factor is measured, not documented. Calibrated on 2026-11-17, when the checkout charged R$ 414,00 for
 * US$ 65 with the commercial rate at 5.7723 (414 / (65 × 5.7723) ≈ 1.1034).
 * Recalibrate if the checkout and the site drift apart.
 */
const CHECKOUT_MARKUP = 1.1034;

/** Used only when every rate source fails: the commercial rate at calibration. */
const FALLBACK_RATE = 5.7723;

/** How often the rate is fetched again, in seconds. */
const RATE_REVALIDATE = 3600;

const SOURCES: { url: string; read: (data: unknown) => unknown }[] = [
  {
    url: "https://economia.awesomeapi.com.br/json/last/USD-BRL",
    read: (data) => (data as { USDBRL?: { ask?: string } }).USDBRL?.ask,
  },
  {
    url: "https://open.er-api.com/v6/latest/USD",
    read: (data) => (data as { rates?: { BRL?: number } }).rates?.BRL,
  },
];

async function fetchRate(): Promise<number> {
  for (const source of SOURCES) {
    try {
      const res = await fetch(source.url, {
        next: { revalidate: RATE_REVALIDATE },
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) continue;
      const rate = Number(source.read(await res.json()));
      // Sanity bounds so a bad response never prints an absurd price.
      if (Number.isFinite(rate) && rate > 3 && rate < 15) return rate;
    } catch {
      // Try the next source.
    }
  }
  return FALLBACK_RATE;
}

/** Brazil price as the checkout charges it, rounded to whole reais. */
export async function getBrlPrice(): Promise<number> {
  return Math.round(BRAZIL_PRICE_USD * (await fetchRate()) * CHECKOUT_MARKUP);
}

export function formatBrl(value: number): string {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

/** Replaces the price token in every string of a messages tree. */
export function fillBrlPrice<T>(node: T, price: string): T {
  if (typeof node === "string") {
    return node.replaceAll(BRL_PRICE_TOKEN, price) as T;
  }
  if (Array.isArray(node)) {
    return node.map((item) => fillBrlPrice(item, price)) as T;
  }
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [key, fillBrlPrice(value, price)])
    ) as T;
  }
  return node;
}
