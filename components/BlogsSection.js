/**
 * Blogs Section Component
 * Displays blog articles using Swiper
 */

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import useBookingStore from "@/store/bookingStore";
import { useEffect, useState } from "react";

export default function BlogsSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { blogs } = useBookingStore();

  if (!isMounted) {
    return null;
  }

  return (
    <section className=" px-3  md:py-12 mt-10 md:mt-20 md:px-[16vw] bg-white py-8">
      <style jsx global>{`
        .blogs-swiper .swiper-button-next,
        .blogs-swiper .swiper-button-prev {
          width: 35px !important;
          height: 35px !important;
        }
        .blogs-swiper .swiper-button-next::after,
        .blogs-swiper .swiper-button-prev::after {
          font-size: 16px !important;
        }
      `}</style>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Travel Blogs
          </h2>
          <Link
            href="/blogs"
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
          className="blogs-swiper"
          style={{ paddingBottom: "10px" }}>
          {blogs && blogs.length > 0 &&  blogs.map((blog) => (
            <SwiperSlide key={blog._id} style={{ height: "auto" }}>
              <Link href={`/blogs/${blog._id}`}>
                <div className="bg-slate-100 flex flex-col justify-between rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <div>
                    <div className="relative h-48">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 py-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {blog.date}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 pb-6">
                    <span className="text-sm text-teal-600 font-medium">
                      {blog.category}
                    </span>
                    <span className="text-teal-600 hover:text-teal-700 font-medium">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
