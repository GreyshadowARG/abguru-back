import {Router} from 'express'
import refreshTokenController from '../controllers/refreshToken.controller.js'

const router = Router()

// refresh token
router.get('/', refreshTokenController.handleRefreshToken)

export default router