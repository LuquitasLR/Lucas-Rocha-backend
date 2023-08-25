import express from "express";
export const loggerRouter = express.Router();
import { logger } from "../DAO/factory.js"; 

// loggerRouter.get("/",(req, res) =>{
//     logger.debug("debug!")
//     logger.verbose("verbose!")
//     logger.info("info!")
//     logger.warn("alerta!")
//     logger.error("error!!!")
//     res.send("probando logger!")
// } );


//EL LOGGER FUNCIONA CORRECTAMENTE PERO TENGO UN PROBLEMA CON EL SWICH EN FACTORY, NO LOGRO LEVANTAR EL SEVER CON LA PERSISTENCIA EN MEMORY,
//EN UN MOMENTO FUNCIONABA TODO PERO NO SE QUE TOQUE Y AHORA CRASHEA SOLO CON INICIARLO

import { devLogger } from "../utils/logger.js";

loggerRouter.get("/",(req, res) =>{
    devLogger.debug("debug!")
    devLogger.verbose("verbose!")
    devLogger.info("info!")
    devLogger.warn("alerta!")
    devLogger.error("error!!!")
    res.send("probando logger!")
} );