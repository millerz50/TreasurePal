import AgencySection from "@/components/user/AgencySection";

export const metadata = {
  title: "Our Agents | TreasurePal",
  description:
    "Meet verified real estate agents on TreasurePal. Trusted professionals ready to help you buy, sell, or rent property.",
};

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Meet Our Property Agents
          </h1>
          <p className="mt-4 text-sm md:text-base text-blue-100 max-w-2xl mx-auto">
            Discover verified, experienced real estate professionals ready to
            guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <AgencySection />

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-slate-800">
            Want to become an agent?
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Join our platform and connect with thousands of property seekers.
          </p>

          <a
            href="/agents/apply"
            className="inline-block mt-6 px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Apply as Agent
          </a>
        </div>
      </section>
    </main>
  );
}
