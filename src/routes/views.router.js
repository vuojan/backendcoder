import { Router } from "express";
import ProductManager from "../Dao/managers/ProductManager.js";
import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import { ProductsModel } from "../Dao/models/product.model.js";
import CartMongoManager from "../Dao/managers/CartMongoManager.js";

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

    res.render ("realtimeproducts")
})


router.get("/products", async (req, res) => {

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

        res.render("products", {
            products: docs,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
        })

    } catch (error) {
        console.log(error)
    }
})

router.get ("/carts/:cid", async (req,res) =>{

    const {cid} = req.params

    const requiredCart = await cartMongoManager.getCartById(cid)

    res.render("cart", requiredCart)


})

export default router