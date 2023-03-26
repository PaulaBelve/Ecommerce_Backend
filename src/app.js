import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import MongoConnection from './utils/mongoDB.js'

import __dirname, { MongoStoreInstance } from './utils.js'
import ViewsRouter from './routers/views.router.js'
import SessionRouter from './routers/session.router.js'
import ProductsRouter from './routers/products.router.js'
import CartsRouter from './routers/carts.router.js'
import UsersRouter from './routers/users.router.js'
import chatRouter from './routers/messages.router.js'
//mocking
import usersFaker from './routers/mocking.router.js'
import loggerRouter from './routers/logger.router.js'

// import variables de entorno desde config
import credentials from './config/credentials.js'
//Socket
import { Server } from "socket.io";
import socket from "./socket.js";
import { errorHandler } from "./middlewares/errors/index.js";
import { addLogger } from './utils/logger.js'

const app = express()
const PORT = credentials.PORT || 5000

//init mongoDB
MongoConnection.getInstance();

//passport
initializePassport()


// Coustom Routers Config
const viewsRouter = new ViewsRouter();
const sessionRouter = new SessionRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();

// Configuración handlebars

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

// Middlewares
app.use(session(MongoStoreInstance));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
//app.use(express.static(__dirname + "/public"));
app.use(cookieParser(credentials.COOKIE_SECRET))
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);
app.use(addLogger);

// Routers
app.use('/api/session', sessionRouter.getRouter())
app.use('/', usersRouter.getRouter())
app.use('/', viewsRouter.getRouter())
app.use('/api/products', productsRouter.getRouter())
app.use('/api/carts', cartsRouter.getRouter())
app.use('/chat', chatRouter)
// Router mocking
app.use('/mockingProducts', usersFaker)
app.use('/loggerTest', loggerRouter)

//app.listen
const httpServer = app.listen(PORT, () => {
    console.log("Server up!");
});

//socket
const io = new Server(httpServer);
socket(io);













