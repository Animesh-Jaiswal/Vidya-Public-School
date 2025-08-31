
const fs = require("fs")
const Testimonial = require("../../models/Testimonial")
async function homePage(req, res) {
    try {
        let data = await Testimonial.find().sort({ sortOrder: 1 })
        res.render("admin/testimonial/index", {
            title: "Admin - Testimonial",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/testimonial/create", {
        title: "Admin - Create Testimonial",
        errorMessage: {},
        data: {},
        session:req.session,
    })

}

async function storePage(req, res) {
    try {
        var data = new Testimonial(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        data.createBy = "Admin"
        await data.save()
        res.redirect("/admin/testimonial")
    } catch (error) {
        // console.log(error)
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }


        let errorMessage = {}
        error.errors?.name ? errorMessage.name = error.errors.name.message : ""
        error.errors?.message ? errorMessage.message = error.errors.message.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""
        res.render("admin/testimonial/create", {
            title: "Admin - Create Testimonial",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }

}

// async function showPage(req, res) {
//     try {
//         let data = await Testimonial.findOne({ _id: req.params._id })
//         if (data) {
//             res.render("admin/testimonial/show", {
//                 title: `Admin - show Testimonial`,
//                 data: data
//             })
//         }
//         else
//             res.redirect("/admin/testimonial")
//     } catch (error) {
//         res.redirect("/admin/testimonial")
//     }
// }

async function editPage(req, res) {
    try {
        let data = await Testimonial.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/testimonial/edit", {
                title: `Admin - edit testimonial`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/testimonial")
    } catch (error) {
        res.redirect("/admin/testimonial")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Testimonial.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            data.message = req.body.message
            
            data.active = req.body.active
            data.sortOrder = req.body.sortOrder ?? data.sortOrder


            data.updateBy.push({ name: "Admin", date: new Date() })
            if (await data.save() && req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
                await data.save()
            }

            res.redirect("/admin/testimonial")
        }
        else
            res.redirect("/admin/testimonial")
    } catch (error) {
        // console.log(error)

        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }

        let errorMessage = {}
        error.errors?.name ? errorMessage.name = error.errors.name.message : ""
        error.errors?.designation ? errorMessage.designation = error.errors.designation.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""

        res.render("admin/testimonial/edit", {
            title: "Admin - Edit Testimonial",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Testimonial.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.redirect("/admin/testimonial")
        }
        else
            res.redirect("/admin/testimonial")
    } catch (error) {
        res.redirect("/admin/testimonial")
    }
}

module.exports = {
    homePage: homePage,
    createPage: createPage,
    storePage: storePage,
    // showPage: showPage,
    editPage: editPage,
    updatePage: updatePage,
    deletePage: deletePage

}