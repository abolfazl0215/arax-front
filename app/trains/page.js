/**
 * Trains Page
 * International train booking form
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function TrainsPage() {
  const router = useRouter();
  const { addBooking, user } = useBookingStore();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    passengers: 1,
    class: "economy",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      addBooking("trains", {
        ...formData,
        price:
          formData.class === "economy"
            ? 200
            : formData.class === "business"
            ? 400
            : 600,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Train ticket booked successfully! Check your profile.");

      setFormData({
        origin: "",
        destination: "",
        departureDate: "",
        passengers: 1,
        class: "economy",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border-2 border-gray-300 rounded-md text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Book International Train
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Origin Station
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        origin: e.target.value,
                      })
                    }
                    required
                    placeholder="City or Station"
                    className={inputClass}
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Destination Station
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destination: e.target.value,
                      })
                    }
                    required
                    placeholder="City or Station"
                    className={inputClass}
                  />
                </div>

                {/* Departure */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departureDate: e.target.value,
                      })
                    }
                    required
                    className={inputClass}
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.passengers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passengers: Number(e.target.value),
                      })
                    }
                    required
                    className={inputClass}
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Class
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        class: e.target.value,
                      })
                    }
                    className={`${inputClass} bg-white`}>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 bg-teal-600 text-white rounded-md font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-teal-700"
                }`}>
                {isSubmitting ? (
                  <>
                    <ClipLoader color="#ffffff" size={18} />
                    <span>Booking...</span>
                  </>
                ) : (
                  "Book Train Ticket"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
