"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useBookingStore from "@/store/bookingStore";
import { toast } from "sonner";

export default function PopularVisas() {
  const { addBooking, user, visas } = useBookingStore();
  const [popularVisas, setPopularVisas] = useState([]);
  useEffect(() => {
    if (visas && visas.length > 0) {
      setPopularVisas(visas.filter((visa) => visa.popular));
    }
  }, [visas]);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBook = (visa) => {
    if (!user) {
      router.push("/login");
      return;
    }
    addBooking("visas", visa);
    toast.success(
      "Visa application submitted successfully! Check your profile.",
    );
  };

  // 5 ویزای اول را نشان می‌دهیم
  const displayVisas = popularVisas.slice(0, 5);

  return (
    <section className="px-3 mt-10 md:mt-20 md:px-[16vw]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Popular visas
          </h2>
          <Link
            href="/visas"
            className="text-[#37A5FF] hover:text-teal-700  flex items-center gap-2 mr-1">
            see all{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="15"
              fill="none"
              viewBox="0 0 11 9">
              <path
                fill="#37A5FF"
                fillRule="evenodd"
                d="M6.387.146a.45.45 0 0 1 .663 0l3.75 4a.524.524 0 0 1 0 .708l-3.75 4a.45.45 0 0 1-.663 0 .524.524 0 0 1 0-.708L9.337 5H.47C.209 5 0 4.776 0 4.5S.21 4 .469 4h8.868L6.387.854a.524.524 0 0 1 0-.708"
                clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4  gap-1.5">
          {displayVisas &&
            displayVisas.length > 0 &&
            displayVisas.map((visa) => (
              <Link
                key={visa._id}
                href={`/visas/${visa._id}`}
                className="bg-white flex flex-col pb-3 justify-between mt-3 rounded-xl border-2 boredr-[#E6E6E6] overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                <div className="relative h-28">
                  <img
                    src={visa.image}
                    alt={visa.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="px-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {visa.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{visa.processingTime}</span>
                  </div>
                </div>
              </Link>
            ))}

          {/* کارت See All */}
          <Link
            href="/visas"
            className="bg-gray-50 flex flex-col items-center justify-center mt-3 rounded-xl border-2 border-gray-200 overflow-hidden hover:bg-gray-100 hover:border-gray-300 transition-all h-full min-h-[160px] group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              className="mb-2 group-hover:scale-110 transition-transform">
              <path
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-700 font-medium text-base">
              See All
            </span>
            <span className="text-gray-500 text-sm mt-1">
              {visas ? visas.length : 0} visas
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
