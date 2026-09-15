# Landing pages PT / EN / ES — conformidade Meta

Execução do plano de correção de 15/09/2026. Objetivo: tirar da página toda
promessa de resultado financeiro, garantia ou ausência de risco, mantendo a
oferta comercial intacta (preços, tiers, 90/10, 24h, 7 dias, nomes dos programas,
tabela de condições, BlackArrow).

## Feito

- [x] **Tags de head (§4)** — `src/app/[locale]/layout.tsx`. Novos title e
      description nos três idiomas, replicados em `og:description` e
      `twitter:description`. Adicionado `metadataBase` e `og:url`.
- [x] **Canonical + hreflang (§7.1, §7.2)** — `src/lib/site.ts` expõe
      `SITE_URL` e `localeAlternates(locale, path)`. Cada página server component
      declara canonical auto-referente + `en`, `es`, `pt-BR`, `x-default`.
      `contact` foi dividido em `page.tsx` (server, metadata) + `client.tsx`
      (formulário) só para poder ter canonical.
- [x] **Redirect www (§7.3)** — `next.config.ts` redireciona 301
      `trade4uprop.com/*` para `https://www.trade4uprop.com/*`.
- [x] **Badge do topo (§5.1)** — `hero.badge` nos três idiomas.
- [x] **H1 (§5.2)** — mantido.
- [x] **Subtítulo do hero (§5.3)** — `hero.sub` reescrito, prazo condicional.
- [x] **KPIs do hero (§5.4)** — números mantidos, rótulos `hero.s2` e `hero.s3`
      reescritos.
- [x] **Widget de P&L (§5.5)** — **Opção A**: os dois cards flutuantes com
      `P&L Today +$3,450` e `Funded Account $103,450 [Live]` foram removidos e
      substituídos por um card estático com os parâmetros do programa (meta de
      lucro, drawdown máximo, dias mínimos), lidos da mesma fonte da tabela de
      condições. Nenhum número de resultado permanece na página.
- [x] **Preços e contas (§5.6)** — `table.challengeAccount` → CONTA SIMULADA,
      `perks.payouts24h` condicional, `table.sub` com taxa não reembolsável.
- [x] **Condições de trading (§5.7)** — `conditions.sub`.
- [x] **Como funciona (§5.8)** — `journey.sub`, `journey.s2.*`, `journey.s3.body`.
- [x] **Benefícios (§5.9)** — `love.sub` sem superlativo, card `$150K` como conta
      simulada, `Acesso Global` → `Acesso Internacional` com link para a lista de
      países restritos.
- [x] **FAQ (§5.10)** — `faq.q2`/`faq.a2` com os requisitos reais (5 dias
      lucrativos, $200/dia, consistência 30%, 24h após aprovação).
- [x] **CTA final (§5.11)** — `ctafinal.*` e `cta.getFunded` →
      Iniciar Avaliação / Start Evaluation / Iniciar Evaluación.
- [x] **Tagline do rodapé (§5.12)** — `footer.tagline`.
- [x] **/challenges (§5.13)** — `challenge.instantFunded.tagline` e
      `challenge.instantFunding.tagline` passam a dizer conta simulada desde o
      primeiro dia, nos três idiomas. Idem `standard` e `oneday`.
- [x] **Disclaimer acima da dobra (§6.1)** — `disclosure.aboveFold`, renderizado
      no hero da home e no hero de `/challenges`, 12px, `text-muted-foreground`
      (contraste ~8.6:1 sobre o fundo, acima do mínimo 4.5:1).
- [x] **/risk-disclosure (§6.2)** — página própria nos três idiomas, seis seções:
      natureza simulada, risco de perda da taxa, ausência de garantia de aprovação
      ou payout, resultados simulados, jurisdições restritas, não é recomendação.
      Linkada do rodapé (antes o link apontava para `/terms`).
- [x] **/restricted-countries (§6.4)** — página própria nos três idiomas,
      linkada do rodapé e do card de acesso internacional.
- [x] **Link "Freedom" (§6.5)** — removido do rodapé (não correspondia a nenhum
      produto da página); no lugar entrou Plataforma de Trading.
