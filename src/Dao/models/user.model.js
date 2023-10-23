import mongoose, {model, Schema} from "mongoose"
import {collection_carts} from "./cart.model.js"

export const collection_users = "users"


const schema = new Schema ({

    first_name : {type: String, required:true },
    last_name : {type: String , required: true},
    email: {type: String , required: true, unique: true},
    age: {type: Number, required: true},
    password: {type: Schema.Types.Mixed , required: true},
    cart: {type: Schema.Types.ObjectId, ref: collection_carts},
    lastActivity: {type: Date, default: Date.now},
    role: { type: String, enum: ["usuario", "admin"], default: "usuario" }
})

export const UsersModels = mongoose.model(collection_users,schema)
