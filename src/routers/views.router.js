import { Router } from "express";
import {productModel}  from "../dao/models/products.model.js";
import { budines } from "../dao/index.js";
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

/*router.get ('/create' , async  (req, res) => {

   res.render('create' , {})


})

router.post ('/create' , async  (req, res) => {

    const nuevoProducto = req.body

    const productGenerated = new productModel(nuevoProducto);
    await productGenerated.save();

    console.log(productGenerated);

    res.redirect('/product/' + productGenerated.title)

    //res.render('create' , {})
    //res.render("one" , {nuevoProducto})
    // const result = await productModel.create(nuevoProducto)
    //console.log(result) 

}) */

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