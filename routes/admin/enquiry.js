const EnquiryRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
    showPage,
    editPage,
    deletePage
} = require("../../controllers/admin/adminEnquiry")

EnquiryRouter.get("", homePage)
EnquiryRouter.get("/show/:_id",showPage)
EnquiryRouter.get("/edit/:_id",editPage)
EnquiryRouter.get("/delete/:_id",deletePage)


module.exports = EnquiryRouter



