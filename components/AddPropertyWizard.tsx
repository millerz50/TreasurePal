"use client";

import MapPicker from "@/components/dashboard/MapPicker";
import LocationSearch from "@/components/property/LocationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { AMENITIES } from "@/lib/amenities";
import { useState } from "react";

// ---------- TYPES ----------
type Step = 1 | 2 | 3 | 4;

interface FormData {
  title: string;
  price: string;
  location: string;
  address: string;
  rooms: number;
  description: string;
  type: string;
  status: string;
  country: string;
  amenities: string[];
  locationLat: number;
  locationLng: number;
  agentId: string;
}

// ---------- MAIN COMPONENT ----------
export default function AddPropertyWizard() {
  const { agent } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    location: "",
    address: "",
    rooms: 0,
    description: "",
    type: "House",
    status: "Available",
    country: "Zimbabwe",
    amenities: [],
    locationLat: -17.9306,
    locationLng: 31.3306,
    agentId: "", // ✅ initialized safely
  });

  // ✅ Update agentId once agent is available

  const PROPERTY_TYPES = Object.keys(AMENITIES);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rooms" ? Number(value) : value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const validateStep1 = (): string | null => {
    if (!formData.title.trim()) return "Title is required.";
    if (!formData.price.trim()) return "Price is required.";
    if (isNaN(Number(formData.price))) return "Price must be a number.";
    if (!formData.location.trim()) return "Location is required.";
    if (!formData.address.trim()) return "Address is required.";
    return null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/properties/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit property");
      console.log("✅ Property submitted!");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderSteps = () => (
    <ul className="steps steps-horizontal w-full text-sm sm:text-base">
      <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Basic Info</li>
      <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Amenities</li>
      <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Location</li>
      <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Review</li>
    </ul>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-background rounded-xl shadow-md space-y-6">
      {renderSteps()}
      <Separator />

      {step === 1 && (
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <LocationSearch
            onSelect={({ name, lat, lng }) =>
              setFormData((prev) => ({
                ...prev,
                location: name,
                address: name,
                locationLat: lat,
                locationLng: lng,
              }))
            }
          />

          <Input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="rooms"
            placeholder="Rooms"
            value={formData.rooms}
            onChange={handleChange}
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full">
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                const err = validateStep1();
                if (err) return setError(err);
                setError(null);
                setStep(2);
              }}>
              Next
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {AMENITIES[formData.type] &&
            Object.entries(AMENITIES[formData.type]).map(
              ([category, items]) => (
                <div key={category}>
                  <h3 className="font-semibold text-primary">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map(({ name, icon: Icon }) => (
                      <label
                        key={name}
                        className="flex items-center gap-2 border p-2 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(name)}
                          onChange={() => toggleAmenity(name)}
                        />
                        {Icon && <Icon className="w-4 h-4 text-primary" />}
                        {name}
                      </label>
                    ))}
                  </div>
                </div>
              )
            )}

          <Textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="w-full h-64 rounded-lg border overflow-hidden">
            <MapPicker
              coordinates={[formData.locationLat, formData.locationLng]}
              setCoordinates={(coords) =>
                setFormData((prev) => ({
                  ...prev,
                  locationLat: coords[0],
                  locationLng: coords[1],
                }))
              }
              setAddress={(address) =>
                setFormData((prev) => ({
                  ...prev,
                  address,
                }))
              }
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={() => setStep(4)}>Next</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-primary">Review Your Listing</h3>
          <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Property"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
