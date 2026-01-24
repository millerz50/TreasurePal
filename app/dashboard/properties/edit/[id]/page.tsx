"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

/* =========================
   TYPES
========================= */
type Property = {
  $id: string;
  title: string;
  price: number | string;
  location: string;
  address: string;
  rooms: number;
  description: string;
  type: string;
  status: string;
  country: string;
};

/* =========================
   COMPONENT
========================= */
export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     API CONFIG
  ========================= */
  const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
  const API_BASE = `${API_BASE_URL}/api/${API_VERSION}`;

  /* =========================
     FETCH PROPERTY
  ========================= */
  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      setError(null);

      try {
        // 🔐 ALWAYS generate fresh JWT
        const { jwt } = await account.createJWT();

        const res = await fetch(`${API_BASE}/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await res.json();
        setProperty(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, API_BASE]);

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!property) return;

    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  /* =========================
     SAVE UPDATE
  ========================= */
  const handleSave = async () => {
    if (!property) return;

    setSaving(true);
    setError(null);

    try {
      // 🔐 fresh JWT again
      const { jwt } = await account.createJWT();

      const res = await fetch(`${API_BASE}/properties/${property.$id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(property),
      });

      if (!res.ok) {
        throw new Error("Failed to update property");
      }

      router.push("/dashboard/properties");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     RENDER
  ========================= */
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-muted-foreground">
        Loading property…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Listing</h1>
        <p className="text-sm text-muted-foreground">
          Update your property details
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="title" value={property.title} onChange={handleChange} />
        <Input name="price" value={property.price} onChange={handleChange} />
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
        className="w-full min-h-[120px] rounded-md border px-3 py-2 text-sm"
      />

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
