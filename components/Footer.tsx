export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", marginTop: "6rem" }}>
      <div
        className="section-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBlock: "2rem",
        }}
      >
        <p
          className="section-num"
          style={{ letterSpacing: "0.06em", color: "var(--ink-muted)" }}
        >
          © {year} Mika Ismayilli
        </p>
        <p
          className="section-num"
          style={{ letterSpacing: "0.06em", color: "var(--ink-muted)" }}
        >
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
