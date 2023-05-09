import fs from 'fs'

export default class ProductManager {

    constructor (path) {
        this.path = path
        this.Products = []
        const productString= fs.readFileSync(this.path, "utf-8")
        const Products = JSON.parse(productString)
        this.Products = Products

    }

    addProduct (title, description, price, thumbnail, stock) {
        let idMax= 0
        this.Products.forEach((prod) => {
            if (prod.code >idMax) 
            idMax = prod.code
        })

        idMax++

        const product = {

            code: idMax,
            title: title || "none",
            decription: description || "none",
            price: price || 0,
            thumbnail: thumbnail || "none",
            stock: stock || 0,

        }

        this.Products.push(product)
        const productString = JSON.stringify(this.Products)
        fs.writeFileSync(this.path, productString)
    }

    getProducts (){
        return this.Products
    }

    getProductById (id) {
        if( id<=this.Products.length && id>0 ) {
            
            let serch = this.Products.find((prod)=> prod.code==id)
            return serch

        }else {
            return("Producto no encontrado")
        }
        

    }

        deleteProduct (id) {

        if( id<=this.Products.length && id>0 ) {
            
            let i = this.Products.indexOf((prod)=> prod.code==id)
            this.Products.splice(i,1)
            const productString = JSON.stringify(this.Products)
            fs.writeFileSync(this.path, productString)

        }else {
            console.log("Not Found")
        }



    }

    updateProduct (id,prop,value) {

        if( id<=this.Products.length && id>0 ) {
            
            const uProd = this.Products.find((prod)=> prod.code==id)
            uProd[prop]= value
            const productString = JSON.stringify(this.Products)
            fs.writeFileSync(this.path, productString)

        }else {
            console.log("Not Found")
        }

    }

}

const test = new ProductManager ("./products.json")
//test.limitProduct(2)
//test.addProduct("intel core i5", "procesador gama media", 35900,"","")
//test.addProduct("intel core i7", "procesador gama alta", 45500,"",10)
//test.deleteProduct(2)
//test.updateProduct(1,"title","ryzen 5")
test.getProducts()

