import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import cors from "@koa/cors";

import './database/knex'

import authRoutes from './routes/routes'

const app = new Koa()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(bodyParser())

app.use(authRoutes.routes())
app.use(authRoutes.allowedMethods())

export default app