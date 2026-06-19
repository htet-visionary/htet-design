---
name: design-system
description: >-
  Apply Visionary Design System tokens and architecture when building UI.
  Use when implementing components, choosing colors or spacing, mapping
  semantic tokens, setting up themes, or when the user mentions design tokens,
  docs/design.md, or the Visionary Design System.
---

# Visionary Design System Skill

Teaches token-first UI work aligned with the frozen spec and project rules.

## Authority (read first)

1. `docs/design.md` — source of truth (do not modify unless explicitly requested)
2. `.cursor/rules/design-system.mdc` — token enforcement
3. `.cursor/rules/brand.mdc` — themes and brand color rules

## Token Architecture

Four layers, downward flow only:

```
Primitive → Semantic → Component → Theme → Product UI
```

| Layer | Who uses it | Rule |
| --- | --- | --- |
| Primitive | Token definition files only | Never in product UI |
| Semantic | All UI | Purpose-driven roles |
| Component | Button, Input, Card, Alert, Modal | Maps semantic → parts |
| Theme | Product surface | Remaps existing slots only |

**Required chain:** UI → Theme (if active) → Component token → Semantic token → Primitive.

## Applying Semantic Tokens

Map UI intent to semantic roles — never to palette steps like `green.500` in product code.

| Intent | Token family |
| --- | --- |
| Page background | `background.default`, `background.subtle` |
| Panels / cards | `surface.primary`, `surface.secondary` |
| Body copy | `text.primary`, `text.secondary`, `text.muted` |
| Primary CTA | `action.primary`, `action.primary-hover`, `action.primary-active` |
| Secondary CTA | `action.accent`, `action.accent-hover` |
| Irreversible action | `action.destructive*` (not `status.error*`) |
| Inline links | `link.default`, `link.hover`, `link.visited` |
| Validation / feedback | `status.{type}.*` |
| Focus | `focus.ring`, `focus.ring-offset` |
| Disabled | `disabled.*` (not opacity hacks) |
| Text on solid fills | `text.on-solid`, `status.*.on-solid` |
| Modal backdrop | `overlay.scrim`, `overlay.scrim-light` |

## Component Token Slots

When building or extending Button, Input, Card, Alert, or Modal, assign every visual property to a **component token slot** defined in `docs/design.md` Component Foundations.

Component tokens reference semantic tokens only — never primitives.

If a property has no slot, propose a spec change before inventing a value.

## Theme Overrides

Themes express product personality without forking foundations.

**May override:** `brand.*`, `action.accent*`, `action.primary*` (caution), decorative highlights.

**Must not override:** `status.*`, `disabled.*`, `focus.*`, `overlay.*`, functional scales.

Products: **Lucky Charm** (lavender accent, iridescence highlight), **Dream Fund** (warning-toned accent).

When accent uses a status palette (Dream Fund), accent is for branding/secondary actions only — alerts and form errors always use `status.*`.

Load one theme per product surface. Document every override in the theme definition.

## Forbidden Values in Product UI

Never hardcode:

- Colors (`#`, `rgb`, `hsl`, `rgba`)
- Spacing outside `spacing.*`
- Radius outside `radius.sm|md|lg|xl|pill`
- Shadows outside `elevation.card|dropdown|modal`
- Typography outside `typography.*` scale steps
- Z-index outside `elevation.*` scale
- Motion outside `motion.duration.*` and `motion.easing.*`

New foundation values require spec approval.

## Decision Workflow

When choosing a token:

1. Identify **purpose** (action, status, surface, text, interaction)
2. Pick **semantic** token for that purpose
3. If building a foundation component, map to **component** slot
4. Apply active **theme** override if the slot is in theme scope
5. Verify contrast (WCAG AA) for new pairings

## Quick Checklist

- [ ] No primitives or hardcoded values in UI
- [ ] Semantic role matches purpose (not decoration)
- [ ] Component uses component token slots
- [ ] Theme overrides documented and scoped correctly
- [ ] Status vs brand vs destructive roles are not mixed
- [ ] Iridescence only on allowed marketing/hero surfaces
