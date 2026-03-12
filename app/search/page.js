"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import AuthModal from "@/components/AuthModal";

import { Suspense } from "react";

function SearchResultsContent({ query, results, setSelectedProduct }) {
  if (results.length === 0 && !!query) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray-500)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🔍</div>
        <h3>No products found for "{query}"</h3>
        <p>Try using different keywords or checking your spelling.</p>
        <Link href="/" className="btn-outline" style={{ color: "var(--navy)", borderColor: "var(--navy)", marginTop: "16px" }}>
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="products-grid" style={{ marginTop: "32px" }}>
      {results.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetail={setSelectedProduct}
        />
      ))}
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const q = query.toLowerCase();
      const filtered = products.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          (p.specs && Object.values(p.specs).some(val => val.toString().toLowerCase().includes(q)))
        );
      });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <>
      <Header onAuthOpen={() => setAuthOpen(true)} />
      
      <main className="category-page" style={{ minHeight: "60vh" }}>
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Search Results</span>
        </div>

        <h1 className="category-title">
          {query ? `Search Results for "${query}"` : "Search"}
        </h1>
        <div className="category-count">{results.length} Products Found</div>

        <SearchResultsContent 
          query={query} 
          results={results} 
          setSelectedProduct={setSelectedProduct} 
        />
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
