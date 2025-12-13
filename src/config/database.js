const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'abhistores'
        });
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Database connection failed", error);
    }
}
module.exports = connectDB;