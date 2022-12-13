import { Router } from "express";
import { cardManager } from "../managers/index.js";

const router = Router ()


router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        const id = Number(cid)


        if (Number.isNaN(id) || id < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido. Por favor, ingresar de nuevo' })
        }

        const idCarrito = await cardManager.getCardsById(id)

        return res.send({ succes: true, cart : idCarrito })

    } catch (error) {
        console.log('error')

        res.send({ succes: false, error: 'error!' })

    };

});

/*router.post('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid } = req.params

        const id = Number(cid)


        if (Number.isNaN(id) || id < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const cart = await cardManager.getCardsById(id)

        if (!product) {

            return res.send({ succes: false, error: 'el producto no ha sido encontrado' })
        }

        return res.json({ succes: true, product })

    } catch (error) {
        console.log('error')

        res.send({ succes: false, error: 'error!' })

    };

}); */

export default router