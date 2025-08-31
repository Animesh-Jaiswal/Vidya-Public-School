const passwordValidator = require("password-validator")
const bcrypt = require("bcrypt")
const User = require("../../models/User")


// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have 1 uppercase letters
    .has().lowercase(1)                              // Must have 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


async function homePage(req, res) {
    try {
        let data = await User.find().sort({ sortOrder: 1 })
        res.render("admin/user/index", {
            title: "Admin - User",
            data: data,
            session: req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/user/create", {
        title: "Admin - Create User",
        errorMessage: {},
        data: {},
        session: req.session,
    })

}

async function storePage(req, res) {
    var data = new User(req.body)
    if (req.body.password === req.body.cpassword) {
        if (schema.validate(req.body.password)) {
            bcrypt.hash(req.body.password, 12, async (error, hash) => {
                if (error)
                    console.log(error)
                else {
                    try {

                        data.createBy = "Admin"
                        data.password = hash
                        await data.save()
                        res.redirect("/admin/user")
                    } catch (error) {
                        // console.log(error)

                        let errorMessage = {}
                        error.keyValue?.username ? errorMessage.username = "Already UserName taken" : ""
                        error.keyValue?.email ? errorMessage.email = "Already UserName taken" : ""
                        error.errors?.name ? errorMessage.name = error.errors.name.message : ""
                        error.errors?.username ? errorMessage.username = error.errors.username.message : ""
                        error.errors?.email ? errorMessage.email = error.errors.email.message : ""
                        error.errors?.phone ? errorMessage.phone = error.errors.phone.message : ""
                        error.errors?.password ? errorMessage.password = error.errors.password.message : ""

                        res.render("admin/user/create", {
                            title: "Admin - Create User",
                            errorMessage: errorMessage,
                            data: data
                        })
                    }
                }
            })
        }
        else {
            let errorMessage = {
                password: "Invalid Password.Password Length Must be 8-100 character, should be 1 uppercase letter and 1 lowercase letter, 1 digit , 1 special character contain:"
            }
            res.render("admin/user/create", {
                title: "Admin - Create User",
                errorMessage: errorMessage,
                data: data,
                session: req.session,
            })
        }
    }
    else {
        let errorMessage = {
            password: "Password and Confirmation Password Does Not Matched :"
        }
        res.render("admin/user/create", {
            title: "Admin - Create User",
            errorMessage: errorMessage,
            data: data,
            session: req.session,
        })
    }
}

async function showPage(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/user/show", {
                title: `Admin - show User`,
                data: data,
                session: req.session,
            })
        }
        else
            res.redirect("/admin/user")
    } catch (error) {
        res.redirect("/admin/user")
    }
}

async function editPage(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/user/edit", {
                title: `Admin - edit User`,
                errorMessage: {},
                data: data,
                session: req.session,
            })
        }
        else
            res.redirect("/admin/user")
    } catch (error) {
        res.redirect("/admin/user")
    }
}

async function updatePage(req, res) {
    try {
        var data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            data.username = req.body.username
            data.email = req.body.email
            data.phone = req.body.phone
            data.role = req.body.role
            data.active = req.body.active
            await data.save()
            res.redirect("/admin/user")
        }
        else
            res.redirect("/admin/user")
    } catch (error) {
        // console.log(error)
        let errorMessage = {}
        error.keyValue?.username ? errorMessage.username = "Already UserName taken" : ""
        error.keyValue?.email ? errorMessage.email = "Already UserName taken" : ""
        error.errors?.name ? errorMessage.name = error.errors.name.message : ""
        error.errors?.username ? errorMessage.username = error.errors.username.message : ""
        error.errors?.email ? errorMessage.email = error.errors.email.message : ""
        error.errors?.phone ? errorMessage.phone = error.errors.phone.message : ""

        res.render("admin/user/edit", {
            title: "Admin - Edit User",
            errorMessage: errorMessage,
            data: data,
            session: req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.redirect("/admin/user")
        }
        else
            res.redirect("/admin/user")
    } catch (error) {
        res.redirect("/admin/user")
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