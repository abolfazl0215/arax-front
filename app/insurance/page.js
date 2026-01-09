"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function InsurancePage() {
  const router = useRouter();
  const { addBooking, user } = useBookingStore();

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    coverage: "basic",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }
    if (isSubmitting) return;

    const prices = {
      basic: 50,
      standard: 100,
      premium: 200,
    };

    setIsSubmitting(true);
    try {
      addBooking("insurance", {
        ...formData,
        price: prices[formData.coverage] * Number(formData.travelers),
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success(
        "Travel insurance purchased successfully! Check your profile.",
      );

      setFormData({
        destination: "",
        startDate: "",
        endDate: "",
        travelers: 1,
        coverage: "basic",
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
            Travel Insurance
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
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
                  placeholder="Country or region"
                  className={inputClass}
                />
              </div>

              {/* Dates, Travelers, Coverage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    required
                    className={inputClass}
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    required
                    className={inputClass}
                  />
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.travelers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        travelers: Number(e.target.value),
                      })
                    }
                    required
                    className={inputClass}
                  />
                </div>

                {/* Coverage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Coverage Level
                  </label>
                  <select
                    value={formData.coverage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coverage: e.target.value,
                      })
                    }
                    className={`${inputClass} bg-white`}>
                    <option value="basic">Basic ($50/person)</option>
                    <option value="standard">
                      Standard ($100/person)
                    </option>
                    <option value="premium">
                      Premium ($200/person)
                    </option>
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
                    <span>Processing...</span>
                  </>
                ) : (
                  "Purchase Insurance"
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
