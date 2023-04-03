import {Router} from 'express'
import * as registerController from '../controllers/register.controller.js'

const router = Router()

// registro de usuario
router.post('/newUser', registerController.handleNewUser);

export default router
