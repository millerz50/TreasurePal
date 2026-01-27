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
import { Textarea } from "@/components/ui/textarea";
import CountrySelect from "./CountrySelect";
import {
  FaBed,
  FaDollarSign,
  FaHome,
  FaMapMarkerAlt,
  FaRoad,
  FaTag,
} from "react-icons/fa";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";

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
  const location = data.location || "Prime Location";
  const statusLabel =
    data.property_status === "forRent"
      ? "For Rent"
      : data.property_status === "forSale"
        ? "For Sale"
        : "";
  return `${subType} ${statusLabel} in ${location}`.trim();
}

function generateDescription(data: PropertyFormValues) {
  const rooms =
    data.rooms && data.rooms > 0
      ? `${data.rooms} well-proportioned bedroom${data.rooms > 1 ? "s" : ""}`
      : "spacious living areas";

  const subType = data.subType
    ? data.subType
        .replace(/([A-Z])/g, " $1")
        .trim()
        .toLowerCase()
    : "property";

  const location = data.location || "a highly desirable location";

  return `This beautifully presented ${subType} features ${rooms} and is ideally situated in ${location}.

The property offers a well-balanced layout designed for comfortable modern living, with convenient access to key amenities, transport routes, and essential services.

An excellent opportunity for discerning buyers or tenants seeking quality, value, and location in one complete package.`;
}

/* ----------------------------------
   Motion variants
----------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

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

  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);

  const subTypes = useMemo<PropertySubType[]>(
    () => PROPERTY_HIERARCHY[mainType]?.subTypes ?? [],
    [mainType],
  );

  /* ----------------------------------
     Auto-generate title & description
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
    formData.property_status,
    titleTouched,
    descriptionTouched,
    setFormData,
  ]);

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
    if (!String(formData.price).trim()) return "Price is required.";
    if (isNaN(Number(formData.price))) return "Price must be a valid number.";
    if (!formData.property_status) return "Market status is required.";
    if (!formData.location?.trim()) return "Location is required.";
    if (!formData.address?.trim()) return "Address is required.";
    if (!formData.country?.trim()) return "Country is required.";
    if (!formData.type) return "Property category is required.";
    if (!formData.subType) return "Property sub-type is required.";
    if (!formData.rooms || Number(formData.rooms) < 1)
      return "Number of rooms must be at least 1.";
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

      {/* Address */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <FaRoad className="text-primary" />
        <Input
          name="address"
          placeholder="Street address"
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

      {/* Category */}
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

      {error && <p className="text-sm text-red-500">{error}</p>}
    </motion.div>
  );
};

export default BasicInfoStep;
