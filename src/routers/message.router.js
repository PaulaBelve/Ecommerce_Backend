import { Router } from "express";
import { ERRORS } from "../const/error.js";
import { messageModel } from "../dao/models/message.model";


const router = Router()

router.get('/', async (req, res) => {

    try {

        const messages = await messageModel.find()

        console.log(messages)

        res.send(messages)

      

    } catch (error) {

        console.log("error")
        console.log(error)

        res.send({ succes: false, error: "ha ocurrido un error" })


    }

})

router.post('/', async (req, res) => {

    try {

        const result = await messageModel.create(req.body)

        res.json(result)

       

    } catch (error) {
        console.log('error')


        if (error.name === ERRORS.VALIDATION_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

    };

})

/*router.get ('/create' , async  (req, res) => {

    res.render('create' , {})
 
 
 })
 
 router.post ('/create' , async  (req, res) => {
 
     const nuevoMensaje = req.body
 
     const messageGenerated = new messageModel(nuevoMensaje);
     await messageGenerated.save();
 
     console.log(productGenerated);
 
     res.redirect('/message/' + messageGenerated.Message)
 
     
 
 }) */



 export default router