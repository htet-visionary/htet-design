---
version: beta

name: Visionary Design System

description: |
  Visionary Design System is the unified design language
  for all Visionary products.

  It provides a consistent foundation for design,
  engineering, branding, and product development.

  Products may express their own personality through themes,
  but all products share the same foundations,
  interaction patterns,
  accessibility standards,
  and visual principles.

products:

  - Lucky Charm
  - Dream Fund
  - Future Products

---

# Principles

## Clarity Before Decoration

Users should understand a screen within seconds.

Content, hierarchy, and interaction always come before visual decoration.

---

## Emotion Through Simplicity

Interfaces should feel warm and memorable without becoming noisy.

Use restraint.

Avoid unnecessary visual complexity.

---

## Consistency Over Customization

Patterns should repeat.

Users should never have to relearn the interface.

---

## Accessibility By Default

Accessibility is not optional.

Every component must support:

* keyboard navigation
* focus states
* color contrast
* screen readers

---

## Content First

Typography is the primary tool for hierarchy.

Do not rely on color, borders, or shadows to create structure.

---

# Token Architecture

Visionary uses a four-layer token model.

Each layer has a single responsibility.

Tokens flow downward only.

Themes may override semantic and component tokens.

Themes must never modify primitive or foundation values.

---

## Layer Overview

```
Primitive → Semantic → Component → Theme
```

| Layer | Purpose | May Reference |
| --- | --- | --- |
| **Primitive** | Raw palette values. No UI meaning. | Nothing |
| **Semantic** | Purpose-driven UI roles. Product-agnostic. | Primitives |
| **Component** | Component-specific assignments. | Semantic |
| **Theme** | Product personality overrides. | Semantic, Component |

---

## Primitive Tokens

Primitive tokens store raw values.

They describe color, type, space, radius, motion, and layout numbers.

They do not describe usage.

Examples:

* `green.500`
* `spacing.4`
* `radius.md`
* `motion.duration.normal`

Do not use primitive tokens directly in product UI.

---

## Semantic Tokens

Semantic tokens assign meaning to primitives.

They describe roles such as background, text, action, and status.

All product UI should consume semantic tokens or component tokens.

Semantic tokens are shared across all Visionary products.

Examples:

* `background.default`
* `text.primary`
* `action.primary`
* `status.error.text`

---

## Component Tokens

Component tokens map semantic roles to specific components.

They define what a button, input, or card consumes.

Component tokens prevent one-off values inside component implementations.

Examples:

* `button.primary.background`
* `input.border.focus`
* `alert.error.icon`

Component tokens reference semantic tokens only.

They must not reference primitives directly.

---

## Theme Tokens

Theme tokens override semantic or component assignments for a product.

They express brand personality without forking foundations.

Themes remap existing token slots.

They do not introduce new primitive scales.

Examples:

* `theme.action.accent` → remaps `semantic.action.accent`
* `theme.brand.highlight` → optional decorative reference for marketing surfaces

Product themes live outside foundations.

---

## Token Naming Rules

* Use dot notation: `layer.category.role`
* Use kebab-case for multi-word roles: `primary-hover`
* State suffixes: `default`, `hover`, `active`, `focus`, `disabled`
* Never encode product names in primitive or semantic tokens
* Never hardcode hex values outside the primitive layer

---

## Consumption Rules

```
✓  Component → Component Token → Semantic Token → Primitive
✓  Product UI → Theme override (when active) → Semantic / Component
✗  Product UI → Primitive
✗  Theme → new Primitive scale
✗  Component → Primitive (skip semantic)
```

---

# Foundations

## Color Philosophy

Color communicates meaning.

Do not use color purely as decoration.

Every color must have a purpose.

---

# Primitive Colors

