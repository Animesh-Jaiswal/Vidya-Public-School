const mongoose = require("mongoose")

const ContactUsSchema = new mongoose.Schema({
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

const ContactUs = new mongoose.model("ContactUs", ContactUsSchema)

module.exports = ContactUs