require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const internshipsRouter = require('./routes/internships');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/internships', internshipsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Serve React build
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));

// FIX: Express 5 / Node 22 requires "/*", not "*"
app.get('/*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(buildPath, 'index.html'));
  }
  res.status(404).json({ message: 'API route not found' });
});

// DB + Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
