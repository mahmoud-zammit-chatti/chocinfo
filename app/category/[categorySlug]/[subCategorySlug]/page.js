"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import AuthModal from "@/components/AuthModal";

export default function SubCategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug;
  const subCategorySlug = params.subCategorySlug;
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  // Find category and subcategory info
  const category = categories.find((c) => c.slug === categorySlug);
  const subCategory = category?.subcategories.find((s) => s.slug === subCategorySlug);
  
  // Filter products by category and subcategory
  const categoryProducts = products.filter((p) => {
    if (subCategorySlug) {
      return p.category === categorySlug && p.subcategory === subCategorySlug;
    }
    return p.category === categorySlug;
  });

  // Extract dynamic filter options from specs of the products in this category
  const filterOptions = useMemo(() => {
    const options = {};
    categoryProducts.forEach(product => {
      if (product.specs) {
        Object.entries(product.specs).forEach(([key, value]) => {
          if (!options[key]) options[key] = new Set();
          options[key].add(value);
        });
      }
    });
    // Convert Sets to Arrays and sort
    const formatted = {};
    Object.keys(options).forEach(key => {
      formatted[key] = Array.from(options[key]).sort();
    });
    return formatted;
  }, [categoryProducts]);

  // Handle checking a filter
  const toggleFilter = (specKey, specValue) => {
    setActiveFilters(prev => {
      const current = prev[specKey] || [];
      if (current.includes(specValue)) {
        const updated = current.filter(v => v !== specValue);
        if (updated.length === 0) {
          const newFilters = { ...prev };
          delete newFilters[specKey];
          return newFilters;
        }
        return { ...prev, [specKey]: updated };
      }
      return { ...prev, [specKey]: [...current, specValue] };
    });
  };

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return categoryProducts;
    
    return categoryProducts.filter(product => {
      return Object.entries(activeFilters).every(([specKey, selectedValues]) => {
        if (!product.specs || !product.specs[specKey]) return false;
        return selectedValues.includes(product.specs[specKey]);
      });
    });
  }, [categoryProducts, activeFilters]);

  const title = subCategory ? subCategory.name : (category ? category.name : "Products");

  return (
    <>
      <Header onAuthOpen={() => setAuthOpen(true)} />
      
      <main className="category-page">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          {subCategory ? (
            <>
              <Link href={`/category/${categorySlug}`}>{category?.name}</Link>
              <span>/</span>
              <span>{subCategory.name}</span>
            </>
          ) : (
            <span>{category?.name}</span>
          )}
        </div>

        <h1 className="category-title">{title}</h1>
        <div className="category-count">{filteredProducts.length} Products Found</div>

        <div className="category-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <h3 className="filters-title">Filters</h3>
            {Object.keys(filterOptions).length === 0 ? (
              <p className="no-filters">No specific filters available.</p>
            ) : (
              Object.entries(filterOptions).map(([specKey, values]) => (
                <div key={specKey} className="filter-group">
                  <h4>{specKey}</h4>
                  <div className="filter-options">
                    {values.map(val => (
                      <label key={val} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={(activeFilters[specKey] || []).includes(val)}
                          onChange={() => toggleFilter(specKey, val)}
                        />
                        <span>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
          </aside>

          {/* Products Grid */}
          <div className="products-container">
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray-500)", width: "100%" }}>
                <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🔍</div>
                <h3>No products found matching these filters</h3>
                <button onClick={() => setActiveFilters({})} className="btn-outline" style={{ color: "var(--navy)", borderColor: "var(--navy)", marginTop: "16px" }}>Clear Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
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
