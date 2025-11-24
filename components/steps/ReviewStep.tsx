"use client";

import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import type { FormData, Step } from "../AddPropertyWizard";

interface Props {
  formData: FormData;
  setStep: Dispatch<SetStateAction<Step>>;
  handleSubmit: () => void;
  loading: boolean;
  error: string | null;
}

export default function ReviewStep({
  formData,
  setStep,
  handleSubmit,
  loading,
  error,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-primary">Review Your Listing</h3>
      <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(4)}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Property"}
        </Button>
      </div>
    </div>
  );
}
