/**
 * About Section Component
 * Displays company information and mission
 */

import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="px-3 mt-10 md:mt-20 md:px-[16vw] pb-5">
      <div className="container max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Travel your dreams with Arax
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          Arax Tour & Travel was founded in 2018 with the vision of
          making travel easier, more enjoyable, and more accessible
          for everyone. Since its establishment, the company has been
          providing a wide range of tourism services, including
          domestic and international tours, flight bookings, hotel
          reservations, travel insurance, and visa assistance.{" "}
          <Link
            href="/about"
            className="inline-block text-teal-600 hover:text-teal-700 font-medium ml-2">
            More →
          </Link>
        </p>
      </div>
    </section>
  );
}
