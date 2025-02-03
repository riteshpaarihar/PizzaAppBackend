import express from 'express';
import addProduct from '../../controllers/productController.js';
import uploader from '../../middleware/multerMiddleware.js';

const productRouter = express.Router();
productRouter.post("/", uploader.single('productImage'), addProduct);
export default productRouter;