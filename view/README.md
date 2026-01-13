# 🛒 Loop — Frontend (React)

Loop is an **enterprise-grade e-commerce frontend** built using **React + Context API**.  
It connects to the Loop backend to provide a real-time, secure, Amazon-style shopping experience with **SKU-level products, cart reconciliation, and global session state**.

---

## 🚀 Features

### 🧑 Authentication
- Login / Register
- JWT stored in secure HttpOnly cookies
- Session auto-restore on page refresh
- Global user state via AuthContext

### 🛍️ Shopping Experience
- SKU-based product variants (Size / Color)
- Real-time price updates
- Live stock validation
- Add to cart & wishlist
- Cart reconciliation banners

### ❤️ Wishlist
- Variant-level wishlist
- Real-time heart sync across product cards

### 🛒 Cart System
- Price snapshot at add-to-cart
- Detects price changes
- Detects low stock
- Global cart count

### 📦 User Data
- Profile
- Address management
- Saved carts
- Secure API calls

---

## 🧩 Architecture

Loop frontend is built around **React Context API** as a **single source of truth**.

