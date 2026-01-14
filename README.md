# 🛒 Loop — Enterprise‑Grade E‑Commerce Platform

Deployed_link : https://loop-shopping.netlify.app/

## 1. Overview
Loop is a scalable, secure Amazon‑style e‑commerce platform built around SKU‑based inventory, price snapshotting, and race‑safe data handling.

---

## 2. Core Principles
1. SKU‑level inventory  
2. Price integrity  
3. Race‑condition safety  
4. User‑scoped data security  

---

## 3. Architecture
Product → Variants (each variant is a sellable SKU)

Example:
Product: Air Max  
Variant: Black‑Size‑9 → Price → Stock

---

## 4. Key Features
1. Authentication (JWT)  
2. Cart with price snapshot  
3. Wishlist  
4. User profile  
5. Variant‑based stock  
6. Secure APIs  

---

## 5. Security Model
- JWT authentication  
- Ownership‑based authorization  
- Encrypted passwords  

---

## 6. Frontend State
- AuthContext  
- CartContext  
- WishlistContext  

---

## 7. Tech Stack
Frontend: React, Tailwind  
Backend: Node.js, Express  
Database: MongoDB  
Security: JWT, Bcrypt  

---

## 8. Roadmap
1. Payment gateway  
2. Orders  
3. Admin panel  

---

## 9. Author
Indresh Vikram Bipul  
IIT Kharagpur
