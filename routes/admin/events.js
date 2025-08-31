const EventRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {eventUploader} = require("../../middlewares/fileUploader")
const {
    homePage,
    createPage,
    storePage,
    showPage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminEvents")

EventRouter.get("", homePage)
EventRouter.get("/create", createPage)
EventRouter.post("/store",eventUploader.single("pic"),encoder,storePage)
EventRouter.get("/show/:_id",showPage)
EventRouter.get("/edit/:_id",editPage)
EventRouter.post("/update/:_id",eventUploader.single("pic"),encoder,updatePage)
EventRouter.get("/delete/:_id",deletePage)


module.exports = EventRouter



