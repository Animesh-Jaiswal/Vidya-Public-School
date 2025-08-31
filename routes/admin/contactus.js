const ContactUsRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
    showPage,
    editPage,
    deletePage
} = require("../../controllers/admin/adminContactUs")

ContactUsRouter.get("", homePage)
ContactUsRouter.get("/show/:_id",showPage)
ContactUsRouter.get("/edit/:_id",editPage)
ContactUsRouter.get("/delete/:_id",deletePage)


module.exports = ContactUsRouter



