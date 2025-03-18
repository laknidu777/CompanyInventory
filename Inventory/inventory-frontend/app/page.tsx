'use client';
import Header from "./components/welcomePage/Header/page";
import HeroSection from "./components/welcomePage/HeroSection/page";
import BusinessFeatures from "./components/welcomePage/BusinessFeatures/page";
import Footer from "./components/welcomePage/Footer/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <HeroSection />
      <BusinessFeatures />
      <Footer />
    </div>
  );
}