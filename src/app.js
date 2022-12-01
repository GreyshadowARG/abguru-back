import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions  from './config/corsOptions.js'
import verifyJWT from './middlewares/verifyJwt.js'
import cookieParser from 'cookie-parser'
import credentials from './middlewares/credentials.js';

import salesRoutes from './routes/sale.routes.js'
import authRoutes from './routes/auth.routes.js'
import register from './routes/register.routes.js'
import refreshRoutes from './routes/refresh.routes.js'
import logOutRoutes from './routes/logOut.routes.js'
import usersRoutes from './routes/user.routes.js'
import rewardRoutes from './routes/reward.routes.js'

const app = express()

app.use(morgan('dev'));
app.use(express.json())
app.use(cors(corsOptions))
app.use(credentials)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use('/api/register', register) // registro de usuarios
app.use('/api/auth', authRoutes) // autenticacion usuarios
app.use('/api/refresh', refreshRoutes) // refresh token
app.use('/api/logout', logOutRoutes) //logOut / delete refreshtoken

app.use (verifyJWT)
app.use('/api/sales', salesRoutes) // carga de ventas
app.use('/api/users', usersRoutes) // crear usuario con permisos
app.use('/api/reward', rewardRoutes) // crear usuario con permisos

export default app;
