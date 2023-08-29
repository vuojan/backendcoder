import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import CartMongoManager from "../Dao/managers/CartMongoManager.js";
import { TicketModel } from "../Dao/models/ticket.model.js";
import { updatedProduct } from "./products.controller.js";


const cartMongoManager = new CartMongoManager ()
const productMongoManager = new ProductMongoManager ()

export const getCarts = async (req,res) => {

    try{
        // const carts = await manager.getCarts()
        const carts = await cartMongoManager.getCarts()
        
        res.send(carts)
    }
    catch(error){
        console.log("🚀 ~ file: carts.router.js:26 ~ router.get ~ error:", error)
        
        res.status(500).send({error: "Failed to load carts"})
    }
 }
 

export const getCartById = async (req,res) => {

    try{
    // const carts = await manager.getCarts()

        const {cid} = req.params

    // const cart = carts.find (cart => cart.id == cid)

        const cart = await cartMongoManager.getCartById(cid)

        if (cart) res.send(cart)
        else res.sendStatus (404)
    
    } catch (error){
        console.log("🚀 ~ file: carts.router.js:47 ~ router.get ~ error:", error)

        res.status(500).send({error: "That cart could not be found"})
    }
}

export const addCart = async (req,res) =>{

    try{

        const cart =  {products: []}

        // let postCart = await manager.addCart(cart)

        const addedCart = await cartMongoManager.addCart(cart)

        res.status(201).json(addedCart)

    } catch (error){
        console.log("🚀 ~ file: carts.router.js:65 ~ router.post ~ error:", error)

        res.status(500).send({error: "Failed to create cart"})
    }

}

export const addProductIntoCart = async (req,res)=> {
    
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
            (product) => product.id.equals(id)
        )
        
        console.log(id)
    
        if (productIndex === -1){
            cart.products.push({id:product._id, quantity: 1})
        } else {
            cart.products[productIndex].quantity++;
        }

        // await manager.updateCartProductsById(cid,cart.products)

        await cartMongoManager.updateCartById(cid, cart.products)

        res.status(201).json(cart)

    } catch (error){
        console.log("🚀 ~ file: carts.router.js:116 ~ router.post ~ error:", error)

        res.status(500).send({error: "Failed to add product to cart"})

    }
    

}

export const deleteProductInCart = async (req,res) =>{

    try{

    const { cid, pid } = req.params

    console.log(cid)
    console.log(pid)

    const ProductInCart = await cartMongoManager.deleteProductInCart (cid,pid)

    res.send({message:"producto borrado", product: ProductInCart})

    } catch (error) {
        console.log("🚀 ~ file: carts.router.js:139 ~ router.delete ~ error:", error)

        res.status(500).send({error: "Failed to delete the wanted product"})
    }

}

export const updateStockInCarts = async (req,res) => {

    try{

        const {cid, pid} = req.params

        const {newStock} = req.body  

        console.log(cid)
        console.log(pid)
        console.log(newStock)

        const updateStock = await cartMongoManager.updateStockInCarts(cid,pid,newStock)

        res.send(updateStock)
 
    } catch (error){
        console.log("🚀 ~ file: carts.router.js:162 ~ router.put ~ error:", error)

        res.status(500).send({error: "Failed to update the stock of the cart"})
    }


}

export const deleteAllProducts = async (req, res)=> {

    try {

        const {cid} = req.params

        const deletedProduct = await cartMongoManager.deleteAllProducts(cid)

        res.send(deletedProduct)
        
    } catch (error) {

        console.log("🚀 ~ file: carts.router.js:179 ~ router.delete ~ error:", error)

        res.status(500).send({error: "Failed to delete the products of the cart"})
        
    }
}

export const purcharseProducts = async (req,res)=>{
    
     try{

     const {cid} = req.params

     const cart = await cartMongoManager.getCartById(cid)

     const purcharsedProducts = []
     const failedToPurcharseProductos = []

     if (!cart) return res.send("Error, cart not found")

     await Promise.all (cart.products.map ( async (productInCart) => {

         const product = await productMongoManager.getProductById(productInCart.id)

         if (!product) return res.send ("Error, product not found")

         if (productInCart.quantity > product.stock){

            failedToPurcharseProductos.push(productInCart)

         } 

         else { 

             product.stock -= productInCart.quantity

             const updateProducts = await productMongoManager.updateProduct(product._id,product.stock)

             purcharsedProducts.push(productInCart.id)

             console.log(product._id)

             console.log(product.stock)

            //console.log(purcharsedProducts)

             return updateProducts
         }
     }))

     const email = req.session.user

     console.log(email)

     const ticket = new TicketModel({
         amount: cart.products.reduce((total, cartProduct) => total + cartProduct.quantity, 0),
         purcharser: req.session.user.email
     })

     const newTicket = await TicketModel.create(ticket)

     console.log(purcharsedProducts)

     await cartMongoManager.deleteManyProducts(cid,purcharsedProducts)

     res.send({OrderTicket : newTicket , UnableToBuyProducts : failedToPurcharseProductos})

   
     } catch(error) {
         console.log("🚀 ~ file: carts.controller.js:193 ~ purcharseProducts ~ error:", error)

         res.status(500).send({error: "Failed to proced with the purcharse"})
     }

}