- [x] **Rótulos não traduzidos (§7.4)** — `STEP 1/2/3`, `EVALUATION PHASE`,
      `FUNDED PHASE`, `PAYOUT`, `One-time fee`, `Back`, `Profit Split`,
      `Max Drawdown`, `Trade4U Prop` agora vêm das mensagens.
      `P&L Today`, `Funded Account` e `Live` deixaram de existir.
- [x] **Plataforma (§7.5)** — `/pt` e `/es` passam a nomear a BlackArrow como a
      `/en` já fazia (eyebrow, título, subtítulo, feature 5, CTA e FAQ a1).

## Encontrado durante a execução (fora do plano original)

- **Chaves de tradução vazando como texto** em `/[locale]/challenges/[slug]`:
  `challenge.rules.unlimited`, `challenge.rules.noConsistency`,
  `challenge.rules.notRequired`, `challenge.rules.allowed` eram renderizadas
  cruas. Corrigido: as chaves foram criadas nos três idiomas e o valor passa por
  um resolvedor na página.
- **Durações em inglês** (`30 days`, `60 days`, `1 day`) nas versões PT e ES.
  Passaram a ser tokens `days:<n>` resolvidos por ICU plural.
- **Contradição na regra de notícias**: os dados dos programas diziam
  `news: allowed` enquanto a tabela de condições e o FAQ dizem que operar 5
  minutos antes/depois de notícia de alto impacto fecha a conta. Alinhado para
  `Restrito`.
- **Link que perdia o idioma**: o CTA da seção "Como funciona" usava
  `<a href="/#pricing">`, que em `/pt` e `/es` caía na raiz e voltava para `/en`.
  Trocado pelo `Link` do i18n — mesma classe de bug do commit `df5f70e`.
- **Termos de Uso**: a definição de `"Funded Account"` virou
  `"Simulated Funded Account"`, com a frase explícita de que nenhuma conta da
  Trade4U movimenta capital real.

## Pendente — depende de informação ou acesso que o código não tem

1. **Bloco de identificação legal no rodapé (§6.3).** O mecanismo está pronto em
   `src/data/legal.ts` e o rodapé renderiza o bloco assim que `name` for
   preenchido. Razão social, número de registro, endereço e país **não foram
   inventados**. Preencher o arquivo e fazer deploy.
2. **Lista de países restritos no checkout (§6.4).** O checkout é Hotmart, fora
   deste repositório. A página existe e está linkada no site.
3. **Termos e Política de Privacidade em PT e ES.** Ambas as páginas continuam
   em inglês nos três idiomas. É texto jurídico e precisa de tradução revisada,
   não de tradução automática.
4. **Re-scrape no Sharing Debugger (§7.6)** das três URLs após o deploy.
5. **Verificação de anunciante financeiro (§9.5)** na conta 907467101839280.
6. **Confirmar o 301 www no host.** O redirect está no `next.config.ts`; se o
   deploy for Vercel com domínio configurado, conferir se a regra de domínio
   não conflita.

## Verificação

Script de QA rodado contra o HTML pré-renderizado do `next build` (48 páginas):

- nenhuma ocorrência, no texto visível, de: `dinheiro real` / `real cash` /
  `dinero real` / `real money` / `capital real` / `live capital` / `no risk` /
  `sem risco` / `sin riesgo` / `our capital` / `nosso capital` /
  `nuestro capital` / `milhares de traders` / `thousands of traders` /
  `miles de traders` / `highest-rated` / `mais bem avaliada` / `mejor valorada` /
  `sem armadilhas` / `hidden traps` / `trampas ocultas` / `funded account` /
  `conta financiada` / `cuenta fondeada` / `P&L Today` / `Live` / `Get Funded` /
  `Seja Financiado` / `Obtener Fondos` / `guaranteed` / `garantido` /
  `garantizado` / `fast payouts` / `pagamentos rápidos` / `pagos rápidos`;
- `simulated` / `simulado` / `simulada` presente acima da dobra em `/en`, `/pt`,
  `/es` e nas três versões de `/challenges`;
- canonical + 4 hreflang em todas as páginas indexáveis;
- pixel `488367055531398` presente em `/en`, `/pt` e `/es`;
- paridade de chaves entre `en`, `pt` e `es`: 0 faltando, 0 sobrando;
- `tsc --noEmit` limpo, `eslint src` com 0 erros, `next build` sem erros.
