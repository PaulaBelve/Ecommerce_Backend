import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'
import {Server as HttpServer} from 'http'
import mongoose from 'mongoose'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import  viewsRouter  from './routers/views.router.js'
//import { productsManager } from '../dao/index.js'
//import { Socket } from 'dgram'
//import bodyParser from 'body-parser'
import {Server as IoServer} from 'socket.io'


const app = express()
const httpServer = new HttpServer (app)
const io = new IoServer (httpServer)



// Configuración handlebars

app.engine('hbs', handlebars.engine({
extname: '.hbs',
defaultLayout: 'main.hbs'}))
app.set ('view engine', 'hbs')
app.set ('views' , `${__dirname}/views`)

// Configuración JSON

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/product' , viewsRouter)


// Correr el servidor

const server = httpServer.listen(8080, () => console.log('server running...'))

/*io.on('connection', async (socket) => {

console.log(`New client connected, id: ${socket.id}`)

io.sockets.emit('hello', 'hola')

const products = await budines.getProducts()

io.sockets.emit('products', products) }) */


// Conexion a DB Mongo Atlas
const MONGO_URI  ='mongodb+srv://Delfos:8Q1KqRE6Yj8Bo2fz@cluster0.8q2zhr1.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false) 

mongoose.connect(MONGO_URI, { dbName: 'Ecommerce' }, error => {
    if(error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    server
    
})


//contraseña mongoAtlas - JtwpMuWnslxTcUcc
// Delfos - 8Q1KqRE6Yj8Bo2fz







