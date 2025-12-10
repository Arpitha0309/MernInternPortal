require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const internshipsRouter = require('./routes/internships');

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use('/api/internships', internshipsRouter);

// Serve React build
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));

// ✅ FIX: COMPATIBLE CATCH-ALL ROUTE FOR EXPRESS 5 + NODE 22
app.get(/.*/, (req, res) => {
  if (!req.path.startsWith("/api")) {
    return res.sendFile(path.join(buildPath, "index.html"));
  }
  res.status(404).json({ error: "API route not found" });
});

// DB + SERVER
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("MongoDB Error:", err.message));
