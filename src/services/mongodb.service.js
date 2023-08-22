import mongoose from "mongoose";
import config from "../config/config.js";

const DB_HOST = config.DB_HOST
const DB_PORT = config.DB_PORT
const DB_NAME = config.DB_NAME

export const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const mongoDBService = async () => {
    try{
        mongoose.connect(mongoUrl)
        console.log("Connected to mongoose DB")
    }
    catch(error){
        console.log(error)
    }
}

export default mongoDBService


