function isLogin(req,res,next){
    if(req.session && req.session.login)
        next()
    else 
        res.redirect("/admin/login")
}

function isSuperAdmin(req,res,next){
    if(req.session && req.session.login){
        if(req.session.role==="Super Admin")
            next()
        else 
            res.redirect("/admin")
    }

    else 
        res.redirect("/admin/login")
}

module.exports={
    isLogin:isLogin,
    isSuperAdmin:isSuperAdmin
}

