
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI


// Connect to MongoDB using MongoDb which is basic ______________________________________
// const mongo = require('mongodb');
// const mongoClient = mongo.MongoClient;
// const url = 'mongodb://localhost:27017'

// const mongoConnect = mongoClient.connect(url)
// .then((callback)=>{
//     console.log('MongoDB connected successfully');
//     return callback.db('loop');
// })
// .catch((err)=>{
//     console.error('MongoDB connection error:', err);
// });
//___________________________________________________________________________________

// Connect to MongoDB using Mongoose which is more advanced only for server_____________________________
// const mongoConnect = mongoose.connect(url)
// .then((client) => {
//     return client
// })
// .catch((err) => {
//     throw err
// });

// module.exports = mongoConnect



// Connect to MongoDB using Mongoose which is more advanced only for Vercel Server less_____________________________
// utils/mongoDb.js

// Disable buffering globally so queries fail immediately if not connected
mongoose.set('bufferCommands', false);

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("MongoDB connection promise...")
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,      // Stop Mongoose from waiting 10s for connection
      family: 4,                  // Force IPv4 (Prevents Vercel/IPv6 hangs)
      serverSelectionTimeoutMS: 5000, // Fail after 5s instead of 30s
      maxPoolSize: 10             // Prevent connection limit exhaustion
    };

    console.log("Creating new MongoDB connection promise...");
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
    .then((m) => {
      console.log("MongoDB Connected Successfully");
      return m;
    })
    .catch(()=>{
      console.log("Db connect function not working")
    })
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on failure so we can try again
    console.error("MongoDB Connection Error:", e);
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;


