import {Router} from 'express'
import * as saleCtrl from '../controllers/sale.controller.js'
// import {authJwt} from '../middlewares/index.js'
const router = Router()

// registrar una nueva venta
router.post('/newSale',  [
    //authJwt.verifyToken, 
    //authJwt.isAdmin
], saleCtrl.loadSale)

// ver todas las ventas cargadas
router.get('/getAllSales', /*authJwt.verifyToken,*/  saleCtrl.getAllSales)

// ver todas las ventas cargadas ABTA
router.get('/getAllSalesAB', /*authJwt.verifyToken,*/  saleCtrl.getAllSalesAB)

// ver todas las ventas cargadas ABTA Pendiente
router.get('/getAllSalesABpending', /*authJwt.verifyToken,*/  saleCtrl.getAllSalesABpending)

// ver todas las ventas cargadas ABTA Pendiente
router.get('/getAllSalesABapproved', /*authJwt.verifyToken,*/  saleCtrl.getAllSalesABapproved)

// ver todas las ventas cargadas ABTA Pendiente
router.get('/getSalesABHistory', /*authJwt.verifyToken,*/  saleCtrl.getSalesABHistory)

// ver todas las ventas cargadas ABTA
router.get('/getAllSalesElite', /*authJwt.verifyToken,*/  saleCtrl.getAllSalesElite)

// ver todas las ventas cargadas ABTA Pendiente
router.get('/getAllSalesElitePending', /*authJwt.verifyToken,*/  saleCtrl.getAllSalesElitePending)

// ver todas las ventas cargadas ABTA Pendiente
router.get('/getAllSalesEliteApproved', /*authJwt.verifyToken,*/  saleCtrl.getAllSalesEliteApproved)

// ver todas las ventas cargadas ABTA Pendiente
router.get('/getSalesEliteHistory', /*authJwt.verifyToken,*/  saleCtrl.getSalesEliteHistory)

// ver todas las ventas cargadas filtradas por Id de usuario
router.get('/getSalesByUserId/:userID', /*authJwt.verifyToken,*/  saleCtrl.getSalesByUserId)

// ver ventas cargadas filtradas por pendientes
router.get('/getSalesFilteredPending', /*authJwt.verifyToken,*/  saleCtrl.getSalesFilteredPending)

// ver ventas cargadas filtradas por aprobadas
router.get('/getSalesFilteredApproved/', saleCtrl.getSalesFilteredApproved)

// cambiar estado de reserva a aprobada
router.post('/approveSale/:saleId', saleCtrl.approveSale)

// cambiar estado de reserva a desaprobada
router.post('/denySale/:id', saleCtrl.denySale)

// cambiar estado de reserva a pendiente de corrección
router.post('/requestCorrection/:id', saleCtrl.requestCorrection)

// agregar texto de correccion
router.post('/addCorrectionText/:id', saleCtrl.addCorrectionText)

// editar habitacion
router.post('/editHabitacion/:id', saleCtrl.editHabitacion)

// eliminar un registro
router.delete('/deleteSale/:saleId', [
    /*
    authJwt.verifyToken,
    authJwt.isAdmin
    */
], saleCtrl.deleteSaleById)

export default router;