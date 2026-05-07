import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import './database/knex'

import authRoutes from './routes/routes'

const app = new Koa()

app.use(bodyParser())

app.use(authRoutes.routes())
app.use(authRoutes.allowedMethods())

export default app