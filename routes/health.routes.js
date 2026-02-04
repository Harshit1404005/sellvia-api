import { Router } from 'express';

const router = Router();

router.get("/",(req,res)=>{
    res.json({
        status: "success",
        service: "Sellvia API",
        env: "local"
    })
})

export default router;