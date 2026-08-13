import Link from "next/link";

export const metadata = {
  title: "Terms of Service | NorthSky Auto",
  description:
    "Read the NorthSky Auto Terms of Service covering vehicle submissions, dealer accounts, memberships, marketplace opportunities, payments, and use of the platform.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/terms",
  },
  openGraph: {
    title: "Terms of Service | NorthSky Auto",
    description:
      "Terms governing use of the NorthSky Auto Canadian vehicle marketplace and dealer platform.",
    url: "https://northsky-auto.vercel.app/terms",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-black uppercase tracking-widest text-blue-300">
            NorthSky Auto
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            These Terms of Service govern your access to and use of the
            NorthSky Auto website, marketplace, dealer services, vehicle
            submission tools, and related services.
          </p>

          <p className="mt-6 text-sm text-slate-400">
            Last updated: August 12, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-10 lg:p-12">

          {/* ACCEPTANCE */}
          <section>
            <h2 className="text-2xl font-black text-slate-950">
              1. Acceptance of These Terms
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              By accessing or using NorthSky Auto, you agree to be bound by
              these Terms of Service and any policies or guidelines referenced
              by these Terms.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              If you do not agree with these Terms, you should not use the
              NorthSky Auto website or services.
            </p>
          </section>

          {/* PLATFORM */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              2. About NorthSky Auto
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto is a Canadian vehicle marketplace designed to
              connect vehicle sellers with dealerships and other qualified
              automotive buyers seeking vehicle acquisition opportunities.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may provide technology, marketplace tools,
              vehicle submission functionality, dealer dashboards, lead
              management features, and related services.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto is not necessarily the buyer, seller, owner,
              broker, appraiser, financier, insurer, or legal representative
              of any party involved in a vehicle transaction unless expressly
              stated otherwise.
            </p>
          </section>

          {/* ELIGIBILITY */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              3. Eligibility
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              You must have the legal capacity to enter into an agreement to
              use NorthSky Auto and must provide accurate information when
              creating an account or submitting information.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Dealer accounts are intended for legitimate automotive
              businesses and authorized representatives of those businesses.
            </p>
          </section>

          {/* SELLER SUBMISSIONS */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              4. Vehicle Submissions
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              When submitting a vehicle, you agree to provide information that
              is accurate, current, and complete to the best of your knowledge.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You should only submit vehicles that you are legally authorized
              to sell or represent.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You are responsible for the accuracy of information you submit,
              including vehicle identification information, mileage,
              condition, accident history, ownership information, asking
              price, and other material details.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may review, reject, remove, modify, or restrict a
              submission if it appears inaccurate, incomplete, fraudulent,
              misleading, prohibited, or otherwise unsuitable for the
              marketplace.
            </p>
          </section>

          {/* NO GUARANTEE */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              5. No Guarantee of Offers or Transactions
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Submitting a vehicle does not guarantee that a dealership or
              other buyer will contact you, make an offer, inspect the
              vehicle, purchase the vehicle, or complete a transaction.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Lead volume, buyer interest, vehicle opportunities, and
              transaction outcomes may vary based on market conditions,
              location, vehicle characteristics, buyer requirements, seller
              activity, and other factors.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto does not guarantee a specific number of leads,
              offers, sales, acquisitions, or revenue.
            </p>
          </section>

          {/* DEALER ACCOUNTS */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              6. Dealer Accounts
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Dealers may be required to create an account before accessing
              certain marketplace features or vehicle acquisition
              opportunities.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Dealers are responsible for maintaining accurate account
              information and protecting their login credentials.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You are responsible for activity performed through your dealer
              account unless the activity resulted from circumstances outside
              your reasonable control.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may review dealer applications and may approve,
              restrict, suspend, or deny access at its discretion where
              reasonably necessary to protect the marketplace or its users.
            </p>
          </section>

          {/* OPPORTUNITIES */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              7. Dealer Opportunities and Leads
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may provide dealers with access to vehicle
              acquisition opportunities based on their membership, account
              status, location, preferences, vehicle requirements, or other
              marketplace factors.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Access to an opportunity does not guarantee that the vehicle
              remains available or that the seller will complete a
              transaction with the dealer.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Dealers are responsible for conducting their own due diligence
              before purchasing a vehicle, including verifying ownership,
              vehicle history, condition, liens, documentation, pricing,
              identity, and other relevant information.
            </p>
          </section>

          {/* MEMBERSHIPS */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              8. Dealer Memberships
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Certain NorthSky Auto features may require a paid dealer
              membership or subscription.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Membership plans, pricing, features, access levels, and
              availability may change from time to time. The applicable plan
              and price presented at checkout will govern the subscription
              purchased at that time.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Paid membership provides access to applicable platform features
              and does not guarantee a particular number of vehicle
              opportunities, leads, purchases, or transactions.
            </p>
          </section>

          {/* BILLING */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              9. Billing and Payments
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Paid subscriptions may automatically renew according to the
              billing schedule presented during checkout unless cancelled in
              accordance with the applicable subscription terms.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Payments are processed through third-party payment services,
              including Stripe. By completing checkout, you authorize the
              applicable payment provider to process charges associated with
              your subscription.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may suspend or restrict paid features if a payment
              fails, is reversed, or remains unpaid.
            </p>
          </section>

          {/* CANCELLATION */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              10. Cancellation
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              You may cancel a recurring membership according to the
              cancellation options provided through your account or billing
              provider.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Cancellation generally prevents future recurring charges but
              does not automatically reverse charges that have already been
              processed.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Any refund eligibility will be determined according to the
              applicable subscription terms, refund policy, and applicable
              law.
            </p>
          </section>

          {/* PROHIBITED USE */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              11. Prohibited Activities
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              You may not use NorthSky Auto to:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-600">
              <li>Submit false, fraudulent, or misleading information.</li>
              <li>Submit vehicles you are not authorized to sell.</li>
              <li>Impersonate another person or business.</li>
              <li>Attempt to access another user's account.</li>
              <li>Interfere with website security or functionality.</li>
              <li>Use automated systems to scrape or abuse the platform.</li>
              <li>Upload malicious code or harmful content.</li>
              <li>Attempt to circumvent account or subscription restrictions.</li>
              <li>Use the platform for unlawful activity.</li>
              <li>Harass, threaten, deceive, or defraud other users.</li>
            </ul>
          </section>

          {/* CONTENT */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              12. User Content
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              You retain responsibility for information, photographs,
              descriptions, vehicle details, and other content that you
              submit to NorthSky Auto.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              By submitting content, you represent that you have the necessary
              rights to provide that content and that its use through the
              platform does not violate applicable law or another person's
              rights.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You grant NorthSky Auto permission to use, store, reproduce,
              display, and distribute submitted content as reasonably
              necessary to operate and promote the marketplace and provide
              requested services.
            </p>
          </section>

          {/* COMMUNICATIONS */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              13. Communications
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              By submitting contact information or creating an account, you
              agree that NorthSky Auto may contact you regarding your account,
              vehicle submission, marketplace activity, support requests,
              payments, security matters, and other service-related
              communications.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Promotional communications, where applicable, may be subject to
              additional consent and unsubscribe requirements.
            </p>
          </section>

          {/* THIRD PARTY SERVICES */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              14. Third-Party Services
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may rely on third-party services for hosting,
              databases, authentication, payment processing, communications,
              analytics, security, and other functionality.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Third-party services may have their own terms and privacy
              policies. NorthSky Auto is not responsible for services outside
              our reasonable control.
            </p>
          </section>

          {/* AVAILABILITY */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              15. Website Availability
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              We work to keep NorthSky Auto available and functional, but we
              do not guarantee that the website or any particular feature
              will always be available, uninterrupted, secure, or error-free.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Services may occasionally be unavailable due to maintenance,
              upgrades, technical issues, third-party services, network
              problems, or circumstances outside our reasonable control.
            </p>
          </section>

          {/* DISCLAIMER */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              16. Marketplace Disclaimer
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto provides a technology platform intended to
              facilitate connections between vehicle sellers and potential
              buyers or dealerships.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We do not guarantee the accuracy, completeness, condition,
              ownership, legality, availability, or value of any vehicle
              information submitted by users.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Users are responsible for independently verifying information
              and conducting appropriate due diligence before entering into
              any vehicle transaction.
            </p>
          </section>

          {/* LIMITATION */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              17. Limitation of Liability
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              To the maximum extent permitted by applicable law, NorthSky Auto
              and its owners, operators, employees, contractors, and service
              providers will not be responsible for indirect, incidental,
              special, consequential, or punitive damages arising from or
              related to use of the platform.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Nothing in these Terms is intended to exclude or limit liability
              where doing so would be prohibited by applicable law.
            </p>
          </section>

          {/* INDEMNIFICATION */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              18. User Responsibility and Indemnification
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              To the extent permitted by applicable law, you are responsible
              for your use of NorthSky Auto and for information or content
              you submit.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You agree to be responsible for claims, losses, damages, or
              expenses arising from your violation of these Terms, unlawful
              activity, fraudulent conduct, or infringement of another
              person's rights.
            </p>
          </section>

          {/* SUSPENSION */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              19. Suspension and Termination
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may suspend, restrict, or terminate access to
              accounts or services where reasonably necessary, including for
              suspected fraud, abuse, security concerns, violations of these
              Terms, unlawful activity, or non-payment.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We may also remove content or vehicle submissions that violate
              these Terms or are otherwise unsuitable for the marketplace.
            </p>
          </section>

          {/* CHANGES */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              20. Changes to These Terms
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              NorthSky Auto may update these Terms from time to time to
              reflect changes to our services, business practices, technology,
              or legal requirements.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Updated Terms will be posted on this page with a revised
              updated date. Your continued use of the platform after changes
              are posted may constitute acceptance of the updated Terms to
              the extent permitted by law.
            </p>
          </section>

          {/* GOVERNING LAW */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">
              21. Governing Law
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              These Terms are intended to be interpreted in accordance with
              applicable Canadian law and the laws applicable to the
              jurisdiction in which NorthSky Auto operates, subject to any
              mandatory legal requirements that apply to a particular user
              or transaction.
            </p>
          </section>

          {/* CONTACT */}
          <section className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-black text-slate-950">
              22. Contact NorthSky Auto
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              If you have questions about these Terms, your account, a
              vehicle submission, dealer membership, or another NorthSky Auto
              service, please contact us.
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-black">
            Ready to use NorthSky Auto?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Explore vehicle opportunities, submit a vehicle, or learn more
            about dealer memberships.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
            >
              Sell a Vehicle
            </Link>

            <Link
              href="/buyers"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15"
            >
              Dealer Marketplace
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