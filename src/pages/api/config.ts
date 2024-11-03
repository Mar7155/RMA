
interface DbConfig {
    DB_URL: string;
    DB_USER: string;
    DB_HOST: string;
    DB_PASSWORD: string;
    DB_DATABASES: string;
    DB_PORT: string;
}

const dbConfig: DbConfig = {
    DB_URL: import.meta.env.DB_URL,
    DB_USER: import.meta.env.DB_USER,
    DB_HOST: import.meta.env.DB_HOST,
    DB_PASSWORD: import.meta.env.DB_PASSWORD,
    DB_DATABASES: import.meta.env.DB_DATABASES,
    DB_PORT: import.meta.env.DB_PORT || '5432'
};

export const PUBLIC_ROUTES = ["/", "/Login", "/Sign", "/Clases", "/Recursos", "/api/controllers/login.controller", "/api/controllers/register.controller"];

export const LOGIN_ROUTES = ["/Login", "/Register"]

export default dbConfig;