colors:

  green:
    50: "#F6F8F5"
    100: "#EAF0E7"
    200: "#D9E3D4"
    300: "#C3D2BC"
    400: "#92AA89"
    500: "#5C7B56"
    600: "#4A6345"
    700: "#3C5138"
    800: "#2E3F2B"
    900: "#1E2B1C"

  lavender:
    50: "#F8F4FC"
    100: "#F0E9F8"
    200: "#E1D3F1"
    300: "#CCB6E5"
    400: "#AF8FD4"
    500: "#8E6FAD"
    600: "#775A97"
    700: "#61497C"
    800: "#4C3960"
    900: "#32253F"

  iridescence:
    50: "#FDFCFB"
    100: "#F7F4FA"
    200: "#F0EBF7"
    300: "#E5DDF2"
    400: "#D8CDEA"

  neutral:
    0: "#FFFFFF"
    50: "#FAFAFA"
    100: "#F5F5F5"
    200: "#E5E5E5"
    300: "#D4D4D4"
    400: "#A3A3A3"
    500: "#737373"
    600: "#525252"
    700: "#404040"
    800: "#262626"
    900: "#171717"

---

# Functional Colors

success:
  50: "#F6F8F5"
  100: "#E1E8DD"
  200: "#C7D6C1"
  300: "#A7BEA0"
  400: "#87A37D"
  500: "#66835D"
  600: "#58774F"
  700: "#48633F"
  800: "#334B30"
  900: "#152417"

warning:
  50: "#FCF8EF"
  100: "#F4EBCF"
  200: "#EBDCA6"
  300: "#DFC87A"
  400: "#D2B34E"
  500: "#C0A136"
  600: "#A88729"
  700: "#80631F"
  800: "#624714"
  900: "#3E2A0C"

error:
  50: "#FCF5F6"
  100: "#F4E1E3"
  200: "#E7C8CA"
  300: "#D8A5A8"
  400: "#C77D81"
  500: "#BF5B60"
  600: "#A9494D"
  700: "#853639"
  800: "#642426"
  900: "#3F1516"

info:
  50: "#F5F7F9"
  100: "#E4EDF3"
  200: "#CEDDE8"
  300: "#AEC4D6"
  400: "#8EAABE"
  500: "#7193AD"
  600: "#5E7F9D"
  700: "#4B6683"
  800: "#344D67"
  900: "#162631"

---

# Semantic Colors

semantic:

  background:
    default: neutral.50
    subtle: neutral.100

  surface:
    primary: neutral.0
    secondary: neutral.50
    elevated: neutral.0

  text:
    primary: neutral.800
    secondary: neutral.600
    muted: neutral.500
    inverse: neutral.0
    on-solid: neutral.0

  brand:
    default: green.500
    accent: lavender.500

  border:
    subtle: neutral.200
    strong: neutral.300
    brand: green.200
    accent: lavender.200

  action:
    primary: green.500
    primary-hover: green.600
    primary-active: green.700
    accent: lavender.500
    accent-hover: lavender.600
    accent-active: lavender.700
    destructive: error.600
    destructive-hover: error.700
    destructive-active: error.800

  link:
    default: green.600
    hover: green.700
    visited: lavender.700

  focus:
    ring: green.500
    ring-offset: neutral.0

  disabled:
    background: neutral.100
    surface: neutral.100
    border: neutral.200
    text: neutral.400
    icon: neutral.400

  overlay:
    scrim: "rgba(36, 31, 27, 0.48)"
    scrim-light: "rgba(36, 31, 27, 0.24)"

  status:
    success:
      background: success.50
      surface: success.100
      border: success.200
      text: success.800
      icon: success.600
      solid: success.600
      solid-hover: success.700
      on-solid: neutral.0

    warning:
      background: warning.50
      surface: warning.100
      border: warning.200
      text: warning.800
      icon: warning.600
      solid: warning.600
      solid-hover: warning.700
      on-solid: neutral.0

    error:
      background: error.50
      surface: error.100
      border: error.200
      text: error.800
      icon: error.600
      solid: error.600
      solid-hover: error.700
      on-solid: neutral.0

    info:
      background: info.50
      surface: info.100
      border: info.200
      text: info.800
      icon: info.600
      solid: info.600
      solid-hover: info.700
      on-solid: neutral.0

