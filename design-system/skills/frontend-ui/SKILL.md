---
name: frontend-ui
description: >-
  Build reusable Visionary UI components and screens with semantic tokens,
  component foundations, accessibility, and theme support. Use when
  implementing components, styling UI, refactoring hardcoded values, or
  wiring theme overrides in frontend code.
---

# Frontend UI Skill (Visionary)

Teaches how to **build reusable components** and wire screens using tokens — not one-off styles.

## Authority (read first)

1. `docs/design.md` — Component Foundations, Motion, Elevation, Layout
2. `.cursor/rules/design-system.mdc` — token layers and forbidden values
3. `.cursor/rules/frontend.mdc` — layout, typography, motion
4. `.cursor/rules/accessibility.mdc` — WCAG, focus, touch, reduced motion
5. `.cursor/rules/brand.mdc` — themes and accent vs status
6. `skills/design-system/SKILL.md` — token decision workflow

## Build Workflow

```
Component Build Progress:
- [ ] 1. Confirm component exists in spec or extends a foundation
- [ ] 2. Map every visual property to component → semantic tokens
- [ ] 3. Implement all interaction states
- [ ] 4. Wire theme override resolution
- [ ] 5. Meet accessibility requirements
- [ ] 6. Add responsive behavior (mobile-first)
- [ ] 7. Audit for hardcoded values
```

## Reusable Component Rules

1. **Token-only styling** — consume component or semantic tokens; zero hardcoded design values
2. **Composable** — accept children/slots; avoid layout assumptions that break reuse
3. **Variant-driven** — behavior via props (`primary`, `destructive`, `disabled`), not duplicate components
4. **State-complete** — default, hover, active, focus-visible, disabled, error (where applicable)
5. **Theme-agnostic internals** — components read resolved tokens; they do not embed product theme logic
6. **Spec-aligned** — foundation components (Button, Input, Card, Alert, Modal) follow `docs/design.md` slots exactly

## Foundation Component Reference

### Button

| Variant | Key tokens |
| --- | --- |
| Primary | `action.primary*`, `text.on-solid`, `radius.md`, `spacing.3/4`, `label` |
| Secondary | `action.accent*`, `border.accent`, `background.subtle` on hover |
| Destructive | `action.destructive*` — requires confirmation for irreversible actions |
| Disabled | `disabled.*` — no pointer events |

Shared: `min-height` = touch-target minimum (44px).

### Input

Tokens: `surface.primary`, `text.primary`, `text.muted` (placeholder), `border.subtle|strong`, `focus.ring`, `status.error.*` (errors), `disabled.*`.

Rules: visible label, helper below field, disabled not focusable, errors use status not destructive.

### Card

Tokens: `surface.primary|secondary`, `border.subtle`, `text.primary|secondary`, `radius.lg`, `spacing.6`, `elevation.card`.

Rules: one primary action max, no nested elevated cards.

### Alert

Tokens: `status.{type}.background|border|text|icon`, `radius.md`, `spacing.4`, `body`.

Rules: status communication only; dismissible needs accessible close; never use alert colors for buttons.

### Modal

Tokens: `surface.primary`, `overlay.scrim`, `elevation.modal`, `content.narrow` max-width, focus trap.

Rules: one modal at a time, return focus on close, destructive = explicit cancel + confirm.

## Interaction States

Every interactive component implements:

| State | Token source |
| --- | --- |
| Default | component / semantic base |
| Hover | `*-hover` semantic tokens |
| Active | `*-active` where defined |
| Focus-visible | `focus.ring`, `focus.ring-offset` — 2px solid, 2px offset |
| Disabled | `disabled.*` — not opacity |
| Error (inputs) | `status.error.*` |

Use `:focus-visible`, not `:focus` alone.

## Theme Override Resolution

Resolve at build or runtime **before render**:

```
1. Load active theme (one per product surface)
2. Apply theme overrides to allowed slots only
3. Component reads final resolved token values
4. Never branch component logic on product name
```

Themes remap slots — they do not add component keys or primitive scales.

Dream Fund accent ≠ warning status: secondary buttons may use accent; alerts always use `status.warning.*`.

## Responsive Implementation

- Mobile-first CSS / layout
- Collapse to single column below `md`
- Use `spacing.*` for gutters (`spacing.4` / `spacing.6` / `spacing.8`)
- Container tokens for page width; content tokens for narrow forms
- Icon-only controls: 44px minimum hit area

## Motion

- Enter: `motion.duration.normal` + `motion.easing.enter` on opacity/transform
- Exit: `motion.duration.fast` + `motion.easing.exit`
- Do not animate width, height, or top unless required

**Reduced motion** (`prefers-reduced-motion: reduce`):

- Durations → `motion.duration.instant`
- Opacity fade only, max 100ms for modal/alert
- No scale, slide, parallax, pulse, or bounce

## Accessibility Implementation

Minimum WCAG 2.1 AA:

- Contrast: 4.5:1 body text, 3:1 large text/UI, 4.5:1 on-solid text
- Keyboard: all actions reachable; logical tab order
- Labels: `htmlFor` / `aria-label` where needed; no placeholder-only labels
- Modals: `role="dialog"`, focus trap, `aria-modal`, return focus
- Alerts: `role="alert"` or `aria-live` as appropriate
- Touch: 44px min targets, `spacing.2` between adjacent targets

## Extending the System

When a new reusable component is needed:

1. Check if Button, Input, Card, Alert, Modal compose the pattern
2. Define component token slots referencing semantic tokens only
3. Propose spec addition to `docs/design.md` before shipping ad-hoc values
4. Never add product-specific names to shared token keys

## Pre-Ship Audit

Scan implementation for violations:

- [ ] No `#`, `rgb`, raw `px` for spacing/radius/type/z-index/shadows
- [ ] No primitive palette references in UI layer
- [ ] All states use token slots
- [ ] Theme overrides scoped correctly
- [ ] Focus, disabled, and error patterns correct
- [ ] Reduced motion handled
- [ ] Responsive from mobile-first breakpoints in spec

## Do Not

- Hardcode design values or invent one-off tokens
- Skip semantic layer (primitive → UI)
- Embed Lucky Charm / Dream Fund logic inside shared components
- Use `status.error` for destructive buttons
- Use theme accent in alert or validation slots
- Remove focus indicators
- Ship animation without reduced-motion fallback
