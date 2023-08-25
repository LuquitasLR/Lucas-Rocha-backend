import express from "express";
export const loggerRouter = express.Router();
import { logger } from "../utils/logger.development.js";

loggerRouter.get("/",(req, res) =>{
    logger.debug("debug!")
    logger.verbose("verbose!")
    logger.info("info!")
    logger.warn("alerta!")
    logger.error("error!!!")
} );