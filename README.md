# Mock E‑commerce (Frontend + Backend)

This is a full-stack shopping cart application built for the Vibe Commerce internship assignment.
The project demonstrates skills in React, Node.js/Express, and MongoDB, handling product display, cart operations, checkout, and data persistence.

## Overview

This repository contains:
- Backend: Express + MongoDB that provides product, cart, and checkout APIs.
- Frontend: React + Vite UI that consumes the backend.

## Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Additional Tools: Axios, Toast Notifications, REST APIs

## Prerequisites

- Node.js (16+)
- npm
- MongoDB connection string (Atlas or local)

## Setup

1. Start backend
   - Open a terminal, go to backend:
     ```sh
     cd backend
     npm install
     ```
   - Ensure backend env config is present at `backend/.env` (contains `MONGO_URI`, `FAKESTORE_URL`, `MOCK_USER_ID`, `PORT`).
   - Start dev server:
     ```sh
     npm run dev
     ```
   - Default backend API base: `http://localhost:5000/api`

2. Start frontend
   - In a new terminal, go to frontend:
     ```sh
     cd frontend
     npm install
     npm run dev
     ```
   - The frontend reads `VITE_API_URL` from `frontend/.env`. Default: `http://localhost:5000/api`.
   - Open the Vite dev URL printed in the terminal (typically `http://localhost:5173`).

## Where to look in the code

- Backend entry: [backend/server.js](backend/server.js)  
- Backend routes:
  - Products: [backend/routes/products.js](backend/routes/products.js)
  - Cart: [backend/routes/cart.js](backend/routes/cart.js)
  - Checkout: [backend/routes/checkout.js](backend/routes/checkout.js)
- Backend models:
  - [`Product`](backend/models/Product.js)
  - [`CartItem`](backend/models/CartItem.js)
  - [`Receipt`](backend/models/Receipt.js)
- Frontend main app: [frontend/src/App.jsx](frontend/src/App.jsx)
- Frontend API layer: [`api` object (`api.getProducts`, `api.getCart`, etc.)](frontend/src/api.js)
- Frontend components:
  - [`ProductGrid`](frontend/src/components/ProductGrid.jsx)
  - [`Cart`](frontend/src/components/Cart.jsx)
  - [`CheckoutModal`](frontend/src/components/CheckoutModal.jsx)
- Vite config: [frontend/vite.config.js](frontend/vite.config.js)

## Quick run checklist

1. backend: `cd backend && npm run dev` — check console for `MongoDB connected` and `Server running`.
2. frontend: `cd frontend && npm run dev` — open Vite URL.
3. Verify product list loads and adding items updates cart.

## Screenshots

## 📸 Screenshots

### 🛍️ Product Grid
[![Product Grid](/screenshots/product-grid.png)](/screenshots/product-grid.png)

### 🧺 Cart Sidebar
[![Cart Sidebar](/screenshots/cart.png)](/screenshots/cart.png)

### 💳 Checkout Modal
[![Checkout Modal](/screenshots/checkout-modal.png)](/screenshots/checkout-modal.png)

### 🧾 Receipts with Details
[![Receipts with Details](/screenshots/receipt1.png)](/screenshots/receipt1.png)
[![Receipts with Details](/screenshots/receipt2.png)](/screenshots/receipt2.png)


## Frontend Features

- ✅ Product grid with “Add to Cart”
- ✅ Dynamic cart sidebar with total calculation
- ✅ Remove and quantity update functionality
- ✅ Checkout modal
- ✅ Receipt modal after checkout confirmation
- ✅ Multiple receipts stored (newest on top)
- ✅ Scrollable receipts section
- ✅ “Clear All Receipts” button
- ✅ “View Details” button to see complete receipt summary
- ✅ Responsive layout for all screen sizes
- ✅ Toast notifications for key actions

## Important API endpoints

- ✅ GET /api/products — Retrieve all mock products - see [/backend/routes/products.js](/backend/routes/products.js)  
- ✅ GET /api/cart — Fetch user’s current cart and total - see [/backend/routes/cart.js](/backend/routes/cart.js)  
- ✅ POST /api/cart — add product to cart (body: `{ productId, qty }`) — see [/frontend/src/api.js](/frontend/src/api.js)  
- ✅ PATCH /api/cart/:id — update quantity of cart item — see [/backend/routes/cart.js](/backend/routes/cart.js)  
- ✅ DELETE /api/cart/:id — Remove an item from cart — see [/backend/routes/cart.js](/backend/routes/cart.js)  
- ✅ POST /api/checkout — Mock checkout + generate receipt (body: `{ name, email }`) — see [/backend/routes/checkout.js](/backend/routes/checkout.js)

## Database Collections:

- ✅ products

- ✅ cartitems

- ✅ receipts

## Bonus Implementations

- ✅ MongoDB Atlas persistence for products, carts, and receipts

- ✅ Error handling

- ✅ Toast notifications for checkout success, and clear actions

- ✅ Fully responsive UI (desktop + mobile)

- ✅ Modular folder structure for clarity and maintainability


## Troubleshooting

- Mongo connection error: verify `MONGO_URI` in [/backend/.env](/backend/.env).
- Frontend cannot reach backend: verify `VITE_API_URL` in [/frontend/.env](/frontend/.env) and backend running on that port.
- Check server logs in backend terminal for detailed errors.

## Helpful files
- [/backend/package.json](/backend/package.json)
- [/frontend/package.json](/frontend/package.json)
- [/frontend/vite.config.js](/frontend/vite.config.js)

---