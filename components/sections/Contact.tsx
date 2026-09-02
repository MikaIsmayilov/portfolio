"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const contactLinks = [
  { label: "Email", value: "mikaism@bu.edu", href: "mailto:mikaism@bu.edu" },
  { label: "GitHub", value: "MikaIsmayilov", href: "https://github.com/MikaIsmayilov" },
  { label: "LinkedIn", value: "muslumismayilli", href: "https://www.linkedin.com/in/muslumismayilli/" },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mlgaznly", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section" style={{ paddingBottom: "clamp(5rem, 10vw, 8rem)" }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="display"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              marginBottom: "1.25rem",
              fontVariationSettings: '"opsz" 96, "wdth" 88',
            }}
          >
            Say hi<span style={{ color: "var(--ember)" }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="prose" style={{ color: "var(--paper-dim)", maxWidth: "460px", marginBottom: "3.5rem" }}>
            I&apos;m looking for data science, ML, and analytics roles. Open to
            conversation — even if you&apos;re just exploring.
          </p>
        </Reveal>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem" }}>
          <Reveal delay={0.1}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--rule)" }}>
              {contactLinks.map(({ label, value, href }) => (
                <li key={label} style={{ borderBottom: "1px solid var(--rule)" }}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "88px 1fr auto",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem 0.25rem",
                      transition: "padding-left 220ms var(--ease-out)",
                    }}
                  >
                    <span className="eyebrow">{label}</span>
                    <span className="display" style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
                      {value}
                    </span>
                    <span aria-hidden="true" className="mono contact-arrow" style={{ color: "var(--paper-faint)", transition: "transform 220ms var(--ease-out), color 220ms" }}>
                      {href.startsWith("http") ? "↗" : "→"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="contact-two" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                <div>
                  <label htmlFor="name" className="eyebrow" style={{ display: "block", marginBottom: "0.5rem" }}>
                    Name
                  </label>
                  <input id="name" name="name" type="text" required className="field" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow" style={{ display: "block", marginBottom: "0.5rem" }}>
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className="field" autoComplete="email" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="eyebrow" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Message
                </label>
                <textarea id="message" name="message" required rows={5} className="field" style={{ resize: "vertical" }} />
              </div>

              {status === "sent" ? (
                <p className="mono" style={{ color: "var(--ember)", fontSize: "0.8125rem", letterSpacing: "0.06em" }}>
                  Message sent — I&apos;ll be in touch.
                </p>
              ) : (
                <button type="submit" className="btn-ember" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              )}

              {status === "error" && (
                <p className="prose" style={{ color: "#FF8A80", fontSize: "0.9375rem" }}>
                  Something went wrong. Email me directly at mikaism@bu.edu.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-row:hover { padding-left: 0.75rem !important; }
        .contact-row:hover .contact-arrow { transform: translateX(4px); color: var(--ember); }
        @media (min-width: 560px) {
          .contact-two { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 860px) {
          .contact-grid { grid-template-columns: 6fr 6fr !important; gap: 5rem !important; }
        }
      `}</style>
    </section>
  );
}
