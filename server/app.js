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

const allowedOrigins = [
  'http://localhost:5173',
  'https://loop-indreshbipuls-projects.vercel.app', 
  'https://loop-17ph0up2e-indreshbipuls-projects.vercel.app' 
];
app.use(cors(
    {
         origin: allowedOrigins,
         credentials: true
    }
));

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