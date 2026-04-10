import { siteConfig, ContentBlockConfig } from "@/config/siteConfig";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useHeroVisibility } from "@/hooks/useHeroVisibility";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContentBlock from "@/components/ContentBlock";
import VideoContentBlock from "@/components/VideoContentBlock";
import FeaturesContentBlock from "@/components/FeaturesContentBlock";
import ExperiencesGrid from "@/components/ExperiencesGrid";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const renderBlock = (block: ContentBlockConfig) => {
  switch (block.type) {
    case "image":
      return <ContentBlock key={block.id} data={block} />;
    case "video":
      return <VideoContentBlock key={block.id} data={block} />;
    case "features":
      return <FeaturesContentBlock key={block.id} data={block} />;
  }
};

const Index = () => {
  useSmoothScroll();
  const { heroRef, isHeroVisible } = useHeroVisibility();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isHeroVisible={isHeroVisible} />

      <div ref={heroRef as React.RefObject<HTMLDivElement>}>
        <Hero />
      </div>

      {siteConfig.contentBlocks.map(renderBlock)}

      <ExperiencesGrid />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
