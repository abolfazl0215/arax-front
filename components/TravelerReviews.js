/**
 * Traveler Reviews Component
 * Displays user reviews with video thumbnails using Swiper
 */

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import useBookingStore from "@/store/bookingStore";

export default function TravelerReviews() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { reviews } = useBookingStore();

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 px-4 mt-10 md:mt-20 md:px-[16vw] bg-gradient-to-tr from-teal-500 to-teal-100">
      <style jsx global>{`
        .reviews-swiper .swiper-button-next,
        .reviews-swiper .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          padding: 10px !important;
        }
        .reviews-swiper .swiper-button-next::after,
        .reviews-swiper .swiper-button-prev::after {
          font-size: 16px !important;
        }
      `}</style>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Traveler reviews
          </h2>
          <Link
            href="/reviews"
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

        <Swiper
          modules={isMobile ? [] : [Navigation]}
          navigation={!isMobile}
          spaceBetween={8}
          slidesPerView={1.1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="reviews-swiper"
          style={{ paddingBottom: "10px" }}>
          {reviews &&
            reviews.length &&
            reviews.map((review) => (
              <SwiperSlide
                key={review._id}
                style={{ height: "auto" }}>
                <div className="bg-white flex flex-col justify-between mt-3 p-2 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div>
                    {/* Video Thumbnail */}
                    <div className="relative h-48">
                      <img
                        src={review.videoThumbnail}
                        alt={review.headline}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <svg
                            className="w-8 h-8 text-teal-600 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        {review.headline}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {review.text}
                      </p>
                    </div>
                  </div>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3 px-4 pb-4 border-t border-slate-200 pt-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                      {review.reviewer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex w-full items-center justify-between">
                        <p className="font-medium text-gray-900">
                          {review.reviewer.name}
                        </p>
                        {/* Rating */}
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-3 h-3 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {review.tour} {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
