import winston from "winston";

export const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

export const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});


export const addLogger = (req, res, next) => {
  req.logger = devLogger;
   req.logger.http(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  ); 
  next();
};
