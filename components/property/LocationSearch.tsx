"use client";

import { useEffect, useState } from "react";

type Props = {
  onSelect: (location: { name: string; lat: number; lng: number }) => void;
};

export default function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { display_name: string; lat: string; lon: string }[]
  >([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 3) return;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=zw&q=${encodeURIComponent(
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
    <div className="space-y-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for location"
        className="input input-bordered w-full"
      />
      {results.length > 0 && (
        <ul className="bg-base-200 rounded shadow p-2 text-sm">
          {results.map((r, i) => (
            <li
              key={i}
              className="cursor-pointer hover:bg-base-300 p-2 rounded"
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
