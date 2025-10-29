import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();

// === MIDDLEWARE LOGGING ===
console.log("🟡 Initializing server...");
app.use(cors());
app.use(express.json());

console.log("🟢 Middleware loaded successfully.");

// === ROUTES ===
app.use("/api/expenses", expenseRoutes);
app.get("/", (req, res) => {
  console.log("📩 Received GET request at '/'");
  res.send("✅ Backend is running!");
});

// === DATABASE CONNECTION ===
const connectDB = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    console.log("📁 Database Name:", "ShessentialsDB");
    console.log("🌍 Mongo URI:", process.env.MONGO_URI ? "Loaded ✅" : "❌ MONGO_URI missing!");
    
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ShessentialsDB",
    });
    
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

connectDB();

// === SERVER STARTUP ===
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
} else {
  console.log("🌐 Running in production mode (Vercel).");
}

// === VERCEL EXPORT ===
export default app;
