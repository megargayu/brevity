const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  due_date: { type: Date, required: true },
  completed_date: { type: Date },
  tags: { type: [String], default: [] },
});

// Define Todo model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
