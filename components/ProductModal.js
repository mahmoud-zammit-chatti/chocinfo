"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className={`modal-overlay ${product ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Product Details</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="product-detail-image">{product.image}</div>
          <div className="product-detail-name">{product.name}</div>

          {product.specs && (
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="detail-pricing">
            <span className="detail-price">{product.price} TND</span>
            {product.oldPrice && (
              <span className="detail-old-price">{product.oldPrice} TND</span>
            )}
            {product.discount > 0 && (
              <span className="detail-discount">-{product.discount}%</span>
            )}
          </div>

          <div className="quantity-selector">
            <button
              className="qty-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button className="btn-add-cart" onClick={handleAdd} style={{ fontSize: "1rem", padding: "14px" }}>
            🛒 Add to Cart — {product.price * quantity} TND
          </button>
        </div>
      </div>
    </div>
  );
}
