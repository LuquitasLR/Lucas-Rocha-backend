import fs from 'fs'
import { generateID } from '../../../utils/utils.js'
import { logger } from '../../factory.js'

 class productManager {

    constructor (path) {
        this.path = path
        this.products = []
        const productString= fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(productString)
        this.products = products

    }

    create (product) {
            
        const newProduct = {

            _id: generateID(),
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status:product.status,
            thumbnail: product.thumbnail,
            stock: product.stock,
            category: product.category

        }
        this.products.push(newProduct)
        const productString = JSON.stringify(this.products)
        fs.writeFileSync(this.path, productString)
        return ("producto agregado exitosamente")
        

    }

    getAll (){
        return this.products
    }

    getProduct (_id) {
        if( _id<=this.products.length && _id>0 ) {
            
            let serch = this.products.find((prod)=> prod._id==_id)
            return serch

        }else {
            return("Producto no encontrado")
        }
        

    }

        deleteProduct (_id) {

        if( _id<=this.products.length && _id>0 ) {
            
            this.products = this.products.filter((p) => p._id != _id)
            const productString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productString)

        }else {
            logger.info("Not Found")
        }



    }

    updateProduct (_id,newParams) {

        if( _id<=this.products.length && _id>0 ) {
            
            const i = this.products.findIndex((prod)=> prod._id==_id)
            this.products[i] = {_id: this.products[i]._id,...newParams}
            const productString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productString)

        }else {
            return("Not Found")
        }

    }

}

export const productModel = new productManager('./src/products.json')