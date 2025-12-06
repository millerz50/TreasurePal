import Seo from "@/components/seo/Seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";

type RawRecord = Record<string, unknown>;
type Job = {
  id: string;
  title: string;
  location?: string;
  type?: string;
  summary?: string;
  slug?: string;
};

function toString(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function parseJob(raw: RawRecord): Job {
  return {
    id: toString(
      raw.id ?? raw._id ?? raw.slug ?? Math.random().toString(36).slice(2)
    ),
    title: toString(raw.title ?? raw.role ?? "Untitled role"),
    location: toString(raw.location ?? raw.city ?? "Zimbabwe"),
    type: toString(raw.type ?? raw.employmentType ?? "Not specified"),
    summary: toString(raw.summary ?? raw.description ?? ""),
    slug: raw.slug ? toString(raw.slug) : undefined,
  };
}

async function fetchCareers(): Promise<Job[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Careers API returned non-OK:", res.status);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((j: RawRecord) => parseJob(j));
  } catch (err) {
    console.error("Failed to fetch careers:", err);
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await fetchCareers();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Careers at ${SITE_NAME}`,
    url: `${SITE_URL}/careers`,
    description: `Explore open roles at ${SITE_NAME}. We hire for product, engineering, operations, and local field positions across Zimbabwe.`,
    hasPart: jobs.map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      description: job.summary,
      employmentType: job.type,
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
          addressCountry: "ZW",
        },
      },
      hiringOrganization: {
        "@type": "Organization",
        name: SITE_NAME,
        sameAs: SITE_URL,
      },
      url: job.slug
        ? `${SITE_URL}/careers/${job.slug}`
        : `${SITE_URL}/careers#${job.id}`,
    })),
  };

  return (
    <>
      <Seo
        title={`Careers at ${SITE_NAME}`}
        description={`Join ${SITE_NAME}. See open roles, benefits, and how we hire locally in Zimbabwe.`}
        url={`${SITE_URL}/careers`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-base-200 text-base-content py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100">
              Careers
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Build with us. We hire for product, engineering, operations and
              local field roles across Zimbabwe.
            </p>
          </header>

          <section className="grid gap-4">
            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Why work at {SITE_NAME}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Competitive local compensation and commission plans</li>
                <li>Remote-friendly roles and local hubs in Harare</li>
                <li>Learning budget and mentorship</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                Open roles
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                We update openings frequently. If you do not see a match, send a
                short note to{" "}
                <a
                  href="mailto:careers@treasurepal.example"
                  className="underline text-blue-600 dark:text-blue-400">
                  careers@treasurepal.example
                </a>
                .
              </p>

              <div className="mt-4 grid gap-3">
                {jobs.length === 0 ? (
                  <div className="p-4 rounded-md border border-dashed border-gray-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300">
                    No openings at this time. Check back soon or send your CV to{" "}
                    <a
                      href="mailto:careers@treasurepal.example"
                      className="underline text-blue-600 dark:text-blue-400">
                      careers@treasurepal.example
                    </a>
                    .
                  </div>
                ) : (
                  jobs.map((job) => (
                    <article
                      key={job.id}
                      className="p-3 rounded-md border border-dashed border-gray-200 dark:border-slate-700">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {job.location} · {job.type}
                          </p>
                          {job.summary ? (
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                              {job.summary}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex-shrink-0 self-start">
                          {job.slug ? (
                            <Link
                              href={`/careers/${job.slug}`}
                              className="text-sm text-blue-600 dark:text-blue-400 underline">
                              View
                            </Link>
                          ) : (
                            <a
                              href={`mailto:careers@treasurepal.example?subject=Application%20for%20${encodeURIComponent(
                                job.title
                              )}`}
                              className="text-sm text-blue-600 dark:text-blue-400 underline">
                              Apply
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
