"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import AuthModal from "@/components/AuthModal";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id, 10);

  const [authOpen, setAuthOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <>
        <Header onAuthOpen={() => setAuthOpen(true)} />
        <main className="section" style={{ textAlign: "center", padding: "100px 24px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Product Not Found</h1>
          <p>The product you are looking for does not exist or has been removed.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: "24px" }}>
            Return to Homepage
          </Link>
        </main>
        <Footer />
        <CartModal />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <>
      <Header onAuthOpen={() => setAuthOpen(true)} />

      <main className="section" style={{ maxWidth: "1000px" }}>
        <div className="breadcrumbs" style={{ marginBottom: "32px", fontSize: "0.9rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`}>{product.category}</Link>
          <span>/</span>
          <Link href={`/category/${product.category}/${product.subcategory}`}>{product.subcategory}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="product-page-layout">
          {/* Left: Product Image */}
          <div className="product-detail-image" style={{ fontSize: "8rem", padding: "80px 40px", borderRadius: "16px", background: "var(--gray-50)", border: "1px solid var(--gray-200)" }}>
            {product.image}
          </div>

          {/* Right: Product Info */}
          <div>
            {product.discount > 0 && (
              <span className="detail-discount" style={{ marginBottom: "16px", display: "inline-block" }}>
                Sale -{product.discount}%
              </span>
            )}
            <h1 className="product-detail-name" style={{ fontSize: "2rem", marginBottom: "16px" }}>
              {product.name}
            </h1>

            <div className="detail-pricing" style={{ marginBottom: "24px", borderBottom: "1px solid var(--gray-200)", paddingBottom: "24px" }}>
              <span className="detail-price" style={{ fontSize: "2.2rem" }}>{product.price} TND</span>
              {product.oldPrice && (
                <span className="detail-old-price" style={{ fontSize: "1.2rem", marginLeft: "12px" }}>{product.oldPrice} TND</span>
              )}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "12px" }}>Quantity</h3>
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
            </div>

            <button className="btn-add-cart" onClick={handleAdd} style={{ padding: "16px", fontSize: "1.1rem", marginBottom: "32px", width: "100%" }}>
              🛒 Add to Cart — {product.price * quantity} TND
            </button>

            {/* Specifications */}
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "16px", paddingBottom: "8px", borderBottom: "2px solid var(--gray-100)" }}>
                Specifications
              </h3>
              {product.specs ? (
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td style={{ fontWeight: 600, padding: "12px 0", color: "var(--navy)" }}>{key}</td>
                        <td style={{ color: "var(--gray-600)", padding: "12px 0" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "var(--gray-500)" }}>No specifications available.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartModal />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
