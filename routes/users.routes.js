import { Router } from 'express';
import { signupController } from "../controllers/users.controller.js";
import {getUserByMobile} from "../repositories/users.repository.js";

const router = Router();

router.post("/signup",signupController)
router.get("/:mobile", getUserByMobile);

export default router;