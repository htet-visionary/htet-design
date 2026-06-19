---
name: product-design
description: >-
  Design new Visionary product screens using content-first hierarchy, layout
  tokens, and theme-aware brand expression. Use when planning UI layouts,
  wireframes, screen flows, page structure, or when the user asks to design
  a screen, page, or feature within Lucky Charm, Dream Fund, or Visionary products.
---

# Product Design Skill (Visionary)

Teaches how to **design new screens** before implementation — structure, hierarchy, and token intent without visual mockups or code.

## Authority (read first)

1. `docs/design.md` — principles, layout, typography, themes
2. `.cursor/rules/frontend.mdc` — responsive layout rules
3. `.cursor/rules/brand.mdc` — brand, iridescence, theme separation
4. `.cursor/rules/accessibility.mdc` — contrast, touch targets, motion

## Design Principles (apply to every screen)

1. **Clarity before decoration** — user understands the screen in seconds
2. **Content first** — typography creates hierarchy; not color or shadows
3. **Emotion through simplicity** — warm, premium, restrained
4. **Consistency** — reuse patterns; max **three type levels** per screen
5. **Accessibility by default** — plan keyboard path, labels, focus, contrast upfront

Target feel: calm, premium, human, elegant, consistent, accessible.

## Screen Design Workflow

Copy and track progress:

```
Screen Design Progress:
- [ ] 1. Define user goal and primary action
- [ ] 2. Choose product theme (Lucky Charm | Dream Fund)
- [ ] 3. Structure content hierarchy (type levels)
- [ ] 4. Plan layout (mobile-first grid)
- [ ] 5. Assign semantic token intent per region
- [ ] 6. Select foundation components
- [ ] 7. Verify accessibility and theme rules
- [ ] 8. Document exceptions (hero/marketing only)
```

### Step 1: User goal

- One **primary action** per view section
- Secondary actions use accent, not competing primaries
- Destructive flows need explicit confirmation pattern (modal)

### Step 2: Theme

| Product | Primary | Accent | Highlight |
| --- | --- | --- | --- |
| Lucky Charm | green | lavender | iridescence (decorative) |
| Dream Fund | green | warning-toned | — |

Theme affects accent/branding only. Status colors (`status.*`) stay fixed across products.

### Step 3: Content hierarchy

| Level | Typography token | Font role |
| --- | --- | --- |
| Page title | `heading-md` or `heading-lg` | display |
| Section title | `heading-sm` | display |
| Body | `body` or `body-lg` | reading |
| Labels / UI chrome | `label`, `caption` | interface |

Long-form blocks: constrain to **65ch** max (60ch optimal). Headings may span wider.

Prefer **weight** over extra sizes for sub-hierarchy within a level.

### Step 4: Layout (mobile-first)

- Single column below `md` (768px)
- 12-column grid at `md+`; card spans in multiples of 3 or 4
- Page shell: `container.*` (xl default 1120px)
- Forms / articles: `content.narrow` (560) or `content.reading` (680)
- Section gaps: `spacing.8–12`; component gaps: `spacing.4–6`
- Max 2 nested grid levels

Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536 — no custom breakpoints.

### Step 5: Semantic token intent

Assign roles per screen region (not hex values):

| Region | Typical tokens |
| --- | --- |
| Page | `background.default` |
| Content panel | `surface.primary`, `border.subtle` |
| De-emphasized panel | `surface.secondary` |
| Primary CTA zone | `action.primary*` |
| Secondary actions | `action.accent*` |
| Status message | `status.{type}.*` |
| Modal layer | `overlay.scrim`, `surface.primary`, `elevation.modal` |

Do not use color purely as decoration. Every color choice must communicate meaning.

### Step 6: Foundation components

Prefer existing foundations from `docs/design.md`:

- **Button** — primary / secondary / destructive; one primary per section
- **Input** — visible label, helper below, error via `status.error.*`
- **Card** — grouped content; one primary action max; no nested elevation
- **Alert** — status only, not CTAs
- **Modal** — focus trap, scrim, single modal, destructive = cancel + confirm

Only introduce new components when foundations cannot compose the pattern.

### Step 7: Accessibility review

Before handoff to implementation:

- [ ] Keyboard path defined for all actions
- [ ] Every input has a visible label
- [ ] Touch targets ≥ 44px (48px preferred on mobile)
- [ ] Text/background pairings meet WCAG AA (4.5:1 body, 3:1 large UI)
- [ ] Focus ring uses `focus.ring` spec (2px, 2px offset)
- [ ] Motion plan includes `prefers-reduced-motion` fallback
- [ ] Alerts/modals: focus trap and return-focus documented

### Step 8: Marketing exceptions

Hero CTAs and celebration moments may use **iridescence** or gradients.

Allowed: hero, celebrations, premium highlights, marketing surfaces, storytelling.

Never: status states, body text, core actions, form errors.

Marketing treatments are exceptions — do not add new semantic tokens for them.

## Screen Output Template

Deliver screen designs as structured specs (not code):

```markdown
# [Screen Name] — [Product Theme]

## Goal
[Primary user outcome]

## Hierarchy
- Title: [typography token]
- [Section]: [typography token]
- Body: [typography token]

## Layout
- Mobile: [structure]
- md+: [grid spans, container token]

## Regions → Tokens
| Region | Surface / Text / Action tokens |

## Components
- [Component]: variant, role, notes

## Primary action
- [Button variant + token intent]

## Accessibility notes
- [Focus order, labels, touch targets, motion]

## Theme notes
- [Active theme overrides if any]
```

## Do Not

- Design with hardcoded colors, spacing, or type sizes
- Use iridescence for functional UI
- Mix theme accent into status/alert/error slots
- Stack multiple modals or competing primary buttons
- Rely on placeholder text as labels
- Create product-specific foundation tokens
