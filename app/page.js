/**
 * Home Page - Landing Page
 * Main landing page matching the design specifications
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import SpecialTours from "@/components/SpecialTours";
import TravelerReviews from "@/components/TravelerReviews";
import PopularVisas from "@/components/PopularVisas";
import BlogsSection from "@/components/BlogsSection";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata = {
  title:
    "Arax Tour & Travel - Discover Amazing Destinations Around the Globe",
  description:
    "Arax Tour & Travel was founded in 2018 with the vision of making travel easier, more enjoyable, and more accessible for everyone.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-grow mb-20">
        {/* Hero Section - Title and Subtitle */}
        <section className="py-8 pb-3 md:py-16 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Arax Tour & Travel
            </h1>
            <p className="text-sm lg:text-base text-slate-400 mt-1">
              Discover amazing destinations around the globe
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesGrid />

        {/* Special Tours */}
        <SpecialTours />

        {/* Traveler Reviews */}
        <TravelerReviews />

        {/* Popular Visas */}
        <PopularVisas />

        {/* Blogs Section */}
        <BlogsSection />

        {/* About Section */}
        <AboutSection />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
