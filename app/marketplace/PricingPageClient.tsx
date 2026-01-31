"use client";

import { Check, Coins, Crown, Zap, User } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = "263777768431";

/* ---------------------------
   PAGE
---------------------------- */

export default function PricingPageClient() {
  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Pricing built for everyone
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse freely, upgrade to VIP, or sell smarter as an agent.
            Transparent pricing. No surprises.
          </p>
        </div>
      </section>

      {/* USERS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-bold mb-10 text-center">For Users</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <GeneralUserCard />
          <VipUserCard />
        </div>
      </section>

      {/* AGENTS */}
      <section className="bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl font-bold mb-10 text-center">For Agents</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <AgentCoinsCard />
            <CoinBundles />
            <UnlimitedAgentCard />
          </div>
        </div>
      </section>

      <PaymentMethods />
    </main>
  );
}

/* ---------------------------
   USER CARDS
---------------------------- */

function GeneralUserCard() {
  return (
    <PricingCard
      title="General User"
      icon={<User className="h-6 w-6" />}
      price="Free"
      features={[
        "20 coins on signup",
        "20 coins per referral",
        "Browse & save properties",
        "Up to 3 property interactions per day",
        "Ads supported",
      ]}
    />
  );
}

function VipUserCard() {
  return (
    <PricingCard
      title="VIP User"
      price="$10 / month"
      highlight
      icon={<Crown className="h-6 w-6" />}
      features={[
        "Completely ad-free experience",
        "10 coins daily login (auto-accumulates)",
        "50 coins per referral",
        "Up to 20 property interactions per day",
        "Early access to new listings",
        "Priority alerts & support",
      ]}
    />
  );
}

/* ---------------------------
   AGENT CARDS
---------------------------- */

function AgentCoinsCard() {
  return (
    <PricingCard
      title="Agent (Pay per listing)"
      price="20 coins per property"
      icon={<Coins className="h-6 w-6" />}
      features={[
        "Post & manage properties",
        "Only pay when you list",
        "Boost & feature listings",
        "Ideal for part-time agents",
      ]}
    />
  );
}

function CoinBundles() {
  return (
    <div className="rounded-3xl border p-8 bg-background shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Agent Coin Packs</h3>

      <ul className="space-y-4 text-sm">
        <CoinRow price="$1.50" coins="90" posts="4 listings" />
        <CoinRow price="$3" coins="200" posts="10 listings" />
        <CoinRow price="$5" coins="350" posts="17 listings" />
        <CoinRow price="$10 ⭐ Popular" coins="800" posts="40 listings" />
        <CoinRow price="$25" coins="2,200" posts="110 listings" />
      </ul>

      <WhatsappButton />
    </div>
  );
}

function UnlimitedAgentCard() {
  return (
    <PricingCard
      title="Unlimited Agent"
      price="$59 / month"
      highlight
      icon={<Zap className="h-6 w-6" />}
      features={[
        "Unlimited property listings",
        "Unlimited boosts & featuring",
        "No coins required",
        "Verified agency badge",
        "Advanced analytics dashboard",
        "No ads anywhere",
      ]}
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
}: {
  title: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl border p-8 shadow-sm ${
        highlight ? "border-primary bg-primary/5 scale-[1.03]" : "bg-background"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          BEST VALUE
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

      <WhatsappButton />
    </div>
  );
}

function CoinRow({
  price,
  coins,
  posts,
}: {
  price: string;
  coins: string;
  posts: string;
}) {
  return (
    <li className="flex justify-between border-b pb-2">
      <span>{price}</span>
      <span>{coins} coins</span>
      <span>{posts}</span>
    </li>
  );
}

function WhatsappButton() {
  return (
    <Link
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20TreasureProps%20👋%20I%20would%20like%20to%20purchase%20a%20plan.`}
      target="_blank"
      className="mt-8 block w-full rounded-full bg-primary px-5 py-3 text-center font-medium text-primary-foreground hover:opacity-90"
    >
      Buy via WhatsApp
    </Link>
  );
}

/* ---------------------------
   PAYMENTS
---------------------------- */

function PaymentMethods() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <p className="mt-3 text-muted-foreground">
          EcoCash • Mukuru • PayPal • Cards (coming soon)
        </p>
      </div>
    </section>
  );
}
