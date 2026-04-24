"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ExpandableCard from "@/components/ExpandableCard";
import type { ExpandableProject } from "@/components/ExpandableCard";

const tier2: ExpandableProject[] = [
  {
    slug: "f1-analysis",
    title: "F1 Performance Analysis",
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
];

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

export default function MoreProjects() {
  return (
    <section
      id="more-projects"
      style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="section-wrap">
        <FadeUp>
          <span
            className="section-num"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            04 / Coursework
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: "0.75rem",
            }}
          >
            More projects
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--ink-muted)",
              marginBottom: "3rem",
              maxWidth: "520px",
            }}
          >
            Real work with real results — coursework projects from my MSBA and
            BS programs. Click any card to expand.
          </p>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {tier2.map((p) => (
            <ExpandableCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
