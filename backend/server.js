import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.route.js';
import listingsRoutes from './routes/listings.route.js';
import cartRoutes from './routes/cart.route.js';
import quizRoutes from './routes/quiz.route.js';
import swapRoutes from './routes/swap.routes.js';
import donationRoutes from './routes/donation.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import skillRoutes from './routes/skill.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectDB } from './lib/db.js';
import { initializeSocket } from './lib/socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// CORS configuration
const corsOptions = {
  origin: [
    'https://skillswap-3ms1.onrender.com',
    'http://localhost:5173'
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cookieParser());

// Make io accessible to routes
app.set('io', io);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/swap", swapRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Connect to MongoDB and then start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
