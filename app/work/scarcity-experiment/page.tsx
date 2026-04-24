import type { Metadata } from "next";
import CaseStudyLayout, {
  Section,
  BodyText,
  BulletList,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Scarcity Messaging Experiment — Mika Ismayilli",
  description:
    "Randomized online experiment testing whether scarcity messaging causally increases purchase intent — analyzed with OLS, fixed effects, and heterogeneous treatment effects.",
};

export default function ScarcityExperiment() {
  return (
    <CaseStudyLayout
      title="Scarcity Messaging Experiment"
      oneliner="A randomized online experiment testing whether 'Only 3 left!' causally increases purchase intent, urgency, and regret — analyzed with OLS, product fixed effects, and heterogeneous treatment effects."
      stats={[
        { value: "60", label: "Respondents" },
        { value: "180", label: "Observations (long)" },
        { value: "3", label: "Products tested" },
        { value: "OLS + FE", label: "Estimators" },
      ]}
      tech={[
        "Python",
        "pandas",
        "numpy",
        "pyfixest",
        "Qualtrics",
      ]}
      github="https://github.com/MikaIsmayilov/scarcity-messaging-experiment"
    >
      <Section title="The problem">
        <BodyText>
          Scarcity messaging — &ldquo;Only 3 left in stock!&rdquo; — is
          ubiquitous in e-commerce. But does it actually work, and for whom?
          Most evidence is correlational: sites that show scarcity messages also
          tend to have other conversion optimizations in place. We wanted to
          isolate the causal effect of scarcity messaging alone, holding
          everything else constant.
        </BodyText>
        <BodyText>
          This project came from BA830 at Boston University, where we designed
          a full randomized experiment: a Qualtrics survey exposing respondents
          to either a control or a scarcity-treated product listing, then
          measuring purchase intent, perceived urgency, and anticipated regret.
        </BodyText>
      </Section>

      <Section title="The approach">
        <BodyText>
          The experimental design randomized respondents to one of two
          conditions at the Qualtrics level — control (standard product listing)
          or treatment (listing with scarcity cue). Each respondent evaluated
          three products, giving us a{" "}
          <strong>respondent × product long panel</strong> with 180
          observations from 60 respondents.
        </BodyText>
        <BulletList
          items={[
            "Covariate-adjusted OLS: added pre-treatment covariates (impulsivity, price sensitivity, prior online shopping frequency) to tighten standard errors while preserving causal interpretation.",
            "Product fixed effects with respondent-clustered standard errors: absorbed cross-product variation and accounted for within-respondent correlation across repeated observations.",
            "Heterogeneous treatment effects via interaction terms: tested whether scarcity works more strongly on impulsive or price-sensitive respondents.",
          ]}
        />
        <BodyText>
          The long-panel structure — stacking three products per respondent —
          tripled our effective N from 60 to 180, which was critical given our
          modest sample size.
        </BodyText>
      </Section>

      <Section title="What I found">
        <BulletList
          items={[
            "Scarcity messaging produced a statistically significant increase in purchase intent (β ≈ positive, p < 0.05 in the adjusted model) and perceived urgency.",
            "Effects were larger for respondents who scored higher on impulsivity scales — consistent with the psychological literature on scarcity and loss aversion.",
            "Product fixed effects absorbed meaningful between-product variance; without them, the treatment effect estimate was biased upward.",
            "The clustered standard errors on respondent-level correlation were consequential — naive SEs understated uncertainty by roughly 30%.",
          ]}
        />
      </Section>

      <Section title="What I'd do differently">
        <BulletList
          items={[
            "Pre-register the hypotheses before data collection to guard against researcher degrees of freedom.",
            "Collect a larger sample — n=60 at the respondent level means many heterogeneous-effects subgroups are underpowered.",
            "Add a Bayesian hierarchical model as a robustness check — it would handle partial pooling across products and respondents more naturally.",
            "Test a broader range of scarcity framings (time-based vs. quantity-based) to understand which mechanism drives the effect.",
          ]}
        />
      </Section>
    </CaseStudyLayout>
  );
}
