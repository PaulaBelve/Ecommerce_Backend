import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'
import {Server as HttpServer} from 'http'
import {Server as IoServer} from 'socket.io'

import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import { viewsRouter } from './routers/views.router.js'
//import { Socket } from 'dgram'



const app = express()
const httpServer = new HttpServer (app)
const io = new IoServer (httpServer)

console.log(__dirname)

app.engine('hbs', handlebars.engine({
extname: '.hbs',
defaultLayout: 'main.hbs',

}))

app.set ('view engine', 'hbs')
app.set ('views' , `${__dirname}/views`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use('/static', express.static('./public'))
app.use('/static' , express.static('public'))



app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/' , viewsRouter)
//app.use('/', (req, res) => res.send("INICIO"))


const server = httpServer.listen(8080, () => console.log('server running...'))

io.on('connection', (socket) => {

console.log(`New client connected, id: ${socket.id}`)

io.sockets.emit('hello', 'hola')

io.sockets.emit('products', [{id: 1, tittle: 'prod1'}])


})







