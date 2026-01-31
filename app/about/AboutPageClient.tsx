"use client";

import { motion } from "framer-motion";
import { Building, Heart, User } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export default function AboutPageClient() {
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <main className="bg-gradient-to-b from-base-100 via-base-200 to-base-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 text-base-content py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            About {SITE_NAME}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Our mission is to empower local businesses and make property
            discovery simple, fair, and accessible to all income levels —
            students, families, and investors alike.
          </p>
        </header>

        {/* Cards Section */}
        <section className="grid gap-10 sm:gap-12">
          {/* Our Story */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 border border-gray-100 dark:border-slate-700 p-8 shadow-lg flex flex-col sm:flex-row gap-6 items-start hover:scale-105 transition-transform duration-300"
          >
            <Building className="w-10 h-10 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Our Story
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                Founded locally, TreasurePal builds tools for agents and
                customers to transact with trust. Property discovery should be
                transparent, inclusive, and efficient — whether you’re a student
                looking for affordable housing or a family seeking a forever
                home.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="rounded-3xl bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/10 dark:to-primary/10 border border-gray-100 dark:border-slate-700 p-8 shadow-lg flex flex-col sm:flex-row gap-6 items-start hover:scale-105 transition-transform duration-300"
          >
            <Heart className="w-10 h-10 text-secondary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2 text-secondary">
                Our Values
              </h2>
              <ul className="text-sm text-slate-700 dark:text-slate-200 space-y-2 list-disc list-inside">
                <li>
                  <strong>Local first</strong> — we prioritize local agents and
                  businesses.
                </li>
                <li>
                  <strong>Transparent</strong> — clear fees and honest listings.
                </li>
                <li>
                  <strong>Practical</strong> — simple tools that work on low
                  bandwidth and mobile devices.
                </li>
                <li>
                  <strong>Inclusive</strong> — solutions for every income level,
                  from students to investors.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Founder */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 border border-gray-100 dark:border-slate-700 p-8 shadow-lg flex flex-col sm:flex-row gap-6 items-start hover:scale-105 transition-transform duration-300"
          >
            <User className="w-10 h-10 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2 text-accent">
                Founder
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                TreasurePal was founded by <strong>Johannes Zemba</strong>, a
                visionary entrepreneur committed to modernizing Zimbabwe’s
                property market. His focus is on building inclusive digital
                tools that empower communities, support students, and connect
                local businesses with global opportunities.
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
