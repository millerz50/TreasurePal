// components/Footer.client.tsx
"use client";
import { useEffect } from "react";

export default function FooterClient() {
  useEffect(() => {
    const footer = document.getElementById("treasurepal-footer");
    if (!footer) return;

    // Entrance animation
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("tp-animate-in");
            io.unobserve(footer);
          }
        });
      },
      { threshold: 0.08 }
    );
    io.observe(footer);

    // CTA pulse (stops after interaction)
    const cta = footer.querySelector(
      '[data-cta="primary"]'
    ) as HTMLElement | null;
    let pulseTimer: number | undefined;
    if (cta) {
      const startPulse = () => {
        cta.classList.add("tp-cta-pulse");
        window.setTimeout(() => cta.classList.remove("tp-cta-pulse"), 900);
      };
      pulseTimer = window.setInterval(startPulse, 7000);
      cta.addEventListener(
        "pointerdown",
        () => {
          if (pulseTimer) window.clearInterval(pulseTimer);
        },
        { once: true }
      );
    }

    // Social hover: subtle gradient + lift, works in dark & light
    const socials = footer.querySelectorAll(".tp-social-hoverable");
    socials.forEach((el) => {
      const enter = () => {
        (el as HTMLElement).style.background =
          "linear-gradient(90deg,#2ECC71,#1E90FF)";
        (el as HTMLElement).style.color = "#fff";
        (el as HTMLElement).style.transform = "translateY(-4px) scale(1.02)";
        (el as HTMLElement).style.transition =
          "transform 180ms ease, background 180ms ease";
      };
      const leave = () => {
        (el as HTMLElement).style.background = "";
        (el as HTMLElement).style.color = "";
        (el as HTMLElement).style.transform = "";
      };
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("focus", enter);
      el.addEventListener("blur", leave);
    });

    // Newsletter AJAX with defensive parsing + accessible feedback
    const form = document.getElementById(
      "tp-newsletter-form"
    ) as HTMLFormElement | null;
    if (form) {
      const input = form.querySelector<HTMLInputElement>(
        "#tp-newsletter-email"
      );
      const status = document.querySelector<HTMLElement>(
        ".tp-newsletter-status"
      );
      const submitHandler = async (e: Event) => {
        e.preventDefault();
        if (!input || !status) return;
        if (!input.checkValidity()) {
          input.focus();
          status.textContent = "Please enter a valid email address.";
          status.classList.add("tp-error");
          return;
        }
        status.textContent = "Subscribing...";
        status.classList.remove("tp-error", "tp-success");
        try {
          const res = await fetch(form.action, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email: input.value }),
            credentials: "include",
          });
          const ct = res.headers.get("content-type") || "";
          const data = ct.includes("application/json")
            ? await res.json()
            : { success: res.ok, message: await res.text() };
          if (res.ok && data.success) {
            status.textContent = "Subscribed — check your inbox.";
            status.classList.add("tp-success");
            input.value = "";
            input.animate(
              [
                { transform: "translateY(0)" },
                { transform: "translateY(-6px)" },
                { transform: "translateY(0)" },
              ],
              { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }
            );
          } else {
            status.textContent =
              data.message || "Subscription failed. Try again later.";
            status.classList.add("tp-error");
          }
        } catch {
          status.textContent = "Subscription failed. Try again later.";
          status.classList.add("tp-error");
        }
      };
      form.addEventListener("submit", submitHandler);

      return () => {
        if (pulseTimer) window.clearInterval(pulseTimer);
        io.disconnect();
        form.removeEventListener("submit", submitHandler);
      };
    }

    return () => {
      if (pulseTimer) window.clearInterval(pulseTimer);
      io.disconnect();
    };
  }, []);

  return null;
}
