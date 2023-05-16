import fs from 'fs'

export default class ProductManager {

    constructor (path) {
        this.path = path
        this.Products = []
        const productString= fs.readFileSync(this.path, "utf-8")
        const Products = JSON.parse(productString)
        this.Products = Products

    }

    addProduct (title, description, code, price, thumbnail, stock, category) {
        let idMax= 0
        this.Products.forEach((prod) => {
            if (prod.id >idMax) 
            idMax = prod.id
        })

        idMax++
            
        const product = {

            id: idMax,
            title: title,
            decription: description,
            code: code,
            price: parseInt(price) || 0,
            status:true,
            thumbnail: thumbnail,
            stock: parseInt(stock) || 0,
            category: category

        }
        this.Products.push(product)
        const productString = JSON.stringify(this.Products)
        fs.writeFileSync(this.path, productString)
        return ("producto agregado exitosamente")
        

    }

    getProducts (){
        return this.Products
    }

    getProductById (id) {
        if( id<=this.Products.length && id>0 ) {
            
            let serch = this.Products.find((prod)=> prod.id==id)
            return serch

        }else {
            return("Producto no encontrado")
        }
        

    }

        deleteProduct (id) {

        if( id<=this.Products.length && id>0 ) {
            
            this.Products = this.Products.filter((p) => p.id != id)
            const productString = JSON.stringify(this.Products)
            fs.writeFileSync(this.path, productString)

        }else {
            console.log("Not Found")
        }



    }

    updateProduct (id,newParams) {

        if( id<=this.Products.length && id>0 ) {
            
            const i = this.Products.findIndex((prod)=> prod.id==id)
            this.Products[i] = {id: this.Products[i].id,...newParams}
            const productString = JSON.stringify(this.Products)
            fs.writeFileSync(this.path, productString)
            return this.Products[i]

        }else {
            return("Not Found")
        }

    }

}

