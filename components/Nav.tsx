"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Download, FileText, House, Layers, Mail, User } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";

// Lucide dropped brand icons in v1; these are its last GitHub/LinkedIn
// outlines (ISC), kept so they match the other stroke icons.
function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type Item = {
  label: string;
  href: string;
  icon: ReactNode;
  section?: string;
  external?: boolean;
  download?: boolean;
  desktopOnly?: boolean;
};

const groups: Item[][] = [
  [{ label: "Home", href: "/", icon: <House size={20} />, section: "hero", desktopOnly: true }],
  [
    { label: "Work", href: "/#work", icon: <Layers size={20} />, section: "work" },
    { label: "About", href: "/#about", icon: <User size={20} />, section: "about" },
    { label: "Résumé", href: "/#resume", icon: <FileText size={20} />, section: "resume" },
    { label: "Contact", href: "/#contact", icon: <Mail size={20} />, section: "contact" },
  ],
  [
    { label: "GitHub", href: "https://github.com/MikaIsmayilov", icon: <GitHubIcon />, external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muslumismayilli/", icon: <LinkedInIcon />, external: true },
  ],
  [{ label: "Download PDF", href: "/resume.pdf", icon: <Download size={20} />, download: true, desktopOnly: true }],
];

// Page sections in order, mapped to the dock item that owns them.
const sections: [id: string, owner: string][] = [
  ["hero", "hero"],
  ["work", "work"],
  ["about", "about"],
  ["more-projects", "work"],
  ["resume", "resume"],
  ["contact", "contact"],
];

function useActiveSection() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setActive("work");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const probe = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const [id, owner] of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = owner;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return active;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [touch, setTouch] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (max-width: 639px)");
    const onChange = () => setTouch(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // On touch screens the dock slides away while scrolling down and returns
  // on scroll-up, so it never sits on top of what someone is reading.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (touch) {
        const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
        if (y > lastY + 6 && y > 160 && !nearBottom) setHidden(true);
        else if (y < lastY - 6 || nearBottom) setHidden(false);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [touch]);

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, pointerEvents: "none" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", height: "64px" }}>
          <Link
            href="/"
            className="display brand-pill"
            data-scrolled={scrolled}
            style={{
              pointerEvents: "auto",
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
        </div>
      </header>

      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="dock-wrap"
      >
        <Dock
          iconSize={touch ? 40 : 44}
          iconMagnification={64}
          iconDistance={130}
          disableMagnification={touch}
          className="dock-bar"
        >
          {groups.flatMap((group, g) => {
            const items = group.filter((item) => !(touch && item.desktopOnly));
            if (!items.length) return [];
            const icons = items.map((item) => {
              const isActive = !!item.section && item.section === active;
              const external = item.external || item.download;
              return (
                <DockIcon key={item.label} className="dock-icon" data-active={isActive}>
                  {external ? (
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className="dock-link"
                      {...(item.download
                        ? { download: "Mika-Ismayilli-Resume.pdf" }
                        : { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {item.icon}
                      <span className="dock-tip">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      aria-current={isActive ? "location" : undefined}
                      className="dock-link"
                    >
                      {item.icon}
                      <span className="dock-tip">{item.label}</span>
                    </Link>
                  )}
                </DockIcon>
              );
            });
            return g === 0 || (touch && g === 1)
              ? icons
              : [<span key={`sep-${g}`} aria-hidden="true" className="dock-sep" />, ...icons];
          })}
        </Dock>
      </motion.nav>

      <style>{`
        .brand-pill {
          margin-left: -0.9rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: background-color 320ms ease, border-color 320ms ease;
        }
        .brand-pill[data-scrolled="true"] {
          background-color: rgba(27, 24, 48, 0.62);
          border-color: var(--rule);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
        }
        .dock-wrap {
          position: fixed;
          left: 0;
          right: 0;
          bottom: max(1.25rem, env(safe-area-inset-bottom));
          z-index: 100;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }
        .dock-bar {
          pointer-events: auto;
          height: 62px;
          padding: 8px 10px;
          border-radius: 22px;
          background: rgba(27, 24, 48, 0.62);
          border: 1px solid var(--rule-strong);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          box-shadow: 0 20px 50px -18px rgba(0, 0, 0, 0.8);
        }
        .dock-icon {
          background: rgba(243, 240, 250, 0.06);
          color: var(--paper);
          transition: background-color 200ms ease, color 200ms ease;
        }
        .dock-icon:hover { background: rgba(243, 240, 250, 0.12); }
        .dock-icon[data-active="true"] { color: var(--accent); background: var(--accent-dim); }
        .dock-icon[data-active="true"]::after {
          content: "";
          position: absolute;
          bottom: -7px;
          left: 50%;
          width: 4px;
          height: 4px;
          margin-left: -2px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }
        .dock-link {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          color: inherit;
        }
        .dock-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .dock-tip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          translate: -50% 4px;
          white-space: nowrap;
          pointer-events: none;
          font-family: var(--font-mono), monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          background: var(--paper);
          color: var(--ground);
          opacity: 0;
          transition: opacity 160ms ease, translate 160ms ease;
        }
        .dock-link:hover .dock-tip,
        .dock-link:focus-visible .dock-tip { opacity: 1; translate: -50% 0; }
        .dock-sep {
          width: 1px;
          height: 30px;
          align-self: center;
          margin: 0 2px;
          background: var(--rule-strong);
        }
        @media (hover: none) { .dock-tip { display: none; } }
      `}</style>
    </>
  );
}
