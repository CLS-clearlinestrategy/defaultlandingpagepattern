import { VideoBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

interface VideoContentBlockProps {
  data: VideoBlockConfig;
}

const VideoContentBlock = ({ data }: VideoContentBlockProps) => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { ref: parallaxRef, offset } = useParallax(0.06);
  const isLeft = (data.videoPosition ?? "left") === "left";

  const isEmbed = data.videoUrl.includes("youtube") || data.videoUrl.includes("vimeo");

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div
        ref={containerRef}
        className={`container mx-auto px-6 flex flex-col ${
          isLeft ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-12 md:gap-16`}
      >
        {/* Video */}
        <div className="flex-1 w-full" ref={parallaxRef} style={{ transform: `translateY(${offset}px)` }}>
          <div className="relative rounded-2xl overflow-hidden glass-subtle p-1">
            {isEmbed ? (
              <iframe
                src={data.videoUrl}
                title={data.title}
                className="w-full aspect-video rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <video
                src={data.videoUrl}
                poster={data.posterImage}
                controls
                className="w-full rounded-xl aspect-video object-cover"
                preload="metadata"
              />
            )}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 pointer-events-none" />
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
        </div>
      </div>
    </section>
  );
};

export default VideoContentBlock;
