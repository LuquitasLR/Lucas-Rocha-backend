import chai from "chai";
import mongoose from "mongoose";
import {productMongoose} from "../src/DAO/mongoose/product.mongoose.js";

await mongoose.connect(
  "mongodb+srv://rocha15lr:jNYwDq1sMln4lbGx@cluster0.obbcq2b.mongodb.net/?retryWrites=true&w=majority"
);

const expect = chai.expect;

describe("Test con chai para products", () => {

  it("Consultar todos los productos de mi BDD con Chai", async function () {
    const products = await productMongoose.find();

    expect(Array.isArray(products)).to.be.ok;
    expect(products).to.be.an("array");
  });

  it("Crear un nuevo producto", async function (){

    const newProduct = {
      title:"producto de prueba",
      description:"procesador test",
      code:"iu13dl35",
      price:35900,
      status:"true",
      thumbnail:"none",
      stock:10,
      category:"procesadores"
    };
    const productoCreado = await productMongoose.create(newProduct);
    expect(productoCreado).to.have.property("_id")

  })
  it("eliminar el producto creado anteriormente", async function (){

    const code = "iu13dl35";

    const product = await productMongoose.findOneAndDelete({ code: code });
    console.log(product);
    expect(product).to.be.an("Object")

  })
});
