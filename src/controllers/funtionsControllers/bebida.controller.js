import bebida from "../../models/bebida.js"

export const listsBebidas = async (req, res) => {
  try {
    const bebidas = await bebida.find()
    if (bebidas.length === 0) {
      res.status(400).json('No existen elementos, lista vacia')
      console.log('Bebidas disponible', bebidas.length)
    } else {
      res.status(200).json(bebidas)
      console.log('Bebiidas dispobibles ', bebidas)
    }
  } catch (error) {
    console.log('Error de consulta : ', error)
    res.status(400).json(error)
  }
}

export const listBebidaId = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bebidaId)) {
      console.log('Esta bebida no existe ')
      res.status(400).json('Esta bebida no existe')
    } else {
      const Bebida = await bebida.findById(req.params.bebidaId)
      res.status(200).json(Bebida)
      console.log('BEBIDA CONSULTADA == ', Bebida)
    }
  } catch (error) {
    console.log('Error de consulta : ', error)
    res.status(400).json(error)
  }
}

export const createBebida = async (req, res) => {
  try {
    const { nameBebida, descriptionBebida, priceBebida, imagenBebida } = req.body

    const bbName = await bebida.find({ nameBebida: nameBebida })
    const bbDescription = await bebida.find({ descriptionBebida: descriptionBebida })

    if (bbDescription.length === 0 && bbName.length === 0) {
      const newBebida = new bebida({
        nameBebida, descriptionBebida, priceBebida, imagenBebida
      })
      const NEWBEBIDA = await newBebida.save()
      console.log('NUEVA BEBIDA : ', NEWBEBIDA)
      res.status(200).json(NEWBEBIDA)
    } else {
      console.log('El nombre o descriotion de la bebida ya existe');
      res.status(400).json('El nombre o descriotion de la bebida ya existe')
    }

  } catch (error) {
    console.log('ERROR DE CREACION: ', error)
    res.status(400).json('ERROR DE CREACION: ', error)
  }
}

export const modifiBebida = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bebidaId)) {
      res.status(400).json('ESTA BEBIDA NO EXISTE')
    } else {
      const updateBebida = await bebida.findByIdAndUpdate(req.params.bebidaId, req.body, {
        new: true
      })
      console.log(updateBebida)
      res.status(200).json(updateBebida)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
}

export const eliminateBebida = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bebidaId)) {
      res.status(400).json('ESTA BEBIDA NO EXISTE')
    } else {
      const bbModificado = await bebida.findByIdAndDelete(req.params.bebidaId, req.body, {
        new: true
      })
      res.status(200).json(bbModificado)
    }
  } catch (error) {
    console.log('¡¡¡ Ha ocurrido un error !!! ', error)
    res.status(400).json(error)
  }
}