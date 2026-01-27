"use client";

import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertySetup";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import LocationSearch from "@/components/property/LocationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountrySelect from "./CountrySelect";
import { Textarea } from "@/components/ui/textarea";
import {
  FaBed,
  FaDollarSign,
  FaHome,
  FaMapMarkerAlt,
  FaRoad,
  FaTag,
} from "react-icons/fa";
import { Switch } from "@/components/ui/switch"; // Tailwind/your UI library
import type { PropertyFormValues, Step } from "../AddPropertyWizard";
import { Client, Databases, Query } from "appwrite";

/* ----------------------------------
   Appwrite Client & Services
----------------------------------- */
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

/* ----------------------------------
   Check if property exists by title or address
----------------------------------- */
async function propertyExists(field: "title" | "address", value: string) {
  if (!["title", "address"].includes(field))
    throw new Error("Field must be 'title' or 'address'");
  if (!value.trim()) return false;

  try {
    const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
    const COLLECTION_ID = process.env
      .NEXT_PUBLIC_APPWRITE_PROPERTYTABLE_ID as string;

    const result = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal(field, value),
      Query.limit(1),
    ]);

    return result.documents.length > 0;
  } catch (err) {
    console.error("Error checking property existence:", err);
    return false;
  }
}

/* ----------------------------------
   Props
----------------------------------- */
interface Props {
  formData: PropertyFormValues;
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
  setStep: Dispatch<SetStateAction<Step>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

/* ----------------------------------
   Constants
----------------------------------- */
const DEFAULT_CATEGORY: PropertyCategory = "Residential";
const STATUS_OPTIONS = [
  { label: "For Rent", value: "forRent" },
  { label: "For Sale", value: "forSale" },
];
const MAX_LENGTH = 255; // max chars for title & description

/* ----------------------------------
   Helpers
----------------------------------- */
function generateTitle(data: PropertyFormValues) {
  const propertyName = data.propertyName?.trim();
  const subType = data.subType
    ? data.subType.replace(/([A-Z])/g, " $1").toLowerCase()
    : "property";
  const rooms =
    data.rooms && data.rooms > 0
      ? `${data.rooms} room${data.rooms > 1 ? "s" : ""}`
      : "full house";
  const statusLabel =
    data.property_status === "forRent"
      ? "available"
      : data.property_status === "forSale"
        ? "for sale"
        : "";

  const title = propertyName
    ? `${propertyName} ${rooms} ${statusLabel}`
    : `${subType} ${rooms} ${statusLabel}`;
  return title.length > MAX_LENGTH ? title.slice(0, MAX_LENGTH) : title;
}

function generateDescription(data: PropertyFormValues) {
  const rooms = Number(data.rooms) || 0;
  const price = data.price ? `$${data.price}` : "Price on request";
  const location = data.location || "a prime location";
  const type = data.subType
    ? data.subType
        .replace(/([A-Z])/g, " $1")
        .trim()
        .toLowerCase()
    : "property";
  const statusLabel =
    data.property_status === "forRent"
      ? "available for rent"
      : data.property_status === "forSale"
        ? "for sale"
        : "available";

  let description = `This ${type} features ${rooms} well-proportioned room${rooms > 1 ? "s" : ""}, ${statusLabel} at ${price}. It is ideally located in ${location}, offering excellent amenities and modern living standards.`;
  if (description.length > MAX_LENGTH)
    description = description.slice(0, MAX_LENGTH);
  return description;
}

/* ----------------------------------
   Motion variants
----------------------------------- */
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

/* ----------------------------------
   Component
----------------------------------- */
const BasicInfoStep: React.FC<Props> = ({
  formData,
  setFormData,
  setStep,
  error,
  setError,
}) => {
  const [mainType, setMainType] = useState<PropertyCategory>(
    (formData.type as PropertyCategory) ?? DEFAULT_CATEGORY,
  );

  const [titleTouched, setTitleTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [existsError, setExistsError] = useState<string | null>(null);
  const [autoGenerate, setAutoGenerate] = useState(true);

  const subTypes = useMemo<PropertySubType[]>(
    () => PROPERTY_HIERARCHY[mainType]?.subTypes ?? [],
    [mainType],
  );

  // Auto-generate title & description if toggle is ON
  useEffect(() => {
    if (!autoGenerate) return;
    setFormData((prev) => ({
      ...prev,
      title: titleTouched ? prev.title : generateTitle(prev),
      description: descriptionTouched
        ? prev.description
        : generateDescription(prev),
    }));
  }, [
    formData.propertyName,
    formData.subType,
    formData.location,
    formData.rooms,
    formData.price,
    formData.property_status,
    titleTouched,
    descriptionTouched,
    autoGenerate,
    setFormData,
  ]);

  // Check duplicates in Appwrite
  useEffect(() => {
    const checkExists = async () => {
      setExistsError(null);
      if (!formData.title?.trim() && !formData.address?.trim()) return;

      if (
        formData.title?.trim() &&
        (await propertyExists("title", formData.title))
      ) {
        setExistsError("A property with this title already exists.");
        return;
      }
      if (
        formData.address?.trim() &&
        (await propertyExists("address", formData.address))
      ) {
        setExistsError("A property with this address already exists.");
      }
    };

    checkExists();
  }, [formData.title, formData.address]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // If user types manually in title/description, stop auto-generation
    if (name === "title" || name === "description") setAutoGenerate(false);

    // Limit length
    const newValue =
      value.length > MAX_LENGTH ? value.slice(0, MAX_LENGTH) : value;

    setFormData((prev) => {
      if (name === "rooms")
        return { ...prev, rooms: newValue === "" ? 0 : Number(newValue) };
      if (name === "price") return { ...prev, price: newValue };
      if (name === "property_status")
        return { ...prev, property_status: newValue as "forRent" | "forSale" };
      return { ...prev, [name]: newValue };
    });
  };

  const validate = (): string | null => {
    if (!formData.title?.trim()) return "Property title is required.";
    if (!formData.property_status) return "Market status is required.";
    if (!formData.location?.trim()) return "Location is required.";
    if (!formData.address?.trim()) return "Street address is required.";
    if (!formData.country?.trim()) return "Country is required.";
    if (!formData.type) return "Property category is required.";
    if (!formData.subType) return "Property sub-type is required.";
    if (!formData.rooms || Number(formData.rooms) < 1)
      return "Number of rooms must be at least 1.";
    if (!formData.price || isNaN(Number(formData.price)))
      return "Price must be a valid number.";
    if (existsError) return existsError;
    return null;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-7"
    >
      {/* Auto-generate toggle */}
      <motion.div variants={fadeUp} className="flex items-center gap-2">
        <Switch
          id="auto-generate"
          checked={autoGenerate}
          onCheckedChange={setAutoGenerate}
        />
        <label htmlFor="auto-generate" className="text-sm font-medium">
          Auto-generate title & description
        </label>
      </motion.div>

      {/* Property Name */}
      <motion.div variants={fadeUp} className="flex flex-col gap-1">
        <label className="text-sm font-medium">Property Name (optional)</label>
        <Input
          name="propertyName"
          placeholder="e.g., Chiramba Complex"
          value={formData.propertyName || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              propertyName: e.target.value.slice(0, MAX_LENGTH),
            }))
          }
        />
        <p className="text-xs text-gray-500">
          If entered, this name will be used in the auto-generated title.
        </p>
      </motion.div>

