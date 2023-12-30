import mongoose from "mongoose";
import { connectionString } from "../credentials.js";
const { Schema } = mongoose;

mongoose.connect(connectionString, {
  dbName: "IT122",
});

mongoose.connection.on("open", () => {
  console.log("Mongoose connected.");
});

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  engine: String,
  miles: Number,
});

export const Car = mongoose.model("Car", carSchema);
