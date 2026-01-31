import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import PropertyCard from "@/components/property/PropertyCard";
import { mapProperty } from "@/lib/propertyMapper";

/* =========================
   ISR
========================= */
export const revalidate = 60;

/* =========================
   Types
========================= */
type Params = {
  params: {
    id: string;
  };
};

/* =========================
   Helpers
========================= */
type AppwriteFile = string | { $id: string };

function resolveFileId(file?: AppwriteFile | null): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  return file.$id ?? null;
}

function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) return `${SITE_URL}/default-property.jpg`;

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !bucketId || !projectId) {
    return `${SITE_URL}/default-property.jpg`;
  }

  const base = endpoint.endsWith("/v1")
    ? endpoint
    : `${endpoint.replace(/\/$/, "")}/v1`;

  return `${base}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

function getPrimaryImageUrl(images: {
  frontElevation?: AppwriteFile;
  southView?: AppwriteFile;
  westView?: AppwriteFile;
  eastView?: AppwriteFile;
  floorPlan?: AppwriteFile;
}) {
  const file =
    images.frontElevation ??
    images.southView ??
    images.westView ??
    images.eastView ??
    images.floorPlan ??
    null;

  return getAppwriteFileUrl(resolveFileId(file));
}

/* =========================
   Metadata (SEO / Social)
========================= */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLV2}/api/v2/properties/${params.id}`,
  );

  const raw = await res.json();
  const property = mapProperty(raw);

  const imageUrl = getPrimaryImageUrl(property.images);

  return {
    title: `${property.title} • ${SITE_NAME}`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      url: `${SITE_URL}/properties/${params.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description,
      images: [imageUrl],
    },
  };
}

/* =========================
   Page
========================= */
export default async function PropertyDetailPage({ params }: Params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLV2}/api/v2/properties/${params.id}`,
    { cache: "force-cache" },
  );

  const raw = await res.json();
  const property = mapProperty(raw);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PropertyCard property={property} />
    </div>
  );
}
