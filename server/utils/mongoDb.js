
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

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    console.log("Creating new MongoDB connection promise");
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;


