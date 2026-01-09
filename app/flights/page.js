/**
 * Flights Page
 * Displays flight booking options
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function FlightsPage() {
  const router = useRouter();
  const { addBooking, user } = useBookingStore();

  const [formData, setFormData] = useState({
    type: "domestic",
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
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
      addBooking("flights", {
        ...formData,
        price: formData.type === "domestic" ? 300 : 800,
      });

      // Delay ساختگی برای طبیعی‌تر شدن تجربه
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Flight booked successfully! Check your profile.");

      setFormData({
        type: "domestic",
        origin: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        passengers: 1,
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
            Book a Flight
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Flight Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Flight Type
                </label>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-gray-800 font-medium">
                    <input
                      type="radio"
                      value="domestic"
                      checked={formData.type === "domestic"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value,
                        })
                      }
                      className="accent-teal-600"
                    />
                    Domestic Flight
                  </label>

                  <label className="flex items-center gap-2 text-gray-800 font-medium">
                    <input
                      type="radio"
                      value="international"
                      checked={formData.type === "international"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value,
                        })
                      }
                      className="accent-teal-600"
                    />
                    International Flight
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Origin
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
                    placeholder="City or Airport"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Destination
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
                    placeholder="City or Airport"
                    className={inputClass}
                  />
                </div>

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

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Return Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        returnDate: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

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
                  "Book Flight"
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
