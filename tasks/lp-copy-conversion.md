# LP principal — reescrita de copy para conversão

Contexto: a home foi passada pelo filtro de conformidade Meta em 15/09
(`meta-compliance-landing.md`). O filtro funcionou para política e deixou a
página genérica — H1 falando da empresa, subtítulo empilhando três claims,
e o único diferencial real (regulamento publicado na íntegra) escondido no meio
da página.

Escopo desta execução: **apenas `messages/{en,pt,es}.json`**. Nenhum `.tsx`
alterado. Tom firme e premium, três idiomas no mesmo peso.

## Decisão de estratégia

A home **não tem prova social**: `Reviews`, `PayoutProof`, `BigStats`,
`TrustBar`, `Trade2Earn` e `AccountModels` existem em `src/components/home/` mas
não são importados em lugar nenhum. O texto guardado neles (cinco depoimentos com
nome, `$2M+`, `12,000+ traders`, "Prop Firm of The Year 2025") **não foi ligado**
— é prova que não existe.

Sem prova social, o eixo da página passa a ser **transparência**: o regulamento
inteiro é público antes do pagamento, e isso é verificável em `/challenges`,
`/risk-disclosure` e `/restricted-countries`. Toda a copy nova sai daí.

## Feito

- [x] **Hero reescrito.** De "Empowering / Promising / Traders Worldwide" para
      "Every rule **published** before payment. CME futures, up to $150K
      simulated." Fala com o leitor e diz o que se compra.
- [x] **Banda do topo** deixou de ser "Welcome to Trade4U" (largura total, zero
      função) e passou a carregar a oferta que já existia na tabela:
      "$25K evaluation — $99, regular $165."
- [x] **Âncora de preço corrigida.** O rótulo acima do preço riscado era `from`
      = "From" / "Valor" / "Desde", que lê como "a partir de" e matava a âncora.
      Virou "REGULAR" / "PREÇO CHEIO" / "PRECIO NORMAL".
- [x] **CTA de compra unificado.** Os três idiomas diziam coisas diferentes
      ("Buy Challenge" / "Iniciar Desafio" / "Comprar Desafío"). Agora é
      "Iniciar avaliação —" nos três, concatenado com o tamanho da conta.
- [x] **CTA final** deixou de repetir a tabela palavra por palavra. No ponto de
      maior intenção entrega argumento novo: "Read the rules. Then decide."
- [x] **`love.*`** deixou de ser lista de features repetidas e virou benefício
      com consequência. **`conditions.*`** e **`journey.s3`** deixaram de ser
      defensivos — a regra dita com precisão é argumento, não ressalva.
- [x] **`val.consistency` corrigido de 40% para 30%**, que é o que as linhas da
      tabela e `faq.a2` já diziam.
- [x] **13 namespaces órfãos apagados** nos três idiomas: `proof` `payouts`
      `trust` `award` `phase` `panel` `summary` `apart` `featured` `plans`
      `videos` `eyebrow` `tip`. Zero referências em `src/`, conferido por grep
      individual. Como `[locale]/layout.tsx:108` entrega o catálogo **inteiro**
      ao `NextIntlClientProvider` sem recorte, cada namespace vivia no HTML de
      todas as 49 páginas.

## Ajustes feitos durante a verificação visual

Três defeitos só apareceram no render, não no HTML:

1. **CTA abaixo da dobra no mobile.** Com a copy inicial, o botão do hero caía
   fora de um viewport de 390x844 em PT e ES. Hero encurtado (subtítulo e
   rótulos dos KPIs) até o botão ficar inteiro acima da dobra nos três idiomas.
2. **Glifo cortado no texto com gradiente.** `text-gradient-accent` + itálico
   corta o último glifo de **cada linha** do trecho — `pagar` renderizava
   `pagaı`, `del` renderizava `de`. Causa é o `-webkit-background-clip: text`
   em `globals.css:150`, que recorta por fragmento de linha. Espaço no fim da
   string não resolve (é colapsado na quebra). Contornado por copy: o trecho
   em destaque virou uma palavra só (`published` / `publicada`), que nunca
   quebra. **A correção de verdade é uma linha de CSS e continua pendente.**
