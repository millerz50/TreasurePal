// components/InsightsSection.tsx
"use client";

const posts = [
  {
    title: "Exploring Bindura’s Hidden Gems",
    date: "September 20, 2025",
    summary:
      "Discover the most underrated spots in Bindura—from scenic trails to local cafés.",
  },
  {
    title: "How Tech Is Transforming Zimbabwean Real Estate",
    date: "September 24, 2025",
    summary:
      "A look at how platforms like TreasurePal are reshaping property discovery.",
  },
  {
    title: "Designing for Mobile in Zimbabwe",
    date: "September 25, 2025",
    summary:
      "Best practices for mobile-first UI in low-bandwidth environments.",
  },
  {
    title: "Building SEO-Optimized Platforms for Local Businesses",
    date: "September 26, 2025",
    summary:
      "Strategies for visibility and conversion in Zimbabwe’s digital economy.",
  },
  {
    title: "Modular UI Systems for Scalable Dashboards",
    date: "September 27, 2025",
    summary:
      "How Netspace builds reusable, scalable UI for property platforms.",
  },
];

export default function InsightsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">Netspace Insights</h2>
        <p className="text-sm text-muted-foreground">
          Learn from our journey building Zimbabwe’s most trusted tech platforms
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-base-100 border border-base-300 rounded-lg p-4 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-primary">{post.title}</h3>
            <p className="text-xs text-muted-foreground">{post.date}</p>
            <p className="text-sm text-base-content/70">{post.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
