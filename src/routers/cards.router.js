import { Router } from "express";
import { cardManager } from "../managers/index.js";

const router = Router()


router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        const id = Number(cid)


        if (Number.isNaN(id) || id < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido. Por favor, ingresar de nuevo' })
        }

        const idCarrito = await cardManager.getCartsById(id)

        return res.send({ success: true, Cart: idCarrito })

    } catch (error) {
        console.log('error')

       return res.send({ success: false, error: 'error!' })

    };

});

router.post('/', async (req, res) => {

    try {

        const newCart = await cardManager.crearElCarrito();

        return res.send({ succes: true, Cart: newCart })

    }

    catch (error) {

        console.log('error')

     return   res.send({ succes: false, Error: 'Ha ocurrido un error' })


    }

})

router.post('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid } = req.params

        const cartId = Number(cid)


        if (Number.isNaN(cartId) || cartId < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const { pid } = req.params

        const prodId = Number(pid)


        if (Number.isNaN(prodId) || prodId < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const addproduct = await cardManager.addCart(cartId , prodId)

       return res.send ({succes: true, product: addproduct})


    } catch (error) {
        console.log('error')

     return res.send({ succes: false, error: 'error!' })

    };

}); 

export default router