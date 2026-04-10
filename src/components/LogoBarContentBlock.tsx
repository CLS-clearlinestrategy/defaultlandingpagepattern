import { LogoBarBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

interface LogoBarContentBlockProps {
  data: LogoBarBlockConfig;
}

const LogoBarContentBlock = ({ data }: LogoBarContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  /* Convert vertical parallax into horizontal scroll-reactive shift */
  const { ref: row1Ref, offset: row1Offset } = useParallax(0.15);
  const { ref: row2Ref, offset: row2Offset } = useParallax(-0.1);

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

        {/* Marquee row 1 — scroll-reactive via parallax X */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            ref={row1Ref}
            className="flex items-center gap-12 animate-marquee w-max"
            style={{ transform: `translateX(${row1Offset * 0.5}px)` }}
          >
            {doubled.map((logo, i) => (
              <img
                key={i}
                src={logo.logoUrl}
                alt={logo.name}
                className="h-10 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Marquee row 2 — counter-direction for visual depth */}
        <div className="relative overflow-hidden mt-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            ref={row2Ref}
            className="flex items-center gap-12 animate-marquee-reverse w-max"
            style={{ transform: `translateX(${row2Offset * 0.5}px)` }}
          >
            {doubled.map((logo, i) => (
              <img
                key={i}
                src={logo.logoUrl}
                alt={logo.name}
                className="h-10 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
