const fs = require("fs")
const Event = require("../../models/Event")
const mailer=require("../../mailer/index")
const Newsletter=require("../../models/Newsletter")

async function homePage(req, res) {
    try {
        let data = await Event.find().sort({ _id: -1 })
        res.render("admin/events/index", {
            title: "Admin - Events",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}
function createPage(req, res) {
    res.render("admin/events/create", {
        title: "Admin - Create Events",
        errorMessage: {},
        data: {}
    })

}

async function storePage(req, res) {
    try {
        var data = new Event(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        data.createBy = "Admin"
        await data.save()

        let newsletterData=await Newsletter.find()
        newsletterData.forEach(item=>{
                   mailer.sendMail({
            from: process.env.MAIL_SENDER,
            to: item.email,
            subject: `CheckOut Latest Event - ${process.env.SITE_NAME}`,
            html: `
                <div style="max-width:600px;margin:30px auto;background:#ffffff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <div style="background-color:#007bff;padding:15px 0;text-align:center;border-radius:6px 6px 0 0;">
        <h2 style="color:#ffffff;margin:0;">Upcoming &nbsp;${process.env.SITE_NAME} Event Notification</h2>
      </div>

      <div style="padding:20px;">
        <p style="font-size:16px;color:#333;">Dear Guardian,</p>
        <p style="font-size:15px;color:#555;">
          We are excited to inform you about a new event organized for our students:
        </p>

        <div style="background:#f9f9f9;padding:15px;border-left:4px solid #007bff;margin:20px 0;">
          <p><strong>Event:</strong> ${data.title}</p>
          <p><strong>Date:</strong> ${(new Date(data.date)).toLocaleString()}</p>
          <p><strong>Location:</strong>${process.env.SITE_NAME},${process.env.SITE_ADDRESS}</p>
          <p><strong>Details:</strong><br/> ${data.shortDescription}
          
          for More Click Here ${process.env.SITE_URL}/event
          </p>
        </div>

        <p style="font-size:14px;color:#333;">
          We encourage you to discuss the event with your child  and ensure their participation.
        </p>

        <p style="font-size:14px;color:#666;">
          If you have any questions, feel free to contact us at {{schoolContact}}.
        </p>

        <p style="margin-top:20px;"><strong>— ${process.env.SITE_NAME}</strong></p>
      </div>

    </div>
  

                `
        }, (error) => {
            if (error)
                console.log(error)
        })
        })


        res.redirect("/admin/event")
    } catch (error) {
        // console.log(error)
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }


        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.date ? errorMessage.date = error.errors.date.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""
        res.render("admin/events/create", {
            title: "Admin - Create Events",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }

}

async function showPage(req, res) {
    try {
        let data = await Event.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/events/show", {
                title: `Admin - show Events`,
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/event")
    } catch (error) {
        res.redirect("/admin/event")
    }
}

async function editPage(req, res) {
    try {
        let data = await Event.findOne({ _id: req.params._id })
        if (data) {
            res.render("admin/events/edit", {
                title: `Admin - edit Events`,
                errorMessage: {},
                data: data,
                session:req.session,
            })
        }
        else
            res.redirect("/admin/event")
    } catch (error) {
        res.redirect("/admin/event")
    }
}

async function updatePage(req, res) {
    try {
        var data = await Event.findOne({ _id: req.params._id })
        if (data) {
            data.title = req.body.title
            data.shortDescription = req.body.shortDescription
            data.longDescription = req.body.longDescription
            data.date = req.body.date
            data.active = req.body.active

            data.updateBy.push({ name: "Admin", date: new Date() })
            if (await data.save() && req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
                await data.save()
            }
            
            res.redirect("/admin/event")
        }
        else
            res.redirect("/admin/event")
    } catch (error) {
        // console.log(error)

        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }

        let errorMessage = {}
        error.errors?.title ? errorMessage.title = error.errors.title.message : ""
        error.errors?.shortDescription ? errorMessage.shortDescription = error.errors.shortDescription.message : ""
        error.errors?.longDescription ? errorMessage.longDescription = error.errors.longDescription.message : ""
        error.errors?.date ? errorMessage.date = error.errors.date.message : ""
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : ""

        res.render("admin/events/edit", {
            title: "Admin - Edit Events",
            errorMessage: errorMessage,
            data: data,
            session:req.session,
        })
    }
}

async function deletePage(req, res) {
    try {
        let data = await Event.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.redirect("/admin/event")
        }
        else
            res.redirect("/admin/event")
    } catch (error) {
        res.redirect("/admin/event")
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