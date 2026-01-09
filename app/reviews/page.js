/**
 * Reviews Page
 * All traveler reviews
 */
"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useBookingStore from '@/store/bookingStore';


export default function ReviewsPage() {
  const { reviews } = useBookingStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Traveler Reviews
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews && reviews.length &&reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={review.videoThumbnail}
                    alt={review.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <svg
                        className="w-8 h-8 text-teal-600 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {review.headline}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{review.text}</p>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                      {review.reviewer.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.reviewer.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.tour} {review.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

