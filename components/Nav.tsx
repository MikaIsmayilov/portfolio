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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(9, 13, 30, 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
        transition:
          "background-color 320ms ease, border-color 320ms ease, backdrop-filter 320ms ease",
      }}
    >
      <nav
        className="wrap"
        aria-label="Primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <Link
          href="/"
          className="display"
          style={{
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "var(--paper)",
            letterSpacing: "-0.02em",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--ember)",
              boxShadow: "0 0 12px var(--ember-dim)",
            }}
          />
          Mika Ismayilli
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 2.5vw, 2.25rem)",
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="link-draw eyebrow"
              style={{ color: "var(--paper-dim)", fontSize: "0.6875rem" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
