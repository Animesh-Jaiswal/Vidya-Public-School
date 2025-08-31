const mongoose = require("mongoose")

const EnquirySchema = new mongoose.Schema({
    name:{
        type:String
    },
    email: {
        type: String
    },
      phone: {
        type: String
    },
      subject: {
        type: String
    },
      message: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Enquiry = new mongoose.model("Enquiry", EnquirySchema)

module.exports = Enquiry