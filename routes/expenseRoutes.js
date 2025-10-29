// routes/expenseRoutes.js
import express from "express";
import Expense from "./models/expenses.js";

const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ requestedAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the latest expense ID
router.get("/latest-id", async (req, res) => {
  try {
    const latest = await Expense.findOne().sort({ createdAt: -1 });
    if (!latest) return res.json({ expenseId: "EXP-0001" });

    const lastNum = parseInt(latest.expenseId.split("-")[1]);
    const newId = `EXP-${(lastNum + 1).toString().padStart(4, "0")}`;
    res.json({ expenseId: newId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add expense
router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