3. **Rótulos dos KPIs quebrando em duas linhas** no mobile. Encurtados para uma
   linha cada.

## Verificação

- Paridade de chaves `en`/`pt`/`es`: 0 faltando, 0 sobrando.
- `tsc --noEmit` limpo, `next build` sem erros, 49 páginas geradas.
- Nenhuma chave crua vazando como texto nas três homes.
- Varredura de termos proibidos no texto visível das três homes: **0 ocorrências**
  de `guaranteed/garantido/garantizado`, `no risk/sem risco/sin riesgo`,
  `real money/dinheiro real/dinero real`, `our capital/nosso capital/nuestro
  capital`, `funded account/conta financiada/cuenta fondeada`.
  (A varredura das 48 páginas acusa `funded account` só em `/terms`, na definição
  `"Simulated Funded Account"` que o passe de conformidade criou de propósito.)
- `disclosure.aboveFold` presente acima da dobra nos três idiomas.
- Chrome via CDP, viewport real 390x844 e 1440x900, três idiomas, mais varredura
  da página inteira em fatias de 1000px: sem overflow, sem texto cortado, CTA do
  hero acima da dobra.

### Tamanho

| | antes | depois | delta |
|---|---|---|---|
| `messages/en.json` | 28.044 B | 23.288 B | −4.756 |
| `messages/pt.json` | 29.811 B | 24.719 B | −5.092 |
| `messages/es.json` | 29.854 B | 24.739 B | −5.115 |
| HTML `/en` | 93.177 B | 89.107 B | −4.070 |
| HTML `/pt` | 95.584 B | 91.131 B | −4.453 |
| HTML `/es` | 95.822 B | 91.310 B | −4.512 |

A copy nova é mais longa e mesmo assim o HTML encolheu 4-5 KB por página, em
todas as 49 — a poda dos órfãos mais que compensou.

## Pendente — fora do escopo "só copy"

1. **Correção do clip do gradiente** em `globals.css:150`. Uma linha. Enquanto
   não for feita, nenhum trecho com `text-gradient-accent` pode quebrar linha.
2. **Hero mostra `$149` / "One-Day"** (`Hero.tsx:68`, número hardcoded) mas a
   home só vende Instant Funding a $99/$189. Quebra de message-match no 4º KPI.
3. **`src/data/challenges.ts` desatualizado**: preços $287/$457/$697 contra os
   $99/$189 da home, `buyUrl` placeholder (`trade4u-standard-25k`), e
   `instantFunded` com split 80% enquanto a home promete 90%.
4. **`section.pricing.sub` diz "A partir de $287"** — não corrigi porque não dá
   para verificar qual é o preço real do programa Standard hoje. Precisa de você.
5. **Afordâncias mortas na tabela**: botão "Program" (`ChallengeTable.tsx:100`) e
   6 ícones de info (`:183`) sem handler.
6. **Mobile não tem CTA persistente** — o botão do header é `hidden lg:flex`, e o
   `LanguageSwitcher` (`fixed bottom-4 right-4 z-[60]`) ocupa exatamente o espaço
   de uma barra fixa de CTA, num z-index acima do header.
7. **Performance** (medido, não corrigido): `hero-candles.png` 437 KB como `<img>`
   cru com `loading="lazy"` acima da dobra, fora do preload de LCP;
   `platform-mockup.jpg` 120 KB pré-carregado mesmo abaixo da dobra; `next/image`
   configurado e não usado na home; 10 variantes de peso de fonte (317 KB);
   `<preconnect>` morto para `fonts.googleapis.com`; 8 dos 13 componentes da home
   são `"use client"` sem usar nenhuma API de cliente; framer-motion 120 KB por
   rota em todas as páginas menos a home.
