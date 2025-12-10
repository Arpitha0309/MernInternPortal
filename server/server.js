require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes
const internshipsRouter = require('./routes/internships');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/internships', internshipsRouter);

// load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// connect to MongoDB Atlas (Mongoose v9 syntax)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
