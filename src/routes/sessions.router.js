import { Router } from "express";
import { UsersModels } from "../Dao/models/user.model.js";
import { createHashPsw , validPassword } from "../utils/encrypt.js";
import passport from "passport";
import { authMiddleware } from "../middleware/auth.middleware.js";
import UserDto from "../dto/currentuser.dto.js";
import { roleAuthorize } from "../middleware/role.middleware.js";


const router = Router ()

 router.get("/current", authMiddleware, roleAuthorize(["admin", "usuario"]), async (req,res)=> {

    try {

        const userDto = new UserDto (req.session.user)
        
        req.logger.info({Data: req.logMessage, Message: req.session.user})

        res.send(userDto)
        
    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})
        
        res.status(500).send({error: "Failed to get user information"})

    }

})

router.post ("/login", passport.authenticate ("login",{
    failureRedirect: "/api/session/failLogin"
}), async (req,res)=>{

    try{

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            password:"",
            role : req.user.role,
    }

        req.logger.info({Data: req.logMessage, Message: req.session.user})

    

    return res.redirect("/products")

    } catch(error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        res.status(500).send({error: "Failed to login"})

    }
})

router.get ("/failLogin", async (req,res)=>{

    res.send ("failed login")

})

router.post ("/register", passport.authenticate ("register",{
    failureRedirect: "/api/session/failregister",
    failureFlash: true
}) , async (req,res) => {

    try{
        
        return res.redirect ("/login")

    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        res.status(500).send({error: "Failed to register"})
   
    }     

})

router.get ("/failregister", async (req, res) =>{

    res.send("failed registration")

})


router.get("/logout", async (req,res)=>{

    try{

    req.session.destroy((err)=> {
        if (err) return res.send ("error in logout")
        return res.redirect ("/login")
    } )
    } catch(error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        res.status(500).send({error: "Failed to logout"})

    }
})

router.get("/github", passport.authenticate("github",{
    scope: ["user:email"]
}), async (req, res) => {})


router.get("/github/callback", passport.authenticate("github",{
    failureRedirect: "/failLogin"
}), async (req, res) => {

    try {

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            password:"",
        }

        req.logger.info({Data: req.logMessage, Message: req.session.user})

        return res.redirect("/products")
        
    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        res.status(500).send({error: "Failed to authenticate"})
        
    }

})

export default router


