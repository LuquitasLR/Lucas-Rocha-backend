import { cartService } from "../../services/cartService.js";
import {ticketService} from "../../services/ticketService.js"

class TicketController {

    newTicket = async (req, res) => {
        try{
          const _id = req.params.cid;
          const cart = await cartService.getCart(_id)
          const newTicket= await ticketService.newTicket(cart)
          return res
          .status(200)
          .json({
          status: "success",
          data: newTicket
        })}
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });
        }
        
      }


}

export const ticketController = new TicketController()