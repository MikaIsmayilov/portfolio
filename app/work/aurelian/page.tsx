import type { Metadata } from "next";
import CaseStudyLayout, {
  Section,
  BodyText,
  BulletList,
  Figure,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Aurelian — Mika Ismayilli",
  description:
    "An AI stylist that knows your wardrobe. React + Supabase + Claude, with weather-aware packing, gap analysis, and Stripe billing. Solo build, private beta.",
};

export default function Aurelian() {
  return (
    <CaseStudyLayout
      title="Aurelian"
      oneliner="An AI stylist that actually knows your wardrobe. Photograph your clothes and it catalogs them, finds what's missing, plans what to pack for a trip, and answers style questions with your real closet as context."
      badge="Private beta"
      stats={[
        { value: "11", label: "Edge functions" },
        { value: "18", label: "DB migrations" },
        { value: "470+", label: "Commits" },
        { value: "58", label: "Automated tests" },
      ]}
      tech={[
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind",
        "Supabase",
        "Postgres + RLS",
        "Deno Edge Functions",
        "Claude Haiku 4.5",
        "Open-Meteo",
        "Stripe",
      ]}
      demo="https://aurelianfits.lovable.app"
      demoLabel="Early prototype"
    >
      <Section title="Why I'm building this">
        <BodyText>
          Aurelian is the project I work on when I&apos;m supposed to be doing
          something else. It started as a frustration: style advice is
          overwhelmingly generic. &ldquo;Dress for your body type&rdquo;
          ignores what you actually own, where you&apos;re going, what the
          weather is, and the fact that most people can&apos;t describe what
          they&apos;re going for.
        </BodyText>
        <BodyText>
          The bet is that an assistant becomes useful the moment it knows your
          closet. So the product is built around a structured wardrobe first,
          and every AI feature reads from it.
        </BodyText>
        <Figure
          src="/work/aurelian-landing.jpg"
          alt="Aurelian landing page: 'Your wardrobe. Reinvented by AI.' with Start for Free and See How It Works buttons on a dark gold background."
          caption="Aurelian · landing page of the current build · React 19 + Tailwind, no component library"
          width={1456}
          height={822}
        />
      </Section>

      <Section title="What it does">
        <BulletList
          items={[
            "Wardrobe capture — upload a photo and Claude's vision model proposes the category, color, name, and tags. Nothing is saved until you confirm or correct it; wrong auto-tags would poison everything downstream.",
            "Style profile — skin tone, color palette, style archetypes, occasion mix, and budget, persisted and passed as context to every stylist call.",
            "Gap analyzer — three kinds of gap: categories you don't own at all, items with nothing to pair them with, and occasions you have nothing for.",
            "Trip planner — destination and dates pull a forecast from Open-Meteo; the planner builds a packing list from your own wardrobe and day-by-day outfits to match the weather and itinerary.",
            "Stylist chat — streamed answers to free-form questions, grounded in the wardrobe, weather-aware, and available in multiple languages.",
            "Shop — curated purchase suggestions grounded in the gaps it found, across budget tiers, with retailer deep-links.",
          ]}
        />
      </Section>

      <Section title="How it's built">
        <BodyText>
          The frontend is React 19 + TypeScript on Vite and Tailwind, with no
          component library. Supabase provides auth, Postgres with row-level
          security on every table, storage for photos, and Deno edge functions.
        </BodyText>
        <BulletList
          items={[
            "Every AI call goes through an edge function that verifies the user's JWT, loads their wardrobe from the database, and proxies to Claude. The API key never reaches the browser.",
            "Billing runs on Stripe with tiers and monthly credits. Credits are reserved and released through atomic Postgres RPCs, so a failed model call refunds automatically instead of silently charging.",
            "A lexical test reads every gated function's source and asserts the tier check precedes every model call — not just the first one. It sits in a 58-test deterministic suite that needs no API key or network.",
            "Prompt caching on the shared system prompt keeps the per-message cost of a wardrobe-aware chat low enough for a free tier to exist.",
          ]}
        />
        <Figure
          src="/work/aurelian-pricing.jpg"
          alt="Aurelian pricing table: Free, Pro, and Premium tiers with wardrobe item limits, AI stylist credits, and feature availability per tier."
          caption="The tier matrix the billing gate enforces · Free is credit-limited, Pro and Premium are unlimited · every row here maps to a server-side check"
          width={1036}
          height={540}
        />
      </Section>

      <Section title="Things that went wrong, and got fixed">
        <BulletList
          items={[
            "Postgres' default PUBLIC grant meant the billing RPCs were still callable by anonymous and authenticated roles even after revoking their explicit grants — a user could have self-granted a tier. A privilege probe caught it; a migration now revokes from PUBLIC and re-grants only the service role.",
            "A failed stylist call persisted the user's turn without a reply, which broke the strict user/assistant alternation the model API requires on the next retry. Fixed in the history builder.",
            "The gap analyzer was truncating at its token ceiling and surfacing as a 503. The fix was a higher ceiling plus a brevity rule in the prompt — cheaper than it sounds once you measure it.",
          ]}
        />
      </Section>

      <Section title="Status">
        <BodyText>
          Ten of thirteen planned phases are shipped as of July 2026, including
          the live billing checkout-to-tier flow, which passed an end-to-end
          test on real Stripe test mode. The current phase adds weather
          awareness and multi-language output across all four AI features.
          Next is friend-and-family beta. The code is private for now; the
          early concept prototype linked above predates this codebase and shows
          the idea, not the architecture.
        </BodyText>
        <BodyText>
          Happy to walk through the architecture or the billing gate design in
          detail — it&apos;s the part I&apos;m proudest of.
        </BodyText>
      </Section>
    </CaseStudyLayout>
  );
}
