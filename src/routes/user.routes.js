import { Router } from "express";
import * as userController from '../controllers/funtionsControllers/user.controller'

const router = Router()

router.get('/listsUsers',userController.listAllUser)

router.get('/listUsers/:userId',userController.listUserId)

router.post('/createUser', userController.createUser)

router.put('/updatRoleUser/:userId', userController.updateRolUser)

router.put('/updateStatuUser/:userId', userController.updateStatuUser)

router.put('/updateStatuUser/:userId', userController.updateStatuUser)

router.delete('/deleteUser', userController.deleteUser)


export default router