//external imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookiesParser = require('cookie-parser')

dotenv.config();
//local imports
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const mongoConnect = require('./utils/mongoDb');
const mongoose = require('mongoose')

// Initialize express app
const app = express();

const port = process.env.PORT
const dburi = process.env.MONGODB_URI 

const allowedOrigins = [
  'http://localhost:5173',
  'https://loop-shopping.netlify.app',
  /\.vercel\.app$/  // This allows ALL your vercel.app subdomains automatically 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    // 2. Check if the origin is in our whitelist
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // This tells cors to reflect the specific origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Critical for Vercel: Handle the OPTIONS preflight request explicitly
app.options('*', cors());

app.use(express.json());
app.use(cookiesParser ())


// Routes
app.get('/', (req, res, next) => {
    res.send('Hello, World!');
});
app.use(authRoutes);
app.use(usersRoutes);
app.use(productsRoutes);


// mongoConnect
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

const connectDB = require('./utils/mongoDb');
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(async (req, res, next) => {
  // If we are ALREADY connected (1), just go to the next thing immediately.
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  // If we are currently "Connecting" (2), wait a tiny bit or let it finish.
  // Calling connectDB() while it's already connecting can cause "buffering" issues.
  try {
    await connectDB(); 
    next();
  } catch (err) {
    console.error("DB Middleware Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

if (process.env.VERCEL !== '1') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Local server running on http://localhost:${port}`);
    });
}


module.exports = app;