const Router = require("express").Router()

const frontRouter = require("./front")
const adminRouter = require("./admin/index")


Router.use("", frontRouter)
Router.use("/admin",adminRouter)


module.exports = Router