      {/* Title */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <FaHome className="text-primary" />
        <Input
          name="title"
          placeholder="Property title"
          value={formData.title || ""}
          onChange={handleChange}
        />
      </motion.div>

      {/* Price */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <FaDollarSign className="text-primary" />
        <Input
          name="price"
          inputMode="numeric"
          placeholder="Price"
          value={formData.price || ""}
          onChange={handleChange}
        />
      </motion.div>

      {/* Market Status */}
      <motion.div variants={fadeUp} className="space-y-1">
        <label className="text-sm font-medium flex items-center gap-2">
          <FaTag className="text-primary" /> Market Status
        </label>
        <select
          name="property_status"
          value={formData.property_status || ""}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select market status</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Location */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <FaMapMarkerAlt className="text-primary" />
        <LocationSearch
          onSelect={({ name, lat, lng }) =>
            setFormData((prev) => ({
              ...prev,
              location: name,
              locationLat: lat,
              locationLng: lng,
            }))
          }
        />
      </motion.div>

      {/* Street Address */}
      <motion.div variants={fadeUp} className="flex flex-col gap-1">
        <label className="flex items-center gap-2 text-sm font-medium">
          <FaRoad className="text-primary" /> Street Address
        </label>
        <Input
          name="address"
          placeholder="123 Main St, Apt 4B"
          value={formData.address || ""}
          onChange={handleChange}
        />
      </motion.div>

      {/* Country + Rooms */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
        <CountrySelect
          value={formData.country || ""}
          onChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
        />
        <div className="flex items-center gap-3">
          <FaBed className="text-primary" />
          <Input
            name="rooms"
            inputMode="numeric"
            placeholder="Rooms"
            value={formData.rooms ?? ""}
            onChange={handleChange}
          />
        </div>
      </motion.div>

      {/* Category & Sub-type */}
      <motion.div variants={fadeUp} className="space-y-4">
        <select
          name="type"
          value={mainType}
          onChange={(e) => {
            const newType = e.target.value as PropertyCategory;
            setMainType(newType);
            setFormData((prev) => ({
              ...prev,
              type: newType,
              subType: PROPERTY_HIERARCHY[newType]?.subTypes[0] || "",
            }));
          }}
          className="select select-bordered w-full"
        >
          {Object.entries(PROPERTY_HIERARCHY).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>

        <select
          name="subType"
          value={formData.subType || ""}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select property sub-type</option>
          {subTypes.map((subType) => (
            <option key={subType} value={subType}>
              {subType.replace(/([A-Z])/g, " $1").trim()}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Description */}
      <motion.div variants={fadeUp}>
        <Textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="min-h-[160px]"
        />
        <p className="text-xs text-gray-500">Max {MAX_LENGTH} characters</p>
      </motion.div>

      {/* Continue button */}
      <motion.div variants={fadeUp} className="flex justify-end">
        <Button
          size="lg"
          onClick={() => {
            const err = validate();
            if (err) return setError(err);
            setError(null);
            setStep(2);
          }}
        >
          Continue
        </Button>
      </motion.div>

      {(error || existsError) && (
        <p className="text-sm text-red-500">{error || existsError}</p>
      )}
    </motion.div>
  );
};

export default BasicInfoStep;
