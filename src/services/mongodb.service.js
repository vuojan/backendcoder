import mongoose from "mongoose";

const DB_HOST = "127.0.0.1"
const DB_PORT = "27017"
const DB_NAME = "Ecommerce"

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


