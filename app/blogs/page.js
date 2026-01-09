/**
 * Blogs Page
 * Travel blog and articles
 */

"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import useBookingStore from '@/store/bookingStore';



export default function BlogsPage() {
  const { blogs } = useBookingStore();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Travel Blogs
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs && blogs.length > 0 && blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

