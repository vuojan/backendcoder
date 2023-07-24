import passport from "passport";
import local from "passport-local"
import { UsersModels } from "../Dao/models/user.model.js";
import { validPassword, createHashPsw } from "../utils/encrypt.js";
import GithubStrategy from "passport-github2"

const GITHUB_CLIENT_ID = "bd67c923c583d46085ed"
const GITHUB_CLIENT_SECRET = "6a8e7cc078d140d773065a4b5c9e18fc17bedbba"

const LocalStrategy = local.Strategy

const initializePassport = () =>{

passport.use("register", new LocalStrategy({
    passReqToCallback:true,
    usernameField: "email",
    passwordField: "password" 
}, async(req, username, password, done) =>{

   try {

        const {
        first_name,
        last_name,
        email,
        age,
        password
    } = req.body

    if(!first_name || !last_name || !email || !age || !password ){
        return done (null,false, {message: "falta algun campo"})
    }

    const repeatedEmail = await UsersModels.findOne({email})

    if(repeatedEmail){ 
        console.log ("ese mail ya esta en uso")
        return done (null,false,{message:"Ese mail ya ha sido utilizado"})
    }

    const body = {  first_name, 
                    last_name, 
                    email, 
                    age, 
                    password : await createHashPsw(password) }

    const newUser = await UsersModels.create(body)

    return done (null, newUser)
    
   } catch (error) {

    console.log("🚀 ~ file: passport.config.js:36 ~ error:", error)
    return done (error)
    
   }
}
))

passport.use("login", new LocalStrategy({
    passReqToCallback: true,
    usernameField: "email"
}, async (req, username, password, done) => {

    try {

        const {email, password} = req.body

        const selectedUser = await UsersModels.findOne({email})

        if (!selectedUser) {
            console.log("That user does not exist")
            return done (null,false)
        }

        const passwordValidation = await validPassword ( password, selectedUser.password)

        if (!passwordValidation){
            console.log ("Incorrect password")
            return done (null,false)
        }

        return done (null, selectedUser)


    } catch (error) {

        console.log("🚀 ~ file: passport.config.js:82 ~ initializePassport ~ error:", error)

        return done (error)
        
    }

}
))

passport.use("github", new GithubStrategy({
    clientID : GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8084/api/session/github/callback"
}, async (accesToken, refreshToken, profile, done) =>{

        try {

            const user = await UsersModels.findOne({email: profile._json?.email})
            
            if (user) return done (null,user)

            const newUser ={
                first_name: profile._json.name,
                last_name: profile._json.name,
                email: profile._json?.email,
                age: 0,
                password: ""
            }

            const addNewUser = await UsersModels.create(newUser)

            return done (null,addNewUser)


        } catch (error) {
            
            console.log("🚀 ~ file: passport.config.js:106 ~ initializePassport ~ error:", error)
            return done(error)
            
        }

})
)

passport.serializeUser((user, done) => {
    done(null, user.id); 
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UsersModels.findById(id); 
      done(null, user);
    } catch (error) {
      done(error);
    }

})

}

export default initializePassport
