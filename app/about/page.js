/**
 * About Us Page
 * Company information and mission
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us - Arax Tour & Travel',
  description:
    'Learn more about Arax Tour & Travel, founded in 2018 with the vision of making travel easier and more accessible.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            About Arax Tour & Travel
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Arax Tour & Travel was founded in 2018 with the vision of making
                travel easier, more enjoyable, and more accessible for everyone.
                Since its establishment, the company has been providing a wide
                range of tourism services, including domestic and international
                tours, flight bookings, hotel reservations, travel insurance, and
                visa assistance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to be the leading travel agency that helps people
                discover amazing destinations around the globe. Our mission is to
                provide exceptional service, competitive prices, and memorable
                travel experiences for all our customers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Domestic and International Tours</li>
                <li>Flight Bookings (Domestic & International)</li>
                <li>Hotel Reservations</li>
                <li>International Train Tickets</li>
                <li>Airport Formalities and Services</li>
                <li>Travel Insurance</li>
                <li>Visa Assistance</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Years of experience in the travel industry</li>
                <li>Competitive prices and special offers</li>
                <li>Professional and knowledgeable team</li>
                <li>24/7 customer support</li>
                <li>Wide range of destinations</li>
                <li>Easy booking process</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

