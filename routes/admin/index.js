const AdminRouter=require("express").Router()
const encoder =require("../../middlewares/bodyParser")
const { isLogin, isSuperAdmin } = require("../../middlewares/authentication")

const {
    homePage,
    loginPage,
    loginStorePage,
    logoutPage,
    forgetPassword1Page,
    forgetPassword1StorePage,
     forgetPassword2Page,
    forgetPassword2StorePage,
     forgetPassword3Page,
    forgetPassword3StorePage,
}=require("../../controllers/admin/adminHome")
const EventRouter=require("./events")
const FeatureRouter=require("./feature")
const DepartmentRouter =require("./department")
const TeamRouter =require("./team")
const TestimonialRouter =require("./testimonial")
const GalleryRouter =require("./gallery")
const FaqRouter =require("./faq")
const SettingRouter =require("./setting")
const EnquiryRouter =require("./enquiry")
const ContactUsRouter =require("./contactus")
const NewsletterRouter =require("./newsletter")
const UserRouter =require("./user")


AdminRouter.get("",isLogin,homePage)
AdminRouter.get("/login",loginPage)
AdminRouter.post("/login",encoder,loginStorePage)

AdminRouter.get("/forget-password-1",forgetPassword1Page)
AdminRouter.post("/forget-password-1",encoder,forgetPassword1StorePage)
AdminRouter.get("/forget-password-2",forgetPassword2Page)
AdminRouter.post("/forget-password-2",encoder,forgetPassword2StorePage)
AdminRouter.get("/forget-password-3",forgetPassword3Page)
AdminRouter.post("/forget-password-3",encoder,forgetPassword3StorePage)
AdminRouter.get("/logout",logoutPage)

AdminRouter.use("/event",isLogin,EventRouter)
AdminRouter.use("/feature",isLogin,FeatureRouter)
AdminRouter.use("/department",isLogin,DepartmentRouter)
AdminRouter.use("/team",isLogin,TeamRouter)
AdminRouter.use("/testimonial",isLogin,TestimonialRouter)
AdminRouter.use("/gallery",isLogin,GalleryRouter)
AdminRouter.use("/faq",isLogin,FaqRouter)
AdminRouter.use("/setting",isLogin,SettingRouter)
AdminRouter.use("/enquiry",isLogin,EnquiryRouter)
AdminRouter.use("/contactus",isLogin,ContactUsRouter)
AdminRouter.use("/newsletter",isLogin,NewsletterRouter)
AdminRouter.use("/user",isSuperAdmin,UserRouter)





module.exports=AdminRouter