import { Router } from "express";
import { messageModel } from "../dao/models/message.model";


const router = Router()

router.get ('/create' , async  (req, res) => {

    res.render('create' , {})
 
 
 })
 
 router.post ('/create' , async  (req, res) => {
 
     const nuevoMensaje = req.body
 
     const messageGenerated = new messageModel(nuevoMensaje);
     await messageGenerated.save();
 
     console.log(productGenerated);
 
     res.redirect('/message/' + messageGenerated.Message)
 
     
 
 })

 export default router