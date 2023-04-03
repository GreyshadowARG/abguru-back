import {Router} from 'express'
import * as authCtrl from '../controllers/auth.controller.js'
//import * as refreshTokenController from '../controllers/refreshToken.controller.js'

const router = Router()

// login de usuario
router.post('/login', authCtrl.handleLogin)

router.get('/forgotPassword/:id/:token', authCtrl.forgotPassword)

router.post('/changePassword/:id/:token', authCtrl.changePassword)

router.post('/sendPasswordLink', authCtrl.sendPasswordLink)



export default router