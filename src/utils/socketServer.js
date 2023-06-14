import { MsgModel } from '../DAO/models/msgs.model.js'
import { products } from '../routes/products.router.js';
import { Server } from 'socket.io';

export function socketServerConection (httpServer){

    const socketServer = new Server(httpServer);

    socketServer.on ("connection", (socket) => {
      console.log (socket.id, "socket conectado")
      socket.emit("conectado", {msj:"conexion establecida"})
    
      socket.on ("new-product", async (newProduct) => {
    
      try {
        
        console.log (newProduct+"desde el back")
        products.addProduct(newProduct.title, newProduct.description, newProduct.code,
        newProduct.price, newProduct.thumbnail, newProduct.stock, newProduct.category)
        const productsList= await products.getProducts()
        socketServer.emit("products",productsList)
      }
      
      catch (e) {
        console.log(e)
      }
     })
    
     socket.on("test",(msj) => {console.log (JSON.stringify(msj))})
    
     socket.on('msg_front_to_back', async (msg) => {
      const msgCreated= await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    
    }) })

}

