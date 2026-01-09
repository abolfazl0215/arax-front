/**
 * Booking Store - Zustand store for managing user data, bookings and app data
 * All data is stored locally in the browser
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      // User profile data
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),

      // User bookings grouped by type
      bookings: {
        tours: [],
        visas: [],
        flights: [],
        hotels: [],
        trains: [],
        airportServices: [],
        insurance: [],
      },

      addBooking: (type, bookingData) =>
        set((state) => {
          // در صورت وجود داده قدیمی یا null، ساختار bookings را امن می‌کنیم
          const safeBookings =
            state.bookings && typeof state.bookings === "object"
              ? state.bookings
              : {};

          const currentTypeBookings = Array.isArray(
            safeBookings[type],
          )
            ? safeBookings[type]
            : [];

          return {
            bookings: {
              ...safeBookings,
              [type]: [
                ...currentTypeBookings,
                {
                  ...bookingData,
                  id: Date.now().toString(),
                  status: "processing",
                  bookingDate: new Date().toISOString(),
                },
              ],
            },
          };
        }),

      removeBooking: (type, bookingId) =>
        set((state) => ({
          bookings: {
            ...state.bookings,
            [type]: state.bookings[type].filter(
              (item) => item.id !== bookingId,
            ),
          },
        })),

      clearBookings: () =>
        set({
          bookings: {
            tours: [],
            visas: [],
            flights: [],
            hotels: [],
            trains: [],
            airportServices: [],
            insurance: [],
          },
        }),

      // App data collections
      blogs: null,
      setBlogs: (blogsData) => set({ blogs: blogsData }),

      reviews: null,
      setReviews: (reviewsData) => set({ reviews: reviewsData }),

      tours: null,
      setTours: (toursData) => set({ tours: toursData }),

      visas: null,
      setVisas: (visasData) => set({ visas: visasData }),
    }),
    {
      name: "arax-booking-storage",
    },
  ),
);

export default useBookingStore;