---

## Semantic Token Rules

**Focus**

* Use `focus.ring` and `focus.ring-offset` for all interactive focus states.
* Do not invent per-component focus colors.

**Disabled**

* Disabled elements must use `disabled.*` tokens.
* Do not reduce opacity as a substitute for disabled tokens.

**Link**

* Inline text links use `link.*` tokens.
* Navigation links that behave as actions use `action.*` or component button tokens.

**Overlay and Scrim**

* `overlay.scrim` covers modal and dialog backdrops.
* `overlay.scrim-light` covers non-blocking overlays such as drawers on large screens.

**On-Solid**

* Text and icons on solid fills use `text.on-solid` or `status.*.on-solid`.
* Do not use `text.primary` on solid action or status backgrounds.

**Destructive Actions**

* Destructive buttons and irreversible confirmations use `action.destructive*`.
* Destructive actions are not the same as error status surfaces.
* Error status communicates state. Destructive action invites harm.

---

# Accessibility Standards

Accessibility requirements apply to every token and component.

---

## WCAG AA

All Visionary products target **WCAG 2.1 Level AA** as the minimum standard.

### Contrast Requirements

| Pairing | Minimum Ratio |
| --- | --- |
| Body text on background | 4.5:1 |
| Large text (18px+ regular, 14px+ bold) on background | 3:1 |
| UI components and graphical objects | 3:1 |
| Focus indicator against adjacent colors | 3:1 |
| Text on solid action backgrounds | 4.5:1 |
| Text on solid status backgrounds | 4.5:1 |

Validate semantic pairings before release.

Do not ship new token combinations without contrast verification.

---

## Focus Ring Specification

All interactive elements must expose a visible focus indicator.

focus-ring:

  width: 2px
  style: solid
  color: focus.ring
  offset: 2px
  offset-color: focus.ring-offset
  radius: inherit

Rules:

* Focus must be visible on keyboard navigation.
* Focus must not rely on color alone.
* Use `:focus-visible`, not `:focus` alone, for pointer and keyboard distinction.
* Do not remove focus outlines without a compliant replacement.
* Nested interactive elements each receive their own focus ring.

---

## Minimum Touch Targets

Interactive targets must meet minimum size for touch and pointer use.

touch-target:

  minimum: 44px
  recommended: 48px
  spacing-between-targets: spacing.2

Rules:

* Visual size may be smaller only when the hit area meets the minimum.
* Icon-only controls must expand their hit area to 44px minimum.
* Dense desktop layouts may use 44px minimum.
* Mobile layouts should prefer 48px where space allows.

---

## Prefers Reduced Motion

Respect `prefers-reduced-motion: reduce`.

Rules:

* Disable non-essential animation.
* Replace motion with instant state change or simple opacity fade (≤ 100ms).
* Do not autoplay decorative motion.
* Essential feedback (e.g. loading indicators) may remain but must not flash.

See Motion System for token-level reduced motion behavior.

---

# Typography

## Fonts

fonts:

  display:
    family: Playfair Display
    fallback: "Georgia, serif"

  reading:
    family: Lora
    fallback: "Georgia, serif"

  interface:
    family: DM Sans
    fallback: "system-ui, sans-serif"

---

## Type Scale

