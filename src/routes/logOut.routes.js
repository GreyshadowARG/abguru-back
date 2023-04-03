import {Router} from 'express'
import logOutController from '../controllers/logOut.controller.js'

const router = Router()

// refresh token
router.get('/', logOutController.handleLogOut)

export default router