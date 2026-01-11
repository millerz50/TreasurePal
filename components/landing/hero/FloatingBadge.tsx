import type { FloatingBadgeProps } from "./types";

export default function FloatingBadge({
  icon: Icon,
  text,
  className,
}: FloatingBadgeProps) {
  return (
    <div
      className={`absolute ${className} flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm shadow-lg backdrop-blur`}>
      <Icon className="h-4 w-4 text-primary" />
      {text}
    </div>
  );
}
