// connect app  with mongodb

const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(err){
        console.error("mongodb failes", err);
        process.exit(1);
    }
}

module.exports = connectDB;