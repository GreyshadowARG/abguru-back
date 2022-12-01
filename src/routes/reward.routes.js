import {Router} from 'express'
import * as rewardCtrl from '../controllers/reward.controller.js'
// import {authJwt} from '../middlewares/index.js'
const router = Router()

// registrar una nueva venta
router.post('/loadEliteReward',  [
    //authJwt.verifyToken, 
    //authJwt.isAdmin
], rewardCtrl.loadEliteReward)

router.post('/loadAB_Reward',  [
    //authJwt.verifyToken, 
    //authJwt.isAdmin
], rewardCtrl.loadAB_Reward)

// ver todas las ventas cargadas
router.get('/getAllRewards', /*authJwt.verifyToken,*/  rewardCtrl.getAllRewards)

// ver todas las ventas cargadas
router.get('/getAllRewardsAB', /*authJwt.verifyToken,*/  rewardCtrl.getAllRewardsAB)

// ver reservas ABTA pendientes
router.get('/getRewardsABpending', /*authJwt.verifyToken,*/  rewardCtrl.getRewardsABpending)

// ver reservas ABTA pendientes
router.get('/getRewardsABHistory', /*authJwt.verifyToken,*/  rewardCtrl.getRewardsABHistory)

// ver reservas ABTA pendientes
router.get('/getRewardsElitePending', /*authJwt.verifyToken,*/  rewardCtrl.getRewardsElitePending)

// ver reservas ABTA pendientes
router.get('/getRewardsEliteHistory', /*authJwt.verifyToken,*/  rewardCtrl.getRewardsEliteHistory)

// ver ventas cargadas filtradas por pendientes
router.get('/getRewardsByUserId/:userID', /*authJwt.verifyToken,*/  rewardCtrl.getRewardsByUserId)

// ver ventas cargadas filtradas por pendientes
router.get('/getRewardsFilteredPending', /*authJwt.verifyToken,*/  rewardCtrl.getRewardsFilteredPending)


// cambiar estado de reward a aprobada
router.post('/approveReward/:id', rewardCtrl.approveReward)

// cambiar estado de reward a aprobada
router.post('/addAB_Prize/:id', rewardCtrl.addAB_Prize)

// cambiar estado de reward a desaprobada
router.post('/denyReward/:id', rewardCtrl.denyReward)

// cambiar estado de reward a desaprobada
router.post('/addDenyText/:id', rewardCtrl.denyReward)



export default router;