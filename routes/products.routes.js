import { json, Router } from "express";
import CartManager from "../../managers/cartManager.js";
import cartInstancia from "../../managers/cartManager.js";
//import ProductManager from "../../managers/productManager.js";
import productoInstancia from "../../managers/productManager.js"
import fs, { readdir } from "fs"
import { type } from "os";
const productstRouter = Router()
const path = "../managers/productos.json"
const pathCartFile = "../managers/cart.json"
//rutas



//obtener todos los productos
productstRouter.get("/api/products", (req, res)=>{
    //res.send("Ruta de prodcutos router")
    //leer archivo de productos
    let productos = fs.readFileSync(path, "utf-8")
    //converti a JSON
    let productosJson = JSON.parse(productos)
    //mostrar los productos

    //res.send(productosJson)
    // se comenta mientars se hace ruta add to cart para lectura facil console.log(productosJson)
    res.render("index", {productosJson})
    
})
//agregar al carrito
productstRouter.post("/api/products/addToCart", (req, res)=>{
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
        cartInstancia.saveCart()
        console.log(consultaCarrito)
        
    }
    
    res.redirect("/api/products")
        
})

//ver carrito
productstRouter.get("/api/products/addToCart/view", (req, res)=>{
    const showCart = req.body
    //archivo de carrito
    let cart = fs.readFileSync(pathCartFile, "utf-8")
    let cartJson = JSON.parse(cart)

    //ARCHIVO DE PRODUCTOS
    let productos = fs.readFileSync(path, "utf-8")
    let productosJson = JSON.parse(productos)
    //console.log(productos)
    let carrito = []
    for(let i = 0; i<cartJson.length; i++){
        //console.log(cartJson[i])
        
        let productoCarrito= productosJson.find(p=>p.prodcutoId==cartJson[i])
        carrito.push(productoCarrito)
        //console.log(productoCarrito)
        
        //console.log(carrito)
        
        
        
    }
    
    console.log(carrito)
    res.render("carrito", {carrito})
    
})

//eliminar productos de carrito
productstRouter.post("/api/products/addToCart/view/remove", (req, res)=>{
    let removeProducto = req.body
    //leer archiv de carrit
    let productos = fs.readFileSync(pathCartFile, "utf-8")
    let productosJson = JSON.parse(productos)
    

    console.log("busqueda es: ", removeProducto.removeProducto)
   
    res.redirect("/api/products/addToCart/view")


})



//ver por id
productstRouter.get("/api/products/:id", (req, res)=>{
    const productoIdCliente = req.params.id
    let productos = fs.readFileSync(path, "utf-8")
    let productosJson = JSON.parse(productos)
    let busquedaProductoId = productosJson.find(producto =>producto.prodcutoId==productoIdCliente)
    let busqueda  =productosJson.find(producto => producto.prodcutoId==productoIdCliente)
    if(busqueda){
        console.log(busqueda)
        res.send(busqueda)
    }else{
        res.send("Prodeucto no encontrado")
        console.log("Producto no encontrado")
    }
    console.log(busqueda)

})

//borrar producto por id
productstRouter.delete("/api/products/:id", (req, res)=>{
    let productoIdCliente = req.params.id

    let productos = fs.readFileSync(path, "utf-8")
    let productosJson = JSON.parse(productos)
    let busqueda  =productosJson.findIndex(producto =>producto.prodcutoId==productoIdCliente)

    if(busqueda+1){
        productosJson.splice(busqueda, 1)
        fs.writeFileSync(path, JSON.stringify(productosJson, null, 2))
        console.log("Producto borrado")
        console.log(productosJson)
        res.send(productosJson)
    }else{
        console.log("Producto no encontrado")
        res.send("Producto no encontrado")
    }
})

//actualizar productos
productstRouter.put("/api/products/:id", (req, res)=>{
    let productoIdCliente = req.params.id
    let {nombre} = req.body
    let productos = fs.readFileSync(path, "utf-8")
    let productosJson = JSON.parse(productos)
    let busqueda  =productosJson.findIndex(producto =>producto.prodcutoId==productoIdCliente)

    if(busqueda+1){
        productosJson[busqueda].nombre = nombre
        fs.writeFileSync(path, JSON.stringify(productosJson, null, 2))
        console.log("Producto actualizado")
        res.send(productosJson)
    }else{
        console.log("Producto no encontrado")
        res.send("Producto no encontrado")
    }
    console.log("Procesos finalizado")
})
/*"nombre": "Marianito",
    "precio": 1000,
    "descripcion": "des",
    "thumbnail": "img.png",
    "sku": 10000156469,
    "stock": 58,
    "prodcutoId": 10*/

//producto.addPproducts("nombre", "des", 1000, "img.png", 10000156469, 58)
//crear un prodcuto
productstRouter.post("/api/products/", (req, res)=>{
    let {nombre, precio, descripcion, thumbnail, sku, stock } = req.body
   
    //producto.addPproducts("nombre", "des", 1000, "img.png", 10000156469, 58)
    //res.send(200)
    //let producto = new ProductManager()
    
    productoInstancia.addPproducts(nombre, precio, descripcion, thumbnail, sku, stock)
    productoInstancia.saveToFile()

    res.send(200)
})


export default productstRouter