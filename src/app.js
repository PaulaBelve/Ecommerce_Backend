import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
//import FileStore from 'session-file-store'

import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import __dirname from './dirname.js'
import authRouter from './routers/auth.router.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'


//const FileStorage = FileStore(session)
const app = express()

const uri = "mongodb+srv://Delfos:8Q1KqRE6Yj8Bo2fz@cluster0.8q2zhr1.mongodb.net/?retryWrites=true&w=majority"

// Session
app.use(session({

    store: MongoStore.create({
        mongoUrl: uri,
        dbName: 'Ecommerce',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },

        ttl: 200

    }),
    secret: '12345678',
    resave: true,
    saveUninitialized: true


}))

initializePassport()
app.use(passport.initialize());
app.use(passport.session())

function auth(req, res, next) {

    if (req.session?.user) return next()

    return res.status(401).send({
        status: "error",
        error: "No tine permisos de acceso",
    });


}

// CookieParser
app.use(cookieParser())


// Conexión con socket
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

// Configuración handlebars

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

// Configuración JSON

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
app.use('/session', authRouter)
app.use('/', auth, viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



// Correr el servidor

const server = httpServer.listen(8080, () => console.log('server running...'))

/*io.on('connection', async (socket) => {

console.log(`New client connected, id: ${socket.id}`)

io.sockets.emit('hello', 'hola')

const products = await budines.getProducts()

io.sockets.emit('products', products) }) */


// Conexion a DB Mongo Atlas
mongoose.set('strictQuery', false)

mongoose.connect(uri, { dbName: 'Ecommerce' }, error => {
    if (error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    server

})










