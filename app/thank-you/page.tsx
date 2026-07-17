import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You · Gemach Lahachnossas Kallah Pepi Licht",
};

export default function ThankYou() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm text-gold">בס״ד</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl font-semibold text-brand-deep">
          Thank You!
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/80">
          Your generous donation to Gemach Lahachnossas Kallah Pepi Licht helps
          Jewish couples begin married life with dignity and hope. A receipt
          will be emailed to you shortly.
        </p>
        <p className="font-display mt-8 text-2xl text-gold" dir="rtl">
          גדול המלוה יותר מן העושה צדקה
        </p>
        <p className="mt-6 text-sm text-ink/60">
          Gemach Lahachnossas Kallah Pepi Licht Inc is a 501(c)(3) tax-exempt
          organization. Your donation is tax-deductible to the full extent
          permitted by law.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-brand-deep px-7 py-3 font-medium text-white hover:bg-brand transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
