import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | NorthSky Auto",
  description:
    "Read the NorthSky Auto Privacy Policy to learn how we collect, use, protect, and manage information submitted through our Canadian vehicle marketplace.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/privacy",
  },
  openGraph: {
    title: "Privacy Policy | NorthSky Auto",
    description:
      "Learn how NorthSky Auto handles personal information, vehicle submissions, dealer accounts, payments, and website usage.",
    url: "https://northsky-auto.vercel.app/privacy",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-black uppercase tracking-widest text-blue-300">
            NorthSky Auto
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This Privacy Policy explains how NorthSky Auto collects, uses,
            protects, and manages personal information when you use our
            website and services.
          </p>

          <p className="mt-6 text-sm text-slate-400">
            Last updated: August 12, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-10 lg:p-12">

          {/* INTRODUCTION */}
          <section>
            <h2 className="text-2xl font-black text-slate-950">
              1. Introduction
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto is a Canadian vehicle marketplace designed to
              connect vehicle sellers with dealerships and other qualified
              automotive buyers looking for vehicle acquisition
              opportunities.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We respect your privacy and are committed to handling personal
              information responsibly. This Privacy Policy describes the
              types of information we may collect, why we collect it, how
              we use it, and the choices available to you.
            </p>
          </section>

          {/* INFORMATION COLLECTED */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              2. Information We Collect
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Depending on how you use NorthSky Auto, we may collect
              information such as:
            </p>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>
                <strong className="text-slate-900">
                  Contact information:
                </strong>{" "}
                name, email address, phone number, and postal code.
              </li>

              <li>
                <strong className="text-slate-900">
                  Vehicle information:
                </strong>{" "}
                vehicle year, make, model, trim, mileage, VIN, condition,
                accident history, asking price, description, and related
                submission information.
              </li>

              <li>
                <strong className="text-slate-900">
                  Dealer account information:
                </strong>{" "}
                business information, account details, preferences, and
                information required to provide dealer services.
              </li>

              <li>
                <strong className="text-slate-900">
                  Communications:
                </strong>{" "}
                information you provide when contacting NorthSky Auto,
                requesting support, or communicating with us.
              </li>

              <li>
                <strong className="text-slate-900">
                  Payment information:
                </strong>{" "}
                subscription and transaction information associated with
                purchases made through our payment provider.
              </li>

              <li>
                <strong className="text-slate-900">
                  Technical information:
                </strong>{" "}
                IP address, browser type, device information, pages viewed,
                approximate location information, and other information
                that may be collected automatically when you use the
                website.
              </li>
            </ul>
          </section>

          {/* VEHICLE SUBMISSIONS */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              3. Vehicle Submissions
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              When you submit a vehicle through NorthSky Auto, the information
              you provide may be reviewed by NorthSky Auto and, where
              appropriate, shared with participating dealerships or other
              qualified automotive buyers for the purpose of evaluating a
              potential vehicle acquisition opportunity.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Submission of a vehicle does not guarantee an offer, purchase,
              sale, appraisal, or transaction. Vehicle availability and
              interest may vary based on market conditions, vehicle
              characteristics, location, and buyer requirements.
            </p>
          </section>

          {/* HOW WE USE INFORMATION */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              4. How We Use Information
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              We may use information we collect to:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-600">
              <li>Provide and operate NorthSky Auto services.</li>
              <li>Process vehicle submissions.</li>
              <li>Connect sellers with participating dealerships.</li>
              <li>Create and manage dealer accounts.</li>
              <li>Provide dealer opportunity access.</li>
              <li>Process subscriptions and payments.</li>
              <li>Communicate with users about submissions and accounts.</li>
              <li>Provide customer support.</li>
              <li>Improve website performance and functionality.</li>
              <li>Detect, prevent, and investigate fraud or abuse.</li>
              <li>Protect the security of our services.</li>
              <li>Comply with applicable legal requirements.</li>
            </ul>
          </section>

          {/* SHARING */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              5. When Information May Be Shared
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              We do not sell personal information simply for the purpose of
              selling personal data. Information may be shared when
              reasonably necessary to operate NorthSky Auto and provide
              requested services.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              This may include sharing relevant vehicle and contact
              information with participating dealerships or qualified buyers
              when necessary to facilitate a vehicle acquisition opportunity.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We may also share information with service providers that help
              us operate our website, database, communications, payment
              processing, security, hosting, analytics, and other business
              functions.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Information may also be disclosed when required by law, legal
              process, court order, regulatory requirement, or when necessary
              to protect the rights, property, safety, or security of
              NorthSky Auto, our users, or others.
            </p>
          </section>

          {/* STRIPE */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              6. Payments and Stripe
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto uses Stripe to process certain subscription and
              payment transactions.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Payment card information may be collected and processed
              directly by Stripe rather than being stored directly by
              NorthSky Auto. Stripe may process information in accordance
              with its own privacy practices and policies.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may receive transaction-related information such
              as subscription status, payment status, customer identifiers,
              and billing information necessary to manage your account.
            </p>
          </section>

          {/* SUPABASE */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              7. Account and Database Information
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may use third-party infrastructure and database
              services to securely store and manage account, vehicle,
              dealership, and application information.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Access to information is intended to be restricted according
              to account permissions and operational requirements.
            </p>
          </section>

          {/* COOKIES */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              8. Cookies and Similar Technologies
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may use cookies, local storage, session
              technologies, and similar tools to maintain account sessions,
              remember preferences, improve website functionality, and
              understand website usage.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You may be able to control certain cookies through your browser
              settings. Disabling certain technologies may affect the
              functionality of portions of the website.
            </p>
          </section>

          {/* SECURITY */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              9. Security
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              We take reasonable measures designed to protect information
              against unauthorized access, alteration, disclosure, or
              destruction.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              However, no website, database, transmission method, or
              electronic storage system can be guaranteed to be completely
              secure. Users should avoid submitting unnecessary sensitive
              information through forms or communications.
            </p>
          </section>

          {/* RETENTION */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              10. Information Retention
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              We may retain information for as long as reasonably necessary
              to provide our services, maintain business and transaction
              records, resolve disputes, enforce agreements, comply with
              legal obligations, and protect our legitimate business
              interests.
            </p>
          </section>

          {/* YOUR CHOICES */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              11. Your Choices and Requests
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Depending on applicable law, you may have rights or choices
              relating to your personal information, including requesting
              access to, correction of, or deletion of certain information.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              To make a privacy-related request, please contact NorthSky Auto
              using our contact page.
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
              >
                Contact NorthSky Auto
              </Link>
            </div>
          </section>

          {/* CHILDREN */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              12. Children&apos;s Privacy
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto is intended for adults and businesses involved in
              vehicle buying, selling, and automotive commerce. We do not
              knowingly seek to collect personal information from children
              where prohibited by applicable law.
            </p>
          </section>

          {/* THIRD PARTY LINKS */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              13. Third-Party Websites and Services
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may contain links to third-party websites or
              services. We are not responsible for the privacy practices,
              content, or security of third-party services.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We recommend reviewing the privacy policies of third-party
              services before providing them with personal information.
            </p>
          </section>

          {/* POLICY CHANGES */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              14. Changes to This Privacy Policy
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may update this Privacy Policy from time to time
              to reflect changes to our services, technology, business
              practices, or legal requirements.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              When changes are made, the updated policy will be posted on
              this page with a revised effective or updated date.
            </p>
          </section>

          {/* CONTACT */}
          <section className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-black text-slate-950">
              15. Contact NorthSky Auto
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              If you have questions about this Privacy Policy or how
              NorthSky Auto handles information, please contact us.
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="font-black text-blue-600 hover:text-blue-500"
              >
                Go to the NorthSky Auto Contact Page →
              </Link>
            </div>
          </section>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-black">
            Have questions about your information?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Contact NorthSky Auto if you have questions about a vehicle
            submission, dealer account, subscription, or privacy request.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
            >
              Contact Us
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15"
            >
              Back to NorthSky Auto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}