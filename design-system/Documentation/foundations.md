# Foundations

Raw design values that every token and component builds on.

## Colors

Five mood-board palettes with full scales where applicable:

- **Soft Green** (`palette.softGreen`) — sage primary, 50–900
- **Misty Grey** (`palette.mistyGrey`) — cool neutral, 50–900
- **White Rabbit** (`palette.whiteRabbit`) — warm off-white, 50–500
- **Statice Purple** (`palette.staticePurple`) — dusty accent, 50–900
- **Golden Iridescence** (`palette.goldenIridescence`) — gold, rose, lavender, sky

Gradients: `gradients.goldenIridescence`, `gradients.softGlow`

## Typography

| Style | Use |
| --- | --- |
| `display` | Hero headings (serif) |
| `heading1–3` | Section titles |
| `body` / `bodySmall` | Paragraph copy |
| `label` / `caption` | Form labels, metadata |

Font stacks: sans (Geist / DM Sans), display (Cormorant Garamond), mono (Geist Mono).

## Spacing

4px base unit. Key steps: `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px).

Generous padding keeps layouts airy — match the mood board's white space.

## Radius

Soft, bead-like corners: `lg` (12px) for inputs/buttons, `xl` (16px) for cards, `full` for pills.

## Elevation

Low-contrast, diffused shadows. Use `iridescent` for special hover states on accent elements.
