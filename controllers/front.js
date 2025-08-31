const Setting = require("../models/Setting")
const Team = require("../models/Team")
const Feature = require("../models/Feature")
const Testimonial = require("../models/Testimonial")
const Faq = require("../models/Faq")
const Gallery = require("../models/Gallery")
const Department = require("../models/Department")
const Event = require("../models/Event")
const Newsletter = require("../models/Newsletter")
const ContactUs = require("../models/ContactUs")
const Enquiry = require("../models/Enquiry")
const mailer = require("../mailer/index")

async function getSetting() {
    try {
        let data = await Setting.findOne()
        return data

    } catch (error) {
        return []

    }
}


async function getTeam() {
    try {
        let data = await Team.find().sort({ sortOrder: 1 })
        return data

    } catch (error) {
        return []

    }
}

async function getFeature() {
    try {
        let data = await Feature.find().sort({ sortOrder: 1 })
        return data

    } catch (error) {
        return []

    }
}

async function getGallery() {
    try {
        let data = await Gallery.find().sort({ sortOrder: 1 })
        return data

    } catch (error) {
        return []

    }
}

async function getDepartment() {
    try {
        let data = await Department.find().sort({ sortOrder: 1 })
        return data

    } catch (error) {
        return []

    }
}
async function getEvent() {
    try {
        let data = await Event.find().sort({ date: 1 })
        return data

    } catch (error) {
        return []

    }
}


async function getTestimonial() {
    try {
        let data = await Testimonial.find().sort({ sortOrder: 1 })
        return data

    } catch (error) {
        return []

    }
}

async function getFaq() {
    try {
        let data = await Faq.find().sort({ sortOrder: 1 })
        return data

    } catch (error) {
        return []

    }
}

async function homePage(req, res) {
    res.render("index", {
        title: "Home",
        currentUrl: "/",
        fact: await getSetting(),
        team: await getTeam(),
        feature: await getFeature(),
        testimonial: (await getTestimonial()).slice(0, 5),
        faq: (await getFaq()).slice(0, 3),
        gallery: await getGallery(),
        session: req.session,

    })
}

async function aboutPage(req, res) {
    res.render("aboutPage", {
        title: "About Us",
        currentUrl: "/about",
        fact: await getSetting(),
        team: await getTeam(),
        feature: await getFeature(),
        testimonial: await getTestimonial(),
        session: req.session,
    })
}

async function featurePage(req, res) {
    res.render("featurePage", {
        title: "Feature",
        currentUrl: "/feature",
        fact: await getSetting(),
        feature: await getFeature(),
        session: req.session,
    })
}
async function departmentPage(req, res) {
    let departmentData = await getDepartment()
    if (req.query._id)
        var data = await Department.findOne({ _id: req.query._id })
    if (!data)
        var data = departmentData[0]
    // let data={}
    // if(req.query._id)
    //     data=departmentData.find(x=>x.id.toString()===req.query._id)
    // else 
    //     data=departmentData[0]
    res.render("departmentPage", {
        title: "Department",
        currentUrl: "/department",
        fact: await getSetting(),
        team: await getTeam(),
        testimonial: (await getTestimonial()).slice(0, 4),
        department: departmentData,
        data: data,
        session: req.session,

    })
}

async function teamPage(req, res) {
    res.render("teamPage", {
        title: "Team",
        currentUrl: "/team",
        team: await getTeam(),
        testimonial: await getTestimonial(),
        session: req.session,

    })
}

async function testimonialPage(req, res) {
    res.render("testimonialPage", {
        title: "Testimonial",
        currentUrl: "/testimonial",
        testimonial: await getTestimonial(),
        session: req.session,
    })
}

function contactusPage(req, res) {
    res.render("contactusPage", {
        title: "Contact Us",
        currentUrl: "/contactus",
        show: false,
        session: req.session,
    })
}

