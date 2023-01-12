import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'
import {Server as HttpServer} from 'http'
import {Server as IoServer} from 'socket.io'
import mongoose from 'mongoose'
//import bodyParser from 'body-parser'

import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import  viewsRouter  from './routers/views.router.js'
//import { budines } from '../dao/index.js'
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
/*app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))*/


app.use(express.static('public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/product' , viewsRouter)
//app.use('/', (req, res) => res.send("INICIO"))


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







