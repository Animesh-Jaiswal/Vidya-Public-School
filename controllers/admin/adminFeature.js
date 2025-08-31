const Feature = require("../../models/Feature")
async function homePage(req, res) {
    try {
        let data = await Feature.find().sort({ sortOrder: 1 })
        res.render("admin/feature/index", {
            title: "Admin - Feature",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/feature/create", {
        title: "Admin - Create Feature",
        errorMessage: {},
        data: {},
        session:req.session,
    })

}

async function storePage(req, res) {
    try {
        var data = new Feature(req.body)

        data.createBy = "Admin"
        await data.save()
        res.redirect("/admin/feature")
    } catch (error) {
        // console.log(error)

        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.icon ? errorMessage.icon = error.errors.icon.message : ""
        res.render("admin/feature/create", {
            title: "Admin - Create Feature",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }

}

async function showPage(req, res) {
    try {
        let data = await Feature.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/feature/show", {
                title: `Admin - show Feature`,
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/feature")
    } catch (error) {
        res.redirect("/admin/feature")
    }
}

async function editPage(req, res) {
    try {
        let data = await Feature.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/feature/edit", {
                title: `Admin - edit Feature`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/feature")
    } catch (error) {
        res.redirect("/admin/feature")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Feature.findOne({ _id: req.params._id })
        if (data) {
            data.title = req.body.title
            data.shortDescription = req.body.shortDescription
            data.longDescription = req.body.longDescription
            data.sortOrder = req.body.sortOrder ?? data.sortOrder

            data.date = req.body.date
            data.active = req.body.active

            data.updateBy.push({ name: "Admin", date: new Date() })

            await data.save()
            res.redirect("/admin/feature")
        }
        else
            res.redirect("/admin/feature")
    } catch (error) {
        // console.log(error)
        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.icon ? errorMessage.icon = error.errors.icon.message : ""

        res.render("admin/feature/edit", {
            title: "Admin - Edit Feature",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Feature.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.redirect("/admin/feature")
        }
        else
            res.redirect("/admin/feature")
    } catch (error) {
        res.redirect("/admin/feature")
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