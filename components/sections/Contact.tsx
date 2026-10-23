"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { DiscoverButton } from "@/components/ui/discover-button";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muslumismayilli/" },
  { label: "GitHub", href: "https://github.com/MikaIsmayilov" },
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
    <section
      id="contact"
      className="section"
      style={{ position: "relative", overflow: "hidden", paddingBottom: "clamp(5rem, 10vw, 8rem)" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "32%",
          width: "min(900px, 120vw)",
          height: "420px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(196,181,253,0.18), transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="display"
            style={{
              fontSize: "clamp(3.25rem, 10vw, 8rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
            }}
          >
            Let&apos;s{" "}
            <em style={{ fontFamily: "var(--font-body)", fontWeight: 400, color: "var(--accent)" }}>talk</em>
            <br />
            data.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="prose" style={{ color: "var(--paper-dim)", maxWidth: "460px", margin: "0 auto 2.5rem" }}>
            I&apos;m looking for data science, ML, and analytics roles. Open to
            conversation — even if you&apos;re just exploring.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "4.5rem" }}>
            <DiscoverButton label="mikaism@bu.edu" href="mailto:mikaism@bu.edu" external />
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn-pill">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </Reveal>

        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "left" }}>
          <Reveal delay={0.12}>
            <p className="eyebrow" style={{ marginBottom: "1.25rem", textAlign: "center" }}>
              Or send a message
            </p>
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
                <p className="mono" style={{ color: "var(--accent)", fontSize: "0.8125rem", letterSpacing: "0.06em" }}>
                  Message sent — I&apos;ll be in touch.
                </p>
              ) : (
                <button type="submit" className="btn-pill" disabled={status === "sending"} style={{ alignSelf: "flex-start", cursor: "pointer" }}>
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
        @media (min-width: 560px) {
          .contact-two { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
