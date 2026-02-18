import { Router } from "express";
import { addProductController } from "../controllers/products.controller.js";
import { uploadProductImage } from "../middlewares/upload.js";
const router = Router();

router.post('/',uploadProductImage.single("image"),addProductController)

export default router;