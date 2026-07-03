"use client";

import dynamic from "next/dynamic";
import OfferTicker from "@/components/OfferTicker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const FeaturedCategories = dynamic(() => import("@/components/FeaturedCategories"), { ssr: false });
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"), { ssr: false });
const ProductCarousel = dynamic(() => import("@/components/ProductCarousel"), { ssr: false });
const BannerSection = dynamic(() => import("@/components/BannerSection"), { ssr: false });
const DealsSection = dynamic(() => import("@/components/DealsSection"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: false });

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <OfferTicker />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <ProductCarousel />
        <BannerSection />
        <DealsSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
