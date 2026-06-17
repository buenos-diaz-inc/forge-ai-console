# Forge AI · Console

A vibe-coded demo app for early Soffi users — the product surface of **Forge AI**, a
fictional ML development platform (models, datasets, experiments, deployments). It exists as a
realistic, design-rich playground for Soffi's visual editor: AST inspector, React-fiber probing,
and the class-driven theme system.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v3** with class-based dark mode
- **Semantic tokens** as CSS custom properties — every color, border, type ramp, radius, and
  shadow is editable from the Soffi UI
- **class-variance-authority** for typed component variants (Soffi's AST inspector reads these
  to populate the props panel)
- **Storybook 8** for component documentation
- **Nivo** charts + **AG Grid** data tables, both bound entirely to the token layer
- **lucide-react** icons

## Run

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm storybook        # http://localhost:6006
pnpm lint             # app lint checks
pnpm build            # production build
pnpm build-storybook  # static Storybook build
```

## Routes

| Route                  | What it is                                                          |
| ---------------------- | ------------------------------------------------------------------ |
| `/`                    | Dashboard · KPIs, training trends, utilization, model radar, feed  |
| `/models`              | Model registry · sortable AG Grid, click through to detail         |
| `/models/[id]`         | Model detail · Overview / Versions / Metrics tabs                  |
| `/datasets`            | Dataset catalog · grid with type, records, status                  |
| `/datasets/[id]`       | Dataset detail · Preview / Statistics / Info tabs                  |
| `/experiments`         | Training runs · grid with live progress bars                       |
| `/experiments/[id]`    | Experiment detail · loss/accuracy curves, hyperparameters          |
| `/deployments`         | Endpoints · health KPIs + grid with latency/uptime thresholds      |
| `/deployments/[id]`    | Deployment detail · traffic + performance charts                   |
| `/settings`            | Profile / Team / API Keys / Notifications / Billing                |

## Design system

### Semantic tokens (`app/globals.css`)

Every visual value is a CSS custom property defined on `:root` and overridden on `.dark`.
The theme is **class-driven** — toggle `class="dark"` on `<html>` (by any means, including the
Soffi editor) and the whole UI flips.

```css
:root  { --bg-canvas: 160 20% 98%; --accent: 154 43% 29%; ... }   /* Forge forest green */
.dark  { --bg-canvas: 156 22% 7%;  --accent: 150 48% 52%;  ... }
```

Token groups: surfaces (`bg-*`), foreground (`fg-*`), borders (`border-*`), accent, status
(`success` / `warning` / `danger` / `info`), an 8-color categorical **chart palette**
(`--chart-1…8`), radii, the typography ramp, and shadows.

Tailwind consumes them via `theme.extend` in [`tailwind.config.ts`](tailwind.config.ts), so
`bg-bg-surface`, `text-fg-primary`, `border-border`, `text-accent-strong`, `bg-chart-1`, etc.
all resolve to the live CSS variables (with `<alpha-value>` support).

The Nivo charts and AG Grid read the **same** tokens at runtime (see
`components/charts/use-nivo-theme.ts`), so editing one variable recolors the charts, the grid,
and the rest of the UI together — in both themes.

### Components (CVA)

Each primitive uses [class-variance-authority](https://cva.style/) so Soffi's AST inspector can
extract the variant options:

| Component     | File                                      | Variants                                                  |
| ------------- | ----------------------------------------- | --------------------------------------------------------- |
| `Button`      | `components/ui/button.tsx`                | `variant`, `size`, `fullWidth`, `loading`                 |
| `Card`        | `components/ui/card.tsx`                   | `variant`, `padding`, `radius`, `tone`, `interactive`     |
| `Badge`       | `components/ui/badge.tsx`                  | `variant`, `size`, `shape`, `interactive`, `dot`          |
| `Input`       | `components/ui/input.tsx`                  | `variant`, `size`                                         |
| `Avatar`      | `components/ui/avatar.tsx`                 | `size`, `shape`, `tone`, `ring`, `interactive`, `status`  |
| `Tabs`        | `components/ui/tabs.tsx`                   | `variant` (underline / pill / segmented)                  |
| `Table`       | `components/ui/table.tsx`                  | `density`, `variant`                                      |
| `Progress`    | `components/ui/progress.tsx`              | `size`, `tone`                                            |
| `Separator`   | `components/ui/separator.tsx`             | `orientation`, `tone`                                     |
| `Sparkline`   | `components/ui/sparkline.tsx`             | `tone`, `size`, `fillArea`                                |
| `StatCard`    | `components/ui/stat-card.tsx`             | `layout`, `align`, `tone`, `trend`, `surface`             |
| `StatusBadge` | `components/ui/status-badge.tsx`          | `tone`, `size`, `pulse`                                   |
| `EmptyState`  | `components/ui/empty-state.tsx`           | `size`, `tone`                                            |
| `Sidebar`     | `components/layout/sidebar.tsx`           | `width`                                                   |
| `Topbar`      | `components/layout/topbar.tsx`            | `density`                                                 |
| `PageHeader`  | `components/layout/page-header.tsx`       | `size`, `align`                                           |

All variant props are **typed unions** (via `VariantProps<typeof xxxVariants>`) so:

1. TypeScript autocompletes them at the JSX call site
2. Soffi's AST inspector extracts the TS union in Phase 2
3. Soffi's CVA extractor reads the `cva()` config in Phase 3

Components are plain function / `forwardRef` components with explicit `displayName`s, so Soffi's
React-fiber walk resolves each element to its component name, file, and line.

### Layout philosophy

Everything sits inside flexboxes wherever practical — pages compose with `flex flex-col gap-*`
and rows with `flex items-center gap-*` (plus `grid` for tile/KPI rows), so Soffi users can
re-order and re-arrange sections from the editor.

## Theming

```ts
// Anywhere in client code:
document.documentElement.classList.toggle("dark");
```

The `ThemeToggle` in the top bar wraps that one line via a small `ThemeProvider` context (the
context only mirrors the class into React state so the charts can recolor reactively — the
`.dark` class is still the single source of truth).

## Storybook

Stories live in `stories/*.stories.tsx`, one per primitive, titled `UI/<Component>`. Each
story's `argTypes` enumerate the component's CVA variant options, and a Storybook theme toolbar
toggles the `.dark` class so token edits preview in both themes. Story filenames match the
component name (e.g. `Button.stories.tsx`) so Soffi's `manifest.ts` can map component → story.

> **Builder note:** this app uses the **`@storybook/react-vite`** framework rather than
> `@storybook/nextjs`. The webpack-based Next.js builder for Storybook 8.x currently crashes
> against Next 15's bundled webpack (`Cannot read properties of undefined (reading 'tap')` —
> [storybookjs/storybook#32301](https://github.com/storybookjs/storybook/issues/32301)). The
> Vite builder sidesteps it, builds in seconds, and the story files are unchanged
> (`@storybook/react` imports). The `@/*` path alias is wired up in
> [`.storybook/main.ts`](.storybook/main.ts) via `vite-tsconfig-paths`. All UI primitives are
> framework-agnostic, so no Next-specific story support is needed.

## Notes for Soffi users

- **Drag-rearrange-friendly:** dashboards are built from flexbox sections you can re-order.
- **One token, everywhere:** every color in the UI — including charts and the data grid — traces
  back to a single variable in `app/globals.css`. Change one, see it propagate.
- **Adding a variant:** extend the `cva()` config in the component file; Soffi picks up the new
  option on the next AST inspect.
