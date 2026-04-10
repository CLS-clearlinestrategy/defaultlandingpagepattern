import { ProcessBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool,
};

interface ProcessContentBlockProps {
  data: ProcessBlockConfig;
}

const ProcessContentBlock = ({ data }: ProcessContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div ref={containerRef} className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
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

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {data.steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step card */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-subtle rounded-2xl p-6 hover:glass-strong transition-all duration-500">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_hsla(var(--primary),0.15)]">
                    {Icon ? (
                      <Icon className="w-5 h-5 text-primary" />
                    ) : (
                      <span className="text-sm font-bold text-primary">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Spacer for the opposite side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessContentBlock;
