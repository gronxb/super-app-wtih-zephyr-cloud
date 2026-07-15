# Gronxb Super App Design System

## 0. Research Log

- Embedded refs: shortlisted Airbnb, Shopify, and Stripe; picked `taste-skill` + Airbnb because a mobile commerce demo benefits from a single action color, compact product metadata, and clear touch targets.
- Lazyweb: skipped because the task is a native proof-of-concept and the bundled reference supplied enough component anatomy.
- Imagen drafts: skipped because this is an operational native demo, not an image-led brand surface.

## 1. Atmosphere & Identity

A crisp neighborhood shop that feels useful on first launch. The signature is a coral action color used only for navigation state and purchase actions, set against calm cool-white surfaces and ink typography.

## 2. Color

| Role           | Token           | Value     | Usage                              |
| -------------- | --------------- | --------- | ---------------------------------- |
| Canvas         | `canvas`        | `#F7F7F8` | App background                     |
| Surface        | `surface`       | `#FFFFFF` | Cards and navigation               |
| Ink            | `ink`           | `#222222` | Primary text                       |
| Muted          | `muted`         | `#6A6A6A` | Secondary text                     |
| Hairline       | `hairline`      | `#DDDDDD` | Dividers and outlines              |
| Accent         | `accent`        | `#E8325C` | Primary actions and selected state |
| Accent pressed | `accentPressed` | `#C81E48` | Press feedback                     |
| Accent soft    | `accentSoft`    | `#FFF0F3` | Selected and success surfaces      |
| Product lilac  | `productLilac`  | `#E8E1FF` | Product art field                  |
| Product mint   | `productMint`   | `#DDF4EA` | Product art field                  |
| Product sky    | `productSky`    | `#DCEEFF` | Product art field                  |
| Success        | `success`       | `#18794E` | Completed order message            |

Only `accent` carries interactive emphasis. Product colors are confined to product art fields.

## 3. Typography

The native system sans stack is used throughout with weights 500, 600, and 700.

| Token   | Size | Weight | Line height | Usage                         |
| ------- | ---- | ------ | ----------- | ----------------------------- |
| Display | 32   | 700    | 38          | Remote page title             |
| H2      | 22   | 700    | 28          | Section title and totals      |
| H3      | 17   | 600    | 22          | Product title                 |
| Body    | 15   | 500    | 21          | Primary content               |
| Small   | 13   | 500    | 18          | Metadata                      |
| Caption | 12   | 600    | 16          | Navigation and compact status |

## 4. Spacing & Layout

Base unit is 4 points. The supported scale is 4, 8, 12, 16, 20, 24, and 32. Screen gutters are 20 points, cards use 16 points, and all touch targets are at least 44 points. Cards use a 16-point radius, action buttons use 12, and segmented navigation uses a pill radius.

## 5. Components

### Segmented navigation

- Structure: two equal `Pressable` tabs in a rounded surface.
- States: default, selected, pressed, and screen-reader selected.
- Accessibility: explicit tab role, label, selected state, and 48-point target.
- Motion: native pressed opacity only.

### Product tile

- Structure: colored art field, compact metadata, price, and action.
- States: available and added.
- Accessibility: product-specific action label and 44-point target.
- Motion: native pressed opacity only.

### Cart row

- Structure: product mark, product metadata, quantity stepper, and line total.
- States: quantity one or greater; decrement disables at one.
- Accessibility: product-specific increment/decrement labels and values.
- Motion: immediate quantity and total update.

### Primary action

- Structure: full-width coral button with one-line label.
- States: default, pressed, disabled, and completed feedback.
- Accessibility: button role, descriptive label, and 52-point target.
- Motion: native pressed opacity only.

### Loading state

- Structure: quiet centered copy inside the host content surface.
- States: loading only; replaced by the remote on resolution.
- Accessibility: live-region announcement.

### Global cart state contract

- The shared store owns only generic cart lines, quantities, and derived totals.
- Discover owns its catalog and submits a structural `CartItemInput`; the store never imports remote-specific products or identifiers.
- Cart consumes the shared snapshot and never imports Discover code or types.
- Host observes only the derived item count for its navigation badge.
- Each remote remains independently renderable with empty and populated states determined solely by the neutral store contract.

## 6. Motion & Interaction

Motion intensity is 3. State changes are immediate and pressed feedback uses opacity without decorative animation. Tab changes communicate navigation, quantity updates communicate cart state, and checkout feedback communicates completion.

## 7. Depth & Surface

The strategy is tonal shift plus hairlines. Product cards sit on white without shadows; the host navigation and checkout summary use one hairline to establish hierarchy.

## 8. Accessibility Constraints & Accepted Debt

- Target: WCAG 2.2 AA contrast, 44-point minimum touch targets, explicit roles and labels, and readable dynamic state announcements.
- Accepted debt: product art is intentionally abstract because this repository is a local architecture demo and ships no product photography assets.
