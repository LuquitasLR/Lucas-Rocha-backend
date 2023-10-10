import express from "express";
export const vistaPurchase = express.Router();
import { ticketController } from "../DAO/controller/ticket.controller.js";


vistaPurchase.post("/", ticketController.newTicketToRender)