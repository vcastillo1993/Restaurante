import { Schema, model } from "mongoose";

const domicilioSchema = new Schema({
  
    plato: [{
      ref: "plato",
      type: Schema.Types.ObjectId,
      cantidad: {
        type: Number
      }
    }],

    bebida: [{
      ref: "bebida",
      type: Schema.Types.ObjectId,
      cantidad: {
        type: Number
      }
    }],
    
    priceOrden: {
      type: Number
    },

    observaciones: [{
      descriObservacion:{
        type: String,
      }
    }],

    user:{
      ref: 'role',
      type: Schema.Types.ObjectId
    }
    
}, {
  timestamps: true,
  versionKey: false
})

export default model('domicilio', domicilioSchema)