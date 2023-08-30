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

        console.log(req.session.user)

        res.send(userDto)
        
    } catch (error) {

        console.log("🚀 ~ file: sessions.router.js:14 ~ router.get ~ error:", error)
        
        res.status(500).send({error: "Failed to get user information"})

    }

})

router.post ("/login", passport.authenticate ("login",{
    failureRedirect: "/failLogin"
}), async (req,res)=>{

    try{

    if (req.user.email === 'adminCoder@coder.com' && req.user.password === 'adminCod3r123') {
       
        req.user.role = 'admin';
     
    } else {

        req.user.role = 'usuario';
      }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        password:"",
        role : req.user.role,
    }

    console.log(req.session.user)

    return res.redirect("/products")

    } catch(error) {

        console.log("🚀 ~ file: sessions.router.js:36 ~ error:", error)

        res.status(500).send({error: "Failed to login"})

    }
})

router.get ("/failLogin", async (req,res)=>{

    res.send ("failed login")

})

router.post ("/register", passport.authenticate ("register",{
    failureRedirect: "/failregister",
    failureFlash: true
}) , async (req,res) => {

    try{
        
        return res.redirect ("/login")

    } catch (error){

        console.log("🚀 ~ file: sessions.router.js:58 ~ error:", error)

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

        console.log("🚀 ~ file: sessions.router.js:46 ~ router.get ~ error:", error)

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

        return res.redirect("/products")
        
    } catch (error) {

        console.log("🚀 ~ file: sessions.router.js:103 ~ error:", error)

        res.status(500).send({error: "Failed to authenticate"})
        
    }

})

export default router


