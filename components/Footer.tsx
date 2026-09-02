export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBlock: "2rem",
        }}
      >
        <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>
          © {year} Mika Ismayilli
        </p>
        <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
          <span className="eyebrow" style={{ letterSpacing: "0.1em" }}>
            Next.js · Vercel
          </span>
          <a
            href="https://github.com/MikaIsmayilov/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow link-draw"
            style={{ letterSpacing: "0.1em", color: "var(--paper-dim)" }}
          >
            Source ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
