/**
 * Root Layout Component
 * Provides the base HTML structure and metadata for SEO
 */
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title:
    "Arax Tour & Travel - Discover Amazing Destinations Around the Globe",
  description:
    "Arax Tour & Travel was founded in 2018 with the vision of making travel easier, more enjoyable, and more accessible for everyone. We provide tours, flights, hotels, visas, and travel insurance.",
  keywords:
    "travel, tours, flights, hotels, visas, travel insurance, tourism, Arax",
  openGraph: {
    title: "Arax Tour & Travel",
    description: "Discover amazing destinations around the globe",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster
          richColors
          toastOptions={{
            success: {
              duration: 3500,
              style: {
                background: "#ecfdf3",
                border: "1px solid #4ade80",
                color: "#166534",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
