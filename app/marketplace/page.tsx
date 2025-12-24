import { Check, Coins, Crown, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

/* ---------------------------
   SEO — BEST PRACTICES
---------------------------- */

export const metadata: Metadata = {
  title: "Pricing | TreasureProps – Coins, Premium & Unlimited Agents",
  description:
    "Flexible pricing for everyone. Buy coins for property listings, go Unlimited as an Agent, or upgrade to Premium for an ad-free experience on TreasureProps.",
  metadataBase: new URL("https://treasureprops.com"),
  alternates: {
    canonical: "https://treasureprops.com/pricing",
  },
  openGraph: {
    title: "TreasureProps Pricing – Coins, Premium & Unlimited",
    description:
      "Pay only for what you use. Coins for agents, Unlimited listings, and Premium users with no ads.",
    url: "https://treasureprops.com/pricing",
    siteName: "TreasureProps",
    images: [
      {
        url: "/og/pricing.jpg",
        width: 1200,
        height: 630,
        alt: "TreasureProps pricing plans",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreasureProps Pricing",
    description:
      "Coins for agents. Unlimited plans. Premium users. Built for Zimbabwe & global users.",
    images: ["/og/pricing.jpg"],
  },
};

/* ---------------------------
   PAGE
---------------------------- */

export default function PricingPage() {
  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Simple, Fair Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for Zimbabwe 🇿🇼 and the world 🌍. Pay per action with coins,
            go Unlimited as an Agent, or upgrade to Premium for a clean
            experience.
          </p>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-8 lg:grid-cols-3">
        <PremiumCard />
        <CoinsCard />
        <UnlimitedAgentCard />
      </section>

      {/* COINS EXPLANATION */}
      <CoinsMath />

      {/* PAYMENT METHODS */}
      <PaymentMethods />

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to grow faster?</h2>
          <p className="mt-3 text-muted-foreground">
            Upgrade anytime. No hidden fees. Cancel whenever you want.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90">
              Get Started
            </Link>
            <Link
              href="/contact"
              className="rounded-full border px-6 py-3 font-medium hover:bg-accent/10">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------
   COMPONENTS
---------------------------- */

function PremiumCard() {
  return (
    <PricingCard
      title="Premium User"
      price="$9 / month"
      icon={<Crown className="h-6 w-6" />}
      features={[
        "No ads (clean experience)",
        "Save unlimited properties",
        "Instant price alerts",
        "Early access to listings",
        "Priority support",
      ]}
    />
  );
}

function CoinsCard() {
  return (
    <PricingCard
      title="Agent Coins"
      price="400 coins = $1"
      icon={<Coins className="h-6 w-6" />}
      features={[
        "Pay only for what you use",
        "Post & boost listings",
        "Feature properties",
        "Unlock analytics",
        "EcoCash, Mukuru & PayPal",
      ]}
      footer="Best for flexible or part-time agents"
    />
  );
}

function UnlimitedAgentCard() {
  return (
    <PricingCard
      title="Unlimited Agent"
      price="$59 / month"
      icon={<Zap className="h-6 w-6" />}
      highlight
      features={[
        "Unlimited property listings",
        "Unlimited featured boosts",
        "No coins required",
        "Verified agency badge",
        "Advanced analytics dashboard",
        "Priority agent support",
        "No ads anywhere",
      ]}
      footer="Built for full-time & agency teams"
    />
  );
}

/* ---------------------------
   SHARED UI
---------------------------- */

function PricingCard({
  title,
  price,
  features,
  icon,
  highlight,
  footer,
}: {
  title: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  highlight?: boolean;
  footer?: string;
}) {
  return (
    <div
      className={`relative rounded-3xl border p-8 shadow-sm ${
        highlight ? "border-primary bg-primary/5 scale-[1.03]" : "bg-background"
      }`}>
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          MOST POPULAR
        </span>
      )}

      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <p className="mt-4 text-3xl font-bold">{price}</p>

      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <Check className="h-4 w-4 text-primary" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/checkout"
        className={`mt-8 block w-full rounded-full px-5 py-3 text-center font-medium ${
          highlight
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "border hover:bg-accent/10"
        }`}>
        Choose Plan
      </Link>

      {footer && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {footer}
        </p>
      )}
    </div>
  );
}

/* ---------------------------
   COINS MATH
---------------------------- */

function CoinsMath() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">How Coins Work</h2>
      <p className="mt-4 text-muted-foreground">
        Transparent pricing. Predictable costs.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CoinBox coins="400" price="$1" />
        <CoinBox coins="2,000" price="$5" />
        <CoinBox coins="4,000" price="$10" />
        <CoinBox coins="10,000" price="$25" />
      </div>
    </section>
  );
}

function CoinBox({ coins, price }: { coins: string; price: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <p className="text-2xl font-bold">{coins}</p>
      <p className="text-sm text-muted-foreground">{price}</p>
    </div>
  );
}

/* ---------------------------
   PAYMENTS
---------------------------- */

function PaymentMethods() {
  return (
    
    <section className="border-t bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <p className="mt-3 text-muted-foreground">
          Automatically shown based on your country.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Payment name="EcoCash" region="Zimbabwe 🇿🇼" />
          <Payment name="Mukuru" region="Zimbabwe 🇿🇼" />
          <Payment name="PayPal" region="International 🌍" />
          <Payment name="Cards" region="Coming Soon" />
        </div>
      </div>
    </section>
  );
}

function Payment({ name, region }: { name: string; region: string }) {
  return (
    <div className="rounded-xl border p-5">
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{region}</p>
    </div>
  );
}
