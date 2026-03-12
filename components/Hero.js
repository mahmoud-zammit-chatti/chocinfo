"use client";
import Link from "next/link";
import { categories } from "@/data/products";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">⚡ Tunisia&apos;s #1 Tech Store</div>
            <h1>
              Your One-Stop <span>Tech</span> Destination
            </h1>
            <p>
              Discover the latest laptops, printers, networking gear, and accessories. 
              Premium products at the best prices, delivered across Tunisia.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">🛒 Shop Now</button>
              <button className="btn-outline">📋 View Deals</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-emoji">💻</div>
          </div>
        </div>
      </section>

      {/* Deals Strip */}
      <div className="deals-strip">
        <div className="deals-strip-inner">
          <span className="deal-label">🔥 Flash Sale <span className="badge">-30%</span></span>
          <span className="deal-label">💻 Laptop Deals <span className="badge">-20%</span></span>
          <span className="deal-label">🖨️ Printer Bundles <span className="badge">-15%</span></span>
          <span className="deal-label">🎧 Audio Clearance <span className="badge">-25%</span></span>
          <span className="deal-label">📡 Network Essentials <span className="badge">-10%</span></span>
        </div>
      </div>

      {/* Category Chips */}
      <div className="category-chips">
        <div className="chips-scroll">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.subcategories.length > 0 ? `/category/${cat.slug}/${cat.subcategories[0].slug}` : `/category/${cat.slug}`}
              className="chip"
            >
              <span className="chip-icon">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
          <span className="chip">
            <span className="chip-icon">🏷️</span>
            All Deals
          </span>
          <span className="chip">
            <span className="chip-icon">⭐</span>
            Best Sellers
          </span>
          <span className="chip">
            <span className="chip-icon">🆕</span>
            New Arrivals
          </span>
        </div>
      </div>
    </>
  );
}
