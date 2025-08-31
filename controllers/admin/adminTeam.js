
const fs = require("fs")
const Team = require("../../models/Team")
async function homePage(req, res) {
    try {
        let data = await Team.find().sort({ sortOrder: 1 })
        res.render("admin/team/index", {
            title: "Admin - Team",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/team/create", {
        title: "Admin - Create Team",
        errorMessage: {},
        data: {},
        // session:req.session,
    })

}

async function storePage(req, res) {
    try {
        var data = new Team(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        data.createBy = "Admin"
        await data.save()
        res.redirect("/admin/team")
    } catch (error) {
        // console.log(error)
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }


        let errorMessage = {}
        error.errors?.name ? errorMessage.name = error.errors.name.message : ""
        error.errors?.designation ? errorMessage.designation = error.errors.designation.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""
        res.render("admin/team/create", {
            title: "Admin - Create Team",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }

}

// async function showPage(req, res) {
//     try {
//         let data = await Team.findOne({ _id: req.params._id })
//         if (data) {
//             res.render("admin/team/show", {
//                 title: `Admin - show Team`,
//                 data: data
//             })
//         }
//         else
//             res.redirect("/admin/team")
//     } catch (error) {
//         res.redirect("/admin/team")
//     }
// }

async function editPage(req, res) {
    try {
        let data = await Team.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/team/edit", {
                title: `Admin - edit team`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/team")
    } catch (error) {
        res.redirect("/admin/team")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Team.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            data.designation = req.body.designation
            data.facebook = req.body.facebook
            data.twitter = req.body.twitter
            data.linkedin = req.body.linkedin
            data.instagram = req.body.instagram
            data.youtube = req.body.youtube
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

            res.redirect("/admin/team")
        }
        else
            res.redirect("/admin/team")
    } catch (error) {
        // console.log(error)

        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }

        let errorMessage = {}
        error.errors?.name ? errorMessage.name = error.errors.name.message : ""
        error.errors?.designation ? errorMessage.designation = error.errors.designation.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""

        res.render("admin/team/edit", {
            title: "Admin - Edit Team",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Team.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.redirect("/admin/team")
        }
        else
            res.redirect("/admin/team")
    } catch (error) {
        res.redirect("/admin/team")
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