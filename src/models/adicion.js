import { Schema, model } from 'mongoose'

const adicionShema = new Schema({
  nameAdicion: {
    type: String,
    unique: true
  },
  imagenAdicion: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('adicion', adicionShema)