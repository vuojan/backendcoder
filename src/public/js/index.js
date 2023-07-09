const socket = io();

const productsList = document.getElementById("productslist")

socket.on("products", products => {
    const allProductList = products.map((product)=>  
         `<ul>
             <li>Product: ${product.title}</li>
             <li>Precio: ${product.price}</li>
             <li>Stock: ${product.stock}</li>
         </ul>` 
        ).join("")
    productsList.innerHTML = allProductList
}
)

