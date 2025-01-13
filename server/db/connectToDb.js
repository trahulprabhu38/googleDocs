const mongoose = require('mongoose');

const connectToDataBase = async () => {
    try {
        
        await mongoose.connect("mongodb://localhost:27017/googledocs", {});
        console.log("Connected to the database successfully!");
    } catch (err) {
        console.error("The error is:", err);
    }
};

module.exports = connectToDataBase;
