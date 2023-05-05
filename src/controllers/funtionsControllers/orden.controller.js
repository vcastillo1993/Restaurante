import mongoose from "mongoose"
import plato from "../../models/plato.js"
import orden from "../../models/orden.js"
import bebida from "../../models/bebida.js"
import adicion from "../../models/adicion.js"


export const listAllOrden = async (req, res) => {
  try {
    const ordenes = await orden.find()
    if (ordenes.length === 0) {
      console.log('No existen ordenes encoladas');
      res.status(400).json('No existen ordenes encoladas')
    } else {
      console.log('Bebidas disponibles : ', ordenes)
      res.status(200).json(ordenes)
    }
  } catch (error) {
    console.log('Nuevo Error : ', error)
    res.status(400).json(error)
  }
}

export const listOneOrden = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('La orden que buscas no existe')
      res.status(400).json('La orden que buscas no existe')
    } else {
      const ordenOne = await orden.findById(req.params.ordenId)
      console.log('Orden encontrada : ', ordenOne)
      res.status(200).json(ordenOne)
    }
  } catch (error) {
    console.log('Nuevo Error : ', error)
    res.status(400).json(error)
  }
}

export const createOrden = async (req, res) => {

  try {

    const { Plato, Bebida, Adicion, Observaciones } = req.body
    const newOrden = new orden({
      plato: Plato,
      bebida: Bebida,
      adicion: Adicion,
      observaciones: Observaciones
    })

    var i = 0
    var j = 0
    var k = 0
    var valOrden = 0

    while (i != Plato.length) {

      var consultaPlato = await plato.find({ namePlato: { $in: Plato[i].namePlato } })

      if (consultaPlato.length != 0) {

        console.log('=== PLATO === :', consultaPlato[0].namePlato)

        valOrden = valOrden + consultaPlato[0].pricePlato * Plato[i].cantidad

      } else {

        res.status(400).json(`=== EL PLATO : ${Plato[i].namePlato} NO EXISTE ===`)
        console.log("=== EL PLATO : ", Plato[i].namePlato, " NO EXISTE ===")
        break
      }

      i = i + 1

    }

    while (j != Bebida.length) {

      var consultaBebida = await bebida.find({ nameBebida: { $in: Bebida[j].nameBebida } })

      if (consultaBebida.length != 0) {

        console.log('=== BEBIDA === :', consultaBebida[0].nameBebida)

        valOrden = valOrden + consultaBebida[0].priceBebida * Bebida[j].cantidad

      } else {
        res.status(400).json(`===LA BEBIDA : ${Bebida[j].nameBebida} NO EXISTE ===`)
        console.log("=== LA BEBIDA: ", Bebida[j].nameBebida, " NO EXISTE ===")
        break
      }
      j = j + 1
    }

    while (k != Adicion.length) {

      var consultaAdicion = await adicion.find({nameAdicion: {$in: Adicion[k].nameAdicion}})

      if(consultaAdicion.length != 0){

        console.log("=== ADICION ===:", consultaAdicion[0].nameAdicion)

        valOrden = valOrden + consultaAdicion[0].price * Adicion[k].cantidad
      }else{
        res.status(400).json(`=== LA ADICION : ${Adicion[k].nameAdicion} NO EXISTE ===`)
        console.log('=== LA ADICION: ',Adicion[k].nameAdicion, 'NO EXISTE ===');
      }
      k = k+1
    }

    newOrden.priceOrden = valOrden
    const Ordens = await newOrden.save()

    // console.log('LA ORDEN FUE CREADA ===> ', Ordens);

    res.status(200).json(Ordens)

  } catch (error) {
    console.log('Ha ocurrido un Error !!!', error)
    res.status(400).json('ERROR CACTURADO :', error)
  }
}

export const updateOrden = async (req, res) => {
  try {

  } catch (error) {

  }
}

export const eliminateOrden = async (req, res) => {
  try {

  } catch (error) {

  }
}








