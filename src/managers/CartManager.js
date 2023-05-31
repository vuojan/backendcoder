import fs from "fs"

export default class CartManager {

    constructor() {
        this.path = "./src/Carts.json";
    }

    addCart = async(cart) => {
        const carts = await this.getCarts();

        if (carts.length === 0){
            cart.id = 1;
            } else{
            cart.id = carts[carts.length - 1].id + 1
            } 

        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        return carts

        }
        

    getCarts = async() => {

        if (fs.existsSync(this.path)){
            
            const dataCart = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(dataCart)
            return carts

        } else {
            return []
        }

    }

    getCartById = async(id) => {

         const carts = await this.getCarts()

         const cart = carts.find(cart => cart.id == id)
        
         return cart


     }

     updateCartProductsById = async (id,productslist) => {

        const carts = await this.getCarts()

        const cart = carts.find ( cart => cart.id == id)

        cart.products = productslist

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

        return carts

     }

}