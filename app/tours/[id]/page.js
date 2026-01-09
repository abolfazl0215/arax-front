/**
 * Tour Detail Page
 * Individual tour details and booking
 */

"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function TourDetailPage({ params }) {
  const router = useRouter();
  const { addBooking, user, tours } = useBookingStore();
  const resolvedParams = use(params);
  const [tour, setTour] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (tours && tours.length > 0) {
      setTour(tours.find((t) => t._id === resolvedParams.id));
    }
  }, [tours]);

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tour Not Found
            </h1>
            <Link
              href="/tours"
              className="text-teal-600 hover:text-teal-700 font-medium">
              ← Back to Tours
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBook = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      addBooking("tours", tour);

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Tour booked successfully! Check your profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/tours"
            className="text-teal-600 hover:text-teal-700 font-medium mb-6 inline-block">
            ← Back to Tours
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {tour.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span>🎧</span>
                <span className="font-medium">{tour.provider}</span>
              </div>
              <p className="text-gray-600 mb-4">{tour.airline}</p>
              {tour.description && (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {tour.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {tour.duration && (
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {tour.duration}
                    </p>
                  </div>
                )}
                {tour.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">
                      {tour.location.city} , {tour.location.country}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-teal-600">
                    ${tour.price}
                  </p>
                </div>
                <button
                  onClick={handleBook}
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-teal-600 text-white rounded-md transition-colors font-medium flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-teal-700"
                  }`}>
                  {isSubmitting ? (
                    <>
                      <ClipLoader color="#ffffff" size={18} />
                      <span>Booking...</span>
                    </>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
