# HiddenVillage

HiddenVillage is a lightweight interactive fantasy storefront. Instead of opening on a normal category grid, the visitor enters a small medieval-fantasy village, walks a 2D character to nearby buildings, enters a shop, approaches a cashier, and browses products inside an old merchant book.

## What is implemented in this first deployable build

- Animated milk-brown fantasy entrance screen with a deliberately irregular wooden HiddenVillage sign.
- Compact village hub with a fantasy sky, clouds, mountains, distant misty castle, river, central path, notice board, four nearby storefronts, and Town Hall.
- Tap-to-move 2D character with idle/walking animation and proximity actions.
- Four shop buildings: Account Emporium, Adventurer Guild, Arcane Subscriptions, and Village Support.
- Interior scene with cashier interaction and a separate exit flow that returns the character outside the same shop.
- Fantasy antique-book catalogue inspired by physical card binders.
- Game/category cards, product cards, product detail panel, close/back controls, and mobile page-slide behavior.
- Search at both category and product level. Searching `Genshin` filters to Genshin; searching a tag such as `Sandrone` inside Genshin filters accounts by that character.
- Quick Shop escape hatch for returning customers who do not want to walk through the village.
- Checkout preview placeholder so no real payment is accidentally taken before a provider is connected.
- Zero external runtime dependencies. The app is served by a small Node HTTP server and is Railway-ready.

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

## Railway

This repository includes `railway.toml`. Create a Railway project from this GitHub repository. Railway should use:

- Build: Nixpacks
- Start command: `npm start`
- Health check: `/`

No environment variables are required for this first version.

## Editing catalogue data

All placeholder catalogue content lives in:

`public/catalog.js`

The current data is intentionally sample data. Replace it with real inventory only when the product/admin backend is added.

## Next planned phase

1. Product/admin database and stock management.
2. Authentication, orders, customer profile and Town Hall functionality.
3. Real payment provider integration.
4. Production support/ticket system.
5. Final commissioned art/sprites and optional ambient audio.
6. Localization (Arabic/English) if required.

The current build focuses on proving the core HiddenVillage interaction and visual language before those systems are added.
