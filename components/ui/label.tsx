// components/ui/label.tsx
import React from "react";

export function Label({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </label>
  );
}
