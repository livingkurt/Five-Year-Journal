const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Ensure this matches the frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Connection string to your MongoDB database
const connectionString = "mongodb://localhost:27017/fiveYearJournal";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Journal Entry Schema
const entrySchema = new mongoose.Schema({
  date: String,
  content: String,
});

const Entry = mongoose.model("Entry", entrySchema);

// Routes
app.get("/api/entries", async (req, res) => {
  console.log("GET request received for /api/entries"); // Add this line
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/entries", async (req, res) => {
  const newEntry = new Entry({
    date: req.body.date,
    content: req.body.content,
  });

  try {
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const entry = await Entry.findById(id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    entry.content = content;
    const updatedEntry = await entry.save();

    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
