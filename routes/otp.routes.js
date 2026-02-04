import {Router} from 'express';
import {requestOtp , verifyOtp} from "../controllers/otp.controller.js";

const router = Router();

router.post("/sendOtp", requestOtp);
router.post("/verifyOtp", verifyOtp);

export default router;