getProductId = () => {
    return Math.random().toString(36).substring(2);
};

class Product{
    constructor(title, description, price, thumbnail, stock, code){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.code = code;
        this.id = getProductId();

    }
};

class ProductManager{
    constructor(){
        this.products = new Array();
    }
    getProducts = () =>{
        return this.products;
    }
    addProduct = (title, description, price, thumbnail, stock, code) =>{

        if (this.products.some(product => product.code === code)){
            console.log("Error al agregar producto, el code se repite")
        }else{
            let newProduct = new Product (title, description, price, thumbnail, stock, code)
            this.products.push(newProduct);
            console.log("se agrego el producto con exito")

        }
             
    }
};

let productManager = new ProductManager();
console.log(productManager);
console.log(productManager.getProducts());
productManager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", 25, "abc123");
console.log(productManager.getProducts())
productManager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", 25, "abc123");

