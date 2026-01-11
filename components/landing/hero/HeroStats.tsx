import type { StatItem } from "./types";

const stats: StatItem[] = [
  { value: "5K+", label: "Properties" },
  { value: "120+", label: "Agencies" },
  { value: "30+", label: "Cities" },
];

export default function HeroStats() {
  return (
    <div className="flex gap-8 pt-6">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="text-2xl font-bold">{s.value}</p>
          <p className="text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
