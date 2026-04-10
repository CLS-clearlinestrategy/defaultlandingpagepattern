import { StatsBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StatsContentBlockProps {
  data: StatsBlockConfig;
}

const StatsContentBlock = ({ data }: StatsContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div ref={containerRef} className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
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
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-subtle rounded-2xl p-6 text-center hover:glass-strong transition-all duration-500"
            >
              <span className="block text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsContentBlock;
