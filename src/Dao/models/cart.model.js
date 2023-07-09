import { model , Schema } from "mongoose"
import { collection_products } from "./product.model.js";

const collection_carts = "carts"

const schema = new Schema ({

products: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: collection_products,
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const CartsModel = model(collection_carts,schema)