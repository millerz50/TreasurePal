"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useEffect } from "react";

type PropertyImageSliderProps = {
  title: string;
  price: number;
  images: string[];
};

export default function PropertyImageSlider({
  title,
  price,
  images,
}: PropertyImageSliderProps) {
  const [index, setIndex] = useState(0);
  const slidesCount = images.length || 1;

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef<number>(0);
  const isPointerDown = useRef(false);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slidesCount) % slidesCount),
    [slidesCount],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % slidesCount),
    [slidesCount],
  );
  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(i, slidesCount - 1))),
    [slidesCount],
  );

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Swipe
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onPointerDown = (ev: PointerEvent) => {
      isPointerDown.current = true;
      pointerStartX.current = ev.clientX;
      pointerDeltaX.current = 0;
      try {
        (ev.target as Element).setPointerCapture?.((ev as any).pointerId);
      } catch {}
    };
    const onPointerMove = (ev: PointerEvent) => {
      if (!isPointerDown.current || pointerStartX.current === null) return;
      pointerDeltaX.current = ev.clientX - pointerStartX.current;
      el.style.setProperty("--drag-x", `${pointerDeltaX.current}px`);
    };
    const onPointerUp = () => {
      if (!isPointerDown.current || pointerStartX.current === null) return;
      const delta = pointerDeltaX.current;
      const threshold = 60;
      el.style.removeProperty("--drag-x");
      if (delta > threshold) prev();
      else if (delta < -threshold) next();
      isPointerDown.current = false;
      pointerStartX.current = null;
      pointerDeltaX.current = 0;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Touch fallback
    let touchStartX: number | null = null;
    const onTouchStart = (t: TouchEvent) => {
      touchStartX = t.touches[0].clientX;
    };
    const onTouchMove = (t: TouchEvent) => {
      if (touchStartX === null) return;
      pointerDeltaX.current = t.touches[0].clientX - touchStartX;
      el.style.setProperty("--drag-x", `${pointerDeltaX.current}px`);
    };
    const onTouchEnd = () => {
      const delta = pointerDeltaX.current;
      const threshold = 60;
      el.style.removeProperty("--drag-x");
      if (delta > threshold) prev();
      else if (delta < -threshold) next();
      touchStartX = null;
      pointerDeltaX.current = 0;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [prev, next]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg relative">
      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow ring-1 ring-gray-200"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow ring-1 ring-gray-200"
        aria-label="Next"
      >
        ›
      </button>

      <div
        ref={sliderRef}
        className="relative h-96 w-full overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} images`}
        style={{ touchAction: "pan-y", transform: "translateZ(0)" }}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            width: `${slidesCount * 100}%`,
            transform: `translateX(calc(${(-index * 100) / slidesCount}% + var(--drag-x, 0px)))`,
          }}
        >
          {images.length > 0 ? (
            images.map((src, i) => (
              <div key={i} className="relative w-full flex-shrink-0 h-96">
                <Image
                  src={src}
                  alt={`${title} image ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute left-6 bottom-6 text-white">
                  <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    {title}
                  </h1>
                  <p className="mt-1 text-lg font-semibold">
                    ${price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="relative w-full flex-shrink-0 h-96 bg-gray-100 flex items-center justify-center">
              <Image
                src="/default-property.jpg"
                alt={`Default property image`}
                width={1200}
                height={600}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 p-3 bg-base-100 justify-center">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-20 h-12 overflow-hidden rounded-md ring-1 transition-transform ${index === i ? "ring-green-400 scale-105" : "ring-base-300 hover:scale-105"}`}
            >
              <Image
                src={src}
                alt={`thumb ${i + 1}`}
                width={240}
                height={140}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
