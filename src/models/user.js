const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;