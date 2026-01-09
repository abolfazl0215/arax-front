/**
 * Airport Formalities Page
 * Airport services booking form
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function AirportFormalitiesPage() {
  const router = useRouter();
  const { addBooking, user } = useBookingStore();

  const [formData, setFormData] = useState({
    airport: "",
    serviceType: "assistance",
    date: "",
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
      addBooking("airportServices", {
        ...formData,
        price: 100,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Airport service booked successfully! Check your profile.");

      setFormData({
        airport: "",
        serviceType: "assistance",
        date: "",
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
            Airport Formalities
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Airport */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Airport
                </label>
                <input
                  type="text"
                  value={formData.airport}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      airport: e.target.value,
                    })
                  }
                  required
                  placeholder="Airport name or code"
                  className={inputClass}
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Service Type
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceType: e.target.value,
                    })
                  }
                  className={`${inputClass} bg-white`}>
                  <option value="assistance">
                    General Assistance
                  </option>
                  <option value="vip">VIP Service</option>
                  <option value="fasttrack">Fast Track</option>
                  <option value="luggage">Luggage Handling</option>
                </select>
              </div>

              {/* Date & Passengers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                    required
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
                  "Book Service"
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
