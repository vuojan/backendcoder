import { Router } from "express";
import { addProduct, getProductById, getProducts, updatedProduct, deleteProduct, generateProducts} from "../controllers/products.controller.js";
import { roleAuthorize } from "../middleware/role.middleware.js";


const router = Router ()


router.get ("/", getProducts)

router.get ("/mockproducts", generateProducts )

router.get ("/:id", getProductById)

router.post ("/", roleAuthorize("admin"), addProduct)

router.put ("/:id", roleAuthorize("admin"), updatedProduct)

router.delete ("/:id", roleAuthorize("admin"), deleteProduct)




export default router;