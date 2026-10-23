import type { Metadata } from "next";
import CaseStudyLayout, {
  Section,
  BodyText,
  BulletList,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Job Agent — Mika Ismayilli",
  description:
    "An AI job agent anyone can install by talking to Claude. Requirement-coverage fit scoring, US and Canadian work-authorization screening, a cloud dashboard, and onboarding built for any user.",
};

export default function JobAgent() {
  return (
    <CaseStudyLayout
      title="Job Agent"
      oneliner="I took a friend's personal job-search script and turned it into an AI job agent anyone can install by talking to Claude. I rewrote how it judges fit, taught it to screen for work authorization, rebuilt the dashboard, deployed it to the cloud, and made it work for a user who isn't me, in the US or Canada."
      badge="Open source"
      stats={[
        { value: "46", label: "Commits in 2 months" },
        { value: "8,700+", label: "Lines added" },
        { value: "224", label: "Tests (app + scraper)" },
        { value: "1 → anyone", label: "Users it was built for" },
      ]}
      tech={[
        "Claude Code",
        "Next.js 16",
        "TypeScript",
        "Cloudflare Workers",
        "D1 (SQLite)",
        "Drizzle",
        "Python",
      ]}
      github="https://github.com/MikaIsmayilov/Job-Agent-Public"
    >
      <Section title="The problem">
        <BodyText>
          Job searching is mostly reading. Every posting means figuring out
          whether you really qualify, whether they&apos;ll sponsor you, and how
          to rewrite your resume for it. Do that twenty times a week and it
          becomes the whole job. Shortcuts make it worse: generic resumes,
          applications to roles you were never eligible for, and no idea which
          ones are going anywhere.
        </BodyText>
      </Section>

      <Section title="Where it started">
        <BodyText>
          In August 2026 a friend shared the job agent they&apos;d built for
          their own search, and I took it from there. It did one person&apos;s
          search well. Over the next two months I rebuilt how it decides, how it
          looks, where it runs, and who it&apos;s for.
        </BodyText>
      </Section>

      <Section title="I rewrote how it decides what's a good fit">
        <BodyText>
          The original scored jobs on keyword hits: mention &ldquo;SQL&rdquo;
          and you match. I replaced that with a scoring engine that reads the
          posting the way a recruiter does. It splits every job description into{" "}
          <strong>required qualifications, preferred qualifications, duties and
          boilerplate</strong>, then measures how many of the actual
          requirements your resume covers.
        </BodyText>
        <BodyText>
          Skills are weighted by how rare they are across real postings, so a
          niche skill counts for more than &ldquo;Excel&rdquo;. Every unmet
          requirement is listed on the job, so you can see why a score is a 62
          and not an 85.
        </BodyText>
      </Section>

      <Section title="I taught it who can legally take the job">
        <BodyText>
          For anyone on a visa, the worst application is one you were never
          eligible for. I built a work-authorization screen that finds
          citizenship requirements and &ldquo;no sponsorship&rdquo; language in
          the posting, quotes it back, and caps the score. It handles citizens,
          green-card holders, OPT and sponsorship cases in the US, and
          citizens, permanent residents, open work permits and LMIA
          sponsorship in Canada.
        </BodyText>
        <BodyText>
          Along the way I fixed the cases where it misread postings, like
          &ldquo;not able to provide visa sponsorship&rdquo; being counted as an
          offer of sponsorship.
        </BodyText>
      </Section>

      <Section title="I took it beyond the US">
        <BodyText>
          The original assumed one country everywhere: US job boards, US state
          codes, H-1B data, and a filter that threw out anything in Toronto. I
          moved all of that into a single per-country setting, so switching a
          search to Canada changes the job boards, the location rules, the
          visa signals and the eligibility rules together.
        </BodyText>
        <BulletList
          items={[
            "Location filtering knows provinces and states, keeps “Remote (United States | Canada)” for either side, and rejects postings from the other country.",
            "Regional company packs: opt into a curated list of employers by region. The Canada pack has 20 employers, each checked for live Canadian postings.",
            "Detects Canadian sponsorship language (“no LMIA”, citizenship-only roles) and stops showing H-1B hints on Canadian searches.",
            "Setup refuses to run if the profile and the scraper disagree on the country, so a Canada search can't quietly search the US.",
          ]}
        />
        <BodyText>
          I checked it against live postings from Geotab, Wealthsimple,
          1Password and Manulife: it kept the Canadian and Canada-eligible
          remote roles and rejected US-only ones, like a Manulife opening in
          Boston.
        </BodyText>
      </Section>

      <Section title="I built a “worth applying” view">
        <BodyText>
          A daily search finds far more postings than anyone can read. I built a
          view that keeps only jobs that are fresh, in your cities or remote, at
          your level, and free of blockers, with the freshest strong fits on
          top. Opening the dashboard turns into a 20-minute routine.
        </BodyText>
      </Section>

      <Section title="I rebuilt the dashboard from one page into a full app">
        <BodyText>
          The original was a single page. I rebuilt it into a triage inbox, an
          applications table, a response-rate funnel, follow-up reminders,
          interview and assessment tracking, dark mode and a phone layout, with
          URL-synced filters and keyboard shortcuts.
        </BodyText>
      </Section>

      <Section title="I took it to the cloud">
        <BodyText>
          I deployed it to Cloudflare Workers with a D1 database behind a login,
          connected the local agent to it through an authenticated API, and
          paged the bulk rescoring so it fits inside Workers&apos; limits. The
          dashboard works from my phone.
        </BodyText>
      </Section>

      <Section title="I made the inbox update itself">
        <BodyText>
          Recruiter replies move applications to Interview or Rejected
          automatically, from a cloud cron job with a local fallback. I audited
          the tracker against my real inbox, found it was missing most employer
          decisions, and fixed it. Anything ambiguous goes to a &ldquo;replies
          need you&rdquo; card instead of being guessed.
        </BodyText>
      </Section>

      <Section title="I made it work for anyone">
        <BodyText>
          A tool built around one person&apos;s resume is full of that person.
          To make it shareable, I:
        </BodyText>
        <BulletList
          items={[
            "Wrote an /onboard conversation where Claude reads your resume, turns it into structured facts, asks for your target roles, level, cities and work authorization, then scores a sample job per role so you can check the ranking before the first run.",
            "Moved every personal assumption into profile files, so scoring, filtering and eligibility work for any field and any visa status.",
            "Added Windows support and daily scheduling on Mac and Windows.",
            "Rebuilt the tests around a fictional candidate, so all 224 tests (125 app, 99 scraper) pass for whoever installs it.",
            "Removed every trace of personal data and wrote a README for people who don't code.",
          ]}
        />
      </Section>

      <Section title="Keeping it honest">
        <BodyText>
          It never invents anything. Tailored resumes and cover letters can only
          use facts from your structured resume, and each run is checked against
          them. I added a hard rule that every resume is rendered and checked to
          be exactly one page before it&apos;s marked ready. Visa and legal
          answers come only from what you said. You always click Submit.
        </BodyText>
      </Section>

      <Section title="What I'd do differently">
        <BulletList
          items={[
            "Build the profile layer first. Making it mine and then making it anyone's meant doing the work twice.",
            "Test the score against outcomes: which fit scores actually led to responses.",
            "Walk new users through their first tailored resume during onboarding, since that's where the value lands.",
          ]}
        />
      </Section>
    </CaseStudyLayout>
  );
}
