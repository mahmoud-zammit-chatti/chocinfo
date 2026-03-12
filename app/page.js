"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts, { DealsSection } from "@/components/FeaturedProducts";
import MaintenanceBanner, { TrustBadges } from "@/components/MaintenanceBanner";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import CartModal from "@/components/CartModal";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Header onAuthOpen={() => setAuthOpen(true)} />
      
      <main>
        <Hero />
        <FeaturedProducts onViewDetail={setSelectedProduct} />
        <DealsSection onViewDetail={setSelectedProduct} />
        <MaintenanceBanner />
        <TrustBadges />
      </main>
      
      <Footer />
      
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      <CartModal />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
