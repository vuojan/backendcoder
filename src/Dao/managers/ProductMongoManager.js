import { ProductsModel } from "../models/product.model.js";
import { logger } from "../../utils/loggerConfig.js";

export default class ProductMongoManager {
    constructor(){
        this.productsModel = ProductsModel
    }

    getProducts = async () => {
        try{

            const products = await this.productsModel.find().lean()
            return products

        } catch (error){

            logger.error({Data: "file: ProductMongoManager.js:13 ~ ProductMongoManager ~ getProducts" ,Message:`${error.message}`})
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
            
            logger.error({Data: "file: ProductMongoManager.js:35 ~ ProductMongoManager ~ addProduct" ,Message:`${error.message}`})
        }
    }

    getProductById = async (id) =>{
        try {
            const product = await this.productsModel.findById(id).lean()
            
            return product

        } catch(error){
        
            logger.error({Data: "file: ProductMongoManager.js:47 ~ ProductMongoManager ~ getProductById" ,Message:`${error.message}`})
        }
    }

    updateProduct = async (id,stock) =>{
        try {
            const updatedProduct = await this.productsModel.findOneAndUpdate({_id:id},{$set:{stock:stock}}).lean()

            return updatedProduct

        } catch(error) {

            logger.error({Data: "file: ProductMongoManager.js:59 ~ ProductMongoManager ~ updateProduct" ,Message:`${error.message}`})
        }
    }

    deleteProduct = async (id) =>{
        try{
            const deletedProduct = await this.productsModel.findOneAndDelete({_id:id})

            return deletedProduct

        } catch(error) {
            
            logger.error({Data: "file: ProductMongoManager.js:71 ~ ProductMongoManager ~ deleteProduct" ,Message:`${error.message}`})
        }
    }
}