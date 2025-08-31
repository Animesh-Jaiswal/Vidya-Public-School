const NewsletterRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
   
    editPage,
    deletePage
} = require("../../controllers/admin/adminNewsletter")

NewsletterRouter.get("", homePage)
NewsletterRouter.get("/edit/:_id",editPage)
NewsletterRouter.get("/delete/:_id",deletePage)


module.exports = NewsletterRouter



