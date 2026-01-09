/**
 * Visa Detail Page
 * Individual visa details and application
 */

"use client";

import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { ClipLoader } from "react-spinners";

export default function VisaDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { visas, user, addBooking } = useBookingStore();
  const [visa, setVisa] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (visas && visas.length > 0) {
      setVisa(visas.find((v) => v._id === resolvedParams.id));
    }
  }, [visas]);

  if (!visa) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Visa Not Found
            </h1>
            <Link
              href="/visas"
              className="text-teal-600 hover:text-teal-700 font-medium">
              ← Back to Visas
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      addBooking("visas", visa);

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success(
        "Visa application submitted successfully! Check your profile.",
      );
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
            href="/visas"
            className="text-teal-600 hover:text-teal-700 font-medium mb-6 inline-block">
            ← Back to Visas
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <img
                src={visa.image}
                alt={visa.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {visa.title}
              </h1>
              {visa.description && (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {visa.description}
                </p>
              )}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">
                      Processing Time
                    </p>
                    <p className="font-semibold text-gray-900">
                      {visa.processingTime}
                    </p>
                  </div>
                </div>
                {visa.validity && (
                  <div>
                    <p className="text-sm text-gray-500">Validity</p>
                    <p className="font-semibold text-gray-900">
                      {visa.validity}
                    </p>
                  </div>
                )}
                {visa.type && (
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-semibold text-gray-900">
                      {visa.type}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-teal-600">
                    ${visa.price}
                  </p>
                </div>
                <button
                  onClick={handleApply}
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-teal-600 text-white rounded-md transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitting
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:bg-teal-700"
                  }`}>
                  {isSubmitting ? (
                    <>
                      <ClipLoader color="#ffffff" size={18} />
                      <span>Applying...</span>
                    </>
                  ) : (
                    "Apply Now"
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
