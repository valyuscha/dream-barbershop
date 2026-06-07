import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
import Location from "@/components/Location";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const Home = () => {
  return (
    <div data-testid="home-page" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Gallery />
        <Reviews />
        <Booking />
        <Location />
        <InstagramFeed />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Home;
