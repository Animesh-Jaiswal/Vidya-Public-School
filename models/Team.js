const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Team Name Must Required"]
    },

    designation: {
        type: String,
        required: [true, "Team Member Designation Must Required"]
    },

    pic: {
        type: String,
        required: [true, "Team Pic Must Required"]
    },

    facebook: {
        type: String,
        default: ""
    },

    linkedin: {
        type: String,
        default: ""
    },

    twitter: {
        type: String,
        default: ""
    },

    instagram: {
        type: String,
        default: ""
    },

    youtube: {
        type: String,
        default: ""
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

const Team = new mongoose.model("Team", TeamSchema)

module.exports = Team