import { CartsModel } from "../models/cart.model.js";

export default class CartMongoManager{
    constructor(){
        this.cartsmodel = CartsModel
    }

    getCarts = async () =>{

        try{
            const carts = await this.cartsmodel.find().lean()
            return carts

        } catch(error){
            console.log(error)
        }
    }

    addCart = async (cart) => {

        try{
            const addedCart = await this.cartsmodel.create(cart)
            return addedCart

        } catch (error){
            console.log(error)
        }
    }

    getCartById = async (id) => {

        try{
            const cart = await this.cartsmodel.findById(id).populate("products.id")
            return cart

        } catch (error){
            console.log(error)
        }
    }

    updateCartById = async (id,cart) => {

        try{
            const updatedCart = await this.cartsmodel.updateOne({_id: id},{$set:{products:cart}}).lean()
            return updatedCart

        }catch (error){
            console.log(error)
        }

    }

    deleteProductInCart = async (cid,pid) => {

        try {
            
            const deletedProductInCart = await this.cartsmodel.updateOne({_id: cid}, { $pull: { products: { id: pid } } } ).lean() 

            return deletedProductInCart

        } catch (error) {
            console.log(error)
        }
    }

    updateStockInCarts = async (cid, pid, newStock) => {
        
        try{

            const updatedStock = await this.cartsmodel.updateOne ({_id: cid, "products.id": pid},{$set: { "products.$.quantity": newStock} })

            return updatedStock

        } catch (error) {
            console.log(error)
        }
    }

    deleteAllProducts = async (cid) => {

        try{

            const deletedProducts = await this.cartsmodel.updateOne({_id:cid},{$set:{products:[]}})

            return deletedProducts

        } catch(error){

            console.log(error)
        }
    }

}