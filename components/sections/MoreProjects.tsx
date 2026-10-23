"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import Reveal from "@/components/Reveal";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";
import ExpandableCard from "@/components/ExpandableCard";
import type { ExpandableProject } from "@/components/ExpandableCard";

const tier2: ExpandableProject[] = [
  {
    slug: "bu-ship-chatbot",
    title: "BU SHIP Chatbot — RAG vs. LLM-Only",
    course: "BU · BA840 · Data Ethics: Analytics in Social Context",
    oneliner:
      "A retrieval-augmented chatbot answering Boston University Student Health Insurance Plan coverage questions, benchmarked against retrieval-only and LLM-only baselines across a 240-run evaluation grid.",
    tech: ["FAISS", "Sentence-Transformers", "Qwen2.5-1.5B-Instruct", "Python"],
    role: "Technical lead (team project)",
    extended:
      "As technical lead on a team project, I built the chatbot, the experiment pipeline, and the evaluation framework. I combined a FAISS vector index over a 12-document SHIP policy corpus with Qwen2.5-1.5B-Instruct for generation, then stress-tested it against retrieval-only and LLM-only modes. I designed a 30-prompt red-teaming set spanning normal, ambiguous, and adversarial coverage questions, ran a 240-run grid across three system modes, two temperatures, and two retrieval depths, and triaged every response into a five-way decision label (covered, not covered, prior authorization required, escalate, or abstain). I labeled each response for correctness, hallucination, and harm severity — RAG and LLM-only were correct on only 27.5% and 16.7% of prompts versus 100% for retrieval-only, and incorrect answers carried an average harm severity of about 4.1 out of 5. The finding I care about: for a task with real financial and medical stakes, the more \"impressive\" generative modes were also the most confidently wrong.",
  },
  {
    slug: "f1-analysis",
    title: "F1 Performance Analysis",
    course: "BU · BA775 · Analytics for Business",
    oneliner:
      "Three decades of Formula 1 data analyzed for driver performance, constructor dominance, lap-time variability, and circuit effects — with interactive Tableau dashboards.",
    tech: ["Python", "SQL", "Tableau Public"],
    role: "Project manager",
    github: "https://github.com/MikaIsmayilov/Analyzing_Formula_One_Performance_Data_BA775_B09",
    demo: "https://public.tableau.com/app/profile/muslum.ismayilli/viz/F1Viz1/Dashboard1",
    demo2: "https://public.tableau.com/app/profile/muslum.ismayilli/viz/F1Viz1/Dashboard2",
    images: [
      {
        src: "https://public.tableau.com/static/images/F1/F1Viz1/Dashboard1/1.png",
        alt: "F1 Tableau dashboard 1",
        caption: "Dashboard 1 — driver & constructor performance",
      },
      {
        src: "https://public.tableau.com/static/images/F1/F1Viz1/Dashboard2/1.png",
        alt: "F1 Tableau dashboard 2",
        caption: "Dashboard 2 — circuit & lap-time analysis",
      },
    ],
    extended:
      "As project manager I scoped the analysis arc, coordinated team milestones, and owned the narrative that connected three decades of data into a coherent story. The Tableau deliverables are the only published BI work in my portfolio — interactive dashboards let viewers filter by season, circuit, and constructor to explore the patterns directly.",
  },
  {
    slug: "airbnb-boston",
    title: "Airbnb Boston Price & Booking",
    course: "BU · BA810 · Supervised Machine Learning",
    oneliner:
      "End-to-end supervised ML pipeline on 3,500+ Boston listings: a regression model for nightly price and a classification model for 30-day booking likelihood.",
    tech: ["scikit-learn", "Python", "pandas"],
    role: "Classification track lead",
    github: "https://github.com/MikaIsmayilov/Boston_AirBnB_Price_Analytics_BA810_A07",
    images: [
      {
        src: "/slides/airbnb-classification.png",
        alt: "Classification model confusion matrices — SVC, Naive Bayes, Decision Tree, Logistic Regression",
        caption: "Classification · confusion matrices across 4 models",
      },
      {
        src: "/slides/airbnb-takeaways.png",
        alt: "Key takeaways — learning curves and regularization analysis",
        caption: "Model diagnostics · learning curves & regularization",
      },
    ],
    extended:
      "I owned the classification track end-to-end: built four preprocessing + model pipelines (imputation → scaling/encoding → classifier), compared SVC, Decision Tree, KNN, and Naive Bayes, and evaluated with ROC-AUC, precision-recall curves, and confusion matrices. I also visualized the decision tree for interpretability — the most direct window into how the model makes booking-likelihood decisions. Note: the README reports R² > 0.99 and ROC-AUC 1.00; those numbers likely reflect data leakage and I'm re-verifying on a clean split before treating them as final.",
  },
  {
    slug: "alone-tv",
    title: "Alone TV — Survival Patterns",
    course: "BU · BA820 · Unsupervised & Unstructured ML",
    oneliner:
      "Unsupervised learning on History Channel's Alone contestants — K-Means, PCA, and hierarchical clustering to segment by behavioral and demographic traits linked to survival outcomes.",
    tech: ["scikit-learn", "Python", "Jupyter"],
    role: "Item-category analysis",
    github: "https://github.com/MikaIsmayilov/B02_Alone_TVShow_Unsupervised_Project",
    images: [
      {
        src: "/slides/alone-archetypes.png",
        alt: "5 survivalist archetypes by average days lasted",
        caption: "Clustering · 5 contestant archetypes by survival duration",
      },
      {
        src: "/slides/alone-loadouts.png",
        alt: "Loadout bundle clustering with elbow plot",
        caption: "Clustering · gear loadout bundles across 94 contestants",
      },
    ],
    extended:
      "I analyzed the item-category data — which survival items (bow, ferro rod, sleeping bag, etc.) cluster with which contestant profiles and which outcomes. Choosing the right distance metric and deciding how to encode item selections without implying false ordinality were the real methodological challenges. The answer to 'what actually makes a contestant last?' turned out to be less obvious than the community debates suggested.",
  },
  {
    slug: "semiconductor-trade",
    title: "Semiconductor Trade Resilience",
    course: "BU · BA780 · Introduction to Business Analytics",
    oneliner:
      "Multi-source analysis of global semiconductor trade (UN COMTRADE + wafer fault rates + SOXX index) mapping supply-chain dependencies and fragile nodes.",
    tech: ["Python", "NetworkX", "GeoPandas"],
    role: "Data cleaning & pipeline lead",
    github: "https://github.com/MikaIsmayilov/Semicondictor_Trade_Resilience_BA780_A04",
    images: [
      {
        src: "https://github.com/user-attachments/assets/a082832e-9244-4cd6-8dda-46199bba71bb",
        alt: "Global semiconductor import/export choropleth",
        caption: "Choropleth · global import/export flows by country",
      },
      {
        src: "https://github.com/user-attachments/assets/b6f3fc0b-440b-461d-9f4d-6f498c533630",
        alt: "Semiconductor trade network analysis",
        caption: "Trade network · dependency concentration",
      },
    ],
    extended:
      "As data cleaning and preprocessing lead I built the raw-to-clean pipeline across multiple COMTRADE exports and auxiliary datasets — reconciling inconsistent country codes, handling missing trade flows, and merging wafer fault rates with monthly SOXX candlestick data. The choropleth of global import/export flows is the most visually striking deliverable from any of my coursework, and it maps directly onto live geopolitical questions around the CHIPS Act and Taiwan export controls.",
  },
  {
    slug: "freight-plus",
    title: "Freight Plus — Freight Logistics",
    course: "Suffolk University · ISOM 330",
    oneliner:
      "Team engagement analyzing shipment data for a Boston-area logistics firm under NDA, modeling how mileage, weight, ship type, delivery type, and time-to-cover drive freight pricing.",
    tech: ["R", "Decision Trees", "Linear Regression"],
    role: "High-value goods segment lead",
    extended:
      "I led the high-value goods segment of the engagement, building and cross-validating a classification decision tree pruned to 3 terminal nodes, and running a parallel linear regression that iterated between log and square-root transformations of price to satisfy model-fit assumptions. Both models were evaluated against a held-out test split. The underlying shipment data is under NDA, so no dataset or client name is shared here — this is a summary of the approach and my role, not the deliverable itself.",
  },
  {
    slug: "lego-discovery-center",
    title: "Lego Discovery Center Boston — Growth Strategy",
    course: "Suffolk University · SBS-101",
    oneliner:
      "Team case study developing strategic solutions for the Lego Discovery Center Boston — membership retention, attendance patterns, and competitive positioning against industry benchmarks.",
    tech: ["Market Research", "Competitive Analysis"],
    role: "Team member",
    extended:
      "Working with a team, I helped analyze industry benchmarks and competitor offerings to recommend ways to increase annual pass sales and strengthen renewal rates — an early case-study exercise in translating attendance and retention data into a concrete growth strategy.",
  },
];

