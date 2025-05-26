import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import listingsRoutes from './routes/listings.route.js';
import cartRoutes from './routes/cart.route.js';
import quizRoutes from './routes/quiz.route.js';
import swapRoutes from './routes/swap.routes.js';
import donationRoutes from './routes/donation.route.js';
import analyticsRoutes from './routes/analytics.route.js';

import {connectDB} from './lib/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());//allows us to parse body of the request
app.use(cookieParser());//allows us to parse cookies


app.use("/api/auth", authRoutes)
app.use("/api/listings", listingsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/swap", swapRoutes);
app.use("/api/donation",donationRoutes);
app.use("/api/analytics",analyticsRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});



app.listen(PORT, () => {
  console.log('Server is running on port http://localhost:' + PORT);
  connectDB();
}
);
