import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer} from "http"
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils/utils.js";
import ProductManager from "./Dao/managers/ProductManager.js"
import mongoDBService from "./services/mongoDb.service.js";
import ProductMongoManager from "./Dao/managers/ProductMongoManager.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import { mongoUrl } from "./services/mongoDb.service.js";
import sessionRouter from "./routes/sessions.router.js"
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import flash from "connect-flash"


const app = express();
const httpServer = new HttpServer (app)
const io = new IOServer (httpServer)

app.set("io",io);


app.use (express.static (`${__dirname}/../public`))
app.use (express.json())
app.use (express.urlencoded({extended:true}))
app.use (cookieParser())
app.use (session({
  store: MongoStore.create({
    mongoUrl: mongoUrl,
    mongoOptions: {useNewUrlParser: true , useUnifiedTopology: true},
    ttl: 60
    }),
  secret: "123456",
  resave: false,
  saveUninitialized: false
}))
initializePassport ()
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.engine ("handlebars", handlebars.engine())
app.set("views", `${__dirname}/../views`)
app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use("/api/session", sessionRouter)

const server = httpServer.listen (8084, async ()=> {

  await mongoDBService();

  console.log("listening on 8084")

})

server.on("error", (error) => {
    console.log(error);
  });



io.on("connection", async (socket) => {
     console.log("Cliente conectado")

     const mongoManager = new ProductMongoManager ()

     const products = await mongoManager.getProducts()

     io.sockets.emit ( "products", products)

 })



