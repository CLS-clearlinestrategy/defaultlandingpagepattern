import { StatsBlockConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import ParallaxLayer from "@/components/core/ParallaxLayer";

interface StatsContentBlockProps {
  data: StatsBlockConfig;
}

const StatsContentBlock = ({ data }: StatsContentBlockProps) => {
  return (
    <section id={data.id} className="relative py-20 md:py-28 overflow-hidden">
      {/* Decorative parallax elements */}
      <ParallaxLayer speed={-0.1} className="absolute top-[20%] right-[10%] pointer-events-none select-none">
        <div className="w-80 h-80 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.2} className="absolute bottom-[10%] left-[5%] pointer-events-none select-none">
        <div className="w-64 h-64 rounded-full bg-secondary/8 blur-3xl" aria-hidden="true" />
      </ParallaxLayer>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <RevealBlock className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {data.title}{" "}
            {data.highlight && (
              <span className="text-primary">{data.highlight}</span>
            )}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.description}
            </p>
          )}
        </RevealBlock>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {data.stats.map((stat, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="glass-subtle rounded-2xl p-6 text-center hover:glass-strong transition-all duration-500">
                <span className="block text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsContentBlock;
