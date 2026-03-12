"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts({ onViewDetail }) {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Featured Products</h2>
        <p>Handpicked tech essentials at the best prices in Tunisia</p>
        <div className="line"></div>
      </div>
      <div className="products-grid">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </section>
  );
}

export function DealsSection({ onViewDetail }) {
  const deals = products.filter((p) => p.deal);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 0);

    const updateTimer = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="deals-section">
      <div className="deals-inner">
        <div className="section-header">
          <h2>🔥 Today&apos;s Deals</h2>
          <p>Hurry up! These deals end at midnight</p>
          <div className="line"></div>
        </div>
        <div className="countdown-container">
          <div className="countdown-box">
            <div className="number">{pad(timeLeft.hours)}</div>
            <div className="label">Hours</div>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-box">
            <div className="number">{pad(timeLeft.minutes)}</div>
            <div className="label">Minutes</div>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-box">
            <div className="number">{pad(timeLeft.seconds)}</div>
            <div className="label">Seconds</div>
          </div>
        </div>
        <div className="products-grid">
          {deals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