async function contactusStorePage(req, res) {
    try {
        let data = new ContactUs(req.body)
        await data.save()

        mailer.sendMail({
            from: process.env.MAIL_SENDER,
            to: data.email,
            subject: "Your Contact Us Query Recieved...",
            html: `
                <div style="max-width:600px;margin:30px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

                    <div style="text-align:center;background-color:#28a745;color:white;padding:15px 0;border-radius:6px 6px 0 0;">
                    <h2 style="margin:0;">Thanks for Contacting Us!</h2>
                     </div>

                <div style="padding:20px;">
                    <p style="font-size:16px;color:#333;">Thankyou<strong>${data.name}</strong>,</p>
                    <p style="font-size:15px;color:#555;">
                    We have received your message and will get back to you shortly.
                    Your trust in ${process.env.SITE_NAME} means a lot to us!
                    Here's a copy of your message:
                    </p>

                    <div style="background:#f1f1f1;padding:15px;border-left:4px solid #28a745;margin:20px 0;">
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                     <p><strong>Message:</strong><br/> ${data.message}</p>
                    <p><strong>Subject:</strong><br/> ${data.subject}</p>
                    </div>

                    <p style="font-size:14px;color:#666;">Thank you again for reaching out!</p>
                    <p><strong>${process.env.SITE_NAME}</strong></p>
                </div>

                <div style="text-align:center;font-size:13px;color:#aaa;padding:10px;">
                    &copy; ${(new Date()).getFullYear()} ${process.env.SITE_NAME}.. All rights reserved.
                </div>
            </div>
                `
        }, (error) => {
            if (error)
                console.log(error)
        })

        mailer.sendMail({
            from: process.env.MAIL_SENDER,
            to: process.env.MAIL_SENDER,
            subject: "New Contact Us Query Recieved...",
            html: `
                <div style="max-width:600px;margin:30px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);">

                    <div style="text-align:center;background-color:#dc3545;color:white;padding:15px 0;border-radius:6px 6px 0 0;">
                        <h2 style="margin:0;">New Contact Us Query</h2>
                    </div>

                    <div style="padding:20px;">
                        <p style="font-size:15px;color:#333;">You have received a new query from the contact form:</p>

                        <div style="background:#f9f9f9;padding:15px;border-left:4px solid #dc3545;margin:20px 0;">
                         <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phone}</p>
                        <p><strong>Message:</strong><br/> ${data.message}</p>
                        <p><strong>Subject:</strong><br/> ${data.subject}</p>
                        </div>

                        <p style="font-size:13px;color:#666;">Please respond promptly.</p>
                    </div>

                    <div style="text-align:center;font-size:13px;color:#aaa;padding:10px;">
                        <p>${process.env.SITE_NAME} Contact Form.</p>
                    </div>
                    </div>

                `
        }, (error) => {
            if (error)
                console.log(error)
        })
        res.render("contactusPage", {
            title: "Contact Us",
            currentUrl: "/contactus",
            show: true,
            session: req.session,
        })
    } catch (error) {
        console.log(error)
    }
}

async function enquiryPage(req, res) {
    res.render("enquiryPage", {
        title: "Enquiry",
        currentUrl: "/enquiry",
        fact: await getSetting(),
        team: await getTeam(),
        testimonial: await getTestimonial(),
        show: false,
        session: req.session,

    })
}

async function enquiryStorePage(req, res) {
    try {
        let data = new Enquiry(req.body)
        await data.save()

        mailer.sendMail({
            from: process.env.MAIL_SENDER,
            to: data.email,
            subject: "Your Enquiry for Admission Recieved..",
            html: `
                <div style="max-width:600px;margin:30px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

                    <div style="text-align:center;background-color:#28a745;color:white;padding:15px 0;border-radius:6px 6px 0 0;">
                    <h2 style="margin:0;">Thanks for Contacting Us!</h2>
                     </div>

                <div style="padding:20px;">
                    <p style="font-size:16px;color:#333;">Thankyou<strong>${data.name}</strong>,</p>
                    <p style="font-size:15px;color:#555;">
                    We have received your query for admission and will get back to you shortly.
                    Your trust in ${process.env.SITE_NAME} means a lot to us!
                    Here's a copy of your message:
                    </p>

                    <div style="background:#f1f1f1;padding:15px;border-left:4px solid #28a745;margin:20px 0;">
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                     <p><strong>Message:</strong><br/> ${data.message}</p>
                    <p><strong>Subject:</strong><br/> ${data.subject}</p>
                    </div>

                    <p style="font-size:14px;color:#666;">We Will Resond to your inquiry as soon as possible.Have a great day.!</p>
                    <p><strong>${process.env.SITE_NAME}</strong></p>
                </div>

                <div style="text-align:center;font-size:13px;color:#aaa;padding:10px;">
                    &copy; ${(new Date()).getFullYear()} ${process.env.SITE_NAME}.. All rights reserved.
                </div>
            </div>
                `
        }, (error) => {
            if (error)
                console.log(error)
        })

        mailer.sendMail({
            from: process.env.MAIL_SENDER,
            to: process.env.MAIL_SENDER,
            subject: "New Enquiry for Admission Recieved..",
            html: `
                <div style="max-width:600px;margin:30px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);">

                    <div style="text-align:center;background-color:#dc3545;color:white;padding:15px 0;border-radius:6px 6px 0 0;">
                        <h2 style="margin:0;">New Contact Us Query</h2>
                    </div>

                    <div style="padding:20px;">
                        <p style="font-size:15px;color:#333;">You have received a new enquiry via the enquiry  form:</p>

                        <div style="background:#f9f9f9;padding:15px;border-left:4px solid #dc3545;margin:20px 0;">
                         <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phone}</p>
                        <p><strong>Message:</strong><br/> ${data.message}</p>
                        <p><strong>Subject:</strong><br/> ${data.subject}</p>
                        </div>

                        <p style="font-size:13px;color:#666;">Please respond promptly.</p>
                    </div>

                    <div style="text-align:center;font-size:13px;color:#aaa;padding:10px;">
                        <p>${process.env.SITE_NAME} Enquiry  Form.</p>
                    </div>
                    </div>

                `
        }, (error) => {
            if (error)
                console.log(error)
        })


        res.render("enquiryPage", {
            title: "Enquiry",
            currentUrl: "/enquiry",
            fact: await getSetting(),
            team: await getTeam(),
            testimonial: await getTestimonial(),
            show: true,
            session: req.session,

        })
    } catch (error) {
        console.log(error)
    }
}


