const mongoose = require('mongoose');

const dbURI = process.env.mongoURL 

const connectDB = async () => {
    try{
        console.log("Connecting to the database...");
        await mongoose.connect(dbURI)
        console.log("Database connected successfully");
    }catch(err){
        console.error("Database connection error:", err);
    }
}

module.exports = connectDB;