const fs = require("fs");
// import { promises as fs } from "fs";

// const { json } = require("stream/consumers");

// const dirName = "./productos";
// const fileName = dirName + "/productos.txt";
const fileName = "productos.txt";

class ProductManager {
    constructor(){
        this.patch = fileName
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) =>{
        // await fs.promises.mkdir(dirName, { recursive: true });
        if (this.products.some(product => product.code === code)){
            console.log("Error al agregar producto, el code se repite")
        }else{
            let newProduct = {
                title : title,
                description : description,
                price : price,
                thumbnail : thumbnail,
                stock : stock,
                code : code,
                id : ++ProductManager.id
            }
    
            this.products.push(newProduct);
            console.log("se agrego el producto con exito")

        }

        await fs.promises.writeFile(fileName, JSON.stringify(this.products));

    }

        readProduct = async () => {
            let catalogoProductos  = await fs.promises.readFile(fileName, "utf-8");
            return JSON.parse(catalogoProductos)
        }

        getProduct = async () => {
            let respuesta = await this.readProduct()
            return console.log(respuesta)
        }

        getProductById = async (id) => {
            let catalogoId = await this.readProduct()
            let productExiste = catalogoId.find(product => product.id === id)
            if(!productExiste){
                console.log("producto no encontrado")
            }else{
                console.log("Resultado de busqueda:")
                console.log(productExiste)
            }
        }

        deleteProductById = async (id) => {
            let respuesta = await this.readProduct()
            let productosObtenidos = respuesta.filter(products => products.id != id)
            console.log(productosObtenidos)
            await fs.promises.writeFile(fileName, JSON.stringify(productosObtenidos));
            console.log("producto Eliminado")
            console.log("Catalogo Actualizado")
        } 
}




// const productos = new ProductManager

// EJECUCION DE FUNCIONES 


// 1. AGREGAR PRODUCTOS AL CATALOGO --->
        // productos.addProduct("iPhone", "iPhone 20", 2000, "imagenTelefono", "abc123", 10 )
        // productos.addProduct("Xiaomi", "Redmi 50", 1500, "imagenTelefono", "abc124", 10 )
        // productos.addProduct("Samsung", "Samsung J100", 3500, "imagenTelefono", "abc125", 10 )
        // productos.addProduct("Blackberry", "BB8", 1500, "imagenTelefono", "abc126", 10 )
        // productos.addProduct("Nokia", "3310", 1500, "imagenTelefono", "abc127", 10 )
        // productos.addProduct("Motorolla", "Razr", 1500, "imagenTelefono", "abc128", 10 )
        // productos.addProduct("Sony Ericsson", "W595", 1500, "imagenTelefono", "abc129", 10 )

// 2. CONSULTAR TODOS LOS PRODUCTOS DEL CATALOGO --->
        // productos.getProduct()

// 3. CONSULTAR PRODUCTOS POR ID --->
        // productos.getProductById(2)

// 4. ELEIMINAR PRODUCTOS DEL CATALOGO SEGUN ID --->
        // productos.deleteProductById(2)


module.exports = ProductManager