async function galleryPage(req, res) {
    res.render("galleryPage", {
        title: "Gallery",
        currentUrl: "/gallery",
        gallery: await getGallery(),
        session: req.session,
    })
}


async function faqPage(req, res) {
    res.render("faqPage", {
        title: "FAQ",
        currentUrl: "/faq",
        faq: await getFaq(),
        session: req.session,
    })
}
async function eventPage(req, res) {
    res.render("eventPage", {
        title: "Event",
        currentUrl: "/event",
        event: await getEvent(),
        session: req.session,
    })
}

async function newsletterSubscription(req, res) {
    try {
        if (req.body.email !== "") {
            let data = new Newsletter(req.body)
            await data.save()

            mailer.sendMail({
                from: process.env.MAIL_SENDER,
                to: data.email,
                subject: "Thanks to Subscribe Our Newsletter Services,Now We can Send Email Regarding Upcoming Event",
                html: `
                <div style="padding: 20px;">
                    <p style="font-size: 16px; color: #333;">Hi <strong>Dear Guardian..</strong>,</p>

                    <p style="font-size: 15px; color: #555;">
                    We're excited to have you join our newsletter! 🎉<br />
                    You'll now receive the latest updates, tech insights, and exclusive offers directly in your inbox.
                    </p>

                    <p style="margin-top: 30px; font-size: 15px;">
                    Stay tuned,<br />
                    <strong>${process.env.SITE_NAME}</strong>
                    </p>
                </div>

                <div style="text-align:center;margin-top:30px;">
                    <a href="${process.env.SITE_URL}" style="background-color:#007BFF;color:#ffffff;
                    padding:12px 20px;text-decoration:none;border-radius:4px ; display:inline-block;font-size:16px;">
                    Visit Our Website
                    </a>
                </div>

                <!-- Footer -->
                <div style="text-align: center; font-size: 13px; color: #999; padding: 15px;">
                    &copy; ${(new Date()).getFullYear()} ${process.env.SITE_NAME}. All rights reserved.
                </div>

    
                `
            }, (error) => {
                if (error)
                    console.log(error)
            })


            res.render("newsletter-subscription-confirmation-page", {
                message: "Thanks to Subscribe Our Newsletter Services,Now We can Send Email Regarding Upcoming Event",
                show: false,
                title: "Newsletter Subscription",
                currentUrl: "/newsletter",
                session:req.session,
            })
        }
        else {
            res.render("newsletter-subscription-confirmation-page", {
                message: "Please Enter a Valid Email Address",
                show: true,
                title: "Newsletter Subscription",
                currentUrl: "/newsletter",
                session:req.session,
            })
        }

    } catch (error) {
        res.render("newsletter-subscription-confirmation-page", {
            message: "Your Email Address is Already Registered With Us",
            show: false,
            title: "Newsletter Subscription",
            currentUrl: "/newsletter",
            session: req.session,
        })
    }
}


// function factPage(req,res){
//     res.render("factPage",{
//         title:"Fact",
//         isFact:true
//     })
// }
module.exports = {
    homePage: homePage,
    aboutPage: aboutPage,
    featurePage: featurePage,
    departmentPage: departmentPage,
    teamPage: teamPage,
    testimonialPage: testimonialPage,
    contactusPage: contactusPage,
    contactusStorePage: contactusStorePage,
    enquiryPage: enquiryPage,
    enquiryStorePage: enquiryStorePage,
    galleryPage: galleryPage,
    faqPage: faqPage,
    eventPage: eventPage,
    newsletterSubscription: newsletterSubscription,
    // factPage:factPage,

}