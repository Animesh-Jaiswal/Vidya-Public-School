const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Required"]
    },

    message: {
        type: String,
        required: [true, "Message Must Required"]
    },

    pic: {
        type: String,
        required: [true, "Pic Must Required"]
    },
    sortOrder: {
        type: Number,
        default: 10
    },
    active: {
        type: Boolean,
        default: true
    },

    createBy: {
        type: String,
    },

    updateBy: []
}, { timestamps: true })

const Testimonial = new mongoose.model("Testimonial", TestimonialSchema)

module.exports = Testimonial