const { required, date, boolean } = require("joi");
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        min: Date.now(),
        required: true
    },
    isdone: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("todo", todoSchema);