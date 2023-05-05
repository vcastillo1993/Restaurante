import mongoose from 'mongoose'
import adicion from "../../models/adicion.js"

export const listAdicion = async (req, res) => {
  try {
    const listaAdicion = await adicion.find()
    if (listaAdicion.length === 0) {
      res.status(400).json('No existen elementos, lista vacia')
      console.log('CANTIDAD DE ADICIONALES : ', listaAdicion.length)
    } else {
      res.status(200).json(listaAdicion)
      console.log('array de listado', listaAdicion)
      console.log('CANTIDAD DE ADICIONALES : ', listaAdicion.length)
    }
  } catch (error) {
    console.log(error)
  }
}

export const listAdionName = async (req, res) => {
  try {
    //consudltar por nombre
    const { nameAdicion } = req.body
    const adicionSearch = await adicion.find({ nameAdicion: { $in: nameAdicion } })
    if (adicionSearch.length === 0) {
      res.status(400).json('La adicion que buscas no existe')
    } else {
      res.status(200).json(adicionSearch)
      console.log(adicionSearch)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export const postAdicion = async (req, res) => {
  try {
    const { nameAdicion, imagenAdicion, price } = req.body
    if (nameAdicion != null && nameAdicion != "" && imagenAdicion != null && imagenAdicion != "" && price != null && price != "") {
      const newAdicion = new adicion({
        nameAdicion,
        imagenAdicion,
        price
      })
      const Adicion = await newAdicion.save()
      res.status(200).json(Adicion)
      console.log('NUEVA ADICION CREADA : ', Adicion);
    } else {
      res.status(400).json('Error de creacion de Adicion, puede que algun campo este vacio o ya exista')
      console.log('Error de creacion de Adicion, puede que algun campo este vacio o ya exista');
    }
  } catch (error) {
    console.log(error)
    res.status(400).json('error de creacion')
  }
}

export const updateAdion = async (req, res) => {
  try {
    const updateAdicion = await adicion.findByIdAndUpdate(req.params.adicionId, req.body,{
      new: true
    })
    console.log('ADICION MODIFICADA : ', updateAdicion)
    res.status(200).json(updateAdicion)
  } catch (error) {
    console.log('ERROR DE MODIFIACACION');
    res.status(400).json('ERROR DE MODIFIACACION', error)
  }
}

export const eliminateAdicion = async (req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.adicionId)){
      res.status(400).json('ADICION NO EXISTENTE')
      console.log('ADICION NO EXISTENTE');
    }else{
      await adicion.findByIdAndDelete(req.params.adicionId)
      res.status(200).json('ADICION ELIMINADA')
    }
  } catch (error) {
    console.log('Error de eliminacion : ', error)
    res.status(400).json('Pueda que esta Adicion no exista')
  }
}