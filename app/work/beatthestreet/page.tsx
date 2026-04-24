import type { Metadata } from "next";
import CaseStudyLayout, {
  Section,
  BodyText,
  BulletList,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "BeatTheStreet — Mika Ismayilli",
  description:
    "Full-stack ML app predicting quarterly earnings surprises for US public companies. 60.9% accuracy on a strict 2022–2024 holdout.",
};

export default function BeatTheStreet() {
  return (
    <CaseStudyLayout
      title="BeatTheStreet"
      oneliner="A full-stack ML application that predicts quarterly earnings surprises (beat / meet / miss) for US public companies, trained on 104,938 earnings observations spanning 2005–2024."
      badge="Live"
      badgeColor="signal"
      stats={[
        { value: "60.9%", label: "Test accuracy" },
        { value: "104,938", label: "Earnings obs." },
        { value: "2005–2024", label: "Data span" },
        { value: "27", label: "Feature groups" },
      ]}
      tech={[
        "LightGBM",
        "scikit-learn",
        "SHAP",
        "FastAPI",
        "React",
        "TypeScript",
        "Vite",
        "Tailwind",
        "Docker",
        "WRDS",
        "FRED",
      ]}
      demo="https://huggingface.co/spaces/MikaIsmayilli/beatthestreet"
      github={[
        "https://github.com/MikaIsmayilov/beatthestreet2",
        "https://github.com/MikaIsmayilov/BeatTheStreet",
      ]}
    >
      <Section title="The problem">
        <BodyText>
          Earnings surprises — a company reporting results above or below analyst
          consensus — drive some of the largest single-day stock price moves.
          Existing research shows that these surprises are partially predictable
          from publicly available data: analyst estimate revisions, momentum,
          and fundamentals all carry signal. But most academic work stays in
          research notebooks. I wanted to build something end-to-end: from raw
          financial databases to a live, explainable product a user could
          actually interact with.
        </BodyText>
        <BodyText>
          The benchmark I chose to beat was the &ldquo;always-beat&rdquo;
          classifier — simply predicting that every company beats every quarter.
          On the 2022–2024 test set, that baseline hit 47.8%. My target was to
          meaningfully exceed that with a model that was honest about its
          uncertainty and explainable at the individual-prediction level.
        </BodyText>
      </Section>

      <Section title="The approach">
        <BodyText>
          The data pipeline pulls from four source groups via WRDS:
        </BodyText>
        <BulletList
          items={[
            "Analyst estimates and actuals (I/B/E/S) — consensus EPS, estimate revisions, analyst count, forecast dispersion",
            "Company fundamentals (Compustat) — earnings quality metrics, accruals, sales growth, gross margin",
            "Price and momentum (CRSP) — 1-month and 3-month returns, volatility, volume trends",
            "Macroeconomic context (FRED) — fed funds rate, credit spreads, VIX at announcement date",
          ]}
        />
        <BodyText>
          All features were joined on a strict time-based basis to prevent
          lookahead bias. The train/validation/test split was{" "}
          <strong>2005–2019 / 2020–2021 / 2022–2024</strong> — no shuffling,
          no cross-validation across time. Preprocessing applied 1st/99th
          percentile winsorization and median imputation before fitting.
        </BodyText>
        <BodyText>
          A news sentiment layer was added via VADER scoring on yfinance-pulled
          headlines around each earnings announcement, giving the model a
          real-time qualitative signal.
        </BodyText>
        <BodyText>
          The final model is LightGBM, tuned on the validation set. Every
          prediction surfaces a SHAP waterfall chart showing exactly which
          features pushed the model toward its answer — so users can see
          whether the model is relying on analyst revisions, price momentum, or
          macro conditions.
        </BodyText>
      </Section>

      <Section title="What I found">
        <BulletList
          items={[
            "60.9% test accuracy on the 2022–2024 holdout — a 13-percentage-point lift over the always-beat baseline.",
            "The strongest predictors were analyst estimate revision direction and magnitude, followed by recent price momentum and earnings quality (accruals).",
            "VADER sentiment on pre-announcement headlines added a small but consistent signal, most visible in the miss bucket.",
            "The model calibrates well on beat vs. miss but is less confident on the narrow 'meet' bucket — which reflects genuine difficulty in the data.",
          ]}
        />
      </Section>

      <Section title="What I'd do differently">
        <BulletList
          items={[
            "Ensemble stacking: combine LightGBM with a logistic regression baseline and a small neural net head, then stack with a meta-learner.",
            "Backtest a long/short trading strategy built on the predictions — the natural next step from a prediction to a decision.",
            "Add more granular I/B/E/S revision timing: not just whether analysts revised, but how far from the announcement date.",
            "Explore multi-task learning across the beat/meet/miss classes to reduce the class-imbalance problem in the meet bucket.",
          ]}
        />
      </Section>
    </CaseStudyLayout>
  );
}
