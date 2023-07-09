
import { Router } from "express";
import CartManager from "../Dao/managers/CartManager.js";
import ProductManager from "../Dao/managers/ProductManager.js";
import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import CartMongoManager from "../Dao/managers/CartMongoManager.js";
import { CartsModel } from "../Dao/models/cart.model.js";


const router = Router ()

// const manager = new CartManager();
// const productManager = new ProductManager();

const cartMongoManager = new CartMongoManager ()
const productMongoManager = new ProductMongoManager ()

router.get ("/", async (req,res) => {

    try{
        // const carts = await manager.getCarts()
        const carts = await cartMongoManager.getCarts()
        res.send(carts)
    }
    catch(error){
        console.log(error)
    }
 }
 )

router.get ("/:cid", async (req,res) => {

    try{
    // const carts = await manager.getCarts()

        const {cid} = req.params

    // const cart = carts.find (cart => cart.id == cid)

        const cart = await cartMongoManager.getCartById(cid)

        if (cart) res.send(cart)
        else res.sendStatus (404)
    
    } catch (error){
    console.log(error)
    }
})

router.post ("/", async (req,res) =>{

    try{

        const cart =  {products: []}

        // let postCart = await manager.addCart(cart)

        const addedCart = await cartMongoManager.addCart(cart)

        res.status(201).json(addedCart)

    } catch (error){

        console.log(error)
    }

})

router.post ("/:cid/products/:id", async (req,res)=> {
    
    try{

        const {cid} = req.params

        const {id} = req.params

        // const cart = await manager.getCartById(cid)

        const cart = await cartMongoManager.getCartById(cid)

        if (!cart) {
            return res.send("Error")
        }

        // const product = await productManager.getProductById(id)

        const product = await productMongoManager.getProductById(id)

        if (!product) {
            return res.send("Error")
        }

        // const productInCart = await CartsModel.findOne()

        const productIndex = cart.products.findIndex(
            (product) => product.id == id
        )
    
        if (productIndex === -1){
            cart.products.push({id:product._id, quantity: 1})
        } else {
            cart.products[productIndex].quantity++;
        }

        // await manager.updateCartProductsById(cid,cart.products)

        await cartMongoManager.updateCartById(cid, cart.products)

        res.status(201).json(cart)

    } catch (error){

        console.log(error)

    }
    

})

router.delete ("/:cid/products/:pid", async (req,res) =>{

    try{

    const { cid, pid } = req.params

    console.log(cid)
    console.log(pid)

    const ProductInCart = await cartMongoManager.deleteProductInCart (cid,pid)

    res.send({message:"producto borrado", product: ProductInCart})

    } catch (error) {
        console.log (error)
    }

})

router.put ("/:cid/products/:pid", async (req,res) => {

    try{

        const {cid, pid} = req.params

        const {newStock} = req.body  

        console.log(cid)
        console.log(pid)
        console.log(newStock)

        const updateStock = await cartMongoManager.updateStockInCarts(cid,pid,newStock)

        res.send(updateStock)
 
    } catch (error){
        console.log(error)
    }


})

router.delete("/:cid", async (req, res)=> {

    try {

        const {cid} = req.params

        const deletedProduct = await cartMongoManager.deleteAllProducts(cid)

        res.send(deletedProduct)
        
    } catch (error) {

        console.log(error)
        
    }
})

export default router
