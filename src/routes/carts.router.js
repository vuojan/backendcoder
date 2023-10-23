
import { Router } from "express";
import { getCarts, getCartById, addCart, updateStockInCarts, deleteAllProducts, deleteProductInCart, addProductIntoCart, purcharseProducts } from "../controllers/carts.controller.js";
import { roleAuthorize } from "../middleware/role.middleware.js";



const router = Router ()


router.get ("/", getCarts)

router.get ("/:cid", getCartById )

router.post ("/", addCart)

router.post ("/:cid/products/:id", addProductIntoCart )

router.delete ("/:cid/products/:pid", deleteProductInCart)

router.put ("/:cid/products/:pid", updateStockInCarts)

router.delete("/:cid", deleteAllProducts)

router.post ("/:cid/purcharse", purcharseProducts)

export default router
