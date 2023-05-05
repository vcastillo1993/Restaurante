import { Schema, model } from "mongoose";

export const role = ["cliente", "mesero", "admin", "superAdmin"]

const rolSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
},
{
  versionKey: false
})

export default model('role', rolSchema);