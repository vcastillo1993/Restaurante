import { Router } from "express"
import * as categoriPlatoController from '../controllers/funtionsControllers/categoria.controller'

const router = Router()

router.get('/listCategori/listsCategoris', categoriPlatoController.listsCategoriasPlatos)

router.get('/listCategori/:categoriId', categoriPlatoController.listCategoriaPlato)

router.post('/createCategori', categoriPlatoController.createCategoriaPlato)

router.put('/updateCategori/:categoriId', categoriPlatoController.updateCategoriaPlato)

router.delete('/eliminateCategori/:categoriId', categoriPlatoController.eliminateCategoriaPlato)

export default router