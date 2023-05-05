import { Router } from 'express'
import *as ordenController from '../controllers/funtionsControllers/orden.controller.js'

const router = Router()

router.get('/listsAllorden', ordenController.listAllOrden)

router.get('/listOneorden/:ordenId', ordenController.listOneOrden)

router.post('/createOrden', ordenController.createOrden)

router.put('/updateOrden/:ordenId',ordenController.updateOrden)

router.delete('/eliminateOrden/:ordenId', ordenController.eliminateOrden)

export default router
