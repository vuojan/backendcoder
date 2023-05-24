import { Router } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../ProductManager.js";

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

    const {products} = req.body

    const cart =  {products}

    let postCart = await manager.addCart(cart)

    res.status(201).json(postCart)


})

router.post ("/:cid/products/:id", async (req,res)=> {

    const products = await productManager.getProducts()

    const {cid} = req.params

    const {id} = req.params

    const cart = await manager.getCartById(cid)

    const productById = products.find(product => product.id == id)

    cart.products.push(productById.id)

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

let addedCart = await createCart ()
addedCart = await manager.getCarts()

export default router
