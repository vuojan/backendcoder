import bcrypt from "bcrypt"

export const createHashPsw = async (val) => {
    
    const salt = await bcrypt.genSalt()

    const hashSync = await bcrypt.hashSync(val,salt)

    return hashSync
}

export const validPassword = async (psw, encryptedPsw) =>{

   const correctPassword = await bcrypt.compareSync(psw,encryptedPsw)
   
   return correctPassword

}