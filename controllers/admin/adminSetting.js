const Setting = require("../../models/Setting")
async function homePage(req, res) {
    try {
        let data = await Setting.findOne()
        res.render("admin/setting/index", {
            title: "Admin - Setting",
            data: data,
            session:req.session,
        })
    } catch (error) {

    }
}


async function storePage(req, res) {
    try {
        var data=await Setting.findOne()
        if(!data){
            var data = new Setting(req.body)
            data.createBy = "Admin"
        }
        else{
            data.map1=req.body.map1
            data.map2=req.body.map2
            data.address=req.body.address
            data.email=req.body.email
            data.phone=req.body.phone
            data.whatsapp=req.body.whatsapp

            data.aboutUsVideo=req.body.aboutUsVideo
            data.teacherCounter=req.body.teacherCounter
            data.studentCounter=req.body.studentCounter
            data.eventCounter=req.body.eventCounter
            data.parentCounter=req.body.parentCounter

            data.facebbok=req.body.facebbok
            data.linkedin=req.body.linkedin
            data.instagram=req.body.instagram
            data.twitter=req.body.twitter
            data.youtube=req.body.youtube
            data.updateBy.push({name:"Admin",date:new Date()})
        }
         await data.save()
        res.redirect("/admin/setting")
    } catch (error) {
         console.log(error)
    }

}

module.exports = {
    homePage: homePage,
    storePage: storePage,
   }