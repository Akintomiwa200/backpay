'use client';
import { useEffect, useRef } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export default function PrivacyPolicy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />

      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900"
          >
            Privacy Policy
          </h1>

          <div
            ref={contentRef}
            className="prose prose-lg max-w-none text-gray-700 space-y-8"
          >
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                Effective Date: June 15, 2025
              </h2>
              <p className="text-gray-600">
                ‎Laskad Technologies Limited ("Laskad", "we", "our", or "us") is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, share, and protect your personal
                information in compliance with the Nigeria Data Protection
                Regulation (NDPR) and applicable banking regulations. ‎
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">‎1. Scope</h3>
              <p>
                ‎This policy applies to all users of the Laskad mobile
                application and web platform. By using our services, you consent
                to the practices described in this policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                ‎2. What Information We Collect
              </h3>
              <p>
                ‎We may collect the following categories of personal information
                from you: ‎ ‎Identity Information: Full name, phone number, and
                Bank Verification Number (BVN) ‎ ‎Your BVN is verified securely
                via our partner bank and is not retained by Laskad after
                verification. ‎ ‎Contact Information: Phone number, email
                address (if applicable) ‎ ‎Transaction Data: Payment history,
                airtime/data purchases, bill payments, and wallet funding
                activities ‎ ‎Device and Platform Info: WhatsApp user ID, device
                type (for troubleshooting and analytics) ‎ ‎KYC/Verification
                Data: Provided via our regulated partners (e.g., BVN
                verification, account setup) ‎ ‎BVN is processed securely via
                our banking partner and not stored on our systems after
                verification
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                ‎3. Legal Basis for Processing
              </h3>
              <p>
                ‎We process your data lawfully under the following bases: ‎
                ‎Contractual necessity – to provide you with Laskad’s services.
                ‎ ‎Regulatory compliance – especially with CBN, NDIC, and AML
                requirements. ‎ ‎Consent: You give us permission to process your
                data by tapping “I consent” during onboarding ‎ ‎Legal
                Obligation: For identity verification and compliance with
                Anti-Money Laundering (AML) and Know-Your-Customer (KYC)
                requirements ‎ ‎Legitimate Interest: For providing secure and
                efficient services through our partners
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                ‎4. How We Use Your Information
              </h3>
              <p>
                We use your information to: ‎ ‎Create and verify your financial
                account via Safe Haven Microfinance Bank. ‎ ‎Process payments
                and display your transaction history. ‎ ‎Provide customer
                support and resolve disputes. ‎ ‎Improve our platform’s security
                and performance. ‎ ‎Fulfill legal obligations (e.g. fraud
                detection, AML reporting).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">‎5. Data Sharing</h3>
              <p>
                ‎We share your data only with regulated partners who provide
                critical services: ‎ ‎a. Safe Haven Microfinance Bank ‎ ‎- For
                account creation, identity verification, and financial
                transaction processing. ‎Safeguards: Licensed by the Central
                Bank of Nigeria (CBN), audited annually by NDIC. ‎ ‎ ‎ ‎b. Lint
                Technologies ‎ ‎- For biometric and document verification, fraud
                screening, and secure transaction routing. ‎Safeguards: ISO
                27001 certified; governed by NDPR-aligned Data Processing
                Agreements (DPAs). ‎ ‎ ‎ ‎c. Regulators and Law Enforcement ‎ ‎-
                Only in response to legal obligations, valid court orders, or
                lawful regulatory directives.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. Data Security</h3>
              <p>
                We maintain strong technical and organizational measures to
                secure your data, including: ‎ ‎AES-256 encryption in transit
                and at rest ‎ ‎Role-based access controls ‎ ‎Annual penetration
                testing ‎ ‎Secure storage of authentication credentials ‎ ‎Data
                Processing Agreements (DPAs) with third-party vendors
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">‎7. Data Retention</h3>
              <p>
                ‎We retain data only as long as necessary: ‎ ‎BVN: Automatically
                deleted 48 hours after verification. ‎ ‎Transaction Data:
                Retained for 7 years, per financial recordkeeping laws. ‎
                ‎Inactive Users: Personal data is deleted after 2 years of
                inactivity, unless required by law to retain it longer.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                ‎‎8. Your Data Rights
              </h3>
              <p>
                Under the NDPR, you have the right to: ‎ ‎Access the personal
                data we hold about you ‎ ‎Request correction of inaccurate data
                ‎ ‎Withdraw consent at any time ‎ ‎Request deletion of your data
                (subject to regulatory retention obligations) ‎ ‎ ‎To exercise
                your rights, please email: privacy@laskad.app
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                ‎9. Breach Notification
              </h3>
              <p>
                ‎In the unlikely event of a breach affecting your data, we will:
                ‎Notify NDPB within 72 hours of qualifying breaches ‎Alert
                affected users via SMS/WhatsApp ‎Publish remediation steps on
                our website
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                ‎10. Policy Updates
              </h3>
              <p>
                ‎‎We may update this Privacy Policy periodically. We will notify
                you via the app or your registered email address. Continued use
                after updates means you accept the revised terms.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p>
                ‎For questions about this Privacy Policy or how we handle your
                data, contact:
                <br />
                ‎Data Protection Officer (DPO)
                <br />
                ‎Laskad Technologies Limited
                <br />
                ‎📧 Email: privacy@laskad.app
                <br />
                ‎📍 Office: No. 10 Akila Machunga Street, Jos, Plateau State,
                Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
