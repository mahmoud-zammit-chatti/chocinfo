import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "CHOCINFO | Tunisia's #1 Tech Store",
  description: "Shop the best laptops, printers, networks, and accessories in Tunisia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
