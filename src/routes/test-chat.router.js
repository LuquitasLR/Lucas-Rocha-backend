import express from "express";
import { isUser } from '../middlewares/auth.js';
export const testChatRouter = express.Router();


testChatRouter.get("/", isUser, (req,res) => {

    return res.status(200).render("test-chat",{})



})