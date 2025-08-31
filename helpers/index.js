const hbs = require("hbs")
const Setting = require("../models/Setting")

var setting = {}
async function getSetting() {
    try {
        let data = await Setting.findOne()
        return data

    } catch (error) {
        return []

    }
}
getSetting()


hbs.registerHelper("siteName", () => {
    return process.env.SITE_NAME
})

hbs.registerHelper("siteNameLogo", () => {
    let name = ""
    process.env.SITE_NAME.split(" ").forEach(x => name += x[0])
    return name
})

hbs.registerHelper("siteEmail", () => {

    return setting.email && setting.email !== "" ? setting.email : process.env.SITE_EMAIL
})

hbs.registerHelper("sitePhone", () => {
    return setting.phone && setting.phone !== "" ? setting.phone : process.env.SITE_PHONE
})

hbs.registerHelper("siteWhatsApp", () => {
    return setting.whatsapp && setting.whatsapp !== "" ? setting.whatsapp : process.env.SITE_WHATSAPP
})

hbs.registerHelper("siteMap1", () => {

    return setting.map1 && setting.map1 !== "" ? setting.map1 : process.env.SITE_GOOGLE_MAP1
})

hbs.registerHelper("siteMap2", () => {
    return setting.map2 && setting.map2 !== "" ? setting.map2 : process.env.SITE_GOOGLE_MAP2
})

hbs.registerHelper("siteFacebook", () => {
    return setting.facebook && setting.facebook !== "" ? setting.facebook : process.env.SITE_FACEBOOK
})

hbs.registerHelper("siteTwitter", () => {
    return setting.twitter && setting.twitter !== "" ? setting.twitter : process.env.SITE_TWITTER
})

hbs.registerHelper("siteYoutube", () => {
    return setting.youtube && setting.youtube !== "" ? setting.youtube : process.env.SITE_YOUTUBE
})

hbs.registerHelper("siteInstagram", () => {
    return setting.instagram && setting.instagram !== "" ? setting.instagram : process.env.SITE_INSTAGRAM
})

hbs.registerHelper("siteLinkedin", () => {
    return setting.linkedin && setting.linkedin !== "" ? setting.linkedin : process.env.SITE_LINKEDIN
})

hbs.registerHelper("siteAddress", () => {
    return setting.address && setting.address !== "" ? setting.address : process.env.SITE_ADDRESS
})

hbs.registerHelper("isActiveClass", (currentUrl, pageUrl) => {
    return currentUrl === pageUrl ? "active" : ""
})

hbs.registerHelper("dateHelper", (date) => {
    return new Date(date).toLocaleString()
})

hbs.registerHelper("OnlyDateHelper", (date) => {
    return new Date(date).toDateString()
})


hbs.registerHelper("dateFormHelper", (date) => {
    // let a = new Date(date) //important topic 
    // return a.getFullYear() + "-" + (a.getMonth() + 1).toString().padStart(2, "0") + "-" + a.getDate().toString().padStart(2, "0")
    const a = new Date(date);

    const year = a.getFullYear()
    const month = (a.getMonth() + 1).toString().padStart(2, "0");
    const day = a.getDate().toString().padStart(2, "0");
    const hours = a.getHours().toString().padStart(2, "0");
    const minutes = a.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;

})


hbs.registerHelper("isActiveFormHelper", (selected, value) => {
    if (selected == true || selected == false)
        return selected == value ? 'selected' : ''
    else
        return String(selected) == String(value) ? 'selected' : ''
})

hbs.registerHelper("isActive", (active) => {
    return active ? "Yes" : "No"
})

hbs.registerHelper("showButton", (currentUrl, url) => {
    return currentUrl === url ? false : true
})

hbs.registerHelper("testimonialNameHelper", (name, index) => {
    let msg = name.split(",")
    return msg[index]
})

hbs.registerHelper("isLoginHelper", (session) => {
    return session && session.login ? true : false
})

hbs.registerHelper("isSuperAdminHelper", (session) => {
    return session && session.login && session.role ==="Super Admin" ? true : false
})