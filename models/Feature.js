const mongoose = require("mongoose")

const FeatureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Feature Title Must Required"]
    },

    shortDescription: {
        type: String,
        required: [true, "Feature Short Description Must Required"]
    },

    longDescription: {
        type: String,
        required: [true, "Feature long Description Must Required"]
    },

    icon: {
        type: String,
        required: [true, "Feature Icon Must Required"]
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

const Feature = new mongoose.model("Feature", FeatureSchema)

module.exports = Feature