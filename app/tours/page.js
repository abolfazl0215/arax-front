/**
 * Tours Page
 * Displays all available tours with booking functionality
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function ToursPage() {
  const router = useRouter();
  const { addBooking, tours, user } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const handleBook = async (tour) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (loadingId) return;

    setLoadingId(tour._id);
    try {
      addBooking("tours", tour);

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Tour booked successfully! Check your profile.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredTours = tours
    ? tours.filter((tour) =>
        tour.title
          .toLowerCase()
          .includes(searchTerm ? searchTerm.toLowerCase() : ""),
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-[16vw] bg-[#f5f5f5]">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Tours
          </h1>

          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500 text-black"
            />
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredTours && filteredTours.length > 0 && filteredTours.map((tour) => (
              <div
                key={tour._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>🎧</span>
                    <span>{tour.provider}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {tour.airline}
                  </p>
                  {tour.duration && (
                    <p className="text-sm text-gray-600 mb-2">
                      Duration: {tour.duration}
                    </p>
                  )}
                  {tour.location && (
                    <p className="text-sm text-gray-600 mb-4">
                      Location : {tour.location.city} ,{" "}
                      {tour.location.country}
                    </p>
                  )}
                  <p className="text-lg font-bold text-teal-600 mb-4">
                    ${tour.price}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/tours/${tour._id}`}
                      className="flex-1 text-center py-2 px-4 text-sm text-teal-600 hover:text-teal-700 font-medium border-2 border-teal-600 rounded-md">
                      Details
                    </Link>
                    <button
                      onClick={() => handleBook(tour)}
                      disabled={loadingId === tour._id}
                      className={`flex-1 py-2 px-4 bg-teal-600 text-white rounded-md transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                        loadingId === tour._id
                          ? "opacity-80 cursor-not-allowed"
                          : "hover:bg-teal-700"
                      }`}>
                      {loadingId === tour._id ? (
                        <>
                          <ClipLoader color="#ffffff" size={16} />
                          <span>Booking...</span>
                        </>
                      ) : (
                        "Book Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tours found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
