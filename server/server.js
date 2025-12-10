require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// import routes
const internshipsRouter = require('./routes/internships');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes (Postman uses this)
app.use('/api/internships', internshipsRouter);

// load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// -------------------------------------------
// 🔥 SERVE REACT FRONTEND BUILD (IMPORTANT)
// -------------------------------------------
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));

// Catch-all → return React index.html for non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(buildPath, 'index.html'));
  }
  res.status(404).json({ message: 'API route not found' });
});

// -------------------------------------------
// 🔥 CONNECT TO MONGODB + START SERVER
// -------------------------------------------
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
