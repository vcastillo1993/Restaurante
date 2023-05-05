import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import { createRoles } from './libs/initialsSetup'
import adicionRouter from './routes/adicion.routes'
import categoriaRoute from './routes/categoria.routes'
import platoRoute from './routes/plato.routes.js'
import userRouter from './routes/user.routes.js'
import bebidaRouter from './routes/bebida.routes.js'
import ordenRouter from './routes/orden.routes.js'

const app = express()

app.set('pkg', pkg)
app.use(express.json())
app.use(morgan('dev'))
createRoles()
app.get('/', (req, res)=>{
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/user',userRouter)
app.use('/adicion', adicionRouter)
app.use('/plato', platoRoute)
app.use('/bebidas', bebidaRouter)
app.use('/categoria', categoriaRoute)
app.use('/ordenes', ordenRouter)

export default app