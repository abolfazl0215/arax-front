/**
 * Header Component
 * Contains navigation menu and profile access
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import useBookingStore from "@/store/bookingStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const { user, logout, setBlogs, setReviews, setTours, setVisas } =
    useBookingStore();

  const getData = async () => {
    const response = await axios.get(
      "https://arax-back.onrender.com/api/getAllData",
    );
    console.log(response.data);
    setBlogs(response.data.blogs);
    setReviews(response.data.reviews);
    setTours(response.data.tours);
    setVisas(response.data.visas);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        // Check if click is on hamburger button
        const hamburgerButton = event.target.closest(
          'button[aria-label="Toggle menu"]',
        );
        if (!hamburgerButton) {
          closeMenu();
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2 md:py-4 flex items-center justify-between">
        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-black md:hidden hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center hidden md:block">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-pink-500"></div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/tours"
            className="text-gray-700 hover:text-teal-600 transition-colors">
            Tours
          </Link>
          <Link
            href="/flights"
            className="text-gray-700 hover:text-teal-600 transition-colors">
            Flights
          </Link>
          <Link
            href="/hotels"
            className="text-gray-700 hover:text-teal-600 transition-colors">
            Hotels
          </Link>
          <Link
            href="/visas"
            className="text-gray-700 hover:text-teal-600 transition-colors">
            Visas
          </Link>
        </nav>

        {/* Profile Button */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Profile menu">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
              {user ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}>
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setIsProfileOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slide-in Menu from Left */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        />

        {/* Side Menu */}
        <div
          ref={menuRef}
          className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Menu
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close menu">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Home
                </Link>
                <Link
                  href="/tours"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Tours
                </Link>
                <Link
                  href="/flights"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Flights
                </Link>
                <Link
                  href="/hotels"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Hotels
                </Link>
                <Link
                  href="/visas"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Visas
                </Link>
                <Link
                  href="/trains"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Trains
                </Link>
                <Link
                  href="/blogs"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Blogs
                </Link>
                <Link
                  href="/reviews"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Reviews
                </Link>
                <Link
                  href="/about"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-lg text-gray-700 hover:text-teal-600 transition-colors py-2"
                  onClick={closeMenu}>
                  Contact
                </Link>
                <div className="border-t my-4"></div>
                <Link
                  href={user ? "/profile" : "/login"}
                  className="text-lg font-semibold text-teal-600 hover:text-teal-700 transition-colors py-2 cursor-pointer"
                  onClick={closeMenu}>
                  {user ? "My Profile" : "Login"}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </>
    </header>
  );
}
