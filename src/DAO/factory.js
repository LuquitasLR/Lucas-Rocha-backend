import config from '../config/enviroment.config.js';
import mongoose from 'mongoose';
import { devLogger, prodLogger } from '../utils/logger.js';

export let productModel;
export let ticketModel;
export let userModel;
export let cartModel;
export let logger

switch (config.port) {

  case '3030':
    logger = devLogger
    logger.info('persistence in memory');
    mongoose.connect(config.persistence);
    const { productMemory } = import ('./models/memory/product.memory.js');
    productModel = productMemory;
    const { ticketMemory } = import('./models/memory/ticket.memory.js');
    ticketModel = ticketMemory;
    const { userMemory } = import('./models/memory/user.memory.js');
    userModel = userMemory;
    const { cartMemory } = import('./models/memory/cart.memory.js');
    cartModel = cartMemory;

    break;

  default:
    logger= prodLogger
    logger.info('Mongo connect');
    mongoose.connect(config.persistence);

    const { productMongo } = await import('./models/mongo/product.mongo.js');
    productModel = productMongo;
    const { ticketMongo } = await import('./models/mongo/ticket.mongo.js');
    ticketModel = ticketMongo;
    const { userMongo } = await import('./models/mongo/user.mongo.js');
    userModel = userMongo;
    const { cartMongo } = await import('./models/mongo/cart.mongo.js');
    cartModel = cartMongo;

    break;
}

