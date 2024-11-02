import pg from "pg";
import { DB_DATABASES, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, PORT } from "./config.js";

export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASES,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false, 
    },
})
