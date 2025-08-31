const mongoose = require("mongoose")

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Faq Question Must Required"]
    },

    answer: {
        type: String,
        required: [true, "Faq ANswer Must Required"]
    },
    active: {
        type: Boolean,
        default: true
    },

    sortOrder: {
        type: Number,
        default: 10
    },
    createBy: {
        type: String,
    },

    updateBy: []
}, { timestamps: true })

const Faq = new mongoose.model("Faq", FaqSchema)

module.exports = Faq