import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database("D:/startup Idea/App/Sellvia-apis/db/sellvia.db", error => {
    if (error) {
        console.log("Unable to connect with database");
    } else {
        console.log("Sellvia Database Connected Successfully");
    }
});

//create tables

db.run(
    `
        CREATE TABLE IF NOT EXISTS users
        (
            id        TEXT PRIMARY KEY,
            name      TEXT        NOT NULL,
            mobile    TEXT UNIQUE NOT NULL,
            createdAt TEXT        NOT NULL
        )
    `
);

db.run(
    `
        CREATE TABLE IF NOT EXISTS otps
        (
            mobile   TEXT PRIMARY KEY,
            otp      TEXT    NOT NULL,
            expiresAt INTEGER NOT NULL
        )
    `
)

db.run(
    `

        CREATE TABLE IF NOT EXISTS products
        (
            id          TEXT PRIMARY KEY,
            userId      TEXT    NOT NULL,
            name        TEXT    NOT NULL,
            price       INTEGER NOT NULL,
            description TEXT,
            imageUrl    TEXT,
            createdAt   TEXT    NOT NULL
        );

    `
)

db.run(
    `

        CREATE TABLE IF NOT EXISTS orders
        (
            id                 TEXT PRIMARY KEY,
            buyerMobile        TEXT NOT NULL,
            buyersAddress      TEXT NOT NULL,
            buyerPaymentMethod TEXT NOT NULL,
            buyerName          TEXT NOT NULL,
            buyerPaymentStatus TEXT NOT NULL,
            productId          TEXT NOT NULL,
            storeUserId        TEXT NOT NULL,
            orderedAt          TEXT NOT NULL
        )

    `
)

