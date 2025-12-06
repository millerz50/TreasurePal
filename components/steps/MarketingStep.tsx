"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import {
  FaBullhorn,
  FaFileAlt,
  FaGlobe,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";

interface Props {
  formData: PropertyFormValues;
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
  setStep: Dispatch<SetStateAction<Step>>;
}

const subscriptionPlans = [
  {
    id: "free",
    name: "Free Plan",
    desc: "Basic website listing only",
    price: "USD 0",
  },
  {
    id: "basic",
    name: "Basic Plan",
    desc: "Website listing + flyer design",
    price: "USD 20/month",
  },
  {
    id: "pro",
    name: "Pro Plan",
    desc: "Website + flyers + WhatsApp group promotion",
    price: "USD 50/month",
  },
  {
    id: "premium",
    name: "Premium Plan",
    desc: "All channels + ad campaigns",
    price: "USD 100/month",
  },
];

const recommendedDesigners = [
  { id: "designer1", name: "Creative Studio", specialty: "Flyers & Posters" },
  {
    id: "designer2",
    name: "SocialBoost Agency",
    specialty: "Social Media Ads",
  },
  { id: "designer3", name: "Brandify", specialty: "Full Marketing Packages" },
];

const MarketingStep: React.FC<Props> = ({ formData, setFormData, setStep }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h3 className="font-bold text-xl text-primary flex items-center gap-2">
        <FaBullhorn /> Marketing & Promotion
      </h3>

      {/* Website */}
      <div className="flex items-center gap-2">
        <FaGlobe className="text-primary" />
        <Input
          name="website"
          placeholder="Property website URL"
          value={(formData as any).website || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, website: e.target.value }))
          }
          className="flex-1"
        />
      </div>

      {/* Flyers/Posters */}
      <div className="flex items-center gap-2">
        <FaFileAlt className="text-primary" />
        <Textarea
          name="flyers"
          placeholder="Describe flyer/poster needs or paste design link"
          value={(formData as any).flyers || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, flyers: e.target.value }))
          }
          className="flex-1"
        />
      </div>

      {/* Designer option */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border rounded-lg p-3 shadow-sm">
          <span className="text-sm font-medium">Need a designer?</span>
          <Switch
            checked={(formData as any).hireDesigner || false}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, hireDesigner: checked }))
            }
          />
        </div>
        {(formData as any).hireDesigner && (
          <div className="grid gap-4 sm:grid-cols-3">
            {recommendedDesigners.map((designer) => (
              <div
                key={designer.id}
                className={`border rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md ${
                  (formData as any).designer === designer.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, designer: designer.id }))
                }>
                <div className="flex items-center gap-2 mb-2">
                  <FaUserTie className="text-primary" />
                  <h5 className="font-semibold">{designer.name}</h5>
                </div>
                <p className="text-sm text-gray-600">{designer.specialty}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscription Plans */}
      <div>
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <FaBullhorn className="text-primary" /> Marketing Subscription Plans
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md ${
                (formData as any).subscriptionPlan === plan.id
                  ? "border-primary bg-primary/5"
                  : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, subscriptionPlan: plan.id }))
              }>
              <h5 className="font-semibold">{plan.name}</h5>
              <p className="text-sm text-gray-600">{plan.desc}</p>
              <p className="text-sm font-medium mt-2">{plan.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp integration */}
      <div className="flex items-center gap-2">
        <FaWhatsapp className="text-green-500" />
        <Input
          name="whatsappGroup"
          placeholder="WhatsApp group/channel link"
          value={(formData as any).whatsappGroup || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, whatsappGroup: e.target.value }))
          }
          className="flex-1"
        />
      </div>

      {/* Ads */}
      <div className="flex items-center gap-2">
        <FaBullhorn className="text-primary" />
        <Textarea
          name="ads"
          placeholder="Describe ad campaign needs (Facebook, Google, local classifieds)"
          value={(formData as any).ads || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, ads: e.target.value }))
          }
          className="flex-1"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setStep(4)}>
          Back
        </Button>
        <Button onClick={() => setStep(6)}>Next</Button>
      </div>
    </div>
  );
};

export default MarketingStep;
