const express = require('express')
const ProductManager = require('./ProductManager')
const app = express()
const SERVER_PORT = 8080

const server = app.listen(SERVER_PORT, () =>{
    console.log(`Servidor ${SERVER_PORT} inicializado` )
})

const productos = new ProductManager()

const readProducts = productos.readProduct()

app.get("/productos", async (req, res) =>{
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readProducts)
    const productLog = await readProducts
    const productLimit =  productLog.slice(0, limit)
    res.send(productLimit)
})

app.get("/productos/:id", async (req, res) =>{
    let id = parseInt(req.params.id)
    const productLog = await readProducts
    const productById = productLog.find(product => product.id === id)
    res.send(productById)

})