typography:

  hero:
    font: display
    size: 72px
    weight: 400
    line-height: 1.1
    letter-spacing: -0.02em

  heading-xl:
    font: display
    size: 56px
    weight: 400
    line-height: 1.15
    letter-spacing: -0.02em

  heading-lg:
    font: display
    size: 40px
    weight: 400
    line-height: 1.2
    letter-spacing: -0.01em

  heading-md:
    font: display
    size: 32px
    weight: 400
    line-height: 1.25
    letter-spacing: -0.01em

  heading-sm:
    font: display
    size: 24px
    weight: 400
    line-height: 1.3
    letter-spacing: 0

  body-lg:
    font: reading
    size: 18px
    weight: 400
    line-height: 1.6
    letter-spacing: 0

  body:
    font: reading
    size: 16px
    weight: 400
    line-height: 1.6
    letter-spacing: 0

  label:
    font: interface
    size: 14px
    weight: 500
    line-height: 1.4
    letter-spacing: 0.01em

  caption:
    font: interface
    size: 12px
    weight: 400
    line-height: 1.4
    letter-spacing: 0.02em

---

## Reading Width

Long-form reading content must respect a maximum line length.

reading:

  max-width: 65ch
  optimal-width: 60ch

Rules:

* Apply reading width to body copy blocks, not to full layout containers.
* Headings may exceed reading width when used as display type.
* Form labels and captions are not subject to reading width.

---

## Typography Rules

* Display font is for headings and hero moments only.
* Reading font is for paragraphs and long-form content.
* Interface font is for labels, buttons, inputs, and UI metadata.
* Use weight before size when creating sub-hierarchy within a level.
* Do not use more than three type levels on a single screen.

---

# Spacing

spacing:

  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  24: 96px

---

## Spacing Usage

| Context | Recommended Tokens |
| --- | --- |
| Inline gaps (icon + text) | 1–2 |
| Component internal padding | 3–4 |
| Between related components | 4–6 |
| Section separation | 8–12 |
| Page-level vertical rhythm | 12–16 |

---

# Radius

radius:

  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 999px

---

# Elevation

elevation:

  card:
    shadow: 0 4px 12px rgba(0, 0, 0, 0.04)
    z-index: 1

  dropdown:
    shadow: 0 8px 24px rgba(0, 0, 0, 0.08)
    z-index: 100

  modal:
    shadow: 0 16px 48px rgba(0, 0, 0, 0.12)
    z-index: 200

  overlay:
    z-index: 150

Rules:

* Elevation communicates layering, not importance.
* Do not stack more than one modal level.
* Dropdowns inside modals inherit modal z-index context.

---

# Layout System

## Breakpoints

breakpoints:

  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px

Rules:

* Design mobile-first.
* Add layout complexity at `md` and above.
* Do not create custom breakpoints without approval.

---

## Container Widths

container:

  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1120px
  full: 100%

content:

  narrow: 560px
  reading: 680px
  wide: 960px

Rules:

* Page shells use `container.*`.
* Article and form layouts use `content.*`.
* Marketing hero sections may use `container.full`.

---

## Grid

grid:

  columns: 12
  gutter: spacing.4
  gutter-lg: spacing.6
  margin: spacing.4
  margin-lg: spacing.8

Rules:

* Use 12 columns for product layouts.
* Collapse to single column below `md`.
* Span cards in multiples of 3 or 4 columns on desktop.
* Do not nest grids more than two levels deep.

---

# Motion

## Durations

motion:

  duration:
    instant: 0ms
    fast: 150ms
    normal: 250ms
    slow: 400ms

---

## Easing

motion:

  easing:
    standard: cubic-bezier(0.4, 0, 0.2, 1)
    enter: cubic-bezier(0, 0, 0.2, 1)
    exit: cubic-bezier(0.4, 0, 1, 1)

---

## Enter and Exit

enter:

  duration: motion.duration.normal
  easing: motion.easing.enter
  properties: opacity, transform

exit:

  duration: motion.duration.fast
  easing: motion.easing.exit
  properties: opacity, transform

Rules:

* Enter is slightly slower than exit.
* Use transform and opacity only for standard UI transitions.
* Do not animate layout properties (width, height, top) unless required.

---

## Reduced Motion

When `prefers-reduced-motion: reduce`:

