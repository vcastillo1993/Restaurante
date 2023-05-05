import { Schema, model } from 'mongoose'

const categoriaPlatos = new Schema({
  nameCategori: {
    type: String,
    required: true,
    unique: true
  },
  descriptionCategori: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('categoriaPlatos', categoriaPlatos)