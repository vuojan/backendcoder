import passport from "passport";
import local from "passport-local"
import { UsersModels } from "../Dao/models/user.model.js";
import { validPassword, createHashPsw } from "../utils/encrypt.js";
import GithubStrategy from "passport-github2"
import config from "./config.js";
import { CartsModel } from "../Dao/models/cart.model.js";

const GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = config.GITHUB_CLIENT_SECRET
const callbackURL = `http://localhost:${process.env.PORT || 8084}/api/session/github/callback`

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

    let role;
        if (email === 'adminCoder@coder.com') {
            role = 'admin';
        } else {
            role = 'usuario';
        }

    if(!first_name || !last_name || !email || !age || !password ){
        return done (null,false, {message: "falta algun campo"})
    }

    const repeatedEmail = await UsersModels.findOne({email})

    if(repeatedEmail){ 

        req.logger.warning({Data : req.logMessage, Message: "Mail already used"})
        
        return done (null,false,{message:"Ese mail ya ha sido utilizado"})
    }

    const cart = await CartsModel.create({products : []})

    const body = {  first_name, 
                    last_name, 
                    email, 
                    age, 
                    password : await createHashPsw(password),
                    cart: cart._id,
                    role: role
                 }
    
    const newUser = await UsersModels.create(body)

    return done (null, newUser)
    
   } catch (error) {

    req.logger.error({Data : req.logMessage, Message:`${error.message}`})
    
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

            req.logger.warning({Data : req.logMessage, Message: "That user does not exist"})
            
            return done (null,false)
        }

        const passwordValidation = await validPassword ( password, selectedUser.password)

        if (!passwordValidation){

            req.logger.warning({Data : req.logMessage, Message: "Incorrect password"})

            return done (null,false)
        }

        return done (null, selectedUser)


    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return done (error)
        
    }

}
))

passport.use("github", new GithubStrategy({
    clientID : GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    // callbackURL: "http://localhost:8084/api/session/github/callback",
    callbackURL: callbackURL
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
            
            req.logger.error({Data : req.logMessage, Message:`${error.message}`})
            
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

