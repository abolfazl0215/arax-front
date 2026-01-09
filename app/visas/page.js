/**
 * Visas Page
 * Displays all available visas with application functionality
 */

"use client";

// Note: Metadata should be added via layout or head for client components

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";
import { ClipLoader } from "react-spinners";

export default function VisasPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState();
  const { addBooking, user, visas } = useBookingStore();
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  useEffect(() => {
    if (visas && visas.length > 0) {
      setFilteredVisas(
        visas.filter((visa) =>
          visa.title
            .toLowerCase()
            .includes(searchTerm ? searchTerm.toLowerCase() : ""),
        ),
      );
    }
  }, [visas, searchTerm]);

  const handleApply = async (visa) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (loadingId) return;

    setLoadingId(visa._id);
    try {
      addBooking("visas", visa);

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success(
        "Visa application submitted successfully! Check your profile.",
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-[16vw] bg-[#f5f5f5]">
        <div className="container max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Visas
          </h1>

          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search visas..."
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500 text-black"
            />
          </div>

          {/* Visas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredVisas && filteredVisas.length > 0 && filteredVisas.map((visa) => (
              <div
                key={visa._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={visa.image}
                    alt={visa.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    {visa.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <svg
                      className="w-5 h-5"
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
                    <span>
                      Processing time: {visa.processingTime}
                    </span>
                  </div>
                  {visa.validity && (
                    <p className="text-sm text-gray-600 mb-2">
                      Validity: {visa.validity}
                    </p>
                  )}
                  {visa.type && (
                    <p className="text-sm text-gray-600 mb-4">
                      Type: {visa.type}
                    </p>
                  )}
                  <p className="text-lg font-bold text-teal-600 mb-4">
                    ${visa.price}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/visas/${visa._id}`}
                      className="flex-1 text-center py-2 px-4 text-sm text-teal-600 hover:text-teal-700 font-medium border-2 border-teal-600 rounded-md">
                      Details
                    </Link>
                    <button
                      onClick={() => handleApply(visa)}
                      disabled={loadingId === visa._id}
                      className={`flex-1 py-2 px-4 bg-teal-600 text-white rounded-md transition-colors text-sm font-medium flex items-center justify-center gap-2 cursor-pointer ${
                        loadingId === visa._id
                          ? "opacity-80 cursor-not-allowed"
                          : "hover:bg-teal-700"
                      }`}>
                      {loadingId === visa._id ? (
                        <>
                          <ClipLoader color="#ffffff" size={16} />
                          <span>Applying...</span>
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVisas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No visas found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
