import express from 'express'
import productsRouter from './routers/products.router.js'
import cardsRouter from './routers/cards.router.js' 

const app = express()
const server = app.listen(8080, () => console.log('server running...')) 


app.use (express.json())
app.use(express.urlencoded({extended : true})) 



app.use ('/api/products' , productsRouter)
app.use ('/api/cards' , cardsRouter)
//app.use ('/' , (req, res) => res.send("INICIO"))



// con el metodo post - agregar usuarios a la memoria

/*const users = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// METODO GET
app.get('/', (req, res) => res.send("INICIO"))  
 
app.get('/api/user', (req, res) => res.send(users))  

// METODO POST - ENVIAR FORMULARIOS

app.post('/api/user', (req, res) => {

    const user = req.body

  if (!user.firstname) {

    return res.status(400).send({status: "error", error: "valores incompletos"})
   }

   users.push(user)

   res.send({status: "success" , message: "Usuario creado!"})

 
})

app.put('/api/user', (req, res) => {

const user = req.body

if (!user.firstname) {

  return res.status(400).send({status: "error", error: "valores incompletos"})
 }

 const idx = users.findIndex (u => u.firstname == user.firstname)

 if ( users < 0) {

  return res.status(404).send({status: "error", error: "usuario no encontrado"})
 }

 users [idx] = user

 res.send({status: "success" , message: "Usuario actualizado!"})


}) */

 

