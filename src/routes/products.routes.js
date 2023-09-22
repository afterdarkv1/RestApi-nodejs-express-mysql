import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', updateProduct);

export default router;
