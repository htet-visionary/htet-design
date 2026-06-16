# Components

React components styled with design tokens. All use the `ds-*` BEM-style class prefix.

## Button

```tsx
import { Button } from "../../design-system";

<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="iridescent">Discover</Button>
<Button variant="ghost">Learn more</Button>
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | primary, secondary, iridescent, ghost | primary |
| `size` | sm, md, lg | md |
| `fullWidth` | boolean | false |

Primary uses Soft Green; iridescent applies the Golden Iridescence gradient with a soft glow on hover.

## Input

```tsx
import { Input } from "../../design-system";

<Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
<Input label="Name" error="Required field" />
```

Supports `label`, `hint`, and `error` with accessible `aria-*` wiring.

## Card

```tsx
import { Card } from "../../design-system";

<Card title="Rosemary" description="Fresh apothecary essentials." interactive />
<Card variant="accent">Custom content</Card>
```

Variants: `default`, `flat`, `accent`. Set `interactive` for hover lift.

## Navigation

```tsx
import { Navigation, Button } from "../../design-system";

<Navigation
  brand="Studio"
  items={[
    { label: "Home", href: "/", active: true },
    { label: "Work", href: "/work" },
  ]}
  actions={<Button size="sm">Contact</Button>}
/>
```

Minimal bar with Statice Purple active indicator. Links collapse on small screens.
