import { TeamBlockConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TeamContentBlockProps {
  data: TeamBlockConfig;
}

const TeamContentBlock = ({ data }: TeamContentBlockProps) => {
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

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {data.members.map((member, i) => (
            <div
              key={i}
              className="group glass-subtle rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamContentBlock;
