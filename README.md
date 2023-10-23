# CoderHouse - BackEnd: Proyecto final

Pasos para probar la API mediante localhost:

1- Ejecutar el script npm run start:prod - Entorno production

2- ingresar a la ruta http://localhost:8085/register 


3- Registrar un usuario utilizando como email: adminCoder@coder.com ( Esto otorgara la categoria de admin)

4- Utilizar la ruta de login con el usuario creado http://localhost:8085/login

5- Esto dara como return la vista http://localhost:8085/products

6- En este punto sera necesario agregar productos con el endpoint: 

. Metodo POST - http://localhost:8085/api/products

. Con el siguiente modelo:

    title:{ type:String, required: true }, 
    description: { type:String, required: true },  
    code: { type:Number, required: true },  
    price: { type: Number, required: true}, 
    status: {type:Boolean}, 
    stock: {type: Number, required: true},
    category: {type: String, required: true},  
    thumbnail: {type: String, required: true}

. No es necesario crear un Cart, ya que este se genera y asocia al registrar el usuario

7- En este punto ya es posible probar los dos siguientes end points para finalizar el proceso de compra:

. Metodo POST - http://localhost:8085/api/carts/{cid}/products/{id} : Permite agregar productos al carrito asociado al usuario, se ejecuta mediante el button al lado de cada producto.

. Metodo POST - http://localhost:8085/api/carts/{cid}/purcharse : Permite finalizar el proceso de comprar, dando como return un ticket con los datos del usuario.

BUGS ENCONTRADOS QUE NO PUDIERON SER SOLUCIONADOS:

- El login con github dejo de funcionar al modificar el end point /products
    - Probable causa: el login no con github no genera un cart para el usuario
        - Potencial solucion: encontrar la manera de que se genere un cart con el login

- La funcion purcharseProducts del end point http://localhost:8085/api/carts/{cid}/purcharse, no elimina los products que no pudieron ser comprados del carrito, haciendo
que estos sean arrastrados en siguientes operaciones.

