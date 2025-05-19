import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use("/api/auth", authRoutes)
app.get("/", (req, res) => {
  res.send("API is running");
});



app.listen(PORT, () => {
  console.log('Server is running on port http://localhost:' + PORT);
}
);