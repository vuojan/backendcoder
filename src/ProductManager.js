import fs from "fs"

export default class ProductManager {

    constructor() {
        this.path = "./src/Products.json";
    }

    addProduct = async(product) => {
        const products = await this.getProducts();

        if (products.length === 0){
            product.id = 1;
            } else{
            product.id = products[products.length - 1].id + 1
            } 

        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        return products

        }
        

    getProducts = async() => {

        if (fs.existsSync(this.path)){
            
            const dataProduct = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(dataProduct)
            return products

        } else {
            return []
        }

    }

    getProductById = async(id) => {

         const products = await this.getProducts()

         const product = products.find(product => product.id === id)
        
         return product


     }

    updateProduct = async(id,stock) => {

        const products = await this.getProducts()

        const updatedProduct = products.find(product => product.id == id)

        updatedProduct.stock = stock

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
       
        return updatedProduct

    }

    deleteProduct = async(id) => {

         const products = await this.getProducts()

         const newProducts = products.filter(product => product.id != id)
         
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'))

        return newProducts

        }

}
