<div align="center">

<br />

<picture>
  <img alt="Ravius" src="./ravius.svg" height="64" />
</picture>

# Landing Page Template

**Base de produção para Landing Pages modernas, escaláveis e prontas para IA.**

<br />

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-22c55e?style=flat-square)](LICENSE)

<br />

[Início Rápido](#-início-rápido) · [Arquitetura](#-arquitetura) · [Personalizando](#-personalizando-o-conteúdo) · [Expandindo](#-expandindo-o-template) · [Convenções](#-convenções)

<br />

</div>

---

## Sobre o Projeto

Este repositório é a **base oficial de produção** para Landing Pages da Ravius. Não é uma coleção de componentes avulsos — é uma **arquitetura opinativa e documentada** que elimina decisões repetitivas, previne bugs em produção e garante que qualquer desenvolvedor (ou IA como Cursor, Copilot e Lovable) possa contribuir sem introduzir efeitos colaterais.

A aplicação é construída sobre o **Padrão Ravius de Arquitetura Front-End**: quatro camadas com responsabilidades estritamente isoladas, comunicando-se em fluxo unidirecional. O princípio central é simples — o componente que renderiza um botão não precisa saber calcular a matemática de um scroll.

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| [React](https://react.dev/) | 18.3.1 | Camada de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Tipagem estrita e contratos de interface |
| [Vite](https://vitejs.dev/) | 5.4.19 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utilitários de estilo + Design Tokens |
| [React Router](https://reactrouter.com/) | 6.30.1 | Roteamento SPA |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3.21 | Smooth scroll com física real |
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | — | Primitivos de UI acessíveis |
| [Lucide React](https://lucide.dev/) | 0.462.0 | Iconografia |
| [React Hook Form](https://react-hook-form.com/) | 7.61.1 | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | 3.25.76 | Validação de schema tipada |
| [TanStack Query](https://tanstack.com/query) | 5.83.0 | Estado assíncrono e cache |
| [Sonner](https://sonner.emilkowal.ski/) | 1.7.4 | Notificações toast |
| [Recharts](https://recharts.org/) | 2.15.4 | Gráficos (disponível, não ativo por padrão) |
| [Vitest](https://vitest.dev/) | 3.2.4 | Testes unitários |

> **Gerenciador de pacotes:** [Bun](https://bun.sh/). Os comandos abaixo usam `bun` — substitua por `npm run` se preferir.

---

## Início Rápido

### Pré-requisitos

- [Bun](https://bun.sh/) `>= 1.x` (recomendado) ou Node.js `>= 20.x`

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/CLS-clearlinestrategy/defaultlandingpagepattern.git meu-projeto
cd meu-projeto

# 2. Instale as dependências
bun install

# 3. Inicie o servidor de desenvolvimento
bun dev
```

Acesse `http://localhost:8080`.

### Personalizando em 30 segundos

Todo o conteúdo visível da página vive em **um único arquivo**:

```bash
src/config/siteConfig.ts
```

Edite os dados, salve, e o site atualiza em tempo real. Nenhum componente precisa ser tocado.

---

## Estrutura do Projeto

```
landing-page-template/
│
├── ai/
│   └── BASE-CONTEXT.md           # Contexto de sistema para IAs (Cursor, Copilot, Lovable)
│
├── public/
│   ├── robots.txt
│   └── placeholder.svg
│
├── src/
│   ├── config/
│   │   └── siteConfig.ts         # 🟡 CAMADA DE DADOS — único ponto de verdade do conteúdo
│   │
│   ├── hooks/                    # 🔵 CAMADA DE LÓGICA — inteligência do navegador
│   │   ├── useParallax.ts        # Efeito parallax via requestAnimationFrame
│   │   ├── useScrollReveal.ts    # Animação de entrada via IntersectionObserver
│   │   ├── useHeroVisibility.ts  # Detecta visibilidade do Hero (controla Navbar)
│   │   ├── useSmoothScroll.ts    # Lenis smooth scroll + navegação por âncoras
│   │   ├── use-mobile.tsx        # Detecta viewport mobile (< 768px)
│   │   └── use-toast.ts          # Gerenciamento de estado de toasts
│   │
│   ├── components/
│   │   ├── ui/                   # Primitivos shadcn/ui (não editar diretamente)
│   │   │
│   │   ├── Hero.tsx              # 🔴 Seção hero com parallax em camadas decorativas
│   │   ├── Navbar.tsx            # Navbar responsiva (transparente → glass no scroll)
│   │   ├── Footer.tsx            # Rodapé com redes sociais configuráveis
│   │   ├── ContentBlock.tsx      # Bloco imagem + texto (type: "image")
│   │   ├── VideoContentBlock.tsx # Bloco vídeo + texto (type: "video")
│   │   ├── FeaturesContentBlock.tsx # Grid de features (type: "features")
│   │   ├── ExperiencesGrid.tsx   # Grid de cards de experiências/diferenciais
│   │   ├── ContactForm.tsx       # Formulário com useReducer + Zod + Sonner
│   │   └── NavLink.tsx           # Wrapper tipado do NavLink do React Router
│   │
│   ├── pages/
│   │   ├── Index.tsx             # Orquestrador — monta e ordena todas as seções
│   │   └── NotFound.tsx          # Página 404
│   │
│   ├── lib/
│   │   └── utils.ts              # cn() — merge de classes Tailwind (clsx + tailwind-merge)
│   │
│   ├── test/
│   │   ├── setup.ts              # Configuração do Vitest + Testing Library
│   │   └── example.test.ts       # Exemplo de teste de referência
│   │
│   ├── index.css                 # 🟢 CAMADA DE ESTILO — tokens HSL + glassmorphism + animações
│   ├── App.tsx                   # Providers globais, roteamento e toasters
│   └── main.tsx                  # Entry point da aplicação
│
└── index.html                    # HTML raiz (atualize <title> e meta tags aqui)
```

---

## Arquitetura

O Padrão Ravius impõe **isolamento total de responsabilidades** em quatro camadas. A regra fundamental: nenhuma camada ultrapassa a seguinte.

```
siteConfig.ts ──► Index.tsx ──► <Componente /> ──► useHook()
  (Dados)          (Página)      (Estrutura)        (Lógica)
```

---

### 🟡 Camada de Dados — `src/config/siteConfig.ts`

**O único lugar onde os dados da empresa existem.**

Nenhum componente `.tsx` pode conter texto, URL ou configuração hardcoded. Tudo é injetado via props a partir daqui. Se a interface `SiteConfig` for quebrada, o build falha antes do deploy.

O conteúdo dos blocos de página é modelado como **Discriminated Union** — o TypeScript garante que cada tipo de bloco tenha exatamente os campos que precisa, e que nenhuma variante seja ignorada silenciosamente no `switch` do orquestrador:

```typescript
// src/config/siteConfig.ts

export type ContentBlockConfig =
  | ImageBlockConfig     // type: "image"
  | VideoBlockConfig     // type: "video"
  | FeaturesBlockConfig  // type: "features"

// Bloco de imagem com lista de checkmarks opcional
{
  id: "about",
  type: "image",
  title: "Arquitetura que",
  highlight: "escala",           // palavra renderizada na cor primária
  description: "...",
  imageUrl: "https://...",
  imageAlt: "Dashboard modular",
  imagePosition: "right",        // "left" | "right"
  features: [                    // opcional — lista de checkmarks
    "Configuração centralizada em um único arquivo",
    "Hooks reutilizáveis e testáveis",
  ],
}

// Bloco de vídeo — YouTube, Vimeo ou arquivo mp4 direto
{
  id: "demo-video",
  type: "video",
  title: "Veja em",
  highlight: "ação",
  videoUrl: "https://www.youtube.com/embed/...", // iframe se youtube/vimeo, <video> caso contrário
  posterImage: "https://...",
  videoPosition: "left",
}
```

---

### 🔵 Camada de Lógica — `src/hooks/`

**O sistema nervoso da aplicação.**

Hooks encapsulam toda a inteligência do navegador. A regra é rígida: hooks **não renderizam JSX** e **não carregam dados externos** — apenas calculam estados primitivos (`boolean`, `number`, `ref`) e os devolvem.

#### `useParallax(speed)`

Calcula o offset de translação vertical de um elemento com base na posição do scroll, usando `requestAnimationFrame` com flag de `ticking` para garantir 60fps sem jank. Cancela o `rAF` no cleanup para evitar memory leaks.

```typescript
const { ref, offset } = useParallax(0.06)
// use: style={{ transform: `translateY(${offset}px)` }}
```

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `speed` | `number` | `0.3` | Intensidade do efeito. `0.05` = sutil, `0.3` = médio, `1` = intenso |

#### `useScrollReveal<T>(options?)`

Adiciona as classes `.reveal-hidden` e `.reveal-visible` no elemento via `IntersectionObserver`, disparando a transição CSS de entrada definida em `index.css` (`opacity + translateY`, 0.8s com curva de mola `cubic-bezier(0.16, 1, 0.3, 1)`).

```typescript
const ref = useScrollReveal<HTMLDivElement>({
  threshold: 0.15,                   // padrão — % do elemento visível para disparar
  rootMargin: "0px 0px -50px 0px",  // padrão — dispara 50px antes de entrar na tela
  once: true,                        // padrão — anima apenas na primeira vez
})
```

#### `useHeroVisibility(threshold?)`

Monitora se a seção Hero está visível no viewport. O resultado controla o estilo do `Navbar` — transparente quando o hero está visível, `glass-strong` quando o usuário scrolla para baixo.

```typescript
const { heroRef, isHeroVisible } = useHeroVisibility(0.3)
// isHeroVisible: true enquanto 30% do hero estiver na tela
```

#### `useSmoothScroll()`

Inicializa o [Lenis](https://lenis.darkroom.engineering/) com `duration: 1.2` e `smoothWheel: true`. Intercepta automaticamente cliques em qualquer `<a href="#ancora">` da página e executa o scroll suave com offset de `-80px` (compensação da altura do Navbar fixo). Retorna `lenisRef` para controle externo.

```typescript
// src/pages/Index.tsx — chamado uma única vez no topo da página
useSmoothScroll()
```

#### `useHeroVisibility(threshold?)`

```typescript
// src/hooks/useHeroVisibility.ts — threshold padrão: 0.3
const { heroRef, isHeroVisible } = useHeroVisibility()
```

---

### 🟢 Camada de Estilo — `src/index.css`

**A identidade visual centralizada.**

Cores, fontes e arredondamentos são definidos como **variáveis CSS no formato HSL** no `:root`. Para trocar a paleta de um cliente, altere `--primary` — o site inteiro se re-pinta. As fontes `Outfit` (headings) e `Inter` (body) são carregadas via `@import` do Google Fonts.

```css
/* src/index.css — tokens principais */

:root {
  --background:         0 0% 4%;      /* fundo da página */
  --foreground:         0 0% 95%;     /* texto principal */
  --primary:            145 65% 52%;  /* verde Ravius — troque aqui */
  --primary-foreground: 0 0% 4%;
  --secondary:          220 14% 14%;
  --muted:              220 10% 12%;
  --muted-foreground:   220 10% 55%;
  --border:             220 10% 16%;
  --radius:             0.75rem;

  --font-heading: 'Outfit', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

#### Sistema Glassmorphism

Três classes globais prontas para uso. **Não escreva `backdrop-filter` inline nos componentes** — use sempre uma dessas classes para garantir consistência visual:

| Classe | Opacidade do fundo | Blur | Uso recomendado |
|---|---|---|---|
| `.glass-subtle` | 3% | 12px | Cards, painéis, fundos de seção |
| `.glass-strong` | 7% | 24px | Navbar após scroll, formulários, modais |
| `.glass-glow` | 5% (cor primária) | 20px | Badges e elementos com brilho verde |

#### Animações de Scroll Reveal

As classes abaixo são gerenciadas pelo hook `useScrollReveal`. Não as aplique manualmente.

```css
.reveal-hidden  { opacity: 0; transform: translateY(30px); transition: ... 0.8s cubic-bezier(0.16,1,0.3,1) }
.reveal-visible { opacity: 1; transform: translateY(0) }
```

---

### 🔴 Camada de Estrutura — `src/components/` e `src/pages/`

**O esqueleto que monta as peças.**

Componentes são "burros": recebem dados via props, aplicam estilos via Tailwind e delegam lógica para os hooks. Não fazem fetch, não mutam estado global e não calculam animações diretamente.

```tsx
// src/components/ContentBlock.tsx — componente correto

interface ContentBlockProps {
  data: ImageBlockConfig  // tipo vem do siteConfig, nunca redefinido aqui
}

const ContentBlock = ({ data }: ContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>() // delega lógica
  const isLeft = data.imagePosition === "left"

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div
        ref={containerRef}
        className={`container mx-auto px-6 flex flex-col ${
          isLeft ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-12 md:gap-16`}
      >
        {/* renderiza dados recebidos — não os gera */}
      </div>
    </section>
  )
}
```

#### `Index.tsx` — O Orquestrador

A página principal importa o `siteConfig`, itera os blocos e despacha cada um para o componente correto. É o único lugar onde a composição e a ordem das seções são decididas.

```tsx
// src/pages/Index.tsx

const renderBlock = (block: ContentBlockConfig) => {
  switch (block.type) {
    case "image":    return <ContentBlock         key={block.id} data={block} />
    case "video":    return <VideoContentBlock    key={block.id} data={block} />
    case "features": return <FeaturesContentBlock key={block.id} data={block} />
  }
}

const Index = () => {
  useSmoothScroll()
  const { heroRef, isHeroVisible } = useHeroVisibility()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isHeroVisible={isHeroVisible} />
      <div ref={heroRef as React.RefObject<HTMLDivElement>}>
        <Hero />
      </div>
      {siteConfig.contentBlocks.map(renderBlock)}
      <ExperiencesGrid />
      <ContactForm />
      <Footer />
    </div>
  )
}
```

---

## Personalizando o Conteúdo

### Textos, imagens e links

Edite `src/config/siteConfig.ts`. O TypeScript avisará em build se algum campo obrigatório estiver ausente.

### Paleta de cores

Altere a variável `--primary` em `src/index.css`. Todo o site atualiza em cascata:

```css
--primary: 210 100% 50%;  /* azul */
--primary: 262 83% 58%;   /* roxo */
--primary: 145 65% 52%;   /* verde (padrão Ravius) */
```

### Tipografia

Substitua `Outfit` e `Inter` no `@import` do Google Fonts no topo de `index.css` e atualize as variáveis `--font-heading` e `--font-body`.

### Meta tags e SEO

Abra `index.html` e edite `<title>`, `<meta name="description">` e as tags `og:*` e `twitter:*`.

### Ícones

O mapeamento de string → componente Lucide está nos arquivos `ExperiencesGrid.tsx` e `FeaturesContentBlock.tsx`. Para adicionar novos ícones, importe-os do `lucide-react` e adicione ao `iconMap` local do componente:

```typescript
import { Database, CreditCard } from "lucide-react"

const iconMap = {
  ...,
  Database,
  CreditCard,
}
```

Depois referencie-os pelo nome string no `siteConfig.ts`.

---

## Expandindo o Template

### Adicionando um Novo Tipo de Bloco de Conteúdo

Siga esta ordem para não quebrar o isolamento de camadas.

**1. Declare a interface e expanda a union em `siteConfig.ts`:**

```typescript
export interface FAQBlockConfig extends BaseBlock {
  type: "faq"
  questions: Array<{ q: string; a: string }>
}

export type ContentBlockConfig =
  | ImageBlockConfig
  | VideoBlockConfig
  | FeaturesBlockConfig
  | FAQBlockConfig  // ← novo
```

**2. Adicione os dados no array `contentBlocks`:**

```typescript
{
  id: "faq",
  type: "faq",
  title: "Perguntas",
  highlight: "frequentes",
  questions: [{ q: "Como funciona?", a: "..." }],
}
```

**3. Crie o componente herdando o padrão dos irmãos:**

```tsx
// src/components/FAQContentBlock.tsx

import { FAQBlockConfig } from "@/config/siteConfig"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const FAQContentBlock = ({ data }: { data: FAQBlockConfig }) => {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-6">
        <h2 className="text-3xl font-bold">
          {data.title} <span className="text-primary">{data.highlight}</span>
        </h2>
        {/* ... */}
      </div>
    </section>
  )
}

export default FAQContentBlock
```

**4. Registre no `switch` do `Index.tsx`:**

```tsx
case "faq": return <FAQContentBlock key={block.id} data={block} />
```

> O TypeScript emitirá um erro de tipo se o novo `case` for esquecido no `switch`, graças à Discriminated Union.

### Adicionando um Novo Hook Global

1. Crie `src/hooks/useNomeDoHook.ts`
2. Garanta que o hook **não renderiza JSX** e retorna apenas estados primitivos ou refs
3. Documente-o na tabela de hooks da seção [Camada de Lógica](#-camada-de-lógica--srchooks)
4. Se alterar o comportamento global da aplicação, atualize também `ai/BASE-CONTEXT.md`

---

## Convenções

### Regras de camada

| ✅ Faça | ❌ Não faça |
|---|---|
| Todo texto e URL vêm do `siteConfig.ts` | Hardcodar strings em qualquer `.tsx` |
| Lógica de DOM e scroll ficam em hooks | `useEffect` com `document.querySelector` em componentes |
| Use as classes glassmorphism globais | Escrever `backdrop-filter` inline em componentes |
| Props tipadas a partir do `siteConfig.ts` | Redefinir interfaces que já existem na camada de dados |
| `cancelAnimationFrame` no cleanup de hooks | Loops de `rAF` sem limpeza no unmount |
| "Quick fix" que introduz texto hardcoded? Avise o time antes | Aceitar dívida técnica silenciosamente |

### Critério de aprovação em PRs

> *"Esta mudança quebra o isolamento de camadas do Padrão Ravius?"*

Se a resposta for **sim**, o código deve ser refatorado antes de ser aprovado.

### Integração com IAs

O arquivo `ai/BASE-CONTEXT.md` contém o contexto de sistema para Cursor, Copilot e Lovable. **Sempre que um novo padrão global for introduzido** (novo hook, novo tipo de bloco, nova classe utilitária), atualize esse arquivo junto com este README — os dois documentos precisam estar em sincronia para que as IAs gerem código consistente com a arquitetura.

---

## Scripts

```bash
bun dev           # Servidor de desenvolvimento — http://localhost:5173
bun build         # Build de produção (output: /dist)
bun preview       # Pré-visualização do build gerado
bun lint          # ESLint em todo o projeto
bun test          # Vitest em modo watch
bun test --run    # Vitest single-run (para CI)
```

---

## Licença

Distribuído sob a licença Apache License Version 2.0. Veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">

<br />

*Construa com a fluidez do design. Escale com o rigor da engenharia.*

<br />

**Ravius** · [ravius.dev](https://ravius.dev)

</div>
