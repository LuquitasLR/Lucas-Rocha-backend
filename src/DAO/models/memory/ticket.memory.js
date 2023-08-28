import fs from 'fs'

class TicketModel {

    constructor(path) {
        this.path = path
        this.tickets = []
        const ticketString= fs.readFileSync(this.path, "utf-8")
        const tickets = JSON.parse(ticketString)
        this.tickets = tickets

    }

    create (ticket) {
        let idMax= 0
        this.tickets.forEach((prod) => {
            if (prod._id >idMax) 
            idMax = prod._id
        })

        idMax++
            
        const newTicket = {

            _id: idMax,
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
            products:ticket.products

        }

        this.tickets.push(newTicket)
        const ticketString = JSON.stringify(this.tickets)
        fs.writeFileSync(this.path, ticketString)
        return ("ticket creado exitosamente")
        

    }

    getTicket (id) {
        
        return this.tickets.find((c) => c._id ==id)
        
    }

}

export const ticketMemory = new TicketModel('./src/tickets.json')