const DepartmentRouter = require("express").Router()

const encoder = require("../../middlewares/bodyParser")
const {departmentUploader} = require("../../middlewares/fileUploader")
const {
    homePage,
    createPage,
    storePage,
    showPage,
    editPage,
    updatePage,
    deletePage
} = require("../../controllers/admin/adminDepartment")

DepartmentRouter.get("", homePage)
DepartmentRouter.get("/create", createPage)
DepartmentRouter.post("/store",departmentUploader.single("pic"),encoder,storePage)
DepartmentRouter.get("/show/:_id",showPage)
DepartmentRouter.get("/edit/:_id",editPage)
DepartmentRouter.post("/update/:_id",departmentUploader.single("pic"),encoder,updatePage)
DepartmentRouter.get("/delete/:_id",deletePage)


module.exports = DepartmentRouter



