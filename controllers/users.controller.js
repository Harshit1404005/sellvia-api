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

            if (!data.mobile){
                res.writeHead
            }

        } catch (error) {
            
        }
    })
}
