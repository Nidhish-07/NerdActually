const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    title: {
        type: String, required: true, unique: true
    },
    description: {
        type: String, required: true,
    },
    author: {
        type: String
    },
    photo: {
        type: String,
    },
    categories: {
        type: Array,
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", ReviewSchema)