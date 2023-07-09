import { model , Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

export const collection_products = "products"

const schema = new Schema ({

    title:{ type:String, required: true }, 
    description: { type:String, required: true },  
    code: { type:Number, required: true },  
    price: { type: Number, required: true}, 
    status: {type:Boolean}, 
    stock: {type: Number, required: true},
    category: {type: String, required: true},  
    thumbnail: {type: String, required: true}

})

schema.plugin(mongoosePaginate)

export const ProductsModel = model(collection_products,schema)