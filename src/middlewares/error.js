import EErros from "../utils/enums.js";
import { logger } from "../DAO/factory.js";

export default (error, req, res, next) => {
  logger.error(error.cause);

  switch (error.code) {
    case EErros.INVALID_TYPES_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    default:
      res.status(400).send({ status: "error", error: "Unhandled error" });
      break;
  }
};