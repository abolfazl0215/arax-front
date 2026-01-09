/**
 * Login Page
 * Simple login form (UI only, no actual authentication)
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useBookingStore from "@/store/bookingStore";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { setUser } = useBookingStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a local user object (no actual authentication)
    const userData = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.email.split("@")[0],
      loginDate: new Date().toISOString(),
    };
    setUser(userData);
    router.push("/profile");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 text-black border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium">
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span className="text-teal-600 font-medium">
              Just enter any email and password to continue
            </span>
          </p>
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-teal-600 hover:text-teal-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
