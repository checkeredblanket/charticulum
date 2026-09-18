# Charticulum

**Charticulum** ("Chart Your Curriculum") — "The Visual Academic Planner." Domain: charticulum.com.

Core concept: academic institutions get consistency in how their curricula are represented; students get interactive visualization of their academic path through it.

## Current status (update this section as work progresses)

- Vite + React + TS + Tailwind 4 + React Flow scaffold is built and working (`src/App.tsx` renders a hardcoded 2-semester CS chart from `src/data/sampleChart.ts`). Verified: type-checks clean, Vite compiles without errors. Not yet visually confirmed in a real browser (no browser tool was available in that session — user needs to open `http://localhost:5173` and confirm).
- Git repo initialized locally on `main`. **Nothing committed yet.**
- In progress: connecting GitHub + Vercel + the `charticulum.com` domain.
  - Vercel CLI installed as a local dev dependency (run via `npx vercel`) — done, no sudo needed.
  - GitHub CLI (`gh`) — NOT yet installed (needs `sudo pacman -S github-cli`, requires the user's password, so the assistant can't run it).
  - Neither `gh auth login` nor `npx vercel login` has been run yet — both need the user to complete a browser-based login step.
  - Once both are authenticated, remaining steps: create the GitHub repo + push, `vercel link`/`vercel` to connect the project, then configure the `charticulum.com` domain in Vercel's dashboard and update DNS at the registrar.
- Hosting decision: Vercel only, end-to-end (frontend, serverless API, and Postgres via Vercel's own Postgres/storage product) — user explicitly declined pairing with a separate third-party DB provider like Neon directly.

## Foundational systems (full vision — not all in MVP scope, see below)

- **o_a (object-attribute)**: Objects (e.g. "courses," "classes") carry attributes — units, dependents (prereqs, concurrents), equivalents (mutually exclusive courses), availability, category satisfiers (gen-ed, department requirement, etc).
- **r_o_s_s (required objects/satisfactions by scope)**: charts (flowcharts) declare required Objects and satisfactions, scoped as either *global* (required in every chart) or *local* (required and varying within a specific chart).
- **v_c (version control)**: charts support branching (for concentrations/focus areas or different providers), with r_o_s_s enforcement flowing from master charts down to forks, and r_o_s_s merging from masters when forking (to combine charts, e.g. a double major). Includes a user management system that is not yet designed.
- **Institution integration**: web embeddability, and cross-institution Object transferability within chart r_o_s_s via equivalency (e.g. a course at one school counching as an equivalent at another).

## Functions

- `chart_builder` — enforces o_a and r_o_s_s rules when constructing a chart.
- `chart_visualizer` — interactive rendering of charts, built on chart_builder.
- `chart_builder` + `chart_visualizer` = `chart_engine`.
- `chart_styles` — lives in the chart_renderer, gives institutions consistent visual branding/styling.
- `chart_ai` — a customizable chatbot integrating o_a, r_o_s_s, v_c, and chart_engine to compare Objects/charts, fetch academic information, and generate charts.

## UI reference

Mockups live in `Context/VisualMockups.pdf` (PennState-branded examples) and the spec in `Context/Outline.pdf`. Key UI patterns shown:
- Term columns (Fall/Spring/etc, labeled with year) containing course node boxes (course code, name, unit-count badge), connected by arrows.
- Solid arrows = hard prerequisite; dotted arrows = concurrent/co-requisite.
- A "+" control at the end of the timeline to add a future term.
- Editing a course (e.g. swapping MATH 140→141, or moving CMPSC 132 to a different term) highlights it in red and shows cascading effects on dependents via dashed arrows.
- Merging two charts (e.g. Computer Science + Earth Sciences degree plans) into one, shown side-by-side with a "MERGE" control.
- Cross-institution course equivalency swap: e.g. PennState CMPSC 131 ↔ Harvard CS 50, substituting the equivalent course into a plan and updating institution branding/colors accordingly.

## Current build: MVP scope (2-week target, single builder, Claude Max)

Deliberately narrow. **In scope:** `chart_builder` + `chart_visualizer` only.
**Explicitly out of scope for MVP:** `v_c` (version control/branching/merging), `chart_ai`, auth/user accounts, multi-institution support.

**Chosen stack:** React + TypeScript, React Flow (for the chart canvas/node-graph UI), Tailwind CSS, Prisma ORM, Postgres, deployed on Vercel. Hosting decision: Vercel only — the user explicitly declined pairing it with a separate third-party Postgres provider (e.g. Neon directly), so the database should be provisioned through Vercel's own Postgres/storage offering rather than a separate account elsewhere.

Builder is a beginner programmer (self-described, learns quickly) — build guidance for this project should explain fundamentals as they come up (not just the unfamiliar libraries like React Flow/Prisma, but general concepts like terminal commands, npm, TypeScript syntax, async code, etc.), rather than assuming prior professional coding experience.

## Long-term vision (keep architecture flexible for this, but do not build it now)

- Universities and individual departments (department-level admins) manage charts / degree programs directly on Charticulum. When a new course is proposed, its curricular impact/addition can also be visualized.
- Broader ambition: Charticulum as the standard software for charting curricula across *all* levels of academic institutions — not just universities, but high schools, middle schools, and pre-schools. E.g. a parent visualizing how a child's progression through a private K-12 school leads to eventual degree paths.
- This cross-institution / cross-level proposal-and-progression functionality is expected to live in the not-yet-designed user management system (part of `v_c`).
- K-12 support is explicitly a large, long-term goal — not near-term scope — but should be kept in mind from the start so early architecture/data-model decisions (e.g. the o_a Object model, r_o_s_s scoping) don't foreclose scaling to it later.

## Data source notes

- Penn State's CourseLeaf bulletin exposes `/index.xml` for every course outline page — useful as a structured data source for seeding/importing course Objects (units, prereqs, etc.) for Penn State specifically.
