"use client"; // <-- client component for framer-motion

import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm.client";

export default function ContactPageClient() {
  return (
    <main className="bg-base-100 text-base-content min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* LEFT SECTION */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <header>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Get in Touch with TreasurePal
              </h1>
              <p className="mt-4 text-muted-foreground max-w-prose text-lg">
                Whether you want to list a property, partner with us, or need
                help, send us a message and we’ll respond within 24–48 hours.
              </p>
            </header>

            {/* OFFICE INFO */}
            <div className="rounded-2xl border border-base-300 bg-base-200 p-6 shadow-md">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Office
              </h3>
              <address className="not-italic mt-4 space-y-2 text-sm">
                <p>Harare, Zimbabwe</p>
                <p>
                  <a
                    href="tel:+263777768431"
                    className="text-primary hover:underline font-medium"
                  >
                    +263 777768431
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:johannes-developer@millerz.co.zw"
                    className="text-primary hover:underline font-medium"
                  >
                    johannes-developer@millerz.co.zw
                  </a>
                </p>
              </address>
            </div>

            {/* PRIVACY */}
            <p className="text-xs text-muted-foreground">
              <strong>Privacy:</strong> Your contact details are only used to
              respond to your inquiry. Read our{" "}
              <a href="/privacy" className="underline hover:text-primary">
                privacy policy
              </a>
              .
            </p>
          </motion.section>

          {/* RIGHT SECTION - CONTACT FORM */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-base-300 bg-white p-6 sm:p-10 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </motion.section>
        </div>
      </div>
    </main>
  );
}
