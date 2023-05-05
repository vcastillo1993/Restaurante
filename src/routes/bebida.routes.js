import { Router } from "express"
import * as bebidaController from '../controllers/funtionsControllers/bebida.controller'

const router = Router()

router.get('/listsBebidas', bebidaController.listsBebidas)

router.get('/listBebidaId/:bebidaId', bebidaController.listBebidaId)

router.post('/createBebida', bebidaController.createBebida)

router.put('/updateBebida/:bebidaId', bebidaController.modifiBebida)

router.delete('/bebidaEliminate/:bebidaId', bebidaController.eliminateBebida)

export default router