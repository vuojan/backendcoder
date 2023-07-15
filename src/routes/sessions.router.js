import { Router } from "express";
import { UsersModels } from "../Dao/models/user.model.js";

const router = Router ()

router.post("/login", async (req,res)=>{

    try {

        const {email, password} = req.body

        const selectedUser = await UsersModels.findOne({email})

        if(!selectedUser) return res.send("Usuario inexistente")
        
        if(selectedUser.password != password) return res.send ("Contraseña incorrecta")

        req.session.user = {...selectedUser}

        if (req.session.user._doc.email === "adminCoder@coder.com" && req.session.user._doc.password === "adminCod3r123" ) {

             req.session.user._doc.rol = "admin"
    
         } else{
    
             req.session.user._doc.rol = "usuario"
         }


         console.log(req.session.user)

        return res.redirect("/products")

        
    } catch (error) {

     console.log("🚀 ~ file: sessions.router.js:11 ~ router.post ~ error:", error)  

    }


})

router.post("/register", async (req,res)=>{

try {

    const{
        first_name,
        last_name,
        email,
        age,
        password
    } = req.body

    if(!first_name || !last_name || !email || !age || !password ) return res.send("Falta alguno de los campos")

    const repeatedEmail = await UsersModels.findOne({email})

    if(repeatedEmail) return res.send("Ese mail ya ha sido utilizado")

    const body = {first_name, last_name, email, age, password}

    const newUser = await UsersModels.create(body)

    req.session.user = {...body}

    return res.redirect("/login")
    
} catch (error) {
    
    console.log("🚀 ~ file: sessions.router.js:31 ~ router.post ~ error:", error)
}

})

router.get("/logout", async (req,res)=>{
    
    try{

    req.session.destroy((err)=> {
        if (err) return res.send ("error in logout")
        return res.redirect ("/login") 
    } )
    } catch(error){
        
        console.log("🚀 ~ file: sessions.router.js:46 ~ router.get ~ error:", error)
        
    }
})

export default router


