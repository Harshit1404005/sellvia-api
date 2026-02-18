import { db } from "../db/database.js"

export function createUser(user) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users (id, name, mobile, createdAt) VALUES (?, ?, ?, ?)";

        db.run(
            query,
            [user.id, user.name, user.mobile, user.createdAt],
            err => (err ? reject(err) : resolve())
        )
    })
}

export function getUserByMobile(mobile) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE mobile = ?";

        db.get(query, [mobile], (err, row) => (err ? reject(err) : resolve(row)))
    })
}