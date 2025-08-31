const FeatureRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
    createPage,
    storePage,
    showPage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminFeature")

FeatureRouter.get("", homePage)
FeatureRouter.get("/create", createPage)
FeatureRouter.post("/store",encoder,storePage)
FeatureRouter.get("/show/:_id",showPage)
FeatureRouter.get("/edit/:_id",editPage)
FeatureRouter.post("/update/:_id",encoder,updatePage)
FeatureRouter.get("/delete/:_id",deletePage)


module.exports = FeatureRouter



