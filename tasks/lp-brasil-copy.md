# Home /pt — copy da página Brasil (R$ 389, Pix, bolsa americana)

Fonte: `Trade4U_Pagina_Brasil_Para_Aprovacao_Atualizada.html` (Downloads).
Decisões do usuário (26/10/2026): só `/pt`; uma conta (R$ 125 mil, R$ 389, de
R$ 688); todos os CTAs "Quero minha conta" vão direto ao Hotmart
(`H106010807E`) com InitiateCheckout em BRL; layout e componentes do site
mantidos; commit + push na main.

## Mapa HTML -> componente

| HTML | Site |
|---|---|
| Barra do topo | `Header` `promo.welcome` |
| Hero + faixa de números + card da conta | `Hero` (`hero.*`, stats e card viram mensagens) |
| Oferta | `ChallengeTable` (dados por idioma em `src/data/market.ts`) |
| Regras + Saque | `TradingConditions` (`conditions.*`, 7 cards) |
| Entenda + O que operar | `WhyTradersLove` (`love.*`) |
| Como funciona (4 passos) | `HowItWorks` (3 passos, acesso + operar juntos) |
| Dúvidas (9) | `HomeFAQ` (quantidade por idioma em `market.ts`) |
| CTA final | `CTAFinal` |
| Rodapé | `footer.disclaimer` |

## Itens

- [x] `src/data/market.ts`: ofertas por idioma (PT 1 conta BRL, EN/ES as 2 de hoje)
- [x] `CheckoutLink`: CTA vai ao Hotmart quando o idioma vende uma conta só
- [x] Pixel: `currency` por oferta; evento custom continua por tamanho canônico (`$25K`)
- [x] Hero: stats e card de parâmetros lidos das mensagens (EN/ES com os valores atuais)
- [x] ChallengeTable: lê `market.ts`, esconde toggle de tamanho com uma conta só
- [x] FAQ: página `/faq` lista todas as perguntas existentes; home lista `homeFaqCount`
- [x] `messages/pt.json` com a copy nova; chaves novas também em EN/ES (paridade)
- [x] Metadata PT (title/description)
- [x] Fix do clip de `text-gradient-accent` em `globals.css` (accent do H1 quebra linha)
- [x] Verificar: tsc, lint, build, paridade de chaves, render 390x844 e 1440x900, EN/ES inalterados

## Review

- `tsc --noEmit` limpo, `eslint src` 0 erros, `next build` ok.
- Paridade de chaves: EN/ES 0 faltando. PT tem `faq.q7`–`q14` a mais de
  propósito: `/faq` lista tudo que o idioma define, e EN/ES seguem com 6.
- Chrome via CDP contra o build de produção:
  - `/pt` 390x844: sem overflow horizontal, CTA do hero acima da dobra (821px).
  - `/pt` 1440x900: accent itálico do H1 quebra em duas linhas sem cortar glifo.
  - 5 CTAs "Quero minha conta" em `/pt` -> `pay.hotmart.com/H106010807E`, cada
    clique dispara `InitiateCheckout` + `initiate_checkout_25k` com 389 BRL.
  - `/en`: CTAs como antes (`/en#pricing`, `/en/challenges`), compra 99 USD.
- Texto visível de `/en`, `/es`, `/en/faq`, `/es/faq` idêntico à produção.

## Pendente

1. `/pt/challenges` e `/pt/challenges/[slug]` ainda listam os 4 programas em USD
   (`src/data/challenges.ts`), sem relação com a oferta de R$ 389.
2. Botão da página `/pt/how-it-works` leva a `/challenges` (mesmo problema).
3. Copy aprovada usa "saque é de verdade" e "o máximo que você gasta são os
   R$ 389". Passou pela aprovação da página, mas é o tipo de frase que o filtro
   de 15/09 (`meta-compliance-landing.md`) evitava. Vale rever antes de subir
   anúncio apontando para `/pt`.
