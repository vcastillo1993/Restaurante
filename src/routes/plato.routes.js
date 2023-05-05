import { Router } from "express";
import * as platoController from '../controllers/funtionsControllers/plato.controller'
 
const router = Router()

router.get('/platos/listPlato', platoController.listsPlatos)

router.post('/platos', platoController.listPlato)

router.post('/platos/createPlato', platoController.createPlatos)

router.put('/platos/:platoID', platoController.modificarPlato)

router.delete('/platos/:platoID', platoController.eliminarPlato)

export default router;