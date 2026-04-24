"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const contactLinks = [
  {
    label: "Email",
    value: "mikaism@bu.edu",
    href: "mailto:mikaism@bu.edu",
  },
  {
    label: "GitHub",
    value: "MikaIsmayilov",
    href: "https://github.com/MikaIsmayilov",
  },
  {
    label: "LinkedIn",
    value: "muslumismayilli",
    href: "https://www.linkedin.com/in/muslumismayilli/",
  },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
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
    <section id="contact" style={{ paddingBlock: "6rem" }}>
      <div className="section-wrap">
        <FadeUp>
          <span
            className="section-num"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            05 / Contact
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: "0.75rem",
            }}
          >
            Say hi.
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "var(--ink-muted)",
              marginBottom: "3rem",
              maxWidth: "480px",
            }}
          >
            I&apos;m looking for data science, ML, and analytics roles. Open to
            conversation — even if you&apos;re just exploring.
          </p>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
          className="contact-grid"
        >
          {/* Direct links */}
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contactLinks.map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    border: "1px solid var(--rule)",
                    backgroundColor: "var(--bg-panel)",
                    textDecoration: "none",
                    transition: "border-color 200ms, transform 200ms",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--accent)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--rule)";
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <div>
                    <span
                      className="section-num"
                      style={{
                        display: "block",
                        marginBottom: "0.2rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "var(--ink)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.125rem",
                      color: "var(--accent)",
                    }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </FadeUp>

          {/* Contact form */}
          <FadeUp delay={0.12}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="name"
                  className="section-num"
                  style={{
                    display: "block",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid var(--rule)",
                    backgroundColor: "var(--bg-panel)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--ink)",
                    outline: "none",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLElement).style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLElement).style.borderColor = "var(--rule)")
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="section-num"
                  style={{
                    display: "block",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid var(--rule)",
                    backgroundColor: "var(--bg-panel)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--ink)",
                    outline: "none",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLElement).style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLElement).style.borderColor = "var(--rule)")
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="section-num"
                  style={{
                    display: "block",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid var(--rule)",
                    backgroundColor: "var(--bg-panel)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--ink)",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLElement).style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLElement).style.borderColor = "var(--rule)")
                  }
                />
              </div>

              {status === "sent" ? (
                <p
                  style={{
                    color: "var(--signal)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                  }}
                >
                  Message sent — I&apos;ll be in touch.
                </p>
              ) : (
                <button
                  type="submit"
                  className="btn-accent"
                  disabled={status === "sending"}
                  style={{ alignSelf: "flex-start" }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              )}

              {status === "error" && (
                <p
                  style={{
                    color: "#e53e3e",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                  }}
                >
                  Something went wrong. Email me directly at mikaism@bu.edu.
                </p>
              )}
            </form>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @media (min-width: 700px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
