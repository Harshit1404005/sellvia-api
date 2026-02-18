import { db } from "../db/database.js"

export function createProduct(product) {
    return new Promise((resolve, reject) => {
        db.run(
            `
                INSERT INTO products (id, userId, name, price, description, imageUrl, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
            product.id,
            product.userId,
            product.name,
            product.price,
            product.description,
            product.imageUrl,
            product.createdAt
        ], err => (err ? reject(err) : resolve(product))
        )
    })
}

export function getAllProductsByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all(
            `
                SELECT * FROM products WHERE userId = ?
            `, [userId], (err, rows) => (err ? reject(err) : resolve(rows))
        )
    })
}