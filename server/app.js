//external imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookiesParser = require('cookie-parser')

//local imports
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const mongoConnect = require('./utils/mongoDb');

// Initialize express app
const app = express();
dotenv.config();
const port = process.env.PORT
const dburi = process.env.MONGODB_URI 

// Middleware for parsing JSON and URL-encoded data
app.use(cors(
    {
         origin: ['https://loop-shop.netlify.app', 'http://localhost:5173'],
         credentials: true
    }
));
app.set("trust proxy", 1)
app.use(express.json());
app.use(cookiesParser ())


// Routes
app.get('/', (req, res, next) => {
    res.send('Hello, World!');
});
app.use(authRoutes);
app.use(usersRoutes);
app.use(productsRoutes);


mongoConnect
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


if (process.env.VERCEL !== '1') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Local server running on http://localhost:${port}`);
    });
}


module.exports = app;