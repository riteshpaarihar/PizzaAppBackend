import express from 'express';
import { addProduct, getProduct, deleteProduct } from '../../controllers/productController.js';
import uploader from '../../middleware/multerMiddleware.js';

const productRouter = express.Router();
productRouter.post("/", uploader.single('productImage'), addProduct);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;