import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CareerExplorer from "@/components/home/CareerExplorer";
import RoadmapPreview from "@/components/home/RoadmapPreview";
import AiAssistant from "@/components/home/AiAssistant";
import PersonalityTest from "@/components/home/PersonalityTest";
import Resources from "@/components/home/Resources";
import Testimonials from "@/components/home/Testimonials";
import Cta from "@/components/home/Cta";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <CareerExplorer />
      <RoadmapPreview />
      <AiAssistant />
      <PersonalityTest />
      <Resources />
      <Testimonials />
      <Cta />
    </main>
  );
};

export default Home;
