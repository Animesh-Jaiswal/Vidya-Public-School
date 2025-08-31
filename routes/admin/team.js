const TeamRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {teamUploader} = require("../../middlewares/fileUploader")
const {
    homePage,
    createPage,
    storePage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminTeam")

TeamRouter.get("", homePage)
TeamRouter.get("/create", createPage)
TeamRouter.post("/store",teamUploader.single("pic"),encoder,storePage)
TeamRouter.get("/edit/:_id",editPage)
TeamRouter.post("/update/:_id",teamUploader.single("pic"),encoder,updatePage)
TeamRouter.get("/delete/:_id",deletePage)


module.exports = TeamRouter



