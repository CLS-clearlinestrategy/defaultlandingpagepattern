import { siteConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Rocket, Palette, Code2, BarChart3, Globe, Lock,
  Zap, Layers, Shield, Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Palette, Code2, BarChart3, Globe, Lock,
  Zap, Layers, Shield, Sparkles,
};

const ExperiencesGrid = () => {
  const { experiences } = siteConfig;
  const titleRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experiences" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            {experiences.title}{" "}
            <span className="text-primary">{experiences.subtitle}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.cards.map((card, i) => {
            const Icon = iconMap[card.icon];
            return <ExperienceCardItem key={i} card={card} Icon={Icon} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
};

interface CardItemProps {
  card: (typeof siteConfig.experiences.cards)[number];
  Icon?: React.ComponentType<{ className?: string }>;
  index: number;
}

const ExperienceCardItem = ({ card, Icon, index }: CardItemProps) => {
  const ref = useScrollReveal<HTMLDivElement>({
    rootMargin: `0px 0px -${30 + index * 10}px 0px`,
  });

  return (
    <div
      ref={ref}
      className="group relative glass-subtle rounded-2xl p-6 hover:glass-strong transition-all duration-500 cursor-default"
    >
      {/* Tag */}
      {card.tag && (
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-semibold text-primary/60">
          {card.tag}
        </span>
      )}

      {/* Icon */}
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {card.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {card.description}
      </p>

      {/* Bottom glow on hover */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ExperiencesGrid;
