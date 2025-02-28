import express from 'express';
import { addProduct, getProduct, deleteProduct } from '../../controllers/productController.js';
import uploader from '../../middleware/multerMiddleware.js';
import { isAdmin, isLoggedIn } from '../../validations/authValidator.js';

const productRouter = express.Router();
productRouter.post("/", isLoggedIn, isAdmin, uploader.single('productImage'), addProduct);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;