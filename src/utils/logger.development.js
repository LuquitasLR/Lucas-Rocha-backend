import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
   req.logger.http(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  ); 
  next();
};
