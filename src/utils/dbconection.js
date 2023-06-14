import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      "mongodb+srv://rocha15lr:jNYwDq1sMln4lbGx@cluster0.obbcq2b.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}