import categoriaPlato from '../../models/categoriaPlato.js'
import plato from '../../models/plato.js'

export const listsPlatos = async (req, res) => {
  try {
    const listsplatos = await plato.find()
    if (listsplatos) {
      console.log(listsplatos);
      res.status(200).json(listsplatos)
    } else {
      console.log('No se han creado platos');
      res.status(400).json('Sin elementos que mostrar')
    }
  } catch (error) {
    console.log('ALGO SALIO MAL CON LA CONSULTA : ', error)
    res.status(400).json(error)
  }
}

/* CONSULTAR PLATO POR NOMBRE */
export const listPlato = async (req, res) => {
  try {
    const { namePlato } = req.body
    const Plato = await plato.find({namePlato: {$in: namePlato}}) 
    if(Plato[0] != null){
      console.log('PLATO ENCONTRADO', Plato[0]);
      res.status(200).json(Plato[0])
    }else{
      console.log('LO SENTIMOS ¡¡¡ ESTE PLATO NO SE ENCUENTRA DENTRO DEL MENU !!!');
      res.status(400).json('ESTE PLATO NO SE ENCUENTRA DENTRO DEL MENU')
    }
  } catch (error) {
    console.log('ERROR : ', error)
    res.status(400).json(error)
  }
}

export const createPlatos = async (req, res) => {
  try {
    const {
      namePlato,
      pricePlato,
      descriptionPlato,
      categoria,
      imagenPlato
    } = req.body

    if (namePlato != null && namePlato != "" && pricePlato != null && descriptionPlato != null && descriptionPlato != "" && categoria != null && categoria != "") {
      const newPlato = new plato({
        namePlato: namePlato,
        pricePlato: pricePlato,
        descriptionPlato: descriptionPlato,
        categoria: categoria,
        imagenPlato: imagenPlato
      })
      if (categoria) {
        const categori = await categoriaPlato.find({ nameCategori: { $in: categoria } })
        newPlato.categoria = categori.map(cate => cate._id)
      } else {
        console.log('LA CATEGORIA ASIGNADA AL PLATO NO EXISTE')
        res.status(400).json('CATEGORIA NO EXISTENTE')
      }
      const savePlato = await newPlato.save()
      console.log('Plato guardado : ', savePlato);
      res.status(200).json(savePlato)
    } else {
      console.log('NO SE ADMITEN VALORES NULOS NI CAMPOS VACIOS');
      res.status(400).json('NO SE ADMITEN VALORES NULOS NI CAMPOS VACIOS')
    }
  } catch (error) {
    console.log('ALGO HA SALIDO MAL : ', error);
    res.status(400).json(error)
  }
}

export const modificarPlato = async (req, res) => {
  try {
    const updateModifiPlato = await plato.findByIdAndUpdate(req.params.platoID, req.body,{
      new: true
    })
    console.log('PLATO MODIFICADO : ', updateModifiPlato);
    res.status(200).json(updateModifiPlato)
  } catch (error) {
    console.log('ERROR DE MODIFICACION : ', error)
    res.status(400).json(error)
  }
}

export const eliminarPlato = async (req, res) => {
  try {
    await plato.findByIdAndDelete(req.params.platoID)
    res.status(200).json('plato eliminado')  
  } catch (error) {
    console.log('Error de eliminacion', error);
    res.status(400).json('Puede que este plato no exista')
  }
}