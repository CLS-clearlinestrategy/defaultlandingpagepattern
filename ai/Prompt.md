
**Objetivo:** Substituir a lógica antiga pela sua nova implementação robusta do `useParallax`, que agora calcula `offset` e `progress` com controle refinado de rAF (requestAnimationFrame).

```text
Atuando como Senior Front-end Architect no ecossistema Ravius, precisamos atualizar nosso sistema de Parallax para uma abordagem baseada em componentes e aceleração de GPU.

1. Atualize o arquivo `src/hooks/useParallax.ts` para que ele reflita exatamente a nova lógica fornecida pelo usuário. O hook agora deve aceitar um `ParallaxConfig` com `speed`, `direction` e `disabled`, e retornar um objeto com `ref`, `offset` e `progress`.
Certifique-se de manter os imports do React (`useEffect`, `useRef`, `useCallback`, `useState`) e lidar com o `requestAnimationFrame` e eventos de `scroll`/`resize` exatamente como especificado na nova versão.
```

**Objetivo:** Criar os componentes `ParallaxLayer` e `ParallaxRevealImage` para encapsular a lógica visual e manter os blocos de conteúdo "limpos".

```text
Atuando como Senior Front-end Architect, vamos criar a infraestrutura de componentes do novo sistema de parallax.

1. Crie o arquivo `src/components/ParallaxLayer.tsx`:
- Importe o hook `useParallax` atualizado.
- O componente deve receber `speed`, `children`, `className` e `disabled`.
- Deve aplicar o estilo inline estrito: `transform: \`translate3d(0, ${offset}px, 0)\`` e `willChange: "transform"` no container que envolve os `children`.

2. Crie o arquivo `src/components/ParallaxRevealImage.tsx`:
- Importe `useRef`, `useEffect`, `useState` do React e o `ParallaxLayer` criado acima.
- Este componente criará um efeito premium com `clipPath` e `scale`.
- Implemente a lógica de cálculo de progresso e manipulação do DOM virtual usando a constante `clipPathString` e `transform: "translateZ(0)"` para forçar a renderização em uma camada separada da GPU.
- O componente renderiza um `div` com máscara e, dentro dele, o `ParallaxLayer` contendo a tag `img` com scale dinâmico.
```

**Objetivo:** Aplicar os novos componentes nas seções recentemente expandidas (Equipe, Processos, Estatísticas) no lugar dos cálculos inline manuais.

```text
Atuando como Senior Front-end Architect, agora vamos aplicar os novos componentes nas seções da nossa Landing Page para garantir movimento fluido sem sujar o JSX com matemática.

1. Em `src/components/TeamContentBlock.tsx` e `src/components/TestimonialsContentBlock.tsx`:
- Se houver imagens de destaque grandes nos membros da equipe, substitua a tag `<img>` padrão pelo nosso novo componente `<ParallaxRevealImage src={membro.photoUrl} speed={0.2} />`. Isso aplicará a máscara dinâmica.
- Se o design usar apenas avatares pequenos, envolva a div do avatar ou do card inteiro com `<ParallaxLayer speed={0.05}>` para dar a sensação de flutuação independente.

2. Em `src/components/ProcessContentBlock.tsx` e `src/components/StatsContentBlock.tsx`:
- Remova as chamadas diretas ao hook `useParallax` caso as tenha adicionado anteriormente e apague os estilos `style={{ transform: ... }}` inline.
- Envolva os elementos geométricos/decorativos de fundo (ex: blurs e esferas `.glass-glow`) com o `<ParallaxLayer speed={0.15}>` (ou valores negativos como `-0.1` para ir contra o scroll).

Garanta que toda estilização visual (cores, bordas, posições absolutas) continue utilizando as classes do Tailwind no `className` passado para esses componentes.
```