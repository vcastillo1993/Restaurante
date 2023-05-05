import { Schema, model } from 'mongoose'

const bebidaSchema = new Schema({
  nameBebida: {
    type: String,
    unique: true,
    required:true
  },
  descriptionBebida: {
    type: String,
    unique: true,
    required: true
  },
  priceBebida: {
    type: Number,
    required:true
  },
  imagenBebida: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('bebida', bebidaSchema)