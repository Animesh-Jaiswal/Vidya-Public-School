const SettingRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {
    homePage,
    storePage,
} = require("../../controllers/admin/adminSetting")

SettingRouter.get("", homePage)
SettingRouter.post("/store",encoder,storePage)

module.exports = SettingRouter



