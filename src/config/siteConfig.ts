export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  parallaxLayers: ParallaxLayer[];
}

export interface ParallaxLayer {
  speed: number;
  content: string;
  className?: string;
}

/* ── Content Block Discriminated Union ── */

interface BaseBlock {
  id: string;
  title: string;
  highlight?: string;
  description?: string;
}

export interface ImageBlockConfig extends BaseBlock {
  type: "image";
  imageUrl: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  features?: string[];
}

export interface VideoBlockConfig extends BaseBlock {
  type: "video";
  videoUrl: string;
  posterImage?: string;
  videoPosition?: "left" | "right";
}

export interface FeatureBlockItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesBlockConfig extends BaseBlock {
  type: "features";
  items: FeatureBlockItem[];
}

export type ContentBlockConfig =
  | ImageBlockConfig
  | VideoBlockConfig
  | FeaturesBlockConfig;

export interface ExperienceCard {
  icon: string;
  title: string;
  description: string;
  tag?: string;
}

export interface ContactFormContent {
  title: string;
  subtitle: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  nav: NavLink[];
  hero: HeroContent;
  features: FeatureItem[];
  contentBlocks: ContentBlockConfig[];
  experiences: {
    title: string;
    subtitle: string;
    cards: ExperienceCard[];
  };
  contact: ContactFormContent;
  footer: {
    copyright: string;
    tagline: string;
    socials: SocialLink[];
  };
}

export const siteConfig: SiteConfig = {
  name: "Ravius",
  description: "Plataforma moderna para escalar seu negócio digital.",

  nav: [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Experiências", href: "#experiences" },
    { label: "Contato", href: "#contact" },
  ],

  hero: {
    badge: "Novo — v2.0 disponível",
    title: "Construa experiências",
    highlight: "extraordinárias",
    subtitle:
      "Uma base escalável e modular para criar landing pages de alta performance com animações fluidas e design impecável.",
    ctaPrimary: "Começar agora",
    ctaPrimaryHref: "#experiences",
    ctaSecondary: "Saiba mais",
    ctaSecondaryHref: "#about",
    parallaxLayers: [
      { speed: 0.05, content: "◆", className: "text-primary/10 text-[120px] top-[15%] left-[10%]" },
      { speed: 0.12, content: "○", className: "text-primary/8 text-[80px] top-[60%] right-[15%]" },
      { speed: 0.08, content: "△", className: "text-primary/6 text-[100px] bottom-[20%] left-[70%]" },
    ],
  },

  features: [
    { icon: "Zap", title: "Performance extrema", description: "Otimizado com requestAnimationFrame e lazy loading para 60fps constantes." },
    { icon: "Layers", title: "Modular por design", description: "Hooks isolados, config centralizada e componentes desacoplados." },
    { icon: "Shield", title: "TypeScript estrito", description: "Interfaces tipadas para cada dado, garantindo segurança e previsibilidade." },
    { icon: "Sparkles", title: "Animações sofisticadas", description: "Parallax, scroll reveal e transições suaves com Lenis integrado." },
  ],

  contentBlocks: [
    {
      id: "about",
      type: "image",
      title: "Arquitetura que",
      highlight: "escala",
      description:
        "O Padrão Ravius separa dados, lógica e visual em camadas independentes. Isso significa que você pode trocar o design inteiro sem tocar na lógica de negócio — ou vice-versa.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      imageAlt: "Dashboard de arquitetura modular",
      imagePosition: "right",
      features: [
        "Configuração centralizada em um único arquivo",
        "Hooks reutilizáveis e testáveis",
        "Componentes puros sem side-effects",
      ],
    },
    {
      id: "demo-video",
      type: "video",
      title: "Veja em",
      highlight: "ação",
      description:
        "Assista como o Padrão Ravius acelera a criação de interfaces modernas com scroll suave, parallax e animações baseadas em física real.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      posterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      videoPosition: "left",
    },
    {
      id: "philosophy",
      type: "image",
      title: "Design com",
      highlight: "propósito",
      description:
        "Cada pixel foi pensado para contar uma história. Glassmorphism sutil, tipografia precisa e micro-animações que guiam o olhar sem distrair.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      imageAlt: "Design abstrato com formas geométricas",
      imagePosition: "left",
      features: [
        "Sistema de tokens semânticos em HSL",
        "Glassmorphism com dois níveis de intensidade",
        "Animações baseadas em física real",
      ],
    },
    {
      id: "differentials",
      type: "features",
      title: "Nossos",
      highlight: "diferenciais",
      description:
        "Cada detalhe foi projetado para entregar a melhor experiência possível, do código à interface final.",
      items: [
        { icon: "Zap", title: "Ultra Rápido", description: "Build otimizado com Vite e tree-shaking agressivo para bundles mínimos." },
        { icon: "Palette", title: "Design Tokens", description: "Sistema semântico de cores HSL com suporte nativo a temas." },
        { icon: "Code2", title: "DX Premium", description: "TypeScript estrito, auto-complete rico e zero configuração manual." },
        { icon: "Shield", title: "Segurança First", description: "Validação Zod em todas as entradas e sanitização automática." },
      ],
    },
  ],

  experiences: {
    title: "Experiências que",
    subtitle: "inspiram",
    cards: [
      { icon: "Rocket", title: "Lançamento Rápido", description: "Do conceito ao deploy em horas, não semanas. Estrutura pronta para produção.", tag: "Velocidade" },
      { icon: "Palette", title: "Design System", description: "Tokens, variantes e componentes coesos que mantêm a consistência visual.", tag: "Visual" },
      { icon: "Code2", title: "Developer Experience", description: "TypeScript estrito, hooks isolados e zero dependências desnecessárias.", tag: "DX" },
      { icon: "BarChart3", title: "Performance First", description: "IntersectionObserver, rAF e lazy loading para métricas Core Web Vitals perfeitas.", tag: "Metrics" },
      { icon: "Globe", title: "Pronto para o Mundo", description: "Config centralizada facilita i18n, multi-tema e personalização por cliente.", tag: "Scale" },
      { icon: "Lock", title: "Segurança Integrada", description: "Validação com Zod, sanitização de inputs e boas práticas desde o dia zero.", tag: "Security" },
    ],
  },

  contact: {
    title: "Vamos conversar?",
    subtitle: "Envie sua mensagem e retornaremos em breve.",
    fields: {
      name: { label: "Nome", placeholder: "Seu nome completo" },
      email: { label: "E-mail", placeholder: "seu@email.com" },
      message: { label: "Mensagem", placeholder: "Como podemos ajudar?" },
    },
    submitLabel: "Enviar mensagem",
    successMessage: "Mensagem enviada com sucesso!",
    errorMessage: "Erro ao enviar. Tente novamente.",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Ravius. Todos os direitos reservados.`,
    tagline: "Construído com o Padrão Ravius.",
    socials: [
      { platform: "GitHub", url: "https://github.com", icon: "Github" },
      { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    ],
  },
};
