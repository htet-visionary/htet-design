# Tokens

Three-layer token architecture for consistent theming.

## Primitive

Raw values mapped 1:1 from foundations (`Tokens/Primitive/primitive.ts`):

- Color scales and gradients
- Font family, size, weight, line-height, letter-spacing
- Spacing, radius, elevation

## Semantic

Purpose-driven aliases (`Tokens/Semantic/semantic.ts`):

| Category | Examples |
| --- | --- |
| `background` | primary, secondary, tertiary, inverse |
| `surface` | default, raised, sunken, overlay |
| `text` | primary, secondary, tertiary, inverse, accent, link |
| `border` | default, subtle, strong, focus, accent |
| `action` | primary, secondary (+ hover/active) |
| `feedback` | success, warning, error, info |
| `accent` | iridescent gradient, softGreen, staticePurple |

## Component

Component-specific values (`Tokens/Component/component.ts`):

- **button** — variants: primary, secondary, iridescent, ghost
- **input** — padding, border, focus ring
- **card** — padding, shadow, hover elevation
- **navigation** — height, link colors, active indicator

## CSS custom properties

`tokens.css` exposes `--ds-*` variables for use in CSS. Import once at the app or route level.
