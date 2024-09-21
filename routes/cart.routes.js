import { Router } from "express"

import fs from "fs"
import cartInstancia from "../../managers/cartManager.js";
const cartRouteRouter = Router()
//agregar al carrito
cartRouteRouter.post("/api/products/addToCart", (req, res)=>{
    const added = req.body
    //res.send(added)
    
    if(added.added){
        //const cart = new CartManager()
        
        //cartInstancia.addToCart()
    }

    let productos = fs.readFileSync(path, "utf-8")
    let productosJson = JSON.parse(productos)
    let busqueda = productosJson.findIndex(product =>product.prodcutoId == added.added)
    if(busqueda+1){
        cartInstancia.addToCart(busqueda+1)

        //ver los productos del carrito
        let consultaCarrito = productosJson.find(producto => producto. prodcutoId == busqueda+1)
        
        console.log(consultaCarrito)
    }
    
    res.redirect("/api/products")
})

//mostrar productos del carrito
cartRouteRouter.get("/test", (req, res)=>{
    res.send(900)
})
export default cartRouteRouter
