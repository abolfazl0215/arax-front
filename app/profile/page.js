/**
 * Profile Page
 * Displays user bookings (tours, visas, etc.) with processing status
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user, bookings, removeBooking } = useBookingStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  console.log({ user });

  const bookingTypes = [
    { key: "tours", label: "Tours", icon: "✈️" },
    { key: "visas", label: "Visas", icon: "📋" },
    { key: "flights", label: "Flights", icon: "✈️" },
    { key: "hotels", label: "Hotels", icon: "🏨" },
    { key: "trains", label: "Trains", icon: "🚂" },
    { key: "airportServices", label: "Airport Services", icon: "🛫" },
    { key: "insurance", label: "Insurance", icon: "🛡️" },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      processing: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          colors[status] || colors.processing
        }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          {/* User Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="w-3/5">
                <h1 className="text-xl font-bold text-gray-900 overflow-hidden text-ellipsis">
                  {user.name}
                </h1>
                <p className="text-gray-600  overflow-hidden text-ellipsis">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="space-y-8">
            {bookingTypes.map((type) => {
              const items = bookings[type.key] || [];
              if (items.length === 0) return null;

              return (
                <div
                  key={type.key}
                  className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>{type.icon}</span>
                    {type.label}
                  </h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="border-2 border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                              {item.title || item.name || "Booking"}
                            </h3>
                            {item.price && (
                              <p className="text-teal-600 font-bold mb-2">
                                ${item.price}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-gray-600 text-sm mb-2">
                                {item.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Booked on:{" "}
                              {new Date(
                                item.bookingDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(item.status)}
                            <button
                              onClick={() =>
                                removeBooking(type.key, item.id)
                              }
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {Object.values(bookings).every(
            (arr) => arr.length === 0,
          ) && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">
                You don't have any bookings yet.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium">
                Browse Tours & Services
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
