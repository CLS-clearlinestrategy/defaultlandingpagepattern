import { TestimonialsBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ParallaxLayer from "./ParallaxLayer";

interface TestimonialsContentBlockProps {
  data: TestimonialsBlockConfig;
}

interface TestimonialCardProps {
  testimonial: TestimonialsBlockConfig["testimonials"][number];
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="relative glass-strong rounded-2xl p-6 flex flex-col gap-5 transition-transform hover:-translate-y-1 duration-300 overflow-hidden">
      {/* Decorative quote mark with parallax */}
      <ParallaxLayer speed={0.05} className="absolute -top-2 -left-1 pointer-events-none select-none">
        <span
          className="text-[80px] leading-none font-serif text-primary/8"
          aria-hidden="true"
        >
          "
        </span>
      </ParallaxLayer>

      {/* Quote */}
      <p className="relative z-10 text-foreground/90 leading-relaxed flex-1 italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-white/5">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsContentBlock = ({ data }: TestimonialsContentBlockProps) => {
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsContentBlock;
