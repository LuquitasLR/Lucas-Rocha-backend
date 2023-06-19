export default class cartService {

    constructor () {
        

    }


    newCart (){

       
        
    }

    getCart (id) {

        const serchCart = this.carts.find((c) => c.idCart ==id)
        return serchCart.products

    }
    
    addProduct (idCart,idProduct) {

        const indexCart= this.carts.findIndex((c)=> c.idCart == idCart)
        
        //VERIFICAMOS SI EL PRODUCTO EXISTE
        const exists = this.carts[indexCart].products.some((p)=> p.idProduct==idProduct)
        
        //SI EXISTE AUMENTAMOS LA CANTIDAD
        if(exists) {

           const indexProduct = this.carts[indexCart].products.findIndex((p)=>p.idProduct==idProduct)
           this.carts[indexCart].products[indexProduct].quantity++
           const cartString = JSON.stringify(this.carts)
           fs.writeFileSync(this.path, cartString)
           return (`Se aumento exitosamente la cantidad del producto seleccionado(total:${this.carts[indexCart].products[indexProduct].quantity})`)
        
        }
        
        //SI NO EXISTE CREAMOS EL OBJETO Y LO AGREGAMOS
        else {

            const newProduct = { idProduct:idProduct, quantity: 1}
            this.carts[indexCart].products.push(newProduct)
            const cartString = JSON.stringify(this.carts)
            fs.writeFileSync(this.path, cartString)
            return ("Producto agregado exitosamente al carrito")

        }


    }
}