import { Router } from "express";
import { budines } from "../managers/index.js";
//import { realTimeProducts } from "../views/layouts/realtimeproducts"


const router = Router ()

router.get ('/' , async (req, res) => {

 const products = await budines.getProducts()

    res.render("index", {
        
        products,
    
    }) 
     
})

router.get ('/realtimeproducts' , (req, res) => {

    res.render("realTimeProducts")
})


export {router as viewsRouter}