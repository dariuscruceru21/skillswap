import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import listingsRoutes from './routes/listings.route.js';
import cartRoutes from './routes/cart.route.js';
import quizRoutes from './routes/quiz.route.js';
import swapRoutes from './routes/swap.routes.js';
import donationRoutes from './routes/donation.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import skillRoutes from './routes/skill.routes.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/swap", swapRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Connect to MongoDB and then start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
