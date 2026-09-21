# Charticulum

**Charticulum** ("Chart Your Curriculum") — "The Visual Academic Planner." Domain: charticulum.com.

## Project outline (summary)

Academic institutions get consistency in how their curricula are represented; students get an interactive visualization of their academic path through it. Reference material: `docs/Outline.pdf` (spec) and `docs/VisualMockups.pdf` (PennState-branded mockups).

Foundational systems (full vision, not all in the MVP):
- **o_a (object-attribute)**: Objects (courses, classes) with attributes: units, dependents (prereqs, concurrents), equivalents (mutually exclusive), availability, category satisfiers (gen-ed, department requirement).
- **r_o_s_s (required objects/satisfactions by scope)**: charts declare required Objects and satisfactions, scoped *global* (every chart) or *local* (one chart).
- **v_c (version control)**: chart branching (concentrations, providers) with r_o_s_s flowing from master charts to forks and merging on fork (e.g. double major). Includes a not-yet-designed user management system.
- **Institution integration**: web embeddability and cross-institution equivalency of Objects.

Functions: `chart_builder` (enforces o_a and r_o_s_s rules), `chart_visualizer` (interactive rendering), together `chart_engine`; `chart_styles` (institution branding); `chart_ai` (customizable chatbot that compares, fetches, and generates charts).

Long-term (do not build now, but don't foreclose it in the data model): department-level admins managing charts, and support for all academic levels including K-12.

## Technologies

- **Frontend**: TypeScript, React, Vite, React Flow (`@xyflow/react`) for chart rendering, dagre or elkjs for auto-layout, Tailwind CSS / CSS variables for styling and theming.
- **Backend**: TypeScript. Start with Supabase's generated API; add a Node.js server (or Next.js/Remix) when server-side rule enforcement is needed. `chart_builder` rule logic lives in a framework-free TypeScript module shared by frontend and backend.
- **Database**: PostgreSQL via Supabase (or Neon), accessed with Drizzle or Prisma.
- **Auth**: Supabase Auth (or Clerk / Auth.js).
- **Hosting/tooling**: Vercel, GitHub, custom domain charticulum.com.
- **Testing**: Vitest.
- **Later**: Claude API (Anthropic SDK) for `chart_ai`; fast-xml-parser to seed Penn State course data from CourseLeaf `/index.xml`; iframe/web component for embedding.
