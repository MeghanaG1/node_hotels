const mongoose = require('mongoose');
//define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'//replace 'mydatabase' with your database name
//set up the mongDB connection
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


