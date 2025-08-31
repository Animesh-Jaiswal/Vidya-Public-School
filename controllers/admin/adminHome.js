const User = require("../../models/User")
const bcrypt = require("bcrypt")
const passwordValidator = require("password-validator")
const mailer = require("../../mailer/index")


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
    let data = await User.findOne()
    res.render("admin/index", {
        title: "Admin Home",
        data: data,
        session: req.session,
    })
}

async function loginPage(req, res) {
    res.render("admin/login", {
        title: "Login Page",
    })
}

async function loginStorePage(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password)) {
                req.session.login = true
                req.session.username = data.username
                req.session.name = data.name
                req.session.role = data.role
                var time = 86400000 * 15 //Milisecond in 1 Day
                req.session.cookie.expires = new Date(Date.now() + time)
                req.session.cookie.maxAge = time
                res.redirect("/admin")
            }
            else
                res.render("admin/login", {
                    title: "Login Page",
                    show: true
                })
        }
        else {
            res.render("admin/login", {
                title: "Login Page",
                show: true
            })
        }
    } catch (error) {
        res.render("admin/login", {
            title: "Login Page",
            show: false
        })
    }
}

function forgetPassword1Page(req, res) {
    res.render("admin/forgetPassword1", {
        title: "Reset password",
        show: false
    })
}

async function forgetPassword1StorePage(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })
        if (data) {
            let otp = Number(Number(Math.random().toString().slice(2, 8)).toString().padEnd(6, "1"))
            req.session.resetPasswordUsername = data.username
            data.passwordReset = {
                otp: otp,
                time: new Date()
            }
            await data.save()

            mailer.sendMail({
                from: process.env.Mail_SENDER,
                to: data.email,
                subject: `OTP for password Reset : ${process.env.SITE_NAME}`,
                html: `
                    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    
                    <h2 style="color: #2c3e50; text-align: center;">${process.env.SITE_NAME}</h2>
                    <h2 style="color: #2c3e50;">Hello ${data.name},</h2>
                    <h3 style="color: #2980b9;">Password Reset OTP Verification</h3>

                    <p style="font-size: 16px; color: #333;">
                    You have requested to reset your password. Please use the OTP below to proceed.
                    </p>

                    <div style="margin: 20px 0; text-align: center;">
                    <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #e74c3c; background-color: #fceae9; padding: 10px 25px; border-radius: 5px;">
                        ${otp}
                    </span>
                    </div>

                    <p style="font-size: 16px; color: #555;">
                    This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone for your account's security.
                    </p>

                    <p style="font-size: 16px; color: #555;">
                    If you did not request this password reset, please ignore this email or contact our support team immediately.
                    </p>

                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

                    <p style="font-size: 14px; color: #999;">
                    Thank you,<br>
                    ${process.env.SITE_NAME}
                    </p>

                    <p style="font-size: 12px; color: #ccc; text-align: center; margin-top: 20px;">
                    This is an automated message. Please do not reply to this email.
                    </p>

                </div>
                                `
            })
            res.redirect("/admin/forget-password-2")
        }
        else {
            res.render("admin/forgetPassword1", {
                title: "Reset Password",
                show: true
            })
        }

    } catch (error) {
        res.redirect("/admin/login")

    }
}



function forgetPassword2Page(req, res) {
    res.render("admin/forgetPassword2", {
        title: "Reset password",
        show: false
    })
}

async function forgetPassword2StorePage(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.session.resetPasswordUsername },
                { email: req.session.resetPasswordUsername }
            ]
        })

        let currentTime = new Date()
        if (data) {
            if (data.passwordReset?.otp == req.body.otp && (currentTime - data.passwordReset.time) < 600000)
                res.redirect("/admin/forget-password-3")
            else {
                res.render("admin/forgetPassword2", {
                    title: "Reset Password",
                    show: true,
                    message: "Invalid OTP or OTP Expired-Please try again"
                })
            }
        }
        else {
            res.render("admin/forgetPassword2", {
                title: "Reset Password",
                show: true,
                message: "UnAuthorised Activity"
            })
        }

    } catch (error) {
        res.redirect("/admin/login")

    }
}



function forgetPassword3Page(req, res) {
    res.render("admin/forgetPassword3", {
        title: "Reset password",
        show: false
    })
}

async function forgetPassword3StorePage(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.session.resetPasswordUsername },
                { email: req.session.resetPasswordUsername }
            ]
        })
        if (data) {
            if (schema.validate(req.body.password)) {
                bcrypt.hash(req.body.password, 12, async (error, hash) => {
                    if (error)
                        console.log(error)
                    else {
                        data.password=hash
                        await data.save()
                        delete req.session.destroy()
                        res.redirect("/admin/login")
                    }
                })
            }
            else {
                res.render("admin/forgetPassword3", {
                    title: "Reset Password",
                    show: true,
                    message: "Invalid Password.Password Length Must be 8-100 character, should be 1 uppercase letter and 1 lowercase letter, 1 digit , 1 special character contain:"
                })
            }
        }
        else {
            res.render("admin/forgetPassword3", {
                title: "Reset Password",
                show: true,
                message: "Unauthorised Acticity.."
            })
        }

    } catch (error) {
        res.redirect("/admin/login")

    }
}




async function logoutPage(req, res) {
    req.session.destroy()
    res.redirect("/admin/login")
}

module.exports = {
    homePage: homePage,
    loginPage: loginPage,
    loginStorePage: loginStorePage,
    logoutPage: logoutPage,
    forgetPassword1Page:forgetPassword1Page,
    forgetPassword1StorePage:forgetPassword1StorePage,
    forgetPassword2Page:forgetPassword2Page,
    forgetPassword2StorePage:forgetPassword2StorePage,
    forgetPassword3Page:forgetPassword3Page,
    forgetPassword3StorePage:forgetPassword3StorePage
}