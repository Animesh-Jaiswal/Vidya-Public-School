const mongoose = require("mongoose")

const GallerySchema = new mongoose.Schema({
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

const Gallery = new mongoose.model("Gallery", GallerySchema)

module.exports = Gallery