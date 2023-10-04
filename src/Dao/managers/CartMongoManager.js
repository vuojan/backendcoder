import { CartsModel } from "../models/cart.model.js";
import { logger } from "../../utils/loggerConfig.js";

export default class CartMongoManager{
    constructor(){
        this.cartsmodel = CartsModel
    }

    getCarts = async () =>{

        try{
            const carts = await this.cartsmodel.find().lean()
            return carts

        } catch(error){

            logger.error({Data: "file: CartMongoManager.js:16 ~ CartMongoManager ~ getCarts" ,Message:`${error.message}`})
        }
    }

    addCart = async (cart) => {

        try{
            const addedCart = await this.cartsmodel.create(cart)
            return addedCart

        } catch (error){
            
            logger.error({Data: "file: CartMongoManager.js:28 ~ CartMongoManager ~ addCart" ,Message:`${error.message}`})
        }
    }

    getCartById = async (id) => {

        try{
            const cart = await this.cartsmodel.findById(id).populate("products.id")
            return cart

        } catch (error){
    
            logger.error({Data: "file: CartMongoManager.js:40 ~ CartMongoManager ~ getCartById" ,Message:`${error.message}`})
        }
    }

    updateCartById = async (id,cart) => {

        try{
            const updatedCart = await this.cartsmodel.updateOne({_id: id},{$set:{products:cart}}).lean()
            return updatedCart

        }catch (error){
            
            logger.error({Data: "file: CartMongoManager.js:52 ~ CartMongoManager ~ updateCartById" ,Message:`${error.message}`})
        }

    }

    deleteProductInCart = async (cid,pid) => {

        try {
            
            const deletedProductInCart = await this.cartsmodel.updateOne({_id: cid}, { $pull: { products: { id: pid } } } ).lean() 

            return deletedProductInCart

        } catch (error) {
            
            logger.error({Data: "file: CartMongoManager.js:67 ~ CartMongoManager ~ deleteProductInCart" ,Message:`${error.message}`})
        }
    }

    deleteManyProducts = async (cid,products) =>{

        try {
            
            const deletedProductsInCart = await this.cartsmodel.updateOne({_id: cid}, { $pull: { products: { id: {$in: products} } } } ).lean() 

            return deletedProductsInCart

        } catch (error) {
            
            logger.error({Data: "file: CartMongoManager.js:81 ~ CartMongoManager ~ deleteManyProducts" ,Message:`${error.message}`})
        }
    }

    updateStockInCarts = async (cid, pid, newStock) => {
        
        try{

            const updatedStock = await this.cartsmodel.updateOne ({_id: cid, "products.id": pid},{$set: { "products.$.quantity": newStock} })

            return updatedStock

        } catch (error) {
            
            logger.error({Data: "file: CartMongoManager.js:95 ~ CartMongoManager ~ updateStockInCarts" ,Message:`${error.message}`})
        }
    }

    deleteAllProducts = async (cid) => {

        try{

            const deletedProducts = await this.cartsmodel.updateOne({_id:cid},{$set:{products:[]}})

            return deletedProducts

        } catch(error){
            
            logger.error({Data: "file: CartMongoManager.js:109 ~ CartMongoManager ~ deleteAllProducts" ,Message:`${error.message}`})
        }
    }

}