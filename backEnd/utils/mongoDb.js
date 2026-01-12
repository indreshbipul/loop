
const mongoose = require('mongoose');
const url = 'mongodb+srv://indreshvikrambipul:Indresh%401@loop.w7pqwms.mongodb.net/loop'


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

// Connect to MongoDB using Mongoose which is more advanced _____________________________
const mongoConnect = mongoose.connect(url)
.then((client) => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = mongoConnect