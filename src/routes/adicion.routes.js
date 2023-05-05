import { Router } from "express"
import * as adicionController from '../controllers/funtionsControllers/adicion.controller.js'

const router = Router()

router.get('/listAdicion', adicionController.listAdicion)

router.post('/listAdicionName', adicionController.listAdionName)

router.post('/CreateAdicion', adicionController.postAdicion)

router.put('/updateAdioin/:adicionId', adicionController.updateAdion)

router.delete('/eleminateAdion/:adicionId', adicionController.eliminateAdicion)

export default router 