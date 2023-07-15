import mongoose, {model, Schema} from "mongoose"

export const collection_users = "users"


const schema = new Schema ({

    first_name : {type: String, required:true },
    last_name : {type: String , required: true},
    email: {type: String , required: true, unique:true},
    age: {type: Number, required: true},
    password: {type: Schema.Types.Mixed , required: true}

})

export const UsersModels = mongoose.model(collection_users,schema)
