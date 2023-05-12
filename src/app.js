import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();

const manager = new ProductManager();

app.use (express.urlencoded({extended:true}))

app.get ("/products", async (req,res) => {

     const products = await manager.getProducts()

     res.send({products})
 }
 )

 app.get ("/limited", async (req,res) => {

    const products = await manager.getProducts()

    const {limit} = req.query

    const limitedProducts = products.slice(0, limit)

    res.send({limitedProducts})
}
)

app.get ("/products/:id", async (req,res) => {
    const products = await manager.getProducts()

    const {id} = req.params

    const product = products.find (product => product.id == id)

    if (product) res.send(product)
    else res.sendStatus (404)
   
})

 app.listen (8084, ()=> console.log("listening on 8084"))


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


    // productCreated = await manager.getProducts ()

    // productCreated2 = await manager.getProducts ()

    // productCreated3 = await manager.getProducts ()

}

let addedProduct = await createProduct();
addedProduct = await manager.getProducts();
console.log(addedProduct)

let singleproduct = await manager.getProductById (3)
console.log(singleproduct)

let newProducts = await manager.deleteProduct (4)
console.log(newProducts)

let updatedProduct = await manager.updateProduct (5)
console.log(updatedProduct)
