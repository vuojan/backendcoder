import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router ()

const manager = new ProductManager();

router.get ("/", async (req,res) =>{

    const products = await manager.getProducts()

    res.render ("home",{
        products
    })
})

export default router