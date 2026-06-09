require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// connect to mongo
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-marketplace';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo connect error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
