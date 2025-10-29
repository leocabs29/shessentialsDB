import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ShessentialsDB",
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Required for Vercel
export default app;
