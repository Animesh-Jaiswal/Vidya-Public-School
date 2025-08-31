const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event Title Must Required"]
    },

    shortDescription: {
        type: String,
        required: [true, "Event Short Description Must Required"]
    },

    longDescription: {
        type: String,
        required: [true, "Event long Description Must Required"]
    },

    pic: {
        type: String,
        required: [true, "Event Pic Must Required"]
    },

    date: {
        type: Date,
        required: [true, "Event Date Must Required"]
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

const Event = new mongoose.model("Event", EventSchema)

module.exports = Event