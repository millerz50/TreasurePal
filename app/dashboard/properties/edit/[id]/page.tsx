"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { account, storage } from "@/lib/appwrite";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";

/* ======================================================
   Helpers (same logic as PropertyCard)
====================================================== */

type ImageValue = string | { $id: string } | null | undefined;

function resolveFileId(file: ImageValue): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  if (typeof file === "object" && "$id" in file) return file.$id;
  return null;
}

function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) return "/default-property.jpg";

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !bucketId || !projectId) {
    return "/default-property.jpg";
  }

  const base = endpoint.endsWith("/v1")
    ? endpoint
    : `${endpoint.replace(/\/$/, "")}/v1`;

  return `${base}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

/* ======================================================
   Types
====================================================== */

type Property = {
  $id: string;
  title: string;
  description: string;
  price: number | string;
  type: string;
  subType: string;
  status: string | null;
  property_status: string;
  location: string;
  address: string;
  rooms: number;
  country: string;

  frontElevation?: ImageValue;
  southView?: ImageValue;
  westView?: ImageValue;
  eastView?: ImageValue;
  floorPlan?: ImageValue;
};

/* ======================================================
   Image keys (STRICT)
====================================================== */

type ImageField =
  | "frontElevation"
  | "southView"
  | "westView"
  | "eastView"
  | "floorPlan";

const IMAGE_FIELDS: ImageField[] = [
  "frontElevation",
  "southView",
  "westView",
  "eastView",
  "floorPlan",
];

/* ======================================================
   Component
====================================================== */

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
  const API_BASE = `${API_BASE_URL}/api/${API_VERSION}`;

  /* =========================
     Fetch property
  ========================= */

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { jwt } = await account.createJWT();

        const res = await fetch(`${API_BASE}/properties/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        if (!res.ok) throw new Error("Failed to fetch property");

        setProperty(await res.json());
      } catch (err: any) {
        setError(err.message || "Fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, API_BASE]);

  /* =========================
     Handlers
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!property) return;
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageUpload = async (field: ImageField, file: File) => {
    if (!property) return;

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
    const uploaded = await storage.createFile(bucketId, "unique()", file);

    setProperty({
      ...property,
      [field]: uploaded.$id,
    });
  };

  const handleSave = async () => {
    if (!property) return;

    setSaving(true);
    setError(null);

    try {
      const { jwt } = await account.createJWT();

      const payload = {
        title: property.title,
        description: property.description,
        price: Number(property.price),
        type: property.type,
        subType: property.subType,
        status: property.status,
        property_status: property.property_status,
        location: property.location,
        address: property.address,
        rooms: Number(property.rooms),
        country: property.country,

        frontElevation: resolveFileId(property.frontElevation),
        southView: resolveFileId(property.southView),
        westView: resolveFileId(property.westView),
        eastView: resolveFileId(property.eastView),
        floorPlan: resolveFileId(property.floorPlan),
      };

      const res = await fetch(`${API_BASE}/properties/${property.$id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     Render
  ========================= */

  if (loading) return <div className="p-6 text-center">Loading…</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!property) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Listing</h1>
        <p className="text-sm text-muted-foreground">
          Update your property details
        </p>
      </div>

      <Separator />

      {/* Text fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input name="title" value={property.title} onChange={handleChange} />
        <Input name="price" value={property.price} onChange={handleChange} />
        <Input name="type" value={property.type} onChange={handleChange} />
        <Input
          name="subType"
          value={property.subType}
          onChange={handleChange}
        />
        <Input
          name="property_status"
          value={property.property_status}
          onChange={handleChange}
        />
        <Input
          name="status"
          value={property.status ?? ""}
          onChange={handleChange}
        />
        <Input
          name="location"
          value={property.location}
          onChange={handleChange}
        />
        <Input
          name="address"
          value={property.address}
          onChange={handleChange}
        />
        <Input
          name="rooms"
          type="number"
          value={property.rooms}
          onChange={handleChange}
        />
        <Input
          name="country"
          value={property.country}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        value={property.description}
        onChange={handleChange}
        className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
      />

      {/* Images */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {IMAGE_FIELDS.map((field) => {
          const fileId = resolveFileId(property[field]);
          const preview = getAppwriteFileUrl(fileId);

          return (
            <div key={field} className="space-y-2">
              <img
                src={preview}
                className="h-40 w-full rounded-md object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/default-property.jpg";
                }}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(field, e.target.files[0])
                }
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
