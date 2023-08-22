import { Router } from "express";
import { addProduct, getProductById, getProducts, updatedProduct, deleteProduct} from "../controllers/products.controller.js";

const router = Router ()


router.get ("/", getProducts)

router.get ("/:id", getProductById)

router.post ("/", addProduct)

router.put ("/:id", updatedProduct)

router.delete ("/:id", deleteProduct)


export default router;