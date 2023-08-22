import dotenv from "dotenv"

dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
})

export default {
    PORT : process.env.PORT,
    DB_HOST : process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    MONGO_SECRET: process.env.MONGO_SECRET,
    GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
}
