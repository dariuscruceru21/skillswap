import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import listingsRoutes from './routes/listings.route.js';
import {connectDB} from './lib/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());//allows us to parse body of the request
app.use(cookieParser());//allows us to parse cookies

app.use("/api/auth", authRoutes)
app.use("/api/listings", listingsRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});



app.listen(PORT, () => {
  console.log('Server is running on port http://localhost:' + PORT);
  connectDB();
}
);
