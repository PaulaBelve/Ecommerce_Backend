import { Router } from "express";
import {productModel}  from "../dao/models/products.model.js";
import { budines } from "../dao/index.js";
import {messageModel}  from "../dao/models/message.model.js";
//import { realTimeProducts } from "../views/layouts/realtimeproducts"


const router = Router ()

// DONDE SE VISUALIZA LA BASO DE DATOS

router.get ('/' , async (req, res) => {

 //const products = await budines.getProducts()
 const products = await productModel.find().lean().exec()

    res.render("index", {
        
        products,
    
    }) 
     
})

router.get ('/chat' , async  (req, res) => {

   res.render('chat' , {})


})

router.post ('/chat' , async  (req, res) => {

    const nuevoMessage = req.body

    const messageGenerated = new messageModel(nuevoMessage);
    await messageGenerated.save();

    console.log(messageGenerated);

    res.redirect('/message/' + messageGenerated.User)

    //res.render('create' , {})
    //res.render("one" , {nuevoProducto})
    // const result = await productModel.create(nuevoProducto)
    //console.log(result) 

}) 

router.get ('/:title' , async  (req, res) => {

    const title = req.params.title

    const product = await productModel.findOne({ title: title }).lean().exec()
console.log (product)
res.render("one" , {product})

})

/*router.get ('/realtimeproducts' , (req, res) => {

    res.render("realTimeProducts")
}) */


//export {router as viewsRouter}
export default router