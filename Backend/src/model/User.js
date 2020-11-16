const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    created_date: {
        type: Date,
    },
    modify_date: {
        type: Date
    }
})

module.exports = mongoose.model("user", userSchema);