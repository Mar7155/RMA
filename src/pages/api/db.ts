import pg from "pg";
import QueryResult from "pg";
import dbConfig from "./config.ts";

export const ResultQuery = QueryResult;

export const pool = new pg.Pool({
    user: dbConfig.DB_USER,
    host: dbConfig.DB_HOST,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_DATABASES,
    ssl: {
        rejectUnauthorized: false, 
    },
})