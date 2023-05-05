import { Schema, model } from "mongoose";

const ordenShema = new Schema({

  plato: [{
    namePlato: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],

  bebida: [{
    nameBebida: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],

  adicion: [{
    nameAdicion: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],

  priceOrden: {
    type: Number,
    required: true
  },

  observaciones: [{
    descriObservacion: {
      type: String,
    }
  }],

}, {
  timestamps: true,
  versionKey: false
})

export default model('orden', ordenShema)