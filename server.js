import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

// Root endpoint (for quick check)
app.get("/", (req, res) => {
  res.send("✅ Shessentials Backend is running and connected!");
});

// MongoDB connection
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("🔍 Connecting to MongoDB URI:", uri ? "Loaded from .env" : "Missing");

  try {
    const conn = await mongoose.connect(uri, {
      dbName: "ShessentialsDB",
    });
    console.log(`✅ MongoDB connected successfully to database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

connectDB();

// For local development only
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
}

// Required for Vercel serverless functions
export default app;
