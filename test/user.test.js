import mongoose from "mongoose";
import {userMongoose} from "../src/DAO/mongoose/user.mongoose.js";
import Assert from "assert";

const assert = Assert.strict;

await mongoose.connect(
  "mongodb+srv://rocha15lr:jNYwDq1sMln4lbGx@cluster0.obbcq2b.mongodb.net/?retryWrites=true&w=majority"
);

//GRUPO DE TESTS. DESCRIPCION GENERAL.
describe("Test del modelo de USUARIO", () => {
  before(function () {
    console.log("arrancando con todos los tests");
    mongoose.connection.collections.users.drop();
  });

  it("Test para obtener todos los usuarios de mi BDD", async function () {
    const users = await userMongoose.find();

    assert.strictEqual(Array.isArray(users), true);
  });

  it("Test para crear un usuario en mi BDD", async function () {
    const newUser = {
      firstName: "Pepe",
      lastName: "Perez",
      mail: "pepe@perez.com",
      age:18,
      password: "@1At3@",
    };
    const usuarioCreado = await userMongoose.create(newUser);

    assert.ok(usuarioCreado._id); //usuarioCreado._id -> id || error o undefined o null
  });

  it("Eliminar usuario generado", async function () {
    const email = "pepe2@perez.com";

    const user = await userMongoose.findOneAndDelete({ email: email });
    console.log(user);
    assert.strictEqual(typeof user, "object");
  });
});
