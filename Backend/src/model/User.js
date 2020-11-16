const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
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