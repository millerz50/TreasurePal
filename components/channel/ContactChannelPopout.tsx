"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WhatsAppChannelPopout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Toggle Button */}
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-label="WhatsApp Channel"
        className="h-14 w-14 rounded-full shadow-xl bg-green-600 hover:bg-green-700 text-white"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 left-0"
          >
            <Card className="w-72 rounded-2xl shadow-2xl">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold">
                  TreasurePal WhatsApp Channel
                </h4>

                <a
                  href="https://whatsapp.com/channel/0029VbBYnEc9WtC1xlxVZe2K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition"
                >
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Follow Channel</span>
                </a>

                <p className="text-xs text-muted-foreground">
                  Verified listings, updates & announcements.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
