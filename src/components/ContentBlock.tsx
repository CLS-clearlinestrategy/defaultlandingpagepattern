import { ImageBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check } from "lucide-react";

interface ContentBlockProps {
  data: ImageBlockConfig;
}

const ContentBlock = ({ data }: ContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const isLeft = data.imagePosition === "left";

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div
        ref={containerRef}
        className={`container mx-auto px-6 flex flex-col ${
          isLeft ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-12 md:gap-16`}
      >
        {/* Image */}
        <div className="flex-1 w-full">
          <div className="relative rounded-2xl overflow-hidden glass-subtle p-1">
            <img
              src={data.imageUrl}
              alt={data.imageAlt}
              className="w-full h-auto rounded-xl object-cover aspect-[3/2]"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
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

          {data.features && data.features.length > 0 && (
            <ul className="space-y-3 pt-2">
              {data.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm text-muted-foreground">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;
