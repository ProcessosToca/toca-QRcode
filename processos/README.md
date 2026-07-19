# Área de Processos — experiência interativa

Landing page interativa (single page) que ensina, de forma visual, por que
toda empresa precisa de uma área de Processos. O visitante escolhe seu
segmento — **Indústria** ou **Serviços** — e vive uma mini-experiência com
simuladores, métricas animadas e uma linha de fluxo vermelha que atravessa a
página, do caos (hero) ao processo (CTA final).

Este projeto vive na subpasta `processos/` do repositório `toca-QRcode` e é
independente do site estático de redes sociais na raiz do repo — não
compartilham build nem deploy.

## Stack

Vite + React 18 + TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Framer
Motion, Recharts, canvas-confetti, lucide-react.

## Rodar localmente

```bash
cd processos
npm install
npm run dev
```

## Build de produção

```bash
npm run build   # tsc -b && vite build -> gera processos/dist
npm run preview # serve o build localmente
```

## Editar conteúdo (textos e números)

Todo o texto e os números da página vivem em `src/data/content.ts`,
tipados por segmento (`industria` | `servicos`). Não é necessário mexer em
componentes para alterar copy, estatísticas ou o link do WhatsApp do CTA
final (constante `WHATSAPP_LINK` no topo do arquivo).

## Deploy (Vercel)

Este app é destinado a deploy na Vercel como um projeto próprio (não usa o
GitHub Pages configurado para a raiz do repositório):

1. Crie um novo projeto na Vercel apontando para este repositório.
2. Em **Root Directory**, selecione `processos`.
3. Framework preset: **Vite** (detectado automaticamente). Build command
   `npm run build`, output directory `dist`.
4. Deploy.

## Acessibilidade e performance

- Respeita `prefers-reduced-motion`: desativa a linha de fluxo animada,
  contadores e transições pesadas, trocando por estados finais estáticos.
- Áreas de toque dos simuladores ≥ 44px.
- Seções abaixo da dobra (simulador, transformação, CTA) são carregadas
  via `React.lazy`.
