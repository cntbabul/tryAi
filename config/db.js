const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`.green.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};
module.exports = connectDB