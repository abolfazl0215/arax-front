/**
 * Blog Detail Page
 * Individual blog article page
 */

"use client";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";

export default function BlogDetailPage() {
  const params = useParams();
  const { blogs } = useBookingStore();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const foundBlog = blogs.find((b) => b._id === params.id);
      setBlog(foundBlog || null);
      setIsLoading(false);
    }
  }, [blogs, params.id]);

  // فقط وقتی 404 بده که لود تموم شده و بلاگی با این id پیدا نشده
  if (!isLoading && !blog) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/blogs"
            className="text-teal-600 hover:text-teal-700 font-medium mb-6 inline-block">
            ← Back to Blogs
          </Link>

          {isLoading || !blog ? (
            <p className="text-center text-gray-500">
              در حال بارگذاری...
            </p>
          ) : (
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                    {blog.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {blog.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.author}</span>
                  </div>
                </div>

                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
