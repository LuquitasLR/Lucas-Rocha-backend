import config from '../config/enviroment.config.js';
import mongoose from 'mongoose';
import { devLogger, prodLogger } from '../utils/logger.js';

export let productModel;
export let ticketModel;
export let userModel;
export let cartModel;
export let logger

switch (config.persistence) {

  case 'MEMORY':
    logger = devLogger
    const { default: productMemory } = await import('./models/memory/product.memory.js');
    productModel = productMemory;
    const { default: ticketMemory } = await import('./models/memory/ticket.memory.js');
    ticketModel = ticketMemory;
    const { default: userMemory } = await import('./models/memory/user.memory.js');
    userModel = userMemory;
    const { default: cartMemory } = await import('./models/memory/cart.memory.js');
    cartModel = cartMemory;

    break;

  default:
    logger= prodLogger
    logger.info('Mongo connect');
    mongoose.connect(config.persistence);

    const { default: productMongo } = await import('./models/mongo/product.mongo.js');
    productModel = productMongo;
    const { default: ticketMongo } = await import('./models/mongo/ticket.mongo.js');
    ticketModel = ticketMongo;
    const { default: userMongo } = await import('./models/mongo/user.mongo.js');
    userModel = userMongo;
    const { default: cartMongo } = await import('./models/mongo/cart.mongo.js');
    cartModel = cartMongo;

    break;
}

