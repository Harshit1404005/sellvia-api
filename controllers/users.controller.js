import { json } from "node:stream/consumers";
import { createUser } from "../repositories/users.repository";

export function signupController(req, res){
    let body = "";

    req.on("data" , chunk => {
        body += chunk;
    })

    
    req.on("end", async () => {
        try {
            const data = JSON.parse(body);

            const user = {
                id: "U_" + Date.now(),
                name: data.name,
                mobile: data.mobile,
                createdAt: new Date().toISOString()
            };

            if (!data.mobile){
                res.statu
            }



        } catch (error) {
            
        }
    })
}
