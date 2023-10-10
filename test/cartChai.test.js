import chai from "chai";
import mongoose from "mongoose";
import {cartMongoose} from "../src/DAO/mongoose/cart.mongoose.js";

await mongoose.connect(
  "mongodb+srv://rocha15lr:jNYwDq1sMln4lbGx@cluster0.obbcq2b.mongodb.net/?retryWrites=true&w=majority"
);

const expect = chai.expect;

describe("Test con chai para products", () => {

  it("Consultar todos los carritos de mi BDD con Chai", async function () {
    const products = await cartMongoose.find();

    expect(Array.isArray(products)).to.be.ok;
    expect(products).to.be.an("array");
  });
})