import mysql, { Pool } from "mysql2/promise";

export let pool: Pool;

export async function connect() {
    try {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });


        await pool.getConnection();
        if (!pool) {
            throw new Error("MySQL connection is not established.");
        }
        console.log("Pinged MySQL server successfully.");
    }
    catch (error) {
        console.error("Error connecting to MySQL:", error);
    }
}

export async function disconnect() {
    if (pool) {
        await pool.end();
        console.log("Disconnected from MySQL server.");
    }
}