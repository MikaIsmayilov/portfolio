import type { Metadata } from "next";
import CaseStudyLayout, {
  Section,
  BodyText,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Aurelian — Mika Ismayilli",
  description:
    "An AI-powered personal styling assistant. Personal project in progress.",
};

export default function Aurelian() {
  return (
    <CaseStudyLayout
      title="Aurelian"
      oneliner="An AI-powered personal styling assistant I'm building in my spare time to deepen my skills in app development, applied ML, and backend architecture."
      badge="In progress"
      stats={[
        { value: "Personal", label: "Project type" },
        { value: "TBD", label: "Launch" },
      ]}
      tech={["LLM", "TBD"]}
    >
      <Section title="Why I'm building this">
        <BodyText>
          Everything else in this portfolio is coursework or a finished exercise.
          Aurelian is <em>mine</em> — no professor assigned it, no grade
          attached. That distinction matters. It&apos;s the project I work on
          when I&apos;m supposed to be doing something else.
        </BodyText>
        <BodyText>
          The idea came from a recurring frustration: personal style advice is
          overwhelmingly generic. &ldquo;Dress for your body type&rdquo; ignores
          culture, context, budget, and the fact that most people don&apos;t
          know how to describe what they&apos;re going for. An AI assistant that
          can reason about aesthetic preferences, occasion, and wardrobe
          constraints — and actually give actionable advice — felt like a
          genuinely unsolved problem.
        </BodyText>
      </Section>

      <Section title="Current status">
        <BodyText>
          The prototype is in active development. Technical details — LLM choice,
          vision model, frontend stack, backend architecture, and hosting — will
          be published here once the stack is locked and tested.
        </BodyText>
        <BodyText>
          I&apos;m being deliberate about not shipping something underbaked.
          When it&apos;s ready, this page will have a live demo, a write-up of
          the architecture decisions, and an honest account of what worked and
          what didn&apos;t.
        </BodyText>
      </Section>

      <Section title="Follow the build">
        <BodyText>
          GitHub repo coming when the code is in a state worth sharing.
          In the meantime, reach out if you want to talk through the problem —
          I&apos;m always happy to discuss applied LLM product design.
        </BodyText>
      </Section>
    </CaseStudyLayout>
  );
}
