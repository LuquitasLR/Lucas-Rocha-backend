import { connect } from "mongoose";
import env from '../config/enviroment.config.js'
import { logger } from "./logger.development.js";
export async function connectMongo() {
  try {
    await connect(env.persistence);
    logger.info("plug to mongo!");
  } catch (e) {
    logger.error(e);
    throw "can not connect to the db";
  }
}