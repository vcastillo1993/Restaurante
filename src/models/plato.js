  import { Schema, model } from 'mongoose'

const platoSchema = new Schema({
  namePlato: {
    type: String,
    unique: true,
    required: true
  },
  pricePlato: {
    type: Number,
    required: true
  },
  descriptionPlato: {
    type: String,
    unique: true, 
    required: true
  },
  categoria:{
    ref: "categoria",
    type: Schema.Types.ObjectId,
    required: true,
    
  },
  imagenPlato: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('plato', platoSchema)