"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-accent">CHOC</span>INFO
          </div>
          <p>
            Tunisia&apos;s trusted tech retailer since 2015. Quality products,
            competitive prices, and professional service across the country.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">f</a>
            <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/category/informatique/laptops">Laptops</Link></li>
            <li><Link href="/category/printers/laser-printers">Printers</Link></li>
            <li><Link href="/category/network/routers-modems">Network</Link></li>
            <li><Link href="/category/tv-audio/monitors">Monitors</Link></li>
            <li><Link href="/category/accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Warranty Info</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📍</span>
              <span>Rue de la Liberté, Centre Ville, Tunis 1000, Tunisia</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>+216 71 123 456</span>
            </li>
            <li>
              <span className="contact-icon">📧</span>
              <span>contact@chocinfo.tn</span>
            </li>
            <li>
              <span className="contact-icon">⏰</span>
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 CHOCINFO. All rights reserved.</p>
        <div className="payment-badges">
          <span className="pay-badge">💳 Visa</span>
          <span className="pay-badge">💳 MasterCard</span>
          <span className="pay-badge">🏧 D17</span>
          <span className="pay-badge">💵 Cash</span>
          <span className="pay-badge">📱 Flouci</span>
        </div>
      </div>
    </footer>
  );
}
