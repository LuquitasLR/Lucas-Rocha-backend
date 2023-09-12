import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from '../config.js';

export const specs = swaggerJSDoc({
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Documentacion de e-commerce",
        description: "Proyecto sobre un e-commerce enfocado en la venta de hardware y articulos vinculados al gaming.",
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
  });