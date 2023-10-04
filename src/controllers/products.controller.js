import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import { ProductsModel } from "../Dao/models/product.model.js";
import config from "../config/config.js";
import { HttpStatusCodes, errors } from "../middleware/errorHandler.middleware.js";
import { mockProducts } from "../utils/mock-products.js";

const mongoManager = new ProductMongoManager ()

const httpStatus = new HttpStatusCodes ()

export const getProducts = async (req,res) => {

    try {

        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: {}
        }

         if (req.query.sort){
             if (req.query.sort === "asc") options.sort.price = 1
             else if (req.query.sort === "desc") options.sort.price = -1
         }

        const filter = {}

        if (req.query.category){
            filter.category = req.query.category
        }

    
        const {
          docs: products,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
        } = await ProductsModel.paginate(filter,options)
        
    
        const response = {
          payload: products,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink: hasPrevPage        
            ? `http://localhost:${config.PORT}/api/products?limit=${options.limit}&page=${prevPage}`
             : null,
          nextLink: hasNextPage
             ? `http://localhost:${config.PORT}/api/products?limit=${options.limit}&page=${nextPage}`
             : null,
        };

        if(!response) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)
    
        return httpStatus.OK (res,"Products succesfully loaded", response)
        
      } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res,`${errors.LOADING_ERROR}`,error)

      }
}

export const getProductById = async (req,res) => {

    
    try{
    
        const id = req.params.id

        const product = await mongoManager.getProductById(id)

        // const product = await manager.getProductById(id)

        if (!product) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)

        return httpStatus.OK(res, "Product found", product)

     } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`, error)
     }
   
}

export const addProduct = async (req,res) =>{

    try{

        const { title, 
                description, 
                code, 
                price, 
                status, 
                stock, 
                category, 
                thumbnail } = req.body

        if( !title || !description|| !code || !price || !status || !stock || !category || !thumbnail){

            return httpStatus.BAD_REQUEST(res,`${errors.BODY_FORMAT_ERROR}`)

        }

        const product =  {title, description, code, price, status, stock, category, thumbnail }

        const addedProduct = await mongoManager.addProduct(product)

        // let postProduct = await manager.addProduct(product)

        req.app.get ("io").sockets.emit("products", await mongoManager.getProducts())

        return httpStatus.CREATED(res, "Produt created", addedProduct)

    } catch(error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.CREATION_ERROR}`, error)

    }

}

export const updatedProduct = async (req,res)=>{

    try{

    const {id} = req.params

    const {stock} = req.body

    // let postUpdatedProduct = await manager.updateProduct (id,stock)

    const updatedProduct = await mongoManager.updateProduct (id,stock)

    if(updatedProduct){

        return httpStatus.OK(res, "Product updated", updatedProduct)
    }
    else{

        return httpStatus.NOT_FOUND(res, `${errors.INVALID_RESOURCE}`)
    }

    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.UPDATE_ERROR}`, error)
        
    }
    
}

export const deleteProduct = async (req,res)=>{

    try{

        const {id} = req.params

        // const newProducts = await manager.deleteProduct(id)

        const deletedProduct = await mongoManager.deleteProduct(id)

        if(deletedProduct){

            return httpStatus.OK(res, "Product deleted", deletedProduct)

        } else {

            return httpStatus.NOT_FOUND(res, `${errors.INVALID_RESOURCE}`)
        }

    } catch (error){

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.UPDATE_ERROR}`, error)
        
    }

}

export const generateProducts = async (req,res) =>{

    try {

        const products = []

        for (let index = 0; index < 100; index++) {

            products.push(mockProducts())
            
        }

        if(!products) return httpStatus.NOT_FOUND(res,`${errors.LOADING_ERROR}`)

        return httpStatus.CREATED(res, "Products generated", products)
        
    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.MOCKTEST_ERROR}`, error)
        
    }

}

