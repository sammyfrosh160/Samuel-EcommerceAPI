// server.js

require("dotenv").config();
const express   = require("express");
const cors      = require("cors");
const helmet    = require("helmet");
const morgan    = require("morgan");

const authRoutes     = require("./src/routes/auth.routes");
const productRoutes  = require("./src/routes/product.routes");
const categoryRoutes = require("./src/routes/category.routes");
const cartRoutes     = require("./src/routes/cart.routes");
const orderRoutes    = require("./src/routes/order.routes");
const errorHandler   = require("./src/middleware/error.middleware");

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Security & Logging ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🛒 E-Commerce API is running!",
    version: "1.0.0",
    endpoints: {
      auth:       "/api/auth",
      products:   "/api/products",
      categories: "/api/categories",
      cart:       "/api/cart",
      orders:     "/api/orders",
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth",       authRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart",       cartRoutes);
app.use("/api/orders",     orderRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || "development"}\n`);
});

module.exports = app;
