const UserRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
    createPage,
    storePage,
    showPage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminUser")

UserRouter.get("", homePage)
UserRouter.get("/create", createPage)
UserRouter.post("/store",encoder,storePage)
UserRouter.get("/show/:_id",showPage)
UserRouter.get("/edit/:_id",editPage)
UserRouter.post("/update/:_id",encoder,updatePage)
UserRouter.get("/delete/:_id",deletePage)


module.exports = UserRouter



