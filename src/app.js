import express from "express";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";


const app = express();

app.use (express.static (`${__dirname}/public`))
app.use (express.json())
app.use (express.urlencoded({extended:true}))

app.engine ("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/realtimeproducts", viewsRouter)

const server = app.listen (8084, ()=> console.log("listening on 8084"))

const io = new Server (server)

// io.on("connection", socket => {
//     console.log("Cliente conectado")

//     socket.on("message", data =>{
//         console.log(data)
//     })

//     socket.emit("socket_individual","mensaje para el socket")

//     socket.broadcast.emit("socket_quitatetu", "quitate tu")

// })


