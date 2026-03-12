"use client";
import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Header({ onAuthOpen }) {
  const { cartCount, setIsCartOpen } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <div className="top-bar">
        🚚 Free delivery on orders over 500 TND across Tunisia &nbsp;|&nbsp; ☎ +216 71 123 456
      </div>
      <header className="header">
        <div className="header-main">
          <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu">☰</button>
          <Link href="/" className="logo">
            <span className="logo-accent">CHOC</span>INFO
          </Link>
        <form className="search-bar" onSubmit={(e) => {
            e.preventDefault();
            const query = e.target.search.value;
            if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query)}`;
          }}>
            <input type="text" name="search" placeholder="Search products, brands, categories..." />
            <button type="submit" aria-label="Search">🔍</button>
          </form>
          <div className="header-actions">
            <button className="header-btn" onClick={onAuthOpen} aria-label="Account" title="My Account">👤</button>
            <button className="header-btn" onClick={() => setIsCartOpen(true)} aria-label="Cart" title="Shopping Cart">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="navbar">
          <div className="navbar-inner">
            {categories.map((cat) => (
              <div className="nav-item" key={cat.slug}>
                {cat.subcategories.length > 0 ? (
                  <>
                    <button className="nav-link">
                      {cat.name} <span className="arrow">▼</span>
                    </button>
                    <div className="dropdown">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/category/${cat.slug}/${sub.slug}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={`/category/${cat.slug}`} className="nav-link">
                    {cat.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)}>
        <div className="drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <span className="logo" style={{ fontSize: "1.3rem" }}>
              <span className="logo-accent">CHOC</span>INFO
            </span>
            <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
          </div>
          <div className="drawer-menu">
            {categories.map((cat) => (
              <div className="drawer-category" key={cat.slug}>
                {cat.subcategories.length > 0 ? (
                  <>
                    <button
                      className={`drawer-cat-btn ${expanded === cat.slug ? "expanded" : ""}`}
                      onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
                    >
                      <span>
                        <span className="icon">{cat.icon}</span> {cat.name}
                      </span>
                      <span className="chevron">▶</span>
                    </button>
                    <div className={`drawer-subcats ${expanded === cat.slug ? "open" : ""}`}>
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          onClick={() => setDrawerOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={`/category/${cat.slug}`}
                    className="drawer-cat-btn"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>
                      <span className="icon">{cat.icon}</span> {cat.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
