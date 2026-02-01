import {db} from "../db/database"

export function createUser(user){
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users (id, name, mobile, createdAt) VALUES (?, ?, ?, ?)";


        db.run(
            query,
            [user.na]
        )
    })
}