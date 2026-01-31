// src/config/pricing.ts

/* ---------------------------
   HELPERS
---------------------------- */

function toNumber(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/* ---------------------------
   COINS
---------------------------- */

export const COINS_PER_PROPERTY = toNumber(
  process.env.COINS_PER_PROPERTY,
  20,
);

/* ---------------------------
   COIN PACKAGES
   Format: "usd:coins,usd:coins"
---------------------------- */

export const COIN_PACKAGES = (
  process.env.COIN_PACKAGES ??
  "1.5:90,3:200,5:350,10:800,25:2200"
)
  .split(",")
  .map((entry) => {
    const [usd, coins] = entry.split(":");
    return {
      usd: Number(usd),
      coins: Number(coins),
      popular: Number(usd) === 10,
    };
  })
  .filter((p) => Number.isFinite(p.usd) && Number.isFinite(p.coins));

/* ---------------------------
   VIP
---------------------------- */

export const VIP_PRICE_USD = toNumber(
  process.env.VIP_PRICE_USD,
  10,
);

/* ---------------------------
   DAILY LIMITS
---------------------------- */

export const DAILY_LIMITS = {
  user: toNumber(process.env.DAILY_LIMIT_USER, 3),
  vip: toNumber(process.env.DAILY_LIMIT_VIP, 20),
};

/* ---------------------------
   REWARDS
---------------------------- */

export const DAILY_LOGIN_COINS = {
  user: toNumber(process.env.DAILY_LOGIN_COINS_USER, 5),
  vip: toNumber(process.env.DAILY_LOGIN_COINS_VIP, 10),
};

export const REFERRAL_COINS = {
  user: toNumber(process.env.REFERRAL_COINS_USER, 20),
  vip: toNumber(process.env.REFERRAL_COINS_VIP, 50),
};
