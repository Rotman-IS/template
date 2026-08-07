# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b (typecheck, project references) then vite build
npm run lint     # eslint .
npm run preview  # serve the production build
```

No test runner is configured. `npm run build` is the typecheck gate — run it (or `npx tsc -b`) after changes.

## Architecture

A single-page marketing/landing template. No router, no state library, no data fetching: `src/main.tsx` mounts `App`, and [App.tsx](src/App.tsx) composes `Header` + a fixed list of `<section>` components + `Footer` in document order. Adding a page section means creating a component under [src/components/sections/](src/components/sections/) and inserting it into that list.

Three component tiers:

- `components/ui/` — presentational primitives (`Button`, `Card`, `Input`, `Modal`, `Title`). Each renders a fixed BEM class and forwards native props via a `X-HTMLAttributes<...> & {...}` intersection type. All use default exports.
- `components/sections/` — one per page section. Each owns its content as a module-level `const` array (e.g. `plans` in [Pricing.tsx](src/components/sections/Pricing.tsx), `links` in [Header.tsx](src/components/layout/Header.tsx)); edit those arrays to change copy. Local `useState` only, never lifted.
- `components/layout/` — `Header` (sticky, anchor nav) and `Footer`.

### Styling

Plain CSS, no CSS modules, no utility framework. Exactly two stylesheets, both global:

- [src/index.css](src/index.css) — imported by `main.tsx`. Design tokens as CSS custom properties on `:root` (`--text`, `--bg`, `--accent`, `--border`, `--sans`, …) plus element-level base styles. Dark mode is a `@media (prefers-color-scheme: dark)` block that redefines the same tokens — new colors belong there in both blocks, not hardcoded in rules.
- [src/App.css](src/App.css) — imported by `App.tsx`. All component styling, organized by `/* ---------- Section ---------- */` comment banners.

Class names are BEM (`.card`, `.card__title`, `.btn--primary`) and live only in `App.css`; components never carry inline styles. Nav uses in-page `#hash` anchors against section `id`s with `scroll-behavior: smooth`.

### Conventions

- UI copy is in Spanish. Match it when adding sections or labels.
- TypeScript is strict-ish via [tsconfig.app.json](tsconfig.app.json): `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, and `verbatimModuleSyntax` — type-only imports must use `import type { ... }`.
- `eslint-plugin-react-refresh` (vite preset) is on: a module exporting a component must not also export non-component values, or HMR breaks.
- Icons live in [public/icons.svg](public/icons.svg) as `<symbol>` definitions (`#github-icon`, `#x-icon`, `#discord-icon`, …), referenced via `<use href="/icons.svg#name" />`. Currently unused by any component.

## OpenSpec

The repo uses the OpenSpec spec-driven workflow ([openspec/config.yaml](openspec/config.yaml), skills under `.claude/skills/`). **`openspec/specs/` is not empty — always read it before proposing.** Current capabilities:

- `invitacion-estructura` — composición de la página, contenedor de ancho móvil, landing anterior conservado en comentarios
- `invitacion-secciones` — una requirement por sección, más la regla de contenido genérico y editable
- `invitacion-placeholders` — primitivos `Photo` y `Ornamento`, y los símbolos de `public/icons.svg`
- `invitacion-estilo` — paleta lavanda sobre crema, tipografías, organización del CSS, ausencia de modo oscuro
- `cuenta-regresiva` — cuenta regresiva en vivo y su limpieza de intervalo

Un cambio que toque un componente ya cubierto casi siempre necesita un delta `## MODIFIED Requirements` sobre la capability existente, no solo una capability nueva. `config.yaml` tiene la sección `context:` vacía.
