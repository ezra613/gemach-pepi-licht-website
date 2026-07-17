"use client";

import { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const PRESETS = [18, 36, 72, 180, 360, 500];

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type Frequency = "one_time" | "monthly";

export default function DonateForm() {
  const [frequency, setFrequency] = useState<Frequency>("one_time");
  const [preset, setPreset] = useState<number | null>(18);
  const [custom, setCustom] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    if (custom.trim() !== "") {
      const parsed = Number(custom);
      return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 100) : null;
    }
    return preset ? preset * 100 : null;
  }, [custom, preset]);

  if (!stripePromise) {
    return (
      <p className="text-center text-sm text-ink/60">
        Online donations are temporarily unavailable. Please call us at{" "}
        <a href="tel:+17188713164" className="underline">(718) 871-3164</a> to donate.
      </p>
    );
  }

  async function startPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || amount < 100) {
      setError("Please enter a donation amount of at least $1.");
      return;
    }
    if (!firstName.trim() || !email.trim()) {
      setError("Please enter your first name and email address.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency, firstName, lastName, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (clientSecret) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between rounded-lg bg-ivory px-4 py-3 text-sm">
          <span>
            {frequency === "monthly" ? "Monthly donation" : "One-time donation"}
          </span>
          <span className="font-semibold">${(amount! / 100).toFixed(2)}</span>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#3d4a58",
                fontFamily: "Inter, system-ui, sans-serif",
                borderRadius: "8px",
              },
            },
          }}
        >
          <PaymentStep
            email={email}
            onBack={() => setClientSecret(null)}
          />
        </Elements>
      </div>
    );
  }

  return (
    <form onSubmit={startPayment}>
      <h3 className="font-semibold text-lg">
        How much would you like to donate today?
      </h3>
      <p className="mt-1 text-sm text-ink/60">
        All donations directly impact our organization and help us further our
        mission.
      </p>

      <div className="mt-5 flex rounded-full bg-ivory p-1 text-sm font-medium">
        {(
          [
            ["one_time", "One-time"],
            ["monthly", "Monthly"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFrequency(value)}
            className={`flex-1 rounded-full py-2 transition-colors ${
              frequency === value
                ? "bg-brand-deep text-white"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {PRESETS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setPreset(value);
              setCustom("");
            }}
            className={`rounded-lg border py-3 font-medium transition-colors ${
              preset === value && custom === ""
                ? "border-brand-deep bg-brand-deep text-white"
                : "border-ink/15 hover:border-brand-deep"
            }`}
          >
            ${value}
          </button>
        ))}
      </div>
      <div className="relative mt-3">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50">
          $
        </span>
        <input
          type="number"
          min="1"
          step="0.01"
          inputMode="decimal"
          placeholder="Enter custom amount"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            if (e.target.value !== "") setPreset(null);
          }}
          className="w-full rounded-lg border border-ink/15 py-3 pl-8 pr-4 outline-none focus:border-brand-deep"
        />
      </div>

      <h3 className="mt-8 font-semibold text-lg">Who’s giving today?</h3>
      <p className="mt-1 text-sm text-ink/60">
        We’ll never share this information with anyone.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="First name *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-brand-deep"
        />
        <input
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-brand-deep"
        />
        <input
          required
          type="email"
          placeholder="Email address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sm:col-span-2 rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-brand-deep"
        />
      </div>

      <div className="mt-6 rounded-lg bg-ivory px-4 py-3 text-sm">
        <div className="flex justify-between">
          <span>Giving frequency</span>
          <span className="font-medium">
            {frequency === "monthly" ? "Monthly" : "One time"}
          </span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>Donation total</span>
          <span className="font-semibold">
            {amount ? `$${(amount / 100).toFixed(2)}` : "—"}
          </span>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-brand-deep py-4 font-semibold text-white transition-colors hover:bg-brand disabled:opacity-60"
      >
        {loading ? "One moment…" : "Continue to payment"}
      </button>
    </form>
  );
}

function PaymentStep({ email, onBack }: { email: string; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
        receipt_email: email,
      },
    });
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="mt-6 w-full rounded-lg bg-brand-deep py-4 font-semibold text-white transition-colors hover:bg-brand disabled:opacity-60"
      >
        {submitting ? "Processing…" : "Donate now"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full py-2 text-sm text-ink/60 hover:text-ink"
      >
        ← Change amount or details
      </button>
    </form>
  );
}
