**Objetivo:** Garantir que o hook base retorna o estado `isVisible` limpo usando o `IntersectionObserver`.

```text
Atuando como Senior Front-end Architect, vamos refatorar nosso sistema de animação de entrada (Scroll Reveal) para utilizar uma abordagem baseada em componentes, alinhada com as refatorações recentes.

1. Atualize o arquivo `src/hooks/useScrollReveal.ts`.
- O hook agora deve receber um `threshold` (com padrão 0.15).
- Deve utilizar o `IntersectionObserver` para alterar um estado interno `isVisible` para `true` quando o elemento entrar na tela, e então dar `unobserve` (para animar apenas uma vez).
- O hook deve retornar exatamente o objeto: `{ ref, isVisible }`.
```
**Objetivo:** Criar o componente estrutural que encapsula o hook e aplica as transições CSS fluidas.

```text
Atuando como Senior Front-end Architect, vamos criar o componente wrapper que vai gerir a lógica visual do scroll reveal, mantendo nossos componentes de seção puros.

1. Crie o arquivo `src/components/core/RevealBlock.tsx` (garanta que está na pasta `core/`).
- Importe o hook `useScrollReveal` atualizado.
- O componente deve aceitar as props: `children` (ReactNode), `className` (string, opcional) e `delay` (number, padrão 0).
- Chame o hook: `const { ref, isVisible } = useScrollReveal();`
- Renderize uma `<div>` que receba a `ref`.
- Na prop `className`, combine as classes passadas com transições do Tailwind: `transition-all duration-1000 ease-out ${className}`.
- Na prop `style` (inline), aplique o dinamismo visual:
  - `opacity: isVisible ? 1 : 0`
  - `transform: isVisible ? "translateY(0)" : "translateY(40px)"`
  - `transitionDelay: \`${delay}ms\``
```
**Objetivo:** Substituir as chamadas manuais do hook dentro das seções da landing page pelo novo componente `<RevealBlock>`.
```text
Atuando como Senior Front-end Architect, agora vamos aplicar o novo `<RevealBlock>` nas nossas seções, limpando o excesso de hooks nos arquivos de layout.

1. Vá para os componentes na pasta `src/components/sections/` que atualmente usam o hook `useScrollReveal` manualmente (como `FeaturesContentBlock.tsx`, `ExperiencesGrid.tsx`, `FAQContentBlock.tsx`, etc.).
2. Para cada um desses arquivos:
- Remova a importação do hook `useScrollReveal` e as declarações como `const ref = useScrollReveal()`.
- Importe o novo componente: `import { RevealBlock } from "@/components/core/RevealBlock";`
- Envolva os elementos que precisam ser animados com o `<RevealBlock>`.
- Caso esteja renderizando listas (usando `.map`), como nos cards de *Features* ou *Equipe*, envolva o card com o `<RevealBlock delay={index * 100}>` para criar aquele efeito elegante de cascata/stagger.
- Remova quaisquer classes antigas relacionadas a `reveal-hidden` ou `reveal-visible` caso existam nos `className` originais, pois o `RevealBlock` já cuida da opacidade e translação.
```
