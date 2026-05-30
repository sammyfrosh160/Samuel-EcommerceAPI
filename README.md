# 🛒 E-Commerce REST API

A full-featured E-Commerce REST API built with **Node.js**, **Express**, and **JWT Authentication**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm

### Installation

```bash
# 1. Clone or unzip the project
cd ecommerce-api

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start the server
npm start         # production
npm run dev       # development (with nodemon)
```

Server runs at: `http://localhost:5000`

---

## 🔑 Seeded Admin Account

| Field    | Value           |
|----------|-----------------|
| Email    | admin@shop.com  |
| Password | admin123        |
| Role     | admin           |

---

## 📌 API Endpoints

### Auth
| Method | Endpoint          | Access  | Description          |
|--------|-------------------|---------|----------------------|
| POST   | /api/auth/register | Public  | Register new user    |
| POST   | /api/auth/login    | Public  | Login & get token    |
| GET    | /api/auth/me       | Private | Get own profile      |
| PUT    | /api/auth/me       | Private | Update profile       |

### Products
| Method | Endpoint            | Access  | Description               |
|--------|---------------------|---------|---------------------------|
| GET    | /api/products        | Public  | List all (with filters)   |
| GET    | /api/products/:id    | Public  | Get single product        |
| POST   | /api/products        | Admin   | Create product            |
| PUT    | /api/products/:id    | Admin   | Update product            |
| DELETE | /api/products/:id    | Admin   | Delete product            |

**Query Params:** `?search=&categoryId=&minPrice=&maxPrice=&page=&limit=`

### Categories
| Method | Endpoint              | Access  | Description        |
|--------|-----------------------|---------|--------------------|
| GET    | /api/categories        | Public  | List all           |
| GET    | /api/categories/:id    | Public  | Get with products  |
| POST   | /api/categories        | Admin   | Create             |
| PUT    | /api/categories/:id    | Admin   | Update             |
| DELETE | /api/categories/:id    | Admin   | Delete             |

### Cart
| Method | Endpoint               | Access  | Description         |
|--------|------------------------|---------|---------------------|
| GET    | /api/cart               | Private | View cart           |
| POST   | /api/cart               | Private | Add item            |
| PUT    | /api/cart/:productId    | Private | Update quantity     |
| DELETE | /api/cart/:productId    | Private | Remove item         |
| DELETE | /api/cart/clear         | Private | Clear cart          |

### Orders
| Method | Endpoint                  | Access  | Description         |
|--------|---------------------------|---------|---------------------|
| GET    | /api/orders                | Private | Get own orders      |
| POST   | /api/orders                | Private | Checkout (from cart)|
| GET    | /api/orders/:id            | Private | Get single order    |
| PUT    | /api/orders/:id/status     | Admin   | Update status       |
| DELETE | /api/orders/:id/cancel     | Private | Cancel order        |

**Order Statuses:** `pending` → `processing` → `shipped` → `delivered` | `cancelled`

---

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📦 Example Requests

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Add to Cart
```json
POST /api/cart
Authorization: Bearer <token>
{
  "productId": "<uuid>",
  "quantity": 2
}
```

### Checkout
```json
POST /api/orders
Authorization: Bearer <token>
{
  "shippingAddress": "123 Main St, Lagos, Nigeria"
}
```

---

## 🏗 Project Structure

```
ecommerce-api/
├── src/
│   ├── controllers/       # Business logic
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── category.controller.js
│   │   ├── cart.controller.js
│   │   └── order.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT + RBAC
│   │   ├── validate.middleware.js # Input validation
│   │   └── error.middleware.js    # Global error handler
│   ├── models/
│   │   └── store.js               # In-memory data store
│   ├── routes/                    # Express routers
│   └── utils/
│       └── response.js            # Standardised API responses
├── .env
├── .env.example
├── package.json
└── server.js
```

---

## 🛡 Tech Stack

| Package           | Purpose                      |
|-------------------|------------------------------|
| express           | Web framework                |
| jsonwebtoken      | JWT generation & verification|
| bcryptjs          | Password hashing             |
| express-validator | Input validation             |
| helmet            | HTTP security headers        |
| cors              | Cross-origin requests        |
| morgan            | HTTP request logger          |
| uuid              | Unique ID generation         |
| dotenv            | Environment variables        |
