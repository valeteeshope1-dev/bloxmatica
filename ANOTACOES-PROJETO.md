# Bloxmática — anotações do projeto

Atualizado em 03/10/2026. Resumo de tudo o que foi feito e de onde paramos.

## Onde está

- **Site no ar:** https://bloxmatica.vercel.app
- **Código:** https://github.com/valeteeshope1-dev/bloxmatica (branch `main`)
- **Publicação:** cada envio para o GitHub entra no ar sozinho na Vercel em 1–2 minutos.
- **Ver no computador:** servidor local em http://127.0.0.1:5500/

## Páginas

| Página | Arquivo | O que tem |
|---|---|---|
| Página de vendas | `index.html` | Cronômetro até meia-noite, headline +350 aventuras, carrossel do material, botão de amostra grátis, prova social passando, 3 presentes do Premium, planos, garantia (selo), FAQ, rodapé completo |
| Amostra grátis | `amostra.html` | 8 páginas do PDF, download do PDF, botões "Adquirir agora" e "Voltar à página" |
| Checkout | `checkout.html` + `js/checkout.js` | Cronômetro, selo Risco Zero, escolha do plano, identificação, upgrade/downsell, ir para a Cakto |

## Preços e links de pagamento (Cakto)

| Plano | Preço | Riscado | Link |
|---|---|---|---|
| Básico | R$ 14,90 | R$ 39,90 | https://pay.cakto.com.br/exfs9jn_1153810 |
| Premium Completo | R$ 37,90 | R$ 87,90 | https://pay.cakto.com.br/347pjfb_1153873 |
| Premium Essencial (só no downsell) | R$ 24,90 | R$ 37,90 | https://pay.cakto.com.br/3eyqzi3_1158177 |

A Cakto soma **R$ 0,99 de taxa de serviço** no total.
Preços e links ficam no topo de `js/checkout.js` (objeto `PLANOS`).

## Funil do checkout

1. Cliente do **Básico** preenche os dados e clica para pagar.
2. Abre um **card**: Premium Completo (app + Guia Rápido para os Pais + Plano Semanal).
   - Verde: aceita → paga o Premium Completo.
   - Vermelho "Não quero pagar o valor cheio" → downsell.
3. **Downsell:** Premium Essencial = app + acesso vitalício sem mensalidades, **sem** os 2 bônus (riscados na tela).
   - Verde: aceita → paga o Essencial.
   - Vermelho: continua com o Básico.

Regra: o aplicativo **nunca sai** da oferta Premium.
Pré-visualizar: `checkout.html?plano=basico&ver=upgrade` ou `&ver=downsell`.

## Order bumps

- 4 bumps (R$ 12,90 cada, de R$ 25,90): Técnica da Tabuada, UNO 4 Operações, Plano Semanal (some no Premium), Geometria nos Jogos.
- **No checkout do site: escondidos** (`BUMPS_ATIVOS = false` em `js/checkout.js`). Para reativar, trocar para `true`.
- **Na Cakto:** cadastrados nos produtos, com a pré-seleção **desligada** (começam desmarcados).
- A Cakto **não aceita** pelo link quais bumps marcar. Para sincronizar seria preciso um produto por combinação (pode ser automatizado pelo CaktoMCP/API). **Decisão pendente.**

## Dados enviados para a Cakto

Nome, e-mail, confirmação de e-mail e CPF (parâmetro `document`) chegam preenchidos. O **celular não** — a Cakto não lê esse campo pelo link.
O CPF **não** é guardado no navegador.

## Pendências

- [ ] Decidir a estratégia dos order bumps.
- [ ] Cakto: trocar o nome do vendedor ("Assistente Mundo Matemágico") e renomear o Essencial ("BLOXMÁTICA PREMIUM" → "Bloxmática – Premium Essencial").
- [ ] Cakto: perguntar ao suporte o parâmetro para pré-preencher o celular.
- [ ] Criar páginas de Política de Privacidade e Termos de Uso (links do rodapé estão em "#").
- [ ] Links do Instagram e do Facebook no rodapé.
- [ ] Prova social: usar depoimentos reais (os arquivos DEPOIMENTO 1–6 não foram aplicados).
- [ ] Card do plano de R$ 37,90 na página ainda diz "Plano/Combo Completo"; o checkout usa "Premium Completo".
- [ ] Pixel/rastreamento: removido a pedido; recolocar antes de rodar anúncios, se quiser medir conversões.
- [ ] Cadastrar o site no Google Search Console e pedir indexação (para o ícone e o nome aparecerem no Google).
