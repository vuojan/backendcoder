import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router ()

const manager = new ProductManager();

router.get ("/", async (req,res) => {

    const {limit} = req.query

    const products = await manager.getProducts()

    if (limit) {
        const limitedProducts =  products.slice(0, limit)
        return res.send(limitedProducts)
    }

     res.send(products)
 }
 )

router.get ("/:id", async (req,res) => {
    const products = await manager.getProducts()

    const {id} = req.params

    const product = products.find (product => product.id == id)

    if (product) res.send(product)
    else res.sendStatus (404)
   
})

router.post ("/", async (req,res) =>{

    const {title, description, code, price, status, stock, category, thumbnail } = req.body

    const product =  {title, description, code, price, status, stock, category, thumbnail }

    let postProduct = await manager.addProduct(product)

    res.status(201).json(postProduct)

})

router.put ("/:id", async (req,res)=>{

    const {id} = req.params

    const {stock} = req.body

    let postUpdatedProduct = await manager.updateProduct (id,stock)

    if(postUpdatedProduct){
        res.status(201).json(postUpdatedProduct)
    }
    else{
        res.status(404).json({error: "persona no encontrada"})
    }
    
})

router.delete ("/:id", async (req,res)=>{

    const {id} = req.params

    const newProducts = await manager.deleteProduct(id)

    res.send(newProducts)

})

const createProduct = async () => {

    let product = {
        title: "poe",
        description: "ARPG",
        price: 15,
        thumbnail: "www",
        code: 3,
        stock: 7,
    }
    let product2 = {
        title: "FF9",
        description: "RPG",
        price: 12,
        thumbnail: "www",
        code: 4,
        stock: 2,
    }

    let product3 = {
        title: "DIABLO4",
        description: "ARPG",
        price: 20,
        thumbnail: "www",
        code: 5,
        stock: 2,
    }

    let product4 = {
        title: "poe",
        description: "ARPG",
        price: 15,
        thumbnail: "www",
        code: 3,
        stock: 7,
    }
    let product5 = {
        title: "FF9",
        description: "RPG",
        price: 12,
        thumbnail: "www",
        code: 4,
        stock: 2,
    }

    let product6 = {
        title: "DIABLO4",
        description: "ARPG",
        price: 20,
        thumbnail: "www",
        code: 5,
        stock: 2,
    }

    let product7 = {
        title: "poe",
        description: "ARPG",
        price: 15,
        thumbnail: "www",
        code: 3,
        stock: 7,
    }
    let product8 = {
        title: "FF9",
        description: "RPG",
        price: 12,
        thumbnail: "www",
        code: 4,
        stock: 2,
    }

    let product9 = {
        title: "DIABLO4",
        description: "ARPG",
        price: 20,
        thumbnail: "www",
        code: 5,
        stock: 2,
    }

    let product10 = {
        title: "DIABLO4",
        description: "ARPG",
        price: 20,
        thumbnail: "www",
        code: 5,
        stock: 2,
    }

    let productCreated = await manager.addProduct (product)

    let productCreated2 = await manager.addProduct (product2)

    let productCreated3 = await manager.addProduct (product3)

    let productCreated4 = await manager.addProduct (product4)

    let productCreated5 = await manager.addProduct (product5)

    let productCreated6 = await manager.addProduct (product6)

    let productCreated7 = await manager.addProduct (product7)

    let productCreated8 = await manager.addProduct (product8)

    let productCreated9 = await manager.addProduct (product9)

    let productCreated10 = await manager.addProduct (product10)
}

let addedProduct = await createProduct();
addedProduct = await manager.getProducts();
console.log(addedProduct)

// let singleproduct = await manager.getProductById (3)
// console.log(singleproduct)

// let newProducts = await manager.deleteProduct (4)
// console.log(newProducts)

// let updatedProduct = await manager.updateProduct (5,20)
// console.log(updatedProduct)

export default router;