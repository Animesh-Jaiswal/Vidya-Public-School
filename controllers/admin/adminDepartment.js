// adminEventCopy
const fs = require("fs")
const Department = require("../../models/Department")

async function homePage(req, res) {
    try {
        let data = await Department.find().sort({ sortOrder: 1 })
        res.render("admin/department/index", {
            title: "Admin - Department",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/department/create", {
        title: "Admin - Create Department",
        errorMessage: {},
        data: {},
        session:req.session,
    })

}

async function storePage(req, res) {
    try {
        var data = new Department(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        data.createBy = "Admin"
        await data.save()
        res.redirect("/admin/department")
    } catch (error) {
        // console.log(error)
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }


        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.icon ? errorMessage.icon = error.errors.icon.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""
        res.render("admin/department/create", {
            title: "Admin - Create Department",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }

}

async function showPage(req, res) {
    try {
        let data = await Department.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/department/show", {
                title: `Admin - show Department`,
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/department")
    } catch (error) {
        res.redirect("/admin/department")
    }
}

async function editPage(req, res) {
    try {
        let data = await Department.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/department/edit", {
                title: `Admin - edit Department`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/department")
    } catch (error) {
        res.redirect("/admin/department")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Department.findOne({ _id: req.params._id })
        if (data) {
            data.title = req.body.title
            data.shortDescription = req.body.shortDescription
            data.longDescription = req.body.longDescription
            data.icon = req.body.icon
            data.active = req.body.active
            data.sortOrder = req.body.sortOrder??data.sortOrder

            data.updateBy.push({ name: "Admin", date: new Date() })
            if (await data.save() && req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
                await data.save()
            }
            
            res.redirect("/admin/department")
        }
        else
            res.redirect("/admin/department")
    } catch (error) {
        // console.log(error)

        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }

        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.icon ? errorMessage.icon = error.errors.icon.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""

        res.render("admin/department/edit", {
            title: "Admin - Edit Department",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Department.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.redirect("/admin/department")
        }
        else
            res.redirect("/admin/department")
    } catch (error) {
        res.redirect("/admin/department")
    }
}

module.exports = {
    homePage: homePage,
    createPage: createPage,
    storePage: storePage,
    showPage: showPage,
    editPage: editPage,
    updatePage: updatePage,
    deletePage: deletePage

}