// Short category tag shown on each marquee card.
const tags: Record<string, string> = {
  "bu-ship-chatbot": "RAG · LLM evaluation",
  "f1-analysis": "Sports analytics",
  "airbnb-boston": "Supervised ML",
  "alone-tv": "Clustering",
  "semiconductor-trade": "Trade networks",
  "freight-plus": "Pricing models",
  "lego-discovery-center": "Growth strategy",
};

export default function MoreProjects() {
  const [selected, setSelected] = useState<string | null>(null);
  const press = useRef({ x: 0, y: 0 });
  const detailRef = useRef<HTMLDivElement>(null);
  const project = tier2.find((p) => p.slug === selected);

  const onPointerDown = (e: PointerEvent) => {
    press.current = { x: e.clientX, y: e.clientY };
  };

  // The drag library swallows clicks, so pointer-up decides: a pick only if
  // the pointer barely moved. Keyboard activation (detail 0) always picks.
  const pick = (slug: string, e: PointerEvent | null) => {
    if (e && Math.hypot(e.clientX - press.current.x, e.clientY - press.current.y) > 6) return;
    setSelected(slug);
    requestAnimationFrame(() =>
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    );
  };

  return (
    <section id="more-projects" className="section">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>
                Coursework
              </p>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                }}
              >
                More projects
              </h2>
            </div>
            <p className="prose" style={{ color: "var(--paper-dim)", maxWidth: "380px", fontSize: "1rem" }}>
              Real work with real results from my MSBA and BS programs. Drag
              the strip, then pick a card for the visuals and my part in it.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="marquee-edge" style={{ position: "relative" }}>
        <DraggableMarquee
          items={tier2.map((p) => ({ id: p.slug, ...p }))}
          speed={0.6}
          gapClassName="gap-5"
          itemClassName=""
          pauseOnHover
          className="py-6"
          label="Coursework projects. Drag or use the left and right arrow keys."
          renderItem={(item: ExpandableProject, i: number, isDuplicate: boolean) => (
            <button
              type="button"
              tabIndex={isDuplicate ? -1 : 0}
              onPointerDown={onPointerDown}
              onPointerUp={(e) => pick(item.slug, e)}
              onClick={(e) => e.detail === 0 && pick(item.slug, null)}
              aria-pressed={selected === item.slug}
              className="mq-card"
              style={{ rotate: i % 2 ? "1.5deg" : "-1.5deg", backgroundColor: i % 2 ? "var(--ground-3)" : "var(--ground-2)" }}
            >
              <span className="eyebrow" style={{ color: i % 2 ? "var(--support)" : "var(--accent)" }}>
                {tags[item.slug]}
              </span>
              <span className="display mq-title">{item.title}</span>
              <span className="eyebrow">{item.role}</span>
            </button>
          )}
        />
      </div>

      <div className="wrap" ref={detailRef} style={{ marginTop: "2rem", scrollMarginTop: "6rem" }}>
        {project ? (
          <ExpandableCard key={project.slug} project={project} index={0} defaultOpen />
        ) : (
          <p className="eyebrow" style={{ textAlign: "center" }}>
            ← Drag · click a card for details →
          </p>
        )}
      </div>

      <style>{`
        .marquee-edge::before, .marquee-edge::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: clamp(2rem, 10vw, 10rem); z-index: 2; pointer-events: none;
        }
        .marquee-edge::before { left: 0; background: linear-gradient(90deg, var(--ground), transparent); }
        .marquee-edge::after { right: 0; background: linear-gradient(270deg, var(--ground), transparent); }
        .mq-card {
          display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;
          width: 340px; height: 210px; padding: 1.5rem; text-align: left; cursor: inherit;
          border-radius: 18px; border: 1px solid var(--rule-strong); color: var(--paper);
          transition: border-color 220ms var(--ease-out), background-color 220ms var(--ease-out);
        }
        .mq-card:hover, .mq-card[aria-pressed="true"] { border-color: var(--accent); }
        .mq-title { font-size: 1.4rem; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
        @media (max-width: 640px) { .mq-card { width: 280px; height: 190px; } }
      `}</style>
    </section>
  );
}
