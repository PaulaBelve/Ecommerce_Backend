import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import { connectDB } from "./utils/mongoDB.js";


import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import __dirname from './dirname.js'
import ViewsRouter from './routers/views.router.js'
import SessionRouter from './routers/session.router.js'
import ProductsRouter from './routers/products.router.js'
import CartsRouter from './routers/carts.router.js'
import UsersRouter from './routers/users.router.js'
import { passportCall } from './utils/utils.js'
// import variables de entorno
import credentials from "./config/credentials.js"
import nodemailer from "nodemailer"

const app = express()

// ENVIO DE MAIL CON GMAIL - EJ DE CLASE.

//difttkqhjwobsilk

const transport = nodemailer.createTransport({

    service: 'gmail',
    port: '587',
    auth: {

        user: 'pau.belve@gmail.com',
        pass: 'difttkqhjwobsilk'


    }
})

app.get('/mail', async (re, res) => {

    const result = await transport.sendMail({

        from: 'r2coderhouse@gmail.com',
        to: 'pau.belve@gmail.com',
        subject: 'mail coder',
        html: `
<div>
<p> Hola Profe!</p>
<img>
</div>

`,
        attachments: [{
            filename: '',
            path: '',
            cid: '',


        }, {


        }]




    })



}

)

initializePassport()

//mongo connect
connectDB();

// Coustom Routers Config
const viewsRouter = new ViewsRouter();
const sessionRouter = new SessionRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();

// Server

const PORT = 8080
const HTTPServer = app.listen(PORT, console.log(`Server running OK, in port ${PORT}`));
console.log(credentials)


//const HTTPServer = httpServer.listen(credentials.PORT, () => console.log('server running...'))

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
app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use('/api/session', sessionRouter.getRouter())
app.use('/users', usersRouter.getRouter())
app.use('/', passportCall('jwt'), viewsRouter.getRouter())
app.use('/api/products', productsRouter.getRouter())
app.use('/api/carts', cartsRouter.getRouter())













