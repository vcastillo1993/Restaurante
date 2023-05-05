import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userShema = new Schema({
  nameUser: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  status: {
    type: Boolean
  },
  role: {
    ref: "role",
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
})

/* metodo para sifrar la contrasena */
userShema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
/* metodo para comparar la contraseña */
userShema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model('user', userShema)