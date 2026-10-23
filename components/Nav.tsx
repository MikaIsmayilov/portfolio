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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: solid ? "rgba(19, 17, 31, 0.92)" : "transparent",
        backdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
        borderBottom: `1px solid ${solid ? "var(--rule)" : "transparent"}`,
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
              backgroundColor: "var(--accent)",
              boxShadow: "0 0 12px var(--accent-dim)",
            }}
          />
          Mika Ismayilli
        </Link>

        <div
          className="nav-links"
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

        <button
          type="button"
          className="nav-toggle eyebrow"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="wrap nav-menu">
          {links.map(({ href, label }) => (
            <Link key={label} href={href} className="display" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .nav-toggle {
          display: none;
          padding: 0.6rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--rule-strong);
          background: none;
          color: var(--paper);
          cursor: pointer;
        }
        .nav-menu { display: flex; flex-direction: column; padding-bottom: 1.25rem; }
        .nav-menu a {
          padding: 0.85rem 0;
          border-top: 1px solid var(--rule);
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--paper);
        }
        @media (max-width: 639px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: inline-flex; }
        }
        @media (min-width: 640px) {
          .nav-menu { display: none; }
        }
      `}</style>
    </header>
  );
}
