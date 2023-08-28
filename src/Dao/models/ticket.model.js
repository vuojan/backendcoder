import { model , Schema } from "mongoose"

export const collection_ticket = "ticket"

const schema = new Schema ({
 
    code: { type:String, required: true, default:function(){ return this._id.toString()} },  
    purcharse_datatime: { type: Date, default: Date.now()}, 
    amount: {type: Number, required: true},
    purcharser: {type: String, required: true}

})

export const TicketModel = model(collection_ticket,schema)