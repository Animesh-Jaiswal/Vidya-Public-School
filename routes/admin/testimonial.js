const TestimonialRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {testimonialUploader} = require("../../middlewares/fileUploader")
const {
    homePage,
    createPage,
    storePage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminTestimonial")

TestimonialRouter.get("", homePage)
TestimonialRouter.get("/create", createPage)
TestimonialRouter.post("/store",testimonialUploader.single("pic"),encoder,storePage)
TestimonialRouter.get("/edit/:_id",editPage)
TestimonialRouter.post("/update/:_id",testimonialUploader.single("pic"),encoder,updatePage)
TestimonialRouter.get("/delete/:_id",deletePage)


module.exports = TestimonialRouter



