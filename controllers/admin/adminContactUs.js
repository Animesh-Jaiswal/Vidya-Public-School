const ContactUs = require("../../models/ContactUs")

async function homePage(req, res) {
    try {
        let data = await ContactUs.find().sort({ _id: -1 })
        res.render("admin/contactus/index", {
            title: "Admin - ContactUs",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}

async function editPage(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
        data.active=!data.active
        await data.save()
        res.redirect(`/admin/contactus/show/${data._id}`)
    } catch (error) {
        res.redirect("/admin/contactus")
    }
}

async function showPage(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/contactus/show", {
                title: `Admin - show ContactUs`,
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/contactus")
    } catch (error) {
        res.redirect("/admin/contactus")
    }
}

// function createPage(req, res) {
//     res.render("admin/contactus/create", {
//         title: "Admin - Create Faq",
//         errorMessage: {},
//         data: {}
//     })

// }

// async function storePage(req, res) {
//     try {
//         var data = new Faq(req.body)

//         data.createBy = "Admin"
//         await data.save()
//         res.redirect("/admin/contactus")
//     } catch (error) {
//         // console.log(error)

//         let errorMessage = {}
//         error.errors?.question ? errorMessage.question = error.errors.question.message : ""
//         error.errors?.answer ? errorMessage.answer = error.errors.answer.message : ""

//         res.render("admin/contactus/create", {
//             title: "Admin - Create Faq",
//             errorMessage: errorMessage,
//             data: data
//         })
//     }

// }



// async function updatePage(req, res) {
//     try {
//         var data = await Faq.findOne({ _id: req.params._id })
//         if (data) {
//             data.question = req.body.question
//             data.answer = req.body.answer
//             data.sortOrder = req.body.sortOrder ?? data.sortOrder
//             data.active = req.body.active

//             data.updateBy.push({ name: "Admin", date: new Date() })

//             await data.save()
//             res.redirect("/admin/contactus")
//         }
//         else
//             res.redirect("/admin/contactus")
//     } catch (error) {
//         // console.log(error)
//         let errorMessage = {}
//         error.errors?.title ? errorMessage.title = error.errors.title.message : ""
//         error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
//         error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
//         error.errors?.icon ? errorMessage.icon = error.errors.icon.message : ""

//         res.render("admin/contactus/edit", {
//             title: "Admin - Edit Faq",
//             errorMessage: errorMessage,
//             data: data
//         })
//     }
// }

async function deletePage(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.redirect("/admin/contactus")
        }
        else
            res.redirect("/admin/contactus")
    } catch (error) {
        res.redirect("/admin/contactus")
    }
}

module.exports = {
    homePage: homePage,
    editPage: editPage,
    deletePage: deletePage,
    showPage: showPage,
    // updatePage: updatePage,
    // createPage: createPage,
    // storePage: storePage,

}