"use client";

export default function FooterNewsletter() {
  return (
    <>
      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Get property alerts
      </h4>
      <form
        id="tp-newsletter-form"
        action="/api/newsletter"
        method="post"
        className="flex gap-2"
        noValidate
      >
        <label htmlFor="tp-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="tp-newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@domain.com"
          className="flex-1 rounded-full px-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
          aria-label="Email address for property alerts"
        />
        <button
          type="submit"
          className="rounded-full px-4 py-2 bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold text-sm shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-300"
        >
          Subscribe
        </button>
      </form>
      <p
        className="text-sm text-slate-500 dark:text-slate-400 tp-newsletter-status"
        aria-live="polite"
      ></p>
    </>
  );
}
