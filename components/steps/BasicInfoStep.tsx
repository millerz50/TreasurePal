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
import type { PropertyFormValues, Step } from "../AddPropertyWizard";
import { Client, Account, Databases, Storage, Query } from "appwrite";

/* ----------------------------------
   Appwrite Client & Services
----------------------------------- */
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

/* ----------------------------------
   Check if property exists by title or address
----------------------------------- */
async function propertyExists(field: "title" | "address", value: string) {
  if (!["title", "address"].includes(field))
    throw new Error("Field must be 'title' or 'address'");
  if (!value.trim()) return false;

  try {
    const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
    const PROPERTIES_COLLECTION = process.env
      .NEXT_PUBLIC_APPWRITE_PROPERTYTABLE_ID as string;

    const result = await databases.listDocuments(DB_ID, PROPERTIES_COLLECTION, [
      Query.equal(field, value),
      Query.limit(1),
    ]);

    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking property existence:", error);
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

/* ----------------------------------
   Helpers
----------------------------------- */
function generateTitle(data: PropertyFormValues) {
  const subType = data.subType
    ? data.subType.replace(/([A-Z])/g, " $1").trim()
    : "Property";
  const statusLabel =
    data.property_status === "forRent"
      ? "For Rent"
      : data.property_status === "forSale"
        ? "For Sale"
        : "";
  return `${subType} ${statusLabel}`.trim();
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

  return `This ${type} features ${rooms} well-proportioned room${rooms > 1 ? "s" : ""}, ${statusLabel} at ${price}. It is ideally located in ${location}, offering excellent amenities and modern living standards. A perfect opportunity for anyone seeking quality, value, and comfort.`;
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

  const subTypes = useMemo<PropertySubType[]>(
    () => PROPERTY_HIERARCHY[mainType]?.subTypes ?? [],
    [mainType],
  );

  /* ----------------------------------
     Auto-generate title & description unless manually edited
  ----------------------------------- */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: titleTouched ? prev.title : generateTitle(prev),
      description: descriptionTouched
        ? prev.description
        : generateDescription(prev),
    }));
  }, [
    formData.subType,
    formData.location,
    formData.rooms,
    formData.price,
    formData.property_status,
    titleTouched,
    descriptionTouched,
    setFormData,
  ]);

  /* ----------------------------------
     Check if title or address already exists
  ----------------------------------- */
  useEffect(() => {
    const checkExists = async () => {
      setExistsError(null);

      if (!formData.title?.trim() && !formData.address?.trim()) return;

      try {
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
      } catch (err) {
        console.error(err);
      }
    };

    checkExists();
  }, [formData.title, formData.address]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "rooms")
        return { ...prev, rooms: value === "" ? 0 : Number(value) };
      if (name === "price") return { ...prev, price: value };
      if (name === "property_status")
        return { ...prev, property_status: value as "forRent" | "forSale" };
      return { ...prev, [name]: value };
    });
  };

  /* ----------------------------------
     Validation
  ----------------------------------- */
  const validate = (): string | null => {
    if (!formData.title?.trim()) return "Property title is required.";
    if (!formData.property_status) return "Market status is required.";
    if (!formData.location?.trim()) return "Location is required.";
    if (!formData.address?.trim())
      return "Street address is required (e.g., 123 Main St, Apt 4B).";
    if (!formData.country?.trim()) return "Country is required.";
    if (!formData.type) return "Property category is required.";
    if (!formData.subType) return "Property sub-type is required.";
    if (!formData.rooms || Number(formData.rooms) < 1)
      return "Number of rooms must be at least 1.";
    if (!formData.price || isNaN(Number(formData.price)))
      return "Price must be a valid number.";
    if (existsError) return existsError; // check Appwrite duplicate
    return null;
  };

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-7"
    >
      {/* Title */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <FaHome className="text-primary" />
        <Input
          name="title"
          placeholder="Property title"
          value={formData.title || ""}
          onChange={(e) => {
            setTitleTouched(true);
            handleChange(e);
          }}
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
          <FaTag className="text-primary" />
          Market Status
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
          <FaRoad className="text-primary" />
          Street Address
        </label>
        <Input
          name="address"
          placeholder="123 Main St, Apt 4B"
          value={formData.address || ""}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">
          Format: Street number, street name, optional unit/suite
        </p>
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
          onChange={(e) => {
            setDescriptionTouched(true);
            handleChange(e);
          }}
          className="min-h-[160px]"
        />
      </motion.div>

      {/* Navigation */}
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
