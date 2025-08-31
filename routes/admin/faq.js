const FaqRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
    createPage,
    storePage,
    showPage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminFaq")

FaqRouter.get("", homePage)
FaqRouter.get("/create", createPage)
FaqRouter.post("/store",encoder,storePage)
FaqRouter.get("/show/:_id",showPage)
FaqRouter.get("/edit/:_id",editPage)
FaqRouter.post("/update/:_id",encoder,updatePage)
FaqRouter.get("/delete/:_id",deletePage)


module.exports = FaqRouter



