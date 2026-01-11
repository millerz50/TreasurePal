"use client";

import { useEffect, useState } from "react";

type Props = {
  value: string;
  onSelect: (location: { name: string; lat: number; lng: number }) => void;
};

export default function LocationSearch({ value, onSelect }: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<
    { display_name: string; lat: string; lon: string }[]
  >([]);

  useEffect(() => {
    setQuery(value); // keep local state in sync with parent
  }, [value]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 3) return;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data);
    };
    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for location"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
      {results.length > 0 && (
        <ul className="bg-white border border-slate-200 rounded-lg shadow mt-2 text-sm">
          {results.map((r, i) => (
            <li
              key={i}
              className="cursor-pointer hover:bg-slate-100 px-3 py-2 rounded"
              onClick={() => {
                onSelect({
                  name: r.display_name,
                  lat: parseFloat(r.lat),
                  lng: parseFloat(r.lon),
                });
                setQuery(r.display_name);
                setResults([]);
              }}>
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
