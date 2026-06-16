# Design System

A calm, organic design language inspired by soft textures, dried florals, and iridescent light.

## Mood board

The visual identity draws from five core swatches:

| Name | Role |
| --- | --- |
| **Soft Green** | Primary actions, focus states, success |
| **Misty Grey** | Text, borders, neutral surfaces |
| **White Rabbit** | Backgrounds and elevated surfaces |
| **Statice Purple** | Accent, secondary actions, active nav |
| **Golden Iridescence** | Gradients, hover glow, special highlights |

## Structure

```
design-system/
├── Foundations/   Raw values (colors, type, spacing, radius, elevation)
├── Tokens/        Primitive → Semantic → Component layers
├── Components/    React UI building blocks
└── Documentation/ Markdown guides (this folder)
```

## Usage

1. Import CSS tokens in your app entry or route layout:

   ```tsx
   import "../../design-system/tokens.css";
   ```

2. Import components and tokens from the package root:

   ```tsx
   import { Button, palette, semantic } from "../../design-system";
   ```

3. Apply the `ds-*` CSS classes or use component tokens for custom styling.

## Principles

- **Soft over sharp** — generous radius, diffused shadows, airy spacing
- **Organic palette** — muted sage, dusty purple, warm off-white
- **Whimsical accents** — iridescent gradients for delight, not decoration overload