* Set all durations to `motion.duration.instant`
* Allow opacity fade at 100ms maximum for modal and alert appearance
* Disable parallax, scale, and slide transforms
* Loading spinners may rotate but must not pulse or bounce

---

## Motion Principles

* Subtle
* Purposeful
* Non-decorative

---

# Functional Color Rules

Brand colors and status colors serve different purposes.

## Brand Colors

* Green = Luck, Nature, Growth
* Lavender = Magic, Emotion, Imagination
* Iridescence = Wonder, Delight, Dream Moments

## Status Colors

* Success = Completed, Saved, Positive Outcomes
* Warning = Attention Required, Upcoming Issues
* Error = Failed Actions, Validation Problems
* Info = Neutral Guidance, Educational Messages

Do not use brand colors as status colors unless mapped through semantic tokens.

Do not use status colors as brand accents.

---

# Iridescence Rules

Iridescence is not a functional color.

Use iridescence only for:

* Hero sections
* Celebrations
* Premium highlights
* Decorative dividers
* Marketing surfaces
* Storytelling moments

Do not use iridescence for:

* Error states
* Warning states
* Success states
* Info states
* Body text
* Core actions

---

# Component Foundations

Component foundations define token slots and usage rules.

They do not define visual design.

Implementations must consume component tokens only.

---

## Button

### Token Slots

button:

  primary:
    background: action.primary
    background-hover: action.primary-hover
    background-active: action.primary-active
    text: text.on-solid
    border: transparent

  secondary:
    background: transparent
    background-hover: background.subtle
    text: action.accent
    border: border.accent

  destructive:
    background: action.destructive
    background-hover: action.destructive-hover
    text: text.on-solid
    border: transparent

  disabled:
    background: disabled.background
    text: disabled.text
    border: disabled.border

  shared:
    radius: radius.md
    padding-x: spacing.4
    padding-y: spacing.3
    font: label
    min-height: touch-target.minimum

### Usage Rules

* One primary button per view section.
* Destructive buttons require confirmation for irreversible actions.
* Secondary buttons handle cancel and low-emphasis actions.
* Disabled buttons do not fire events.
* Button labels use sentence case.

---

## Input

### Token Slots

input:

  background: surface.primary
  background-disabled: disabled.background
  text: text.primary
  placeholder: text.muted
  border: border.subtle
  border-hover: border.strong
  border-focus: focus.ring
  border-error: status.error.border
  label: text.secondary
  helper: text.muted
  error-text: status.error.text
  radius: radius.sm
  padding-x: spacing.3
  padding-y: spacing.3
  font: body
  min-height: touch-target.minimum

### Usage Rules

* Every input requires a visible label.
* Placeholder text is not a label.
* Error state uses `status.error.*` tokens, not destructive action tokens.
* Helper text appears below the field.
* Disabled inputs are not focusable.

---

## Card

### Token Slots

card:

  background: surface.primary
  background-subtle: surface.secondary
  border: border.subtle
  text: text.primary
  text-secondary: text.secondary
  radius: radius.lg
  padding: spacing.6
  elevation: elevation.card

### Usage Rules

* Cards group related content.
* One primary action per card maximum.
* Use `background-subtle` for nested or de-emphasized cards.
* Do not nest elevated cards inside elevated cards.

---

## Alert

### Token Slots

alert:

  success:
    background: status.success.background
    border: status.success.border
    text: status.success.text
    icon: status.success.icon

  warning:
    background: status.warning.background
    border: status.warning.border
    text: status.warning.text
    icon: status.warning.icon

  error:
    background: status.error.background
    border: status.error.border
    text: status.error.text
    icon: status.error.icon

  info:
    background: status.info.background
    border: status.info.border
    text: status.info.text
    icon: status.info.icon

  shared:
    radius: radius.md
    padding: spacing.4
    font: body

### Usage Rules

