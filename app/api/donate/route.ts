import Stripe from "stripe";
import { NextResponse } from "next/server";

const MONTHLY_PRODUCT_ID = "gemach-monthly-donation";
const MIN_CENTS = 100;
const MAX_CENTS = 100_000_00; // $100,000 cap to block typos/abuse

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Donations are not configured yet. Please call us to donate." },
      { status: 500 }
    );
  }
  const stripe = new Stripe(secretKey);

  let body: {
    amount?: number;
    frequency?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const amount = Math.round(Number(body.amount));
  const frequency = body.frequency === "monthly" ? "monthly" : "one_time";
  const email = String(body.email ?? "").trim();
  const name = [body.firstName, body.lastName]
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" ");

  if (!Number.isFinite(amount) || amount < MIN_CENTS || amount > MAX_CENTS) {
    return NextResponse.json(
      { error: "Please enter a valid donation amount." },
      { status: 400 }
    );
  }
  if (!email || !name) {
    return NextResponse.json(
      { error: "Please provide your name and email address." },
      { status: 400 }
    );
  }

  try {
    if (frequency === "one_time") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        receipt_email: email,
        description: "One-time donation",
        metadata: { donor_name: name, donor_email: email },
        automatic_payment_methods: { enabled: true },
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    }

    // Monthly: customer + subscription, paid via the Payment Element.
    const customer = await stripe.customers.create({ email, name });

    try {
      await stripe.products.retrieve(MONTHLY_PRODUCT_ID);
    } catch {
      await stripe.products.create({
        id: MONTHLY_PRODUCT_ID,
        name: "Monthly Donation",
      });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "usd",
            product: MONTHLY_PRODUCT_ID,
            recurring: { interval: "month" },
            unit_amount: amount,
          },
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      metadata: { donor_name: name, donor_email: email },
      expand: ["latest_invoice.confirmation_secret"],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice | null;
    const clientSecret = invoice?.confirmation_secret?.client_secret;
    if (!clientSecret) {
      throw new Error("Could not initialize the monthly donation.");
    }
    return NextResponse.json({ clientSecret });
  } catch (err) {
    console.error("Donation error:", err);
    return NextResponse.json(
      { error: "We couldn't start your donation. Please try again or call us." },
      { status: 500 }
    );
  }
}
