import { Router } from "express";
import ProductManager from "../Dao/managers/ProductManager.js";
import ProductMongoManager from "../Dao/managers/ProductMongoManager.js";
import { ProductsModel } from "../Dao/models/product.model.js";

const router = Router ()

// const manager = new ProductManager();

const mongoManager = new ProductMongoManager ()

router.get ("/", async (req,res) => {

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
            ? `http://localhost:8084/api/products?limit=${options.limit}&page=${prevPage}`
             : null,
          nextLink: hasNextPage
             ? `http://localhost:8084/api/products?limit=${options.limit}&page=${nextPage}`
             : null,
        };
    
        return res.send(response);
      } catch (error) {
        console.log(error);
        res.send("Error");
      }
})

router.get ("/:id", async (req,res) => {

    
    try{
    
    const id = req.params.id

    const product = await mongoManager.getProductById(id)

    // const product = await manager.getProductById(id)

     if (product) res.send(product)
     else res.status(404).json({error: "Producto no encontrado"})

     } catch (error) {
         console.log(error)
     }
   
})

router.post ("/", async (req,res) =>{

    const { title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail } = req.body

    if( !title || !description|| !code || !price || !status || !stock || !category || !thumbnail){
        return res.send("Error")
    }

    const product =  {title, description, code, price, status, stock, category, thumbnail }

    const addedProduct = await mongoManager.addProduct(product)

    // let postProduct = await manager.addProduct(product)

    req.app.get ("io").sockets.emit("products", await mongoManager.getProducts())

    res.status(201).json(addedProduct)

})

router.put ("/:id", async (req,res)=>{

    const {id} = req.params

    const {stock} = req.body

    // let postUpdatedProduct = await manager.updateProduct (id,stock)

    const updatedProduct = await mongoManager.updateProduct (id,stock)

    if(updatedProduct){
        res.status(201).json({message: "producto actualizado", updateduser : updatedProduct})
    }
    else{
        return res.status(404).json({error: "producto inexistente"})
    }
    
})

router.delete ("/:id", async (req,res)=>{

    try{

        const {id} = req.params

        // const newProducts = await manager.deleteProduct(id)

        const deletedProduct = await mongoManager.deleteProduct(id)

        if(deletedProduct){
            res.send({message: "producto borrado" , product : deletedProduct})
        } else {
            return res.send({message: "producto inexistente"})
        }

    } catch (error){
        console.log(error)
    }

})


export default router;