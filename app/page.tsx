import BlogSection from "@/components/landing/Blog";
import FaqFull from "@/components/landing/FaqFull"; // ← import the full FAQ component
import Footer from "@/components/landing/footer/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar/ssrWrapperNav/Navbar";
import PropertyList from "@/components/property/PropertyList";
import AgencySection from "@/components/user/AgencySection";
import JoinHero from "@/components/user/JoinHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        <Hero />
        <PropertyList />

        <BlogSection />

        {/* FAQ integrated here */}
        <FaqFull includeSchema={true} storageKey="faq.home.open" />

        <AgencySection />
        <JoinHero />
      </main>
      <Footer />
    </div>
  );
}
