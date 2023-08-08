import { ticketMongoose} from '../../mongoose/ticket.mongoose.js'

class TicketModel {

    async create(ticket){
        return await ticketMongoose.create(ticket)
    }

    async getTicket (_id){
        return await ticketMongoose.findOne({_id: _id})
    }

}

export const ticketModel = new TicketModel()