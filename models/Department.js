const mongoose = require("mongoose")

const DepartmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Department Title Must Required"]
    },

    shortDescription: {
        type: String,
        required: [true, "Department Short Description Must Required"]
    },

    longDescription: {
        type: String,
        required: [true, "Department long Description Must Required"]
    },

    pic: {
       type: String,
       required: [true, "Department Pic Must Required"]
   },
    icon: {
        type: String,
        required: [true, "Department Icon Must Required"]
    },
    active: {
        type: Boolean,
        default: true
    },
     sortOrder: {
        type: Number,
        default:10
    },

    createBy: {
        type: String,
    },

    updateBy: []
}, { timestamps: true })

const Department = new mongoose.model("Department", DepartmentSchema)

module.exports = Department