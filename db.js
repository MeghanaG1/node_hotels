const mongoose = require('mongoose');
require('dotenv').config();
//define the mongodb connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL//replace 'mydatabase' with your database name
//set up the mongDB connection
const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;
//define event listeners for database connection
db.on('connected',()=>{
    console.log('connected to mongoDB server');
});
db.on('error',(err)=>{
    console.log('mongodb connection error',err);
});
db.on('discoonected',()=>{
    console.log('monngodb disconnected');
});//event listioner keys understandable by mongoDB

//expoet the database connection
module.exports = db;


