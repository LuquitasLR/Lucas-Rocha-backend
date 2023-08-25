//import { ticketModel } from "../DAO/models/mongo/ticket.mongo.js";
//import { ticketModel } from "../DAO/models/memory/ticket.memory.js";
import { ticketModel } from '../DAO/factory.js';
import { productService } from "./productService.js";
import { generateID } from "../utils/utils.js";
import { userService } from "./userService.js";

class TicketService {
    async newTicket(cart) {
        const checkedCart = [];
        const noStock = [];
        let totalAmount = 0 
        
        const purchaser = await userService.findByCart(cart._id);
        const productDB = await productService.getAll();
        
        for (const productInfo of cart.products) {
            const productFromDB = productDB.find(p => p._id.toString() == productInfo.product._id);
            if (productFromDB && productFromDB.stock >= productInfo.quantity) {
                checkedCart.push({ 
                    product: productInfo.product._id.toString(),
                    quantity: productInfo.quantity
                });

                totalAmount += productInfo.quantity * productFromDB.price; // Actualizar el totalAmount

            } else {
                noStock.push(productInfo.product._id.toString());
            }
        }

        await productService.reduceStock(checkedCart)

        const ticket = {
            code: generateID(),
            purchase_datetime: Date.now().toString(),
            amount: totalAmount,
            purchaser: purchaser.mail,
            products: checkedCart
        }
        const newTicket = await ticketModel.create(ticket);

        let result = `El siguiente ticket fue creado exitosamente: ${newTicket}.`;
        if(noStock.length>0){result=`El siguiente ticket fue creado exitosamente: ${newTicket}. Los siguientes productos no contaban con stock suficiente: ${noStock}.`}
        return result;
    }
}

export const ticketService = new TicketService()