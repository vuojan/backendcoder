import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";


const router = Router ()

const manager = new CartManager();
const productManager = new ProductManager();

router.get ("/", async (req,res) => {

    const carts = await manager.getCarts()

    res.send(carts)
 }
 )

router.get ("/:cid", async (req,res) => {
    const carts = await manager.getCarts()

    const {cid} = req.params

    const cart = carts.find (cart => cart.id == cid)

    if (cart) res.send(cart)
    else res.sendStatus (404)
   
})

router.post ("/", async (req,res) =>{

    const cart =  {products: []}

    let postCart = await manager.addCart(cart)

    res.status(201).json(postCart)


})

router.post ("/:cid/products/:id", async (req,res)=> {

    const {cid} = req.params

    const {id} = req.params

    const cart = await manager.getCartById(cid)

    if (!cart) {
        return res.send("Error")
    }

    const product = await productManager.getProductById(id)

    if (!product) {
        return res.send("Error")
    }

    const productIndex = cart.products.findIndex(
        (product) => product.id == parseInt (id)
    )

    if (productIndex === -1){
        cart.products.push({id:product.id, quantity: 1})
    } else {
        cart.products[productIndex].quantity++;
    }

    await manager.updateCartProductsById(cid,cart.products)

    res.status(201).json(cart)
    

})

const createCart = async () => {

    let cart = {
        products: []
    }
    let cart2 = {
       products: []
    }

    let cartCreated = await manager.addCart (cart)

    let cartCreated2 = await manager.addCart (cart2)
}

// let addedCart = await createCart ()
// addedCart = await manager.getCarts()

export default router