* Alerts communicate status. They are not calls to action.
* One alert type per message.
* Error alerts describe the problem and how to fix it.
* Dismissible alerts require an accessible close control.
* Do not use alert colors for button fills.

---

## Modal

### Token Slots

modal:

  background: surface.primary
  border: border.subtle
  text: text.primary
  scrim: overlay.scrim
  radius: radius.lg
  padding: spacing.6
  elevation: elevation.modal
  z-index: elevation.modal.z-index
  max-width: content.narrow

### Usage Rules

* Modals require a scrim and trap focus while open.
* Close on scrim click only for non-destructive content.
* Destructive modals require explicit cancel and confirm buttons.
* Return focus to the triggering element on close.
* One modal open at a time.

---

# Theme Architecture

Themes let products express personality without breaking shared foundations.

---

## How Layers Connect

```
Foundation (primitives + global scales)
        ↓
Semantic (shared UI meaning)
        ↓
Component (button, input, card, alert, modal slots)
        ↓
Theme (product overrides)
        ↓
Product UI
```

**Foundation** holds primitives, spacing, radius, motion, layout, and typography scales.

These values never change per product.

**Semantic** maps foundations to roles every product needs.

`action.primary`, `text.primary`, and `status.error.text` live here.

**Component** assigns semantic roles to component parts.

`button.primary.background` points to `action.primary`.

If a theme is inactive, components render with default semantic values.

**Theme** remaps a defined set of semantic or component slots.

Lucky Charm might remap `action.accent` to lavender.

Dream Fund might remap `action.accent` to warning.500 for warmth.

Themes do not add new keys to component foundations.

They override existing slot targets only.

---

## Theme Override Scope

Themes may override:

* `brand.*`
* `action.accent*`
* `action.primary*` (with caution)
* Decorative highlight references

Themes must not override:

* `status.*`
* `disabled.*`
* `focus.*`
* `overlay.*`
* Functional color scales

---

## Accent vs Status Separation

When a theme maps accent to a functional palette (e.g. Dream Fund accent → warning.500):

* Accent applies to branding, secondary buttons, and highlights.
* Status tokens remain unchanged for alerts and validation.
* Never use theme accent tokens inside alert or form error slots.
* Warning banners always consume `status.warning.*`.

This prevents users from confusing brand warmth with system warnings.

---

## Product Themes

themes:

  lucky-charm:
    primary: green.500
    accent: lavender.500
    highlight: iridescence
    overrides:
      action.accent: lavender.500
      action.accent-hover: lavender.600
      brand.accent: lavender.500

  dream-fund:
    primary: green.500
    accent: warning.500
    overrides:
      action.accent: warning.600
      action.accent-hover: warning.700
      brand.accent: warning.500

---

## Theme Application Rules

* Load one theme per product surface.
* Theme overrides resolve at build or runtime before render.
* Document all overrides in the theme definition.
* Test contrast for every override against WCAG AA.
* Future products add a theme file. They do not fork `design.md` foundations.

---

# Component Rules

## Buttons

Primary Button

Default:
action.primary

Hover:
action.primary-hover

Active:
action.primary-active

---

Secondary Button

Default:
action.accent (text and border)

Hover:
action.accent-hover

Background:
background.subtle on hover

---

Destructive Button

Default:
action.destructive

Hover:
action.destructive-hover

---

Hero CTA may introduce gradients or iridescent treatments.

These are marketing exceptions.

Do not convert them into semantic tokens.

---

# Do Not

* Do not hardcode colors
* Do not create one-off spacing values
* Do not use arbitrary radius values
* Do not introduce new shadows without approval
* Do not create product-specific tokens in foundations
* Do not skip semantic tokens and reference primitives in components
* Do not use theme accent colors in status surfaces
* Do not disable focus indicators
* Do not animate without reduced motion fallback

---

# Goal

Build products that feel:

* Calm
* Premium
* Human
* Elegant
* Consistent
* Accessible

The system should scale across products without redesigning foundations.
