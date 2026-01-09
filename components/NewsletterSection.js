/**
 * Newsletter Section Component
 * Email subscription form
 */

"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="px-3 mt-10 md:mt-20 md:px-[16vw] pb-5">
      <div className="container  max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Join us
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated on discounts and the latest tours
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3  rounded-xl border border-gray-300">
          <div className="flex items-center w-full">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 text-black px-4 py-3 border-0 rounded-md focus:outline-none focus:border-teal-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-3 h-full bg-teal-500 text-white rounded-r-md hover:bg-green-700 transition-colors font-medium cursor-pointer">
              {submitted ? "Subscribed!" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
