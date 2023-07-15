export const authMiddleware = async (req,res,next) => {

    if(req.session?.user) {

        return next()
    }
    return res.redirect("/login")

}
