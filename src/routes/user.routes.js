import {Router} from 'express'
const router = Router()
import usersController from '../controllers/user.controller.js';

// ver usuario actual (usuario logeado)
router.get('/currentUser', usersController.currentUser)

// ver usuario actual (usuario logeado)
router.get('/getUser/:id', usersController.getUser)

// ver usuarios creados
router.get('/getUsers', usersController.getAllUsers)

// sumar puntos (reserva aprobada)
router.post('/addPoints/:id', usersController.addPoints)

// sumar noches Elite (reserva aprobada)
router.post('/addEliteNights/:id', usersController.addEliteNights)

// restar noches Elite (reserva aprobada)
router.post('/substractEliteNights/:id', usersController.substractEliteNights)

// sumar puntos (reserva aprobada)
router.post('/substractPoints/:id', usersController.substractPoints)

// sumar premios ABTA (reserva aprobada)
router.post('/addAB_Prize/:id', usersController.addAB_Prize)

// sumar premios ABTA (reserva aprobada)
router.post('/removeAB_Prize/:id', usersController.removeAB_Prize)

export default router;
