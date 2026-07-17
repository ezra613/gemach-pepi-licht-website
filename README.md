# gemach-pepi-licht-website

Next.js site for Gemach Lahachnossas Kallah Pepi Licht (gemachpepilicht.org).

One-page site with an embedded Stripe donation form (one-time + monthly), the foundation story video, and contact info. Replaces the old WordPress/GiveWP site.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the Stripe keys from the Stripe dashboard.
3. `npm run dev`

Donations: one-time donations create a PaymentIntent; monthly donations create a Customer + Subscription (product id `gemach-monthly-donation`, auto-created on first use). Receipts are sent by Stripe.
