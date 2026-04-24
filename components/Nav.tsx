"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#resume", label: "Résumé" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "var(--bg-panel)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "background-color 300ms ease, border-color 300ms ease",
      }}
    >
      <nav
        className="section-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          Mika Ismayilli
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map(({ href, label }) =>
            label === "Résumé" ? (
              <a
                key={label}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--ink-muted)",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ink-muted)")
                }
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className="link-underline"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--ink-muted)",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ink-muted)")
                }
              >
                {label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
