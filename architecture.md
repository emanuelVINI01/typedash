# Architecture Review

This codebase works, but the architecture is still weaker than it should be for a product that already has multiple pages, authentication, API routes, metrics, ranking, and localization.

## Why the architecture is bad today

1. Too much logic still lives in UI components.

Even after the recent cleanup, several components still decide data shape, formatting, colors, layout behavior, and interaction rules in the same file. That makes components harder to test, harder to reuse, and easier to break during visual changes.

2. Boundaries are inconsistent.

Some concerns already have a clear layer, like `useDashboardMetrics` and `src/utils/dashboard.ts`. Other concerns still mix page composition, domain rules, formatting rules, and fetch lifecycle in the same area. The project is halfway between a component-first prototype and a layered application.

3. Presentation rules are duplicated.

Color thresholds, table behavior, date formatting, repeated card structures, and action styles were duplicated in several places. This creates drift: one screen gets updated, another keeps the old rule, and the product starts behaving inconsistently.

4. The localization layer is centralized, but the dictionaries are still heavy.

The `i18n` structure is better than before, but the locale files are still large and serve many unrelated surfaces. As product copy grows, this will become harder to navigate and review. The current split is functional, not yet cleanly modular.

5. Styling is still too ad hoc.

There are many inline color values and local visual decisions spread across components. That makes design consistency dependent on discipline instead of structure. A product UI should rely more on reusable primitives or shared design tokens.

6. There is still historical layering debt.

The code shows signs of having grown feature by feature: ranking, dashboard, home, auth, and content were added at different moments with different patterns. The result is a mixed code style instead of a deliberate architecture.

## Why the code feels dirty

1. Files took on multiple responsibilities over time.

Large files were doing data fetching, state transitions, view composition, formatting, and small reusable subcomponents all together. Some of that has been reduced, but the codebase still carries the shape of earlier shortcuts.

2. Reuse was often local instead of systemic.

When the same rule appeared twice, it was often reimplemented inline instead of promoted to a shared util, hook, or presentational primitive. That is one of the main reasons the code felt scattered.

3. There is weak separation between product language and UI structure.

The product copy now lives in `i18n`, which is correct, but many screens still combine translation access, view-state rules, and formatting details directly in the component body.

4. Some abstractions arrived late.

The dashboard now has a clearer split. Ranking and result rendering only recently gained shared helpers. That means the current code is cleaner than before, but still not uniformly clean.

## What was corrected in this pass

1. Ranking fetch state was moved into `src/hooks/useRankingMetrics.ts`.
2. Ranking formatting rules were centralized in `src/utils/ranking.ts`.
3. Ranking position rendering was extracted into `src/components/main/RankingIndicator.tsx`.
4. Result stat card and chart tooltip were extracted from `ResultsScreen`.
5. `HistoryTable` no longer depends on inline hover handlers for basic row and button interaction.

## What should happen next

1. Split locale files by domain, for example `home`, `dashboard`, `ranking`, `auth`, and `about`.
2. Introduce shared UI primitives for section headers, empty states, and action buttons.
3. Move repeated visual tokens out of inline styles and into reusable component styles or theme tokens.
4. Audit dead code and old components that no longer match the current architecture.
5. Standardize each feature around the same pattern:
   - page for composition
   - hook for async state
   - utils for pure rules
   - small presentational components for rendering

## Bottom line

The project is no longer in the worst state it was before, but it is still carrying prototype-era decisions. The main issue is not one broken file. The real issue is inconsistent architectural discipline across features.
