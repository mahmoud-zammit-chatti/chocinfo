"use client";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

import Link from "next/link";

export default function ProductCard({ product, onViewDetail }) {
  const { addToCart } = useCart();
  const cat = categories.find((c) => c.slug === product.category);
  const catName = cat ? cat.name : product.category;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetail(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="product-card" style={{ display: "block" }}>
      <div className="product-image">
        {product.discount > 0 && (
          <span className="discount-tag">-{product.discount}%</span>
        )}
        <span>{product.image}</span>
        <button 
          className="preview-btn" 
          onClick={handlePreview}
          title="Quick View"
        >
          👁️
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{catName}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-pricing">
          <span className="product-price">{product.price} TND</span>
          {product.oldPrice && (
            <span className="product-old-price">{product.oldPrice} TND</span>
          )}
        </div>
        <button className="btn-add-cart" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
      </div>
    </Link>
  );
}
