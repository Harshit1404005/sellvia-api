import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database("./sellvia_database.db", error => {
    if (error){
        console.log("Unable to connect with database");
    }else{
        console.log("Sellvia Database Connected Successfully");
    }
});

//create tables

db.run(
    `(
        CREATE TABLE IF NOT EXISTS users 
        (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            mobile TEXT UNIQUE NOT NULL,
            createdAt TEXT NOT NULL
        )
    )`
);