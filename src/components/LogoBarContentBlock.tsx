import { LogoBarBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface LogoBarContentBlockProps {
  data: LogoBarBlockConfig;
}

const LogoBarContentBlock = ({ data }: LogoBarContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  /* Duplicate the list for seamless infinite scroll */
  const doubled = [...data.logos, ...data.logos];

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

        {/* Marquee */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex items-center gap-12 animate-marquee w-max">
            {doubled.map((logo, i) => (
              <img
                key={i}
                src={logo.logoUrl}
                alt={logo.name}
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBarContentBlock;
