
const fs = require("fs")
const Gallery = require("../../models/Gallery")
async function homePage(req, res) {
    try {
        let data = await Gallery.find().sort({ sortOrder: 1 })
        res.render("admin/gallery/index", {
            title: "Admin - Gallery",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/gallery/create", {
        title: "Admin - Create Gallery",
        errorMessage: {},
        data: {},
        session:req.session,
    })

}

async function storePage(req, res) {
    try {
        var data = new Gallery(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        data.createBy = "Admin"
        await data.save()
        res.redirect("/admin/gallery")
    } catch (error) {
        // console.log(error)
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }


        let errorMessage = {}
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""
        res.render("admin/gallery/create", {
            title: "Admin - Create Gallery",
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
//             res.render("admin/gallery/show", {
//                 title: `Admin - show Testimonial`,
//                 data: data
//             })
//         }
//         else
//             res.redirect("/admin/gallery")
//     } catch (error) {
//         res.redirect("/admin/gallery")
//     }
// }

async function editPage(req, res) {
    try {
        let data = await Gallery.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/gallery/edit", {
                title: `Admin - edit gallery`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/gallery")
    } catch (error) {
        res.redirect("/admin/gallery")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Gallery.findOne({ _id: req.params._id })
        if (data) {           
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

            res.redirect("/admin/gallery")
        }
        else
            res.redirect("/admin/gallery")
    } catch (error) {
        // console.log(error)

        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }

        let errorMessage = {}
       

        res.render("admin/gallery/edit", {
            title: "Admin - Edit Gallery",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Gallery.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.redirect("/admin/gallery")
        }
        else
            res.redirect("/admin/gallery")
    } catch (error) {
        res.redirect("/admin/gallery")
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