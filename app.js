import express from "express"
//routers
import productstRouter from "./routes/products.routes.js"
//import productstRouter from "./routes/cart.routes.js"
import exphbs from "express-handlebars"
import cartRouteRouter from "./routes/cart.routes.js"
//Confguraciones generales
const port = 8080
const app = express()

//bandelbars
//configuración de handlebars
app.engine("handlebars", exphbs.engine())
//renderizar con handlebars
app.set("view engine", "handlebars")
//ubicación de archivos handlebars
app.set("views", "views")

//datos
//recibir json
app.use(express.json())
//recibir datos complejos
app.use(express.urlencoded({extended:true}))

//rutas
app.use("/", productstRouter);

//rutas de carrito de compra
app.use("./", cartRouteRouter)

//Mostrar en puerto 8080
app.listen(port,()=>{
    console.log(`http://localhost:8080/api/products`)
})
