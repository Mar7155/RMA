import dotenv from 'dotenv';

dotenv.config();

export const DB_URL = process.env.DB_URL
export const DB_USER = process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASES= process.env.DB_DATABASES
export const DB_PORT = process.env.DB_PORT

export const PORT = process.env.PORT || 4321;