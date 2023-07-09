import { ProductsModel } from "../models/product.model.js";

export default class ProductMongoManager {
    constructor(){
        this.productsModel = ProductsModel
    }

    getProducts = async () => {
        try{
            const products = await this.productsModel.find().lean()
            return products
        } catch (error){
            console.log(error)
        }
    }

    addProduct = async (product) =>{
        try {
             const reapeatedCode = await this.productsModel.findOne({code: product.code})

             if (reapeatedCode) {
                 console.log("That code already exist")
                 return null
             }

            const addedProduct = await this.productsModel.create(product)
            
            return addedProduct;

        } catch(error){
            console.log(error)
        }
    }

    getProductById = async (id) =>{
        try {
            const product = await this.productsModel.findById(id).lean()
            
            return product

        } catch(error){
            console.log(error)
        }
    }

    updateProduct = async (id,stock) =>{
        try {
            const updatedProduct = await this.productsModel.findOneAndUpdate({_id:id},{$set:{stock:stock}}).lean()

            return updatedProduct

        } catch {
            console.log(error)
        }
    }

    deleteProduct = async (id) =>{
        try{
            const deletedProduct = await this.productsModel.findOneAndDelete({_id:id})

            return deletedProduct

        } catch(error) {
            console.log(error)
        }
    }
}