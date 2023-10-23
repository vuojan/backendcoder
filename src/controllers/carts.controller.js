import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import CartMongoManager from "../Dao/managers/CartMongoManager.js";
import { TicketModel } from "../Dao/models/ticket.model.js";
import { updatedProduct } from "./products.controller.js";
import { HttpStatusCodes, errors } from "../middleware/errorHandler.middleware.js";


const cartMongoManager = new CartMongoManager ()
const productMongoManager = new ProductMongoManager ()
const httpStatus = new HttpStatusCodes ()

export const getCarts = async (req,res) => {

    try{
        // const carts = await manager.getCarts()
        const carts = await cartMongoManager.getCarts()

        if (!carts) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)
        
        return httpStatus.OK(res, "Carts loaded", carts)
        
    }
    catch(error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})
        
        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`, error)
    }
}
 
export const getCartById = async (req,res) => {

    try{
    // const carts = await manager.getCarts()

        const {cid} = req.params

    // const cart = carts.find (cart => cart.id == cid)

        const cart = await cartMongoManager.getCartById(cid)

        if (!cart) return httpStatus.NOT_FOUND(res, `${errors.INVALID_RESOURCE}`)

        return httpStatus.OK(res, "Cart found", cart)
    
    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`,error)
    }
}

export const addCart = async (req,res) =>{

    try{

        const cart =  {products: []}

        // let postCart = await manager.addCart(cart)

        const addedCart = await cartMongoManager.addCart(cart)

        return httpStatus.CREATED(res, "Cart created", addedCart)

    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.CREATION_ERROR}`, error)
    }

}

export const addProductIntoCart = async (req,res)=> {
    
    try{

        const {cid} = req.params

        const {id} = req.params

        // const cart = await manager.getCartById(cid)

        const cart = await cartMongoManager.getCartById(cid)

        if (!cart) {

            return httpStatus.NOT_FOUND(res, `${errors.INVALID_RESOURCE}`)
            
        }

        // const product = await productManager.getProductById(id)

        const product = await productMongoManager.getProductById(id)

        if (!product) {

            return httpStatus.NOT_FOUND(res, `${errors.INVALID_RESOURCE}`)

        }

        // const productInCart = await CartsModel.findOne()

        const productIndex = cart.products.findIndex(
            (product) => product.id.equals(id)
        )

        req.logger.info({Data: req.logMessage, Message: id})
    
        if (productIndex === -1){
            cart.products.push({id:product._id, quantity: 1})
        } else {
            cart.products[productIndex].quantity++;
        }

        // await manager.updateCartProductsById(cid,cart.products)

        await cartMongoManager.updateCartById(cid, cart.products)

        return httpStatus.OK(res, "Product added", cart)

    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.ADD_ERROR}`, error )

    }
    


}

export const deleteProductInCart = async (req,res) =>{

    try{

        const { cid, pid } = req.params

        req.logger.info({Data: req.logMessage, Message: cid})

        req.logger.info({Data: req.logMessage, Message: pid})

        const ProductInCart = await cartMongoManager.deleteProductInCart (cid,pid)

        if(!ProductInCart) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)

        return httpStatus.OK(res,"Product deleted", ProductInCart)

    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res,`${errors.DELETION_ERROR}`, error)
    }

}

export const updateStockInCarts = async (req,res) => {

    try{

        const {cid, pid} = req.params

        const {newStock} = req.body  

        req.logger.info({Data: req.logMessage, Message: cid})
        req.logger.info({Data: req.logMessage, Message: pid})
        req.logger.info({Data: req.logMessage, Message: newStock})

        const updateStock = await cartMongoManager.updateStockInCarts(cid,pid,newStock)

        if(!updateStock) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)

        return httpStatus.OK(res,"Product in cart updated", updateStock)
 
    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res,`${errors.UPDATE_ERROR}`,error)
    }


}

export const deleteAllProducts = async (req, res)=> {

    try {

        const {cid} = req.params

        const deletedProduct = await cartMongoManager.deleteAllProducts(cid)

        if(!deletedProduct) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)

        return httpStatus.OK(res,"Products deleted succesfuly", deletedProduct)
        
    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res,`${errors.DELETION_ERROR}`,error)
        
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

     const totalPurchasedAmount = purcharsedProducts.reduce((total, productId) => {
        const purchasedProduct = cart.products.find(product => product.id === productId);
        return total + purchasedProduct.quantity;
    }, 0);

     const ticket = new TicketModel({
         amount: totalPurchasedAmount,
         purcharser: req.session.user.email
     })

     const newTicket = await TicketModel.create(ticket)

     console.log(purcharsedProducts)

     await cartMongoManager.deleteManyProducts(cid,purcharsedProducts)

    //  await cartMongoManager.deleteManyProducts(cid,failedToPurcharseProductos)

    const response = {
        OrderTicket: newTicket,
        UnableToBuyProducts: failedToPurcharseProductos
    };

    // failedToPurcharseProductos.splice(0, failedToPurcharseProductos.length);

    return httpStatus.OK(res, "Ticket generated", response)

   
     } catch(error) {
         console.log("🚀 ~ file: carts.controller.js:193 ~ purcharseProducts ~ error:", error)

         res.status(500).send({error: "Failed to proced with the purcharse"})
     }

}