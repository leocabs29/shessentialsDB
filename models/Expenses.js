import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  expenseId: { type: String, required: true },
  department: { type: String, required: true },
  expenseType: { type: String },
  description: { type: String },
  amount: { type: Number, required: true },
  requestedBy: { type: String },
  status: { type: String, default: "Pending" },
  requestedAt: { type: Date, default: Date.now },
  notes: { type: String },
  attachmentUrl: { type: String }
});

// ✅ 3rd argument ensures it connects to your existing "expenses" collection
export default mongoose.model("Expense", expenseSchema, "Expenses");
