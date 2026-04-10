Atuando como Senior Front-end Architect do ecossistema Ravius, precisamos refatorar a estrutura de pastas do nosso front-end para melhorar a escalabilidade e o isolamento arquitetural. A pasta `src/components/` atual está misturando componentes primitivos com seções inteiras de página.

Execute a seguinte refatoração de forma cirúrgica:

1. Criação de Nova Estrutura de Diretórios:
- Crie o diretório `src/sections/` (na raiz do src, FORA de components). Esta pasta abrigará exclusivamente os blocos massivos de conteúdo/layout da página.
- Crie o diretório `src/components/core/`. Esta pasta abrigará nossos componentes reutilizáveis, primitivos e abstrações de lógica visual.
- Crie o diretório `src/components/layout/`. Esta pasta abrigará os elementos estruturais globais.

2. Migração Estrita de Arquivos:
- Mova para `src/sections/`: `Hero.tsx`, `ContentBlock.tsx`, `VideoContentBlock.tsx`, `FeaturesContentBlock.tsx`, `ExperiencesGrid.tsx`, `ContactForm.tsx`, e qualquer outra seção recém-criada (como `FAQContentBlock.tsx`, `TeamContentBlock.tsx`, `LogoBarContentBlock.tsx`, `ProcessContentBlock.tsx`, `StatsContentBlock.tsx`, `TestimonialsContentBlock.tsx`).
- Mova para `src/components/core/`: Componentes como `ParallaxLayer.tsx`, `ParallaxRevealImage.tsx`, `BackgroundGif.tsx`, `RevealBlock.tsx` e `NavLink.tsx`.
- Mova para `src/components/layout/`: `Navbar.tsx` e `Footer.tsx`.
- (A pasta `src/components/ui/` pertencente ao Shadcn deve permanecer intacta).

3. Refatoração de Imports:
- Faça um find & replace cuidadoso em todo o projeto para corrigir os caminhos de importação.
- Preste atenção especial ao arquivo Orquestrador `src/pages/Index.tsx`. Ele agora deve importar os blocos renderizáveis a partir de `@/sections/...` e os elementos estruturais de `@/components/layout/...`.
- Atualize os imports dentro dos próprios arquivos movidos (ex: um arquivo em `src/sections/` que importa algo de `src/components/core/`).

4. Atualização da Meta-Documentação:
- Atualize os arquivos `README.md` e `ai/BASE-CONTEXT.md` na seção que descreve a "Camada de Estrutura".
- Documente explicitamente a nova regra: "Componentes primitivos e abstrações visuais vivem em `src/components/core/`. Blocos de conteúdo orquestrados via siteConfig vivem em `src/sections/`".