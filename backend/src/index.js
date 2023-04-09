const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Todo = require("./schemas/todo");
const Event = require("./schemas/event");

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

// TODOS API
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ due_date: "asc" });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/todos", async (req, res) => {
  const { title, due_date, tags } = req.body;

  try {
    const todo = await Todo.create({
      title,
      due_date,
      tags,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(todo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, due_date, tags } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, due_date, tags },
      { new: true }
    );

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(todo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// EVENTS API
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
    } else {
      res.json(event);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/events', async (req, res) => {
  try {
    const { title, begin, end } = req.body;
    console.log(req.body);
    const event = new Event({
      title,
      begin: new Date(begin),
      end: new Date(end),
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.362yesd.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
