import {Router} from 'express'
import * as authCtrl from '../controllers/auth.controller.js'
//import * as refreshTokenController from '../controllers/refreshToken.controller.js'

const router = Router()

// login de usuario
router.post('/login', authCtrl.handleLogin)

router.post('/forgotPassword', authCtrl.forgotPassword)

router.get('/resetPassword/:id/:token', authCtrl.resetPassword)



export default router