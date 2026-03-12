"use client";
import { useCart } from "@/context/CartContext";

export default function CartModal() {
  const { cartItems, cartTotal, cartCount, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  return (
    <div className={`modal-overlay ${isCartOpen ? "open" : ""}`} onClick={() => setIsCartOpen(false)}>
      <div className="modal cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🛒 Shopping Cart ({cartCount})</h3>
          <button className="modal-close" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="modal-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">{item.image}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.price} TND</div>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>{cartTotal.toFixed(0)} TND</span>
            </div>
            <button className="btn-checkout" onClick={() => alert("Checkout coming soon! 🚀")}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
