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
import ProductsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'
import credentials from "./config/credentials.js"
import { passportCall } from './utils/utils.js'


const app = express()

// Coustom Routers Config
const productsRouter = new ProductsRouter();
//const cartRouter = new CartRouter();
//const sessionRouter = new SessionRouter();
//const userRouter = new UserRouter();
//const viewsRouter = new ViewsRouter();


// Session
app.use(session({

    store: MongoStore.create({
        mongoUrl: credentials.MONGO_URL,
        dbName: credentials.DB_NAME,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },

        ttl: 200

    }),
    secret: credentials.MONGO_SECRET,
    resave: true,
    saveUninitialized: false


}))



function auth(req, res, next) {

    if (req.session?.user) return next()

    return res.status(401).send({
        status: "error",
        error: "No tine permisos de acceso",
    });


}

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
app.use(cookieParser(credentials.COOKIE_SECRET))
initializePassport()
app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use('/session', authRouter)
app.use('/', passportCall('jwt'), viewsRouter)
app.use('/api/products', productsRouter.getRouter())
app.use('/api/carts', cartsRouter)



// Correr el servidor

const HTTPServer = httpServer.listen(credentials.PORT, () => console.log('server running...'))

// Conexion a DB Mongo Atlas

mongoose.set('strictQuery', false)

mongoose.connect(credentials.MONGO_URL, { dbName: credentials.DB_NAME }, error => {
    if (error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    HTTPServer

})










