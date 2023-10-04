import mongoose from "mongoose";
import config from "../config/config.js";
import { logger } from "../utils/loggerConfig.js";
import callsites from "callsites";

const DB_HOST = config.DB_HOST
const DB_PORT = config.DB_PORT
const DB_NAME = config.DB_NAME

export const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const mongoDBService = async () => {
    try{

        const stack = callsites()[1]

        const location = `${stack.getFileName()}:${stack.getLineNumber()}`

        mongoose.connect(mongoUrl)

        logger.http({Data: location , Message: "Connected to mogoose DB"})

    }
    catch(error){

        logger.error({Message:`${error.message}` })
    }
}

export default mongoDBService


