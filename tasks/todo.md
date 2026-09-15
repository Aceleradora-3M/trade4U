# Meta Pixel — Correções

Contexto: auditoria do pixel `488367055531398` feita com Chrome headless em localhost e
em produção (trade4uprop.com). Links da Hotmart e eventos de Purchase ficam como estão —
a Hotmart já dispara os eventos de compra do lado dela.

## Escopo

- [x] 1. PageView em navegação SPA
      Bug confirmado: `fbq('track','PageView')` só roda no script inline do load inicial.
      Navegação client-side (`next/link`, troca de idioma) não redispara.
      Medido em produção: 2 navegações SPA -> `eventCount` parado em 1, zero chamadas `fbq`.
      Fix: efeito em `MetaPixel` que observa `usePathname()` e dispara PageView em cada
      mudança de rota, sem duplicar o PageView inicial do script inline.

- [x] 2. Pixel ID em fonte única
      ID estava hardcoded em `MetaPixel.tsx` e `lib/pixel.ts`. Passa a ser exportado
      de `lib/pixel.ts` e consumido pelo componente.

- [x] 3. Remover código morto em `lib/pixel.ts`
      `trackBuyChallenge`, `trackLead` e `trackViewContent` nunca são chamados.
      Purchase é responsabilidade da Hotmart.

- [x] 4. Tipagem honesta de `window.fbq`
      Declarado como sempre presente; na prática é `undefined` até o script inline rodar.
      Passa a ser opcional.

- [x] 5. Pixel na página 404
      `app/not-found.tsx` renderiza o próprio `<html>/<body>` e ficava sem pixel.

## Fora do escopo do código (exige ação no painel/decisão)

- Traffic Permissions: o pixel está bloqueado em `localhost`
  ("unavailable on this website due to it's traffic permission settings", config
  truncado em 14KB contra 142KB em produção). Precisa liberar o domínio de
  desenvolvimento no Events Manager para dar para testar fora de produção.
- Advanced Matching com o e-mail do formulário de contato: melhora o match quality,
  mas envia dado pessoal para a Meta. Exige o toggle no Events Manager e menção na
  política de privacidade.
- Conversions API (server-side) com `eventID` para deduplicação: recupera os 20-40%
  perdidos para adblock/ITP. Exige token de acesso e endpoint no servidor.

## Review

Alterados: `src/lib/pixel.ts`, `src/components/tracking/MetaPixel.tsx`, `src/app/not-found.tsx`.
`tsc --noEmit` limpo, `next build` compila. Os 3 erros de lint que aparecem estao em
`src/components/home/HowItWorks.tsx:69` e ja existiam antes destas mudancas.

### Bateria de eventos (Chrome headless contra o build de producao)

| Cenario | Resultado |
| --- | --- |
| Carregamento direto de 13 paginas x 3 idiomas (39 casos) | `init` + exatamente 1 `PageView` em todas |
| 6 navegacoes client-side | 1 `PageView` por rota |
| Botao voltar / avancar do navegador | 1 `PageView` cada |
| Reclicar a rota atual | nenhum evento extra |
| Troca de idioma `/en/faq` -> `/pt/faq` | 1 `PageView` |
| Pagina 404 | `init` + `PageView` + `<noscript>` presente |
| CTA de checkout na home (en/es/pt) | `InitiateCheckout` + `initiate_checkout_25k` |
| 14 botoes de compra em `/challenges/[slug]` | `InitiateCheckout` em todos, com `value` correto |
| Formulario de contato (en/es/pt) | `Contact` |

Antes da correcao, a mesma bateria em producao registrava `eventCount` parado em 1 e
zero chamadas `fbq` apos duas navegacoes SPA.

Nota de metodo: o beacon para `facebook.com/tr` nao e observavel no Chrome headless
(um site com pixel comprovadamente ativo apresenta o mesmo comportamento), entao a
medicao foi feita nas chamadas `fbq` e em `fbq.getState()`, nao no trafego de rede.

## Correcao dos eventos custom (opcao A)

`trackInitiateCheckout25k` e `trackInitiateCheckout50k` mandavam `content_name` e
`value` fixos de Instant Funding (99 e 199) mas eram chamados em todas as paginas de
challenge, entao a Meta recebia dois valores conflitantes para o mesmo clique:
`standard - $25K` valia 287 no `InitiateCheckout` e 99 no evento custom.

- [x] Evento custom passa a carregar nome e preco reais do produto clicado.
- [x] A escolha do evento por tamanho de conta virou um mapa em `lib/pixel.ts`, e o
      `trackStartChallenge` dispara o par. Some o `if/else` duplicado nos dois call
      sites, que era de onde o bug vinha.

Medido apos a correcao, os dois eventos do mesmo clique agora batem:

| Clique | `InitiateCheckout` | custom no mesmo clique |
| --- | --- | --- |
| standard $25K | `standard - $25K`, 287 | `initiate_checkout_25k`, `standard - $25K`, 287 |
| oneday $25K | `oneday - $25K`, 149 | `initiate_checkout_25k`, `oneday - $25K`, 149 |
| instantFunded $50K | `instantFunded - $50K`, 499 | `initiate_checkout_50k`, `instantFunded - $50K`, 499 |
| home instant $25K | `instant - $25K`, 99 | `initiate_checkout_25k`, `instant - $25K`, 99 |

Contas de $100K e $150K seguem sem evento custom, como antes.

Bateria completa refeita: 19 verificacoes, 0 falhas.
