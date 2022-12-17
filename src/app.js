import express from 'express'
import productsRouter from './routers/products.router.js'
import cardsRouter from './routers/cards.router.js' 

const app = express()
const server = app.listen(8080, () => console.log('server running...')) 


app.use (express.json())
app.use(express.urlencoded({extended : true})) 
//app.use('/static', express.static('./public'))
app.use('/static', express.static('./public'))



app.use ('/api/products' , productsRouter)
app.use ('/api/cards' , cardsRouter)
app.use ('/' , (req, res) => res.send("INICIO"))





 

