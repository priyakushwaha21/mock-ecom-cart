# 🛒 Mock E-Com Cart — Full Stack Application

A simple full-stack shopping cart application demonstrating **React (frontend)** + **Node/Express (backend)** + **MongoDB/SQLite (database-ready mock)** integration, following RESTful API principles.

---

## 🚀 Overview

The **Mock E-Com Cart** simulates a basic e-commerce flow:

- Display a grid of mock products  
- Add or remove items from the cart  
- Update quantity and view total  
- Perform a mock checkout with customer details  
- Receive a fake receipt (timestamp, total, purchased items)  

> ⚠️ No real payments or authentication — this is purely for functional demonstration.

---

## ⚙️ Features

### 🧩 Backend (Node.js + Express)
- REST APIs for **Products**, **Cart**, and **Checkout**  
- In-memory cart handling (can easily connect to MongoDB or SQLite)  
- Error handling for invalid operations  
- Generates mock receipt on checkout  

### 💻 Frontend (React)
- Product grid with “Add to Cart”  
- Cart page with item list, quantity controls, and total calculation  
- Checkout form (name, email) → receipt modal  
- Fully responsive UI  

### 🏆 Bonus Task
- Integrated with [Fake Store API](https://fakestoreapi.com/) for live products  
- Ready for persistent DB using MongoDB  

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | React.js, HTML, CSS, JavaScript | UI rendering and cart management |
| **Backend** | Node.js, Express.js | REST API and business logic |
| **Database (optional)** | MongoDB or SQLite | Persistent storage |
| **Testing** | Postman | API testing and verification |



---

## 🧩 Run Locally

### ▶️ Backend
```bash
cd backend
npm install
npm start


Backend runs on: http://localhost:5000

💻 Frontend
cd frontend
npm install
npm start


Frontend runs on: http://localhost:3000
 (CRA with backend proxy)



 REST API Testing (Postman Screenshots)
1️⃣ GET /api/products — Fetch Product List

Method: GET
URL: http://localhost:5000/api/products

Screenshot:
/.public/screenshots/get-products.png

Expected Response:

[
  { "id": "p1", "name": "Retro Vinyl Record", "price": 29.99 },
  { "id": "p2", "name": "Sneaker Socks (3 pack)", "price": 12.50 }
]



2️⃣ POST /api/cart — Add Item to Cart

Method: POST
URL: http://localhost:5000/api/cart
Headers: Content-Type: application/json

Body:

{
  "productId": "p1",
  "qty": 2
}


Screenshot:
/.public/screenshots/AddItemToCart.png

Expected Response:

{
  "id": "p1-1731078800000",
  "productId": "p1",
  "name": "Retro Vinyl Record",
  "price": 29.99,
  "qty": 2
}

3️⃣ GET /api/cart — View Cart and Total

Method: GET
URL: http://localhost:5000/api/cart

Screenshot:
/.public/screenshots/ViewCart_And_Total.png

Expected Response:

{
  "items": [
    { "id": "p1-1731078800000", "name": "Retro Vinyl Record", "price": 29.99, "qty": 2 }
  ],
  "total": 59.98
}



4️⃣ DELETE /api/cart/:id — Remove Item from Cart

Method: DELETE
URL: http://localhost:5000/api/cart/p1-1731078800000

Screenshot:
/.public/screenshots/Delete.png

Expected Response:

{ "success": true }

5️⃣ POST /api/checkout — Mock Checkout

Method: POST
URL: http://localhost:5000/api/checkout
Headers: Content-Type: application/json

Body:

{
  "name": "Priya",
  "email": "priya@example.com"
}


Screenshot:
/.public/screenshots/Checkour.png

Expected Response:

{
  "id": "aBcD1234",
  "name": "Priya",
  "email": "priya@example.com",
  "total": 59.98,
  "timestamp": "2025-11-08T12:00:00.000Z",
  "items": [...]
}



#  Demo Video 
https://drive.google.com/file/d/1Wqe6qFbnEfr91289c27n_YZjgvkQ0DP8/view?usp=sharing

