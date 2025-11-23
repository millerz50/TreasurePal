import AgencySection from "@/components/Agent/AgencySection";
import BecomeAgentHero from "@/components/Agent/BecomeAgentHero";
import BlogSection from "@/components/landing/Blog";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar/ssrWrapperNav/Navbar";
import PropertyList from "@/components/property/PropertyList";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        <Hero />
        <PropertyList />
        <BlogSection />
        <AgencySection />
        <BecomeAgentHero />
      </main>
    </div>
  );
}
