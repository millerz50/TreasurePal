export function Hreflang({ path }: { path: string }) {
  const baseCom = "https://www.treasureprops.com";
  const baseZw = "https://treasurepal.co.zw";

  // Languages without ISO 639-1 codes (manual injection)
  const customLangs = [
    { code: "chw", label: "Chibarwe" },
    { code: "kck", label: "Kalanga" },
    { code: "khi", label: "Koisan" },
    { code: "nmq", label: "Nambya" },
    { code: "ndc", label: "Ndau" },
    { code: "toi", label: "Tonga" },
    { code: "zsl", label: "Zimbabwe Sign Language" },
  ];

  return (
    <>
      {customLangs.map((l) => (
        <>
          <link
            key={`${l.code}-com`}
            rel="alternate"
            hrefLang={l.code}
            href={`${baseCom}/${l.code}${path}`}
          />
          <link
            key={`${l.code}-zw`}
            rel="alternate"
            hrefLang={`${l.code}-zw`}
            href={`${baseZw}/${l.code}${path}`}
          />
        </>
      ))}
      {/* x-default fallback */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseCom}/en${path}`}
      />
    </>
  );
}
