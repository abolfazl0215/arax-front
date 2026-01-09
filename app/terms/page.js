/**
 * Terms and Conditions Page
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms and Conditions - Arax Tour & Travel',
  description: 'Terms and conditions for using Arax Tour & Travel services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the Arax Tour & Travel website, you accept
                and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Booking and Payment
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All bookings are subject to availability. Payment must be made in
                full at the time of booking unless otherwise specified. Prices are
                subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Cancellation Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Cancellation policies vary by service type. Please refer to the
                specific terms for each booking. Cancellation fees may apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Travel Documents
              </h2>
              <p className="text-gray-700 leading-relaxed">
                It is the customer's responsibility to ensure they have valid
                travel documents, including passports, visas, and any required
                vaccinations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Arax Tour & Travel shall not be liable for any loss, damage, or
                inconvenience caused by circumstances beyond our control, including
                but not limited to weather, natural disasters, or government
                actions.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

