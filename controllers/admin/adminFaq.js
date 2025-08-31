const Faq = require("../../models/Faq")
async function homePage(req, res) {
    try {
        let data = await Faq.find().sort({ sortOrder: 1 })
        res.render("admin/faq/index", {
            title: "Admin - Faq",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/faq/create", {
        title: "Admin - Create Faq",
        errorMessage: {},
        data: {},
        session:req.session,
    })

}

async function storePage(req, res) {
    try {
        var data = new Faq(req.body)

        data.createBy = "Admin"
        await data.save()
        res.redirect("/admin/faq")
    } catch (error) {
        // console.log(error)

        let errorMessage = {}
        error.errors?.question ? errorMessage.question = error.errors.question.message : ""
        error.errors?.answer ? errorMessage.answer = error.errors.answer.message : ""
       
        res.render("admin/faq/create", {
            title: "Admin - Create Faq",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }

}

async function showPage(req, res) {
    try {
        let data = await Faq.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/faq/show", {
                title: `Admin - show Faq`,
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/faq")
    } catch (error) {
        res.redirect("/admin/faq")
    }
}

async function editPage(req, res) {
    try {
        let data = await Faq.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/faq/edit", {
                title: `Admin - edit Faq`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/faq")
    } catch (error) {
        res.redirect("/admin/faq")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Faq.findOne({ _id: req.params._id })
        if (data) {
            data.question = req.body.question
            data.answer = req.body.answer
            data.sortOrder = req.body.sortOrder ?? data.sortOrder
            data.active = req.body.active

            data.updateBy.push({ name: "Admin", date: new Date() })

            await data.save()
            res.redirect("/admin/faq")
        }
        else
            res.redirect("/admin/faq")
    } catch (error) {
        // console.log(error)
        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.icon ? errorMessage.icon = error.errors.icon.message : ""

        res.render("admin/faq/edit", {
            title: "Admin - Edit Faq",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Faq.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.redirect("/admin/faq")
        }
        else
            res.redirect("/admin/faq")
    } catch (error) {
        res.redirect("/admin/faq")
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