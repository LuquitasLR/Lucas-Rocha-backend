import { MsgModel } from '../DAO/mongoose/msg.mongoose.js'
import { productService } from "../services/productService.js";
import { Server } from 'socket.io';

export function socketServerConection (httpServer){

  const socketServer = new Server(httpServer);

  socketServer.on ("connection", (socket) => {

    console.log (socket.id, "socket conectado")
    
    socket.on("deleteProduct",async(_id) => {
       await productService.deleteProduct(_id)
       emitProductsList()
    })

    socket.emit("conectado", {msj:"conexion establecida"})
    
    socket.on ("new-product", async (newProduct) => {
      
      try {
        
        console.log (newProduct+"desde el back")
        //const{title,description,code,price,status,thumbnail,stock,category}=newProduct
        //const body={title,description,code,price,status,thumbnail,stock,category}
        productService.addProduct(newProduct)
        const pl= await productService.getAll()
        socketServer.emit("products",pl)
        emitProductsList()
      }  
      
      catch (e) {
        console.log(e)
      }
        
    })
      
      
      
    socket.on('msg_front_to_back', async (msg) => {

      const msgCreated= await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
        
    })

    const emitProductsList= async()=>{
      try{
        const prod= await productService.getAll()
        socket.emit("updatedProducts",prod)
      }
      catch{console.log("error")}
      
    }

    emitProductsList()
  })
    
  }
  
  