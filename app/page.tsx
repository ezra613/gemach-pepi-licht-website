import Image from "next/image";
import DonateForm from "./components/DonateForm";
import StoryVideo from "./components/StoryVideo";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#story", label: "Our Story" },
  { href: "#contact", label: "Contact" },
];

const ADDRESS = "138 Parkville Avenue, Brooklyn, NY 11230";
const PHONE_1 = "(718) 871-3164";
const PHONE_2 = "(347) 415-1525";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-ivory">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
          <a href="#" className="font-display text-lg sm:text-xl font-semibold tracking-wide text-brand-deep">
            Gemach Lahachnossas Kallah Pepi Licht
          </a>
          <nav className="flex items-center gap-5 text-sm">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden sm:inline text-ink/70 hover:text-brand-deep transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#donate"
              className="rounded-full bg-brand-deep px-5 py-2 text-white font-medium hover:bg-brand transition-colors"
            >
              Donate
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/kallah-hall.webp"
            alt="A candlelit wedding hall prepared for a chuppah"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:py-40 text-white">
          <p className="text-sm tracking-[0.25em] uppercase text-gold-light mb-4">
            בס״ד &nbsp;·&nbsp; Gemach Lahachnossas Kallah Pepi Licht
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold max-w-2xl leading-tight">
            Make a Lasting Difference
          </h1>
          <p className="mt-5 max-w-xl text-white/85 text-lg">
            Interest-free loans and financial guidance for Jewish newlyweds
            across America — helping couples begin married life with dignity
            and hope.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#donate"
              className="rounded-full bg-gold px-7 py-3 font-medium text-white hover:bg-gold-light hover:text-ink transition-colors"
            >
              Donate Now
            </a>
            <a
              href="#story"
              className="rounded-full border border-white/60 px-7 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              ▶ Why We Do What We Do
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-16 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-deep">
            Giving Jewish Couples a Strong Start
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Supporting the next generation of Jewish families. We provide
            interest-free loans and financial guidance to newlyweds across
            America, easing the financial burden of starting a marriage and
            fostering thriving Jewish communities.
          </p>
          <p className="font-display mt-8 text-2xl text-gold" dir="rtl">
            גדול המלוה יותר מן העושה צדקה
          </p>
          <p className="mt-2 text-sm text-ink/60">
            “Greater is one who lends than one who gives charity.”
          </p>
        </div>
      </section>

      {/* Story / Video */}
      <section id="story" className="scroll-mt-16 bg-ivory py-20">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-deep text-center">
            Creating Lasting Joy: The Pepi Licht Foundation Story
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl shadow-xl shadow-black/10">
            <StoryVideo />
          </div>
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="scroll-mt-16 py-20">
        <div className="mx-auto max-w-2xl px-5">
          <div className="rounded-t-2xl bg-brand-deep px-6 sm:px-10 py-10 text-white text-center">
            <p className="text-sm text-gold-light">בס״ד</p>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl font-semibold">
              Support Jewish Newlyweds in Need
            </h2>
            <p className="mt-5 text-white/85 leading-relaxed">
              By contributing to{" "}
              <em>Gemach Lahachnossas Kallah Pepi Licht</em>, you’re not just
              giving tzedakah — you’re helping Jewish couples facing financial
              hardship start their marriages with dignity and hope in the
              traditions that bind our community. Your contributions will fund
              new loans and help repay existing loans, providing families with
              the financial support they need to build a stable future and a
              Bayis Ne’eman B’Yisroel.
            </p>
            <p className="font-display mt-4 text-xl text-gold-light" dir="rtl">
              גדול המלוה יותר מן העושה צדקה
            </p>
            <p className="mt-5 font-medium">
              Donate today — your love builds futures
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs">
              🔒 100% Secure Donation
            </p>
          </div>
          <div className="rounded-b-2xl border border-t-0 border-ivory bg-white px-6 sm:px-10 py-10 shadow-lg shadow-black/5">
            <DonateForm />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ink/55">
            Thank you for your generous donation to Gemach Lahachnossas Kallah
            Pepi Licht Inc, a 501(c)(3) tax-exempt organization. Your donation
            is tax-deductible to the full extent permitted by law. All
            donations are non-refundable. Secure online payment via Stripe. For
            donation inquiries, please{" "}
            <a href="#contact" className="underline hover:text-brand-deep">
              contact us
            </a>
            . We keep all personal information safe and secure.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-16 bg-ivory py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-deep">
            Contact Us
          </h2>
          <p className="mt-4 text-ink/70">
            For donation inquiries or to learn more about the gemach, reach us
            by phone or mail.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 text-ink/80">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold">Address</p>
              <p className="mt-2">{ADDRESS}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold">Phone</p>
              <p className="mt-2">
                <a href="tel:+17188713164" className="hover:text-brand-deep">
                  {PHONE_1}
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold">Phone</p>
              <p className="mt-2">
                <a href="tel:+13474151525" className="hover:text-brand-deep">
                  {PHONE_2}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-deep py-10 text-center text-white/80 text-sm">
        <p className="font-display text-lg text-gold-light" dir="rtl">
          גדול המלוה יותר מן העושה צדקה
        </p>
        <p className="mt-3 font-display text-base text-white">
          Gemach Lahachnossas Kallah Pepi Licht
        </p>
        <p className="mt-2">
          {ADDRESS} &nbsp;·&nbsp; {PHONE_1} &nbsp;·&nbsp; {PHONE_2}
        </p>
      </footer>
    </main>
  );
}
