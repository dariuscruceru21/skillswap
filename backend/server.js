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
  origin: ['https://skillswap-3ms1.onrender.com', 'http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Make io accessible to routes
app.set('io', io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/swap", swapRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
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
