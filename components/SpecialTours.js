"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import useBookingStore from "@/store/bookingStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export default function SpecialTours() {
  const { addBooking, tours, user } = useBookingStore();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [specialTours, setSpecialTours] = useState([]);

  // 👇 loading per item
  const [loadingIds, setLoadingIds] = useState(new Set());

  useEffect(() => {
    if (tours && tours.length > 0) {
      setSpecialTours(tours.filter((tour) => tour.special));
    }
  }, [tours]);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBook = async (tour) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (loadingIds.has(tour._id)) return;

    // add loading for this item
    setLoadingIds((prev) => {
      const next = new Set(prev);
      next.add(tour._id);
      return next;
    });

    try {
      addBooking("tours", tour);

      // simulate api call
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Tour booked successfully! Check your profile.");
    } catch (err) {
      toast.error("Booking failed");
    } finally {
      // remove loading for this item
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(tour._id);
        return next;
      });
    }
  };

  if (!isMounted) return null;

  return (
    <section className="px-3 mt-10 md:mt-20 md:px-[16vw]">
      <style jsx global>{`
        .special-tours-swiper .swiper-button-next,
        .special-tours-swiper .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          padding: 10px !important;
        }
        .special-tours-swiper .swiper-button-next::after,
        .special-tours-swiper .swiper-button-prev::after {
          font-size: 16px !important;
        }
      `}</style>

      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Special tours
          </h2>
          <Link
            href="/tours"
            className="text-[#37A5FF] hover:text-teal-700 flex items-center gap-2 mr-1">
            see all
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
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <Swiper
          modules={isMobile ? [] : [Navigation]}
          navigation={!isMobile}
          spaceBetween={8}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="special-tours-swiper"
          style={{ paddingBottom: "10px" }}>
          {specialTours.map((tour, index) => (
            <SwiperSlide
              key={`${tour._id}-${index}`}
              style={{ height: "auto" }}>
              <div className="bg-white flex flex-col justify-between mt-3 p-2 rounded-xl border-2 border-[#E6E6E6] hover:shadow-lg transition-shadow h-full">
                <div className="flex flex-col flex-1">
                  <div className="relative h-48">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="p-2 flex flex-col flex-1">
                    <h3 className="font-semibold mb-2 text-gray-900">
                      {tour.title}
                    </h3>

                    <div className="text-sm text-gray-600 mb-2">
                      🎧 {tour.provider} / {tour.airline}
                    </div>

                    <div className="flex-1" />

                    <p className="text-teal-600">
                      Prices start from ${tour.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-2 px-2 pb-3">
                  <Link
                    href={`/tours/${tour._id}`}
                    className="flex-1 text-center py-3 rounded-xl text-sm border border-teal-600 text-teal-600 hover:text-teal-700 font-medium">
                    Details
                  </Link>

                  <button
                    onClick={() => handleBook(tour)}
                    disabled={loadingIds.has(tour._id)}
                    className={`flex-1 font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer
                      ${
                        loadingIds.has(tour._id)
                          ? "bg-teal-600 opacity-80 cursor-not-allowed"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white`}>
                    {loadingIds.has(tour._id) ? (
                      <>
                        <ClipLoader size={16} color="#fff" />
                        <span>Booking...</span>
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
