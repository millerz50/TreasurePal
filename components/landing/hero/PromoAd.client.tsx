"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Megaphone, X } from "lucide-react";

export default function PromoAd({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl border bg-background/95 backdrop-blur shadow-xl p-4">
      <div className="flex justify-between gap-3">
        <div className="flex gap-3">
          <Megaphone className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-sm">Promote your property 🚀</p>
            <p className="text-xs text-muted-foreground">
              Get 10x more visibility with featured listings.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <Button size="sm" className="mt-3 w-full">
        Upgrade to Premium
      </Button>
    </motion.div>
  );
}
