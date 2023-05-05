import mongoose from "mongoose";
import categoriaplatos from "../../models/categoriaPlato.js"
import plato from "../../models/plato.js"

export const listsCategoriasPlatos = async (req, res) => {
  try {
    const listcategorias = await categoriaplatos.find()
    if (listcategorias) {
      console.log(listcategorias);
      res.status(200).json(listcategorias)
    } else {
      res.status(400).json('SIN CATEGORIA EXISTENTES')
    }
  } catch (error) {
    console.log('HA OCURRIDO UN ERROR !!!')
    res.status(400).json('SIN CATEGORIA EXISTENTES')
  }
}

export const listCategoriaPlato = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.categoriId)) {
      console.log('CATEGORIA NO EXISTENTE');
      res.status(400).json('CATEGORIA NO EXISTENTE ')
    } else {
      const categoriConsulta = await categoriaplatos.findById(req.params.categoriId)
      console.log('Categoria :', categoriConsulta)
      res.status(200).json(categoriConsulta)
    }
  } catch (error) {
    console.log(error);
    res.status(error)
  }
}

export const createCategoriaPlato = async (req, res) => {
  try {
    const { nameCategori, descriptionCategori } = req.body
    if (nameCategori != '' && nameCategori != null && descriptionCategori != '' && descriptionCategori != null) {
      const newCategoria = new categoriaplatos({
        nameCategori,
        descriptionCategori
      })
      const categori = await newCategoria.save()
      res.status(200).json(categori)
    } else {
      res.status(400).json('no se admiten campos nulos o vacios')
    }
  } catch (error) {
    console.log('ERROR :', error)
    res.status(400).json(error)
  }
}

export const updateCategoriaPlato = async (req, res) => {
  try {
    const { nameCategori, descriptionCategori } = req.body
    const modification = {
      nameCategori,
      descriptionCategori
    }
    if (nameCategori != "" && nameCategori != null && descriptionCategori != "" && descriptionCategori != null) {
      const modifiCategori = await categoriaplatos.findByIdAndUpdate(req.params.categoriId, modification, {
        new: true
      })
      console.log('CATEGORIA MODIFICADA : ', modifiCategori);
      res.status(200).json(modifiCategori)
    } else {
      res.status(400).json('NO SE ADMITEN VALORES NULOS O VACIOS')
    }
  } catch (error) {
    res.status(400).json('MAL PROCEDIMIENTO DE MODIFICACION')
  }
}

export const eliminateCategoriaPlato = async (req, res) => {
  try {
    const categoriConsulta = await categoriaplatos.findById(req.params.categoriId)
    //consultando si la categoria exista
    if (categoriConsulta) {
      const fountPlato = await plato.find({ categoria: { $in: req.params.categoriId } })
      //consultando si la categoria esta relacionada con algun plato
      if (fountPlato.length === 0) {
        const deletecategori = await categoriaplatos.findOneAndDelete(req.params.categoriId)
        console.log(deletecategori)
        res.status(200).json('Categoria Eliminada')
      } else {//Si no tiene ninguna relacion la categoria con Schema plato
        console.log('No es posible eliminar la categoria')
        res.status(400).json('La categoria esta relacionada con un plato')
      }
    } else {
      console.log('Esta categoria no existe');
      res.status(400).json('Categoria no existente')
    }
  } catch (error) {
    console.log('CATEGORIA NO EXISTENTE : ', error)
    res.status(400).json('eliminacion fallida')
  }
}