const GalleryRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {galleryUploader} = require("../../middlewares/fileUploader")
const {
    homePage,
    createPage,
    storePage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminGallery")

GalleryRouter.get("", homePage)
GalleryRouter.get("/create", createPage)
GalleryRouter.post("/store",galleryUploader.single("pic"),encoder,storePage)
GalleryRouter.get("/edit/:_id",editPage)
GalleryRouter.post("/update/:_id",galleryUploader.single("pic"),encoder,updatePage)
GalleryRouter.get("/delete/:_id",deletePage)


module.exports = GalleryRouter



