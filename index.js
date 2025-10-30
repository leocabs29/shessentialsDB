const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'ShessentialsDB' })
  .then(() => console.log('✅ Connected to MongoDB Atlas (ShessentialsDB)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Expense Schema
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

// ✅ Define model
const Expense = mongoose.model("Expenses", expenseSchema, "Expenses");

// ✅ ROUTES

// GET all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ requestedAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
});

// POST new expense
app.post('/add/expenses', async (req, res) => {
  try {
    // Auto-generate new expenseId
    const lastExpense = await Expense.findOne().sort({ expenseId: -1 });
    const lastIdNum = lastExpense ? parseInt(lastExpense.expenseId.split('-')[1]) : 0;
    const newExpenseId = `EXP-${String(lastIdNum + 1).padStart(4, '0')}`;

    const newExpense = new Expense({ ...req.body, expenseId: newExpenseId });
    await newExpense.save();

    res.status(201).json({ message: 'Expense created successfully', newExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating expense', error: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Shessentials Backend is running!');
});

// ✅ Start server (always listen, for Render and local)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log('Local development mode');
  }
});

module.exports = app; // ✅ Export app for serverless or tests
