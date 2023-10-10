import chai from "chai";
import mongoose from "mongoose";
import {userMongoose} from "../src/DAO/mongoose/user.mongoose.js";

await mongoose.connect(
  "mongodb+srv://rocha15lr:jNYwDq1sMln4lbGx@cluster0.obbcq2b.mongodb.net/?retryWrites=true&w=majority"
);

const expect = chai.expect;

describe("Test con chai para users", () => {

  it("Consultar todos los usuarios de mi BDD con Chai", async function () {
    const users = await userMongoose.find();

    expect(Array.isArray(users)).to.be.ok;
    expect(users).to.be.an("array");
  });

  it("Crear un nuevo usuario", async function (){

    const newUser = {
      firstName: "Pepe",
      lastName: "Perez",
      mail: "pepe@perez.com",
      age:18,
      password: "@1At3@",
    };
    const usuarioCreado = await userMongoose.create(newUser);
    expect(usuarioCreado).to.have.property("_id")

  })
  it("eliminar el usuario creado anteriormente", async function (){

    const mail = "pepe@perez.com";

    const user = await userMongoose.findOneAndDelete({ mail: mail });
    console.log(user);
    expect(user).to.be.an("Object")

  })
});
