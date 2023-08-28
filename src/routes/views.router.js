import { Router } from "express";
import ProductManager from "../Dao/managers/ProductManager.js";
import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import { ProductsModel } from "../Dao/models/product.model.js";
import CartMongoManager from "../Dao/managers/CartMongoManager.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CartsModel } from "../Dao/models/cart.model.js";


const router = Router ()

const manager = new ProductManager();

const mongoManager = new ProductMongoManager();

const cartMongoManager = new CartMongoManager ()

router.get ("/", async (req,res) =>{

    const products = await mongoManager.getProducts()

    res.render ("home",{
        products
    })
})

router.get ("/realtimeproducts", async (req,res) =>{

    try {

        res.render ("realtimeproducts")

    } catch (error) {

        console.log("🚀 ~ file: views.router.js:31 ~ router.get ~ error:", error)

        res.status(500).send({error: "Failed to load products"})
        
    }

    
})


router.get("/products", authMiddleware, async (req, res) => {

    try{

        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            lean:true
        }
    
        const {
          docs,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
        } = await ProductsModel.paginate({},options)

        const user = req.session.user

        res.render("products", {
            products: docs,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            user: user
        })

    } catch (error) {

        console.log("🚀 ~ file: views.router.js:76 ~ router.get ~ error:", error)

        res.status(500).send({error: "Failed to load products"})
    }
})

router.get ("/carts/:cid", async (req,res) =>{

    try {

        const {cid} = req.params

        const requiredCart = await cartMongoManager.getCartById(cid)
        console.log(requiredCart.products)

        res.render("cart", requiredCart)

    } catch (error) {

        console.log("🚀 ~ file: views.router.js:94 ~ router.get ~ error:", error)

        res.status(500).send({error: "Failed to load the cart"})
        
    }

})

router.get ("/login", async (req,res)=>{
    try {
        
        res.render("login")


    } catch (error) {
        
        console.log("🚀 ~ file: views.router.js:78 ~ router.get ~ error:", error)

        res.status(500).send({error: "Failed to render"})

    }
})

router.get ("/register", async (req,res)=>{
    try {
        
        res.render("register")


    } catch (error) {
        
        console.log("🚀 ~ file: views.router.js:78 ~ router.get ~ error:", error)

        res.status(500).send({error: "Failed to render"})

    }
})


export default router