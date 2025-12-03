const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        role: role || "CUSTOMER"
      },
    });
    res.json({ message: "User registered successfully", user: { id: newUser.id, username: newUser.username, role: newUser.role } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "2hr" }
    );
    return res.json({ success: true, message: "Login Successful", token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Product Routes
app.get("/api/products", async (req, res) => {
  const { page = 1, limit = 50, search, sort, category, brand, minPrice, maxPrice } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    let where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      const categories = category.split(',');
      // Check if first item is a number to decide strategy (assuming consistent input)
      if (!isNaN(categories[0])) {
        where.categoryId = { in: categories.map(id => parseInt(id)) };
      } else {
        where.category = { name: { in: categories } };
      }
    }

    if (brand) {
      const brands = brand.split(',');
      where.brand = { in: brands };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    let orderBy = {};
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'name') orderBy = { name: 'asc' };
    else if (sort === 'brand') orderBy = { brand: 'asc' };

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
        include: { category: true }
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      products,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

app.post("/api/products", authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, description, price, stock, imageUrl, location, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name, description, price: parseFloat(price), stock: parseInt(stock), imageUrl, location, categoryId: parseInt(categoryId)
      }
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
});

app.put("/api/products/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, description, price, stock, imageUrl, location, categoryId } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name, description, price: parseFloat(price), stock: parseInt(stock), imageUrl, location, categoryId: parseInt(categoryId)
      }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

app.delete("/api/products/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// Category Routes
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

app.post("/api/categories", authenticateToken, authorizeAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({ data: { name } });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});

// Order Routes
app.post("/api/orders", authenticateToken, async (req, res) => {
  const { items, total } = req.body; // items: [{ productId, quantity, price }]

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Check stock and decrement for each item
      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity }
        });
      }

      // 2. Create the order
      const order = await prisma.order.create({
        data: {
          userId: req.user.id,
          total: parseFloat(total),
          status: "COMPLETED",
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: { items: true }
      });

      return order;
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Error creating order" });
  }
});

// Get user orders
app.get("/api/orders/user", authenticateToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Get all orders (Admin) - MUST BE BEFORE /:id
app.get("/api/orders/all", async (req, res) => {
  console.log("API: /api/orders/all hit");
  try {
    console.log("API: Fetching orders from Prisma...");
    const orders = await prisma.order.findMany({
      include: { user: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`API: Fetched ${orders.length} orders.`);
    res.json(orders);
  } catch (error) {
    console.error("API: Error in /api/orders/all:", error);
    res.status(500).send(`Server Error: ${error.message || error}`);
  }
});

// Get specific order
app.get("/api/orders/:id", authenticateToken, async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { items: { include: { product: true } } }
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Ensure the user owns the order or is an admin
    if (order.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order" });
  }
});





app.get("/", (req, res) => {
  res.send("AgroConnect Backend is running!");
});

// Contact Route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await prisma.contactQuery.create({
      data: { name, email, message },
    });
    res.json({ success: true, message: "Message sent successfully", contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});

module.exports = app;